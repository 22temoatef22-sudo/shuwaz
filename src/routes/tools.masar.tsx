import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { MapMockup } from "@/components/site/MapMockup";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/hooks/use-auth";
import { ToolExtras } from "@/components/site/ToolExtras";
import { masarContent } from "@/components/site/toolExtrasContent";


export const Route = createFileRoute("/tools/masar")({
  head: () => ({
    meta: [
      { title: "Masar — Animated maps | Shuwaz" },
      { name: "description", content: "Masar: documentary-style animated maps inside After Effects and Premiere Pro." },
      { property: "og:title", content: "Masar — Animated maps | Shuwaz" },
      { property: "og:description", content: "Documentary-style animated maps for editors and motion designers." },
    ],
  }),
  component: MasarPage,
});

function MasarPage() {
  const { t, dir, locale } = useI18n();
  const { session } = useAuth();
  const ctaTo = session ? "/dashboard" : "/signup";
  const features = [t("tools.masarF1"), t("tools.masarF2"), t("tools.masarF3")];

  return (
    <div dir={dir} lang={locale} className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <Link to="/" className="text-[12px] font-mono uppercase tracking-[0.2em] text-foreground/55 hover:text-primary">
          {t("toolPage.backHome")}
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <span>02</span><span className="h-px w-5 bg-primary/50" /><span>{t("tools.masarKicker")}</span>
              <span className="ms-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary">{t("tools.earlyAccess")}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Masar <span className="text-primary/70">— مسار</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.95] text-foreground/80">{t("tools.masarDesc")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={ctaTo} className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated">{t("toolPage.ctaTry")}</Link>
              <Link to="/pricing" className="rounded-full border border-foreground/20 bg-card/70 px-6 py-3.5 text-sm font-medium">{t("toolPage.ctaPricing")}</Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-3">{t("toolPage.featuresTitle")}</h3>
            <ul className="space-y-3 text-[14.5px] text-foreground/85">
              {features.map(f => (
                <li key={f} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14">
          <MapMockup />
        </div>
        <ToolExtras content={masarContent} />

      </main>
    </div>
  );
}
