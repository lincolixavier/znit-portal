import React from "react";
import styles from "./ComprovanteAdesao.module.scss";
import Image from "next/image";

interface ComprovanteAdesaoProps {
  dados: {
    nomeCompleto: string;
    cpf: string;
    genero: string;
    email: string;
    dataNascimento: string;
    estadoCivil: string;
    telefone: string;
    representante?: {
      nome: string;
    };
    empregado?: {
      instituidor: string;
      nome: string;
      parentesco: string;
      cpf: string;
    };
    endereco: {
      cep: string;
      logradouro: string;
      numero: string;
      complemento?: string;
      bairro: string;
      cidade: string;
      estado: string;
    };
    contribuicao: {
      mensal: string;
      aporte: string;
    };
  };
}

export const ComprovanteAdesao: React.FC<ComprovanteAdesaoProps> = ({ dados }) => {
  return (
    <div className={styles.comprovante}>
     
      <header className={styles.comprovante__header}>
        <div className="logo">
        
          <Image
            priority
            src="/images/logo.svg"
            alt="Capital Prev"
            width={70}
            height={38}
          />
   
        </div>
        <h1>Comprovante de solicitação de adesão</h1>
      </header>

      {/* Informações pessoais */}
      <section className={styles.comprovante__section}>
        <h2 className={styles.comprovante__sectionTitle}>Informações pessoais do titular</h2>
        <div className={styles.comprovante__grid}>
          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>Nome completo</span>
            <span className={styles.comprovante__value}>{dados.nomeCompleto}</span>

            <span className={styles.comprovante__label}>CPF</span>
            <span className={styles.comprovante__value}>{dados.cpf}</span>

            <span className={styles.comprovante__label}>Gênero</span>
            <span className={styles.comprovante__value}>{dados.genero}</span>

            <span className={styles.comprovante__label}>Email</span>
            <span className={styles.comprovante__value}>{dados.email}</span>
          </div>

          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>Data de Nascimento</span>
            <span className={styles.comprovante__value}>{dados.dataNascimento}</span>

            <span className={styles.comprovante__label}>Estado Civil</span>
            <span className={styles.comprovante__value}>{dados.estadoCivil}</span>

            <span className={styles.comprovante__label}>Telefone celular</span>
            <span className={styles.comprovante__value}>{dados.telefone}</span>
          </div>
        </div>
      </section>

      {/* Representante */}
      {dados.representante && (
        <section className={styles.comprovante__section}>
          <h2 className={styles.comprovante__sectionTitle}>Representante legal</h2>
          <div className={styles.comprovante__grid}>
            <div className={styles.comprovante__field}>
              <span className={styles.comprovante__label}>Nome completo</span>
              <span className={styles.comprovante__value}>{dados.representante.nome}</span>
            </div>
          </div>
        </section>
      )}

      {/* Empregado */}
      {dados.empregado && (
        <section className={styles.comprovante__section}>
          <h2 className={styles.comprovante__sectionTitle}>Empregado, associado ou aposentado</h2>
          <div className={styles.comprovante__grid}>
            <div className={styles.comprovante__field}>
              <span className={styles.comprovante__label}>Instituidor</span>
              <span className={styles.comprovante__value}>{dados.empregado.instituidor}</span>

              <span className={styles.comprovante__label}>Nome completo</span>
              <span className={styles.comprovante__value}>{dados.empregado.nome}</span>
            </div>
            <div className={styles.comprovante__field}>
              <span className={styles.comprovante__label}>Grau de parentesco</span>
              <span className={styles.comprovante__value}>{dados.empregado.parentesco}</span>

              <span className={styles.comprovante__label}>CPF</span>
              <span className={styles.comprovante__value}>{dados.empregado.cpf}</span>
            </div>
          </div>
        </section>
      )}

      {/* Endereço */}
      <section className={styles.comprovante__section}>
        <h2 className={styles.comprovante__sectionTitle}>Endereço do titular</h2>
        <div className={styles.comprovante__grid}>
          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>CEP</span>
            <span className={styles.comprovante__value}>{dados.endereco.cep}</span>

            <span className={styles.comprovante__label}>Endereço</span>
            <span className={styles.comprovante__value}>
              {dados.endereco.logradouro}, {dados.endereco.numero}
            </span>

            {dados.endereco.complemento && (
              <>
                <span className={styles.comprovante__label}>Complemento</span>
                <span className={styles.comprovante__value}>{dados.endereco.complemento}</span>
              </>
            )}
          </div>
          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>Bairro</span>
            <span className={styles.comprovante__value}>{dados.endereco.bairro}</span>

            <span className={styles.comprovante__label}>Cidade</span>
            <span className={styles.comprovante__value}>{dados.endereco.cidade}</span>

            <span className={styles.comprovante__label}>Estado</span>
            <span className={styles.comprovante__value}>{dados.endereco.estado}</span>
          </div>
        </div>
      </section>

      {/* Contribuição */}
      <section className={styles.comprovante__section}>
        <h2 className={styles.comprovante__sectionTitle}>Contribuição</h2>
        <div className={styles.comprovante__grid}>
          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>Valor da contribuição</span>
            <span className={styles.comprovante__value}>{dados.contribuicao.mensal}</span>
          </div>
          <div className={styles.comprovante__field}>
            <span className={styles.comprovante__label}>Valor do aporte</span>
            <span className={styles.comprovante__value}>{dados.contribuicao.aporte}</span>
          </div>
        </div>
      </section>

      {/* Termos */}
      <section className={styles.comprovante__section}>
        <h2 className={styles.comprovante__sectionTitle}>
          Termos de aceite e tratamento de dados
        </h2>
        <p className={styles.comprovante__termos}>
          Declaro, para todos os fins, que li, compreendi e estou de acordo com os termos e condições apresentados. Aceito e desejo aderir ao plano de previdência [Capital Prev Mais.].
        Declaro que li e estou ciente de que os dados pessoais por mim fornecidos, incluindo, quando aplicável, dados de terceiros e/ou menores, serão tratados pela [NOME DA FUNDAÇÃO] para as finalidades relacionadas à adesão, manutenção e gestão do plano, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Declaro, ainda, que possuo autorização para o fornecimento de dados de terceiros e/ou menores, responsabilizando-me pela veracidade e legitimidade dessas informações.
        </p>
        <p className={styles.comprovante__termos}>Este documento foi assinado virtualmente  e é intransferível</p>
      </section>

      <footer className={styles.comprovante__footer}>
        <p>Todos os direitos reservados, [nome entidade]</p>
      </footer>
    </div>
  );
};
