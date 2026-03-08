import React, { useEffect } from 'react';
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

/* Рукописная SVG-стрелка (как у конкурентов) */
const ArrowCta = () => (
  <svg className="squeeze-arrow-cta" viewBox="0 0 48 40" fill="none" width="48" height="40">
    <path
      d="M4 8 C10 4, 24 2, 36 14 C40 18, 42 24, 38 30"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      fill="none"
    />
    <path
      d="M32 28 L38 30 L36 22"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default function SqueezePage() {
  useEffect(() => {
    const els = document.querySelectorAll('.sq-anim');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('sq-anim--in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="squeeze-page">
      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="squeeze-hero">
        {/* Зернистый overlay для текстуры */}
        <div className="squeeze-hero-noise" aria-hidden="true" />
        {/* Ambient свечения */}
        <div className="squeeze-glow squeeze-glow-1" aria-hidden="true" />
        <div className="squeeze-glow squeeze-glow-2" aria-hidden="true" />

        <div className="squeeze-hero-inner">
          {/* ── Текстовая колонка ── */}
          <div className="squeeze-hero-text">
            <div className="squeeze-author-line sq-anim sq-anim--fade-right">
              <div className="squeeze-author-avatar">
                <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
              </div>
              <div>
                <p className="squeeze-name">Влад Теслюк</p>
                <p className="squeeze-role">Архитектор бизнес-систем · 12&nbsp;лет</p>
              </div>
            </div>

            <p className="squeeze-mirror sq-anim sq-anim--fade-up" style={{ animationDelay: '0.1s' }}>
              Ты уже умеешь зарабатывать. Но бизнес всё ещё зависит от тебя лично — и это не норма.
            </p>

            <p className="squeeze-segment sq-anim sq-anim--fade-up" style={{ animationDelay: '0.15s' }}>
              Для собственников с прибылью от 1&nbsp;млн&nbsp;₽ в месяц
            </p>

            {/* Двухцветный заголовок */}
            <h1 className="squeeze-title sq-anim sq-anim--fade-up" style={{ animationDelay: '0.2s' }}>
              Бизнес работает.<br />
              <span className="squeeze-title-accent">Ты — не отдыхаешь.</span>
            </h1>

            {/* Акцентная вертикальная линия + подзаголовок */}
            <div className="squeeze-sub-wrap sq-anim sq-anim--fade-up" style={{ animationDelay: '0.28s' }}>
              <span className="squeeze-sub-line" aria-hidden="true" />
              <p className="squeeze-sub">
                3 шаблона: увидишь где теряются деньги, передашь команде ответственность и перейдёшь на управление по цифрам — а не по ощущениям.
              </p>
            </div>

            <p className="squeeze-what sq-anim sq-anim--fade-up" style={{ animationDelay: '0.33s' }}>
              ЧТО ВНУТРИ
            </p>
            <ul className="squeeze-bullets sq-anim sq-anim--fade-up" style={{ animationDelay: '0.38s' }}>
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

            {/* CTA с рукописной стрелкой */}
            <div className="squeeze-cta-wrap sq-anim sq-anim--fade-up" style={{ animationDelay: '0.45s' }}>
              <ArrowCta />
              <div className="squeeze-cta-col">
                <a href={TELEGRAM_BOT_URL} className="squeeze-cta" target="_blank" rel="noopener noreferrer">
                  {/* Blur-гло позади кнопки */}
                  <span className="squeeze-cta-glow" aria-hidden="true" />
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
            </div>
          </div>

          {/* ── Визуальная колонка: фото + мокапы ── */}
          <div className="squeeze-hero-visual">
            {/* Фото «вылезает» вверх за пределы секции */}
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

      {/* ══════════════════════════ КАРТОЧКИ ══════════════════════════ */}
      <section className="squeeze-cards">
        <div className="squeeze-cards-inner">
          <h2 className="squeeze-cards-title sq-anim sq-anim--fade-up">Что именно ты получишь</h2>

          {[
            {
              screenshot: '/images/artifacts/pl-calendar.png',
              alt: 'Шаблон P&L',
              icon: <IconPL />,
              head: 'Шаблон P&L и платёжного календаря',
              desc: 'Открываешь файл и видишь бизнес в цифрах: где горит маржа, где заморожены деньги, какие продукты тянут вниз.',
              result: '+20% маржа за 3 месяца',
              quote: '«Убрал 3 продукта, которые работали в минус — и цифры сразу встали на место»',
              cite: 'Михаил · мебельное производство',
            },
            {
              screenshot: '/images/artifacts/delegation-matrix.png',
              alt: 'Матрица делегирования',
              icon: <IconDelegate />,
              head: 'Матрица делегирования',
              desc: 'Перестаёшь быть диспетчером. Сотрудники приходят не с вопросом «что делать?», а с вариантами решений.',
              result: '20 → 100 менеджеров на удалёнке',
              quote: '«Я перестал тащить каждого на себе. Команда работает сама.»',
              cite: 'Роман Шолохов · B2B-продажи',
            },
            {
              screenshot: '/images/artifacts/traction-map.png',
              alt: 'Трекшн-карта',
              icon: <IconSprint />,
              head: 'Шаблон трекшн-карты',
              desc: '60 минут в понедельник — и неделя под контролем. Измеримые задачи, конкретный результат в пятницу.',
              result: '2–4 часа в день при 1.5 млн чистыми',
              quote: '«Только жёсткий недельный ритм — и я вышел из операционки.»',
              cite: 'Андрей · маркетинговое агентство, 5 человек',
            },
          ].map((card, i) => (
            <div className="squeeze-card sq-anim sq-anim--fade-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="squeeze-card-screenshot">
                <img src={card.screenshot} alt={card.alt} />
              </div>
              <div className="squeeze-card-body">
                <div className="squeeze-card-icon">{card.icon}</div>
                <h3 className="squeeze-card-head">{card.head}</h3>
                <p className="squeeze-card-desc">{card.desc}</p>
                <blockquote className="squeeze-card-quote">
                  <span className="squeeze-card-quote-result">{card.result}</span>
                  <p>{card.quote}</p>
                  <cite>{card.cite}</cite>
                </blockquote>
              </div>
            </div>
          ))}

          {/* Блок доверия */}
          <div className="squeeze-trust-block sq-anim sq-anim--fade-up">
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

          {/* Финальный CTA */}
          <div className="squeeze-final-cta-wrap sq-anim sq-anim--fade-up">
            <a href={TELEGRAM_BOT_URL} className="squeeze-cta squeeze-cta-second" target="_blank" rel="noopener noreferrer">
              <span className="squeeze-cta-glow" aria-hidden="true" />
              <TelegramIcon />
              Забрать шаблоны бесплатно
            </a>
            <div className="squeeze-checks squeeze-checks-center">
              <span><TickIcon /> Бесплатно</span>
              <span><TickIcon /> Без звонков от отдела продаж</span>
              <span><TickIcon /> Отписка в 1 клик</span>
            </div>
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
