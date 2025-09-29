"use client";

import { useEffect, useState } from "react";
import { ComprovanteAdesao } from "../components/ComprovanteAdesao";
import { tempStorage } from "@/lib/tempStorage";

export default function Comprovante() {
  const [dados, setDados] = useState({
    nomeCompleto: "",
    cpf: "",
    genero: "",
    email: "",
    dataNascimento: "",
    estadoCivil: "",
    telefone: "",
    representante: {
      nome: ""
    },
    empregado: {
      instituidor: "",
      nome: "",
      parentesco: "",
      cpf: ""
    },
    endereco: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    contribuicao: {
      mensal: "",
      aporte: ""
    }
  });

  useEffect(() => {
    const userData = tempStorage.getUserData();
    if (userData) {
      const step1 = userData.step1 || {};
      const step2 = userData.step2 || {};
      const step3 = userData.step3 || {};
      
      setDados({
        nomeCompleto: (step1.nomeCompleto as string) || "",
        cpf: (step1.cpf as string) || "",
        genero: (step1.genero as string) || "",
        email: (step1.email as string) || "",
        dataNascimento: (step1.dataNascimento as string) || "",
        estadoCivil: (step1.estadoCivil as string) || "",
        telefone: (step1.telefone as string) || "",
        representante: {
          nome: "" // TODO: Add representative data if needed
        },
        empregado: {
          instituidor: (step1.instituicao as string) || "",
          nome: (step1.nomeFiliado as string) || "",
          parentesco: (step1.grauParentesco as string) || "",
          cpf: (step1.cpfFiliado as string) || ""
        },
        endereco: {
          cep: (step2.cep as string) || "",
          logradouro: (step2.endereco as string) || "",
          numero: (step2.numero as string) || "",
          complemento: (step2.complemento as string) || "",
          bairro: (step2.bairro as string) || "",
          cidade: (step2.cidade as string) || "",
          estado: (step2.estado as string) || ""
        },
        contribuicao: {
          mensal: (step3.contribuicaoMensal as string) || "",
          aporte: (step3.aporteInicial as string) || ""
        }
      });
    }
  }, []);

  return (
    <>
     <ComprovanteAdesao dados={dados} />
    </>
  );
}
