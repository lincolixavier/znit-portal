"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
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
  const { translator } = useI18n();
  const t = translator;

  return (
    <div className={styles.home}>
      {/* Saudação */}
      <header className={styles.home__header}>
        <h1 className={styles.home__title}>
          {t.dashboard.greeting({ name: 'João' })}
        </h1>
        <p className={styles.home__updated}>{t.dashboard.lastUpdate({ date: '21/08/2025' })}</p>
      </header>

      {/* Linha superior: lembrete + callout */}
      <div className={styles.home__gridTop}>
        {/* Card: lembrete forma de pagamento */}
        <section className={`${styles.card} ${styles["card--reminder"]}`}>
          <div className={styles.card__header}>
            <h2 className={styles.card__title}>{t.dashboard.paymentMethod.title()}</h2>
            <div className={styles.ring} aria-label={t.dashboard.paymentMethod.progress({ percentage: 25 })}>
              <span className={styles.ring__value}>25%</span>
            </div>
          </div>
          <p className={styles.card__text}>
            {t.dashboard.paymentMethod.description()}
          </p>
          <button className={styles.card__link} type="button">
            {t.dashboard.paymentMethod.button()}
          </button>
        </section>

        {/* Card: callout contribuição extra */}
        <aside className={`${styles.card} ${styles["card--callout"]}`}>
          
          <div className={styles.callout}>
            <div className={styles.callout__text}>
              <p>
                {t.dashboard.extraContribution.title()}
              </p>
              <button className={styles.callout__cta} type="button">
                {t.dashboard.extraContribution.button()} <span aria-hidden>→</span>
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
            <p className={styles.stat__label}>{t.dashboard.stats.totalBalance()}</p>
            <p className={styles.stat__value}>R$ 25.468,23</p>
          </div>
        </article>

        <article className={styles.stat}>
          <Image src="/images/grow.png" width={40} height={40} priority alt="Grow" />
          <div className={styles.stat__body}>
            <p className={styles.stat__label}>{t.dashboard.stats.accumulatedReturn()}</p>
            <p className={styles.stat__value}>25,5%</p>
          </div>
        </article>
      </div>

      {/* Últimas movimentações */}
      <section className={styles.moves}>
        <header className={styles.moves__head}>
          <h3 className={styles.moves__title}>{t.dashboard.movements.title()}</h3>
          <button className={styles.moves__link} type="button">{t.dashboard.movements.viewAll()}</button>
        </header>

        <ul className={styles.moves__list}>
          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>{t.dashboard.movements.contribution()}</p>
                <p className={styles.move__date}>{t.dashboard.movements.date({ day: '12', month: 'Agosto', year: '2024' })}</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 50,00</div>
          </li>

          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>{t.dashboard.movements.extraContribution()}</p>
                <p className={styles.move__date}>{t.dashboard.movements.date({ day: '12', month: 'Agosto', year: '2024' })}</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 3.000,00</div>
          </li>

          <li className={styles.move}>
            <div className={styles.move__left}>
              <span className={styles.move__dot} aria-hidden>●</span>
              <div>
                <p className={styles.move__name}>{t.dashboard.movements.monthlyReturn()}</p>
                <p className={styles.move__date}>{t.dashboard.movements.date({ day: '12', month: 'Agosto', year: '2024' })}</p>
              </div>
            </div>
            <div className={styles.move__amount}>+R$ 1,26</div>
          </li>
        </ul>
      </section>
    </div>
  );
}
