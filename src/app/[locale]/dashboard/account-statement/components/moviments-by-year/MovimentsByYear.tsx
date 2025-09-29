"use client";

import { useMemo, useState } from "react";
import styles from "./moviments.module.scss";

/** Mesmo shape que você já usa */
export type Row = {
  conta: string;
  competencia: string;
  pagamento: string;
  quotas: string;
  valor: string;   // ex: "+R$ 3.000,00"
  month: number;   // 1..12
  year: number;
};

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

/* helpers: parse/format BRL com sinal */
function brlToNumber(s: string): number {
  // mantém o sinal (+/-) e remove R$, pontos de milhar etc.
  const sign = s.trim().startsWith("-") ? -1 : 1;
  const numeric = s.replace(/[^\d,-]/g, "").replace(/\./g, "").replace(",", ".");
  const n = parseFloat(numeric || "0");
  return sign * (isNaN(n) ? 0 : n);
}
function numberToSignedBRL(n: number): string {
  const abs = Math.abs(n);
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(abs);
  return (n >= 0 ? "+" : "-") + formatted;
}

type Props = {
  year: number;
  rows: Row[];            // TODAS as linhas desse ano (qualquer mês)
  initialMonth?: number;  // opcional (1..12); se não vier, abre no 1º mês que tem dados
};

export default function MovementsByYear({
  year,
  rows,
  initialMonth,
}: Props) {
  // mês inicial: o fornecido; senão, o 1º mês que possuir linhas; senão 1
  const firstMonthWithData =
    rows.map(r => r.month).sort((a, b) => a - b)[0] ?? 1;
  const [month, setMonth] = useState<number>(initialMonth || firstMonthWithData);

  const monthRows = useMemo(
    () => rows.filter(r => r.month === month),
    [rows, month]
  );

  const totalDoMes = useMemo(
    () => monthRows.reduce((acc, r) => acc + brlToNumber(r.valor), 0),
    [monthRows]
  );

  return (
    <>
      {/* Ano + tabs dos meses (tudo à ESQUERDA, como no layout) */}
      <div className={styles["yearRow"]}>
        <span className={styles["year"]}>{year}</span>
        <div className={styles["pills"]}>
          {MONTHS.map((m, idx) => {
            const mIndex = idx + 1;
            const hasData = rows.some(r => r.month === mIndex);
            return (
              <button
                key={m}
                type="button"
                className={`${styles["pills__item"]} ${
                  month === mIndex ? styles["is-active"] : ""
                }`}
                onClick={() => setMonth(mIndex)}
                // visual de desativado quando não há linhas naquele mês
                disabled={!hasData}
                aria-pressed={month === mIndex}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabela do mês selecionado */}
      <div className={styles["tableWrap"]}>
        <table className={styles["table"]}>
          <thead>
            <tr>
              <th>Conta e Competência</th>
              <th>Data de Pagamento</th>
              <th>Valor em Quotas</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>

          <tbody>
            {monthRows.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 24, color: "#6b7280" }}>
                  Sem movimentações neste mês.
                </td>
              </tr>
            ) : (
              monthRows.map((r, i) => (
                <tr key={`${r.conta}-${i}`}>
                  <td>
                    <div className={styles["cell__title"]}>{r.conta}</div>
                    <div className={styles["cell__muted"]}>{r.competencia}</div>
                  </td>
                  <td>{r.pagamento}</td>
                  <td>{r.quotas}</td>
                  <td className={styles["cell__amount"]}>{r.valor}</td>
                </tr>
              ))
            )}

            {/* Total (linha destacada como no print) */}
            <tr className={styles["rowTotal"]}>
              <td className={styles["cell__title"]}>Total</td>
              <td />
              <td />
              <td className={styles["cell__amount"]}>
                {numberToSignedBRL(totalDoMes)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
