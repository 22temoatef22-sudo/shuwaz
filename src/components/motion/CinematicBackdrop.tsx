import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  x: (13 + i * 17) % 100,
  y: 62 + ((i * 11) % 36),
  size: 1 + ((i * 7) % 25) / 10,
  delay: (i * 0.65) % 8,
  duration: 14 + ((i * 3) % 10),
  driftY: -240 - ((i * 23) % 120),
  driftX: ((i * 19) % 60) - 30,
}));

/**
 * Ambient cinematic backdrop — slow drifting ember glows + subtle particles.
 * GPU-accelerated (transform/opacity only). Pointer-events: none.
 */
export function CinematicBackdrop({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const reduce = useReducedMotion();

  const isDark = variant === "dark";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Drifting ember glow — top right */}
      <motion.div
        className="absolute -right-32 -top-40 h-[42rem] w-[42rem] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, oklch(0.66 0.225 40 / 0.28), transparent 65%)"
            : "radial-gradient(circle, oklch(0.78 0.18 55 / 0.22), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={
          reduce
            ? undefined
            : { x: [0, 30, -10, 0], y: [0, 20, -15, 0], scale: [1, 1.08, 0.95, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting ember glow — bottom left */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[38rem] w-[38rem] rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, oklch(0.78 0.16 48 / 0.2), transparent 65%)"
            : "radial-gradient(circle, oklch(0.86 0.12 65 / 0.2), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={
          reduce
            ? undefined
            : { x: [0, -25, 15, 0], y: [0, -20, 10, 0], scale: [1, 1.05, 0.92, 1] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Ember particles */}
      {!reduce &&
        PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "oklch(0.8 0.2 55 / 0.7)",
              boxShadow: "0 0 8px oklch(0.78 0.2 50 / 0.5)",
            }}
            animate={{
              y: [0, p.driftY],
              opacity: [0, 0.9, 0],
              x: [0, p.driftX],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
    </div>
  );
}
