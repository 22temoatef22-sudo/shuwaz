import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Shuwaz · سياسة الاسترجاع" },
      { name: "description", content: "Shuwaz refund policy: usage limits per plan and how to request a refund." },
      { property: "og:title", content: "Refund Policy — Shuwaz" },
      { property: "og:description", content: "Per-plan refund eligibility and process." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  const { t, dir } = useI18n();

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24" dir={dir}>
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-6 bg-primary/60" />
          <span>{t("nav.refund")}</span>
        </div>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">
          {t("refund.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.95] text-foreground/80">
          {t("refund.subtitle")}
        </p>

        <section className="mt-10 rounded-2xl border border-foreground/10 bg-card/70 p-6 sm:p-8 backdrop-blur">
          <p className="text-[15px] leading-[1.95] text-foreground/85">{t("refund.intro")}</p>

          <h2 className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            {t("refund.rule")}
          </h2>
          <ul className="mt-4 space-y-3 text-[14.5px]">
            {[
              { k: "starter", label: t("refund.starter"), accent: "oklch(0.78 0.14 80)" },
              { k: "pro", label: t("refund.pro"), accent: "oklch(0.7 0.22 45)" },
              { k: "agency", label: t("refund.agency"), accent: "oklch(0.7 0.12 250)" },
            ].map((row) => (
              <li
                key={row.k}
                className="flex items-center justify-between gap-4 rounded-xl border border-foreground/[0.08] bg-background/40 p-4"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: row.accent, boxShadow: `0 0 10px ${row.accent}` }}
                  />
                  <span className="font-medium">{row.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-foreground/10 bg-card/70 p-6 sm:p-8 backdrop-blur">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            {t("refund.howTitle")}
          </h2>
          <ol className="mt-4 space-y-3 text-[14.5px] leading-[1.85]">
            {[t("refund.how1"), t("refund.how2"), t("refund.how3")].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
            >
              <span>{t("refund.contactCta")}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
