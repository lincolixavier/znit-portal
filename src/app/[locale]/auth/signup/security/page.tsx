"use client";

import SecurityCode from "./SecurityCode";
import styles from "./page.module.scss";

export default function SecurityPage() {
  return (
     <>
      <div className={styles.formSide}>
        <h1 className={styles.title}>Etapa de segurança</h1>
        <p className={styles.subtitle}>
          Enviaremos um código de verificação para o e-mail informado, caso ele esteja cadastrado.
        </p>

        <SecurityCode
          length={6}
          onSubmit={(code) => {
            console.log("Código:", code);
          }}
          onResend={() => {
            console.log("Reenviar código");
          }}
        />
        
      </div>
    </>
  );
}
