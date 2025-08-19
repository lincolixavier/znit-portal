"use client";

import { forwardRef, useState } from "react";
import styles from "./index.module.scss";

interface Props  {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  value?: number; 
  onChange?: (value: number) => void;
};

const formatMoney = (cents: number): string => {
  const num = (cents / 100).toFixed(2);
  return num
    .replace(".", ",") // vírgula para centavos
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // pontos nos milhares
};

const parseMoney = (value: string): number => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers ? parseInt(onlyNumbers, 10) : 0;
};

export const MoneyInput = forwardRef<HTMLInputElement, Props>(
  ({ label, name, placeholder = "R$ 0,00", error, value = 0, onChange }, ref) => {
    const [display, setDisplay] = useState(() => "R$ " + formatMoney(value));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const cents = parseMoney(e.target.value);
      const formatted = "R$ " + formatMoney(cents);

      setDisplay(formatted);
      onChange?.(cents); // devolve CENTAVOS como número
    };

    return (
      <div className={`${styles["money-input"]} ${error ? styles["money-input--error"] : ""}`}>
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          id={name}
          name={name}
          value={display}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {error && <span className={styles["money-input__error"]}>{error}</span>}
      </div>
    );
  }
);

MoneyInput.displayName = "MoneyInput";
