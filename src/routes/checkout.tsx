import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/I18nProvider";
import { createCheckout } from "@/lib/easykash.functions";

const searchSchema = z.object({
  plan: z.enum(["starter", "pro", "agency"]).catch("pro"),
  billing: z.enum(["monthly", "yearly"]).catch("monthly"),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "إتمام الدفع — شُوَاظ" },
      { name: "description", content: "ادفع بأمان عبر بوابة Easykash — Visa، Mastercard، Apple Pay، Vodafone Cash، Fawry وغيرها." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type PlanId = "starter" | "pro" | "agency";

const PLAN_INFO: Record<PlanId, { name: string; arabic: string; priceUSD: number; minutes: number; tagline: string }> = {
  starter: { name: "Starter", arabic: "البداية", priceUSD: 8, minutes: 30, tagline: "للمبتدئين وصُنّاع المحتوى الفرديين" },
  pro: { name: "Pro", arabic: "المحترف", priceUSD: 20, minutes: 120, tagline: "للمحترفين الذين ينشرون يوميًا" },
  agency: { name: "Agency", arabic: "الوكالات", priceUSD: 40, minutes: 300, tagline: "للفِرق والاستوديوهات الإنتاجية" },
};

// Fetch a live USD→EGP rate (display only; payment is charged in USD via Easykash).
async function fetchUsdToEgp(): Promise<number> {
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/USD");
    const j = await r.json();
    const v = j?.rates?.EGP;
    if (typeof v === "number" && v > 0) return v;
  } catch {}
  try {
    const r = await fetch("https://api.frankfurter.app/latest?from=USD&to=EGP");
    const j = await r.json();
    const v = j?.rates?.EGP;
    if (typeof v === "number" && v > 0) return v;
  } catch {}
  return 50;
}

function CheckoutPage() {
  const { plan, billing } = Route.useSearch();
  const { dir } = useI18n();
  const navigate = useNavigate();
  const { session, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [egpRate, setEgpRate] = useState<number>(50);
  const [mobile, setMobile] = useState("");
  const checkoutFn = useServerFn(createCheckout);

  useEffect(() => {
    let alive = true;
    fetchUsdToEgp().then((r) => {
      if (alive) setEgpRate(r);
    });
    return () => {
      alive = false;
    };
  }, []);

  const info = PLAN_INFO[plan as PlanId];
  const monthly = useMemo(
    () => (billing === "yearly" ? info.priceUSD * 0.8 : info.priceUSD),
    [billing, info.priceUSD],
  );
  const total = useMemo(
    () => (billing === "yearly" ? monthly * 12 : monthly),
    [billing, monthly],
  );
  const savings = billing === "yearly" ? info.priceUSD * 12 - total : 0;
  const totalEgp = Math.round(total * egpRate);

  const returnTo = `/checkout?plan=${plan}&billing=${billing}`;

  const handlePay = async () => {
    if (!session) {
      navigate({ to: "/signup", search: { redirect: returnTo } as never });
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await checkoutFn({
        data: {
          plan,
          billing,
          accessToken: session.access_token,
          mobile: mobile.trim() || undefined,
          name: (user?.user_metadata?.full_name as string | undefined) || undefined,
        },
      });
      window.location.href = res.redirectUrl;
    } catch (err) {
      setSubmitting(false);
      const msg = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      setError(msg);
    }
  };

  return (
    <div dir={dir} className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="mb-8">
          <p className="text-[12px] font-mono uppercase tracking-[0.22em] text-primary">إتمام الدفع</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">إتمام الاشتراك</h1>
          <p className="mt-2 text-[14px] text-foreground/65">
            مدفوعات مشفّرة وآمنة عبر بوابة Easykash. اختر طريقة الدفع من شاشة Easykash بعد الضغط.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Action panel */}
          <div className="rounded-2xl border border-foreground/10 bg-card/60 p-5 shadow-soft backdrop-blur sm:p-7">
            {!session && (
              <div className="mb-5 rounded-xl border border-primary/30 bg-primary/[0.06] p-4 text-[13.5px] leading-7 text-foreground/85">
                <p className="font-semibold text-foreground">يلزم تسجيل الدخول لإتمام الدفع</p>
                <p className="mt-1 text-foreground/70">
                  ننشئ لك حسابًا لحفظ اشتراكك وتتبّع دقائق المعالجة المتاحة شهريًا.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to="/signup"
                    search={{ redirect: returnTo } as never}
                    className="rounded-full bg-primary px-4 py-2 text-[12.5px] font-semibold text-primary-foreground shadow-elevated hover:opacity-95"
                  >
                    إنشاء حساب جديد
                  </Link>
                  <Link
                    to="/login"
                    search={{ redirect: returnTo } as never}
                    className="rounded-full border border-foreground/20 bg-background/50 px-4 py-2 text-[12.5px] font-medium text-foreground hover:border-foreground/40"
                  >
                    لديّ حساب — تسجيل دخول
                  </Link>
                </div>
              </div>
            )}

            <h2 className="text-lg font-semibold">طرق الدفع المتاحة عبر Easykash</h2>
            <p className="mt-2 text-[13px] text-foreground/65 leading-7">
              ستظهر لك في شاشة الدفع كل الخيارات المُفعّلة على حسابنا: Visa / Mastercard، Apple Pay، Vodafone Cash، Meeza، Aman، Fawry.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 text-[12px] sm:grid-cols-3">
              {["Visa / Mastercard", "Apple Pay", "Vodafone Cash", "Meeza", "Fawry", "Aman"].map((m) => (
                <span
                  key={m}
                  className="rounded-lg border border-foreground/10 bg-background/40 px-3 py-2 text-center text-foreground/75"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Field label="رقم الموبايل (للتواصل بشأن الدفع)">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="01XXXXXXXXX"
                  dir="ltr"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="input-base font-mono"
                />
              </Field>

              <Field label="البريد الإلكتروني للفاتورة">
                <input
                  type="email"
                  defaultValue={user?.email ?? ""}
                  readOnly
                  dir="ltr"
                  className="input-base opacity-80"
                />
              </Field>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-[13px] text-destructive">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handlePay}
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[14.5px] font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95 disabled:opacity-60"
            >
              {submitting
                ? "جارٍ تحويلك إلى Easykash..."
                : `المتابعة إلى الدفع الآمن · $${total.toFixed(0)} (≈ ${totalEgp.toLocaleString("ar-EG")} ج.م)`}
            </button>

            <p className="mt-3 flex items-center justify-center gap-2 text-[11.5px] text-foreground/55">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
              بوابة Easykash · معاملة مشفّرة 256-bit SSL
            </p>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-foreground/10 bg-card/60 p-5 shadow-soft backdrop-blur sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">ملخّص الطلب</h2>

            <div className="mt-4 rounded-xl border border-foreground/10 bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-primary">{info.name}</p>
                  <p className="mt-0.5 text-[15px] font-semibold">باقة {info.arabic}</p>
                </div>
                <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-foreground/70">
                  {billing === "monthly" ? "شهري" : "سنوي"}
                </span>
              </div>
              <p className="mt-2 text-[12.5px] text-foreground/60">{info.tagline}</p>
              <div className="mt-3 flex items-center justify-between text-[13px]">
                <span className="text-foreground/65">دقائق المعالجة</span>
                <span className="font-semibold">{info.minutes} دقيقة / شهر</span>
              </div>
            </div>

            <dl className="mt-5 space-y-2.5 text-[13.5px]">
              <Row label="السعر">
                <span dir="ltr">${monthly.toFixed(0)} / mo</span>
              </Row>
              {billing === "yearly" && (
                <>
                  <Row label="مدة الاشتراك"><span>12 شهر</span></Row>
                  <Row label="الخصم السنوي">
                    <span className="text-primary" dir="ltr">−${savings.toFixed(0)}</span>
                  </Row>
                </>
              )}
              <Row label="ما يعادل بالجنيه">
                <span dir="ltr">≈ {totalEgp.toLocaleString("ar-EG")} EGP</span>
              </Row>
              <Row label="الضريبة">
                <span className="text-foreground/55">تُحتسب من Easykash</span>
              </Row>
            </dl>

            <div className="mt-4 border-t border-foreground/10 pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13.5px] font-semibold">الإجمالي</span>
                <span className="text-2xl font-bold" dir="ltr">${total.toFixed(0)}</span>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-[12px] text-foreground/60">
                <span>بالجنيه المصري</span>
                <span dir="ltr">≈ {totalEgp.toLocaleString("ar-EG")} EGP</span>
              </div>
            </div>

            <Link
              to="/pricing"
              className="mt-5 block text-center text-[12.5px] text-foreground/60 hover:text-foreground"
            >
              ← تغيير الباقة
            </Link>
          </aside>
        </div>
      </main>

      <style>{`
        .input-base {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid color-mix(in oklab, var(--foreground) 14%, transparent);
          background: color-mix(in oklab, var(--background) 60%, transparent);
          padding: 0.7rem 0.9rem;
          font-size: 14px;
          color: var(--foreground);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input-base::placeholder { color: color-mix(in oklab, var(--foreground) 40%, transparent); }
        .input-base:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-medium text-foreground/75">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-foreground/65">{label}</dt>
      <dd className="font-medium">{children}</dd>
    </div>
  );
}
