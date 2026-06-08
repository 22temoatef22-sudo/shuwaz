import { createServerFn } from "@tanstack/react-start";
import { getRequestHost, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const inputSchema = z.object({
  plan: z.enum(["starter", "pro", "agency"]),
  billing: z.enum(["monthly", "yearly"]),
  accessToken: z.string().min(10),
  mobile: z.string().min(6).max(20).optional(),
  name: z.string().min(1).max(120).optional(),
});

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { computeAmountUsd, createEasykashPayment } = await import("./easykash.server");

    // Verify user via access token
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (userErr || !userData?.user) throw new Error("Unauthorized");
    const user = userData.user;

    const amountUsd = computeAmountUsd(data.plan, data.billing);

    // Unique customer reference (numeric; Easykash requires number)
    const customerReference = Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);

    // Insert pending subscription
    const { error: insErr } = await supabaseAdmin.from("subscriptions").insert({
      user_id: user.id,
      plan: data.plan,
      billing: data.billing,
      amount_usd: amountUsd,
      currency: "USD",
      customer_reference: String(customerReference),
      status: "pending",
    });
    if (insErr) throw new Error(`DB insert failed: ${insErr.message}`);

    // Build absolute redirect URL from request host
    const host = getRequestHost();
    const proto = (getRequestHeader("x-forwarded-proto") || "https").split(",")[0];
    const origin = `${proto}://${host}`;
    const redirectUrl = `${origin}/checkout/return`;

    const buyerName = (data.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Customer").slice(0, 80);
    const buyerEmail = user.email || "no-reply@shuwaz.com";
    const buyerMobile = data.mobile || (user.user_metadata?.phone as string | undefined) || "01000000000";

    const { redirectUrl: payUrl } = await createEasykashPayment({
      amount: amountUsd,
      currency: "USD",
      name: buyerName,
      email: buyerEmail,
      mobile: buyerMobile,
      redirectUrl,
      customerReference,
    });

    return { redirectUrl: payUrl, customerReference: String(customerReference) };
  });
