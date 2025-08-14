"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

type Props = {
  length?: number;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
};

export default function SecurityCode({
  length = 6,
  onSubmit,
  onResend,
}: Props) {
  const [values, setValues] = useState<string[]>(
    Array.from({ length }, () => "")
  );
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const setAt = (i: number, v: string) => {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };

  const handleChange =
    (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyDigit = e.target.value.replace(/\D/g, "").slice(0, 1);
      setAt(i, onlyDigit);
      if (onlyDigit && i < length - 1) {
        inputsRef.current[i + 1]?.focus();
      }
    };

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!data) return;
    e.preventDefault();
    const digits = data.slice(0, length).split("");
    setValues((prev) => {
      const next = [...prev];
      for (let i = 0; i < length; i++) next[i] = digits[i] ?? "";
      return next;
    });
    const last = Math.min(digits.length, length) - 1;
    if (last >= 0) inputsRef.current[last]?.focus();
  };

  const code = values.join("");
  const ready = code.length === length;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || submitting) return;
    try {
      setSubmitting(true);
      await onSubmit?.(code);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label className="form__label" htmlFor="otp-0">
        Código de validação
      </label>

      <div className={styles.otp} role="group" aria-label="Código de validação">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            ref={(el) => (inputsRef.current[i] = el)}
            className={styles.otp__box}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d*"
            maxLength={1}
            value={values[i]}
            onChange={handleChange(i)}
            onKeyDown={handleKeyDown(i)}
            onPaste={i === 0 ? handlePaste : undefined}
            aria-label={`Dígito ${i + 1} do código`}
          />
        ))}
      </div>

      <button
        type="submit"
        className={styles.otp__submit}
        disabled={!ready || submitting}
      >
        Continuar
      </button>

      <button
        type="button"
        className={styles.otp__resend}
        onClick={() => onResend?.()}
      >
        Reenviar código
      </button>
    </form>
  );
}
