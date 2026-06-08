import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, Field, PrimaryButton, ErrorBanner } from "@/components/auth/AuthShell";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function errorKey(msg: string): TranslationKey {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "auth.err.invalid";
  if (m.includes("email not confirmed")) return "auth.err.unconfirmed";
  if (m.includes("rate")) return "auth.err.rate";
  return "auth.err.unknown";
}

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(t(errorKey(error.message)));
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      footer={
        <>
          {t("auth.login.noAccount")}{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            {t("auth.login.signupLink")}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <ErrorBanner message={error} />
        <Field
          label={t("auth.email")}
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
        <Field
          label={t("auth.password")}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[13px] text-ink-foreground/65 hover:text-primary">
            {t("auth.login.forgot")}
          </Link>
        </div>
        <PrimaryButton loading={loading}>{t("auth.login.submit")}</PrimaryButton>
      </form>
    </AuthShell>
  );
}
