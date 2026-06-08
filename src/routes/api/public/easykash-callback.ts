import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/easykash-callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { verifyEasykashSignature } = await import("@/lib/easykash.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        let payload: Record<string, unknown>;
        try {
          payload = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const valid = verifyEasykashSignature(payload as never);

        const customerReference = String((payload as { customerReference?: string | number }).customerReference ?? "");
        const easykashRef = String((payload as { easykashRef?: string }).easykashRef ?? "");
        const statusRaw = String((payload as { status?: string }).status ?? "");

        // Persist the event regardless of validity (audit trail)
        await supabaseAdmin.from("payment_events").insert({
          customer_reference: customerReference || null,
          easykash_ref: easykashRef || null,
          status: statusRaw || null,
          payload: payload as never,
          signature_valid: valid,
          processed_at: valid ? new Date().toISOString() : null,
        });

        if (!valid) {
          return new Response("Invalid signature", { status: 401 });
        }
        if (!customerReference) {
          return new Response("Missing customerReference", { status: 400 });
        }

        // Map status
        const statusLower = statusRaw.toLowerCase();
        let nextStatus: "paid" | "failed" | "canceled" | "pending" = "pending";
        if (statusLower === "paid" || statusLower === "success") nextStatus = "paid";
        else if (statusLower === "failed") nextStatus = "failed";
        else if (statusLower === "canceled" || statusLower === "cancelled") nextStatus = "canceled";

        // Load existing subscription for plan/billing (to compute expires_at)
        const { data: existing } = await supabaseAdmin
          .from("subscriptions")
          .select("id, billing, expires_at, status")
          .eq("customer_reference", customerReference)
          .maybeSingle();

        const updates: Record<string, unknown> = {
          status: nextStatus,
          payment_method: (payload as { PaymentMethod?: string }).PaymentMethod ?? null,
          easykash_ref: easykashRef || null,
          easykash_product_code: (payload as { ProductCode?: string }).ProductCode ?? null,
          voucher: (payload as { voucher?: string }).voucher ?? null,
          updated_at: new Date().toISOString(),
        };

        if (nextStatus === "paid") {
          const now = new Date();
          // Extend from current expires_at if still in future (subscription renewal), else from now
          const base =
            existing?.expires_at && new Date(existing.expires_at) > now
              ? new Date(existing.expires_at)
              : now;
          const next = new Date(base);
          if (existing?.billing === "yearly") {
            next.setFullYear(next.getFullYear() + 1);
          } else {
            next.setMonth(next.getMonth() + 1);
          }
          updates.paid_at = now.toISOString();
          updates.expires_at = next.toISOString();
        }

        const { error: updErr } = await supabaseAdmin
          .from("subscriptions")
          .update(updates)
          .eq("customer_reference", customerReference);

        if (updErr) {
          return new Response(`DB update failed: ${updErr.message}`, { status: 500 });
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
