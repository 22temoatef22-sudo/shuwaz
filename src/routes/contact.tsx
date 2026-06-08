import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shuwaz · تواصل معنا" },
      { name: "description", content: "Reach the Shuwaz team via WhatsApp, phone, or Instagram." },
      { property: "og:title", content: "Contact — Shuwaz" },
      { property: "og:description", content: "WhatsApp, phone, and Instagram support for Shuwaz users." },
    ],
  }),
  component: ContactPage,
});

const PHONE_RAW = "+201004630643";
const PHONE_DISPLAY = "+20 100 463 0643";
const WHATSAPP_URL = "https://wa.me/201004630643";
const INSTAGRAM_HANDLE = "shuwaz.ai";
const INSTAGRAM_URL = "https://instagram.com/shuwaz.ai";

function Card({
  icon,
  label,
  value,
  href,
  cta,
  accent = "oklch(0.7 0.22 45)",
  external = true,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  cta: string;
  accent?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative block overflow-hidden rounded-2xl border border-foreground/10 bg-card/70 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-40 blur-2xl transition group-hover:opacity-60"
        style={{ background: accent }}
      />
      <div
        className="relative flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
        style={{ background: accent }}
      >
        {icon}
      </div>
      <div className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/55">
        {label}
      </div>
      <div className="relative mt-2 text-lg font-semibold text-foreground" dir="ltr">
        {value}
      </div>
      <div className="relative mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
        <span>{cta}</span>
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </div>
    </a>
  );
}

function ContactPage() {
  const { t, dir } = useI18n();

  return (
    <div className="relative min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24" dir={dir}>
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-6 bg-primary/60" />
          <span>{t("nav.contact")}</span>
        </div>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.18] tracking-tight sm:text-5xl">
          {t("contact.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.95] text-foreground/80">
          {t("contact.subtitle")}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            label={t("contact.whatsapp")}
            value={PHONE_DISPLAY}
            href={WHATSAPP_URL}
            cta={t("contact.openWhatsapp")}
            accent="oklch(0.72 0.18 150)"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.9 11.9 0 0 0 1.64 6.06L0 24l6.16-1.61A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.66.96.98-3.56-.23-.37A9.93 9.93 0 1 1 12 22Zm5.45-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.43s1.04 2.82 1.18 3.02c.15.2 2.04 3.12 4.95 4.37 2.91 1.25 2.91.83 3.43.78.52-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
            }
          />
          <Card
            label={t("contact.phone")}
            value={PHONE_DISPLAY}
            href={`tel:${PHONE_RAW}`}
            cta={t("contact.callNow")}
            external={false}
            accent="oklch(0.78 0.14 80)"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <Card
            label={t("contact.instagram")}
            value={`@${INSTAGRAM_HANDLE}`}
            href={INSTAGRAM_URL}
            cta={t("contact.openInstagram")}
            accent="oklch(0.65 0.22 350)"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            }
          />
        </div>

        <section className="mt-10 rounded-2xl border border-foreground/10 bg-card/70 p-6 sm:p-8 backdrop-blur">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            {t("contact.hoursTitle")}
          </h2>
          <p className="mt-3 text-[14.5px] leading-[1.85] text-foreground/80">
            {t("contact.hours")}
          </p>
        </section>
      </main>
    </div>
  );
}
