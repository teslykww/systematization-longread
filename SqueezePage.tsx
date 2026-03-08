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
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPL = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
    <path d="M13 13h4M13 17h4" />
  </svg>
);

const IconDelegate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M12 7v4M12 11l-5 6M12 11l5 6" />
  </svg>
);

const IconSprint = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 2v4M16 2v4" />
    <path d="M7 14h4M7 17h2" />
    <path d="M15 13l2 2-2 2" />
  </svg>
);

export default function SqueezePage() {
  return (
    <div className="squeeze-page">
      {/* Экран 1 — тёмный hero */}
      <section className="squeeze-hero">
        <div className="squeeze-hero-inner">
          <div className="squeeze-hero-text">
            <div className="squeeze-author-line">
              <div className="squeeze-author-avatar">
                <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
              </div>
              <div>
                <p className="squeeze-name">Влад Теслюк</p>
                <p className="squeeze-role">Архитектор бизнес-систем · 12+ лет</p>
              </div>
            </div>
            <p className="squeeze-mirror">Ты уже умеешь зарабатывать. Но бизнес всё ещё зависит от тебя лично — и это не норма.</p>
            <p className="squeeze-segment">Для собственников с прибылью от 1 млн ₽ в месяц</p>
            <h1 className="squeeze-title">Бизнес работает.<br />Ты — не отдыхаешь.</h1>
            <p className="squeeze-sub">
              3 шаблона, которые помогут увидеть, где теряются деньги, передать команде ответственность и управлять бизнесом по цифрам — а не по ощущениям.
            </p>
            <p className="squeeze-what">Что внутри:</p>
            <ul className="squeeze-bullets">
              <li>
                <span className="squeeze-bullet-icon"><IconPL /></span>
                <span><strong>Шаблон P&L</strong> — увидишь, где прячется твоя реальная маржа</span>
              </li>
              <li>
                <span className="squeeze-bullet-icon"><IconDelegate /></span>
                <span><strong>Матрица делегирования</strong> — команда начнёт приносить решения, а не вопросы</span>
              </li>
              <li>
                <span className="squeeze-bullet-icon"><IconSprint /></span>
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
              <span><TickIcon /> Без звонков</span>
              <span><TickIcon /> Без обязательств</span>
            </div>
          </div>
          <div className="squeeze-hero-visual">
            <div className="squeeze-photo-wrap">
              <img src="/images/vlad-summit.png" alt="Влад Теслюк" />
            </div>
            <div className="squeeze-mockups">
              <div className="squeeze-mockup squeeze-mockup-1">
                <img src="/images/artifacts/pl-calendar.png" alt="Шаблон P&L" />
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

      {/* Экран 2 — карточки инструментов */}
      <section className="squeeze-cards">
        <div className="squeeze-cards-inner">
          <h2 className="squeeze-cards-title">Что именно ты получишь</h2>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/pl-calendar.png" alt="Шаблон P&L" />
            </div>
            <div className="squeeze-card-body">
              <div className="squeeze-card-icon"><IconPL /></div>
              <h3 className="squeeze-card-head">Шаблон P&L и платёжного календаря</h3>
              <p className="squeeze-card-desc">
                Открываешь файл и видишь бизнес в цифрах: где горит маржа, где заморожены деньги, какие продукты тянут вниз.
              </p>
              <blockquote className="squeeze-card-quote">
                <span className="squeeze-card-quote-result">+20% маржа за 3 месяца</span>
                <p>«Убрал 3 продукта, которые работали в минус — и цифры сразу встали на место»</p>
                <cite>Михаил · мебельное производство</cite>
              </blockquote>
            </div>
          </div>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/delegation-matrix.png" alt="Матрица делегирования" />
            </div>
            <div className="squeeze-card-body">
              <div className="squeeze-card-icon"><IconDelegate /></div>
              <h3 className="squeeze-card-head">Матрица делегирования</h3>
              <p className="squeeze-card-desc">
                Перестаёшь быть диспетчером. Сотрудники приходят не с вопросом «что делать?», а с вариантами решений.
              </p>
              <blockquote className="squeeze-card-quote">
                <span className="squeeze-card-quote-result">20 → 100 менеджеров на удалёнке</span>
                <p>«Я перестал тащить каждого на себе. Команда работает сама.»</p>
                <cite>Роман Шолохов · B2B-продажи</cite>
              </blockquote>
            </div>
          </div>

          <div className="squeeze-card">
            <div className="squeeze-card-screenshot">
              <img src="/images/artifacts/traction-map.png" alt="Трекшн-карта" />
            </div>
            <div className="squeeze-card-body">
              <div className="squeeze-card-icon"><IconSprint /></div>
              <h3 className="squeeze-card-head">Шаблон трекшн-карты</h3>
              <p className="squeeze-card-desc">
                60 минут в понедельник — и неделя под контролем. Измеримые задачи, конкретный результат в пятницу.
              </p>
              <blockquote className="squeeze-card-quote">
                <span className="squeeze-card-quote-result">2–4 часа в день при 1.5 млн чистыми</span>
                <p>«Только жёсткий недельный ритм — и я вышел из операционки.»</p>
                <cite>Андрей · маркетинговое агентство, команда 5 человек</cite>
              </blockquote>
            </div>
          </div>

          {/* Блок доверия с крупными метриками */}
          <div className="squeeze-trust-block">
            <div className="squeeze-metrics-row">
              <div className="squeeze-metric">
                <span className="squeeze-metric-num">300+</span>
                <span className="squeeze-metric-label">собственников прошли<br />через методологию</span>
              </div>
              <div className="squeeze-metric">
                <span className="squeeze-metric-num">12+</span>
                <span className="squeeze-metric-label">лет в бизнес-<br />консалтинге</span>
              </div>
              <div className="squeeze-metric">
                <span className="squeeze-metric-num">90</span>
                <span className="squeeze-metric-label">дней средний цикл<br />до результата</span>
              </div>
            </div>
            <div className="squeeze-logos-row">
              {SQUEEZE_LOGOS.map((l, i) => (
                <img key={i} src={l.src} alt={l.alt} />
              ))}
            </div>
            <p className="squeeze-trust-logos-label">BMW · Shell · Роза Хутор · SuperJob · Архыз · SAP и другие</p>
          </div>

          <a href={TELEGRAM_BOT_URL} className="squeeze-cta squeeze-cta-second" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Забрать шаблоны бесплатно
          </a>
          <div className="squeeze-checks squeeze-checks-center">
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
