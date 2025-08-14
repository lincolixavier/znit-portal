"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

export default function CreatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{8,}$/.test(
    password
  );
  const passwordsMatch = password === confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid || !passwordsMatch) return;
    console.log("Nova senha criada:", password);
    // TODO: integrar com API
  };

  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>Criar senha</h1>
      <p className={styles.auth__subtitle}>
        Ainda não tem cadastro? Informe o seu CPF para receber as instruções de primeiro acesso.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        {/* Nova senha */}
        <label htmlFor="password" className="form__label">
          Nova senha
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            👁
          </button>
        </div>

        {/* Repetir senha */}
        <label htmlFor="confirm" className="form__label">
          Repetir nova senha
        </label>
        <div className={styles.passwordWrapper}>
          <input
            id="confirm"
            type={showConfirm ? "text" : "password"}
            className="form__input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowConfirm((prev) => !prev)}
            aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
          >
            👁
          </button>
        </div>

        {/* Barra de validação */}
        <div className={styles.strengthBar}>
          <div
            className={`${styles.strengthFill} ${
              passwordValid ? styles.valid : styles.invalid
            }`}
            style={{ width: password.length > 0 ? `${(password.length / 12) * 100}%` : "0%" }}
          />
        </div>

        {/* Mensagem de erro */}
        {!passwordValid && password.length > 0 && (
          <p className={styles.error}>
            Sua senha deve conter números, letras, pelo menos uma letra maiúscula e um caractere especial.
          </p>
        )}

        <button
          className="btn btn--primary"
          type="submit"
          disabled={!passwordValid || !passwordsMatch}
        >
          Continuar
        </button>
      </form>

      <p className={styles.auth__link}>
        <Link href="/login">Já tem uma conta? Clique aqui!</Link>
      </p>
    </div>
  );
}
