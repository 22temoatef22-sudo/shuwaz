import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { ShuwazLogo } from "@/components/brand/ShuwazLogo";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";

type NavLink = { key: TranslationKey; to: string; hash?: string };

const TOOLS: { key: TranslationKey; to: "/tools/lafz" | "/tools/masar" | "/tools/matte" }[] = [
  { key: "nav.toolsLafz", to: "/tools/lafz" },
  { key: "nav.toolsMasar", to: "/tools/masar" },
  { key: "nav.toolsMatte", to: "/tools/matte" },
];

const LINKS: NavLink[] = [
  { key: "nav.home", to: "/" },
  { key: "nav.features", to: "/", hash: "features" },
  { key: "nav.pricing", to: "/pricing" },
  { key: "nav.download", to: "/download" },
  { key: "nav.contact", to: "/contact" },
];

export function Nav() {
  const { session } = useAuth();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement | null>(null);
  const { location } = useRouterState();

  useEffect(() => {
    setOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isActive = (l: NavLink) =>
    l.hash ? false : location.pathname === l.to;
  const toolsActive = location.pathname.startsWith("/tools/");

  return (
    <motion.header
      className="relative z-30"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="group">
          <ShuwazLogo variant="full" size={34} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className={`relative text-sm transition hover:text-foreground ${
              location.pathname === "/" ? "text-foreground font-semibold" : "text-foreground/70"
            }`}
          >
            {t("nav.home")}
          </Link>

          {/* Tools dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((v) => !v)}
              aria-expanded={toolsOpen}
              className={`relative inline-flex items-center gap-1 text-sm transition hover:text-foreground ${
                toolsActive ? "text-foreground font-semibold" : "text-foreground/70"
              }`}
            >
              <span>{t("nav.tools")}</span>
              <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition ${toolsOpen ? "rotate-180" : ""}`} fill="currentColor"><path d="M5.5 7.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-40 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-foreground/10 bg-card/95 p-2 shadow-elevated backdrop-blur"
                >
                  {TOOLS.map((tl) => (
                    <Link
                      key={tl.to}
                      to={tl.to}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-foreground/85 transition hover:bg-primary/[0.08] hover:text-foreground"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{t(tl.key)}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {LINKS.slice(1).map((l) => {
            const active = isActive(l);
            return (
              <Link
                key={l.key}
                to={l.to}
                hash={l.hash}
                className={`relative text-sm transition hover:text-foreground ${
                  active ? "text-foreground font-semibold" : "text-foreground/70"
                }`}
              >
                {t(l.key)}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          {session ? (
            <>
              <Link
                to="/account"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground sm:block"
              >
                {t("nav.account")}
              </Link>
              <Link
                to="/dashboard"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
              >
                {t("nav.dashboard")}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground sm:block"
              >
                {t("nav.login")}
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
              >
                {t("nav.signup")}
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label={t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ms-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/15 text-foreground/80 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 rounded-2xl border border-foreground/10 bg-card/95 p-4 shadow-elevated backdrop-blur">
            <nav className="flex flex-col gap-1">
              <Link to="/" className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/85 hover:bg-foreground/[0.05]">{t("nav.home")}</Link>
              <div className="mt-1 px-3 pt-2 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/50">{t("nav.tools")}</div>
              {TOOLS.map((tl) => (
                <Link key={tl.to} to={tl.to} className="rounded-lg px-3 py-2.5 text-[14.5px] text-foreground/85 hover:bg-foreground/[0.05]">
                  {t(tl.key)}
                </Link>
              ))}
              <div className="mt-2 border-t border-foreground/[0.06] pt-2" />
              {LINKS.slice(1).map((l) => (
                <Link
                  key={l.key}
                  to={l.to}
                  hash={l.hash}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/85 hover:bg-foreground/[0.05]"
                >
                  {t(l.key)}
                </Link>
              ))}
              <Link
                to="/refund-policy"
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/85 hover:bg-foreground/[0.05]"
              >
                {t("nav.refund")}
              </Link>
              {!session && (
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/85 hover:bg-foreground/[0.05] sm:hidden"
                >
                  {t("nav.login")}
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  );
}
