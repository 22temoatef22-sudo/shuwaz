import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { MatteSection } from "@/components/site/MatteSection";
import { useI18n } from "@/i18n/I18nProvider";
import { ToolExtras } from "@/components/site/ToolExtras";
import { cutlayerContent } from "@/components/site/toolExtrasContent";


export const Route = createFileRoute("/tools/matte")({
  head: () => ({
    meta: [
      { title: "Matte — AI background removal | Shuwaz" },
      { name: "description", content: "Matte: AI background removal and matte extraction for After Effects and Premiere Pro." },
      { property: "og:title", content: "Matte — AI background removal | Shuwaz" },
      { property: "og:description", content: "Studio-grade matte extraction for motion designers and editors." },
    ],
  }),
  component: MattePage,
});

function MattePage() {
  const { t, dir, locale } = useI18n();
  return (
    <div dir={dir} lang={locale} className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-12">
          <Link to="/" className="text-[12px] font-mono uppercase tracking-[0.2em] text-foreground/55 hover:text-primary">
            {t("toolPage.backHome")}
          </Link>
        </div>
        <MatteSection />
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <ToolExtras content={cutlayerContent} />
        </div>
      </main>
    </div>
  );
}

