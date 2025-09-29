import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import styles from "../page.module.scss";

export default function SettingsTab() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRep, setShowRep] = useState(false);
  const [oldPwd, setOldPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [rep, setRep] = useState("");

  const match = pwd.length > 0 && pwd === rep;

  return (
    <section className={styles.card} role="tabpanel">
      <h2 className={styles.card__title}>Alterar senha</h2>

      <div className={styles.grid2_1to1}>
        <div className={styles.field}>
          <label className={styles.field__label}>Digite sua senha atual</label>
          <div className={styles.field__control}>
            <input 
              className={styles.input} 
              type={showOld ? "text" : "password"} 
              value={oldPwd} 
              onChange={(e) => setOldPwd(e.target.value)} 
            />
            <button 
              type="button" 
              className={styles.eyeBtn} 
              onClick={() => setShowOld(v => !v)} 
              aria-label="Mostrar/ocultar senha"
            >
              {showOld ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </div>

        <div />
      </div>

      <div className={styles.grid2_1to1}>
        <div className={styles.field}>
          <label className={styles.field__label}>Digite sua nova senha</label>
          <div className={styles.field__control}>
            <input 
              className={styles.input} 
              type={showNew ? "text" : "password"} 
              value={pwd} 
              onChange={(e) => setPwd(e.target.value)} 
            />
            <button 
              type="button" 
              className={styles.eyeBtn} 
              onClick={() => setShowNew(v => !v)} 
              aria-label="Mostrar/ocultar senha"
            >
              {showNew ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.field__label}>Repita sua nova senha</label>
          <div className={styles.field__control}>
            <input 
              className={styles.input} 
              type={showRep ? "text" : "password"} 
              value={rep} 
              onChange={(e) => setRep(e.target.value)} 
            />
            <button 
              type="button" 
              className={styles.eyeBtn} 
              onClick={() => setShowRep(v => !v)} 
              aria-label="Mostrar/ocultar senha"
            >
              {showRep ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.hintLine} />
      <p className={styles.hintText}>
        Sua senha deve conter números, letras, pelo menos uma letra maiúscula e um caracter especial.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} disabled={!match}>
          Salvar
        </button>
      </div>
    </section>
  );
}
