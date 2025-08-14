"use client";

import styles from "./Stepper.module.scss";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className={styles.stepper}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <span className={styles.stepText}>
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}
