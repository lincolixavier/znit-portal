"use client";

import { useState } from "react";
import clsx from "clsx";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styles from "./layout.module.scss";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      {/* HEADER ocupa 100% do topo */}
      <Header collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      {/* SHELL abaixo do header: sidebar + conteúdo */}
      <div
        className={clsx(styles.shell, {
          [styles["shell--collapsed"]]: collapsed,
        })}
      >
        <Sidebar collapsed={collapsed} />

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
