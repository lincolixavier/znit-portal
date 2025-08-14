// components/Adesao/AdesaoForm.tsx
"use client";

import { useState } from "react";
import Step1 from "./steps/Step1InfoPessoal";


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
        <div className="adesao__step-indicator">
          <span className="adesao__step-text">Passo {currentStep} de 5</span>
        </div>

        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {/* 
        {currentStep === 2 && <Step2 onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <Step3 onNext={handleNext} onBack={handleBack} />}
        {currentStep === 4 && <Step4 onNext={handleNext} onBack={handleBack} />}
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
