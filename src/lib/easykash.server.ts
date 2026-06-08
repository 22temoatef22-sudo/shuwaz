import { createHmac, timingSafeEqual } from "crypto";

const EASYKASH_BASE = process.env.EASYKASH_BASE_URL || "https://back.easykash.net";

export type PlanId = "starter" | "pro" | "agency";
export type Billing = "monthly" | "yearly";

export const PLAN_PRICE_USD: Record<PlanId, number> = {
  starter: 8,
  pro: 20,
  agency: 40,
};

export function computeAmountUsd(plan: PlanId, billing: Billing): number {
  const base = PLAN_PRICE_USD[plan];
  const monthly = billing === "yearly" ? base * 0.8 : base;
  const total = billing === "yearly" ? monthly * 12 : monthly;
  return Math.round(total * 100) / 100;
}

export type EasykashPayInput = {
  amount: number;
  currency: "USD" | "EGP" | "SAR" | "AED" | "EUR" | "GBP" | "QAR";
  name: string;
  email: string;
  mobile: string;
  redirectUrl: string;
  customerReference: number;
  paymentOptions?: number[];
  cashExpiry?: number;
};

export async function createEasykashPayment(input: EasykashPayInput): Promise<{ redirectUrl: string }> {
  const apiKey = process.env.EASYKASH_API_KEY;
  if (!apiKey) throw new Error("EASYKASH_API_KEY missing");

  const body = {
    amount: input.amount,
    currency: input.currency,
    paymentOptions: input.paymentOptions ?? [2, 4, 5, 1, 6],
    cashExpiry: input.cashExpiry ?? 24,
    name: input.name,
    email: input.email,
    mobile: input.mobile,
    redirectUrl: input.redirectUrl,
    customerReference: input.customerReference,
  };

  const res = await fetch(`${EASYKASH_BASE}/api/directpayv1/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: apiKey,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Easykash pay failed (${res.status}): ${text.slice(0, 300)}`);
  }
  let data: { redirectUrl?: string };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Easykash pay returned non-JSON: ${text.slice(0, 200)}`);
  }
  if (!data.redirectUrl) throw new Error("Easykash response missing redirectUrl");
  return { redirectUrl: data.redirectUrl };
}

export type EasykashCallbackPayload = {
  ProductCode?: string;
  PaymentMethod?: string;
  ProductType?: string;
  Amount?: string | number;
  BuyerEmail?: string;
  BuyerMobile?: string;
  BuyerName?: string;
  Timestamp?: string;
  status?: string;
  voucher?: string;
  easykashRef?: string;
  VoucherData?: string;
  customerReference?: string | number;
  signatureHash?: string;
};

export function verifyEasykashSignature(payload: EasykashCallbackPayload): boolean {
  const secret = process.env.EASYKASH_HMAC_SECRET;
  if (!secret) return false;
  if (!payload.signatureHash) return false;

  const concat =
    String(payload.ProductCode ?? "") +
    String(payload.Amount ?? "") +
    String(payload.ProductType ?? "") +
    String(payload.PaymentMethod ?? "") +
    String(payload.status ?? "") +
    String(payload.easykashRef ?? "") +
    String(payload.customerReference ?? "");

  const expected = createHmac("sha512", secret).update(concat).digest("hex");
  const received = payload.signatureHash.toLowerCase();
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
