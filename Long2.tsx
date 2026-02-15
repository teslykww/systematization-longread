import React, { useState, useEffect } from 'react';
import {
  XCircle,
  CheckCircle2,
  ChevronDown,
  AlertTriangle,
  Send,
  MessageCircle,
  ArrowUp,
  Shield,
  X,
  TrendingUp,
  Clock,
  Users,
  Flame,
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  AnimatedSection,
  GlowCTA,
  HandwrittenNote,
  Marker,
  StickyNote,
  TiltCard,
  fadeUp,
  staggerContainer,
  Divider,
} from './ui/SharedComponents';

const TELEGRAM_BOT_URL = 'https://t.me/teslykww';
const TELEGRAM_CHANNEL_URL = 'https://t.me/teslykww';

// ─── Niche Stream (С 2017 года — более 300 клиентов) ───
const NicheStream = () => {
  const row1 = ["Веб-дизайн", "Детская одежда", "Интернет-магазины", "Клининг", "Консалтинг", "Мебель", "Логистика", "Стройматериалы", "Кейтеринг", "Онлайн-школы", "Производство", "Фитнес", "Автосервис", "Салоны красоты", "Опт", "Рестораны и кафе", "Ремонт квартир", "Стоматология", "Типография", "Текстиль"];
  const row2 = ["Застройщики", "Кондитерские", "Косметика", "Лизинг", "Металл", "Организация мероприятий", "Продукты питания", "Риелторы", "Оптика", "Печать", "IT-услуги", "E-commerce", "Маркетинг", "Юридические услуги", "Бурение скважин", "Строительство ИЖС", "Сантехника", "Фото и видео", "Учебные центры", "Туризм"];
  const row3 = ["Розница", "Дизайн интерьера", "Продажа оборудования", "Переезды", "Покрытия", "Парикмахерские", "Онлайн кассы", "Утилизация", "Сувениры", "Нетрадиционная медицина", "Кредиты и займы", "Инженерные системы", "Заводы", "Голографическое оборудование", "Лицензирование", "Одежда", "Оптовое производство", "Техническое обслуживание", "Продажа расходников", "Переводы"];
  const rows = [
    { items: row1, speed: 40, direction: "normal" },
    { items: row2, speed: 50, direction: "reverse" },
    { items: row3, speed: 45, direction: "normal" },
  ];
  return (
    <div className="relative py-16 md:py-20 bg-slate-900 -mx-4 md:-mx-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]"></div>
      <div className="text-center mb-10 px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-black text-white font-serif mb-2">С 2017 года — более 300 клиентов из этих сфер</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">Специфики не существует. Если есть сотрудники и клиенты — система работает</p>
      </div>
      <div className="space-y-3 relative">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        {rows.map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div className="flex gap-3 whitespace-nowrap" style={{ animation: `marquee ${row.speed}s linear infinite ${row.direction}` }}>
              {[...row.items, ...row.items].map((niche, ni) => (
                <span key={`${ri}-${ni}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shrink-0 border transition-colors duration-300 bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-300 cursor-default backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></span>
                  {niche}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Back to Top ───
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-40 w-12 h-12 bg-white border-2 border-slate-900 rounded-full shadow-hard-sm flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors" aria-label="Наверх">
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

// ─── Floating Nav ───
const FloatingNav = () => {
  const [active, setActive] = useState('');
  const ids = ['trap', 'wanted', 'why', 'results', 'process', 'proof', 'value', 'not-for', 'next', 'workbook', 'form'];
  useEffect(() => {
    const onScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const labels: Record<string, string> = { trap: 'Ловушка', wanted: 'Цель', why: 'Почему', results: 'Результаты', process: 'Процесс', proof: 'Доказательства', value: 'Ценность', 'not-for': 'Не для', next: 'Дальше', workbook: 'Workbook', form: 'Записаться' };
  return (
    <nav className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-6 z-40 flex-col gap-3">
      {ids.map(id => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`text-[10px] uppercase tracking-widest font-mono px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${active === id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/80 backdrop-blur-sm text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-900'}`}
        >{labels[id]}</button>
      ))}
    </nav>
  );
};

// ─── Intermediate Modal (before bot) ───
const IntermediateModal = ({ onClose, onOpenBot }: { onClose: () => void; onOpenBot: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 25 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-slate-900" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"><X className="w-4 h-4" /></button>
        <div className="p-6">
          <h3 className="text-2xl font-black font-serif text-slate-900 mb-2">Отлично! Сейчас я дам тебе Workbook и видео</h3>
          <p className="text-slate-600 text-sm mb-6">Чтобы наш разбор был максимально полезным, я подготовил для тебя 2 инструмента:</p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-2xl shrink-0">📄</span>
              <div>
                <div className="font-bold text-slate-900 mb-1">Workbook «Выкупи своё время» (5–15 минут)</div>
                <p className="text-slate-600 text-sm">Практические упражнения, которые покажут, где ты теряешь деньги прямо сейчас.</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <span className="text-2xl shrink-0">🎥</span>
              <div>
                <div className="font-bold text-slate-900 mb-1">Видео-инструкция (12 минут)</div>
                <p className="text-slate-600 text-sm">Конкретный план выхода из операционки за 90 дней.</p>
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-6">После этого ты заполнишь короткую анкету (4 вопроса), и я приглашу тебя на разбор.</p>
          <p className="text-slate-700 font-medium mb-6">👇 Всё это в моём Telegram-боте:</p>
          <GlowCTA onClick={() => { onOpenBot(); onClose(); }} variant="telegram" className="w-full justify-center">
            <Send size={18} /> ОТКРЫТЬ БОТА
          </GlowCTA>
        </div>
      </motion.div>
    </motion.div>
);

// ─── Exit Intent Popup (Long2 version) ───
const ExitIntentPopup = ({ onCTAClick }: { onCTAClick: () => void }) => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (dismissed) return;
    const handleMouse = (e: MouseEvent) => { if (e.clientY < 10 && !dismissed) setShow(true); };
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY < lastScrollY - 300 && window.scrollY > 500) setShow(true);
        lastScrollY = window.scrollY;
      }, 150);
    };
    document.addEventListener('mouseleave', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { document.removeEventListener('mouseleave', handleMouse); window.removeEventListener('scroll', handleScroll); clearTimeout(scrollTimeout); };
  }, [dismissed]);
  const close = () => { setShow(false); setDismissed(true); };
  const handleCTA = () => { onCTAClick(); close(); };
  if (!show || dismissed) return null;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={close}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-slate-900" onClick={e => e.stopPropagation()}>
          <button onClick={close} className="absolute top-3 right-3 z-10 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"><X className="w-4 h-4" /></button>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-2xl font-black font-serif">Подожди!</h3>
            <p className="text-white/80 text-sm mt-1">Получить Workbook и записаться</p>
          </div>
          <div className="p-6 text-center">
            <h4 className="text-xl font-bold text-slate-900 mb-2">60 минут разбора</h4>
            <p className="text-slate-600 text-sm mb-6">Найдём 1-2 ключевых ограничения в твоём бизнесе. Ты получишь ценность даже если не будем работать дальше.</p>
            <GlowCTA onClick={handleCTA} variant="telegram" className="mx-auto w-full">
              <Send size={18} /> Получить Workbook и записаться
            </GlowCTA>
            <button onClick={close} className="mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">Нет, спасибо</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Long2() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const [showIntermediateModal, setShowIntermediateModal] = useState(false);
  const handleCTAClick = () => setShowIntermediateModal(true);
  const goToBot = () => window.open(TELEGRAM_BOT_URL, '_blank');

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden selection:bg-yellow-300">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 origin-left z-50" style={{ scaleX }} />
      <FloatingNav />
      <BackToTop />

      {/* ═══ HERO ═══ */}
      <header className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#dbeafe,transparent)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

        <motion.div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16" style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}>
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-mono text-blue-600 mb-6 tracking-widest uppercase text-xs md:text-sm font-bold bg-blue-50 inline-block px-4 py-2 rounded-full border border-blue-100">
              Время чтения: 7–10 минут
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6 font-serif">
              Как получить <span className="relative inline-block text-blue-600 px-2"><span className="absolute inset-0 bg-blue-100 -skew-x-6 rounded-md -z-10 opacity-50"></span>+2–3x</span> к прибыли, работая на <span className="tabular-nums text-purple-600">15</span> часов меньше в неделю
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto md:mx-0 leading-relaxed mb-6">
              (Без найма дорогих &laquo;звёзд&raquo; и многомесячных внедрений)
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-base md:text-lg text-slate-500 max-w-xl mx-auto md:mx-0 mb-10">
              Если ты сейчас зарабатываешь от 3 млн рублей выручки в месяц, но работаешь 60+ часов в неделю и чувствуешь, что бизнес держится на тебе — это для тебя.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-col items-center md:items-start gap-2">
              <GlowCTA onClick={handleCTAClick} variant="telegram">
                <Send size={20} /> Получить бесплатный разбор
              </GlowCTA>
              <div className="text-[11px] text-slate-400 font-mono text-center md:text-left">Workbook + Видео + Личный разбор (60 минут)</div>
              <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group mt-2">
                <span className="uppercase tracking-widest">Начать чтение</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="w-full md:w-[420px] relative">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
            <img src="/images/vlad-hero.png" alt="Влад Теслюк — Бизнес-трекер" className="w-full h-auto rounded-2xl shadow-hard border-2 border-slate-900 relative z-10 bg-slate-200 object-cover aspect-[3/4]" loading="eager" />
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-lg shadow-lg border border-slate-200 rotate-[-2deg]">
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">Формат</div>
              <div className="font-serif font-bold text-slate-900 text-lg">Еженедельный трекинг</div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ═══ ЛОВУШКА СОБСТВЕННИКА ═══ */}
      <AnimatedSection id="trap">
        <div className="text-center mb-12 relative">
          <HandwrittenNote className="absolute -top-6 left-1/2 -translate-x-1/2 text-slate-400 rotate-2 hidden md:block">Узнал себя?</HandwrittenNote>
          <div className="inline-block border border-slate-900 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4">Вот что происходит</div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-serif leading-tight">Ты застрял в <Marker color="bg-red-200">Ловушке Собственника</Marker></h2>
        </div>

        <div className="space-y-4 mb-8">
          {[
            'Работаешь больше всех в компании',
            'Принимаешь 90% решений сам',
            'Не можешь уехать в отпуск без телефона',
            'Каждый новый клиент = больше работы для тебя',
            'Рост = ещё больше хаоса и переработок',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-3 text-lg text-slate-700">
              <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>

        <StickyNote title="РЕЗУЛЬТАТ" color="bg-red-50">
          Ты не владелец бизнеса. Ты самый высокооплачиваемый сотрудник. И даже не самый высокооплачиваемый, если посчитать на час.
        </StickyNote>
      </AnimatedSection>

      {/* ═══ ЧТО ТЫ РЕАЛЬНО ХОЧЕШЬ ═══ */}
      <AnimatedSection id="wanted">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-6 font-serif leading-tight">Вот что ты РЕАЛЬНО хочешь</h2>
          <p className="text-xl text-slate-600">Не &laquo;систему управления&raquo; и не &laquo;делегирование задач&raquo;. Ты хочешь <strong>новую реальность</strong>:</p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Больше денег при меньших усилиях', desc: 'Прибыль растёт x2-3, а ты работаешь на 15-20 часов меньше в неделю' },
            { title: 'Бизнес работает без тебя', desc: 'Уедешь на 2 недели — выручка не падает, решения принимаются, команда работает' },
            { title: 'Ты принимаешь только стратегические решения', desc: 'Не «какой цвет кнопки», а «открываем ли второе направление»' },
            { title: 'Нанимаешь A-игроков, а не тушишь пожары с B и C', desc: 'Есть система, которая их обучает и контролирует' },
            { title: 'Каждый новый клиент = больше прибыли', desc: 'Есть люди и процессы, которые это обрабатывают' },
            { title: 'Ты спишь спокойно', desc: 'Знаешь, что завтра не развалится' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                <div className="text-slate-600 text-sm">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xl font-bold text-slate-800 mt-8 font-serif">Это и есть настоящая свобода собственника.</p>
      </AnimatedSection>

      {/* ═══ ПОЧЕМУ ДО СИХ ПОР НЕ ПОЛУЧИЛ ═══ */}
      <AnimatedSection id="why" narrow>
        <h2 className="text-3xl font-black font-serif mb-8 text-center">Почему ты до сих пор этого не получил</h2>
        <p className="text-lg text-slate-700 mb-8 text-center">Не потому что ты плохой руководитель. А потому что <strong>никто не показал тебе правильный механизм</strong>.</p>

        <div className="space-y-8">
          {[
            { n: 1, title: 'Ты не знаешь, что именно сломано', items: ['«Кажется, маркетинг не работает»', '«Вроде продажи идут»', '«Наверное, нужно нанять РОПа»'], result: 'Ты тратишь деньги не туда. Нанимаешь РОПа, когда проблема в маркетинге.' },
            { n: 2, title: 'Ты делаешь задачи, которые стоят 500₽/час', items: ['Проверяешь макеты', 'Отвечаешь на вопросы сотрудников', 'Ищешь подрядчиков', 'Согласовываешь договоры'], result: 'Ты теряешь миллионы рублей в год. Твой час стоит 12.000₽+.' },
            { n: 3, title: 'У тебя нет системы тестирования', items: ['1-2 крупных изменения в год', 'CRM внедряешь 6 месяцев', 'Ждёшь 3 месяца результата от маркетолога'], result: 'Конкуренты делают 100+ тестов и уезжают вперёд.' },
          ].map((p) => (
            <div key={p.n} className="border-l-4 border-slate-900 pl-6 py-2">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Проблема #{p.n}: {p.title}</h3>
              <ul className="list-disc pl-5 text-slate-600 mb-2 space-y-1">
                {p.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-slate-700 font-medium"><strong>Результат:</strong> {p.result}</p>
            </div>
          ))}
          <div className="border-l-4 border-slate-900 pl-6 py-2">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Проблема #4: Тебе не с кем обсудить рискованные решения</h3>
            <p className="text-slate-600 mb-3">Ты не можешь прийти к сотрудникам и сказать: «Мне страшно, я не знаю, сработает ли эта гипотеза» или «Хочу уволить пол-отдела и пересобрать заново». Это вызовет панику или саботаж.</p>
            <p className="text-slate-600 mb-3">Почему? У сотрудников свой интерес (стабильность), у тебя — свой (рост). Это конфликт интересов.</p>
            <p className="text-slate-700 font-medium"><strong>Результат:</strong> Ты принимаешь половинчатые решения. Или не принимаешь вообще. Бизнес стоит.</p>
          </div>
        </div>

        {/* Короткий proof (Hormozi) */}
        <div className="mt-12 bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <p className="text-lg font-bold text-slate-900 mb-2">Но это решаемо.</p>
          <p className="text-slate-700">
            За последние 2 года я помог: собственнику агентства освободить 12 ч/нед и вырастить прибыль на 1.8 млн/мес; владельцу e-commerce — +2.2 млн/мес без нового трафика; основателю онлайн-школы — удвоить конверсию за 3 недели (+2.4 млн/мес); b2b-компании делегировать продажи и запустить новое направление (+4 млн/мес).
          </p>
        </div>
      </AnimatedSection>

      <Divider />

      {/* ═══ ВОТ ЧТО Я ДЕЛАЮ + РЕЗУЛЬТАТЫ КЛИЕНТОВ ═══ */}
      <AnimatedSection id="results">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4 font-serif">Вот что я делаю (и почему это работает)</h2>
          <p className="text-xl text-slate-600">Я не консультант, который даёт советы и уходит. Я <strong>бизнес-трекер</strong> — работаю с тобой еженедельно до результата.</p>
        </div>

        {/* Блок Результаты клиентов */}
        <div className="mb-16">
          <h3 className="text-2xl font-black font-serif mb-8 text-center">Результаты клиентов</h3>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {[
              { photo: '/images/case-dmitriy.png', tag: 'Маркетинговое агентство', rev: '8 млн/мес', problem: 'Собственник вёл 60% встреч', result: 'РОП закрывает 50% встреч, освободилось 12 ч/нед', nums: '+1.8 млн/мес прибыли' },
              { photo: '/images/case-elena.png', tag: 'E-commerce', rev: '12 млн/мес', problem: '«Нужно больше трафика»', result: 'Запустили retention, repeat rate 15%→38%', nums: '+2.2 млн/мес без нового трафика' },
              { photo: '/images/case-anastasia.png', tag: 'Онлайн-школа', rev: '6 млн/мес', problem: 'Конверсия 8%', result: 'Конверсия выросла до 18% за 3 недели', nums: '+2.4 млн/мес, никого не наняли' },
              { photo: '/images/case-viktor.png', tag: 'B2B-услуги', rev: '15 млн/мес', problem: 'Собственник вёл все переговоры', result: 'РОП ведёт все созвоны, конверсия 52%', nums: 'Освободили 20 ч/нед, +4 млн/мес новое направление' },
            ].map((c, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-900 overflow-hidden h-full">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img src={c.photo} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
                    <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-mono">{c.tag} • {c.rev}</div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold text-red-600 mb-1">Проблема:</div>
                    <p className="text-slate-700 text-sm mb-3">{c.problem}</p>
                    <div className="text-xs font-bold text-green-600 mb-1">Результат:</div>
                    <p className="text-slate-700 text-sm mb-2">{c.result}</p>
                    <div className="font-black text-green-700">{c.nums}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Детальный кейс с механикой */}
        <div className="mt-12">
          <h4 className="text-xl font-black font-serif mb-4 text-center">Как именно решали — пример (онлайн-школа, 6 млн/мес)</h4>
          <TiltCard className="bg-white rounded-xl border-2 border-blue-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-sm font-bold text-red-600 mb-2">Проблема:</div>
              <p className="text-slate-700 mb-6">Низкая конверсия в продажу — 8% на созвонах</p>
              <div className="text-sm font-bold text-slate-900 mb-3">12 тестов за 3 недели:</div>
              <div className="space-y-2 text-sm text-slate-600 mb-6">
                <div className="flex gap-2"><span className="font-mono text-slate-400 shrink-0">Тест 1-3:</span> Меняем структуру созвона — не сработало</div>
                <div className="flex gap-2"><span className="font-mono text-slate-400 shrink-0">Тест 4-6:</span> Меняем квалификацию до созвона — конверсия +3%</div>
                <div className="flex gap-2"><span className="font-mono text-slate-400 shrink-0">Тест 7-9:</span> Меняем ценообразование — конверсия +5%</div>
                <div className="flex gap-2"><span className="font-mono text-slate-400 shrink-0">Тест 10-12:</span> Меняем гарантии — конверсия +2%</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-bold text-green-800">Результат за 3 недели:</div>
                <div className="text-slate-700">Конверсия выросла с 8% до 18% (×2.25). Прирост прибыли +2.4 млн/мес. Не наняли никого нового.</div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Конкретный пример расчёта маркетинга */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-slate-900 mb-3">Конкретный пример расчёта маркетинга</h4>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-sm text-slate-700">
            <p className="mb-3">3 часа работы сотрудников = клиент за 2-3 месяца (органика). Платная реклама = 10.000₽ на клиента.</p>
            <p className="mb-3">Мы продумываем: как это будет работать, кто этим занимается, кто за это отвечает. Делаем из этого систему.</p>
            <p>Это не просто советы — мы считаем юнит-экономику и строим работающие процессы.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <GlowCTA onClick={handleCTAClick} variant="telegram" className="mx-auto">
            <Send size={18} /> Получить Workbook и записаться
          </GlowCTA>
        </div>
      </AnimatedSection>

      {/* ═══ NICHE STREAM ═══ */}
      <div className="px-4 md:px-6">
        <NicheStream />
      </div>

      {/* ═══ ПРОЦЕСС ПО НЕДЕЛЯМ ═══ */}
      <AnimatedSection id="process" narrow>
        <div className="text-center mb-10">
          <div className="inline-block border border-slate-900 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4">Пошагово</div>
          <h2 className="text-3xl font-black font-serif">Точная система</h2>
        </div>

        {[
          { weeks: '1-2', title: 'Рентген бизнеса', desc: 'Находим одно ключевое ограничение. Не 10 проблем — одну.', bullets: ['Точная картина, где теряешь деньги', 'Понимание, почему работаешь так много', 'Список задач, которые можешь перестать делать завтра', 'Одно ограничение, которое мешает росту'], effort: 'Твои усилия: 4-6 часов встреч' },
          { weeks: '3-4', title: 'Выкуп твоего времени', desc: 'Освобождаем 10-15 часов в неделю. Не через 3 месяца — через 2-4 недели.', bullets: ['Нанимаем ассистента по моей системе. Без ассистента ты — самый дорогой секретарь в мире: тратишь время за 12.000₽/час на задачи за 500₽/час. Люди с ассистентом в разы продуктивнее — он занимается задачами, которые освобождают твоё время для стратегии', 'Находим 3-5 задач, которые вообще не нужны', 'Делегируем 2-3 задачи команде с чеклистами'], effort: 'Твои усилия: 6-8 часов' },
          { weeks: '5-12', title: 'Чиним ключевое ограничение', desc: '100 маленьких тестов вместо 1 большого внедрения за полгода.', bullets: ['Решение проблемы за 4-8 недель', 'Система быстрого тестирования', 'Обычно +30-100% к прибыли'], effort: 'Твои усилия: 2 часа/нед' },
          { weeks: '12+', title: 'Масштабирование и делегирование', desc: 'Делаем функцию работающей без тебя: архитектура → контроль → исполнитель. Ты получаешь Пульт Управления, а не пожарный шланг.', bullets: ['Функция работает без тебя', 'У тебя есть пульт управления — ты видишь цифры и результаты', 'Ещё 10-20 часов освобождено'], effort: 'Твои усилия: 1-2 часа/нед' },
        ].map((phase, i) => (
          <div key={i} className="mb-12 border-l-4 border-blue-500 pl-8 py-4 bg-white rounded-r-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs font-mono uppercase text-blue-600 mb-2 font-bold">Неделя {phase.weeks}</div>
            <h3 className="text-2xl font-black font-serif mb-3">{phase.title}</h3>
            <p className="text-slate-700 mb-4">{phase.desc}</p>
            <ul className="space-y-2 mb-3">
              {phase.bullets.map((b, j) => (
                <li key={j} className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span>{b}</span></li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 italic">{phase.effort}</p>
          </div>
        ))}
      </AnimatedSection>

      {/* ═══ ПОЧЕМУ ЭТО РАБОТАЕТ ═══ */}
      <AnimatedSection id="proof" narrow>
        <h2 className="text-3xl font-black font-serif mb-10 text-center">Почему это работает</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Насмотренность', desc: 'Я 9 лет в бизнесе. Прошёл эти этапы с десятками клиентов: первый найм РОПов и маркетологов, построение отделов с нуля, запуск новых бизнес-моделей, потеря ключевых людей и восстановление. Я знаю, где «минное поле», а где «автобан». Ты можешь не повторять эти ошибки.' },
            { title: 'Кожа в игре', desc: 'Я не даю советы и ухожу. Работаю с тобой еженедельно до результата: обязательные созвоны раз в неделю, на связи в чате между встречами. Не оставляю с рекомендациями — делаем вместе, пока не получишь результат.' },
            { title: 'Система, а не советы', desc: 'Я не говорю: «Тебе нужно делегировать». Я даю конкретные чеклисты, шаблоны документов, скрипты найма, примеры из других клиентов. Берёшь готовое, адаптируешь под себя, запускаешь.' },
            { title: 'Фокус на одном ограничении', desc: 'Большинство консультантов дают 50 рекомендаций. Я нахожу одно ключевое ограничение и мы его устраняем. Ты не распыляешься — фокусируешься на одном. Получаешь результат быстро.' },
          ].map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300">
              <h4 className="font-bold text-lg text-slate-900 mb-2">{p.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══ ЦЕННОСТЬ ═══ */}
      <AnimatedSection id="value" narrow>
        <h2 className="text-3xl font-black font-serif mb-8 text-center">Посчитаем реальную ценность</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><TrendingUp className="w-6 h-6 text-green-600" /></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Прирост прибыли: +30-100%</h4>
              <p className="text-slate-600">Если сейчас зарабатываешь 2 млн чистыми в месяц — станет 2.6-4 млн. = <strong>+7.2-24 млн рублей в год</strong></p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Clock className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Высвобождение времени: 20-30 часов в неделю</h4>
              <p className="text-slate-600">Стоимость твоего часа при прибыли 2 млн/мес — около 11.900₽. 80 часов в месяц × 11.900₽ = <strong>~11.4 млн рублей в год</strong> освобождённого времени</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-purple-600" /></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Экономия на найме «не тех людей»: 1-3 млн</h4>
              <p className="text-slate-600">Не нанимаешь дорогого РОПа за 300к, который не заходит</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><Flame className="w-6 h-6 text-orange-600" /></div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Устранение потерь: 300к-1.5 млн/мес</h4>
              <p className="text-slate-600">Находим, куда сливаются деньги: неэффективная реклама, простой сотрудников, неправильное ценообразование</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">В качестве жизни</h4>
            <p className="text-slate-600">Работаешь 40-45 часов вместо 60-70. Можешь уехать в отпуск без ноутбука. Спишь спокойно. Видишь семью. Есть время на здоровье.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h4 className="font-bold text-slate-900 mb-3">Главный инсайт: 80% роста начинается от головы собственника</h4>
            <p className="text-slate-700 mb-2">Мы смотрим: почему ты принимаешь такие решения, почему переживаешь, почему таких людей нанимаешь.</p>
            <p className="text-slate-600 text-sm">Когда делаем систему, ты сам видишь: «О, а вот здесь повторяющийся сценарий. Почему так?» Это вопросы не только инструментов, но и тебя как собственника.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ НЕ ДЛЯ ТЕБЯ / ДЛЯ ТЕБЯ ═══ */}
      <AnimatedSection id="not-for">
        <div className="text-center mb-10">
          <div className="inline-block border border-slate-900 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4">Честный фильтр</div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50/50 rounded-2xl p-6 md:p-8 border border-red-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-red-500 mb-4"><XCircle className="w-6 h-6" /> Для кого это НЕ подходит</h3>
            <ul className="space-y-2 text-slate-600">
              {['Выручка меньше 3 млн/мес — тебе рано. Сначала нужно найти продукт-рынок фит и стабильный поток клиентов', 'Не готов внедрять', 'Ищешь волшебную таблетку', 'Нужен только советчик', 'Не готов делегировать'].map((t, i) => (
                <li key={i} className="flex gap-2"><XCircle className="w-5 h-5 text-red-400 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50/50 rounded-2xl p-6 md:p-8 border border-green-100">
            <h3 className="flex items-center gap-2 text-xl font-bold text-green-600 mb-4"><CheckCircle2 className="w-6 h-6" /> Для кого идеально</h3>
            <ul className="space-y-2 text-slate-600">
              {['Выручка 3-30 млн/мес, работаешь как проклятый', 'Уже нанимал людей, но не тянут', 'Нет времени на семью/здоровье', 'Не с кем обсудить рискованные решения', 'Готов тестировать быстро'].map((t, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ ЧТО ДАЛЬШЕ ═══ */}
      <AnimatedSection id="next" narrow>
        <h2 className="text-3xl font-black font-serif mb-8 text-center">Что происходит дальше</h2>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-lg mb-2">1. Получи Workbook и видео, заполни анкету (4 вопроса). Если подойдёшь — приглашу на разбор (60 минут)</h4>
            <p className="text-slate-700">Найдём 1-2 ключевых ограничения. Покажу, как бы решал. Поймём, подходим ли друг другу.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h4 className="font-bold text-lg mb-2">2. Если подходим — работаем</h4>
            <p className="text-slate-700">Встречи 1 раз в неделю. На связи в чате. Обычно 6-12 месяцев до полной системы.</p>
          </div>
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <h4 className="font-bold text-lg mb-2">3. Результат или возвращаешь деньги</h4>
            <p className="text-slate-700 mb-3">Если через 3 месяца не получишь минимум 10 часов освобождённого времени ИЛИ +20% прибыли ИЛИ работающую систему — <strong>вернём 100% денег</strong>.</p>
            <p className="text-slate-700 font-semibold">Я верну 100% денег. Без вопросов.</p>
            <p className="text-slate-600 text-sm mt-2">Почему могу гарантировать? За 9 лет ни разу не было клиента, который внедрял мои рекомендации и не получил результат.</p>
            <p className="text-slate-600 text-sm mt-1">Проблема всегда одна: невнедрение. Поэтому работаю только с теми, кто готов внедрять.</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ URGENCY ═══ */}
      <AnimatedSection id="urgency" narrow>
        <div className="bg-red-50 p-8 md:p-10 rounded-2xl border-2 border-red-200 shadow-sm">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 block" />
          <h2 className="text-2xl font-bold font-serif mb-6 text-center">Почему нужно действовать сейчас</h2>
          <p className="text-slate-700 mb-2">Каждая неделя промедления = потерянные деньги.</p>
          <div className="space-y-4 text-slate-700 mb-6 text-left">
            <p><strong>Теряешь 20 часов в неделю на задачи за 500₽/час:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Разница: 11.500₽ × 20 часов = <strong>230.000₽/неделю</strong></li>
              <li>= <strong>920.000₽/месяц</strong> потерь</li>
            </ul>
            <p><strong>Не растёшь, потому что упёрся в потолок:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Минимум <strong>500к-1 млн₽/мес</strong> упущенной прибыли</li>
            </ul>
            <p className="font-bold text-red-700 text-lg">Каждый месяц промедления = 1.4-1.9 млн рублей потерь</p>
          </div>
          <p className="font-bold text-slate-900 text-center">Два пути: продолжать так же или внедрить систему через 6 месяцев.</p>
        </div>
      </AnimatedSection>

      {/* ═══ WORKBOOK BLOCK ═══ */}
      <AnimatedSection id="workbook" narrow>
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-8">
            <div className="w-full md:w-72 shrink-0">
              <div className="relative rounded-lg overflow-hidden shadow-lg border-2 border-slate-200" style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.25)' }}>
                <img src="/images/workbook-cover.png" alt="Workbook «Выкупи своё время» — обложка" className="w-full h-auto aspect-[3/4] object-cover" loading="lazy" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-black font-serif text-slate-900 mb-4">Получи бесплатный Workbook «Выкупи своё время»</h2>
              <p className="text-slate-700 mb-4">Перед разбором я дам тебе практический инструмент — Workbook с упражнениями, которые покажут:</p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /><span>Где ты теряешь 200–500к рублей в месяц</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /><span>Сколько реально стоит твой час (и почему ты делаешь задачи за 500₽)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /><span>Какие задачи можно делегировать уже завтра</span></li>
              </ul>
              <p className="text-slate-700 mb-2 font-medium">Это займёт 5–15 минут, но покажет правду о твоём бизнесе.</p>
              <p className="text-slate-600 text-sm mb-4">После Workbook ты получишь доступ к короткому видео (12 минут), где я показываю конкретный план выхода из операционки. А затем — если увижу, что могу помочь — пригласишь на разбор.</p>
              <p className="text-slate-700 font-medium mb-4">👇 Жми кнопку — получи Workbook в Telegram-боте:</p>
              <GlowCTA onClick={handleCTAClick} variant="telegram">
                <Send size={18} /> ПОЛУЧИТЬ WORKBOOK И ЗАПИСАТЬСЯ НА РАЗБОР
              </GlowCTA>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ CTA FORM ═══ */}
      <AnimatedSection id="form" narrow className="!pt-8">
        <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-900 rounded-2xl p-8 md:p-12 shadow-hard overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-telegram rounded-bl-full opacity-10"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-black text-slate-900 font-serif mb-4">Готов строить бизнес, который работает без тебя?</h3>
            <p className="text-lg text-slate-600 mb-6">Вот что будет дальше:</p>
            <ol className="text-left max-w-lg mx-auto space-y-3 mb-8 text-slate-700">
              <li className="flex gap-3"><span className="font-bold shrink-0">1️⃣</span> Ты получишь Workbook «Выкупи своё время» (покажет, где теряешь деньги)</li>
              <li className="flex gap-3"><span className="font-bold shrink-0">2️⃣</span> Посмотришь короткое видео (конкретный план выхода из операционки за 90 дней)</li>
              <li className="flex gap-3"><span className="font-bold shrink-0">3️⃣</span> Заполнишь анкету (4 вопроса, 2 минуты)</li>
              <li className="flex gap-3"><span className="font-bold shrink-0">4️⃣</span> Я изучу твою ситуацию и приглашу на разбор, если увижу, что могу помочь</li>
            </ol>
            <p className="text-slate-700 font-medium mb-6">Всё это — в моём Telegram-боте.</p>
            <p className="text-slate-600 mb-6">👇 Жми кнопку и получай доступ:</p>
            <GlowCTA onClick={handleCTAClick} variant="telegram" className="mx-auto text-xl py-5 px-12 rounded-xl">
              <Send size={24} /> ПОЛУЧИТЬ WORKBOOK И ЗАПИСАТЬСЯ
            </GlowCTA>
            <p className="mt-4 text-sm text-slate-500">P.S. Мест на разбор ограниченное количество. Я работаю максимум с 8–10 клиентами одновременно.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-600" /> Без спама</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-600" /> Отписка в 1 клик</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 text-center border-t-8 border-blue-600">
        <div className="max-w-2xl mx-auto">
          <p className="mb-6 font-serif text-xl text-slate-200 italic">&laquo;Хаос не исчезает сам по себе. Его можно только структурировать.&raquo;</p>
          <div className="flex justify-center gap-6 mb-6">
            <button onClick={handleCTAClick} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"><Send size={14} /> Получить Workbook и записаться</button>
            <button onClick={() => window.open(TELEGRAM_CHANNEL_URL, '_blank')} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"><MessageCircle size={14} /> Telegram-канал</button>
          </div>
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} Влад Теслюк</p>
        </div>
      </footer>

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 p-3 glass border-t border-slate-200 md:hidden z-40">
        <button onClick={handleCTAClick} className="w-full bg-telegram text-white font-bold py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2 text-base active:scale-[0.97] transition-transform">
          <Send size={18} /> Получить Workbook и записаться
        </button>
      </div>

      <AnimatePresence>
        {showIntermediateModal && (
          <IntermediateModal key="intermediate" onClose={() => setShowIntermediateModal(false)} onOpenBot={goToBot} />
        )}
      </AnimatePresence>

      <ExitIntentPopup onCTAClick={handleCTAClick} />
    </div>
  );
}
