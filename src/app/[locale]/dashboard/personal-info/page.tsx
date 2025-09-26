"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.scss";
import PersonalInfoTab from "./components/PersonalInfoTab";
import AddressTab from "./components/AddressTab";
import BankTab from "./components/BankTab";
import SettingsTab from "./components/SettingsTab";

type ActiveTab = "personal" | "address" | "bank" | "settings";

export default function PersonalInfoPage() {
  const lastUpdate = useMemo(() => new Date().toLocaleDateString("pt-BR"), []);
  const [active, setActive] = useState<ActiveTab>("personal");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Informações pessoais</h1>
        <p className={styles.header__updated}>Última atualização: {lastUpdate}</p>
      </header>

      <nav className={styles.tabs} aria-label="Navegação das seções">
        <ul className={styles.tabs__list} role="tablist">
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={active === "personal"}
              className={`${styles.tabs__button} ${active === "personal" ? styles["is-active"] : ""}`}
              onClick={() => setActive("personal")}
            >
              Informações pessoais
            </button>
          </li>
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={active === "address"}
              className={`${styles.tabs__button} ${active === "address" ? styles["is-active"] : ""}`}
              onClick={() => setActive("address")}
            >
              Endereço
            </button>
          </li>
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={active === "bank"}
              className={`${styles.tabs__button} ${active === "bank" ? styles["is-active"] : ""}`}
              onClick={() => setActive("bank")}
            >
              Dados bancários
            </button>
          </li>
          <li>
            <button
              type="button"
              role="tab"
              aria-selected={active === "settings"}
              className={`${styles.tabs__button} ${active === "settings" ? styles["is-active"] : ""}`}
              onClick={() => setActive("settings")}
            >
              Configurações
            </button>
          </li>
        </ul>
      </nav>

      {active === "personal" && <PersonalInfoTab />}
      {active === "address" && <AddressTab />}
      {active === "bank" && <BankTab />}
      {active === "settings" && <SettingsTab />}
    </div>
  );
}