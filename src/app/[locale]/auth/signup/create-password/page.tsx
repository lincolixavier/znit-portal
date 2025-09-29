"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff, IconCheck, IconX, IconLock } from "@tabler/icons-react";

export default function CreatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  // Validação progressiva da senha
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]/.test(password)
  };

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirm && password.length > 0;
  
  // Calcular progresso da senha (0-100%)
  const passwordProgress = Object.values(passwordChecks).filter(Boolean).length * 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid || !passwordsMatch) return;
    console.log("Nova senha criada:", password);
    // TODO: integrar com API
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__header}>
        <h1 className={styles.auth__title}>Criar senha</h1>
      </div>
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
            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
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
            {showConfirm ? <IconEyeOff size={20} /> : <IconEye size={20} />}
          </button>
        </div>

        {/* Barra de validação progressiva */}
        <div className={styles.strengthBar}>
          <div
            className={`${styles.strengthFill} ${
              passwordValid ? styles.valid : styles.invalid
            }`}
            style={{ width: `${passwordProgress}%` }}
          />
        </div>

        <small>Sua senha deve conter números, letras, pelo menos uma letra maiúscula e um caracter especial.</small>

        {/* Lista de requisitos da senha 
        {password.length > 0 && (
          <div className={styles.passwordRequirements}>
            <div className={`${styles.requirement} ${passwordChecks.length ? styles.valid : styles.invalid}`}>
              {passwordChecks.length ? "✓" : "✗"} Pelo menos 8 caracteres
            </div>
            <div className={`${styles.requirement} ${passwordChecks.uppercase ? styles.valid : styles.invalid}`}>
              {passwordChecks.uppercase ? "✓" : "✗"} Uma letra maiúscula
            </div>
            <div className={`${styles.requirement} ${passwordChecks.lowercase ? styles.valid : styles.invalid}`}>
              {passwordChecks.lowercase ? "✓" : "✗"} Uma letra minúscula
            </div>
            <div className={`${styles.requirement} ${passwordChecks.number ? styles.valid : styles.invalid}`}>
              {passwordChecks.number ? "✓" : "✗"} Um número
            </div>
            <div className={`${styles.requirement} ${passwordChecks.special ? styles.valid : styles.invalid}`}>
              {passwordChecks.special ? "✓" : "✗"} Um caractere especial
            </div>
          </div>
        )}*/}
        
        {/* Validação de senhas iguais */}
        {confirm.length > 0 && (
          <div className={`${styles.passwordMatch} ${passwordsMatch ? styles.valid : styles.invalid}`}>
            {passwordsMatch ? (
              <>
                <IconCheck size={16} />
                Senhas coincidem
              </>
            ) : (
              <>
                <IconX size={16} />
                Senhas não coincidem
              </>
            )}
          </div>
        )}

        <button
          onClick={()=>{router.push("/pt/dashboard")}}
          className="btn btn--primary"
          type="submit"
          disabled={!passwordValid || !passwordsMatch}
        >
          Continuar
        </button>
      </form>

      <p className={styles.auth__link}>
        <Link href="/pt/auth/login">Já tem uma conta? Clique aqui!</Link>
      </p>
    </div>
  );
}
