export function MapMockup() {
  return (
    <div
      dir="ltr"
      className="grain-overlay relative overflow-hidden rounded-2xl bg-ink text-ink-foreground shadow-ink ring-1 ring-white/[0.06]"
    >
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-[10px] font-bold text-primary">M</span>
          <span className="text-[12px] font-semibold tracking-tight text-white/90">Masar</span>
          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-white/45">scene 03</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/45">
          <span className="font-mono">26.4°N · 38.0°E</span>
        </div>
      </div>

      <div
        className="relative aspect-[16/10] w-full"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, oklch(0.42 0.06 65 / 0.7), transparent 50%), radial-gradient(circle at 80% 75%, oklch(0.32 0.05 50 / 0.7), transparent 55%), linear-gradient(180deg, oklch(0.18 0.02 60), oklch(0.13 0.015 55))",
        }}
      >
        {/* graticule */}
        <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 800 500" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="oklch(0.5 0.02 60 / 0.4)" strokeWidth="0.4" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="oklch(0.78 0.18 45)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.68 0.21 38)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="500" fill="url(#grid)" />

          {/* terrain contours */}
          <g fill="none" stroke="oklch(0.6 0.05 50 / 0.18)" strokeWidth="0.8">
            <path d="M 80 380 Q 240 320 380 360 T 720 280" />
            <path d="M 60 410 Q 250 360 400 390 T 740 320" />
            <path d="M 100 350 Q 260 290 380 320 T 700 240" />
          </g>

          {/* route glow */}
          <circle cx="700" cy="110" r="80" fill="url(#glow)" />
          {/* dashed route */}
          <path
            d="M 110 380 C 230 310, 290 220, 420 240 S 640 150, 700 110"
            fill="none"
            stroke="oklch(0.78 0.18 50)"
            strokeWidth="2.2"
            strokeDasharray="6 7"
            strokeLinecap="round"
          />
          {/* solid traveled */}
          <path
            d="M 110 380 C 200 330, 250 270, 320 250"
            fill="none"
            stroke="oklch(0.85 0.16 60)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* pins */}
          <g>
            <circle cx="110" cy="380" r="9" fill="oklch(0.18 0.01 60)" stroke="oklch(0.78 0.18 50)" strokeWidth="1.5" />
            <circle cx="110" cy="380" r="3" fill="oklch(0.85 0.16 60)" />

            <circle cx="420" cy="240" r="7" fill="oklch(0.18 0.01 60)" stroke="oklch(0.6 0.04 60)" strokeWidth="1" />
            <circle cx="420" cy="240" r="2.5" fill="oklch(0.78 0.18 50)" />

            <g transform="translate(700,110)">
              <circle r="14" fill="oklch(0.68 0.21 38)" opacity="0.25" />
              <circle r="7" fill="oklch(0.78 0.18 50)" />
              <circle r="2.5" fill="oklch(0.99 0 0)" />
            </g>
          </g>
        </svg>

        {/* labels */}
        <div className="absolute right-[10%] top-[72%] flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-[10px] font-semibold text-black shadow">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.18_50)]" />
          الرياض
        </div>
        <div className="absolute right-[46%] top-[44%] rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white/80 ring-1 ring-white/10 backdrop-blur">
          العُلا
        </div>
        <div className="absolute left-[10%] top-[14%] flex items-center gap-1.5 rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground shadow-elevated">
          نيوم
          <span className="font-mono text-[9px] opacity-80">arr.</span>
        </div>

        {/* compass */}
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[10px] font-mono text-white/60 backdrop-blur">
          N
        </div>

        {/* scale */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-black/45 px-2 py-1 font-mono text-[9px] text-white/65 backdrop-blur">
          <div className="h-0.5 w-12 bg-white/60" />
          <span>250 km</span>
        </div>

        {/* timeline */}
        <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/55 p-2.5 ring-1 ring-white/[0.06] backdrop-blur">
          <div className="mb-2 flex items-center justify-between text-[10px] text-white/55">
            <div className="flex items-center gap-3">
              <span className="text-white/85">●</span>
              <span>Camera path</span>
              <span className="text-white/30">·</span>
              <span>Ease in-out</span>
            </div>
            <span className="font-mono">00:08.42 / 00:14.00</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-[58%] rounded-full bg-gradient-to-r from-[oklch(0.85_0.16_60)] to-[oklch(0.68_0.21_38)]" />
            <div className="absolute -top-1 left-[58%] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow" />
          </div>
        </div>
      </div>
    </div>
  );
}
