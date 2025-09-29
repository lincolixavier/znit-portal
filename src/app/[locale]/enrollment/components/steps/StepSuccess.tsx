"use client";

import styles from "./steps.module.scss";
import Image from "next/image";
import { Download } from "lucide-react";

type Props = {
  onDownload?: () => void;
};

export default function StepSuccess({ onDownload }: Props) {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="12" fill="#009EC5" />
            <path
              d="M7 12.5l3.5 3.5 6-7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
