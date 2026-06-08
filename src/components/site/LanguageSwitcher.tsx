import { useEffect, useRef, useState } from "react";
import { LOCALES, useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("nav.language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 bg-card/70 px-2.5 py-2 text-[12.5px] font-medium text-foreground/80 backdrop-blur transition hover:border-foreground/35 hover:text-foreground ${
          compact ? "" : ""
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" strokeLinecap="round" />
        </svg>
        <span className="font-mono uppercase tracking-wider">{current.code}</span>
        <span aria-hidden className="text-[9px] opacity-60">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 w-44 overflow-hidden rounded-xl border border-foreground/10 bg-card/98 p-1 text-right shadow-elevated backdrop-blur z-50"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === locale}
                onClick={() => {
                  setLocale(l.code);
                  setOpen(false);
                }}
                dir={l.dir}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] transition ${
                  l.code === locale
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-foreground/[0.05]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="font-medium">{l.native}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                  {l.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
