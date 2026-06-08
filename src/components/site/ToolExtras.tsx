import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/translations";

export type ToolExtrasContent = {
  about: { title: string; body: string };
  how: { title: string; steps: { title: string; body: string }[] };
  speed: { title: string; items: { title: string; body: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
};

export type LocalizedToolExtras = Record<Locale, ToolExtrasContent>;

export function ToolExtras({ content }: { content: LocalizedToolExtras }) {
  const { locale, dir } = useI18n();
  const c = content[locale] ?? content.en;

  return (
    <div dir={dir} className="mt-24 space-y-24">
      {/* About */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            <span>{dir === "rtl" ? "نبذة" : "About"}</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.about.title}</h2>
        </div>
        <p className="lg:col-span-8 text-balance text-[15.5px] leading-[1.95] text-foreground/80">
          {c.about.body}
        </p>
      </section>

      {/* How it works */}
      <section>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          {dir === "rtl" ? "كيف يعمل" : "How it works"}
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.how.title}</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {c.how.steps.map((s, i) => (
            <li
              key={i}
              className="relative rounded-2xl border border-foreground/[0.08] bg-card/70 p-6 shadow-sm backdrop-blur"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-foreground/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Speed-up */}
      <section>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          {dir === "rtl" ? "السرعة" : "Speed"}
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.speed.title}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {c.speed.items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-6"
            >
              <h3 className="text-base font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.8] text-foreground/75">{it.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          {dir === "rtl" ? "الأسئلة الشائعة" : "FAQ"}
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.faq.title}</h2>
        <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-foreground/[0.08] bg-card/70 px-5 backdrop-blur">
          {c.faq.items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-foreground/[0.08]">
              <AccordionTrigger className="text-left text-[15px] font-semibold">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] leading-[1.85] text-foreground/75">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
