"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import styles from "./page.module.scss";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { translator } = useI18n();
  const t = translator;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      {/* Header com botão de voltar e logo */}
      <header className={styles.header}>
        <button 
          type="button" 
          className={styles.backButton}
          onClick={handleBack}
          aria-label={t.common.back()}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t.common.back()}
        </button>
        
        <div >
          <Image 
            src="/images/logo.svg" 
            alt="Capital Prev" 
            width={60} 
            height={40} 
            priority 
          />
        </div>
      </header>

      <div className={styles.content}>
        <h1 className={styles.title}>Política de Privacidade</h1>
        
        <div className={styles.lastUpdated}>
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className={styles.section}>
          <h2>1. Informações Gerais</h2>
          <p>
            Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais 
            quando você utiliza nossos serviços. Respeitamos sua privacidade e nos comprometemos a proteger 
            seus dados pessoais.
          </p>
        </div>

        <div className={styles.section}>
          <h2>2. Informações que Coletamos</h2>
          <p>Coletamos as seguintes categorias de informações:</p>
          <ul>
            <li><strong>Informações pessoais:</strong> Nome, CPF, data de nascimento, endereço, telefone e e-mail</li>
            <li><strong>Informações de identificação:</strong> Documentos de identificação fornecidos</li>
            <li><strong>Informações de uso:</strong> Como você interage com nossos serviços</li>
            <li><strong>Informações técnicas:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>3. Como Usamos suas Informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul>
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Processar suas solicitações e transações</li>
            <li>Comunicar-nos com você sobre nossos serviços</li>
            <li>Cumprir obrigações legais e regulamentares</li>
            <li>Proteger contra fraudes e atividades suspeitas</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>4. Compartilhamento de Informações</h2>
          <p>
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas 
            seguintes circunstâncias:
          </p>
          <ul>
            <li>Com seu consentimento explícito</li>
            <li>Para cumprir obrigações legais</li>
            <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
            <li>Para proteger nossos direitos legais</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>5. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas 
            informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
        </div>

        <div className={styles.section}>
          <h2>6. Seus Direitos</h2>
          <p>Você tem o direito de:</p>
          <ul>
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Retirar seu consentimento</li>
            <li>Portabilidade dos dados</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>7. Cookies e Tecnologias Similares</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso de nossos 
            serviços e personalizar conteúdo. Você pode controlar o uso de cookies através das configurações 
            do seu navegador.
          </p>
        </div>

        <div className={styles.section}>
          <h2>8. Retenção de Dados</h2>
          <p>
            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos 
            descritos nesta política, a menos que um período de retenção mais longo seja exigido ou 
            permitido por lei.
          </p>
        </div>

        <div className={styles.section}>
          <h2>9. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças 
            significativas através de nossos canais de comunicação ou diretamente em nossos serviços.
          </p>
        </div>

        <div className={styles.section}>
          <h2>10. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações 
            pessoais, entre em contato conosco através dos canais disponíveis em nosso site.
          </p>
        </div>

        <div className={styles.footer}>
          <p>
            <strong>Importante:</strong> Esta política está em conformidade com a Lei Geral de Proteção de 
            Dados (LGPD) e outras regulamentações aplicáveis.
          </p>
        </div>
      </div>
    </div>
  );
}
