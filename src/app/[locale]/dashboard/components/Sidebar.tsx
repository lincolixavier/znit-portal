"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "../layout.module.scss";

const items = [
  { href: "/app", label: "Início", icon: "home" },
  { href: "/app/extrato", label: "Extrato", icon: "receipt" },
  { href: "/app/pessoal", label: "Informações pessoais", icon: "user" },
  { href: "/app/documentos", label: "Documentos", icon: "doc" },
];

function Icon({ name }: { name: string }) {
  switch (name) {
    case "home":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M3 11l9-7 9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "receipt":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 2h12v20l-3-2-3 2-3-2-3 2V2zM8 7h8M8 11h8M8 15h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "user":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path
            d="M4 20c1.6-4.2 14.4-4.2 16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "doc":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6 2h9l5 5v15H6zM15 2v5h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(styles.sidebar, {
        [styles["sidebar--collapsed"]]: collapsed,
      })}
    >
      <nav className={styles.sidebar__nav}>
        <ul className={styles.sidebar__list}>
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(styles.sidebar__item, {
                    [styles["is-active"]]: active,
                  })}
                >
                  <span className={styles.sidebar__icon}>
                    <Icon name={item.icon} />
                  </span>
                  <span className={styles.sidebar__label}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
