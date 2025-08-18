// components/Adesao/AdesaoForm.tsx
"use client";

import { useState } from "react";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepAddress from "./steps/StepAddress";
import StepContribution from "./steps/StepContribution";

import styles from "./AdesaoForm.module.scss";

export interface FormData {
  step1: object;

}

export default function AdesaoForm() {
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

  return (
    <div className="adesao-form">
      {/* Conteúdo */}
      <main className="adesao__content">
       <div className={styles["adesao-header"]}>
          <h1 className={styles["adesao-header__title"]}>Adesão</h1>
          <div className={styles["adesao-header__step-indicator"]}>
            {currentStep}/5
          </div>
        </div>

        {currentStep === 1 && <StepPersonalInfo onNext={handleNext} />}
       
        {currentStep === 2 && <StepAddress onNext={handleNext} onBack={handleBack} />}
         
        {currentStep === 3 && <StepContribution onNext={handleNext} onBack={handleBack} />}
        {/* {currentStep === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}
        {currentStep === 5 && (
          <Step5
            onNext={(finalStepData) => {
              const allData = { ...data, step5: finalStepData };
              handleSubmitAll(allData);
            }}
            onBack={handleBack}
          />
        )} 
        */}
      </main>
    </div>
  );
}
