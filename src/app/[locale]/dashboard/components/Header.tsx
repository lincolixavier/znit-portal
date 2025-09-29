"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IconLogout, IconUser, IconChevronDown } from "@tabler/icons-react";
import { useI18n } from "@/lib/i18n";
import { tempStorage } from "@/lib/tempStorage";
import LanguageDropdown from "./LanguageDropdown";
import styles from "../layout.module.scss";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Header({ collapsed, onToggle }: Props) {
  const { translator, locale } = useI18n();
  const t = translator;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("João");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // TEMP: Carregar nome do usuário
  useEffect(() => {
    const userData = tempStorage.getUserData();
    const name = userData?.step1?.nomeCompleto as string;
    if (name) {
      const firstName = name.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // TEMP: Limpar sessão
    tempStorage.logout();
    // Redirecionar para login
    window.location.href = `/${locale}/auth/login`;
  };

  return (
    <header className={`${styles.header} ${collapsed ? styles.headerCollapsed : ''}`}>
      <div className={styles.header__left}>
        {/* Hamburger */}
        <button
          type="button"
          className={styles.header__menu}
          aria-label={t.dashboard.header.menuToggle()}
          onClick={onToggle}
        >
          <span className={styles.header__menuBar} />
          <span className={styles.header__menuBar} />
          <span className={styles.header__menuBar} />
        </button>

        {/* Logo "capital prev" */}
        <div className={styles.header__logo} aria-label="Capital Prev">
          <Image src="/images/logo.svg" width={70} alt="logo" height={40} priority/>
        </div>
      </div>

      {/* Usuário à direita */}
      <div className={styles.header__right}>
        <LanguageDropdown currentLocale={locale} />
        
        {/* Dropdown do usuário */}
        <div className={styles.header__userDropdown} ref={dropdownRef}>
          <button
            type="button"
            className={styles.header__user}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div className={styles.header__avatar} aria-hidden>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <circle cx="12" cy="8" r="4" fill="#94A3B8" />
                <path d="M4 20c1.6-4.2 14.4-4.2 16 0" fill="#94A3B8" />
              </svg>
            </div>
            <span className={styles.header__name}>{userName}</span>
            <IconChevronDown 
              size={12} 
              className={`${styles.header__chevron} ${isDropdownOpen ? styles.header__chevronOpen : ''}`}
            />
          </button>

          {/* Menu dropdown */}
          {isDropdownOpen && (
            <div className={styles.header__dropdownMenu}>
              <Link 
                href={`/${locale}/dashboard/personal-info`}
                className={styles.header__dropdownItem}
                onClick={() => setIsDropdownOpen(false)}
              >
                <IconUser size={16} />
                <span>{t.dashboard.header.profile()}</span>
              </Link>
              
              <button
                type="button"
                className={styles.header__dropdownItem}
                onClick={handleLogout}
              >
                <IconLogout size={16} />
                <span>{t.dashboard.header.logout()}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
