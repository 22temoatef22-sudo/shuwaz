import { motion } from "framer-motion";
import { Reveal, EASE } from "@/components/motion/primitives";
import { useI18n } from "@/i18n/I18nProvider";

export function MatteSection() {
  const { t, dir } = useI18n();
  const FEATURES = [
    t("matte.f1"), t("matte.f2"), t("matte.f3"), t("matte.f4"),
    t("matte.f5"), t("matte.f6"), t("matte.f7"), t("matte.f8"),
  ];
  return (
    <section
      id="matte"
      className="relative overflow-hidden border-t border-foreground/[0.06] py-24 lg:py-36"
    >
      {/* Ambient cinematic glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full opacity-50 blur-[120px]"
        style={{ background: "var(--gradient-ember)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "var(--gradient-ember)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <span>03</span>
              <span className="h-px w-5 bg-primary/50" />
              <span>{t("matte.kicker")}</span>
            </div>
            <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Shuwaz CutLayer
              <br />
              <span className="text-foreground/70">{t("matte.titleA")} </span>
              <span className="text-primary">{t("matte.titleB")}</span>
            </h2>
          </div>
          <p className={`text-balance text-foreground/75 lg:col-span-5 lg:text-lg lg:leading-[1.85] ${dir === "rtl" ? "lg:text-right" : "lg:text-left"}`}>
            {t("matte.intro")}
          </p>
        </Reveal>

        <div className="relative">
          {/* Outer ember glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[2.2rem] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, oklch(0.7 0.22 45 / 0.35), transparent 70%)",
            }}
          />

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1.05, ease: EASE.out }}
            className="group relative overflow-hidden rounded-[1.8rem] bg-ink p-6 text-ink-foreground shadow-ink ring-1 ring-primary/25 sm:p-10"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 100% 0%, oklch(0.45 0.18 40 / 0.35), transparent 55%), linear-gradient(180deg, oklch(0.18 0.04 40), oklch(0.1 0.02 28))",
            }}
          >
            <div className="grain-overlay pointer-events-none absolute inset-0 opacity-60" />

            {/* Header row with badges */}
            <header className="relative flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                <span>Shuwaz</span>
                <span className="h-px w-5 bg-primary/50" />
                <span className="text-white/55">كات لاير · CutLayer</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <ComingSoonBadge />
                <Pill>{t("tools.earlyAccess")}</Pill>
                <Pill subtle>{t("tools.inDev")}</Pill>
              </div>
            </header>

            <div className="relative mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Visual mockup */}
              <div className="lg:col-span-7">
                <BeforeAfterMockup />
              </div>

              {/* Features */}
              <div className="lg:col-span-5">
                <p
                  dir={dir}
                  className="text-balance text-[14.5px] leading-[1.9] text-white/75"
                >
                  {t("matte.body")}
                </p>

                <ul
                  dir={dir}
                  className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-1"
                >
                  {FEATURES.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2.5 text-[13.5px] leading-[1.7] text-white/85 ${dir === "rtl" ? "text-right" : "text-left"}`}
                    >
                      <span
                        className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 8px oklch(0.7 0.22 45 / 0.7)" }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("matte");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
                  >
                    <span>{t("matte.joinEarly")}</span>
                    <span aria-hidden className="transition-transform group-hover/btn:-translate-x-0.5">{dir === "rtl" ? "←" : "→"}</span>
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Q3 · 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ---------- Coming Soon badge with pulse ---------- */
function ComingSoonBadge() {
  return (
    <span className="relative inline-flex items-center gap-2 rounded-full border border-primary/45 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary shadow-elevated">
      <span className="relative flex h-1.5 w-1.5">
        <motion.span
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      Coming Soon · قريبًا
    </span>
  );
}

function Pill({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) {
  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
        subtle
          ? "border border-white/10 bg-white/[0.04] text-white/65"
          : "border border-primary/30 bg-primary/10 text-primary",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* ---------- Before / After Matte Mockup ---------- */
function BeforeAfterMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/[0.08]">
      <div className="grid grid-cols-2">
        {/* BEFORE */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[oklch(0.28_0.04_30)] via-[oklch(0.22_0.05_25)] to-[oklch(0.14_0.03_28)]">
          <div className="grain-overlay pointer-events-none absolute inset-0 opacity-50" />
          <Subject tone="warm" />
          <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur">
            Before
          </div>
        </div>

        {/* AFTER — checkerboard transparency */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, oklch(0.22 0 0) 25%, transparent 25%), linear-gradient(-45deg, oklch(0.22 0 0) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, oklch(0.22 0 0) 75%), linear-gradient(-45deg, transparent 75%, oklch(0.22 0 0) 75%)",
              backgroundSize: "18px 18px",
              backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0",
              backgroundColor: "oklch(0.32 0 0)",
            }}
          />
          <Subject tone="alpha" />

          {/* AI scan beam */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-12"
            initial={{ top: "-15%" }}
            animate={{ top: "115%" }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.7 0.22 45 / 0.55), transparent)",
              filter: "blur(6px)",
            }}
          />

          <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-primary-foreground">
            <span className="h-1 w-1 rounded-full bg-white" />
            After · Alpha
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex items-center justify-between border-t border-white/[0.08] bg-black/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 backdrop-blur">
        <span>Shuwaz CutLayer · v0.1 · alpha</span>
        <span className="hidden sm:inline">edge confidence · 98.6%</span>
        <span className="text-primary">processing…</span>
      </div>
    </div>
  );
}

/* Stylized abstract subject — silhouette portrait */
function Subject({ tone }: { tone: "warm" | "alpha" }) {
  const fill =
    tone === "warm" ? "oklch(0.78 0.16 55)" : "oklch(0.7 0.22 45)";
  return (
    <svg
      viewBox="0 0 200 250"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`glow-${tone}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor={fill} stopOpacity="0.95" />
          <stop offset="60%" stopColor={fill} stopOpacity="0.55" />
          <stop offset="100%" stopColor={fill} stopOpacity="0.15" />
        </radialGradient>
      </defs>
      {/* shoulders */}
      <path
        d="M20 250 C 30 180, 70 165, 100 165 C 130 165, 170 180, 180 250 Z"
        fill={`url(#glow-${tone})`}
      />
      {/* head */}
      <ellipse cx="100" cy="105" rx="42" ry="50" fill={`url(#glow-${tone})`} />
      {/* hair wisps for edge detection visual */}
      {tone === "alpha" &&
        [60, 75, 125, 140].map((x, i) => (
          <path
            key={i}
            d={`M${x} 70 Q ${x + 6} 50, ${x + 12} 60`}
            stroke={fill}
            strokeOpacity="0.6"
            strokeWidth="1.2"
            fill="none"
          />
        ))}
    </svg>
  );
}
