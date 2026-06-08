import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, PrimaryButton, ErrorBanner, SuccessBanner } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
      return;
    }
    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("تعذّر تحديث كلمة المرور. قد يكون الرابط منتهي الصلاحية.");
      return;
    }
    setSuccess("تم تحديث كلمة المرور بنجاح. سيتم تحويلك...");
    setTimeout(() => navigate({ to: "/dashboard" }), 1200);
  };

  return (
    <AuthShell title="إعادة تعيين كلمة المرور" subtitle="اختر كلمة مرور جديدة وقوية لحسابك.">
      <form onSubmit={onSubmit} className="space-y-4">
        <ErrorBanner message={error} />
        <SuccessBanner message={success} />
        <Field
          label="كلمة المرور الجديدة"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="new-password"
          placeholder="٨ أحرف على الأقل"
        />
        <Field
          label="تأكيد كلمة المرور"
          type="password"
          value={confirm}
          onChange={setConfirm}
          required
          autoComplete="new-password"
          placeholder="••••••••"
        />
        <PrimaryButton loading={loading}>حفظ كلمة المرور</PrimaryButton>
      </form>
    </AuthShell>
  );
}
