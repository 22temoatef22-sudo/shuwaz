import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Pricing } from "@/components/site/Pricing";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, StaggerGroup, StaggerItem, EASE } from "@/components/motion/primitives";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { dir, locale } = useI18n();
  return (
    <div dir={dir} lang={locale} className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <div className="section-blend section-ambient">
          <VideoShowcase />
        </div>
        <div id="tools" className="section-blend section-ambient">
          <ToolsCarousel />
        </div>
        <div id="features" className="section-blend section-ambient">
          <Pricing />
        </div>
        <div className="section-blend section-ambient">
          <SignupCta />
        </div>
        <div className="section-blend section-ambient">
          <FAQ />
        </div>
        <div className="section-blend section-ambient">
          <ContactStrip />
        </div>
        <div className="section-blend section-blend-bottom">
          <Social />
        </div>
        <Footer />
      </main>
    </div>
  );
}

/* ---------------- Eyebrow ---------------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-px w-6 bg-primary/60" />
      <span style={{ fontFeatureSettings: '"tnum" 1' }}>{children}</span>
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const { session } = useAuth();
  const { t, dir } = useI18n();
  const ctaTo = session ? "/dashboard" : "/signup";
  const arrow = dir === "rtl" ? "←" : "→";
  const alignText = dir === "rtl" ? "text-right" : "text-left";
  const justifyEnd = dir === "rtl" ? "justify-end" : "justify-start";

  // Compose the big headline from titleA + titleB + titleC parts (existing translations)
  const bigHeadline = `${t("hero.titleA")} ${t("hero.titleB")} ${t("hero.titleC")}`.replace(/\s+/g, " ").trim();
  const subHeadline = t("hero.titleD");

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-16 lg:pb-28">
        <StaggerGroup className={`order-1 ${alignText} lg:col-span-7`} step={0.09}>
          <StaggerItem>
            <h1 className="text-balance text-[2.6rem] font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-[4.75rem]">
              {bigHeadline}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className={`mt-4 text-balance text-lg font-semibold text-primary sm:text-xl lg:text-2xl`}>
              {subHeadline}
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className={`mt-6 max-w-xl text-balance text-[15px] leading-[1.95] text-foreground/80 lg:text-lg ${dir === "rtl" ? "lg:ms-auto" : ""}`}>
              {t("hero.subtitle")}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className={`mt-9 flex flex-wrap items-center gap-3 ${justifyEnd}`}>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
                <Link
                  to={ctaTo}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated"
                  style={{ boxShadow: "0 18px 50px -16px oklch(0.66 0.225 40 / 0.55)" }}
                >
                  <span className="relative z-10">{t("hero.ctaPrimary")}</span>
                  <span aria-hidden className="relative z-10 transition group-hover:-translate-x-0.5">{arrow}</span>
                </Link>
              </motion.div>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2.5 rounded-full border border-foreground/20 bg-card/70 px-5 py-3.5 text-sm font-medium text-foreground backdrop-blur transition hover:border-foreground/40"
              >
                {t("nav.pricing")}
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem>
            <dl className={`mt-12 grid max-w-lg grid-cols-3 gap-6 ${dir === "rtl" ? "ms-auto" : ""}`}>
              {[
                { k: t("hero.stat1k"), v: t("hero.stat1v") },
                { k: t("hero.stat2k"), v: t("hero.stat2v") },
                { k: t("hero.stat3k"), v: t("hero.stat3v") },
              ].map((s, i) => (
                <div key={i} className={alignText}>
                  <dt className="text-2xl font-bold tracking-tight sm:text-3xl">{s.k}</dt>
                  <dd className="mt-1 text-[12px] font-medium text-foreground/70">{s.v}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------------- Video Showcase ---------------- */
function VideoShowcase() {
  const { t } = useI18n();
  return (
    <section id="video" className="relative py-24 lg:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 text-center">
          <Eyebrow>{t("video.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">
            {t("video.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-foreground/75 lg:text-base">
            {t("video.subtitle")}
          </p>
        </Reveal>
        <Reveal y={28}>
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-3xl bg-ink ring-1 ring-white/[0.08] shadow-ink">
            <div className="grain-overlay absolute inset-0 opacity-60" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "radial-gradient(60% 60% at 50% 40%, oklch(0.65 0.22 45 / 0.35), transparent 70%)" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-white">
              <motion.button
                type="button"
                aria-label="Play"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated"
              >
                <svg viewBox="0 0 24 24" className="ms-1 h-8 w-8" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </motion.button>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/65">{t("video.placeholder")}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Tools Carousel ---------------- */
function ToolsCarousel() {
  const { t, dir } = useI18n();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tools = [
    { name: "Lafz", ar: "لفظ", to: "/tools/lafz" as const, kicker: t("tools.lafzKicker"), short: t("carousel.lafzShort"), accent: "oklch(0.7 0.22 45)" },
    { name: "Masar", ar: "مسار", to: "/tools/masar" as const, kicker: t("tools.masarKicker"), short: t("carousel.masarShort"), accent: "oklch(0.65 0.18 200)" },
    { name: "CutLayer", ar: "كات لاير", to: "/tools/matte" as const, kicker: t("matte.kicker"), short: t("carousel.matteShort"), accent: "oklch(0.72 0.18 320)" },
  ];

  const scrollBy = (delta: number) => {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{t("carousel.eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
              {t("carousel.title")}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-foreground/75">{t("carousel.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(dir === "rtl" ? 360 : -360)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-card/70 transition hover:border-primary/40"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(dir === "rtl" ? -360 : 360)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-card/70 transition hover:border-primary/40"
              aria-label="Next"
            >
              →
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl bg-card p-7 ring-1 ring-foreground/[0.08] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-elevated sm:w-[60%] lg:w-[32%]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1"
                style={{ background: `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`, opacity: 0.7 }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-[0.18] blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                style={{ background: tool.accent }}
              />
              <div className="relative flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                <span>{tool.kicker}</span>
              </div>
              <h3 className="relative mt-4 text-3xl font-bold tracking-tight">
                {tool.name} <span className="text-foreground/55">— {tool.ar}</span>
              </h3>
              <p className="relative mt-3 text-[14.5px] leading-[1.85] text-foreground/75">{tool.short}</p>
              <div className="relative mt-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                  {t("carousel.viewTool")}
                  <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
                </span>
                <div className="h-9 w-9 rounded-xl ring-1 ring-foreground/10" style={{ background: tool.accent, opacity: 0.85 }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Signup CTA ---------------- */
function SignupCta() {
  const { session } = useAuth();
  const { t } = useI18n();
  if (session) return null;
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="grain-overlay relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-ink p-10 text-ink-foreground shadow-ink ring-1 ring-primary/20 sm:p-14">
        <div className="absolute -right-24 -top-24 h-[24rem] w-[24rem] rounded-full opacity-70 blur-3xl" style={{ background: "var(--gradient-ember)" }} />
        <div className="relative text-center">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">{t("signupCta.eyebrow")}</div>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
            {t("signupCta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.85] text-white/80">{t("signupCta.subtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95">
              {t("signupCta.button")}
            </Link>
            <Link to="/login" className="rounded-full border border-white/25 bg-white/[0.06] px-6 py-4 text-sm font-medium text-white hover:bg-white/[0.12]">
              {t("signupCta.secondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const { t } = useI18n();
  const items = [
    { q: t("faq.q8"), a: t("faq.a8") },
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-12 text-center">
          <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">{t("faq.title")}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.85] text-foreground/75">{t("faq.subtitle")}</p>
        </Reveal>
        <div className="divide-y divide-foreground/[0.08] border-y border-foreground/[0.08]">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="block w-full text-start"
              >
                <div className="flex items-start justify-between gap-6 py-5">
                  <h3 className="text-[16px] font-semibold text-foreground">{it.q}</h3>
                  <span className={`shrink-0 text-primary transition ${isOpen ? "rotate-45" : ""}`}>+</span>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[14.5px] leading-[1.9] text-foreground/75">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact Strip ---------------- */
function ContactStrip() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-foreground/10 bg-card/70 p-8 backdrop-blur sm:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{t("nav.contact")}</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">{t("contact.title")}</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-foreground/75">{t("contact.subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <a href="https://wa.me/201004630643" target="_blank" rel="noreferrer" className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elevated">{t("contact.openWhatsapp")}</a>
            <Link to="/contact" className="rounded-full border border-foreground/20 bg-background/50 px-6 py-3.5 text-sm font-medium">{t("nav.contact")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Social ---------------- */
function Social() {
  const { t } = useI18n();
  const items = [
    { name: t("social.instagram"), handle: "@shuwaz.ai", href: "https://instagram.com/shuwaz.ai", accent: "oklch(0.65 0.22 350)", icon: (<svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>) },
    { name: t("social.youtube"), handle: "@shuwaz", href: "https://youtube.com/@shuwaz", accent: "oklch(0.65 0.22 28)", icon: (<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23 12s0-3.4-.4-5c-.2-.9-.9-1.6-1.8-1.8C19.1 5 12 5 12 5s-7.1 0-8.8.2c-.9.2-1.6.9-1.8 1.8C1 8.6 1 12 1 12s0 3.4.4 5c.2.9.9 1.6 1.8 1.8C4.9 19 12 19 12 19s7.1 0 8.8-.2c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5 .4-5zM10 15V9l5.2 3-5.2 3z"/></svg>) },
    { name: t("social.tiktok"), handle: "@shuwaz", href: "https://tiktok.com/@shuwaz", accent: "oklch(0.6 0.18 200)", icon: (<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16.5 3c.4 2.2 1.7 4 3.5 4.6V11c-1.5-.1-2.9-.5-4.2-1.2v6.4c0 4-3.3 7.3-7.3 7.3S1.2 20.2 1.2 16.2s3.3-7.3 7.3-7.3c.4 0 .7 0 1.1.1V13c-.4-.1-.7-.2-1.1-.2-1.9 0-3.4 1.5-3.4 3.4S6.6 19.6 8.5 19.6c1.9 0 3.5-1.5 3.5-3.4V3h4.5z"/></svg>) },
    { name: t("social.x"), handle: "@shuwaz", href: "https://x.com/shuwaz", accent: "oklch(0.5 0 0)", icon: (<svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.81l-5.32-6.95L4.8 22H1.5l8.04-9.18L1 2h6.96l4.8 6.34L18.244 2zm-2.39 18h1.88L7.24 4H5.27l10.585 16z"/></svg>) },
  ];
  return (
    <section className="px-4 pb-28 pt-12 sm:px-6 lg:pb-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <Eyebrow>{t("social.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{t("social.title")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.85] text-foreground/75">{t("social.subtitle")}</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <a
              key={it.name}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-40 blur-2xl transition group-hover:opacity-60" style={{ background: it.accent }} />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground" style={{ background: it.accent }}>
                {it.icon}
              </div>
              <div className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">{it.name}</div>
              <div className="relative mt-2 text-[15px] font-semibold" dir="ltr">{it.handle}</div>
              <div className="relative mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
                <span>{t("social.follow")}</span>
                <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const { t } = useI18n();
  const cols = [
    {
      title: t("nav.tools"),
      links: [
        { label: t("nav.toolsLafz"), to: "/tools/lafz" as const },
        { label: t("nav.toolsMasar"), to: "/tools/masar" as const },
        { label: t("nav.toolsMatte"), to: "/tools/matte" as const },
      ],
    },
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.pricing"), to: "/pricing" as const },
        { label: t("footer.download"), to: "/download" as const },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.contact"), to: "/contact" as const },
        { label: t("footer.refund"), to: "/refund-policy" as const },
      ],
    },
  ];

  return (
    <footer className="border-t border-foreground/[0.06] bg-foreground/[0.015]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-ink-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 12h2l2-7 3 14 3-10 2 6 2-3h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">شُوَاظ</span>
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-[1.85] text-foreground/70">{t("footer.tagline")}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <h4 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/85">{c.title}</h4>
            <ul className="space-y-3 text-[14px] text-foreground/80">
              {c.links.map((l) => (
                <li key={l.label}><Link to={l.to} className="transition hover:text-primary">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-foreground/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/40">
          <span>{t("footer.rights").replace("{year}", String(new Date().getFullYear()))}</span>
          <span>{t("footer.crafted")}</span>
        </div>
      </div>
    </footer>
  );
}
