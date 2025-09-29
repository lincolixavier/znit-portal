"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useI18n } from "@/lib/i18n";
import InputCPF from "@/app/components/InputCPF";
import styles from "./steps.module.scss";

interface DataStepPersonalInfo {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  genero: string;
  estadoCivil: string;
  email: string;
  telefone: string;
  documento?: FileList;
  instituicao: string;
  nomeFiliado: string;
  grauParentesco: string;
  cpfFiliado: string;
}

// TIPAR o schema como ObjectSchema<DataStepPersonalInfo>
const createSchema = (t: { enrollment: { validation: { required: () => string; invalidEmail: () => string } } }): yup.ObjectSchema<DataStepPersonalInfo> => yup
  .object({
    nomeCompleto: yup.string().required(t.enrollment.validation.required()),
    cpf: yup.string().required(t.enrollment.validation.required()),
    dataNascimento: yup.string().required(t.enrollment.validation.required()),
    genero: yup.string().required(t.enrollment.validation.required()),
    estadoCivil: yup.string().required(t.enrollment.validation.required()),
    email: yup.string().email(t.enrollment.validation.invalidEmail()).required(t.enrollment.validation.required()),
    telefone: yup.string().required(t.enrollment.validation.required()),
    documento: yup
      .mixed<FileList>()
      .optional(),
      // .test(
      //   "required",
      //   t.enrollment.validation.required'),
      //   (value): value is FileList => !!value && value.length > 0
      // ),
    instituicao: yup.string().required(t.enrollment.validation.required()),
    nomeFiliado: yup.string().required(t.enrollment.validation.required()),
    grauParentesco: yup.string().required(t.enrollment.validation.required()),
    cpfFiliado: yup.string().required(t.enrollment.validation.required()),
  })
  .required();

export default function StepPersonalInfo({
 onNext,
}: {
  onNext: (data: DataStepPersonalInfo) => void;
}) {
  const { translator } = useI18n();
  const t = translator;
  const schema = createSchema(t);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DataStepPersonalInfo>({
    // Forçar o genérico no resolver evita o erro de tipo
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const cpfValue = watch("cpf");

  const onSubmit = (data: DataStepPersonalInfo) => {
    console.log("onSubmit");
    onNext(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errs) => {
        // Ajuda a debugar quando nada acontece
        console.log("invalid", errs);
      })}
      className={styles["adesao-step"]}
      noValidate
    >
      {/* Informações pessoais */}
      <div className={styles["section-title"]}>
        <h2>{t.enrollment.personalInfo.title()}</h2>
      </div>

      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.nomeCompleto ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.fullName()}</label>
          <input
            {...register("nomeCompleto")}
            placeholder={t.enrollment.personalInfo.fullNamePlaceholder()}
          />
          {errors.nomeCompleto && (
            <span className={styles["error-text"]}>
              {errors.nomeCompleto.message}
            </span>
          )}
        </div>
      </div>

      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.cpf ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.cpf()}</label>
          <InputCPF
            name="cpf"
            defaultValue={cpfValue}
            onChangeCPF={(formatted, digitsOnly) => {
              setValue("cpf", formatted);
            }}
            errorMessage={errors.cpf?.message}
          />
        </div>

        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.dataNascimento ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.birthDate()}</label>
          <input {...register("dataNascimento")} placeholder={t.enrollment.personalInfo.birthDatePlaceholder()} />
          {errors.dataNascimento && (
            <span className={styles["error-text"]}>
              {errors.dataNascimento.message}
            </span>
          )}
        </div>
      </div>
     
      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.genero ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.gender()}</label>
          <select {...register("genero")}>
            <option value="">{t.enrollment.personalInfo.selectGender()}</option>
            <option value="M">{t.enrollment.personalInfo.male()}</option>
            <option value="F">{t.enrollment.personalInfo.female()}</option>
          </select>
          {errors.genero && (
            <span className={styles["error-text"]}>
              {errors.genero.message}
            </span>
          )}
        </div>

        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.estadoCivil ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.maritalStatus()}</label>
          <select {...register("estadoCivil")}>
            <option value="">{t.enrollment.personalInfo.selectMaritalStatus()}</option>
            <option value="solteiro">{t.enrollment.personalInfo.single()}</option>
            <option value="casado">{t.enrollment.personalInfo.married()}</option>
          </select>
          {errors.estadoCivil && (
            <span className={styles["error-text"]}>
              {errors.estadoCivil.message}
            </span>
          )}
        </div>
      </div>

      <div className={styles["row"]}>
        
        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.email ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.email()}</label>
          <input {...register("email")} placeholder={t.enrollment.personalInfo.emailPlaceholder()} />
          {errors.email && (
            <span className={styles["error-text"]}>{errors.email.message}</span>
          )}
        </div>


      <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.telefone ? styles["field--error"] : ""
          }`}
        >
          <label>{t.enrollment.personalInfo.phone()}</label>
          <input {...register("telefone")} placeholder={t.enrollment.personalInfo.phonePlaceholder()} />
          {errors.telefone && (
            <span className={styles["error-text"]}>
              {errors.telefone.message}
            </span>
          )}
        </div>
        

      </div>


      {/* Upload de documento */}
      <div className={styles["section-title"]}>
        <h2>Anexar documento</h2>
        <p>        
        Os documentos aceitos para envio são: RG, CNH, Certidão de Nascimento (para menores), Passaporte, CTPS, Carteira Profissional ou Identidade Militar. Ressaltamos que a utilização desses documentos tem como finalidade exclusiva a confirmação de suas informações.
        Formatos aceitos: PDF, JPG, PNG. Na máximo 10mb
        </p>
      </div>

      <label
        className={`${styles["upload"]} ${
          errors.documento ? styles["field--error"] : ""
        }`}
      >
        Anexar documento de identificação
        <input
          type="file"
          {...register("documento")}
          accept=".pdf,.jpg,.jpeg,.png"
          hidden
        />
      </label>
      {errors.documento && (
        <span className={styles["error-text"]}>{errors.documento.message}</span>
      )}

      {/* Instituição */}
      <div className={styles["section-title"]}>
        <h2>Empregado, associado ou aposentado</h2>
      </div>


      <div className={styles["row"]}>
          <div
            className={`${styles["field"]} ${styles["w-50"]} ${
              errors.instituicao ? styles["field--error"] : ""
            }`}
          >
            <label>Instituidor</label>
            <select {...register("instituicao")}>
              <option value="">Selecione</option>
              <option value="instituto1">Instituto 1</option>
              <option value="instituto2">Instituto 2</option>
            </select>
            {errors.instituicao && (
              <span className={styles["error-text"]}>
                {errors.instituicao.message}
              </span>
            )}
          </div>
      </div>    

      {/* Dados do filiado */}
      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.nomeFiliado ? styles["field--error"] : ""
          }`}
        >
          <label>Nome completo</label>
          <input {...register("nomeFiliado")} placeholder="Digite seu nome completo" />
          {errors.nomeFiliado && (
            <span className={styles["error-text"]}>
              {errors.nomeFiliado.message}
            </span>
          )}
        </div>

      </div>

      <div className={styles["row"]}>

        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.grauParentesco ? styles["field--error"] : ""
          }`}
        >
          <label>Grau de parentesco</label>
          <select {...register("grauParentesco")}>
            <option value="">Selecione</option>
            <option value="pai">Pai</option>
            <option value="mae">Mãe</option>
          </select>
          {errors.grauParentesco && (
            <span className={styles["error-text"]}>
              {errors.grauParentesco.message}
            </span>
          )}
        </div>

        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.cpfFiliado ? styles["field--error"] : ""
          }`}
        >
          <label>CPF do filiado</label>
          <InputCPF
            name="cpfFiliado"
            defaultValue={watch("cpfFiliado")}
            onChangeCPF={(formatted, digitsOnly) => {
              setValue("cpfFiliado", formatted);
            }}
            errorMessage={errors.cpfFiliado?.message}
          />
        </div>
      </div>


      {/* ações */}
      <div className={styles["actions"]}>
        <button className={styles["button"]}>
          {t.enrollment.actions.continue()}
        </button>
      </div>
    </form>
  );
}
