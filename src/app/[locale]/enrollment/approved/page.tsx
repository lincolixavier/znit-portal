"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import { tempStorage } from "@/lib/tempStorage";
import { useEffect, useState } from "react";

export default function AdesaoAprovadaPage() {
  const [userData, setUserData] = useState<any>(null);
  const portalUrl = "/pt/auth/signup";

  useEffect(() => {
    const data = tempStorage.getUserData();
    setUserData(data);
  }, []);

  const nome = userData?.step1?.nomeCompleto || "Usuário";
  const protocolo = "512093"; // TODO: Generate real protocol number 

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
