import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { signupWithGuards } from "@/lib/auth-signup.functions";
import { AuthShell, Field, PrimaryButton, ErrorBanner, SuccessBanner } from "@/components/auth/AuthShell";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translations";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function codeToKey(code: string): TranslationKey {
  switch (code) {
    case "disposable_email": return "auth.err.disposable";
    case "ip_limit": return "auth.err.ipLimit";
    case "already_registered": return "auth.err.alreadyRegistered";
    case "weak_password": return "auth.err.weakPassword";
    case "rate_limited": return "auth.err.rate";
    default: return "auth.err.signupFailed";
  }
}

function SignupPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const signup = useServerFn(signupWithGuards);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password.length < 8) {
      setError(t("auth.signup.weakPwd"));
      return;
    }
    setLoading(true);
    const redirectTo = `${window.location.origin}/verify-email`;
    try {
      const result = await signup({
        data: { email, password, redirectTo },
      });
      setLoading(false);
      if (!result.ok) {
        setError(t(codeToKey(result.code)));
        if (import.meta.env.DEV && result.message) {
          // eslint-disable-next-line no-console
          console.warn("[signup] server error:", result.code, result.message);
        }
        return;
      }
      if (!result.needsConfirmation) {
        navigate({ to: "/dashboard" });
        return;
      }
      setSuccess(t("auth.signup.successConfirm"));
    } catch (err) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error("[signup] request failed", err);
      setError(t("auth.signup.networkErr"));
    }
  };

  return (
    <AuthShell
      title={t("auth.signup.title")}
      subtitle={t("auth.signup.subtitle")}
      footer={
        <>
          {t("auth.signup.haveAccount")}{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            {t("auth.signup.loginLink")}
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <ErrorBanner message={error} />
        <SuccessBanner message={success} />
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
          autoComplete="new-password"
          required
          placeholder={t("auth.signup.passwordPlaceholder")}
        />
        <PrimaryButton loading={loading}>{t("auth.signup.submit")}</PrimaryButton>
        <p className="text-center text-[12px] text-ink-foreground/55">
          {t("auth.signup.terms")}
        </p>
      </form>
    </AuthShell>
  );
}
