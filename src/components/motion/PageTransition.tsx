import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Smooth cinematic transition between routes.
 * SSR-safe: renders children plainly on first paint, then enables transitions
 * after client mount. Prevents blank/invisible UI from hydration mismatches.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { location } = useRouterState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.96, y: -2 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Cinematic boot loader — Shuwaz ember pulse */
export function BrandLoader({ label = "جارٍ التحميل" }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <motion.div
          className="relative h-16 w-16"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.2 50 / 0.6), transparent 70%)",
              filter: "blur(10px)",
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute inset-3 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.86 0.18 65), oklch(0.62 0.22 32))",
              boxShadow: "0 0 24px oklch(0.7 0.22 42 / 0.6)",
            }}
            animate={{ scale: [1, 0.92, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/55">
          {label}
        </span>
      </div>
    </div>
  );
}
