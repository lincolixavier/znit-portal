"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./steps.module.scss";

type Props = {
  onNext: (data: Step2FormData) => void;
  onBack: () => void;
};

export interface Step2FormData {
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string; // sigla (ex: SP)
}

const schema: yup.ObjectSchema<Step2FormData> = yup.object({
  cep: yup
    .string()
    .required("Informe o CEP")
    .matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
  endereco: yup.string().required("Informe o endereço").min(3, "Endereço muito curto"),
  numero: yup.string().required("Informe o número").matches(/^\d+$/, "Somente números"),
  complemento: yup.string().nullable().optional(),
  bairro: yup.string().required("Informe o bairro"),
  cidade: yup.string().required("Informe a cidade"),
  estado: yup.string().required("Informe o estado (UF)"),
});

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

export default function StepAddress({ onNext, onBack }: Props) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Step2FormData) => onNext(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["adesao-step"]}>
      <h2 className={styles["section-title"]}>Endereço</h2>

      {/* CEP */}
      <div className={`${styles["field"]} ${styles["w-50"]}`}>
        <label>CEP</label>
        <input {...register("cep")} placeholder="00.000-000" />
        {errors.cep && <span className={styles["error-text"]}>{errors.cep.message}</span>}
      </div>

      {/* Endereço + Número */}
      <div className={styles["row"]}>
        <div className={`${styles["field"]} ${styles["w-80"]}`}>
          <label>Endereço</label>
          <input {...register("endereco")} placeholder="Digite seu endereço" />
          {errors.endereco && <span className={styles["error-text"]}>{errors.endereco.message}</span>}
        </div>

        <div className={`${styles["field"]} ${styles["w-20"]}`}>
          <label>Número</label>
          <input {...register("numero")} placeholder="0000" />
          {errors.numero && <span className={styles["error-text"]}>{errors.numero.message}</span>}
        </div>
      </div>

      {/* Complemento, Bairro, Cidade, Estado */}
      <div className={styles["row"]}>
        <div className={`${styles["field"]} ${styles["w-50"]}`}>
          <label>Complemento (opcional)</label>
          <input {...register("complemento")} placeholder="Digite o complemento" />
        </div>

        <div className={`${styles["field"]} ${styles["w-50"]}`}>
          <label>Bairro</label>
          <input {...register("bairro")} placeholder="Digite o bairro" />
          {errors.bairro && <span className={styles["error-text"]}>{errors.bairro.message}</span>}
        </div>
      </div>

      <div className={styles["row"]}>
        <div className={`${styles["field"]} ${styles["w-50"]}`}>
          <label>Cidade</label>
          <input {...register("cidade")} placeholder="Digite a cidade" />
          {errors.cidade && <span className={styles["error-text"]}>{errors.cidade.message}</span>}
        </div>

        <div className={`${styles["field"]} ${styles["w-50"]}`}>
          <label>Estado (UF)</label>
          <select {...register("estado")}>
            <option value="">Selecione</option>
            {estados.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          {errors.estado && <span className={styles["error-text"]}>{errors.estado.message}</span>}
        </div>
      </div>

      {/* ações */}
      <div className={styles["actions"]}>
        <button type="button" className={styles["button-outline"]} onClick={onBack}>
          Voltar
        </button>
        <button type="submit" className={styles["button"]}>
          Continuar
        </button>
      </div>
    </form>

  );
}
