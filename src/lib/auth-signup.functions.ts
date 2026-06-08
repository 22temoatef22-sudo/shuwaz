import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { isDisposableEmail } from "@/lib/disposable-domains.server";
import {
  MAX_SIGNUPS_PER_IP,
  SignupInput,
  type SignupResult,
  getRequestFingerprint,
} from "@/lib/auth-signup.server";

export const signupWithGuards = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SignupInput.parse(input))
  .handler(async ({ data }): Promise<SignupResult> => {
    if (isDisposableEmail(data.email)) {
      return { ok: false, code: "disposable_email" };
    }

    const { ipHash, userAgent } = getRequestFingerprint();

    try {
      const { count, error: countError } = await supabaseAdmin
        .from("signup_fingerprints")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash);

      if (countError) {
        console.error("[signup] count error", countError);
      } else if ((count ?? 0) >= MAX_SIGNUPS_PER_IP) {
        return { ok: false, code: "ip_limit" };
      }
    } catch (err) {
      console.error("[signup] fingerprint lookup failed", err);
    }

    const { data: authData, error } = await supabaseAdmin.auth.signUp({
      email: data.email,
      password: data.password,
      options: { emailRedirectTo: data.redirectTo },
    });

    if (error) {
      const msg = error.message.toLowerCase();
      console.error("[signup] supabase error", error.status, error.message);
      if (msg.includes("registered") || msg.includes("already")) {
        return { ok: false, code: "already_registered", message: error.message };
      }
      if (msg.includes("password")) {
        return { ok: false, code: "weak_password", message: error.message };
      }
      if (msg.includes("rate") || msg.includes("limit")) {
        return { ok: false, code: "rate_limited", message: error.message };
      }
      return { ok: false, code: "server_error", message: error.message };
    }

    if (authData.user?.id) {
      try {
        const { error: insertError } = await supabaseAdmin
          .from("signup_fingerprints")
          .insert({
            user_id: authData.user.id,
            ip_hash: ipHash,
            user_agent: userAgent,
            email: data.email,
          });
        if (insertError) {
          console.error("[signup] fingerprint insert error", insertError);
        } else {
          console.log("[signup] fingerprint recorded for", authData.user.id);
        }
      } catch (err) {
        console.error("[signup] fingerprint insert threw", err);
      }
    } else {
      console.warn("[signup] no user id returned, skipping fingerprint");
    }

    return { ok: true, needsConfirmation: !authData.session };
  });
