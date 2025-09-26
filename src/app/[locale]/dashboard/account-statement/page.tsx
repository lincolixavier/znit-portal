"use client";

import styles from "./extrato.module.scss";
import Image from "next/image";

import MovementsByYear, { Row } from "./components/moviments-by-year/MovimentsByYear";


// dados de exemplo com 2025 e 2024
const data: Row[] = [
  // 2025
  { conta:"Saldo anterior", competencia:"31 de Janeiro 2025", pagamento:"–", quotas:"0,543333", valor:"+R$ 50,00",   month:2, year:2025 },
  { conta:"Contribuição básica", competencia:"12 de Fevereiro 2025", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 50,00", month:1, year:2025 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2025", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:2, year:2025 },
  { conta:"Rendimento mensal", competencia:"12 de Fevereiro 2025", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 1,26",     month:3, year:2025 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:2, year:2024 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:1, year:2024 },

  // 2024 (apenas para demonstrar repetição)
  { conta:"Saldo anterior", competencia:"31 de Janeiro 2024", pagamento:"–", quotas:"0,543333", valor:"+R$ 50,00",   month:1, year:2024 },
  { conta:"Contribuição básica", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 50,00", month:2, year:2024 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:2, year:2024 },
  { conta:"Rendimento mensal", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 1,26",     month:2, year:2024 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:3, year:2024 },
  { conta:"Contribuição voluntária", competencia:"12 de Fevereiro 2024", pagamento:"25/02/2024", quotas:"0,543333", valor:"+R$ 3.000,00", month:3, year:2024 },
];

 // agrupa dados por ano
  const porAno = data.reduce<Record<number, Row[]>>((acc, r) => {
    (acc[r.year] ||= []).push(r);
    return acc;
  }, {});

  // ordena por ano desc (2025, 2024, …

  const anos = Object.keys(porAno).map(Number).sort((a,b) => b - a);

export default function ExtratoPage() {

  return (
    <div className={styles.statement}>
      {/* Cabeçalho da página */}
      <header className={styles.statement__header}>
        <h1 className={styles.statement__title}>Extrato</h1>
        <p className={styles.statement__updated}>Última atualização: 24/10/2024</p>
      </header>

      {/* Cards de métricas */}
      <div className={styles.statement__stats}>
        <article className={styles.stat}>
          <Image src="/images/savings.png" width={40} height={40} priority alt="Savings" />
          <div className={styles.stat__body}>
            <p className={styles.stat__label}>Saldo do participante</p>
            <p className={styles.stat__value}>R$ 42.468,23</p>
          </div>
        </article>

        <article className={styles.stat}>
          <Image src="/images/grow.png" width={40} height={40} priority alt="Savings" />

          <div className={styles.stat__body}>
            <p className={styles.stat__label}>Rendimento total</p>
            <p className={styles.stat__value}>R$ 42.468,23</p>
          </div>
        </article>

        <article className={styles.stat}>
          <Image src="/images/money.png" width={40} height={40} priority alt="Savings" />

          <div className={styles.stat__body}>
            <p className={styles.stat__label}>Composição do saldo total</p>
            <p className={styles.stat__value}>R$ 84.936,46</p>
          </div>
        </article>
      </div>

      {/* Para cada ano, renderiza a mesma estrutura */}
      {anos.map((ano) => (
        <div key={ano} style={{ marginTop: 24 }}>
          <MovementsByYear year={ano} rows={porAno[ano]} />
        </div>
      ))}

    </div>
  );
}
