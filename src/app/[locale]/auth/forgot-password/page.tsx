"use client";

import Link from "next/link";
import { useState } from "react";
import InputCPF from "@/app/components/InputCPF";
import { useI18n } from "@/lib/i18n";
import styles from "./page.module.scss";

export default function ForgotPasswordPage() {
  const { translator, locale } = useI18n();
  const t = translator;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const cpf = formData.get("cpf")?.toString() || "";

    try {
      // TODO: Implement actual forgot password logic
      console.log("Forgot password request:", { cpf });
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
      
      setSuccess(true);
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(t.auth.forgotPassword.errors.userNotFound());
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={styles.forgotPassword}>
        <div className={styles.forgotPassword__success}>
          <h1 className={styles.forgotPassword__title}>
            {t.auth.forgotPassword.success()}
          </h1>
          <p className={styles.forgotPassword__subtitle}>
            {t.auth.forgotPassword.successMessage()}
          </p>
          
          <Link 
            href={`/${locale}/auth/login`} 
            className="btn btn--primary"
          >
            {t.auth.forgotPassword.backToLogin()}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotPassword}>
      <h1 className={styles.forgotPassword__title}>
        {t.auth.forgotPassword.title()}
      </h1>
      <p className={styles.forgotPassword__subtitle}>
        {t.auth.forgotPassword.subtitle()}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="cpf" className="form__label">
          {t.auth.forgotPassword.cpf()}
        </label>
        <InputCPF name="cpf" required />

        {error && (
          <div className={styles.forgotPassword__error}>
            {error}
          </div>
        )}

        <button 
          className="btn btn--primary" 
          type="submit" 
          disabled={loading}
        >
          {loading ? t.common.loading() : t.auth.forgotPassword.sendInstructions()}
        </button>
      </form>

      <p className={styles.forgotPassword__back}>
        <Link href={`/${locale}/auth/login`} className={styles.forgotPassword__backLink}>
          {t.auth.forgotPassword.backToLogin()}
        </Link>
      </p>
    </div>
  );
}
