"use client";

import Image from "next/image";
import styles from "../layout.module.scss";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Header({ collapsed, onToggle }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        {/* Hamburger */}
        <button
          type="button"
          className={styles.header__menu}
          aria-label="Abrir/fechar menu"
          onClick={onToggle}
        >
          <span className={styles.header__menuBar} />
          <span className={styles.header__menuBar} />
          <span className={styles.header__menuBar} />
        </button>

        {/* Logo “capital prev” */}
        <div className={styles.header__logo} aria-label="Capital Prev">
          <Image src="/images/logo.svg" width={70} alt="logo" height={40} priority/>
        </div>
      </div>

      {/* Usuário à direita */}
      <div className={styles.header__user}>
        <div className={styles.header__avatar} aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18">
            <circle cx="12" cy="8" r="4" fill="#94A3B8" />
            <path d="M4 20c1.6-4.2 14.4-4.2 16 0" fill="#94A3B8" />
          </svg>
        </div>
        <span className={styles.header__name}>Lincoli</span>
        <svg
          className={styles.header__chevron}
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="#0EA5E9" strokeWidth="2" />
        </svg>
      </div>
    </header>
  );
}
