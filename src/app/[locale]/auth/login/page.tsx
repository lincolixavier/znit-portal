"use client";

import Link from "next/link";
import { useState } from "react";
import InputCPF from "@/app/components/InputCPF";
import { useI18n } from "@/lib/i18n";
import styles from "./page.module.scss";

export default function LoginPage() {
  const { translator, locale } = useI18n();
  const t = translator;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const cpf = formData.get("cpf")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      // TODO: Implement actual authentication logic
      console.log("Login attempt:", { cpf, password: password ? "***" : "" });
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
      
      window.location.href = `/${locale}/dashboard`; 
    } catch (error) {
      console.error("Login error:", error);
      alert(t.auth.login.errors.invalidCredentials());
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.login__title}>{t.auth.login.title()}</h1>
      <p className={styles.login__subtitle}>
        {t.auth.login.subtitle()}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="cpf" className="form__label">
          {t.auth.login.email()}
        </label>
        <InputCPF name="cpf" required />

        <label htmlFor="password" className="form__label">
          {t.auth.login.password()}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="form__input"
          required
        />

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? t.common.loading() : t.auth.login.signIn()}
        </button>

      </form>

      <p className={styles.login__signup}>
        <Link href="/forgot-password" className={styles.login__signupLink}>
          {t.auth.login.forgotPassword()}
        </Link>
      </p>
    </>
  );
}
