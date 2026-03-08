import React, { useEffect, useRef, useState } from 'react';
import { CASES_DATA } from './data/cases';
import './MicroLanding.css';

const TELEGRAM_BOT_URL = 'https://t.me/teslykww';

const HERO_LOGOS = [
  { src: '/images/logos/logo-bmw.png', alt: 'BMW' },
  { src: '/images/logos/logo-rqc.png', alt: 'Российский квантовый центр' },
  { src: '/images/logos/logo-psych.png', alt: 'ПСЫХ' },
  { src: '/images/logos/logo-senezh.png', alt: 'СЕНЕЖ' },
  { src: '/images/logos/logo-superjob.png', alt: 'SuperJob' },
  { src: '/images/logos/logo-rzd.png', alt: 'РЖД Медицина' },
  { src: '/images/logos/logo-surgaz.png', alt: 'SURGAZ' },
  { src: '/images/logos/logo-union.png', alt: 'UNION' },
  { src: '/images/logos/logo-kosmoteros.png', alt: 'KOSMOTEROS' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg', alt: 'Shell' },
  { src: 'https://upload.wikimedia.org/wikipedia/ru/3/36/Sberbank_Logo_2020.svg', alt: 'Сбер' },
];

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.25-2.01 9.45c-.15.67-.54.83-1.09.51l-3-2.21-1.45 1.4c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12L7.09 14.6l-2.95-.92c-.64-.2-.66-.64.14-.95l11.53-4.45c.53-.19 1 .13.75.97z" />
  </svg>
);

const TickIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" width="9" height="9">
    <path d="M2 5l2.5 2.5L8 3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm.6 9H5.4V5.4h1.2V9zm0-4.8H5.4V3H6.6v1.2z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
    <path d="M6 0l1.5 3.5L11 4.1 8.5 6.5l.6 3.5L6 8.4 2.9 10l.6-3.5L1 4.1l3.5-.6z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

/**
 * Тёмный лендинг для внутренней страницы /3.
 * Полная версия с hero, scene, offer, author, proof, CTA.
 */
export default function MicroLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      setStickyVisible(window.scrollY > hero.offsetHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const testimonialCases = CASES_DATA.slice(0, 4);

  return (
    <div className="micro-landing">
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="/">
            <div className="logo-photo">
              <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
            </div>
            <div>
              <div className="logo-name">Влад Теслюк</div>
              <div className="logo-role">Бизнес-трекер · 9 лет · 300+ компаний</div>
            </div>
          </a>
          <div className="header-proof">Проверено на 300+ бизнесах</div>
        </div>
      </header>

      <section className="hero hero-split" ref={heroRef}>
        <div className="hero-content">
          <div className="eyebrow ani d1">
            <StarIcon />
            PDF-Workbook · Бесплатно · 29 страниц
          </div>
          <h1 className="ani d2">
            Как собственнику <br />
            выйти из «операционки»<br />
            и сделать <em style={{ whiteSpace: 'nowrap' }}>×2 к прибыли</em>
          </h1>
          <p className="hero-sub ani d3">
            Пошаговый план внедрения <strong>системы управления</strong>, которая освободит 15 часов в неделю и уберет хаос. Без эзотерики, только цифры.
          </p>
          <a href={TELEGRAM_BOT_URL} className="cta-primary ani d4" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Получить PDF — подписаться на Telegram
          </a>
          <p className="cta-note ani d5">
            <InfoIcon />
            Бесплатно. Без регистрации. Без обязательств.
          </p>
          <div className="hero-trust ani d6">
            <span>Опыт работы с:</span>
            <div className="logos-row logos-row-main">
              {HERO_LOGOS.map((l, i) => (
                <img key={i} src={l.src} alt={l.alt} />
              ))}
            </div>
            <div className="logos-row logos-row-300">
              и ещё более 300 компаний
            </div>
          </div>
        </div>
        <div className="hero-visual ani d3">
          <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
        </div>
      </section>

      <section className="scene-section">
        <div className="scene-inner">
          <div className="scene-label ani d1">Узнаёшь себя?</div>
          <p className="scene-text ani d2">
            Суббота. Вечер. Ты в ресторане с семьёй.<br />
            Ешь стейк, улыбаешься жене, киваешь ребёнку.<br />
            Но телефон лежит на столе — <em>и ты на него косишься.</em>
          </p>
          <div className="phone-mock ani d3">
            <div className="phone-time">Суббота, 22:43 · 5 пропущенных</div>
            <div className="phone-msg">
              <div className="phone-msg-from">РОП (Олег)</div>
              <div className="phone-msg-text">Влад, клиент требует возврат, орёт. Что делать?? Ты где?</div>
              <div className="phone-msg-time">22:30</div>
            </div>
            <div className="phone-msg">
              <div className="phone-msg-from">Склад</div>
              <div className="phone-msg-text">Машина не приехала, грузчики уходят. Решай срочно.</div>
              <div className="phone-msg-time">22:35</div>
            </div>
            <div className="phone-msg phone-wife">
              <div className="phone-msg-from">Жена ❤️</div>
              <div className="phone-msg-text">Ты обещал сегодня без телефона... Ужин остыл.</div>
              <div className="phone-msg-time">22:41</div>
            </div>
          </div>
          <p className="scene-footer ani d4">
            Ты <strong>бежал к деньгам, чтобы стать свободным.</strong><br />
            А в итоге построил тюрьму, где ты — и начальник, и надзиратель, и заключённый.<br />
            Это не бизнес. Это <strong>высокооплачиваемая работа в аду.</strong>
          </p>
          <div className="pains ani d5">
            <div className="pain-item">
              <div className="pain-num">1</div>
              <div>
                <div className="pain-title">Узкое горлышко</div>
                <div className="pain-desc">90% задач завязаны на твоём «ОК». Выключи телефон на три дня — выручка упадёт. Твой час стоит <strong>15 000 ₽</strong>, но ты тратишь его на задачи за 500 ₽.</div>
              </div>
            </div>
            <div className="pain-item">
              <div className="pain-num">2</div>
              <div>
                <div className="pain-title">Стеклянный потолок</div>
                <div className="pain-desc">Хочешь вырасти ×2 — надо пахать ×2, но ты уже на пределе. Сутки не резиновые, а ты уже <strong>давно за гранью нормы.</strong></div>
              </div>
            </div>
            <div className="pain-item">
              <div className="pain-num">3</div>
              <div>
                <div className="pain-title">Выручка растёт — денег нет</div>
                <div className="pain-desc">Продаёшь больше, работаешь больше, а в конце месяца смотришь на счёт — и не понимаешь, <strong>куда ушли деньги.</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="offer-section">
        <div className="section-eyebrow ani d1">что ты получишь</div>
        <div className="offer-grid offer-grid-new">
          <div className="offer-intro ani d2">
          <h2>Сразу после подписки —<br /><em>три рабочих инструмента</em></h2>
          <p>Не «ещё один полезный канал». Конкретные инструменты, которые дадут результат уже в первые 15 минут.</p>
          <div className="offer-sub-eyebrow">
            <InfoIcon />
            Сразу после подписки
          </div>
          </div>
          <div className="pdf-wrap ani d3">
            <div className="pdf-stack">
              <img src="/images/workbook-cover.png" alt="Workbook Выкупи Своё Время" className="pdf-img" />
            </div>
            <div className="pdf-pages-badge">29<br />стр.</div>
          </div>
        </div>
        <div className="offer-tools ani d3">
          <div className="tool-card">
            <div className="tool-card-header">
              <span className="tool-icon"><ClockIcon /></span>
              <span className="tool-badge">Сразу</span>
            </div>
            <h3 className="tool-title">Формула стоимости твоего часа</h3>
            <p className="tool-desc">Посчитай в цифрах — сколько денег ты теряешь каждую неделю, делая чужую работу. Большинство называют число с 6 нулями.</p>
          </div>
          <div className="tool-card">
            <div className="tool-card-header">
              <span className="tool-icon"><TargetIcon /></span>
              <span className="tool-badge">Через 10 мин</span>
            </div>
            <h3 className="tool-title">Квадрант DRIP — где застряло время</h3>
            <p className="tool-desc">15 минут упражнения — и ты видишь, какие задачи убивают твою прибыль и от чего надо избавиться первым.</p>
          </div>
          <div className="tool-card">
            <div className="tool-card-header">
              <span className="tool-icon"><DocIcon /></span>
              <span className="tool-badge">Через 30 мин</span>
            </div>
            <h3 className="tool-title">PDF «Выкупи Своё Время»</h3>
            <p className="tool-desc">29 страниц, 14 инструментов выхода из операционки. Проверено на 300+ российских бизнесах — от 3 млн до 5 млрд выручки.</p>
          </div>
        </div>
        <div className="offer-extra ani d4">
          <div className="offer-extra-card">
            <div className="offer-extra-label">Через 3 дня</div>
            <p>Кейс: как Сергей вышел с <strong>70 часов/нед</strong> → <strong>35 часов/мес</strong> и сделал <strong>+2,9 млн</strong> чистыми</p>
          </div>
          <div className="offer-extra-card">
            <div className="offer-extra-label">По желанию</div>
            <p><strong>60 мин личный разбор</strong> с Владом — твой бизнес, твои цифры, конкретный план. Бесплатно.</p>
          </div>
        </div>
        <div className="offer-cta ani d4">
          <a href={TELEGRAM_BOT_URL} className="cta-primary" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Получить PDF бесплатно
          </a>
          <p className="cta-note">
            <InfoIcon />
            Подписка на канал → PDF за 30 секунд
          </p>
        </div>
      </section>

      <section className="author-section">
        <div className="author-inner">
          <div className="author-photo ani d2">
            <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
          </div>
          <div className="author-right ani d3">
            <h3>Влад Теслюк</h3>
            <div className="author-tag">Бизнес-трекер · Архитектор бизнес-систем</div>
            <p className="author-story">
              Совладелец IT-компании, мебельного производства, швейной фабрики и девелоперского проекта. В 2021 году оказался под капельницей с диагнозом «истощение». <em>Понял: построил не компанию, а высокооплачиваемую работу на себя.</em> После этого перестроил всё с нуля — и теперь помогаю другим не повторять ту же ошибку.
            </p>
            <div className="author-clients">
              <strong>Клиенты:</strong> Shell · Архыз · SuperJob · Сенеж · Российский квантовый центр · и другие<br />
              Масштаб: от 3 млн до 5 млрд ₽ выручки
            </div>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-num">300+</div>
                <div className="stat-desc">бизнесов<br />в трекинге</div>
              </div>
              <div className="stat">
                <div className="stat-num">9 лет</div>
                <div className="stat-desc">в бизнес-<br />консалтинге</div>
              </div>
              <div className="stat">
                <div className="stat-num">+47%</div>
                <div className="stat-desc">средний рост<br />прибыли за 90 дней</div>
              </div>
              <div className="stat">
                <div className="stat-num">9.4</div>
                <div className="stat-desc">NPS<br />клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div className="section-eyebrow ani d1">Результаты клиентов</div>
        <div className="testimonials-grid ani d3">
          {testimonialCases.map((c, i) => (
            <div key={i} className="t-card">
              <p className="t-quote">«{c.quote}»</p>
              <div className="t-author">
                <div className="t-ava">
                  <img src={c.photo} alt={c.name} />
                </div>
                <div>
                  <div className="t-name">{c.name}</div>
                  <div className="t-role">{c.sub} · {c.tag}</div>
                </div>
                {c.stats[0] && (
                  <div className="t-result">{c.stats[0].val}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-box ani d3">
          <h2>Разберись, где застрял твой бизнес — <em>бесплатно</em></h2>
          <p>Подпишись на Telegram-канал и получи три инструмента выхода из операционки прямо в чате — за 30 секунд.</p>
          <a href={TELEGRAM_BOT_URL} className="cta-primary" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Получить инструменты → Telegram
          </a>
          <div className="how-row">
            <div className="how-step">
              <div className="how-step-n">1</div>
              <div className="how-step-t">Нажимаешь кнопку</div>
            </div>
            <div className="how-step">
              <div className="how-step-n">2</div>
              <div className="how-step-t">Подписываешься на канал</div>
            </div>
            <div className="how-step">
              <div className="how-step-n">3</div>
              <div className="how-step-t">Получаешь инструменты автоматически</div>
            </div>
          </div>
          <div className="trust-row">
            <div className="trust-item"><InfoIcon /> Без спама</div>
            <div className="trust-item"><InfoIcon /> Без звонков</div>
            <div className="trust-item"><InfoIcon /> Отписка в 1 клик</div>
            <div className="trust-item"><InfoIcon /> 0 ₽</div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Влад Теслюк · Бизнес-трекер · Материалы носят информационный характер</p>
      </footer>

      <div className={`sticky-cta ${stickyVisible ? 'visible' : ''}`} id="stickyCta">
        <a href={TELEGRAM_BOT_URL} className="btn-sticky" target="_blank" rel="noopener noreferrer">
          Забрать PDF-План
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
