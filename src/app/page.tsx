import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
         <Image priority width={103} height={68} src="/images/logo.svg" alt="Capital Prev" />
      </main>
  
    </div>
  );
}
