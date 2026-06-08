import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, PrimaryButton } from "@/components/auth/AuthShell";
import { InstallSteps } from "@/components/site/InstallSteps";
import {
  EXTENSION_DOWNLOAD_URL,
  EXTENSION_FILENAME,
  EXTENSION_VERSION,
} from "@/lib/extension";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "verified" | "pending">("checking");

  useEffect(() => {
    let cancelled = false;

    // Initial check
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        setStatus("verified");
      } else {
        setStatus("pending");
      }
    });

    // Auto-detect verification (fires when user clicks email link)
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (session && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED")) {
        setStatus("verified");
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Auto-redirect once verified
  useEffect(() => {
    if (status !== "verified") return;
    const t = setTimeout(() => navigate({ to: "/dashboard", replace: true }), 1200);
    return () => clearTimeout(t);
  }, [status, navigate]);

  return (
    <AuthShell
      title={status === "verified" ? "اكتمل التأكيد ✓" : "تأكيد البريد الإلكتروني"}
      subtitle={
        status === "verified"
          ? "تمت عملية التأكيد بنجاح. حسابك جاهز، وسيتم تحويلك إلى لوحة التحكم خلال لحظات…"
          : "تحقّق من صندوق الوارد (وراجع مجلد Spam إن لزم) واضغط على رابط التأكيد لتفعيل حسابك. ستنتقل تلقائيًا بمجرد التأكيد."
      }
    >
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30">
          {status === "verified" ? (
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="h-8 w-8 text-primary animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          )}
        </div>
        {status === "verified" ? (
          <Link to="/dashboard">
            <PrimaryButton type="button">الذهاب للوحة التحكم</PrimaryButton>
          </Link>
        ) : (
          <Link to="/login" className="inline-block text-sm text-primary hover:underline">
            العودة لتسجيل الدخول
          </Link>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-right">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold">حمّل الإضافة وابدأ التثبيت</div>
              <div className="mt-0.5 text-[13px] text-ink-foreground/60">
                Premiere Pro و After Effects — {EXTENSION_VERSION}
              </div>
            </div>
            <a
              href={EXTENSION_DOWNLOAD_URL}
              download={EXTENSION_FILENAME}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95"
            >
              تحميل .zxp
            </a>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
              خطوات التثبيت عبر ZXP Installer
            </summary>
            <div className="mt-3">
              <InstallSteps compact />
            </div>
          </details>
          <Link
            to="/download"
            className="mt-3 inline-block text-xs text-ink-foreground/60 hover:text-ink-foreground"
          >
            عرض الدليل الكامل ←
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
