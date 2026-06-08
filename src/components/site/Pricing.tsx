import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";

type Plan = {
  id: string;
  nameKey: TranslationKey;
  taglineKey: TranslationKey;
  ctaKey: TranslationKey;
  priceUSD: number;
  minutes: number;
  minutesLabel: string;
  usage: number;
  featureKeys: TranslationKey[];
  featured?: boolean;
  accent: string;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    nameKey: "pricing.starterName",
    taglineKey: "pricing.starterTagline",
    ctaKey: "pricing.startNow",
    priceUSD: 8, minutes: 30, minutesLabel: "Creator Minutes", usage: 0.18,
    accent: "oklch(0.78 0.14 80)",
    featureKeys: ["plan.s1","plan.s2","plan.s3","plan.s4","plan.s5"],
  },
  {
    id: "pro",
    nameKey: "pricing.proName",
    taglineKey: "pricing.proTagline",
    ctaKey: "pricing.tryFree",
    priceUSD: 20, minutes: 120, minutesLabel: "Creator Minutes", usage: 0.55,
    featured: true,
    accent: "oklch(0.7 0.22 45)",
    featureKeys: ["plan.p1","plan.p2","plan.p3","plan.p4","plan.p5"],
  },
  {
    id: "agency",
    nameKey: "pricing.agencyName",
    taglineKey: "pricing.agencyTagline",
    ctaKey: "pricing.startNow",
    priceUSD: 40, minutes: 300, minutesLabel: "Studio Minutes", usage: 1,
    accent: "oklch(0.7 0.12 250)",
    featureKeys: ["plan.a1","plan.a2","plan.a3","plan.a4","plan.a5"],
  },
];

const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EGP: 50, SAR: 3.75, AED: 3.67, EUR: 0.92, GBP: 0.79,
  KWD: 0.31, QAR: 3.64, JOD: 0.71, MAD: 10, TRY: 34,
};
const COUNTRY_CURRENCY: Record<string, string> = {
  EG: "EGP", SA: "SAR", AE: "AED", KW: "KWD", QA: "QAR",
  JO: "JOD", MA: "MAD", TR: "TRY", US: "USD", GB: "GBP",
  FR: "EUR", DE: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
};
const ARABIC_CURRENCY_LABEL: Record<string, string> = {
  USD: "دولار", EGP: "جنيه مصري", SAR: "ريال سعودي",
  AED: "درهم إماراتي", KWD: "دينار كويتي", QAR: "ريال قطري",
  JOD: "دينار أردني", MAD: "درهم مغربي", TRY: "ليرة تركية",
  EUR: "يورو", GBP: "جنيه إسترليني",
};

function formatLocal(amount: number, currency: string) {
  const rounded = amount >= 100 ? Math.round(amount / 10) * 10 : Math.round(amount);
  try {
    return new Intl.NumberFormat("ar-EG", {
      style: "currency", currency, maximumFractionDigits: 0,
    }).format(rounded);
  } catch {
    return `${rounded} ${currency}`;
  }
}

type Billing = "monthly" | "yearly";

const RATE_CACHE_KEY = "shuwaz:fx:v1";
const RATE_TTL_MS = 1000 * 60 * 30; // 30 min
const REFRESH_INTERVAL_MS = 1000 * 60 * 5; // re-poll every 5 min while page is open

type FxCache = { currency: string; rate: number; ts: number };

function readCache(): FxCache | null {
  try {
    const raw = localStorage.getItem(RATE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FxCache;
    if (!parsed?.currency || !parsed?.rate || !parsed?.ts) return null;
    if (Date.now() - parsed.ts > RATE_TTL_MS) return null;
    return parsed;
  } catch { return null; }
}
function writeCache(c: FxCache) {
  try { localStorage.setItem(RATE_CACHE_KEY, JSON.stringify(c)); } catch {}
}

async function fetchJson(url: string, timeoutMs = 4500) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error("bad response");
    return await r.json();
  } finally { clearTimeout(t); }
}

async function resolveCurrency(): Promise<string> {
  try {
    const geo = await fetchJson("https://ipapi.co/json/");
    const cc: string = geo.country_code || geo.country || "";
    return geo.currency || COUNTRY_CURRENCY[cc] || "USD";
  } catch {
    return "USD";
  }
}

async function fetchRate(cur: string): Promise<number> {
  if (cur === "USD") return 1;
  // Try multiple providers for resilience
  try {
    const j = await fetchJson("https://open.er-api.com/v6/latest/USD");
    const r = j?.rates?.[cur];
    if (typeof r === "number" && r > 0) return r;
  } catch {}
  try {
    const j = await fetchJson(`https://api.frankfurter.app/latest?from=USD&to=${cur}`);
    const r = j?.rates?.[cur];
    if (typeof r === "number" && r > 0) return r;
  } catch {}
  return FALLBACK_RATES[cur] ?? 1;
}

const MANUAL_CURRENCY_KEY = "shuwaz:fx:manual";

function readManualCurrency(): string | null {
  try { return localStorage.getItem(MANUAL_CURRENCY_KEY); } catch { return null; }
}
function writeManualCurrency(cur: string | null) {
  try {
    if (cur) localStorage.setItem(MANUAL_CURRENCY_KEY, cur);
    else localStorage.removeItem(MANUAL_CURRENCY_KEY);
  } catch {}
}

const SUPPORTED_CURRENCIES = ["USD","EGP","SAR","AED","EUR","GBP","KWD","QAR","JOD","MAD","TRY"];

export function Pricing() {
  const { t, dir } = useI18n();
  const cached = typeof window !== "undefined" ? readCache() : null;
  const manual = typeof window !== "undefined" ? readManualCurrency() : null;
  const [detectedCurrency, setDetectedCurrency] = useState<string>(cached?.currency ?? "USD");
  const [currency, setCurrency] = useState<string>(manual ?? cached?.currency ?? "USD");
  const [rate, setRate] = useState<number>(cached?.rate ?? 1);
  const [ready, setReady] = useState<boolean>(!!cached);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [isManual, setIsManual] = useState<boolean>(!!manual);

  // Detect geo currency once (independent of selection)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cur = await resolveCurrency();
      if (cancelled) return;
      setDetectedCurrency(cur);
      if (!isManual) setCurrency(cur);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh rate whenever the active currency changes, on a polling interval, and on visibility
  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      const r = await fetchRate(currency);
      if (cancelled) return;
      setRate(r);
      setReady(true);
      writeCache({ currency, rate: r, ts: Date.now() });
    };
    refresh();
    const timer = setInterval(refresh, REFRESH_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [currency]);

  const selectCurrency = (cur: string, manualChoice: boolean) => {
    setCurrency(cur);
    setIsManual(manualChoice);
    writeManualCurrency(manualChoice ? cur : null);
  };

  const localLabel = useMemo(
    () => ARABIC_CURRENCY_LABEL[currency] ?? currency,
    [currency],
  );

  return (
    <section id="pricing" dir={dir} className="relative border-t border-foreground/[0.06] py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:mb-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-6 bg-primary/60" />
              <span>{t("pricing.eyebrow")}</span>
            </div>
            <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.22] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {t("pricing.titleA")}
              <br />
              <span className="text-foreground/70">{t("pricing.titleB")} </span>
              <span className="text-primary">{t("pricing.titleC")}</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
            <p className="text-balance text-foreground/75 lg:text-lg lg:leading-[1.85] lg:text-right">
              {t("pricing.intro")}
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <BillingToggle value={billing} onChange={setBilling} />
              <CurrencySelector
                currency={currency}
                detected={detectedCurrency}
                isManual={isManual}
                onSelect={selectCurrency}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={[
                "relative",
                plan.featured ? "sm:col-span-2 lg:col-span-1" : "",
                plan.featured ? "lg:-my-2" : "",
              ].join(" ")}
            >
              <PricingCard
                plan={plan}
                currency={currency}
                rate={rate}
                ready={ready}
                localLabel={localLabel}
                billing={billing}
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] text-foreground/55">
          {t("pricing.fxNote")}
        </p>
      </div>
    </section>
  );
}

function BillingToggle({
  value, onChange,
}: { value: Billing; onChange: (v: Billing) => void }) {
  return (
    <div
      role="tablist"
      aria-label="نوع الاشتراك"
      dir="rtl"
      className="relative inline-flex items-center rounded-full border border-white/10 bg-ink/85 p-1 shadow-elevated backdrop-blur-md"
    >
      {/* Sliding thumb — uses transform for smooth animation */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 right-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-elevated transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{
          transform: value === "monthly" ? "translateX(0%)" : "translateX(-100%)",
          boxShadow: "0 8px 24px -8px oklch(0.66 0.225 40 / 0.55)",
        }}
      />
      <button
        role="tab"
        aria-selected={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={[
          "relative z-10 rounded-full px-5 py-2 text-[12.5px] font-semibold transition-colors duration-300",
          value === "monthly" ? "text-primary-foreground" : "text-white/70 hover:text-white",
        ].join(" ")}
      >
        شهري
      </button>
      <button
        role="tab"
        aria-selected={value === "yearly"}
        onClick={() => onChange("yearly")}
        className={[
          "relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[12.5px] font-semibold transition-colors duration-300",
          value === "yearly" ? "text-primary-foreground" : "text-white/70 hover:text-white",
        ].join(" ")}
      >
        سنوي
        <span
          className={[
            "rounded-full px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider transition-colors duration-300",
            value === "yearly"
              ? "bg-white/20 text-white"
              : "bg-primary/20 text-primary",
          ].join(" ")}
        >
          −20%
        </span>
      </button>
    </div>
  );
}

function PricingCard({
  plan, currency, rate, ready, localLabel, billing,
}: {
  plan: Plan; currency: string; rate: number; ready: boolean;
  localLabel: string; billing: Billing;
}) {
  const { t } = useI18n();
  const featured = !!plan.featured;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({
      to: "/checkout",
      search: { plan: plan.id as "starter" | "pro" | "agency", billing },
    });
  };
  const monthlyEffective = billing === "yearly" ? plan.priceUSD * 0.8 : plan.priceUSD;
  const displayUSD = Math.round(monthlyEffective);
  const localAmount = monthlyEffective * rate;
  const showLocal = ready && currency !== "USD";

  return (
    <div className="group relative h-full">
      {featured && (
        <div className="pointer-events-none absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full opacity-70 blur-md"
              style={{ background: "var(--gradient-ember)" }}
            />
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/40 bg-ink px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary shadow-elevated">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              الأكثر استخدامًا · Most Popular
            </span>
          </div>
        </div>
      )}

      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[1.6rem] opacity-80 blur-[18px] transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, oklch(0.7 0.22 45 / 0.5), transparent 70%)",
          }}
        />
      )}

      <article
        className={[
          "relative flex h-full flex-col overflow-hidden rounded-[1.4rem] p-5 sm:p-6",
          "transition-all duration-500 ease-out will-change-transform",
          "hover:-translate-y-1",
          "bg-ink text-ink-foreground",
          featured
            ? "ring-1 ring-primary/45 shadow-ink"
            : "ring-1 ring-white/[0.08] hover:ring-white/20 shadow-soft",
        ].join(" ")}
        style={
          featured
            ? {
                backgroundImage:
                  "radial-gradient(120% 80% at 100% 0%, oklch(0.45 0.18 40 / 0.35), transparent 55%), linear-gradient(180deg, oklch(0.18 0.04 40), oklch(0.12 0.02 30))",
              }
            : {
                backgroundImage:
                  `radial-gradient(120% 70% at 0% 0%, ${plan.accent.replace(")", " / 0.18)")}, transparent 55%), linear-gradient(180deg, oklch(0.16 0.015 40), oklch(0.11 0.012 30))`,
              }
        }
      >
        {/* hover sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              `linear-gradient(135deg, transparent 60%, ${plan.accent.replace(")", " / 0.18)")})`,
          }}
        />
        {featured && <div className="grain-overlay pointer-events-none absolute inset-0 opacity-60" />}

        {/* Header */}
        <header className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span style={{ color: featured ? "var(--primary)" : plan.accent }}>{t(plan.nameKey)}</span>
            <span className="h-px w-5" style={{ background: featured ? "color-mix(in oklab, var(--primary) 50%, transparent)" : `${plan.accent.replace(")", " / 0.5)")}` }} />
          </div>
        </header>

        <p className="relative mt-2.5 text-[12.5px] leading-[1.7] text-white/55">
          {t(plan.taglineKey)}
        </p>

        {/* Price */}
        <div className="relative mt-5">
          <div className="flex items-baseline gap-1.5" dir="ltr">
            <span className="text-[20px] font-medium text-white/55">$</span>
            <span
              key={`${displayUSD}-${billing}`}
              className="inline-block text-[52px] font-bold leading-none tracking-tight text-white sm:text-[60px] animate-[fade-in_0.35s_ease-out]"
            >
              {displayUSD}
            </span>
            <span className="ms-1 text-[12.5px] text-white/55">/ mo</span>
          </div>

          <div
            className={[
              "mt-2 flex h-5 items-center gap-2 text-[12px] transition-all duration-500",
              showLocal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
            ].join(" ")}
          >
            {showLocal && (
              <span
                key={`${currency}-${localAmount.toFixed(2)}`}
                className="inline-flex items-center gap-1 font-medium text-white animate-[fade-in_0.4s_ease-out]"
              >
                ≈ {formatLocal(localAmount, currency)}
                <span className="text-white/70">· {localLabel}</span>
              </span>
            )}
            {billing === "yearly" && (
              <span className="ms-auto rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                وفّر 20%
              </span>
            )}
          </div>
        </div>

        {/* Minutes — improved hierarchy */}
        <div className="relative mt-5 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/45">
                {plan.minutesLabel}
              </span>
              <span className="text-[11.5px] text-white/65">دقائق المعالجة الشهرية</span>
            </div>
            <div className="flex items-baseline gap-1" dir="ltr">
              <span className="text-[28px] font-bold leading-none text-white">{plan.minutes}</span>
              <span className="text-[11px] font-medium text-white/45">min</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full transition-[width] duration-700 ease-out"
              style={{
                width: `${plan.usage * 100}%`,
                background: featured
                  ? "var(--gradient-ember)"
                  : `linear-gradient(90deg, ${plan.accent.replace(")", " / 0.95)")}, ${plan.accent.replace(")", " / 0.4)")})`,
                boxShadow: featured
                  ? "0 0 14px oklch(0.7 0.22 45 / 0.6)"
                  : `0 0 12px ${plan.accent.replace(")", " / 0.45)")}`,
              }}
            />
          </div>
        </div>

        {/* Features — RTL aligned */}
        <ul className="relative mt-5 space-y-2.5 text-[13.5px] leading-[1.7]" dir="rtl">
          {plan.featureKeys.map((fk) => (
            <li key={fk} className="flex items-start gap-2.5 text-right">
              <span
                className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: featured ? "var(--primary)" : plan.accent,
                  boxShadow: `0 0 8px ${featured ? "oklch(0.7 0.22 45 / 0.6)" : plan.accent.replace(")", " / 0.5)")}`,
                }}
              />
              <span className="text-white/85">{t(fk)}</span>
            </li>
          ))}
        </ul>

        {/* CTA — slimmer */}
        <div className="relative mt-6 pt-1">
          <button
            type="button"
            onClick={handleClick}
            className={[
              "group/btn inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-all duration-300",
              featured
                ? "bg-primary text-primary-foreground shadow-elevated hover:opacity-95"
                : "border border-white/15 bg-white/[0.03] text-white hover:border-primary hover:bg-primary hover:text-primary-foreground",
            ].join(" ")}
          >
            <span>{t(plan.ctaKey)}</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover/btn:-translate-x-0.5"
            >
              ←
            </span>
          </button>
        </div>
      </article>
    </div>
  );
}

function CurrencySelector({
  currency, detected, isManual, onSelect,
}: {
  currency: string;
  detected: string;
  isManual: boolean;
  onSelect: (cur: string, manual: boolean) => void;
}) {
  const showLocalQuick = detected && detected !== "USD";
  const options = Array.from(new Set([detected, ...SUPPORTED_CURRENCIES])).filter(Boolean);

  return (
    <div
      dir="ltr"
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink/85 p-1 shadow-elevated backdrop-blur-md"
      aria-label="Currency"
    >
      <button
        type="button"
        onClick={() => onSelect("USD", true)}
        aria-pressed={currency === "USD"}
        className={[
          "rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-300",
          currency === "USD"
            ? "bg-primary text-primary-foreground shadow-elevated"
            : "text-white/70 hover:text-white",
        ].join(" ")}
      >
        USD
      </button>
      {showLocalQuick && (
        <button
          type="button"
          onClick={() => onSelect(detected, true)}
          aria-pressed={currency === detected}
          className={[
            "rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors duration-300",
            currency === detected
              ? "bg-primary text-primary-foreground shadow-elevated"
              : "text-white/70 hover:text-white",
          ].join(" ")}
        >
          {detected}
        </button>
      )}
      <div className="relative">
        <select
          value={currency}
          onChange={(e) => onSelect(e.target.value, true)}
          className="appearance-none rounded-full bg-transparent py-1.5 pl-2 pr-6 text-[11.5px] font-semibold text-white/80 outline-none hover:text-white focus:text-white"
          aria-label="Choose currency"
        >
          {options.map((c) => (
            <option key={c} value={c} className="bg-ink text-white">
              {c}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white/50">▾</span>
      </div>
      {isManual && currency !== detected && detected && (
        <button
          type="button"
          onClick={() => onSelect(detected, false)}
          className="ms-1 rounded-full px-2 py-1 text-[10px] font-medium text-white/50 hover:text-white"
          title="Reset to detected currency"
        >
          ↺
        </button>
      )}
    </div>
  );
}
