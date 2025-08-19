"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

type Props = {
  length?: number;
  onChange?: (code: string) => void;     // retorna o código parcial
  onComplete?: (code: string) => void;   // dispara quando todos dígitos preenchidos
  autoFocus?: boolean;
};

const SecurityCode = forwardRef<HTMLInputElement[], Props>(
  ({ length = 6, onChange, onComplete, autoFocus = true }, ref) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // foca no primeiro input ao montar
    useEffect(() => {
      if (autoFocus) inputsRef.current[0]?.focus();
    }, [autoFocus]);

    // Atualiza valor em posição
    const setAt = (i: number, v: string) => {
      setValues((prev) => {
        const next = [...prev];
        next[i] = v;
        const code = next.join("");

        onChange?.(code);
        if (code.length === length && !next.includes("")) {
          onComplete?.(code);
        }
        return next;
      });
    };

    // Quando usuário digita
    const handleChange =
      (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const digit = e.target.value.replace(/\D/g, "").slice(0, 1);
        if (!digit) return setAt(i, "");

        setAt(i, digit);
        if (i < length - 1) {
          inputsRef.current[i + 1]?.focus();
        }
      };

    // Teclas especiais (backspace, setas)
    const handleKeyDown =
      (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          if (values[i]) {
            setAt(i, "");
          } else if (i > 0) {
            inputsRef.current[i - 1]?.focus();
            setAt(i - 1, "");
          }
        }
        if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
        if (e.key === "ArrowRight" && i < length - 1)
          inputsRef.current[i + 1]?.focus();
      };

    // Colar o código
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const data = e.clipboardData.getData("text").replace(/\D/g, "");
      if (!data) return;
      e.preventDefault();

      const digits = data.slice(0, length).split("");
      setValues(digits.concat(Array(length - digits.length).fill("")));
      onChange?.(digits.join(""));
      if (digits.length === length) onComplete?.(digits.join(""));
      inputsRef.current[Math.min(digits.length - 1, length - 1)]?.focus();
    };

    return (
      <div className={styles.otp} role="group" aria-label="Código de validação">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            className={styles.otp__box}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={values[i]}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={i === 0 ? handlePaste : undefined}
            aria-label={`Dígito ${i + 1}`}
          />
        ))}
      </div>
    );
  }
);

SecurityCode.displayName = "SecurityCode";
export default SecurityCode;
