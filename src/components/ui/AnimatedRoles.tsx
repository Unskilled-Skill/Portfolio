import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.5 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 280, damping: 22 },
  },
};

export function AnimatedRoles() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const roles = settings.roles;

  // Cycle the active highlight every 2.4s (skip when reduced-motion preferred)
  useEffect(() => {
    if (shouldReduceMotion || roles.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, [roles.length, shouldReduceMotion]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
    >
      {roles.map((role, i) => (
        <motion.span
          key={role}
          variants={item}
          className="relative flex flex-col items-center gap-1.5"
        >
          {/* Role label */}
          <span
            className={`font-mono text-sm uppercase tracking-[0.2em] transition-colors duration-500 ${
              activeIndex === i ? 'text-white' : 'text-white/45'
            }`}
          >
            {role}
          </span>

          {/* Sliding underline — shared layoutId moves it between roles */}
          <span className="relative h-px w-full">
            {activeIndex === i && (
              <motion.span
                layoutId="role-underline"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {/* Dim baseline always visible */}
            <span className="absolute inset-0 rounded-full bg-white/8" />
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
}
