import { useState, useEffect } from "react";
import { tempStorage } from "@/lib/tempStorage";
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

  // TEMP: Carregar dados do localStorage
  useEffect(() => {
    const userData = tempStorage.getUserData();
    if (userData?.step2) {
      const step2 = userData.step2;
      setForm({
        cep: (step2.cep as string) || "",
        street: (step2.endereco as string) || "",
        number: (step2.numero as string) || "",
        complement: (step2.complemento as string) || "",
        district: (step2.bairro as string) || "",
        city: (step2.cidade as string) || "",
        state: (step2.estado as string) || "",
      });
    }
  }, []);

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
        <button 
          type="button" 
          className={styles.formButton}
          onClick={() => {
            // TEMP: Salvar alterações no localStorage
            tempStorage.updateUserData({
              step2: {
                cep: form.cep,
                endereco: form.street,
                numero: form.number,
                complemento: form.complement,
                bairro: form.district,
                cidade: form.city,
                estado: form.state,
              },
            });
            alert("Endereço salvo com sucesso!");
          }}
        >
          Salvar
        </button>
      </div>
    </section>
  );
}
