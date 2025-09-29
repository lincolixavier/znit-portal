import { useState, useEffect } from "react";
import InputCPF from "@/app/components/InputCPF";
import { tempStorage } from "@/lib/tempStorage";
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
    fullName: "",
    birthDate: "",
    cpf: "",
    gender: "",
    maritalStatus: "",
    email: "",
    mobile: "",
    affiliateName: "",
    relationship: "",
    affiliateCpf: "",
    institutor: "",
  });

  // TEMP: Carregar dados do localStorage
  useEffect(() => {
    const userData = tempStorage.getUserData();
    if (userData?.step1) {
      const step1 = userData.step1;
      setForm({
        fullName: (step1.nomeCompleto as string) || "",
        birthDate: (step1.dataNascimento as string) || "",
        cpf: (step1.cpf as string) || "",
        gender: (step1.genero as string) || "",
        maritalStatus: (step1.estadoCivil as string) || "",
        email: (step1.email as string) || "",
        mobile: (step1.telefone as string) || "",
        affiliateName: (step1.nomeFiliado as string) || "",
        relationship: (step1.grauParentesco as string) || "",
        affiliateCpf: (step1.cpfFiliado as string) || "",
        institutor: (step1.instituicao as string) || "",
      });
    }
  }, []);

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
            <option value="pai">Pai</option>
            <option value="mae">Mãe</option>
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
            <option value="instituto1">Instituto 1</option>
            <option value="instituto2">Instituto 2</option>
            <option value="outro">Outro</option>
          </select>
        </Field>
      </div>

      <div className={styles.formActions}>
        <button 
          type="button" 
          className={styles.formButton}
          onClick={() => {
            // TEMP: Salvar alterações no localStorage
            tempStorage.updateUserData({
              step1: {
                nomeCompleto: form.fullName,
                dataNascimento: form.birthDate,
                cpf: form.cpf,
                genero: form.gender,
                estadoCivil: form.maritalStatus,
                email: form.email,
                telefone: form.mobile,
                nomeFiliado: form.affiliateName,
                grauParentesco: form.relationship,
                cpfFiliado: form.affiliateCpf,
                instituicao: form.institutor,
              },
            });
            alert("Informações salvas com sucesso!");
          }}
        >
          Salvar
        </button>
      </div>
    </section>
  );
}
