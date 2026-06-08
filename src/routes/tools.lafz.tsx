import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { EditorMockup } from "@/components/site/EditorMockup";
import { useI18n } from "@/i18n/I18nProvider";
import { useAuth } from "@/hooks/use-auth";
import { ToolExtras } from "@/components/site/ToolExtras";
import { lafzContent } from "@/components/site/toolExtrasContent";


export const Route = createFileRoute("/tools/lafz")({
  head: () => ({
    meta: [
      { title: "Lafz — Smart Arabic captions | Shuwaz" },
      { name: "description", content: "Lafz: smart Arabic captioning plugin for Premiere Pro and After Effects with word-level sync." },
      { property: "og:title", content: "Lafz — Smart Arabic captions | Shuwaz" },
      { property: "og:description", content: "Word-level Arabic captioning inside Premiere Pro and After Effects." },
    ],
  }),
  component: LafzPage,
});

function LafzPage() {
  const { t, dir, locale } = useI18n();
  const { session } = useAuth();
  const ctaTo = session ? "/dashboard" : "/signup";
  const features = [t("tools.lafzF1"), t("tools.lafzF2"), t("tools.lafzF3"), t("tools.lafzF4")];

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
              <span>01</span><span className="h-px w-5 bg-primary/50" /><span>{t("tools.lafzKicker")}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Lafz <span className="text-primary/70">— لفظ</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.95] text-foreground/80">{t("tools.lafzDesc")}</p>
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
          <EditorMockup />
        </div>
        <ToolExtras content={lafzContent} />

      </main>
    </div>
  );
}
