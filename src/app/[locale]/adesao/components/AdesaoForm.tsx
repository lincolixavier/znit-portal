// components/Adesao/AdesaoForm.tsx
"use client";

import { useState } from "react";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepAddress from "./steps/StepAddress";
import StepContribution from "./steps/StepContribution";
import StepSecurity from "./steps/StepSecurity";
import StepSuccess from "./steps/StepSuccess";

import styles from "./AdesaoForm.module.scss";
import { useRouter } from "next/navigation";

export interface FormData {
  step1: object;
}

export default function AdesaoForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [data, setData] = useState<FormData>({
    step1: {},
  });

  const handleNext = (stepData: any) => {
    setData((prev) => ({
      ...prev,
      [`step${currentStep}`]: stepData,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitAll = (finalData: any) => {
    console.log("Enviando dados para o backend:", finalData);
    // Ex: await api.post("/adesao", finalData);
  };

  const downloadDocument = () => {
    router.push("comprovante")
  };

  return (
    <div className="adesao-form">
      {/* Conteúdo */}
      <main className="adesao__content">
        { currentStep !== 5 && (
          <div className={styles["adesao-header"]}>
            <h1 className={styles["adesao-header__title"]}>Adesão</h1>
            <div className={styles["adesao-header__step-indicator"]}>
              {currentStep}/5
            </div>
          </div>
        )}
        {currentStep === 1 && <StepPersonalInfo onNext={handleNext} />}
       
        {currentStep === 2 && <StepAddress onNext={handleNext} onBack={handleBack} />}
         
        {currentStep === 3 && <StepContribution onNext={handleNext} onBack={handleBack} />}
    
        {currentStep === 4   && (
          <StepSecurity
            onNext={(finalStepData) => {
              console.log("test")
              const allData = { ...data, step5: finalStepData };
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
