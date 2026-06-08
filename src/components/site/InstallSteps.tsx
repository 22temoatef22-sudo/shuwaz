import type { ReactNode } from "react";

const STEPS: { title: string; body: ReactNode }[] = [
  {
    title: "حمّل ZXP Installer من Aescripts",
    body: (
      <>
        أداة مجانية لتثبيت إضافات Adobe.{" "}
        <a
          href="https://aescripts.com/learn/zxp-installer/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          فتح الصفحة ↗
        </a>
      </>
    ),
  },
  { title: "ثبّت ZXP Installer وافتحه", body: "ستظهر نافذة تطلب سحب ملف الإضافة." },
  { title: "حمّل ملف Lafz_v1.1.zxp", body: "احفظه على سطح المكتب." },
  { title: "اسحب الملف داخل ZXP Installer", body: "سيتم التثبيت تلقائيًا خلال ثوانٍ." },
  {
    title: "افتح بريمير أو أفترإفكت",
    body: (
      <>
        من القائمة:{" "}
        <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[12px]">
          Window → Extensions → Lafz
        </span>
      </>
    ),
  },
  { title: "سجّل الدخول بحسابك", body: "استخدم نفس بريد حسابك في شُوَاظ لتفعيل الإضافة." },
];

export function InstallSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "space-y-2" : "space-y-4"}>
      {STEPS.map((s, i) => (
        <li
          key={i}
          className={`flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] ${
            compact ? "p-3" : "p-5"
          }`}
        >
          <div
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
            style={{ boxShadow: "inset 0 0 0 1px oklch(0.66 0.225 40 / 0.3)" }}
          >
            {i + 1}
          </div>
          <div className="min-w-0">
            <div className={compact ? "text-sm font-semibold" : "font-semibold"}>{s.title}</div>
            <div
              className={`mt-0.5 ${
                compact ? "text-[13px]" : "text-[14px]"
              } leading-relaxed text-ink-foreground/70`}
            >
              {s.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
