import React from "react";
import Image from "next/image";
import { getTranslator, getLocaleFromParams } from "@/lib/i18n";
import styles from "./page.module.scss";
import AdesaoForm from "../components/AdesaoForm";

interface AdesaoPageProps {
  params: {
    locale: string;
  };
}

export default function AdesaoPage({ params }: AdesaoPageProps) {
  const locale = getLocaleFromParams(params as { locale: string });
  const t = getTranslator(locale);

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
        <AdesaoForm />
      </section>
    </main>
  );
}
