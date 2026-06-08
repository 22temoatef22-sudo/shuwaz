import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import {
  EXTENSION_DOWNLOAD_URL,
  EXTENSION_FILENAME,
  EXTENSION_VERSION,
} from "@/lib/extension";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, profile, signOut, loading } = useAuth();
  const { dir, t, locale } = useI18n();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const remaining = profile?.remaining_minutes ?? 0;
  const plan = profile?.subscription_plan ?? "free";
  const usage = profile?.usage_count ?? 0;
  const totalMinutes = plan === "free" ? 5 : plan === "pro" ? 120 : 300;
  const pct = Math.min(100, Math.max(0, (remaining / totalMinutes) * 100));
  const planLabel = plan === "free" ? t("dashboard.planFree") : plan === "pro" ? "Pro" : plan === "agency" ? "Agency" : plan;

  return (
    <div dir={dir} lang={locale} className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, oklch(0.66 0.225 40 / 0.22), transparent 70%), radial-gradient(40% 30% at 100% 100%, oklch(0.78 0.16 48 / 0.14), transparent 70%)",
        }}
      />
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 12h2l2-7 3 14 3-10 2 6 2-3h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold">شُوَاظ</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-ink-foreground/85 transition hover:bg-white/[0.08]"
            >
              {t("dashboard.logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="mb-10">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-primary/85">{t("dashboard.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{t("dashboard.welcome")}</h1>
          <p className="mt-2 text-[15px] text-ink-foreground/65" dir="ltr">{user?.email}</p>
        </div>

        {loading && !profile ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-ink-foreground/60">
            {t("dashboard.loadingProfile")}
          </div>
        ) : (
          <>
            {/* Extension download */}
            <div
              className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
              style={{ boxShadow: "0 20px 60px -30px oklch(0.66 0.225 40 / 0.45)" }}
            >
              <div className="min-w-0">
                <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink-foreground/55">
                  {t("dashboard.extEyebrow")}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {t("dashboard.extTitle")}
                </p>
                <p className="mt-1 text-[13px] text-ink-foreground/60">
                  {t("dashboard.extSubA")} {EXTENSION_VERSION} — {t("dashboard.extSubB")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/download" className="text-sm font-medium text-primary hover:underline">
                  {t("dashboard.installGuide")}
                </Link>
                <a
                  href={EXTENSION_DOWNLOAD_URL}
                  download={EXTENSION_FILENAME}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
                >
                  {t("dashboard.downloadBtn")}
                </a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Remaining minutes */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2"
                style={{ boxShadow: "0 30px 80px -40px oklch(0.66 0.225 40 / 0.5)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full"
                  style={{ background: "radial-gradient(circle, oklch(0.66 0.225 40 / 0.45), transparent 70%)" }}
                />
                <div className="relative">
                  <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink-foreground/55">{t("dashboard.remaining")}</p>
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-6xl font-bold leading-none" dir="ltr">{remaining}</span>
                    <span className="pb-2 text-sm text-ink-foreground/60">/ {totalMinutes} {t("dashboard.minute")}</span>
                  </div>
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: "var(--gradient-ember)",
                        boxShadow: "0 0 20px oklch(0.66 0.225 40 / 0.5)",
                      }}
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-foreground/65">
                    <span>{t("dashboard.usage")}: <span className="font-semibold text-ink-foreground">{usage}</span></span>
                  </div>
                </div>
              </div>

              {/* Plan */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink-foreground/55">{t("dashboard.currentPlan")}</p>
                <p className="mt-3 text-2xl font-bold capitalize">{planLabel}</p>
                <p className="mt-1 text-sm text-ink-foreground/60">
                  {plan === "free" ? t("dashboard.upgradeNote") : t("dashboard.fullPlanNote")}
                </p>
                <Link
                  to="/checkout"
                  search={{ plan: "pro", billing: "monthly" }}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
                  style={{ boxShadow: "0 14px 40px -14px oklch(0.66 0.225 40 / 0.55)" }}
                >
                  {t("dashboard.upgrade")}
                </Link>
              </div>

              {/* Account */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2 lg:col-span-3">
                <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-ink-foreground/55">{t("dashboard.account")}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[13px] text-ink-foreground/55">{t("dashboard.email")}</p>
                    <p className="mt-1 font-medium" dir="ltr">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-ink-foreground/55">{t("dashboard.userId")}</p>
                    <p className="mt-1 truncate font-mono text-xs text-ink-foreground/70" dir="ltr">{user?.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
