import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ShuwazLogo } from "@/components/brand/ShuwazLogo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      {/* cinematic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, oklch(0.66 0.225 40 / 0.28), transparent 70%), radial-gradient(50% 40% at 90% 100%, oklch(0.78 0.16 48 / 0.18), transparent 70%), radial-gradient(40% 35% at 0% 80%, oklch(0.66 0.225 40 / 0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 py-6">
          <Link to="/" className="inline-block">
            <ShuwazLogo variant="full" size={36} />
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-5 py-10">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold leading-[1.25] sm:text-4xl">{title}</h1>
              {subtitle && (
                <p className="mt-3 text-[15px] leading-relaxed text-ink-foreground/70">{subtitle}</p>
              )}
            </div>

            <div
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.04) inset" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(0.66 0.225 40 / 0.25), transparent 35%, transparent 65%, oklch(0.78 0.16 48 / 0.18))",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: 1,
                }}
              />
              {children}
            </div>

            {footer && (
              <div className="mt-6 text-center text-sm text-ink-foreground/65">{footer}</div>
            )}
          </motion.div>
        </main>

        <footer className="px-6 py-6 text-center text-xs text-ink-foreground/40">
          © {new Date().getFullYear()} شُوَاظ — جميع الحقوق محفوظة
        </footer>
      </div>
    </div>
  );
}

export function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  dir = "ltr",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-ink-foreground/80">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        dir={dir}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-ink-foreground placeholder:text-ink-foreground/35 outline-none transition focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

export function PrimaryButton({
  children,
  loading,
  type = "submit",
  onClick,
}: {
  children: ReactNode;
  loading?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="group relative w-full overflow-hidden rounded-xl bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95 disabled:opacity-60"
      style={{ boxShadow: "0 14px 40px -12px oklch(0.66 0.225 40 / 0.55)" }}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
        )}
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-x-[-120%] bg-gradient-to-l from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
      />
    </button>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {message}
    </div>
  );
}

export function SuccessBanner({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
      {message}
    </div>
  );
}
