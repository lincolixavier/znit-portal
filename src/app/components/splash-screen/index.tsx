"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // tempo de exibição (2s)
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.splash}>
      <Image priority width={103} height={68} src="/images/logo.svg" alt="Capital Prev" />
    </div>
  );
}
