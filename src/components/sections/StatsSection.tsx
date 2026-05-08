import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { useLocale } from '../../hooks/useLocale';
import { useProjects, useSiteSettings } from '../../hooks/useSanityContent';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const { locale } = useLocale();
  const { projects } = useProjects(locale);
  const { settings } = useSiteSettings(locale);
  const { startYear, ui } = settings;

  const stats = useMemo(() => {
    const uniqueTechnologies = new Set(
      projects.flatMap((project) =>
        project.meta.tools
          .split(/[,•]/)
          .map((tool) => tool.trim())
          .filter(Boolean),
      ),
    ).size;

    return [
      { value: projects.length, suffix: '', label: ui.statsProjects },
      { value: uniqueTechnologies, suffix: '+', label: ui.statsTechnologies },
      { value: new Date().getFullYear() - startYear, suffix: '', label: ui.statsYears },
    ];
  }, [projects, startYear, ui.statsProjects, ui.statsTechnologies, ui.statsYears]);

  return (
    <div className="border-y border-white/5 bg-surface/20 py-12">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-16 gap-y-8 px-8">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl font-bold text-white">
              <Counter target={value} suffix={suffix} />
            </span>
            <span className="text-xs font-light uppercase tracking-[0.2em] text-white/35">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
