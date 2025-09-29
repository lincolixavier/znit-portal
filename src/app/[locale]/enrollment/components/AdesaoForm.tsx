// components/Adesao/AdesaoForm.tsx
"use client";

import { useState, useEffect } from "react";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepAddress from "./steps/StepAddress";
import StepContribution from "./steps/StepContribution";
import StepSecurity from "./steps/StepSecurity";
import StepSuccess from "./steps/StepSuccess";
import { useI18n } from "@/lib/i18n";
import { tempStorage } from "@/lib/tempStorage";

import styles from "./AdesaoForm.module.scss";
import { useRouter } from "next/navigation";

export interface FormData {
  step1: Record<string, unknown>;
  step2?: Record<string, unknown>;
  step3?: Record<string, unknown>;
  step4?: Record<string, unknown>;
  step5?: Record<string, unknown>;
}

export type StepData = Record<string, unknown>;

export default function AdesaoForm() {
  const { translator } = useI18n();
  const t = translator;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [data, setData] = useState<FormData>({
    step1: {},
  });

  // TEMP: Carregar dados salvos ao montar
  useEffect(() => {
    const saved = tempStorage.getUserData();
    if (saved) {
      setData(saved as FormData);
    }
  }, []);

  const handleNext = (stepData: StepData) => {
    const newData = {
      ...data,
      [`step${currentStep}`]: stepData,
    };
    setData(newData);
    
    // TEMP: Salvar dados a cada step
    tempStorage.saveEnrollmentData(newData);
    
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitAll = (finalData: FormData) => {
    console.log("Enviando dados para o backend:", finalData);
    // Ex: await api.post("/adesao", finalData);
  };

  const downloadDocument = () => {
    router.push("confirmation")
  };

  return (
    <div className="adesao-form">
      {/* Conteúdo */}
      <main className="adesao__content">
        { currentStep !== 5 && (
          <div className={styles["adesao-header"]}>
            <h1 className={styles["adesao-header__title"]}>{t.enrollment.title()}</h1>
            <div className={styles["adesao-header__step-indicator"]}>
              {t.enrollment.stepIndicator({ current: currentStep })}
            </div>
          </div>
        )}
        {currentStep === 1 && <StepPersonalInfo onNext={(data) => handleNext(data as unknown as StepData)} />}
       
        {currentStep === 2 && <StepAddress onNext={(data) => handleNext(data as unknown as StepData)} onBack={handleBack} />}
         
        {currentStep === 3 && <StepContribution onNext={(data) => handleNext(data as unknown as StepData)} onBack={handleBack} />}
    
        {currentStep === 4   && (
          <StepSecurity
            onNext={(finalStepData) => {
              console.log("test")
              const allData = { ...data, step5: finalStepData as Record<string, unknown> };
              handleSubmitAll(allData);
              setCurrentStep(5);
            }}
            onBack={handleBack}
          />
        )} 
        {currentStep === 5 && <StepSuccess onDownload={downloadDocument} />}

       
      </main>
    </div>
  );
}
