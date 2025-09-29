"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./steps.module.scss";
import { MoneyInput } from "@/app/components/money-input";

interface DataStepContribution {
  contributionValue: number; // em centavos
  valorAporte?: number | null;      // em centavos
}

type Props = {
  onNext: (data: DataStepContribution) => void;
  onBack: () => void;
};

const schema: yup.ObjectSchema<DataStepContribution> = yup.object({
  contributionValue: yup
    .number()
    .min(1000, "Valor mínimo é R$ 10,00")
    .required("Valor da Contribuição é obrigatório"),
  valorAporte: yup.number().nullable(),
});

// taxa de juros anual
const RATE = 0.042; 
const MONTHLY_RATE = RATE / 12;

// helper de calculo
function calcularProjecao(contribuicao: number, aporte: number, anos: number) {
  const n = anos * 12; // meses
  const monthlyContribution = contribuicao / 100; // converte centavos -> reais
  const initial = aporte / 100;

  const fv =
    initial * Math.pow(1 + MONTHLY_RATE, n) +
    monthlyContribution * ((Math.pow(1 + MONTHLY_RATE, n) - 1) / MONTHLY_RATE);

  return fv;
}

export default function StepAddress({ onNext, onBack }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataStepContribution>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      contributionValue: 0,
      valorAporte: 0,
    },
  });

  // 🔥 reatividade: observa valores do form
  const contributionValue = watch("contributionValue") ?? 0;
  const valorAporte = watch("valorAporte") ?? 0;

  const proj5 = calcularProjecao(contributionValue, valorAporte, 5);
  const proj10 = calcularProjecao(contributionValue, valorAporte, 10);
  const proj20 = calcularProjecao(contributionValue, valorAporte, 20);

  const onSubmit = (data: DataStepContribution) => {
    console.log("✅ onSubmit:", data);
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errs) => console.log("invalid", errs))}
      className={styles["adesao-step"]}
      noValidate
    >
      <h2 className={styles["section-title"]}>Contribuição</h2>

      {/* contribuição */}
      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.contributionValue ? styles["field--error"] : ""
          }`}
        >
          <Controller
            control={control}
            name="contributionValue"
            render={({ field }) => (
              <MoneyInput
                label="Valor Contribuição"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                error={errors.contributionValue?.message}
              />
            )}
          />
        </div>
      </div>

      {/* aporte */}
      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.valorAporte ? styles["field--error"] : ""
          }`}
        >
          <Controller
            control={control}
            name="valorAporte"
            render={({ field }) => (
              <MoneyInput
                label="Valor do aporte (opcional)"
                name={field.name}
                value={field.value ?? 0}
                onChange={field.onChange}
                error={errors.valorAporte?.message}
              />
            )}
          />
        </div>
      </div>

      <div className={styles["section-title"]}>
        <h2>Saldo Projetado</h2>
        <p className={styles["info"]}>
          Simulação de 4,2% ao ano. Livre de inflação
        </p>
      </div>

      <div className={styles["projections"]}>
        <div className={styles["projected-value"]}>
          <small className={styles["time"]}>5 anos</small>
          <span className={styles["value"]}>
            {proj5.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className={styles["projected-value"]}>
          <small className={styles["time"]}>10 anos</small>
          <span className={styles["value"]}>
            {proj10.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className={styles["projected-value"]}>
          <small className={styles["time"]}>20 anos</small>
          <span className={styles["value"]}>
            {proj20.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <div className={styles["actions"]}>
        <button
          type="button"
          className={styles["button-outline"]}
          onClick={onBack}
        >
          Voltar
        </button>
        <button type="submit" className={styles["button"]}>
          Continuar
        </button>
      </div>
    </form>
  );
}
