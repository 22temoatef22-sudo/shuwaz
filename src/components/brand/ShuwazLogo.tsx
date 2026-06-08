import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import shuwazLogoSrc from "@/assets/shuwaz-logo.png";

type Variant = "full" | "icon" | "mono";

/**
 * Shuwaz brand logo — cinematic ember icon + Arabic wordmark.
 * Built as inline SVG so it stays crisp at every size and supports
 * glow / shimmer / magnetic hover animations natively.
 */
export function ShuwazLogo({
  variant = "full",
  size = 36,
  className,
  animated = true,
  glow = true,
}: {
  variant?: Variant;
  size?: number;
  className?: string;
  animated?: boolean;
  glow?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !animated) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    setPos({ x: x * 6, y: y * 6 });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
      initial={animated && !reduce ? { opacity: 1, y: 0 } : false}
      animate={animated && !reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="relative inline-flex items-center justify-center"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        whileHover={animated && !reduce ? { scale: 1.06 } : undefined}
      >
        <ShuwazIcon size={size} mono={variant === "mono"} glow={glow && variant !== "mono"} />
      </motion.span>

      {variant === "full" && (
        <span
          className="font-display text-xl font-bold tracking-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          شُوَاظ
        </span>
      )}
    </motion.div>
  );
}

/** Icon-only ember mark — animated glow + shimmer */
export function ShuwazIcon({
  size = 36,
  mono = false,
  glow = true,
}: {
  size?: number;
  mono?: boolean;
  glow?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <span
      className="relative inline-block"
      style={{ width: size, height: size }}
      aria-label="Shuwaz"
    >
      {/* Soft ambient ember glow */}
      {glow && !mono && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.2 50 / 0.55), oklch(0.66 0.225 40 / 0.22) 45%, transparent 70%)",
            filter: "blur(10px)",
            transform: "scale(1.25)",
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.5, 0.95, 0.5], scale: [1.15, 1.32, 1.15] }
          }
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <img
        src={shuwazLogoSrc}
        alt=""
        width={size}
        height={size}
        draggable={false}
        className="relative block h-full w-full select-none object-contain"
        style={{
          filter: mono
            ? "brightness(0) saturate(100%)"
            : // Convert near-white source artwork into a warm ember-tinted mark
              "brightness(0) saturate(100%) invert(48%) sepia(78%) saturate(1850%) hue-rotate(355deg) brightness(96%) contrast(101%) drop-shadow(0 4px 14px oklch(0.66 0.22 40 / 0.35))",
        }}
      />
    </span>
  );
}
