import { useI18n } from "@/i18n/I18nProvider";

export function EditorMockup() {
  const { t } = useI18n();
  const clips = [
    { t: "00:00:24:08", text: "في البداية، ليس كل شيء مثالي", dur: "1.4s" },
    { t: "00:00:28:12", text: "الفشل ليس النهاية، فشل فقط", dur: "1.7s" },
    { t: "00:00:32:00", text: "التعلّم. الاستمرار. التحسّن", dur: "1.2s" },
    { t: "00:00:38:04", text: "المستقبل لصنّاع لا يستسلمون", dur: "2.1s" },
  ];

  return (
    <div
      dir="ltr"
      className="grain-overlay relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-ink text-ink-foreground shadow-ink ring-1 ring-white/[0.06]"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <div className="hidden items-center gap-2 ps-3 text-[11px] text-white/45 sm:flex">
            <span className="font-mono">Adobe Premiere Pro</span>
            <span className="text-white/25">—</span>
            <span className="font-mono">desert_journey_v07.prproj</span>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-white/[0.04] p-0.5 text-[11px] font-medium text-white/55">
          <span className="rounded px-2.5 py-1">Editing</span>
          <span className="rounded bg-white/[0.08] px-2.5 py-1 text-white">Captions</span>
          <span className="rounded px-2.5 py-1">Color</span>
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Sidebar — Lafz panel */}
        <aside className="col-span-12 border-b border-white/[0.06] md:col-span-4 md:border-b-0 md:border-l md:border-l-white/[0.06]">
          <div className="border-b border-white/[0.06] px-4 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-[10px] font-bold text-primary">L</span>
                <span className="text-[12px] font-semibold tracking-tight text-white/90">Lafz</span>
                
              </div>
              <span className="text-white/30">⋯</span>
            </div>
          </div>

          <div className="space-y-3 p-3">
            <div className="flex items-center gap-2 rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-white/40 ring-1 ring-white/[0.04]">
              <span>⌕</span>
              <span>{t("editor.searchWords")}</span>
              <span className="ms-auto rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px]">⌘K</span>
            </div>

            <ul className="space-y-1">
              {clips.map((c, i) => (
                <li
                  key={i}
                  className={`group rounded-md border border-transparent px-2.5 py-2 ${
                    i === 2 ? "border-primary/40 bg-primary/[0.08]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span>{c.t}</span>
                    <span>{c.dur}</span>
                  </div>
                  <p dir="rtl" className="mt-1 text-right text-[12px] leading-snug text-white/85">
                    {c.text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <div className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-white/60 ring-1 ring-white/[0.04]">
                <div className="text-[9px] uppercase tracking-wider text-white/35">{t("editor.style")}</div>
                <div className="mt-0.5">Editorial</div>
              </div>
              <div className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-white/60 ring-1 ring-white/[0.04]">
                <div className="text-[9px] uppercase tracking-wider text-white/35">{t("editor.lang")}</div>
                <div className="mt-0.5">{t("editor.langValue")}</div>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-[12px] font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95">
              <span>{t("editor.generate")}</span>
              <span className="font-mono text-[10px] opacity-70">⌘⏎</span>
            </button>
          </div>
        </aside>

        {/* Preview + timeline */}
        <div className="col-span-12 md:col-span-8">
          <div className="relative m-3 overflow-hidden rounded-lg ring-1 ring-white/[0.06]">
            <div
              className="relative aspect-video w-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.42 0.1 50) 0%, oklch(0.24 0.07 38) 55%, oklch(0.13 0.04 28) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-sun)" }} />
              {/* sun */}
              <div className="absolute right-[18%] top-[22%] h-16 w-16 rounded-full bg-[oklch(0.85_0.18_60)] opacity-80 blur-[2px]" />
              {/* skyline */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2">
                <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="h-full w-full">
                  <path
                    d="M0,200 L0,150 L60,150 L80,118 L130,118 L150,95 L195,95 L215,72 L275,72 L295,108 L355,108 L375,84 L430,84 L450,128 L535,128 L555,96 L615,96 L645,136 L735,136 L765,114 L800,114 L800,200 Z"
                    fill="oklch(0.12 0.025 30)"
                    opacity="0.95"
                  />
                </svg>
              </div>
              {/* safe-area guides */}
              <div className="pointer-events-none absolute inset-[6%] border border-white/10" />
              {/* caption */}
              <div
                dir="rtl"
                className="absolute inset-x-0 bottom-[10%] mx-auto w-fit max-w-[80%] rounded-md bg-black/60 px-4 py-1.5 text-center text-[13px] font-semibold tracking-tight text-white shadow-[0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur"
              >
                التعلّم . الاستمرار . التحسّن
              </div>
              {/* HUD */}
              <div className="absolute right-3 top-3 rounded-md bg-black/45 px-2 py-1 font-mono text-[10px] text-white/70 backdrop-blur">
                3840 × 2160 · 24 fps
              </div>
            </div>
            {/* scrubber bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] text-white/50">
              <span>00:00:32:12</span>
              <div className="flex items-center gap-3">
                <span>◁◁</span>
                <span className="text-white">▶</span>
                <span>▷▷</span>
              </div>
              <span>00:01:15:00</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-white/[0.06] px-3 pb-4 pt-3">
            {/* ruler */}
            <div className="mb-2 flex items-center gap-2">
              <div className="w-12" />
              <div className="relative flex-1">
                <div className="flex justify-between font-mono text-[9px] text-white/30">
                  {["00:24", "00:28", "00:32", "00:36", "00:40", "00:44"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div
                  className="absolute -bottom-1 left-[42%] h-2 w-px bg-primary"
                  style={{ boxShadow: "0 0 0 2px oklch(0.68 0.205 42 / 0.3)" }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {[
                { tag: "V2", segs: [{ w: 18, c: "bg-primary/70", label: "Caption" }, { w: 22, c: "bg-primary/70", label: "Caption" }, { w: 14, c: "bg-primary/70" }] },
                { tag: "V1", segs: [{ w: 62, c: "bg-violet-400/55", label: "desert_master.mp4" }] },
                { tag: "A1", waveform: true, color: "bg-emerald-400/60" },
                { tag: "A2", waveform: true, color: "bg-emerald-400/30" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex w-12 items-center justify-between rounded bg-white/[0.04] px-1.5 py-1.5 font-mono text-[9px] text-white/55 ring-1 ring-white/[0.04]">
                    <span>{row.tag}</span>
                    <span className="text-white/25">●</span>
                  </div>
                  <div className="relative flex flex-1 gap-1">
                    {row.waveform ? (
                      <div className={`relative h-7 flex-1 overflow-hidden rounded ${row.color}`}>
                        <svg viewBox="0 0 400 28" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                          {Array.from({ length: 80 }).map((_, k) => {
                            const h = 4 + Math.abs(Math.sin(k * 0.6 + i)) * 18 + (k % 4) * 1.2;
                            return (
                              <rect key={k} x={k * 5} y={(28 - h) / 2} width="2.4" height={h} fill="rgba(255,255,255,0.5)" />
                            );
                          })}
                        </svg>
                      </div>
                    ) : (
                      row.segs!.map((s, j) => (
                        <div
                          key={j}
                          className={`${s.c} relative h-7 overflow-hidden rounded ring-1 ring-inset ring-white/10`}
                          style={{ width: `${s.w}%` }}
                        >
                          {s.label && (
                            <span className="absolute inset-0 flex items-center px-2 text-[9px] font-medium text-white/85">
                              {s.label}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                    {/* playhead */}
                    <div className="pointer-events-none absolute left-[42%] top-[-6px] bottom-[-6px] w-px bg-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
