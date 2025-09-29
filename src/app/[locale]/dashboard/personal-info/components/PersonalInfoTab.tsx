import { useState } from "react";
import InputCPF from "@/app/components/InputCPF";
import styles from "./PersonalInfoTab.module.scss";

type Option = { label: string; value: string };

type PersonalInfoForm = {
  fullName: string;
  birthDate: string;
  cpf: string;
  gender: string;
  maritalStatus: string;
  email: string;
  mobile: string;
  affiliateName: string;
  relationship: string;
  affiliateCpf: string;
  institutor: string;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.formField}>
      <label className={styles.formField__label}>{label}</label>
      {children}
    </div>
  );
}

export default function PersonalInfoTab() {
  const [form, setForm] = useState<PersonalInfoForm>({
    fullName: "João Da Silva",
    birthDate: "29/02/1990",
    cpf: "999.999.999-99",
    gender: "F",
    maritalStatus: "solteiro",
    email: "maria@exemplo.com",
    mobile: "",
    affiliateName: "João da Silva",
    relationship: "",
    affiliateCpf: "000.000.000-00",
    institutor: "",
  });

  const genderOptions: Option[] = [
    { label: "Feminino", value: "F" },
    { label: "Masculino", value: "M" },
    { label: "Outro", value: "O" },
  ];

  const maritalOptions: Option[] = [
    { label: "Solteiro(a)", value: "solteiro" },
    { label: "Casado(a)", value: "casado" },
    { label: "Divorciado(a)", value: "divorciado" },
    { label: "Viúvo(a)", value: "viuvo" },
  ];

  return (
    <section className={styles.card} role="tabpanel">
      <h2 className={styles.card__title}>Informações pessoais</h2>

      <div className={styles.formGrid}>
        <Field label="Nome completo">
          <input
            className={styles.formInput}
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
          />
        </Field>

        <Field label="Data de nascimento">
          <input
            className={styles.formInput}
            value={form.birthDate}
            onChange={(e) => setForm((f) => ({ ...f, birthDate: e.target.value }))}
            placeholder="dd/mm/aaaa"
          />
        </Field>

        <Field label="CPF">
          <InputCPF
            name="cpf"
            defaultValue={form.cpf}
            onChangeCPF={(formatted) => setForm((f) => ({ ...f, cpf: formatted }))}
          />
        </Field>

        <Field label="Estado civil">
          <select
            className={`${styles.formInput} ${styles.formSelect}`}
            value={form.maritalStatus}
            onChange={(e) => setForm((f) => ({ ...f, maritalStatus: e.target.value }))}
          >
            {maritalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Gênero">
          <select
            className={`${styles.formInput} ${styles.formSelect}`}
            value={form.gender}
            onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
          >
            {genderOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Telefone celular">
          <input
            className={styles.formInput}
            placeholder="(00) 0000-0000"
            value={form.mobile}
            onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
          />
        </Field>

        <Field label="Email">
          <input
            className={styles.formInput}
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </Field>
      </div>

      <div className={styles.formDivider} />

      <h3 className={styles.formSectionTitle}>Empregado em atividade ou aposentado</h3>
      <p className={styles.formSectionHint}></p>

      <div className={styles.formGridFull}>
        <Field label="Nome completo do filiado">
          <input
            className={styles.formInput}
            value={form.affiliateName}
            onChange={(e) => setForm((f) => ({ ...f, affiliateName: e.target.value }))}
          />
        </Field>
      </div>

      <div className={styles.formGrid}>
        <Field label="Grau de parentesco">
          <select
            className={`${styles.formInput} ${styles.formSelect}`}
            value={form.relationship}
            onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))}
          >
            <option value="">Item selecionado</option>
            <option value="conjuge">Cônjuge</option>
            <option value="filho">Filho(a)</option>
            <option value="outro">Outro</option>
          </select>
        </Field>

        <Field label="CPF do filiado">
          <InputCPF
            name="cpfFiliado"
            defaultValue={form.affiliateCpf}
            onChangeCPF={(formatted) => setForm((f) => ({ ...f, affiliateCpf: formatted }))}
          />
        </Field>
      </div>

      <div className={styles.formGridFull}>
        <Field label="Instituidor">
          <select
            className={`${styles.formInput} ${styles.formSelect}`}
            value={form.institutor}
            onChange={(e) => setForm((f) => ({ ...f, institutor: e.target.value }))}
          >
            <option value="">Item selecionado</option>
            <option value="empresa1">Empresa 1</option>
            <option value="empresa2">Empresa 2</option>
            <option value="outro">Outro</option>
          </select>
        </Field>
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.formButton}>Salvar</button>
      </div>
    </section>
  );
}
