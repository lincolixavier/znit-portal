"use client";

import { useState } from "react";

type InputCPFProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  onChangeCPF?: (formatted: string, digitsOnly: string) => void;
  onValidChange?: (isValid: boolean) => void;
  errorMessage?: string;
};

export default function InputCPF({
  onChangeCPF,
  onValidChange,
  errorMessage = "CPF inválido",
  ...props
}: InputCPFProps) {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const formatCPF = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const isValidCPF = (cpf: string) => {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;
    if (remainder !== parseInt(digits[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder >= 10) remainder = 0;
    if (remainder !== parseInt(digits[10])) return false;

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatCPF(e.target.value);
    const digitsOnly = masked.replace(/\D/g, "");
    setValue(masked);

    const validNow = isValidCPF(masked);
    if (isTouched) setIsValid(validNow);

    onChangeCPF?.(masked, digitsOnly);
    if (onValidChange) onValidChange(validNow);
  };

  const handleBlur = () => {
    setIsTouched(true);
    const validNow = isValidCPF(value);
    setIsValid(validNow);
    onValidChange?.(validNow);
  };

  return (
    <>
      <input
        {...props}
        type="text"
        inputMode="numeric"
        maxLength={14}
        placeholder="000.000.000-00"
        className={`form__input ${!isValid && isTouched ? "form__input--error" : ""}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!isValid && isTouched && (
        <span className="form__error">{errorMessage}</span>
      )}
    </>
  );
}
