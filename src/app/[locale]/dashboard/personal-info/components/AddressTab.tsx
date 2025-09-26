import { useState } from "react";
import styles from "./AddressTab.module.scss";

export default function AddressTab() {
  const [form, setForm] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
  });

  return (
    <section className={styles.card} role="tabpanel">
      <h2 className={styles.card__title}>Endereço</h2>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>CEP</label>
          <input 
            className={styles.formInput} 
            placeholder="00.0000-000" 
            value={form.cep} 
            onChange={(e) => setForm(f => ({...f, cep: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Endereço</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite seu endereço" 
            value={form.street} 
            onChange={(e) => setForm(f => ({...f, street: e.target.value}))} 
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Número</label>
          <input 
            className={styles.formInput} 
            placeholder="0000" 
            value={form.number} 
            onChange={(e) => setForm(f => ({...f, number: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Complemento (opcional)</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o complemento" 
            value={form.complement} 
            onChange={(e) => setForm(f => ({...f, complement: e.target.value}))} 
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Bairro</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o bairro" 
            value={form.district} 
            onChange={(e) => setForm(f => ({...f, district: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Cidade</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite a cidade" 
            value={form.city} 
            onChange={(e) => setForm(f => ({...f, city: e.target.value}))} 
          />
        </div>
        <div className={styles.formField}>
          <label className={styles.formField__label}>Estado</label>
          <input 
            className={styles.formInput} 
            placeholder="Digite o estado" 
            value={form.state} 
            onChange={(e) => setForm(f => ({...f, state: e.target.value}))} 
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.formButton}>Salvar</button>
      </div>
    </section>
  );
}
