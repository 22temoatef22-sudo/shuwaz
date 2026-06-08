import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Locale, type TranslationKey } from "./translations";

export const LOCALES: { code: Locale; label: string; native: string; dir: "rtl" | "ltr"; flag: string }[] = [
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "en", label: "English", native: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "fr", label: "French", native: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "pt", label: "Portuguese", native: "Português", dir: "ltr", flag: "🇵🇹" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr", flag: "🇪🇸" },
];

const STORAGE_KEY = "shuwaz:locale:v2";

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && translations[saved]) setLocaleState(saved);
    } catch {}
  }, []);

  const dir = useMemo(() => (locale === "ar" ? "rtl" : "ltr") as "rtl" | "ltr", [locale]);

  // Sync <html> lang/dir
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      const dict = translations[locale] || translations.ar;
      return dict[key] ?? translations.ar[key] ?? key;
    },
    [locale],
  );

  const value = useMemo<Ctx>(() => ({ locale, dir, setLocale, t }), [locale, dir, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
