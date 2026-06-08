import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, PrimaryButton, ErrorBanner, SuccessBanner } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError("تعذّر إرسال الرابط. حاول مرة أخرى.");
      return;
    }
    setSuccess("إذا كان البريد مسجلًا، ستصلك رسالة لإعادة تعيين كلمة المرور.");
  };

  return (
    <AuthShell
      title="نسيت كلمة المرور؟"
      subtitle="أدخل بريدك الإلكتروني وسنرسل لك رابطًا آمنًا لإعادة التعيين."
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          العودة لتسجيل الدخول
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <ErrorBanner message={error} />
        <SuccessBanner message={success} />
        <Field
          label="البريد الإلكتروني"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
        <PrimaryButton loading={loading}>إرسال رابط الاستعادة</PrimaryButton>
      </form>
    </AuthShell>
  );
}
