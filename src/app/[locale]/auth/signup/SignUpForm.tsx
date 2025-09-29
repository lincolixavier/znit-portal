"use client";

import { useState } from "react";
import Link from "next/link";
import InputCPF from "@/app/components/InputCPF";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function SignUpForm() {
  const { translator } = useI18n();
  const t = translator;
  const router = useRouter();
  const [cpfFormatted, setCpfFormatted] = useState("");
  const [cpfDigits, setCpfDigits] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual signup logic
    console.log(`CPF enviado: ${cpfFormatted} (somente dígitos: ${cpfDigits})`);

    router.push("/pt/auth/signup/create-password")
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="cpf" className="form__label">
        {t.auth.signup.cpfPlaceholder()}
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
          {t.auth.signup.terms()}{" "}
          <Link href="#" className="link">
            {t.auth.signup.privacy()}
          </Link>
        </label>
      </div>

      <button
        className="btn btn--primary"
        type="submit"
        disabled={!accepted || !isCpfValid}
      >
        {t.enrollment.actions.continue()}
      </button>
    </form>
  );
}
