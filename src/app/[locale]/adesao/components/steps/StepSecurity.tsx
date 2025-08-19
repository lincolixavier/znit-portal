"use client";

import SecurityCode from "@/app/[locale]/auth/signup/security/SecurityCode";
import styles from "./steps.module.scss";

type Props = {
  onNext: (data: object) => void;
  onBack: () => void;
};

export default function StepSecurity({ onNext, onBack }: Props) {

   const handleChange = (code: string) => {
    console.log("Código parcial:", code);
  };

  const handleComplete = (code: string) => {
    console.log("Código completo:", code);
    // aqui o pai decide quando submeter
  };
  return (
     <div className={styles["adesao-step"]}>
        <h1 className={styles["title"]}>Etapa de segurança</h1>
        <p className={styles["subtitle"]}>Enviamos um código para seu email@exemplo.com.</p>

        <SecurityCode
          length={6}
          onChange={handleChange}
          onComplete={handleComplete}
        />
         {/* ações */}
       <div className={styles["actions"]}>
          <button
            type="button"
            className={styles["button-outline"]}
            onClick={onBack}
          >
            Voltar
          </button>
          <button type="submit" className={styles["button"]} onClick={onNext}>
            Continuar
          </button>
        </div>

      
    </div>
  );
}
