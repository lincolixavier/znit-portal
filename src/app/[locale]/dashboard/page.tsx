"use client";

import Image from "next/image";
import styles from "./page.module.scss";

function PigIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <g fill="none" stroke="#0EA5C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 11a6.5 6.5 0 0 0-6.5-6.5H9.8A6.3 6.3 0 0 0 4 10.8v2.9A3.3 3.3 0 0 0 7.3 17h8.8A3.9 3.9 0 0 0 20 13.1v-.6" />
        <path d="M20 9l2 .6-1.1 2.3" />
        <circle cx="16.2" cy="10" r="0.9" fill="#0EA5C0" stroke="none" />
      </g>
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2l9 5-9 5-9-5 9-5zm9 10l-9 5-9-5" fill="none" stroke="#0EA5C0" strokeWidth="1.8" />
      <path d="M12 7v10" stroke="#0EA5C0" strokeWidth="1.8" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path d="M3 17l6-6 4 4 7-7" fill="none" stroke="#0EA5C0" strokeWidth="1.8" />
      <path d="M14 8h6v6" fill="none" stroke="#0EA5C0" strokeWidth="1.8" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      {/* Saudação */}
      <header className={styles.home__header}>
        <h1 className={styles.home__title}>
          Olá, <span className={styles["home__title--strong"]}>Lincoli!</span> Bom te ver por aqui.
        </h1>
        <p className={styles.home__updated}>Última atualização: 21/08/2025</p>
      </header>

      {/* Linha superior: lembrete + callout */}
      <div className={styles.home__gridTop}>
        {/* Card: lembrete forma de pagamento */}
        <section className={`${styles.card} ${styles["card--reminder"]}`}>
          <div className={styles.card__header}>
            <h2 className={styles.card__title}>Cadastre sua forma de pagamento</h2>
            <div className={styles.ring} aria-label="25% concluído">
              <span className={styles.ring__value}>25%</span>
            </div>
          </div>
          <p className={styles.card__text}>
            Para começar a investir no seu futuro, é necessário informar a forma de pagamento.
            Sem esse cadastro, suas contribuições não poderão ser processadas.
          </p>
          <button className={styles.card__link} type="button">
            Adicionar forma de pagamento
          </button>
        </section>

        {/* Card: callout contribuição extra */}
        <aside className={`${styles.card} ${styles["card--callout"]}`}>
          
          <div className={styles.callout}>
            <div className={styles.callout__text}>
              <p >
              Faça uma contribuição extra e fortaleça seu futuro financeiro.
            </p>
            <button className={styles.callout__cta} type="button">
              Contribuir agora <span aria-hidden>→</span>
            </button>
            </div>
            
            <Image src="/images/savings.svg" width={100} height={140} priority alt="Savings" />

          </div>

        </aside>
      </div>

      {/* Métricas */}
      <div className={styles.home__stats}>
        <article className={styles.stat}>
          <div className={styles.stat__icon}>
            <Image src="/images/savings.png" width={40} height={40} priority alt="Savings" />
          </div>
          <div className={styles.stat__body}>
            <p className={styles.stat__label}>Saldo total acumulado</p>
            <p className={styles.stat__value}>R$ 25.468,23</p>
          </div>
        </article>

        <article className={styles.stat}>
          <Image src="/images/grow.png" width={40} height={40} priority alt="Grow" />
          <div className={styles.stat__body}>
            <p className={styles.stat__label}>Rendimento acumulado</p>
            <p className={styles.stat__value}>25,5%</p>
          </div>
        </article>
      </div>

      {/* Últimas movimentações */}
      <section className={styles.moves}>
        <header className={styles.moves__head}>
          <h3 className={styles.moves__title}>Últimas movimentações</h3>
          <button className={styles.moves__link} type="button">Ver tudo</button>
        </header>

        <ul className={styles.moves__list}>
          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>Contribuição</p>
                <p className={styles.move__date}>12 de Agosto 2024</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 50,00</div>
          </li>

          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>Contribuição extra</p>
                <p className={styles.move__date}>12 de Agosto 2024</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 3.000,00</div>
          </li>

          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>Rendimento mensal</p>
                <p className={styles.move__date}>12 de Agosto 2024</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 1,26</div>
          </li>
        </ul>
      </section>
    </div>
  );
}
