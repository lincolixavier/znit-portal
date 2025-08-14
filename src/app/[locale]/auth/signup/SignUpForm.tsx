"use client";

import { useState } from "react";
import Link from "next/link";
import InputCPF from "@/app/components/InputCPF";

export default function SignUpForm() {
  const [cpfFormatted, setCpfFormatted] = useState("");
  const [cpfDigits, setCpfDigits] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`CPF enviado: ${cpfFormatted} (somente dígitos: ${cpfDigits})`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="cpf" className="form__label">
        CPF
      </label>
      <InputCPF
        name="cpf"
        required
        onChangeCPF={(formatted, digits) => {
          setCpfFormatted(formatted);
          setCpfDigits(digits);
        }}
        onValidChange={(valid) => setIsCpfValid(valid)}
      />

      <div className="form__checkbox">
        <input
          type="checkbox"
          id="terms"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          required
        />
        <label htmlFor="terms">
          Declaro que li e aceito os{" "}
          <Link href="#" className="link">
            Termos e Condições.
          </Link>
        </label>
      </div>

      <button
        className="btn btn--primary"
        type="submit"
        disabled={!accepted || !isCpfValid}
      >
        Continuar
      </button>
    </form>
  );
}
