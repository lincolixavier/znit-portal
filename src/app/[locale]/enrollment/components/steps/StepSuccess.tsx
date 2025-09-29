"use client";

import styles from "./steps.module.scss";
import Image from "next/image";
import { IconDownload, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  onDownload?: () => void;
};

export default function StepSuccess({ onDownload }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de aprovação após 3 segundos
    const timer = setTimeout(() => {
      router.push("/pt/enrollment/approved");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className={styles.success}>
      {/* Blurs */}
      <div className={styles.success__blur + " " + styles["success__blur--left"]}></div>
      <div className={styles.success__blur + " " + styles["success__blur--right"]}></div>

     {/* Container principal */}
      <div className={styles.success__header}>
        {/* Confetti */}
        <div className={`${styles.success__confetti} ${styles.fadeIn}`}>
          <Image 
            src="/images/confetii.png" 
            alt="Confetti decorativo" 
            width={720} 
            height={120} 
            priority
          />
        </div>

        {/* Icon */}
        <div className={styles.success__icon}>
          <IconCheck size={80} color="#009EC5" stroke={3} />
        </div>
          {/* Text */}
      <h2 className={styles.success__title}>Agora é só aguardar!</h2>
      <p className={styles.success__subtitle}>
        Este é um passo importante para garantir a segurança do seu futuro! Você receberá um email com os próximos passos.
      </p>
      </div>
    

      {/* Download Box */}
      <div className={styles.success__download}>
        <div className={styles.success__downloadText}>
          <strong>Comprovante de solicitação de adesão</strong>
          <span>Visualize ou baixe seu comprovante</span>
        </div>
        <button
          type="button"
          className={styles.success__downloadBtn}
          onClick={onDownload}
          aria-label="Baixar comprovante"
        >
          <IconDownload size={20} />
        </button>
      </div>

      {/* Continue Button */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          type="button"
          className={styles["button"]}
          onClick={() => router.push("/pt/enrollment/approved")}
        >
          Continuar para cadastro de senha
        </button>
      </div>
    </div>
  );
}
