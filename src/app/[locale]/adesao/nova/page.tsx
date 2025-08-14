import React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import AdesaoForm from "../components/AdesaoForm";

export default function AdesaoPage() {
  return (
    <main className={styles["adesao-page__wrapper"]}>
      {/* HEADER */}
      <header className={styles["adesao-page__header"]}>
        <div className={styles["adesao-page__header-content"]}>
          <Image
            priority
            src="/images/logo.svg"
            alt="Capital Prev"
            width={90}
            height={48}
          />
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className={styles["adesao-page__content"]}>
        <h1 className={styles["adesao-page__title"]}>Adesão</h1>
        <AdesaoForm />
      </section>
    </main>
  );
}
