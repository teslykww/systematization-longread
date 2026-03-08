import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  Phone, 
  Target, 
  Activity, 
  Users, 
  ArrowRight, 
  ChevronDown, 
  Clock,
  AlertTriangle,
  Ban,
  Coins,
  MessageSquare,
  Video,
  BarChart3,
  BookOpen, 
  TrendingUp,
  Send,
  MessageCircle,
  CalendarCheck,
  ArrowUp,
  Flame,
  Shield,
  Zap,
  Calculator,
  Frown,
  Smile,
  X,
  Check
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { TypedText } from './ui/SharedComponents';

// ─── Constants ───
const TELEGRAM_BOT_URL = 'https://t.me/teslykww';
const TELEGRAM_CHANNEL_URL = 'https://t.me/teslykww';

// ─── Animation Variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// ─── Animated Counter Hook ───
function useAnimatedCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || !isInView || hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
}

// ─── Animated Section Wrapper ───
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string; narrow?: boolean }> = ({ children, className = "", id, narrow = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={`py-16 md:py-24 px-4 md:px-6 mx-auto ${narrow ? 'max-w-3xl' : 'max-w-5xl'} ${className}`}
    >
      {children}
    </motion.section>
  );
};

// ─── UI Components ───

const Marker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "bg-yellow-200" }) => (
  <span className="relative inline-block mx-1">
    <span className={`absolute inset-0 ${color} -rotate-1 skew-x-2 rounded-sm -z-10 opacity-70 transform scale-y-90 translate-y-1`}></span>
    <span className="relative font-semibold">{children}</span>
  </span>
);

const HandwrittenNote: React.FC<{ children: React.ReactNode; rotate?: number; className?: string }> = ({ children, rotate = -2, className = "" }) => (
  <div 
    className={`font-hand text-2xl md:text-3xl text-blue-600 leading-tight transform ${className}`}
    style={{ rotate: `${rotate}deg` }}
  >
    {children}
  </div>
);

const StickyNote: React.FC<{ children: React.ReactNode; title?: string; color?: string }> = ({ children, title, color = "bg-yellow-100" }) => (
  <div className={`${color} p-6 shadow-md rotate-1 border border-black/5 relative max-w-sm mx-auto my-8 font-hand text-xl text-slate-800`}>
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/5 opacity-20 rotate-1"></div>
    {title && <div className="font-bold text-2xl mb-2 text-red-600 uppercase tracking-widest font-sans">{title}</div>}
    {children}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; border?: boolean }> = ({ children, className = "", border = true }) => (
  <div className={`bg-white rounded-xl p-6 md:p-10 ${border ? 'border border-slate-200 shadow-sm' : ''} ${className}`}>
    {children}
  </div>
);

// ─── Glowing CTA Button ───
const GlowCTA: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; variant?: 'primary' | 'telegram' }> = ({ children, onClick, className = "", variant = 'primary' }) => {
  const isTelegram = variant === 'telegram';
  
  return (
    <div className="relative group inline-flex">
      {/* Animated glow ring */}
      <div className={`absolute -inset-1 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 ${isTelegram ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'} animate-gradient bg-[length:200%_auto]`}></div>
      <button 
        onClick={onClick}
        className={`
          relative font-bold font-mono py-4 px-8 
          transition-all duration-200 text-lg md:text-xl w-full md:w-auto 
          flex items-center justify-center gap-3 uppercase tracking-tight
          transform active:scale-[0.96] hover:scale-[1.02]
          ${isTelegram 
            ? 'bg-telegram hover:bg-telegram-dark text-white rounded-xl' 
            : 'bg-slate-900 text-white border-2 border-slate-900 shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]'
          }
          ${className}
        `}
      >
        {children}
      </button>
    </div>
  );
};

const Divider = () => (
  <div className="flex items-center justify-center py-12 opacity-20">
    <div className="h-px bg-slate-900 w-24"></div>
    <div className="mx-4 text-2xl font-serif">&sect;</div>
    <div className="h-px bg-slate-900 w-24"></div>
  </div>
);

// ─── 3D Tilt Card ───
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ─── Niche Stream ───
const NicheStream = () => {
  const row1 = [
    "Веб-дизайн", "Детская одежда", "Интернет-магазины", "Клининг", "Консалтинг",
    "Мебель", "Логистика", "Стройматериалы", "Кейтеринг", "Онлайн-школы",
    "Производство", "Фитнес", "Автосервис", "Салоны красоты", "Опт",
  ];
  const row2 = [
    "Рестораны и кафе", "Ремонт квартир", "Стоматология", "Типография", "Текстиль",
    "Застройщики", "Кондитерские", "Косметика", "Лизинг", "Металл",
    "Организация мероприятий", "Продукты питания", "Риелторы", "Оптика", "Печать",
  ];
  const row3 = [
    "IT-услуги", "E-commerce", "Маркетинг", "Юридические услуги", "Бурение скважин",
    "Строительство ИЖС", "Сантехника", "Фото и видео", "Учебные центры", "Туризм",
    "Розница", "Дизайн интерьера", "Продажа оборудования", "Переезды", "Покрытия",
  ];
  const row4 = [
    "Парикмахерские", "Онлайн кассы", "Утилизация", "Сувениры", "Нетрадиционная медицина",
    "Кредиты и займы", "Инженерные системы", "Заводы", "Голографическое оборудование", "Лицензирование",
    "Одежда", "Оптовое производство", "Техническое обслуживание", "Продажа расходников", "Переводы",
  ];

  const rows = [
    { items: row1, speed: 35, direction: "normal" },
    { items: row2, speed: 45, direction: "reverse" },
    { items: row3, speed: 38, direction: "normal" },
    { items: row4, speed: 50, direction: "reverse" },
  ];

  return (
    <div className="relative py-16 md:py-20 bg-slate-900 -mx-4 md:-mx-6 overflow-hidden">
      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]"></div>

      {/* Heading */}
      <div className="text-center mb-10 px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-black text-white font-serif mb-2">С 2017 года — более 300 клиентов из этих сфер</h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto">Специфики не существует. Если есть сотрудники и клиенты — система работает</p>
      </div>

      {/* Streaming rows */}
      <div className="space-y-3 relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

        {rows.map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div
              className="flex gap-3 whitespace-nowrap"
              style={{
                animation: `marquee ${row.speed}s linear infinite ${row.direction}`,
              }}
            >
              {[...row.items, ...row.items].map((niche, ni) => (
                <span
                  key={ni}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shrink-0 border transition-colors duration-300 bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-300 cursor-default backdrop-blur-sm"
                >
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

// ─── Interactive Calculator ───
const HourCalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [hours, setHours] = useState('');
  const [showResult, setShowResult] = useState(false);
  
  const revenueNum = parseInt(revenue.replace(/\D/g, '')) || 0;
  const hoursNum = parseInt(hours) || 60;
  const hourCost = hoursNum > 0 ? Math.round(revenueNum / (hoursNum * 4.33)) : 0;
  const monthlyLoss = Math.round(revenueNum * 0.3);
  const yearlyLoss = monthlyLoss * 12;

  const formatNum = (n: number) => n.toLocaleString('ru-RU');
  
  const handleCalc = () => {
    if (revenueNum > 0) setShowResult(true);
  };
  
  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-hard max-w-2xl mx-auto">
      <div className="bg-slate-900 text-white p-5 flex items-center gap-3">
        <Calculator className="w-6 h-6 text-yellow-400" />
        <h3 className="font-bold font-mono text-lg uppercase tracking-wide">Калькулятор: Сколько стоит твой час?</h3>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Выручка в месяц (&#8381;)</label>
            <input 
              type="text"
              value={revenue}
              onChange={(e) => { setRevenue(e.target.value); setShowResult(false); }}
              placeholder="1 500 000"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-lg transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-500 mb-2 font-bold">Часов работаешь в неделю</label>
            <input 
              type="text"
              value={hours}
              onChange={(e) => { setHours(e.target.value); setShowResult(false); }}
              placeholder="60"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-lg transition-colors"
            />
          </div>
        </div>
        
        <button 
          onClick={handleCalc}
          className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors font-mono uppercase tracking-wide flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 text-yellow-400" />
          Посчитать
        </button>

        <AnimatePresence>
          {showResult && revenueNum > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <div className="text-xs font-mono text-blue-600 uppercase mb-1 font-bold">Стоимость твоего часа:</div>
                  <div className="text-4xl font-black text-blue-700">{formatNum(hourCost)} &#8381;/час</div>
                  <div className="text-sm text-slate-600 mt-1">Каждый раз, когда ты чинишь принтер или сам отвечаешь клиенту — ты платишь {formatNum(hourCost)}&#8381; за работу, которая стоит 300&#8381;/час.</div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="text-xs font-mono text-red-600 uppercase mb-1 font-bold">Ты теряешь из-за хаоса (30%):</div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-3xl font-black text-red-600">{formatNum(monthlyLoss)}</div>
                      <div className="text-xs text-slate-500">в месяц</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-red-600">{formatNum(yearlyLoss)}</div>
                      <div className="text-xs text-slate-500">в год</div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <div className="text-sm text-slate-600 mb-3">Стоимость Рентгена: <strong className="text-green-600 text-lg">0 &#8381;</strong></div>
                  <GlowCTA onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} variant="telegram" className="mx-auto">
                    <Send size={20} />
                    Вернуть эти деньги
                  </GlowCTA>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Before/After Comparison ───
const ComparisonTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const items = [
    { icon: "☀️", aspect: "Утро", before: "Проверяешь 50 сообщений, тушишь пожары", after: "Открываешь дашборд. Видишь просадку. Тегаешь РОПа. Через 15 минут — план решения. Ты спокоен" },
    { icon: "📋", aspect: "Задачи", before: "Всё через тебя: ты «узкое горлышко»", after: "Сотрудники не несут тебе проблемы — они приносят варианты решений. Ты только акцептуешь" },
    { icon: "💰", aspect: "Деньги", before: "Выручка есть, прибыли нет — где деньги?", after: "P&L ежедневно, маржа под контролем. Знаешь цифры до рубля" },
    { icon: "🌙", aspect: "Вечер", before: "Работаешь до 22:00, телефон не молчит", after: "17:00 — ноутбук закрыт, едешь к семье. Телефон молчит, потому что система работает" },
    { icon: "✈️", aspect: "Отпуск", before: "Невозможен. Без тебя всё рухнет", after: "Улетел на 2 недели. Бизнес не вырос в x10, но и не развалился. Вернулся в работающий офис" },
  ];
  
  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      {/* Two-column card layout */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative">
        
        {/* LEFT: Dispatcher */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white rounded-2xl border border-red-200 overflow-hidden shadow-sm h-full">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 text-center">
              <Frown className="w-8 h-8 mx-auto mb-2 text-white/80" />
              <div className="text-white font-black text-xl font-serif uppercase tracking-wide">Ты — Диспетчер</div>
              <div className="text-red-100 text-xs mt-1">Как ты живёшь сейчас</div>
            </div>
            <div className="p-1">
              {items.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 ${i < items.length - 1 ? 'border-b border-red-50' : ''}`}>
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-0.5">{item.aspect}</div>
                    <div className="text-sm text-slate-600 flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                      <span>{item.before}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CENTER: Arrow connector (desktop) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl whitespace-nowrap">
            → 90 дней →
          </div>
        </div>

        {/* RIGHT: Architect */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-sm opacity-20"></div>
          <div className="relative bg-white rounded-2xl border border-green-200 overflow-hidden shadow-sm h-full">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-center">
              <Smile className="w-8 h-8 mx-auto mb-2 text-white/80" />
              <div className="text-white font-black text-xl font-serif uppercase tracking-wide">Ты — Архитектор</div>
              <div className="text-green-100 text-xs mt-1">Как будет через 90 дней</div>
            </div>
            <div className="p-1">
              {items.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 ${i < items.length - 1 ? 'border-b border-green-50' : ''}`}>
                  <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-0.5">{item.aspect}</div>
                    <div className="text-sm text-slate-600 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Visual Components ───

const TelegramMockup = () => {
  const messages = [
    { from: "РОП (Олег)", avatar: "О", avatarBg: "bg-blue-500", msg: "Влад, клиент требует возврат, орет благим матом! Что делать?? Ты где?", time: "22:30" },
    { from: "Склад", avatar: "С", avatarBg: "bg-green-500", msg: "Машина не приехала, грузчики уходят. Решай срочно.", time: "22:35" },
    { from: "Жена \u2764\uFE0F", avatar: "\u2764\uFE0F", avatarBg: "bg-pink-400", msg: "Ты обещал сегодня без телефона...\nУжин остыл.", time: "22:41" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto md:mr-0 rotate-1 hover:rotate-0 transition-transform duration-500 border border-slate-200/80">
      {/* ── Telegram Header ── */}
      <div className="bg-[#517da2] px-4 py-3 flex items-center gap-3">
        <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">В</div>
        <div className="flex-1">
          <div className="text-white font-semibold text-sm leading-tight">Рабочие чаты</div>
          <div className="text-white/60 text-[11px]">5 пропущенных</div>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="bg-[#e8f0f8] text-center py-1.5">
        <span className="text-[11px] text-[#517da2] font-medium bg-white/60 rounded-full px-3 py-0.5">Суббота, 22:43</span>
      </div>

      {/* ── Chat area (Telegram wallpaper) ── */}
      <div className="p-3 space-y-3" style={{ backgroundColor: "#c8d9e6", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23aec4d4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        
        {/* ── Missed calls indicator ── */}
        <div className="flex justify-center mb-1">
          <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-3 py-0.5 shadow-sm">5 пропущенных вызовов</span>
        </div>

        {messages.map((m, i) => (
          <div key={i} className="flex items-end gap-2">
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full ${m.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}>
              {m.avatar}
            </div>
            {/* Bubble */}
            <div className="relative bg-white rounded-xl rounded-bl-sm shadow-sm max-w-[85%] px-3 pt-1.5 pb-4">
              {/* Tail */}
              <div className="absolute -left-1.5 bottom-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
              <div className="text-[12px] font-semibold mb-0.5" style={{ color: i === 0 ? "#3b82f6" : i === 1 ? "#22c55e" : "#ec4899" }}>{m.from}</div>
              <p className="text-[13px] leading-snug text-slate-900 whitespace-pre-line pr-12">{m.msg}</p>
              <span className="absolute bottom-1.5 right-2.5 text-[10px] text-slate-400">{m.time}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator for stress effect */}
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">Б</div>
          <div className="relative bg-white rounded-xl rounded-bl-sm shadow-sm px-4 py-3">
            <div className="absolute -left-1.5 bottom-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
            <div className="text-[12px] font-semibold text-orange-500 mb-1">Бухгалтер</div>
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              <span className="text-[11px] text-slate-400 ml-1 italic">печатает...</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Input bar ── */}
      <div className="bg-white border-t border-slate-200 px-3 py-2.5 flex items-center gap-2">
        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
        <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-[12px] text-slate-400">Сообщение...</div>
        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
        <div className="w-10 h-10 rounded-full bg-[#517da2] flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
        </div>
      </div>
    </div>
  );
};

const RealisticDashboard = () => (
  <div className="bg-white border border-slate-300 rounded-lg shadow-lg overflow-hidden text-[10px] font-mono select-none">
     <div className="bg-slate-100 p-2 border-b border-slate-200 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
        <div className="ml-auto text-slate-400">План_Факт_2026.xlsx</div>
     </div>
     <div className="p-4 grid grid-cols-4 gap-4 bg-white">
        <div className="font-bold text-slate-400">Показатель</div>
        <div className="font-bold text-slate-400">План</div>
        <div className="font-bold text-slate-400">Факт</div>
        <div className="font-bold text-slate-400">%</div>
        <div className="col-span-4 h-px bg-slate-100 my-1"></div>
        {[
          { label: "Лиды (шт)", plan: "150", fact: "182", pct: "121%", factColor: "text-green-600", pctBg: "bg-green-100 text-green-800" },
          { label: "Выручка", plan: "1.2M", fact: "0.8M", pct: "66%", factColor: "text-red-500", pctBg: "bg-red-100 text-red-800" },
          { label: "Маржа", plan: "35%", fact: "31%", pct: "88%", factColor: "text-yellow-600", pctBg: "bg-yellow-100 text-yellow-800" },
          { label: "NPS", plan: "9.0", fact: "9.2", pct: "OK", factColor: "text-green-600", pctBg: "bg-green-100 text-green-800" },
        ].map((r, i) => (
          <React.Fragment key={i}>
            <div>{r.label}</div>
            <div className="blur-[2px] bg-slate-100 w-8">{r.plan}</div>
            <div className={`blur-[2px] font-bold ${r.factColor}`}>{r.fact}</div>
            <div className={`${r.pctBg} px-1 rounded w-min`}>{r.pct}</div>
          </React.Fragment>
        ))}
     </div>
     <div className="bg-slate-50 p-2 text-center text-slate-400 italic border-t border-slate-200">
        Данные реального клиента (скрыты)
     </div>
  </div>
);

// ─── Content Components ───

const IntroHook = () => (
  <div className="grid md:grid-cols-5 gap-12 items-center">
    <div className="md:col-span-3 prose prose-lg prose-slate relative">
      <div className="hidden md:block absolute -left-48 top-0 w-40 text-right">
        <HandwrittenNote rotate={-5}>
          Жиза? <br/>
          <span className="text-4xl">&#10549;</span>
        </HandwrittenNote>
      </div>
      
      <p className="text-2xl md:text-3xl font-serif text-slate-900 leading-relaxed mb-8 font-bold">
        Знаешь, какой самый страшный момент для собственника, который только пробил свой первый миллион?
      </p>
      <p>Это не кассовый разрыв. И даже не письмо из налоговой.</p>
      <p className="font-semibold bg-slate-100 p-2 inline-block -rotate-1 shadow-sm border border-slate-200">
        Это суббота. Вечер. Ты в ресторане с семьей.
      </p>
      <p className="mt-6">
        Ты физически здесь: ешь стейк, улыбаешься жене, киваешь ребенку. Но телефон лежит на столе. И ты на него косишься.
      </p>
      <p>Внутри тебя сжата пружина. Ты знаешь: если он сейчас завибрирует — значит, там <em>пожар</em>.</p>
      <ul className="list-none space-y-3 pl-6 border-l-4 border-red-200 my-8 italic text-slate-700 bg-red-50/30 py-4 rounded-r-lg">
        <li className="flex items-start gap-2"><span>&#129324;</span> Клиент требует тебя лично, потому что менеджер &laquo;мэкает&raquo;.</li>
        <li className="flex items-start gap-2"><span>&#128666;</span> Машина не приехала, грузчики бухают, склад встал.</li>
        <li className="flex items-start gap-2"><span>&#128293;</span> Прилетела задача, которую без твоего &laquo;ОК&raquo; никто не решит.</li>
      </ul>
      <p>Ты бежал к деньгам, чтобы стать свободным. А в итоге построил тюрьму, где ты — и начальник, и надзиратель, и заключённый.</p>
    </div>
    
    <div className="md:col-span-2 relative">
       <HandwrittenNote className="absolute -top-10 -right-4 md:-right-10 z-10 rotate-12">Твоя личка в сб:</HandwrittenNote>
       <TelegramMockup />
       <div className="mt-8 text-center md:text-right">
         <p className="font-medium text-slate-900 text-sm italic opacity-80">
           Это не бизнес. Это высокооплачиваемая <br/><span className="underline decoration-red-400 decoration-wavy">работа в аду</span>.
         </p>
       </div>
    </div>
  </div>
);

const WarningFilter = () => (
  <div className="relative my-16">
    <div className="bg-white border-y-2 md:border-2 border-slate-900 md:rounded-xl p-8 md:p-12 shadow-sm relative z-10">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 uppercase font-bold tracking-widest text-sm shadow-lg transform -rotate-1">Фейс-контроль</div>
      <h2 className="text-3xl font-black text-center mb-10 font-serif">Давай сразу на берегу.</h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="flex items-center gap-3 text-xl font-bold text-red-500 mb-6 uppercase tracking-wide"><XCircle className="w-6 h-6" /> Не трать время, если:</h3>
          <ul className="space-y-4 font-medium text-slate-500">
            {["У тебя стартап/идея, и нет продаж. (Рано).", "Ищешь «успешный успех», медитации и потоки.", "Ты убеждён, что «никто не сделает лучше меня»."].map((t, i) => (
              <li key={i} className="flex gap-3"><span className="font-hand text-2xl text-red-300 leading-none mt-1">x</span><span>{t}</span></li>
            ))}
          </ul>
        </div>
        <div className="relative pl-0 md:pl-12 md:border-l border-slate-200">
          <h3 className="flex items-center gap-3 text-xl font-bold text-green-700 mb-6 uppercase tracking-wide"><CheckCircle2 className="w-6 h-6" /> Тебе сюда, если:</h3>
          <div className="bg-green-50/50 p-6 -mx-4 rounded-xl mb-4 border border-green-100">
             <div className="font-mono text-xs text-green-800 uppercase mb-3 font-bold tracking-wider">Твоя ситуация:</div>
             <ul className="space-y-4 text-lg font-medium text-slate-900">
                {[
                  <>Доход <Marker color="bg-green-200">500к — 3 млн+</Marker></>,
                  "Команда есть, а толку нет (все жрут твоё время).",
                  "Ты — «Узкое горлышко»: заболеешь — бизнес встанет."
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 shrink-0" /><span>{t}</span>
                  </li>
                ))}
             </ul>
          </div>
          <div className="absolute -right-4 top-0 md:-right-10 md:top-10"><HandwrittenNote rotate={15}>Узнал?</HandwrittenNote></div>
        </div>
      </div>
    </div>
  </div>
);

const WhaleCard: React.FC<{ number: string; title: string; desc: React.ReactNode; visual: React.ReactNode; color: string }> = ({ number, title, desc, visual, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={scaleIn}>
      <TiltCard className="group relative bg-white border border-slate-200 rounded-2xl p-6 md:p-10 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1.5 ${color}`}></div>
        <div className="absolute -right-10 -top-10 text-9xl font-black text-slate-50 opacity-50 select-none group-hover:scale-110 transition-transform duration-500">{number}</div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4">
                 <span className={`text-transparent bg-clip-text bg-gradient-to-r ${color === 'bg-blue-500' ? 'from-blue-600 to-cyan-500' : color === 'bg-purple-500' ? 'from-purple-600 to-pink-500' : 'from-emerald-600 to-teal-500'}`}>{title}</span>
              </h3>
              <div className="text-slate-600 text-lg leading-relaxed mb-6">{desc}</div>
            </div>
            <div className="md:w-72 shrink-0">{visual}</div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Dispatcher Quiz ───
const DispatcherQuiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    "Можешь ли ты уехать в отпуск на 2 недели без телефона?",
    "Твои сотрудники приходят к тебе с решениями (а не с проблемами)?",
    "Ты знаешь свою чистую прибыль за прошлый месяц с точностью до рубля?",
    "Есть ли у тебя еженедельные планёрки с измеримыми KPI?",
    "Если ты заболеешь на месяц — бизнес продолжит расти?",
  ];

  const handleAnswer = (isYes: boolean) => {
    const newScore = score + (isYes ? 0 : 1);
    if (step < questions.length - 1) {
      setScore(newScore);
      setStep(s => s + 1);
    } else {
      setScore(newScore);
      setShowResult(true);
    }
  };

  const reset = () => { setStep(0); setScore(0); setShowResult(false); };

  const goToBotQuiz = () => window.open(TELEGRAM_BOT_URL, '_blank');

  if (showResult) {
    const level = score >= 4 ? 'critical' : score >= 2 ? 'warning' : 'ok';
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-hard">
        <div className={`p-6 text-center text-white ${level === 'critical' ? 'bg-red-600' : level === 'warning' ? 'bg-orange-500' : 'bg-green-600'}`}>
          <div className="text-5xl mb-2">{level === 'critical' ? '🚨' : level === 'warning' ? '⚠️' : '✅'}</div>
          <div className="text-2xl font-black font-serif">
            {level === 'critical' ? 'Ты — Диспетчер' : level === 'warning' ? 'Ты на грани' : 'Ты на верном пути'}
          </div>
          <div className="text-sm opacity-80 mt-1">{score} из 5 — признаки ручного управления</div>
        </div>
        <div className="p-6 text-center">
          <p className="text-slate-700 mb-6">
            {level === 'critical'
              ? 'Твой бизнес полностью завязан на тебе. Без тебя он остановится. Скачай PDF — он покажет, с чего начать.'
              : level === 'warning'
              ? 'Часть процессов уже работает, но ключевые решения всё ещё через тебя. PDF покажет, где именно ты теряешь.'
              : 'У тебя хорошая база. PDF поможет найти скрытые точки роста и ускорить масштабирование.'}
          </p>
          <GlowCTA onClick={goToBotQuiz} variant="telegram" className="mx-auto mb-4">
            <Send size={18} /> Скачать PDF бесплатно
          </GlowCTA>
          <div className="text-[11px] text-slate-400 mb-4">Придёт в Telegram мгновенно</div>
          <button onClick={reset} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Пройти ещё раз</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-hard">
      <div className="bg-slate-900 text-white p-5 flex items-center gap-3">
        <Target className="w-6 h-6 text-yellow-400" />
        <h3 className="font-bold font-mono text-lg uppercase tracking-wide">Тест: Ты Диспетчер или Архитектор?</h3>
      </div>
      <div className="p-6 md:p-8">
        {/* Progress */}
        <div className="flex gap-1.5 mb-6">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-blue-500' : i === step ? 'bg-slate-900' : 'bg-slate-200'}`} />
          ))}
        </div>
        <div className="text-xs font-mono text-slate-400 mb-3">Вопрос {step + 1} из {questions.length}</div>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-xl md:text-2xl font-bold text-slate-900 font-serif mb-8 min-h-[3em]"
          >
            {questions[step]}
          </motion.p>
        </AnimatePresence>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleAnswer(true)} className="py-4 px-6 bg-green-50 border-2 border-green-200 rounded-xl font-bold text-green-700 hover:bg-green-100 hover:border-green-400 transition-all text-lg active:scale-95">
            Да ✓
          </button>
          <button onClick={() => handleAnswer(false)} className="py-4 px-6 bg-red-50 border-2 border-red-200 rounded-xl font-bold text-red-700 hover:bg-red-100 hover:border-red-400 transition-all text-lg active:scale-95">
            Нет ✗
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Exit Intent Popup ───
const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    // Desktop: cursor leaves viewport top
    const handleMouse = (e: MouseEvent) => {
      if (e.clientY < 10 && !dismissed) setShow(true);
    };
    // Also trigger after 60s of inactivity scroll-up on mobile
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY < lastScrollY - 300 && window.scrollY > 500) {
          setShow(true);
        }
        lastScrollY = window.scrollY;
      }, 150);
    };
    document.addEventListener('mouseleave', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseleave', handleMouse);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [dismissed]);

  const close = () => { setShow(false); setDismissed(true); };
  const goToBot = () => { window.open(TELEGRAM_BOT_URL, '_blank'); close(); };

  if (!show || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={close}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-slate-900"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={close} className="absolute top-3 right-3 z-10 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
            <div className="text-4xl mb-2">📖</div>
            <h3 className="text-2xl font-black font-serif">Подожди!</h3>
            <p className="text-white/80 text-sm mt-1">Забери подарок перед уходом</p>
          </div>
          <div className="p-6 text-center">
            <h4 className="text-xl font-bold text-slate-900 mb-2">PDF-гид<br/>&laquo;Выкупи Своё Время&raquo;</h4>
            <p className="text-slate-600 text-sm mb-6">29 страниц. Формула стоимости часа, протокол делегирования, чек-лист выхода из операционки.</p>
            <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto w-full">
              <Send size={18} /> Скачать PDF бесплатно
            </GlowCTA>
            <button onClick={close} className="mt-4 text-xs text-slate-400 hover:text-slate-600 transition-colors">Нет, спасибо</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
  useEffect(() => {
    const ids = ['problem', 'method', 'cases', 'offer', 'form'];
    const onScroll = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return (
    <nav className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-6 z-40 flex-col gap-3">
      {[
        { id: 'problem', label: 'Проблема' }, { id: 'method', label: 'Метод' },
        { id: 'cases', label: 'Кейсы' }, { id: 'offer', label: 'Оффер' }, { id: 'form', label: 'Записаться' },
      ].map(item => (
        <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`text-[10px] uppercase tracking-widest font-mono px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${active === item.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/80 backdrop-blur-sm text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-900'}`}
        >{item.label}</button>
      ))}
    </nav>
  );
};

// ═══════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const goToBot = () => window.open(TELEGRAM_BOT_URL, '_blank');

  const [showAllCases, setShowAllCases] = useState(false);

  // Animated counters for hero
  const counter200 = useAnimatedCounter(200, 1800);
  const counter47 = useAnimatedCounter(47, 1500);
  const counter94 = useAnimatedCounter(94, 1600);

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden selection:bg-yellow-300">
      {/* Progress Bar */}
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
              Лонгрид &bull; Время чтения: 10 минут
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight mb-8 font-serif">
              ВЫРУЧКА РАСТЁТ,<br/>
              <span className="relative inline-block text-blue-600 px-2 mt-2">
                <span className="absolute inset-0 bg-blue-100 -skew-x-6 rounded-md -z-10 opacity-50"></span>
                А ТЫ — НЕТ?
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto md:mx-0 leading-relaxed mb-8">
              Как перестать быть{' '}
              <span className="font-hand text-3xl text-red-500 mx-1 font-bold">
                <TypedText texts={["самым дорогим грузчиком", "главным диспетчером", "узким горлышком", "пожарной командой"]} />
              </span>
              {' '}в своём бизнесе.
            </motion.p>

            {/* Animated Social Proof Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-12">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-2">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-green-200 text-sm font-bold text-slate-800 flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span><strong ref={counter200.ref} className="text-green-700 tabular-nums">{counter200.count}+</strong> бизнесов</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-blue-200 text-sm font-bold text-slate-800 flex items-center gap-2 shadow-sm">
                  <span>Рост прибыли: <strong ref={counter47.ref} className="text-blue-700 tabular-nums">+{counter47.count}%</strong></span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-purple-200 text-sm font-bold text-slate-800 flex items-center gap-2 shadow-sm">
                  <span>NPS: <strong ref={counter94.ref} className="text-purple-700 tabular-nums">{(counter94.count / 10).toFixed(1)}/10</strong></span>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono text-center md:text-left">Среднее по клиентам 2023–2025</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex flex-col items-center md:items-start gap-2">
              <GlowCTA onClick={goToBot} variant="telegram">
                <Send size={20} /> Скачать PDF бесплатно
              </GlowCTA>
              <div className="text-[11px] text-slate-400 font-mono text-center md:text-left">Придёт в Telegram мгновенно — 29 страниц</div>
              <button onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group mt-2">
                <span className="uppercase tracking-widest">Начать чтение</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="w-full md:w-[420px] relative">
             <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-20 transform translate-x-4 translate-y-4"></div>
             <img src="/images/vlad-hero.png" alt="Влад Теслюк — Архитектор Бизнеса" className="w-full h-auto rounded-2xl shadow-hard border-2 border-slate-900 relative z-10 bg-slate-200 object-cover aspect-[3/4]" loading="eager" />
             <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-lg shadow-lg border border-slate-200 rotate-[-2deg]">
                <div className="text-xs font-mono uppercase text-slate-400 mb-1">Метод</div>
                <div className="font-serif font-bold text-slate-900 text-lg">Архитектор&trade;</div>
             </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ═══ INTRO HOOK ═══ */}
      <AnimatedSection><IntroHook /></AnimatedSection>

      {/* ═══ PROBLEM: DISPATCHER ═══ */}
      <AnimatedSection id="problem">
        <div className="text-center mb-16 relative">
          <HandwrittenNote className="absolute -top-8 left-1/2 -translate-x-1/2 text-slate-400 rotate-2">Правда глаза колет?</HandwrittenNote>
          <div className="inline-block border border-slate-900 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4">Блок 1: Проблема</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-serif leading-tight">
            Ты не Бизнесмен. <br/>Ты — <span className="bg-slate-900 text-white px-4">Диспетчер.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mt-6">Ты целый день &laquo;тушил пожары&raquo;, но не сделал ни одной задачи, которая реально ведёт к деньгам. Узнаёшь себя?</p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid md:grid-cols-2 gap-6">
          {[
            { icon: <Phone className="w-6 h-6" />, title: "Сценарий: Справочное бюро", desc: "Твои менеджеры работают «передатчиками». Клиент спросил — они прибежали к тебе. Ты ответил — они передали. Ты платишь им зарплату, а работаешь за них." },
            { icon: <Target className="w-6 h-6" />, title: "Сценарий: Галлюцинации", desc: "Вы ставите план 10 млн. Делаете 4 млн. Команда разводит руками: «Ну, не сезон, рынок стоит». И им нормально. А кассовый разрыв закрываешь ты." },
            { icon: <Activity className="w-6 h-6" />, title: "Сценарий: Контрабанда задач", desc: "Ты хотел заниматься стратегией, но в 11 утра сломался принтер/сайт/клиент, и ты побежал тушить. Очнулся в 22:00. Суеты на миллион, денег — ноль." },
            { icon: <Users className="w-6 h-6" />, title: "Сценарий: Инвалидная коляска", desc: "Пока ты толкаешь бизнес — он едет. Убрал руки (уехал в отпуск) — он катится назад и давит тебя. Ты не можешь просто выключить телефон." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <TiltCard className="bg-white p-8 rounded-xl border-2 border-slate-100 hover:border-slate-900 transition-colors group cursor-default h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2 font-serif">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <StickyNote title="ФАКТ" color="bg-red-50">
          Если ты ничего не изменишь, через год ты будешь там же. Только ещё более уставшим и больным.<br/><br/>
          Модель управления <span className="font-bold underline">&laquo;На личном героизме&raquo;</span> СЛОМАЛАСЬ.
        </StickyNote>

        {/* Mini-CTA after Problem */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-3">Узнал себя? Скачай PDF — покажем, как это починить</p>
          <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto">
            <Send size={18} /> Скачать PDF бесплатно
          </GlowCTA>
        </div>
      </AnimatedSection>

      {/* ═══ THE LIE ═══ */}
      <AnimatedSection narrow>
        <div className="border-l-4 border-slate-900 pl-8 py-4">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Блок 2: Ловушка</div>
          <h2 className="text-3xl font-black font-serif mb-6">Почему ты упёрся в потолок?</h2>
          <p className="text-lg text-slate-700 mb-6">Ты думаешь: <span className="italic font-bold bg-yellow-100 px-1">&laquo;Мне просто нужно больше лидов и нанять ещё пару менеджеров&raquo;.</span></p>
          <div className="text-4xl font-black text-red-500 font-serif mb-6">ЭТО ЛОЖЬ.</div>
          <p className="text-lg text-slate-700 leading-relaxed">Если ты зальёшь больше лидов в хаос, ты получишь <strong>МАСШТАБИРОВАННЫЙ ХАОС</strong>.</p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg my-6 text-sm text-slate-700">
            <strong className="text-red-700">Реальный пример:</strong> Один из моих клиентов залил +50% лидов в отдел без регламентов. Результат? Маржа упала на 20%, 3 менеджера уволились за месяц, а он сам попал в больницу с нервным срывом.
          </div>
          <p className="text-lg text-slate-700 leading-relaxed">Тебе не нужно &laquo;больше работать&raquo;. Тебе нужно сменить роль. Сменить &laquo;Героизм&raquo; на &laquo;Архитектуру&raquo;.</p>
        </div>
      </AnimatedSection>

      {/* ═══ WARNING FILTER ═══ */}
      <AnimatedSection><WarningFilter /></AnimatedSection>

      {/* ═══ INTERACTIVE CALCULATOR ═══ */}
      <AnimatedSection narrow>
        <HourCalculator />
      </AnimatedSection>

      {/* ═══ COMPARISON TABLE ═══ */}
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black font-serif mb-4">Два варианта твоего будущего</h2>
          <p className="text-slate-500 text-lg">Какой выберешь?</p>
        </div>
        <ComparisonTable />

        {/* Mini-CTA after Comparison */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-3">Хочешь перейти от Диспетчера к Архитектору?</p>
          <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto">
            <Send size={18} /> Скачать PDF бесплатно
          </GlowCTA>
        </div>
      </AnimatedSection>

      <Divider />

      {/* ═══ 3 WHALES ═══ */}
      <AnimatedSection id="method">
        <div className="text-center mb-16">
          <div className="inline-block border border-slate-900 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4">Блок 3: Методология</div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 font-serif">Хватит бежать. <br/>Начни строить.</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Тебе не нужны &laquo;сильные ноги&raquo;. Тебе нужен подъёмный кран. Это <strong>Инженерная Система Выкупа Времени</strong>.</p>
        </div>

        <div className="space-y-12">
          <WhaleCard color="bg-blue-500" number="01" title="Факты vs Галлюцинации"
            desc={<>Мы внедряем <Marker color="bg-blue-100">P&L и Дашборд</Marker>. Одна таблица, 7 цифр. Ты перестаёшь спрашивать &laquo;Ну как там дела?&raquo;. Ты открываешь файл и видишь правду.<br/><br/>Если цифра красная — мы лечим конкретную точку.</>}
            visual={<div className="transform rotate-1 transition-transform hover:rotate-0 duration-300"><div className="text-xs font-bold text-slate-500 mb-2 text-center">ПРИМЕР ДАШБОРДА</div><RealisticDashboard /></div>}
          />
          <WhaleCard color="bg-purple-500" number="02" title="Ритм и Дисциплина"
            desc={<>Почему задачи делаются месяцами? Потому что нет ритма. Мы ставим <Marker color="bg-purple-100">Недельные Спринты</Marker>.<br/><br/><strong>Понедельник:</strong> План (Гипотеза). <strong>Пятница:</strong> Факт (Деньги). В этой системе нельзя &laquo;спрятаться&raquo;.</>}
            visual={<div className="bg-white p-4 rounded-lg border-2 border-purple-100 flex flex-col justify-center h-full relative overflow-hidden"><div className="absolute top-0 right-0 p-8 bg-purple-500 rounded-bl-full opacity-10"></div><div className="mb-2 text-xs font-bold text-purple-600 uppercase">Гипотеза недели</div><div className="text-sm font-medium mb-3">&laquo;Если добавим кнопку WhatsApp, конверсия вырастет на 15%&raquo;</div><div className="space-y-1 text-xs"><div className="flex justify-between"><span className="text-slate-500">Бюджет:</span><span className="font-bold">0 руб.</span></div><div className="flex justify-between"><span className="text-slate-500">Срок:</span><span className="font-bold">5 дней</span></div></div><div className="mt-3 bg-green-100 text-green-800 text-center text-xs font-bold py-1 rounded">СРАБОТАЛО: +23%</div></div>}
          />
          <WhaleCard color="bg-emerald-500" number="03" title="Бизнес по Любви"
            desc={<>Мы делаем ABC-анализ и находим клиентов-террористов, которые жрут 80% твоего времени и дают 5% денег.<br/><br/><Marker color="bg-red-100">Мы их увольняем.</Marker> Высвобождаем ресурсы под тех, кто платит много и с улыбкой.</>}
            visual={<div className="h-full flex flex-col justify-center"><div className="grid grid-cols-2 gap-2 text-center text-xs"><div className="bg-emerald-50 border border-emerald-200 p-2 rounded"><div className="text-emerald-800 font-bold mb-1">Сегмент А</div><div className="text-slate-500">Застройщики</div><div className="font-bold mt-1 text-emerald-600">PROFIT 80%</div></div><div className="bg-red-50 border border-red-200 p-2 rounded opacity-50 relative"><div className="absolute inset-0 flex items-center justify-center"><XCircle className="text-red-500 w-8 h-8 opacity-80" /></div><div className="text-red-800 font-bold mb-1">Сегмент С</div><div className="text-slate-500">Нестандарт</div><div className="font-bold mt-1 text-red-600">HELL 100%</div></div></div></div>}
          />
        </div>
      </AnimatedSection>

      {/* ═══ ORIGIN STORY ═══ */}
      <div className="bg-slate-100 border-y border-slate-200 overflow-hidden">
        {/* Big hero photo with overlay */}
        <div className="relative w-full h-[360px] md:h-[480px]">
          <img src="/images/vlad-summit.png" alt="Влад Теслюк на Global Innovation Summit 2024" className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/40 to-transparent"></div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm border border-slate-200">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Global Innovation Summit 2024</span>
            </div>
          </div>
        </div>

        <AnimatedSection narrow className="!pt-8 !pb-16">
          <h2 className="text-3xl md:text-4xl font-black font-serif mb-4 text-center">Кто такой Влад Теслюк?</h2>
          <p className="text-xl text-slate-600 text-center mb-10 max-w-2xl mx-auto">Знаешь, почему я так точно вижу &laquo;тромбы&raquo; в твоих процессах?</p>
          
          <div className="prose prose-slate prose-lg mx-auto">
            <p><strong>Потому что я прошёл этот путь своими ногами.</strong></p>
            <p>За моими плечами — 8 лет управления собственной IT-компанией (Digital-интегратор). Я был управляющим партнёром в мебельном производстве, сейчас развиваю проекты в недвижимости. Я знаю бизнес на всех уровнях: от написания кода и пыли в цеху до стратегий в советах директоров.</p>
            <p>Я сам нанимал, увольнял, терял деньги и строил отделы продаж. И я знаю, каково это — когда вся махина держится на твоей личной энергии.</p>
            <p className="font-semibold text-slate-800">Моя точка пересборки случилась в 2021-м.</p>
          </div>

          <div className="my-10 bg-white border-l-4 border-blue-500 rounded-r-xl p-6 md:p-8 shadow-md max-w-2xl mx-auto relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg">&ldquo;</div>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">Я в больнице под капельницей. Организм просто выключил рубильник. И моя первая мысль была не &laquo;как там бизнес?&raquo;, а:</p>
            <p className="text-2xl font-black text-slate-900 mt-3">&laquo;Кайф, я наконец-то высплюсь&raquo;.</p>
          </div>

          <div className="prose prose-slate prose-lg mx-auto">
            <p>В тот момент я осознал: я построил не компанию, а высокооплачиваемую ловушку. Если я из неё выпадаю — всё замирает.</p>
            <p className="font-bold text-slate-900 text-lg">Что я предлагаю тебе сейчас?</p>
            <p>Я не буду ставить на тебе эксперименты. Я дам тебе Систему, которую мы внедрили уже более 300 раз.</p>
            <p>Эти инструменты работают безотказно в любом масштабе:</p>
            <ul className="space-y-2 my-4">
              <li>Мы ставили их в небольших командах с выручкой <strong>3 млн рублей</strong>.</li>
              <li>Мы внедряли их в корпорациях с оборотом <strong>5 миллиардов</strong>.</li>
            </ul>
            <p>Здесь нет теории. Каждый шаблон, каждая таблица и каждый регламент отточены на сотнях реальных кейсов. Моя задача как Архитектора — взять этот опыт и построить фундамент, на котором твой бизнес будет расти без твоего участия 24/7.</p>
            <p className="text-slate-700 font-medium">Чтобы в субботу вечером ты не проверял чаты, а точно знал: система работает, цифры в норме, ты — свободен.</p>
          </div>

          <div className="mt-10 bg-slate-900 text-white rounded-xl p-6 max-w-2xl mx-auto text-center">
            <div className="text-xs font-mono uppercase text-slate-300 mb-3 tracking-widest">Система проверена</div>
            <div className="grid grid-cols-2 gap-6">
              <div><div className="text-3xl font-black">300+</div><div className="text-sm text-slate-300">внедрений</div></div>
              <div><div className="text-3xl font-black">3 млн — 5 млрд</div><div className="text-sm text-slate-300">масштаб бизнесов</div></div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ═══ CASES ═══ */}
      <AnimatedSection id="cases">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">Блок 4: Практика</div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 font-serif">8 кейсов из разных ниш</h2>
          <p className="text-slate-500 text-lg">&laquo;Влад, у меня специфика...&raquo; — Специфики нет. Есть кривые процессы.</p>
        </div>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="grid md:grid-cols-2 gap-6">
          {[
            { 
              photo: "/images/case-mikhail.png?v=3", tag: "Производство", name: "Михаил", sub: "Мебельная фабрика",
              quote: "Я сегодня впервые ушёл с работы в 18:00. Я в шоке, что так можно было.",
              stats: [{ val: "14ч → 6ч", label: "Операционка" }, { val: "+52%", label: "Выручка" }],
              pain: "Собственник = главный грузчик и технолог. 14ч/день в цеху, команда без ответственности.",
              lever: "Посчитали: час Михаила на станке стоит 5 000₽, а наёмного мастера — 400₽. Он «воровал» деньги у своей семьи, работая руками.",
              fix: "Нанял начальника производства. Вышел из цеха в офис. Выручка +52%, потому что начал заниматься продажами, а не распилом."
            },
            { 
              photo: "/images/case-alexandr.png?v=5", tag: "Интегратор CRM", name: "Александр", sub: "B2B-услуги",
              quote: "Воронка продаж наконец работает без меня. CRM стала инструментом, а не могилой для лидов.",
              stats: [{ val: "+40%", label: "Конверсия" }, { val: "12 ч/нед", label: "Освободил" }],
              pain: "Внедрял CRM, но менеджеры не использовали. Лиды терялись. Воронка — чёрный ящик.",
              lever: "Пересобрали процессы под CRM. Регламенты + контроль заполнения. Лиды перестали выпадать между этапами.",
              fix: "Воронка стала прозрачной. Видим, где теряем. Конверсия +40%, 12 часов в неделю ушло с ручного контроля."
            },
            { 
              photo: "/images/case-mariya.png?v=4", tag: "Юридические услуги", name: "Мария", sub: "Юрист",
              quote: "Перестала быть единственным узким местом. Клиенты получают ответы в срок.",
              stats: [{ val: "x2", label: "Пропускная способность" }, { val: "+35%", label: "Выручка" }],
              pain: "Всё через Марию. Клиенты ждут. Нет стандартизации. Каждое дело — уникальный процесс.",
              lever: "Выделили типовые процессы. Шаблоны, чек-листы. Часть задач передали ассистенту.",
              fix: "Стандартизировали 70% задач. Мария занимается сложными кейсами. Пропускная способность x2."
            },
            { 
              photo: "/images/case-sergey.png?v=2", tag: "Системы отопления", name: "Сергей", sub: "Системы отопления и инженерии",
              quote: "Чистыми, потому что перестали брать убыточные объекты ради оборота.",
              stats: [{ val: "+1.2 млн", label: "Чист. прибыль" }, { val: "100%", label: "Прозрачность" }],
              pain: "Кассовые разрывы. Строили ради оборота. Объекты тянули друг друга.",
              lever: "Платёжный календарь. Запретили тратить деньги новых заказов на старые объекты.",
              fix: "+1.2 млн чистыми. Фокус на маржинальных объектах. Финансы прозрачны."
            },
            { 
              photo: "/images/case-yulya.png?v=4", tag: "Образование", name: "Юля", sub: "Школа английского и китайского для детей",
              quote: "Мы просто перестали делать то, что не приносит денег. Сфокусировались на сильных продуктах.",
              stats: [{ val: "+2 млн/год", label: "Прибыль" }, { val: "x3", label: "ROI рекламы" }],
              pain: "Распыление на много направлений. Низкая маржа. Реклама на неликвид.",
              lever: "ABC-анализ: 30% продуктов давали 80% прибыли. Убрали убыточные направления.",
              fix: "Фокус на английском и китайском. Маржа выросла. +2 млн/год при том же бюджете."
            },
            { 
              photo: "/images/case-maksim.png?v=2", tag: "IT-компания", name: "Максим", sub: "CEO",
              quote: "Боялся увольнять, а стало только лучше.",
              stats: [{ val: "-18 млн", label: "Расходы ФОТ" }, { val: "+10%", label: "Эффективность" }],
              pain: "Раздутый штат. Дублирование функций. Половина команды имитирует деятельность.",
              lever: "Провели аттестацию: 6 из 14 сотрудников не могли объяснить, за что им платят. Максим боялся увольнять — а выяснилось, что без них стало быстрее.",
              fix: "Новая оргструктура + автоматизация рутины. -18 млн расходов, +10% скорости."
            },
            { 
              photo: "/images/case-anastasia.png?v=6", tag: "SMM-агентство", name: "Анастасия", sub: "Founder",
              quote: "Я уехала на 6 недель, а чаты молчат. Всё работает. Раньше не верила в это.",
              stats: [{ val: "0 → 6 нед.", label: "Отпуска" }, { val: "Автоном", label: "Команда" }],
              pain: "Бизнес завязан на личности. Страх делегировать. Пожары в чатах 24/7.",
              lever: "Записали на видео каждый процесс — от брифа до сдачи. Получился «цифровой клон» Анастасии. Менеджеры перестали ждать её решений.",
              fix: "Регламенты (SOP) + система контроля качества + бизнес-ассистент. Анастасия впервые за 4 года уехала в отпуск."
            },
            { 
              photo: "/images/case-dmitriy.png?v=5", tag: "Маркетинговое агентство", name: "Дмитрий", sub: "CEO",
              quote: "Наконец-то понял, куда двигать компанию. Появилась энергия.",
              stats: [{ val: "+50%", label: "LTV клиентов" }, { val: "x2", label: "Средний чек" }],
              pain: "Упёрся в потолок. Хаотичные продажи. Выгорание от текучки и микроменеджмента.",
              lever: "Собрали продуктовую линейку из 3 пакетов вместо «делаем всё под запрос». Клиенты стали покупать дороже, потому что видели чёткую ценность.",
              fix: "Аккаунт-менеджер + скрипты. LTV +50%, средний чек x2."
            },
          ].map((c, i) => {
            // On mobile: show first 3, rest hidden unless "showAll"
            const hiddenOnMobile = i >= 3 && !showAllCases ? 'hidden md:block' : '';
            return (
              <motion.div key={i} variants={fadeUp} className={hiddenOnMobile}>
                <TiltCard className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-900 hover:shadow-lg transition-all overflow-hidden h-full relative group">
                  {/* Big photo */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img src={c.photo} alt={c.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono uppercase text-slate-600">{c.tag}</div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-bold text-xl text-white font-serif leading-tight drop-shadow-lg">{c.name}</h3>
                      <div className="text-xs text-white/80">{c.sub}</div>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Quote */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-4 border-l-4 border-blue-400 relative">
                      <p className="text-sm text-slate-700 italic leading-snug">&laquo;{c.quote}&raquo;</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {c.stats.map((s, j) => (
                        <div key={j} className="bg-green-50 border border-green-100 rounded-lg p-2.5 text-center">
                          <div className="text-xl font-black text-green-700 leading-none">{s.val}</div>
                          <div className="text-[10px] text-slate-500 uppercase mt-1">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pain → Lever → Fix */}
                    <div className="space-y-2 text-xs">
                      <div className="flex gap-2">
                        <div className="w-1 shrink-0 bg-red-300 rounded-full"></div>
                        <div><span className="font-bold text-red-700">Боль:</span> <span className="text-slate-600">{c.pain}</span></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1 shrink-0 bg-yellow-400 rounded-full"></div>
                        <div><span className="font-bold text-yellow-700">Рычаг:</span> <span className="text-slate-600 italic">{c.lever}</span></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1 shrink-0 bg-green-400 rounded-full"></div>
                        <div><span className="font-bold text-green-700">Итог:</span> <span className="text-slate-600">{c.fix}</span></div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}

          {/* Mobile: show more button */}
          {!showAllCases && (
            <div className="md:hidden col-span-full text-center py-2">
              <button
                onClick={() => setShowAllCases(true)}
                className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto text-sm"
              >
                Показать все 8 кейсов <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4 text-sm">Хочешь такой же результат? Начни с PDF</p>
          <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto">
            <Send size={18} /> Скачать PDF бесплатно
          </GlowCTA>
        </div>
      </AnimatedSection>

      {/* ═══ NICHE STREAM ═══ */}
      <NicheStream />

      {/* ═══ QUIZ ═══ */}
      <AnimatedSection narrow>
        <DispatcherQuiz />
      </AnimatedSection>

      {/* ═══ URGENCY ═══ */}
      <AnimatedSection>
        <div className="bg-red-50 p-8 md:p-12 rounded-2xl border border-red-100 text-center relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 text-9xl text-red-100 opacity-40 rotate-12 pointer-events-none select-none">&#8381;</div>
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 relative z-10" />
          <h2 className="text-3xl font-bold font-serif mb-4 relative z-10">Каждая неделя промедления стоит тебе денег</h2>
          <div className="max-w-2xl mx-auto relative z-10">
            <p className="text-lg text-slate-700 mb-6">Пока ты читаешь этот текст, ты продолжаешь платить полную стоимость своего часа за работу, которая стоит 300&#8381;/час.<br/><br/>Посчитай: если твой час стоит 5 000&#8381;, а ты тратишь 20 часов в неделю на диспетчерские задачи — <strong className="text-red-600">ты теряешь 400 000&#8381; каждый месяц</strong>.</p>
            <div className="bg-white/80 border border-red-200 rounded-xl p-4 mb-6">
              <div className="text-sm text-slate-600">За 12 месяцев промедления ты потеряешь</div>
              <div className="text-4xl font-black text-red-600 my-1">4 800 000 &#8381;</div>
              <div className="text-xs text-slate-400">Стоимость разбора: 0 &#8381;</div>
            </div>
            <div className="text-red-600 font-bold font-hand text-2xl rotate-1">Вопрос не &laquo;нужна ли мне Система?&raquo;<br/>Вопрос — &laquo;сколько я ещё готов платить за хаос?&raquo;</div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ OFFER ═══ */}
      <AnimatedSection id="offer" narrow>
        <div className="relative">
          <div className="bg-[#fefce8] border-2 border-slate-900 p-8 md:p-12 shadow-hard relative overflow-hidden">
            <div className="absolute top-0 bottom-0 -left-2 w-4 ticket-edge border-r-2 border-slate-900"></div>
            <div className="ml-6 md:ml-0 text-center relative z-10">
              <div className="inline-block bg-red-500 text-white px-4 py-1 font-bold uppercase tracking-widest text-sm transform -rotate-2 mb-6 shadow-sm">Бесплатно — осталось мест: 3 из 5 на этой неделе</div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-serif">Скачай PDF + <br/><span className="text-blue-600 italic">запишись на бесплатный Рентген</span></h2>
              <p className="text-lg text-slate-600 mb-4 max-w-lg mx-auto">Сначала — PDF-гид (29 стр.) прямо в Telegram.<br/>Потом — 60 минут разбора, где найдём <span className="font-bold">3 точки утечки прибыли.</span></p>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
                <div className="font-mono text-xs uppercase text-blue-600 mb-3 font-bold">Ты получишь на руки:</div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    ["Рентген:", "3-5 конкретных «тромбов», которые сжирают твоё время"],
                    ["Roadmap:", "Пошаговый план на 90 дней"],
                    ["Первый шаг:", "3 действия на эту неделю"],
                  ].map(([b, t], i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /><span><strong>{b}</strong> {t}</span></li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6 mb-8 relative overflow-hidden text-left shadow-sm">
                <div className="absolute -top-4 -right-4 text-slate-900 opacity-5 rotate-12"><BookOpen size={140} /></div>
                <div className="relative z-10">
                  <div className="text-sm font-mono uppercase text-orange-600 mb-2 font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>Что внутри PDF:</div>
                  <h4 className="text-2xl font-black text-slate-900 mb-2 leading-tight">&laquo;Выкупи Своё Время&raquo;</h4>
                  <p className="text-sm text-slate-600 mb-5">29 страниц. <strong>Инженерный инструмент</strong> для выхода из операционки.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: <Clock size={16}/>, title: "Аудит Времени", sub: "Формула расчёта стоимости часа" },
                      { icon: <MessageSquare size={16}/>, title: "Протокол «1-3-1»", sub: "Сотрудники с решениями, не проблемами" },
                      { icon: <Video size={16}/>, title: "Метод Камкордера", sub: "Цифровой клон (база знаний)" },
                      { icon: <TrendingUp size={16}/>, title: "Лестница Замещения", sub: "Кого нанимать первым" },
                    ].map((b, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-orange-200 shadow-sm flex items-start gap-3">
                        <div className="bg-orange-100 p-1.5 rounded text-orange-700 mt-0.5">{b.icon}</div>
                        <div><div className="font-bold text-sm text-slate-900">{b.title}</div><div className="text-[11px] text-slate-500 leading-tight">{b.sub}</div></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 italic flex items-center gap-2 bg-white/50 p-2 rounded-lg w-fit"><CheckCircle2 className="w-4 h-4 text-green-600" /><span>Придёт в Telegram сразу</span></div>
                </div>
              </div>

              <div className="mb-8 bg-white/50 p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-center gap-2 mb-3"><Coins className="text-slate-400" /><span className="text-slate-500 font-bold line-through text-lg decoration-red-500 decoration-2">30.000 — 50.000 &#8381;</span></div>
                <div className="text-3xl font-black text-green-600 uppercase mb-2">Бесплатно</div>
                <p className="text-slate-600 text-sm">Провожу 5 разборов в неделю, чтобы показать, как работает система. Понравится — обсудим дальше. Нет — уйдёшь с готовым планом.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-8 text-left text-sm text-slate-700">
                <p className="font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-slate-500"/> Важно: разбор — для действующих бизнесов</p>
                <p className="mt-1 text-slate-500">Если у тебя пока только идея без выручки — тебе рано. Вернись, когда будут первые клиенты и команда.</p>
              </div>

              <GlowCTA onClick={goToBot} variant="telegram" className="w-full md:w-auto mx-auto text-lg py-4 px-10">
                <Send size={20} /> Скачать PDF бесплатно
              </GlowCTA>
              <div className="text-[11px] text-slate-400 mt-3 text-center">Придёт в Telegram мгновенно. Там же — запись на разбор.</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ BOT GATEWAY — «Единое окно» ═══ */}
      <AnimatedSection id="form" narrow className="!pt-8">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-900 rounded-2xl p-8 md:p-12 shadow-hard overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-telegram rounded-bl-full opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 rounded-tr-full opacity-10"></div>
            <div className="relative z-10">
              {/* Heading */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-4"><MessageCircle size={14} /> Как это работает?</div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 font-serif leading-tight mb-3">Одна кнопка — всё в Telegram</h3>
                <p className="text-lg text-slate-500 max-w-lg mx-auto">Никаких регистраций, форм и звонков от менеджеров.<br/>Всё происходит в одном окне.</p>
              </div>

              {/* 3 Steps — vertical timeline */}
              <div className="max-w-lg mx-auto mb-10 relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 hidden md:block"></div>
                {[
                  { n: "1", icon: <BookOpen size={22}/>, color: "bg-blue-600", title: "Скачиваешь PDF", sub: "«Выкупи Своё Время» — 29 страниц. Придёт мгновенно, прямо в чат." },
                  { n: "2", icon: <CalendarCheck size={22}/>, color: "bg-purple-600", title: "Выбираешь слот для разбора", sub: "Если готов — прямо в боте открывается календарь. Выбери удобное время." },
                  { n: "3", icon: <MessageCircle size={22}/>, color: "bg-green-600", title: "Есть вопросы? Напиши или запиши голосовое", sub: "Я живой человек, а не воронка. Можешь задать вопрос, и я отвечу лично." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4 mb-6 last:mb-0 items-start">
                    <div className={`${s.color} text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold shadow-lg relative z-10`}>
                      {s.icon}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 group hover:border-slate-400 transition-colors">
                      <div className="text-xs font-mono text-slate-400 mb-1">Шаг {s.n}</div>
                      <div className="font-bold text-slate-900 mb-1 leading-tight">{s.title}</div>
                      <div className="text-sm text-slate-500 leading-relaxed">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto text-xl py-5 px-12 rounded-xl">
                  <Send size={24} /> СКАЧАТЬ PDF БЕСПЛАТНО
                </GlowCTA>
                <div className="mt-3 text-[11px] text-slate-400 font-mono">Придёт в Telegram мгновенно — 29 страниц</div>
              </div>
              
              <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500">
                {[
                  { icon: <Shield className="w-4 h-4 text-green-600" />, text: "Без спама" },
                  { icon: <CheckCircle2 className="w-4 h-4 text-green-600" />, text: "Отписка в 1 клик" },
                  { icon: <Flame className="w-4 h-4 text-green-600" />, text: "0\u20BD — Бесплатно" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1">{t.icon}<span>{t.text}</span></div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <img src="/images/vlad-podcast.png" alt="Влад Теслюк" className="w-12 h-12 rounded-full border-2 border-slate-200 object-cover" loading="lazy" />
                <div className="text-left"><div className="font-bold text-slate-900 text-sm">Влад Теслюк</div><div className="text-xs text-slate-500">Лично отвечу в течение 24 часов</div></div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ FAQ ═══ */}
      <AnimatedSection narrow>
        <h2 className="text-3xl font-bold font-serif text-center mb-12">&laquo;Влад, а что если...&raquo;</h2>
        <div className="space-y-4">
          {[
            { q: "У меня нет времени, я работаю 24/7", a: "Понимаю. Я сам так говорил 4 года подряд. Но вот парадокс: «Нет времени починить колесо, потому что слишком занят толканием телеги». Система не требует времени — она его возвращает. Первые 5 часов ты выкупишь уже после первой недели." },
            { q: "У меня специфика (Стройка/Логистика/Опт)", a: "Знаю это чувство — кажется, что твоя ниша особенная. Но деньги везде считаются одинаково. В моей базе 300+ клиентов из 60+ ниш. Принципы управления универсальны. Если есть сотрудники и клиенты — это сработает." },
            { q: "Я попробую сам по книжкам/YouTube", a: "Уважаю. Я и сам так начинал. Потратил 50 миллионов рублей на ошибки и 4 года жизни. Вопрос — сколько стоит твой год? Если дороже 0 — выгоднее взять готовую систему и сэкономить себе этот путь." },
            { q: "А вдруг не поможет?", a: "Абсолютно справедливый вопрос. Рентген — это диагностика, не операция. Если бизнес не готов, я честно скажу: «Тебе рано, вот что нужно сделать сначала». Я не беру тех, кому не могу дать результат — мне это невыгодно." },
            { q: "Найму бизнес-ассистента, и станет легче", a: "Не станет. Станет хуже. Если ты делегируешь хаос — ты получаешь масштабированный хаос. Ассистент в бардаке превращается в твою «вторую маму» или курьера. Ты будешь тратить 3 часа в день, чтобы объяснить ему, что делать. Сначала строим рельсы (систему), потом ставим на них вагончик (ассистента). Иначе он сойдёт с ума и уволится через месяц." }
          ].map((faq, i) => (
            <details key={i} className="group bg-white border border-slate-200 rounded-lg open:border-slate-900 open:shadow-md transition-all">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-medium text-slate-900"><span className="text-lg font-bold">{faq.q}</span><span className="transition group-open:rotate-180 shrink-0 ml-4"><ChevronDown /></span></summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </AnimatedSection>

      {/* ═══ CONCLUSION ═══ */}
      <AnimatedSection narrow>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-serif mb-6">Представь себя через 90 дней</h2>
          <div className="prose prose-lg prose-slate mx-auto">
            <p>Пятница, 17:00. Цифры зелёные. РОП пишет: &laquo;План выполнен на 112%&raquo;. Телефон не вибрирует. Ты закрываешь ноутбук и едешь к семье.</p>
            <p className="font-bold text-xl mt-8">Это не мечта. Это результат Системы.</p>
            <p>Ты либо строишь Систему, либо работаешь в ней разнорабочим до конца жизни.</p>
          </div>
          <div className="mt-8">
            <GlowCTA onClick={goToBot} variant="telegram" className="mx-auto text-xl py-5 px-10 rounded-xl"><Send size={22} /> Скачать PDF бесплатно</GlowCTA>
            <div className="mt-3 text-xs text-slate-400">Придёт в Telegram мгновенно. Там же — запись на разбор.</div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 text-center border-t-8 border-blue-600">
        <div className="max-w-2xl mx-auto">
          <p className="mb-6 font-serif text-xl text-slate-200 italic">&laquo;Хаос не исчезает сам по себе. Его можно только структурировать.&raquo;</p>
          <div className="h-px bg-slate-800 w-24 mx-auto my-8"></div>
          <div className="flex justify-center gap-6 mb-6">
            <button onClick={goToBot} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"><Send size={14} /> Скачать PDF</button>
            <button onClick={() => window.open(TELEGRAM_CHANNEL_URL, '_blank')} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"><MessageCircle size={14} /> Telegram-канал</button>
          </div>
          <p className="text-sm opacity-50 mb-4">P.S. Я физически не могу проводить больше 5 разборов в неделю.</p>
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} Влад Теслюк. Никакой магии, дыхания маткой и денежных потоков. Только скучная инженерная система, которая приносит деньги.</p>
        </div>
      </footer>

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 p-3 glass border-t border-slate-200 md:hidden z-40">
        <button onClick={goToBot} className="w-full bg-telegram text-white font-bold py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2 text-base active:scale-[0.97] transition-transform"><Send size={18} /> Скачать PDF бесплатно</button>
      </div>

      {/* ═══ EXIT INTENT POPUP ═══ */}
      <ExitIntentPopup />
    </div>
  );
}
