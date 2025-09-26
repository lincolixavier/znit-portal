"use client";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import { useI18n } from "@/lib/i18n";
export const dynamic = "force-static";
import styles from "./page.module.scss";

export default function CreateAccountPage() {
  const { translator } = useI18n();
  const t = translator;

  return (
    <>
      <h1 className={styles.signup__title}>{t.auth.signup.title()}</h1>
      <p className={styles.signup__subtitle}>
        {t.auth.signup.subtitle()}
      </p>

      <SignUpForm />

      <p className={styles.signup__login}>
        <Link href="/pt/auth/login" className={styles.signup__loginLink}>
          {t.auth.signup.haveAccount()} {t.auth.signup.signIn()}
        </Link>
      </p>
    </>
  );
}
