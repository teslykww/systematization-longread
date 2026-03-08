import React, { useEffect, useRef, useState } from 'react';
import { CASES_DATA } from './data/cases';
import './LandingCream.css';

const TELEGRAM_BOT_URL = 'https://t.me/teslykww';

const HERO_LOGOS = [
  { src: '/images/logos/logo-bmw.png', alt: 'BMW' },
  { src: '/images/logos/logo-rqc.png', alt: 'Российский квантовый центр' },
  { src: '/images/logos/logo-psych.png', alt: 'ПСЫХ' },
  { src: '/images/logos/logo-superjob.png', alt: 'SuperJob' },
  { src: '/images/logos/logo-rzd.png', alt: 'РЖД Медицина' },
  { src: '/images/logos/logo-surgaz.png', alt: 'SURGAZ' },
  { src: '/images/logos/logo-kosmoteros.png', alt: 'KOSMOTEROS' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Shell_logo.svg', alt: 'Shell' },
  { src: 'https://upload.wikimedia.org/wikipedia/ru/3/36/Sberbank_Logo_2020.svg', alt: 'Сбер' },
  { src: '/images/logos/logo-senezh.png', alt: 'СЕНЕЖ' },
  { src: '/images/logos/logo-union.png', alt: 'UNION' },
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

const AlertIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M8 2L1 14h14L8 2z" strokeLinejoin="round" />
    <path d="M8 6v4M8 11v.5" strokeLinecap="round" />
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

const SymptomPhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 2 2 0 00.12 1.08 2 2 0 001.95 1.15 9 9 0 005 5 2 2 0 001.15 1.95 2 2 0 001.08.12A2 2 0 0022 16.92z" />
    <path d="M14 2v4M14 2h4M18 6h-4v4" strokeLinecap="round" />
  </svg>
);
const SymptomChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9v9M13 13v5M8 6v12M3 12v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SymptomClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function LandingCream() {
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
    <div className="landing-cream">
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="/">
            <div className="logo-photo">
              <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
            </div>
            <div>
              <div className="logo-name">Влад Теслюк</div>
              <div className="logo-role">Архитектор бизнес-систем</div>
            </div>
          </a>
          <div className="header-proof">Проверено на 300+ бизнесах</div>
        </div>
      </header>

      <section className="hero hero-split" ref={heroRef}>
        <div className="hero-content">
          <div className="eyebrow ani d1">
            Для собственников малого и среднего бизнеса (от 1 млн ₽ чистыми)
          </div>
          <h1 className="ani d2">
            Бизнес вырос, а ты — задолбался?
          </h1>
          <p className="hero-sub ani d3">
            Как перестать быть главным ограничителем своей компании, выйти из ручного управления и системно забирать <strong>1–5 млн чистыми</strong> руками автономной команды — без потери контроля и фоновой тревоги. Без эзотерики и инфошума. Только твёрдая бизнес-инженерия.
          </p>
          <a href={TELEGRAM_BOT_URL} className="cta-primary ani d4" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
            Получить план выхода в Telegram
          </a>
          <p className="cta-note ani d5">
            <InfoIcon />
            Бесплатно. Без обязательств.
          </p>
        </div>
        <div className="hero-visual ani d3">
          <img src="/images/vlad-hero.png" alt="Влад Теслюк" />
        </div>
      </section>

      <section className="scene-section symptoms-section">
        <div className="scene-inner">
          <h2 className="symptoms-title ani d1">3 симптома, что старая система управления сломалась</h2>
          <p className="symptoms-intro ani d2">
            Давай признаем факт: ты уже сделал то, что 95% людей никогда не сделают. Ты построил бизнес и умеешь зарабатывать деньги. Это достойно уважения. Но сейчас ты упёрся в стеклянный потолок, пробить который экстенсивно — работая ещё больше — физически невозможно. Посмотри, в какой сценарий ты провалился:
          </p>
          <div className="symptom-list">
            <div className="symptom-item ani d3">
              <span className="symptom-icon"><SymptomPhoneIcon /></span>
              <div>
                <h3 className="symptom-item-title">Симптом 1. «Справочное бюро для команды»</h3>
                <p className="symptom-item-desc">Сотрудники не могут (или не хотят) принимать решения самостоятельно. За каждым чихом они идут к тебе. Ты нанял людей, чтобы освободить время, но по факту работаешь их высокооплачиваемым диспетчером.</p>
              </div>
            </div>
            <div className="symptom-item ani d4">
              <span className="symptom-icon"><SymptomChartIcon /></span>
              <div>
                <h3 className="symptom-item-title">Симптом 2. «Иллюзия бурного роста»</h3>
                <p className="symptom-item-desc">Выручка есть, суета есть, новые идеи тестируются. Но планы продаж — просто декор на стене. Куда конкретно утекают деньги и где твоя личная чистая маржа — непонятно. Периодически ловишь кассовые разрывы.</p>
              </div>
            </div>
            <div className="symptom-item ani d5">
              <span className="symptom-icon"><SymptomClockIcon /></span>
              <div>
                <h3 className="symptom-item-title">Симптом 3. «Я рядом, но меня нет»</h3>
                <p className="symptom-item-desc">Ты физически находишься дома с семьёй, но мыслями — в операционке. Постоянный фоновый страх: если отключить телефон хотя бы на день — всё рухнет.</p>
              </div>
            </div>
          </div>
          <div className="symptoms-outro-wrap ani d6">
            <span className="symptoms-outro-icon"><AlertIcon /></span>
            <p className="symptoms-outro">
              Это не выгорание и не повод идти к психологу. Это математическое следствие того, что старая модель управления больше не тянет твой масштаб. Нам нужна новая.
            </p>
          </div>
        </div>
      </section>

      <section className="offer-section method-section">
        <h2 className="method-title ani d1">Я не даю советов. Мы перестраиваем фундамент.</h2>
        <p className="method-intro ani d2">
          За 90 дней мы не будем просто «подкручивать маркетинг» или «настраивать отдел продаж». Мы <strong>изменим</strong> то, как ты принимаешь решения и как работает команда. Вот что конкретно изменится:
        </p>
        <div className="method-list">
          <div className="method-item ani d3">
            <h3 className="method-item-title">Ты будешь управлять цифрами, а не ощущениями.</h3>
            <p className="method-item-desc"><strong>Внедрим</strong> единый дашборд: <strong>P&L (отчёт о прибылях и убытках)</strong>, ключевые метрики, движение денег. Ты <strong>будешь точно</strong> видеть, где горит — а не гадать по звонкам менеджеров.</p>
            <div className="artifact-placeholder">
              <div className="artifact-placeholder-inner">
                <img src="/images/artifacts/dashboard.png" alt="Дашборд: P&L, план/факт, воронка продаж" />
              </div>
              <span className="artifact-caption">P&L / дашборд</span>
            </div>
          </div>
          <div className="method-item ani d4">
            <h3 className="method-item-title">Команда начнёт решать вопросы сама. <strong>Возврат ответственности.</strong></h3>
            <p className="method-item-desc"><strong>Вводим</strong> жёсткое правило: к тебе приходят не с вопросом «что делать?», а с форматом «проблема + два варианта решения». <strong>Тебе остаётся только выбрать.</strong> Хаотичные задачи заменятся понятным планом на неделю.</p>
            <p className="artifact-intro">Каждая гипотеза команды проходит через 4 шага: Гипотеза → Действие → Метрика → Итог.</p>
            <div className="artifact-placeholder">
              <div className="artifact-placeholder-inner">
                <img src="/images/artifacts/traction-map.png" alt="Трекшн-карта: гипотезы, метрики, план недели" />
              </div>
              <span className="artifact-caption">Матрица делегирования</span>
            </div>
          </div>
          <div className="method-item ani d5">
            <h3 className="method-item-title">Каждая неделя будет заканчиваться твёрдым результатом.</h3>
            <p className="method-item-desc"><strong>Переходим</strong> на еженедельный ритм — спринты. Никаких задач «сделаем когда-нибудь». Каждая гипотеза команды проходит через 4 шага: Гипотеза → Действие → Метрика → Итог.</p>
          </div>
        </div>
      </section>

      <section className="author-section">
        <div className="author-inner">
          <h2 className="author-section-title ani d1">Кто говорит и что за этим стоит</h2>
          <div className="author-content-wrap">
            <div className="author-right ani d2">
              <p className="author-story">
                Меня зовут Влад Теслюк. Я бизнес-трекер и архитектор бизнес-систем. Более 12 лет в консалтинге и операционном управлении. <strong>Провёл через свою методологию</strong> более 300 собственников и команд. Работал с масштабом от малого <strong>B2B</strong> до предприятий с выручкой 5–7 млрд <strong>рублей</strong>: BMW, Shell, Архыз, Роза Хутор, SuperJob, РКЦ, SAP, CassaRicca, Union, Ангстрем, Zodiac и другие.
              </p>
              <p className="author-tagline">Я <strong>внедряю понятную систему управления, которая опирается на цифры, а не на эмоции.</strong></p>
              <div className="author-logos">
                <div className="logos-row logos-row-main">
                  {HERO_LOGOS.map((l, i) => (
                    <div key={i} className="author-logo-cell">
                      <img src={l.src} alt={l.alt} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="stats-row">
                <div className="stat">
                  <div className="stat-num">300+</div>
                  <div className="stat-desc">бизнесов<br />в трекинге</div>
                </div>
                <div className="stat">
                  <div className="stat-num">12+ лет</div>
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
            <div className="author-photo author-photo-action ani d3">
              <img src="/images/vlad-summit.png" alt="Влад Теслюк на сессии" />
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
          <div className="cta-box-inner">
            <div className="cta-content">
              <h2>Готов превратить бизнес в автономную систему?</h2>
              <p>Уже более 300 собственников прошли этот путь. Средний рост прибыли за 90 дней — +47%. <strong>Обязательное время</strong> в операционке сокращается до 10–15 часов в неделю.</p>
              <p className="cta-steps-intro"><strong>Как</strong> мы поступим дальше:</p>
              <ol className="cta-steps-list">
                <li>Нажимаешь кнопку ниже и переходишь в <strong>Telegram-бот</strong>.</li>
                <li>Отвечаешь на 3 коротких вопроса <strong>о своём бизнесе</strong>.</li>
                <li>Получаешь <strong>PDF-воркбук</strong> с пошаговым планом выхода из операционки.</li>
                <li><strong>Изучаешь материал.</strong> Если понимаешь, что нужен личный разбор — бронируешь слот на глубокую диагностическую сессию.</li>
              </ol>
              <div className="cta-urgency-wrap">
                <span className="cta-urgency-icon"><AlertIcon /></span>
                <p className="cta-urgency">Воркбук доступен всем. Но в личную работу я физически не беру всех подряд — работаю только с теми, кому реально могу помочь.</p>
              </div>
              <a href={TELEGRAM_BOT_URL} className="cta-primary" target="_blank" rel="noopener noreferrer">
                <TelegramIcon />
                Перейти в Telegram и забрать воркбук <strong>(0 ₽)</strong>
              </a>
              <div className="trust-row">
                <div className="trust-item"><InfoIcon /> Без спама</div>
                <div className="trust-item"><InfoIcon /> Без <strong>навязчивых</strong> звонков</div>
                <div className="trust-item"><InfoIcon /> Отписка в 1 клик</div>
                <div className="trust-item"><InfoIcon /> 0 ₽</div>
              </div>
            </div>
            <div className="cta-workbook-wrap">
              <div className="workbook-mockup">
                <img src="/images/workbook-cover.png" alt="Воркбук: план выхода из операционки" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Влад Теслюк · Архитектор бизнес-систем</p>
      </footer>

      <div className={`sticky-cta ${stickyVisible ? 'visible' : ''}`} id="stickyCta">
        <a href={TELEGRAM_BOT_URL} className="btn-sticky" target="_blank" rel="noopener noreferrer">
          Забрать воркбук
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}
