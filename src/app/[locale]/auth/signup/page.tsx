"use client";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
export const dynamic = "force-static";
import styles from "./page.module.scss";

export default function CreateAccountPage() {
  return (
    <>
      <h1 className={styles.signup__title}>Criar conta</h1>
      <p className={styles.signup__subtitle}>
        Ainda não tem cadastro? Informe o seu CPF para receber as instruções
        de primeiro acesso.
      </p>

      <SignUpForm />

      <p className={styles.signup__login}>
        <Link href="/auth/login" className={styles.signup__loginLink}>
          Já tem uma conta? Clique aqui!
        </Link>
      </p>
    </>
  );
}
