"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LOCALES } from "@/lib/i18n/config";
import type { Locale } from "@/messages";
import styles from "./LanguageDropdown.module.scss";

type Props = {
  currentLocale: Locale;
};

const languageNames: Record<Locale, string> = {
  pt: "Português",
  en: "English", 
  es: "Español"
};

export default function LanguageDropdown({ currentLocale }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (locale: Locale) => {
    if (locale === currentLocale) return;
    
    // Replace the current locale in the pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className={styles.language}>{languageNames[currentLocale]}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${styles.menuItem} ${locale === currentLocale ? styles.menuItemActive : ""}`}
              onClick={() => handleLanguageChange(locale)}
            >
              <span className={styles.language}>{languageNames[locale]}</span>
              {locale === currentLocale && (
                <svg className={styles.check} width="16" height="16" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
