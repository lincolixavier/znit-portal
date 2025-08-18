"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
const schema: yup.ObjectSchema<DataStepPersonalInfo> = yup
  .object({
    nomeCompleto: yup.string().required("Nome é obrigatório"),
    cpf: yup.string().required("CPF é obrigatório"),
    dataNascimento: yup.string().required("Data de nascimento é obrigatória"),
    genero: yup.string().required("Selecione um gênero"),
    estadoCivil: yup.string().required("Selecione um estado civil"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    telefone: yup.string().required("Telefone é obrigatório"),
    documento: yup
      .mixed<FileList>(),
      // .test(
      //   "required",
      //   "Anexe um documento",
      //   (value): value is FileList => !!value && value.length > 0
      // ),
    instituicao: yup.string().required("Selecione a instituição"),
    nomeFiliado: yup.string().required("Nome do filiado é obrigatório"),
    grauParentesco: yup.string().required("Selecione o grau de parentesco"),
    cpfFiliado: yup.string().required("CPF do filiado é obrigatório"),
  })
  .required();

export default function StepPersonalInfo({
  onNext,
}: {
  onNext: (data: DataStepPersonalInfo) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataStepPersonalInfo>({
    // Forçar o genérico no resolver evita o erro de tipo
    resolver: yupResolver<DataStepPersonalInfo>(schema),
    mode: "onSubmit",
    defaultValues:{
      nomeCompleto: "João da Silva",
      cpf: "123.456.789-00",
      dataNascimento: "01/01/1990",
      genero: "M",
      estadoCivil: "solteiro",
      email: "joao.silva@example.com",
      telefone: "(11) 99999-9999",
      instituicao: "instituto1",
      nomeFiliado: "Maria da Silva",
      grauParentesco: "mae",
      cpfFiliado: "987.654.321-00",
    }
  });

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
      <h2 className={styles["section-title"]}> Informações pessoais</h2>

      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.nomeCompleto ? styles["field--error"] : ""
          }`}
        >
          <label>Nome completo</label>
          <input
            {...register("nomeCompleto")}
            placeholder="Digite seu nome completo"
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
          <label>CPF</label>
          <input {...register("cpf")} placeholder="Digite seu CPF" />
          {errors.cpf && (
            <span className={styles["error-text"]}>{errors.cpf.message}</span>
          )}
        </div>

        <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.dataNascimento ? styles["field--error"] : ""
          }`}
        >
          <label>Data de nascimento</label>
          <input {...register("dataNascimento")} placeholder="00/00/0000" />
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
          <label>Gênero</label>
          <select {...register("genero")}>
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
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
          <label>Estado civil</label>
          <select {...register("estadoCivil")}>
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
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
          <label>Email</label>
          <input {...register("email")} placeholder="Digite seu email" />
          {errors.email && (
            <span className={styles["error-text"]}>{errors.email.message}</span>
          )}
        </div>


      <div
          className={`${styles["field"]} ${styles["w-50"]} ${
            errors.telefone ? styles["field--error"] : ""
          }`}
        >
          <label>Telefone celular</label>
          <input {...register("telefone")} placeholder="(00) 0000-0000" />
          {errors.telefone && (
            <span className={styles["error-text"]}>
              {errors.telefone.message}
            </span>
          )}
        </div>
        

      </div>

     {/* Representante legal */}
      <h3 className={styles["section-title"]}>Representante legal</h3>
      <p className={styles["upload-info"]}>
        Essa Declaração de Consentimento somente pode ser dada por pelo menos um dos pais ou pelo responsável legal da criança.
      </p>

      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${styles["w-100"]} ${
            errors.nomeCompleto ? styles["field--error"] : ""
          }`}
        >
          <label>Nome completo</label>
          <input
            {...register("nomeCompleto")}
            placeholder="Digite o nome completo do responsável"
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
            <label>CPF</label>
            <input
              {...register("cpf")}
              placeholder="Digite o CPF do responsável"
            />
            {errors.cpf && (
              <span className={styles["error-text"]}>
                {errors.cpf.message}
              </span>
            )}
          </div>
        </div>
     

      {/* Upload de documento */}
      <h3 className={styles["section-title"]}>Anexar documento</h3>
      <p className={styles["upload-info"]}>
        Os documentos pedidos são unicamente para confirmação de informações.
        Formatos aceitos: PDF, JPG, PNG. Máximo 10mb.
      </p>
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
      <h3 className={styles["section-title"]}>
        Empregado em atividade ou aposentado
      </h3>
      <div className={styles["row"]}>
          <div
            className={`${styles["field"]} ${
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
      <h3 className={styles["section-title"]}>Dados do Filiado</h3>
      <div className={styles["row"]}>
        <div
          className={`${styles["field"]} ${
            errors.nomeFiliado ? styles["field--error"] : ""
          }`}
        >
          <label>Nome completo do filiado</label>
          <input {...register("nomeFiliado")} placeholder="Digite seu nome completo" />
          {errors.nomeFiliado && (
            <span className={styles["error-text"]}>
              {errors.nomeFiliado.message}
            </span>
          )}
        </div>

        <div
          className={`${styles["field"]} ${
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
          className={`${styles["field"]} ${
            errors.cpfFiliado ? styles["field--error"] : ""
          }`}
        >
          <label>CPF do filiado</label>
          <input {...register("cpfFiliado")} placeholder="Digite seu CPF" />
          {errors.cpfFiliado && (
            <span className={styles["error-text"]}>
              {errors.cpfFiliado.message}
            </span>
          )}
        </div>
      </div>

      {/* ações */}
      <div className={styles["actions"]}>
        <button className={styles["button"]}>
          Continuar
        </button>
      </div>
    </form>
  );
}
