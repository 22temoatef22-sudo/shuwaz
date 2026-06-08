import { createHmac } from "crypto";
import { z } from "zod";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

export const MAX_SIGNUPS_PER_IP = 1;

export const SignupInput = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(200),
  redirectTo: z.string().url().max(500),
});

export type SignupResult =
  | { ok: true; needsConfirmation: boolean }
  | {
      ok: false;
      code:
        | "disposable_email"
        | "ip_limit"
        | "already_registered"
        | "weak_password"
        | "rate_limited"
        | "server_error";
      message?: string;
    };

export function hashIp(ip: string): string {
  const salt = process.env.SIGNUP_IP_SALT;
  if (!salt || salt.length < 32) {
    throw new Error(
      "SIGNUP_IP_SALT is not configured. Set a strong (>=32 chars) random secret in server environment.",
    );
  }
  return createHmac("sha256", salt).update(ip).digest("hex");
}

export function getRequestFingerprint() {
  const rawIp =
    getRequestIP({ xForwardedFor: true }) ||
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-real-ip") ||
    "0.0.0.0";
  const userAgent = getRequestHeader("user-agent")?.slice(0, 500) ?? null;
  return { ipHash: hashIp(rawIp), userAgent };
}
