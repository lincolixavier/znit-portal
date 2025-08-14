
"use client";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./steps.module.scss";

interface Step1FormData {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  genero: string;
  estadoCivil: string;
  email: string;
  telefone: string;
  documento: FileList;
  instituicao: string;
  nomeFiliado: string;
  grauParentesco: string;
  cpfFiliado: string;
}

const schema = yup.object({
  nomeCompleto: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  dataNascimento: yup.string().required("Data de nascimento é obrigatória"),
  genero: yup.string().required("Selecione um gênero"),
  estadoCivil: yup.string().required("Selecione um estado civil"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  documento: yup
    .mixed()
    .test("required", "Anexe um documento", (value) => value && value.length > 0),
  instituicao: yup.string().required("Selecione a instituição"),
  nomeFiliado: yup.string().required("Nome do filiado é obrigatório"),
  grauParentesco: yup.string().required("Selecione o grau de parentesco"),
  cpfFiliado: yup.string().required("CPF do filiado é obrigatório"),
});

export default function Step1({ onNext }: { onNext: (data: Step1FormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Step1FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className={styles["adesao-step1"]}>
      {/* Informações pessoais */}
      <h2 className={styles["section-title"]}> Informações pessoais</h2>
      <div className={styles["grid"]}>
        <div className={styles["field"]}>
          <label>Nome completo</label>
          <input {...register("nomeCompleto")} placeholder="Digite seu nome completo" />
          {errors.nomeCompleto && <span className="error-text"> {errors.nomeCompleto.message}</span>}
        </div>

        <div className={styles["field"]}>
          <label>Data de nascimento</label>
          <input {...register("dataNascimento")} placeholder="00/00/0000" />
        </div>

        <div className={styles["field"]}>
          <label>CPF</label>
          <input {...register("cpf")} placeholder="Digite seu CPF" />
        </div>

        <div className={styles["field"]}>
          <label>Estado civil</label>
          <select {...register("estadoCivil")}>
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
          </select>
        </div>

        <div className={styles["field"]}>
          <label>Gênero</label>
          <select {...register("genero")}>
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>

        <div className={styles["field"]}>
          <label>Telefone celular</label>
          <input {...register("telefone")} placeholder="(00) 0000-0000" />
        </div>

        <div className={styles["field"]}>
          <label>Email</label>
          <input {...register("email")} placeholder="Digite seu email" />
        </div>
      </div>

      {/* Upload de documento */}
      <h3 className={styles["section-title"]}>Anexar documento</h3>
      <p className="upload-info">
        Os documentos pedidos são unicamente para confirmação de informações. Formatos aceitos: PDF, JPG, PNG. Máximo 10mb.
      </p>
      <label className="upload">
        Anexar documento de identificação
        <input type="file" {...register("documento")} accept=".pdf,.jpg,.png" hidden />
      </label>

      {/* Instituição */}
      <h3 className={styles["section-title"]}>Empregado em atividade ou aposentado</h3>
      <div className={styles["field"]}>
        <label>Instituidor</label>
        <select {...register("instituicao")}>
          <option value="">Selecione</option>
          <option value="instituto1">Instituto 1</option>
          <option value="instituto2">Instituto 2</option>
        </select>
      </div>

      {/* Dados do filiado */}
      <h3 className={styles["section-title"]}>Dados do Filiado</h3>
      <div className="grid">
        <div className={styles["field"]}>
          <label>Nome completo do filiado</label>
          <input {...register("nomeFiliado")} placeholder="Digite seu nome completo" />
        </div>

        <div className={styles["field"]}>
          <label>Grau de parentesco</label>
          <select {...register("grauParentesco")}>
            <option value="">Selecione</option>
            <option value="pai">Pai</option>
            <option value="mae">Mãe</option>
          </select>
        </div>

        <div className={styles["field"]}>
          <label>CPF do filiado</label>
          <input {...register("cpfFiliado")} placeholder="Digite seu CPF" />
        </div>
      </div>

      <button type="submit" className="button">
        Continuar
      </button>
    </form>
  );
}
