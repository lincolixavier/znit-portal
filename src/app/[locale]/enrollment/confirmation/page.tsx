"use client";

import { ComprovanteAdesao } from "../components/ComprovanteAdesao";

const dados = {
  nomeCompleto: "Ana Paula Santos",
  cpf: "123.456.789-10",
  genero: "Feminino",
  email: "ana.santos@email.com",
  dataNascimento: "15/03/1990",
  estadoCivil: "Casada",
  telefone: "(11) 98765-4321",
  representante: {
    nome: "Carlos Santos"
  },
  empregado: {
    instituidor: "Banco do Brasil",
    nome: "João Pereira",
    parentesco: "Pai",
    cpf: "321.654.987-00"
  },
  endereco: {
    cep: "01311-000",
    logradouro: "Av. Paulista",
    numero: "1578",
    complemento: "Apto 101",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP"
  },
  contribuicao: {
    mensal: "250000",
    aporte: "500000"
  }
};

export default function Comprovante() {
  return (
    <>
     <ComprovanteAdesao dados={dados} />
    </>
  );
}
