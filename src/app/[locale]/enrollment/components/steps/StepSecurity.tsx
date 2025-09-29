"use client";

import { useState } from "react";
import SecurityCode from "@/app/[locale]/auth/signup/security/SecurityCode";
import { tempStorage } from "@/lib/tempStorage";
import styles from "./steps.module.scss";

type Props = {
  onNext: (data: object) => void;
  onBack: () => void;
};

export default function StepSecurity({ onNext, onBack }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (code: string) => {
    setCode(code);
  };

  const handleComplete = (code: string) => {
    setCode(code);
  };

  const handleSubmit = () => {
    setError("");

    // Validações
    if (!password || password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (!code || code.length < 6) {
      setError("Digite o código de segurança");
      return;
    }

    // TEMP: Obter CPF dos dados salvos e criar conta
    const userData = tempStorage.getUserData();
    const cpf = userData?.step1?.cpf as string;
    
    if (cpf) {
      tempStorage.createAccount(cpf, password);
    }

    onNext({ password, securityCode: code });
  };

  return (
    <div className={styles["adesao-step"]}>
      <h1 className={styles["title"]}>Etapa de segurança</h1>
      <p className={styles["subtitle"]}>
        Crie sua senha e confirme com o código enviado para seu email
      </p>

      <div className={styles["row"]}>
        <div className={`${styles["field"]} ${styles["w-100"]}`}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha (mínimo 6 caracteres)"
          />
        </div>
      </div>

      <div className={styles["row"]}>
        <div className={`${styles["field"]} ${styles["w-100"]}`}>
          <label>Confirmar senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Digite sua senha novamente"
          />
        </div>
      </div>

      <div className={styles["section-title"]}>
        <h2>Código de segurança</h2>
        <p>Enviamos um código para seu email</p>
      </div>

      <SecurityCode
        length={6}
        onChange={handleChange}
        onComplete={handleComplete}
      />

      {error && (
        <div className={styles["error-text"]} style={{ marginTop: "1rem" }}>
          {error}
        </div>
      )}

      {/* ações */}
      <div className={styles["actions"]}>
        <button
          type="button"
          className={styles["button-outline"]}
          onClick={onBack}
        >
          Voltar
        </button>
        <button type="button" className={styles["button"]} onClick={handleSubmit}>
          Continuar
        </button>
      </div>
    </div>
  );
}
