import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";

const searchSchema = z.object({
  status: z.string().optional().catch(undefined),
  customerReference: z.string().optional().catch(undefined),
  providerRefNum: z.string().optional().catch(undefined),
  voucher: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "نتيجة الدفع — شُوَاظ" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutReturnPage,
});

function CheckoutReturnPage() {
  const { status, customerReference, voucher, providerRefNum } = Route.useSearch();
  const s = (status || "").toLowerCase();
  const success = s === "success" || s === "paid";
  const pending = s === "new" || s === "pending" || !!voucher;
  const failed = !success && !pending;

  return (
    <div dir="rtl" className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10 mx-auto max-w-2xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="rounded-2xl border border-foreground/10 bg-card/60 p-7 shadow-soft backdrop-blur sm:p-10 text-center">
          {success && (
            <>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl">✓</div>
              <h1 className="text-2xl font-bold sm:text-3xl">تم استلام دفعتك بنجاح</h1>
              <p className="mt-3 text-foreground/70">
                تم تفعيل اشتراكك. يمكنك الآن استخدام كل المزايا من لوحة التحكم.
              </p>
            </>
          )}
          {pending && !success && (
            <>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-500 text-2xl">⏳</div>
              <h1 className="text-2xl font-bold sm:text-3xl">دفعتك قيد الانتظار</h1>
              <p className="mt-3 text-foreground/70">
                {voucher
                  ? "استخدم رقم الإيصال التالي للدفع من أقرب منفذ Aman / Fawry:"
                  : "سيتم تأكيد دفعتك خلال دقائق وسنقوم بإشعارك تلقائيًا."}
              </p>
              {voucher && (
                <div className="mt-4 inline-block rounded-xl border border-foreground/15 bg-background/60 px-5 py-3 font-mono text-lg tracking-widest">
                  {voucher}
                </div>
              )}
            </>
          )}
          {failed && (
            <>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15 text-destructive text-2xl">×</div>
              <h1 className="text-2xl font-bold sm:text-3xl">لم تتم عملية الدفع</h1>
              <p className="mt-3 text-foreground/70">
                لم نتمكن من إتمام الدفع. يمكنك المحاولة مرة أخرى من صفحة الأسعار.
              </p>
            </>
          )}

          {(customerReference || providerRefNum) && (
            <p className="mt-5 text-[12px] text-foreground/55" dir="ltr">
              {customerReference && <>Ref: {customerReference}</>}
              {customerReference && providerRefNum && <> · </>}
              {providerRefNum && <>Provider: {providerRefNum}</>}
            </p>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/account"
              className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-elevated hover:opacity-95"
            >
              عرض حسابي
            </Link>
            <Link
              to="/pricing"
              className="rounded-full border border-foreground/20 px-5 py-2.5 text-[13px] font-medium text-foreground hover:border-foreground/40"
            >
              العودة للأسعار
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
