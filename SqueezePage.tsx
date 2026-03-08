import React from 'react';
import './SqueezePage.css';

const TELEGRAM_BOT_URL = 'https://t.me/teslykww';

const SQUEEZE_LOGOS = [
  { src: '/images/logos/logo-bmw.png', alt: 'BMW' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg', alt: 'Shell' },
  { src: '/images/logos/logo-superjob.png', alt: 'SuperJob' },
  { src: '/images/logos/logo-rqc.png', alt: 'РКЦ' },
];

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.25-2.01 9.45c-.15.67-.54.83-1.09.51l-3-2.21-1.45 1.4c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12L7.09 14.6l-2.95-.92c-.64-.2-.66-.64.14-.95l11.53-4.45c.53-.19 1 .13.75.97z" />
  </svg>
);

const TickIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" width="10" height="10">
    <path d="M2 5l2.5 2.5L8 3" />
  </svg>
);

export default function SqueezePage() {
  return (
    <div className="squeeze-page">
      {/* Экран 1 — первый разворот: текст слева, фото + скрины справа */}
      <section className="squeeze-hero">
        <div className="squeeze-hero-inner">
          <div className="squeeze-hero-text">
            <p className="squeeze-name">Влад Теслюк</p>
            <p className="squeeze-role">Архитектор бизнес-систем</p>
            <p className="squeeze-segment">Для собственников с прибылью от 1 млн ₽ в месяц</p>
            <h1 className="squeeze-title">Бизнес работает. Ты — не отдыхаешь.</h1>
            <p className="squeeze-sub">
              3 шаблона, которые помогут увидеть, где теряются деньги, передать команде ответственность и управлять бизнесом по цифрам. Бесплатно. Без звонков от отдела продаж.
            </p>
            <p className="squeeze-what">Что внутри:</p>
            <ul className="squeeze-bullets">
              <li>
                <span className="squeeze-bullet-icon">📊</span>
                <span><strong>Шаблон P&L</strong> — увидишь, где прячется твоя реальная маржа</span>
              </li>
              <li>
                <span className="squeeze-bullet-icon">⚙️</span>
                <span><strong>Матрица делегирования</strong> — команда начнёт приносить решения, а не вопросы</span>
              </li>
              <li>
                <span className="squeeze-bullet-icon">🚀</span>
                <span><strong>Шаблон трекшн-карты</strong> — 60 минут в неделю вместо ежедневного контроля</span>
              </li>
            </ul>
            <a href={TELEGRAM_BOT_URL} className="squeeze-cta" target="_blank" rel="noopener noreferrer">
              <TelegramIcon />
              Забрать шаблоны в Telegram
            </a>
            <p className="squeeze-micro">Нажимаешь → переходишь в Telegram → получаешь шаблоны</p>
            <div className="squeeze-checks">
              <span><TickIcon /> Бесплатно</span>
              <span><TickIcon /> Без звонков от отдела продаж</span>
              <span><TickIcon /> Без обязательств</span>
            </div>
            <p className="squeeze-trust-line">300+ собственников в трекинге · 12+ лет в бизнес-консалтинге</p>
          </div>
          <div className="squeeze-hero-visual">
            <div className="squeeze-photo-wrap">
              <img src="/images/vlad-summit.png" alt="Влад Теслюк" />
            </div>
            <div className="squeeze-mockups">
              <div className="squeeze-mockup squeeze-mockup-1">
                <img src="/images/artifacts/pl-calendar.png" alt="Шаблон P&L и платёжного календаря" />
              </div>
              <div className="squeeze-mockup squeeze-mockup-2">
                <img src="/images/artifacts/delegation-matrix.png" alt="Матрица делегирования" />
              </div>
              <div className="squeeze-mockup squeeze-mockup-3">
                <img src="/images/artifacts/traction-map.png" alt="Трекшн-карта" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Экран 2 — после прокрутки */}
      <section className="squeeze-cards">
        <div className="squeeze-cards-inner">
          <h2 className="squeeze-cards-title">Что именно ты получишь</h2>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/pl-calendar.png" alt="Шаблон P&L и платёжного календаря" />
            </div>
            <h3 className="squeeze-card-head">📊 Шаблон P&L и платёжного календаря</h3>
            <p className="squeeze-card-desc">
              Открываешь файл и видишь бизнес в цифрах: где горит маржа, где заморожены деньги, какие продукты тянут вниз.
            </p>
            <p className="squeeze-card-case">
              <strong>Кейс:</strong> Михаил, мебельное производство. После заполнения таблицы увидел: 3 из 8 продуктов работали в минус. Убрал их, и маржинальность выросла с 10% до 30%+ за 3 месяца.
            </p>
          </div>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/delegation-matrix.png" alt="Матрица делегирования" />
            </div>
            <h3 className="squeeze-card-head">⚙️ Матрица делегирования</h3>
            <p className="squeeze-card-desc">
              Пошаговый шаблон, который помогает перестать быть диспетчером для команды. Сотрудники приходят не с вопросом «что делать?», а с вариантами решений.
            </p>
            <p className="squeeze-card-case">
              <strong>Кейс:</strong> Роман Шолохов, B2B-продажи. Команда выросла с 20 до 100 менеджеров на удалёнке, и он не тащит каждого на себе.
            </p>
          </div>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/traction-map.png" alt="Трекшн-карта" />
            </div>
            <h3 className="squeeze-card-head">🚀 Шаблон трекшн-карты</h3>
            <p className="squeeze-card-desc">
              Поможет за 60 минут в неделю расставлять приоритеты, ставить измеримые задачи и получать конкретный результат вместо хаоса.
            </p>
            <p className="squeeze-card-case">
              <strong>Кейс:</strong> Андрей, маркетинговое агентство. Команда 5 человек, личный доход 1,5 млн чистыми при занятости 2–4 часа в день.
            </p>
          </div>

          <div className="squeeze-trust-block">
            <p className="squeeze-trust-stats">
              <strong>300+</strong> собственников в трекинге &nbsp;·&nbsp; <strong>12+ лет</strong> в бизнесе &nbsp;·&nbsp; <strong>90 дней</strong> средний цикл до результата
            </p>
            <p className="squeeze-trust-logos-label">BMW · Shell · Роза Хутор · SuperJob · Архыз · SAP и другие</p>
            <div className="squeeze-logos-row">
              {SQUEEZE_LOGOS.map((l, i) => (
                <img key={i} src={l.src} alt={l.alt} />
              ))}
            </div>
          </div>

          <a href={TELEGRAM_BOT_URL} className="squeeze-cta squeeze-cta-second" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Забрать шаблоны бесплатно
          </a>
          <div className="squeeze-checks">
            <span><TickIcon /> Бесплатно</span>
            <span><TickIcon /> Без звонков от отдела продаж</span>
            <span><TickIcon /> Отписка в 1 клик</span>
          </div>
        </div>
      </section>

      <footer className="squeeze-footer">
        <p>© {new Date().getFullYear()} Влад Теслюк · Архитектор бизнес-систем</p>
      </footer>

      <a href={TELEGRAM_BOT_URL} className="squeeze-sticky-cta" target="_blank" rel="noopener noreferrer" aria-label="Забрать шаблоны">
        <TelegramIcon />
        Забрать шаблоны
      </a>
    </div>
  );
}
