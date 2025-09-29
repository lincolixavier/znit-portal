"use client";

import { useState } from "react";
import SecurityCode from "@/app/[locale]/auth/signup/security/SecurityCode";
import styles from "./steps.module.scss";

type Props = {
  onNext: (data: object) => void;
  onBack: () => void;
};

export default function StepSecurity({ onNext, onBack }: Props) {
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

    if (!code || code.length < 6) {
      setError("Digite o código de segurança");
      return;
    }

    onNext({ securityCode: code });
  };

  return (
    <div className={styles["adesao-step"]}>
      <h1 className={styles["title"]}>Etapa de segurança</h1>  

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
