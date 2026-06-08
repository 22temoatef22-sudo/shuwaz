import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { useI18n } from "@/i18n/I18nProvider";
import {
  EXTENSION_DOWNLOAD_URL,
  EXTENSION_FILENAME,
  EXTENSION_VERSION,
} from "@/lib/extension";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download Shuwaz extension — Premiere Pro & After Effects" },
      {
        name: "description",
        content:
          "Download the Shuwaz extension for Adobe Premiere Pro and After Effects, easily installed via ZXP Installer.",
      },
      { property: "og:title", content: "Download Shuwaz extension" },
      {
        property: "og:description",
        content: "Pro extension for Premiere & After Effects — one-click install via ZXP Installer.",
      },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const { t, dir } = useI18n();
  return (
    <div dir={dir} className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, oklch(0.66 0.225 40 / 0.25), transparent 70%), radial-gradient(50% 40% at 90% 100%, oklch(0.78 0.16 48 / 0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <Nav />

        <main className="mx-auto max-w-5xl px-6 pb-24 pt-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-ink-foreground/75">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("download.badge")}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              {t("download.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-foreground/70">
              {t("download.intro")}
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
              style={{ boxShadow: "0 20px 60px -25px oklch(0 0 0 / 0.6)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{t("download.cardTitle")}</div>
                  <div className="text-xs text-ink-foreground/60">{t("download.cardSub")}</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 font-mono text-[11px] text-ink-foreground/70">
                  {EXTENSION_VERSION}
                </span>
              </div>
              <a
                href={EXTENSION_DOWNLOAD_URL}
                download={EXTENSION_FILENAME}
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
              >
                {t("download.button")}
                <span className="font-mono text-[12px] opacity-80">{EXTENSION_FILENAME}</span>
              </a>
            </div>
          </motion.div>

          <p className="mt-6 text-center text-xs text-ink-foreground/55">{t("download.req")}</p>

          <section className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">{t("download.howTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[14px] leading-relaxed text-ink-foreground/65">
              {t("download.howIntro")}
            </p>

            <ol className="mt-10 space-y-4">
              <Step
                n={1}
                title={t("download.s1Title")}
                body={
                  <>
                    {t("download.s1Body")}
                    <a
                      href="https://aescripts.com/learn/zxp-installer/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-2 inline-block font-semibold text-primary hover:underline"
                    >
                      {t("download.s1Link")}
                    </a>
                  </>
                }
              />
              <Step n={2} title={t("download.s2Title")} body={t("download.s2Body")} />
              <Step n={3} title={t("download.s3Title")} body={t("download.s3Body")} />
              <Step n={4} title={t("download.s4Title")} body={t("download.s4Body")} />
              <Step n={5} title={t("download.s5Title")} body={t("download.s5Body")} />
              <Step n={6} title={t("download.s6Title")} body={t("download.s6Body")} />
            </ol>
          </section>

          <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h3 className="text-lg font-semibold">{t("download.troubleTitle")}</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink-foreground/75">
              <li>• {t("download.t1")}</li>
              <li>• {t("download.t2")}</li>
              <li>• {t("download.t3")}</li>
              <li>• {t("download.t4")}</li>
            </ul>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {t("download.back")}
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
        style={{ boxShadow: "inset 0 0 0 1px oklch(0.66 0.225 40 / 0.3)" }}
      >
        {n}
      </div>
      <div className="min-w-0">
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-[14px] leading-relaxed text-ink-foreground/70">{body}</div>
      </div>
    </li>
  );
}
