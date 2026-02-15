import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

// ─── Animation Variants ───
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// ─── Animated Counter Hook ───
export function useAnimatedCounter(end: number, duration = 2000, startOnView = true) {
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
export const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; id?: string; narrow?: boolean }> = ({ children, className = "", id, narrow = false }) => {
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
export const Marker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "bg-yellow-200" }) => (
  <span className="relative inline-block mx-1">
    <span className={`absolute inset-0 ${color} -rotate-1 skew-x-2 rounded-sm -z-10 opacity-70 transform scale-y-90 translate-y-1`}></span>
    <span className="relative font-semibold">{children}</span>
  </span>
);

export const HandwrittenNote: React.FC<{ children: React.ReactNode; rotate?: number; className?: string }> = ({ children, rotate = -2, className = "" }) => (
  <div 
    className={`font-hand text-2xl md:text-3xl text-blue-600 leading-tight transform ${className}`}
    style={{ rotate: `${rotate}deg` }}
  >
    {children}
  </div>
);

export const StickyNote: React.FC<{ children: React.ReactNode; title?: string; color?: string }> = ({ children, title, color = "bg-yellow-100" }) => (
  <div className={`${color} p-6 shadow-md rotate-1 border border-black/5 relative max-w-sm mx-auto my-8 font-hand text-xl text-slate-800`}>
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/5 opacity-20 rotate-1"></div>
    {title && <div className="font-bold text-2xl mb-2 text-red-600 uppercase tracking-widest font-sans">{title}</div>}
    {children}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string; border?: boolean }> = ({ children, className = "", border = true }) => (
  <div className={`bg-white rounded-xl p-6 md:p-10 ${border ? 'border border-slate-200 shadow-sm' : ''} ${className}`}>
    {children}
  </div>
);

// ─── Glowing CTA Button ───
export const GlowCTA: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string; variant?: 'primary' | 'telegram' }> = ({ children, onClick, className = "", variant = 'primary' }) => {
  const isTelegram = variant === 'telegram';
  
  return (
    <div className="relative group inline-flex">
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

export const Divider = () => (
  <div className="flex items-center justify-center py-12 opacity-20">
    <div className="h-px bg-slate-900 w-24"></div>
    <div className="mx-4 text-2xl font-serif">&sect;</div>
    <div className="h-px bg-slate-900 w-24"></div>
  </div>
);

// ─── 3D Tilt Card ───
export const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
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
