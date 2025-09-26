import { useState } from "react";
import styles from "./BankTab.module.scss";

type Option = { label: string; value: string };

export default function BankTab() {
  const [form, setForm] = useState({
    bank: "",
    accountType: "",
    account: "",
    accountDigit: "",
    branch: "",
    branchDigit: "",
  });

  const bankOptions: Option[] = [
    { label: "Selecione", value: "" },
    { label: "001 - Banco do Brasil", value: "001" },
    { label: "033 - Santander", value: "033" },
    { label: "104 - Caixa", value: "104" },
    { label: "237 - Bradesco", value: "237" },
    { label: "341 - Itaú", value: "341" },
  ];

  const typeOptions: Option[] = [
    { label: "Selecione", value: "" },
    { label: "Corrente", value: "checking" },
    { label: "Poupança", value: "savings" },
    { label: "Pagamento", value: "payment" },
  ];

  return (
    <section className={styles.card} role="tabpanel">
      <h2 className={styles.card__title}>Dados bancários</h2>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Banco</label>
          <select 
            className={`${styles.formInput} ${styles.formSelect}`} 
            value={form.bank} 
            onChange={(e) => setForm(f => ({...f, bank: e.target.value}))}
          >
            {bankOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.formField}>
          <label className={styles.formField__label}>Tipo de conta</label>
          <select 
            className={`${styles.formInput} ${styles.formSelect}`} 
            value={form.accountType} 
            onChange={(e) => setForm(f => ({...f, accountType: e.target.value}))}
          >
            {typeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Conta</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite a conta" 
            value={form.account} 
            onChange={(e) => setForm(f => ({...f, account: e.target.value}))} 
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Dígito da conta</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o dígito da conta" 
            value={form.accountDigit} 
            onChange={(e) => setForm(f => ({...f, accountDigit: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Agência</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o número da agência" 
            value={form.branch} 
            onChange={(e) => setForm(f => ({...f, branch: e.target.value}))} 
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Dígito da agência</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o dígito da agência" 
            value={form.branchDigit} 
            onChange={(e) => setForm(f => ({...f, branchDigit: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.formButton}>Salvar</button>
      </div>
    </section>
  );
}
