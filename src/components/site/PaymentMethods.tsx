import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/primitives";
import { useI18n } from "@/i18n/I18nProvider";

export function PaymentMethods() {
  const { t } = useI18n();
  const METHODS = [
    {
      name: t("pay.applePay"),
      sub: t("pay.applePayDesc"),
      badge: <span className="rounded-md bg-black px-2.5 py-1 text-[12px] font-semibold text-white"> Pay</span>,
    },
    {
      name: t("pay.visa"),
      sub: t("pay.visaDesc"),
      badge: <span className="rounded bg-white px-2 py-0.5 text-[11px] font-extrabold tracking-wider text-[#1a1f71] ring-1 ring-foreground/10">VISA</span>,
    },
    {
      name: t("pay.mastercard"),
      sub: t("pay.mastercardDesc"),
      badge: (
        <span className="flex items-center">
          <span className="h-4 w-4 rounded-full bg-[#eb001b]" />
          <span className="-ml-2 h-4 w-4 rounded-full bg-[#f79e1b] opacity-90 mix-blend-multiply" />
        </span>
      ),
    },
    {
      name: t("pay.mobile"),
      sub: t("pay.mobileDesc"),
      badge: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M11 18h2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: t("pay.bank"),
      sub: t("pay.bankDesc"),
      badge: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10l9-6 9 6" strokeLinejoin="round" />
          <path d="M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary/60" />
              <span>{t("pay.eyebrow")}</span>
            </div>
            <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
              {t("pay.titleA")}
              <span className="text-primary"> {t("pay.titleB")}</span>
            </h2>
          </div>
          <p className="text-balance text-foreground/75 lg:col-span-5 lg:text-lg lg:leading-[1.85]">{t("pay.intro")}</p>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {METHODS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="grain-overlay group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 p-5 shadow-soft backdrop-blur transition hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold tracking-tight">{m.name}</span>
                {m.badge}
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.7] text-foreground/65">{m.sub}</p>
              <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-mono uppercase tracking-[0.18em] text-foreground/55">
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            SSL 256-bit
          </span>
          <span>·</span>
          <span>PCI-DSS Compliant</span>
          <span>·</span>
          <span>3D Secure</span>
          <span>·</span>
          <span>{t("pay.refund14")}</span>
        </div>
      </div>
    </section>
  );
}
