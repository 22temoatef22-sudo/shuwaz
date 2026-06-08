import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountPage,
});

type UsageEvent = {
  id: string;
  minutes_used: number;
  source: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

type Subscription = {
  id: string;
  plan: string;
  billing: string;
  amount_usd: number;
  currency: string;
  status: string;
  payment_method: string | null;
  expires_at: string | null;
  paid_at: string | null;
  created_at: string;
};

function AccountPage() {
  const { user, profile, signOut } = useAuth();
  const [events, setEvents] = useState<UsageEvent[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOutAll, setSigningOutAll] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    (async () => {
      const [evRes, subRes] = await Promise.all([
        supabase
          .from("usage_events")
          .select("id, minutes_used, source, metadata, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("subscriptions")
          .select("id, plan, billing, amount_usd, currency, status, payment_method, expires_at, paid_at, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);
      if (alive) {
        setEvents((evRes.data as UsageEvent[]) ?? []);
        setSubs((subRes.data as Subscription[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  const handleSignOutAll = async () => {
    setSigningOutAll(true);
    await supabase.auth.signOut({ scope: "global" });
    await signOut();
    window.location.href = "/";
  };

  const remaining = profile?.remaining_minutes ?? 0;
  const plan = profile?.subscription_plan ?? "free";
  const usage = profile?.usage_count ?? 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, oklch(0.66 0.225 40 / 0.18), transparent 70%)",
        }}
      />
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/dashboard" className="text-sm text-ink-foreground/70 hover:text-ink-foreground">
            ← لوحة التحكم
          </Link>
          <Link to="/" className="text-xl font-bold">شُوَاظ</Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-primary/85">حسابي</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">إدارة الحساب والاستخدام</h1>
          <p className="mt-2 text-[15px] text-ink-foreground/65" dir="ltr">{user?.email}</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Stat label="الدقائق المتبقية" value={`${remaining}`} />
          <Stat label="الباقة" value={plan === "free" ? "مجانية" : plan} />
          <Stat label="عدد الاستخدامات" value={`${usage}`} />
        </div>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">اشتراكاتي</h2>
            <Link to="/pricing" className="text-xs text-primary hover:underline">
              إدارة الباقات →
            </Link>
          </div>
          {loading ? (
            <p className="py-6 text-center text-ink-foreground/60">جارٍ التحميل…</p>
          ) : subs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-ink-foreground/60">
              لا يوجد اشتراك بعد.{" "}
              <Link to="/pricing" className="text-primary hover:underline">اختر باقة</Link>.
            </div>
          ) : (
            <div className="space-y-3">
              {subs.map((s) => {
                const statusLabel =
                  s.status === "paid"
                    ? "نشط"
                    : s.status === "pending"
                    ? "قيد الانتظار"
                    : s.status === "failed"
                    ? "فشل"
                    : s.status === "canceled"
                    ? "ملغى"
                    : s.status;
                const statusColor =
                  s.status === "paid"
                    ? "text-emerald-400 border-emerald-400/40 bg-emerald-400/10"
                    : s.status === "pending"
                    ? "text-amber-400 border-amber-400/40 bg-amber-400/10"
                    : "text-red-400 border-red-400/40 bg-red-400/10";
                return (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-semibold capitalize">{s.plan}</span>
                        <span className="text-[12px] text-ink-foreground/55">
                          ({s.billing === "yearly" ? "سنوي" : "شهري"})
                        </span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-semibold ${statusColor}`}>
                          {statusLabel}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] text-ink-foreground/60" dir="ltr">
                        ${s.amount_usd} {s.currency}
                        {s.expires_at && (
                          <> · ينتهي {new Date(s.expires_at).toLocaleDateString("ar-EG")}</>
                        )}
                        {s.payment_method && <> · {s.payment_method}</>}
                      </p>
                    </div>
                    {(s.status === "failed" || s.status === "canceled" ||
                      (s.status === "paid" && s.expires_at && new Date(s.expires_at) < new Date())) && (
                      <Link
                        to="/checkout"
                        search={{ plan: s.plan as "starter" | "pro" | "agency", billing: s.billing as "monthly" | "yearly" }}
                        className="rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-primary-foreground hover:opacity-95"
                      >
                        تجديد الآن
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>


        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">آخر العمليات من الإضافة</h2>
            <span className="text-xs text-ink-foreground/55">آخر 20 عملية</span>
          </div>

          {loading ? (
            <p className="py-8 text-center text-ink-foreground/60">جارٍ التحميل…</p>
          ) : events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-ink-foreground/60">
              لم تستخدم الإضافة بعد. حمّلها من{" "}
              <Link to="/download" className="text-primary hover:underline">
                صفحة التحميل
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="text-[12px] uppercase tracking-wider text-ink-foreground/50">
                  <tr className="border-b border-white/5">
                    <th className="py-2.5 font-medium">التاريخ</th>
                    <th className="py-2.5 font-medium">المصدر</th>
                    <th className="py-2.5 font-medium">الدقائق</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev.id} className="border-b border-white/5 last:border-0">
                      <td className="py-3 text-ink-foreground/80" dir="ltr">
                        {new Date(ev.created_at).toLocaleString("ar-EG")}
                      </td>
                      <td className="py-3 text-ink-foreground/80">
                        {ev.source === "premiere"
                          ? "Premiere Pro"
                          : ev.source === "after_effects"
                          ? "After Effects"
                          : ev.source}
                      </td>
                      <td className="py-3 font-mono text-ink-foreground">{ev.minutes_used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-semibold">الأمان</h2>
          <p className="mt-1 text-sm text-ink-foreground/65">
            تسجيل الخروج من جميع الجلسات المفتوحة على المتصفّح والإضافة.
          </p>
          <button
            onClick={handleSignOutAll}
            disabled={signingOutAll}
            className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-5 py-2.5 text-sm font-medium text-destructive transition hover:bg-destructive/20 disabled:opacity-60"
          >
            {signingOutAll ? "جارٍ الخروج…" : "تسجيل الخروج من جميع الأجهزة"}
          </button>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink-foreground/55">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
