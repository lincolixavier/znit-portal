"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";

export default function AdesaoAprovadaPage() {
  // /adesao-aprovada?nome=Marcos&protocolo=999999&link=/auth/signup
  const nome = "João da Silva";
  const protocolo = "512093";
  const portalUrl = "/pt/auth/signup"; 

  return (
    <div className={styles.page}>
      <header className={styles.header}></header>

      <main className={styles.content}>
       

        <div className={styles.card}>
           <div className={styles.logo}>
            <Image src="/images/logo.svg" alt="Capital Prev" width={120} height={40} />
          </div>
          <hr />
          <h1>Olá, {nome}!</h1>
          <p className={styles.protocol}>
            <strong>Protocolo:</strong> {protocolo}
          </p>

          <p className={styles.message}>
            Ótimas notícias, sua solicitação de adesão para o plano de previdência <strong>futuroPrev</strong> foi aprovada!
          </p>

          <p className={styles.message}>
            Acesse o portal, cadastre sua senha e comece agora a investir em um futuro com segurança e tranquilidade.
          </p>

          <Link href={portalUrl} className={styles.button}>
            Acessar o portal
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        Todos os direitos reservados, Entidade [entity_name]
      </footer>
    </div>
  );
}
