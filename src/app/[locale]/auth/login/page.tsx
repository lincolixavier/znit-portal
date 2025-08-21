"use client";

import Link from "next/link";
import { useState } from "react";
import InputCPF from "@/app/components/InputCPF";
import styles from "./page.module.scss";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const cpf = formData.get("cpf")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    // Simulação de chamada à API
    try {
      // Aqui entra sua chamada real:
      // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ cpf, password }) });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
      

      // Redirecionamento após sucesso
      window.location.href = "/pt_BR/dashboard"; 
    } catch (err) {
      alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.login__title}>Entrar</h1>
      <p className={styles.login__subtitle}>
        Acesse com segurança e planeje com confiança.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="cpf" className="form__label">
          CPF
        </label>
        <InputCPF name="cpf" required />

        <label htmlFor="password" className="form__label">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="form__input"
          required
        />

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

      <p className={styles.login__signup}>
        <Link href="/forgot-password"className={styles.login__signupLink}>
           Esqueceu sua senha?
        </Link>
      </p>
    </>
  );
}
