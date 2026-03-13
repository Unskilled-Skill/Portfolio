import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { projects } from '../../data/projects';
import { startYear } from '../../data/site';

// ── Derive stats from live project data ───────────────────────────────────────

const totalProjects = projects.length;

// Parse every meta.tools string into individual tool names, deduplicate
const uniqueTechnologies = new Set(
  projects.flatMap((p) =>
    p.meta.tools
      .split(/[,•]/)
      .map((t) => t.trim())
      .filter(Boolean)
  )
).size;

const yearsExperience = new Date().getFullYear() - startYear;

const STATS = [
  { value: totalProjects,       suffix: '',  label: 'Projects'        },
  { value: uniqueTechnologies,  suffix: '+', label: 'Technologies'     },
  { value: yearsExperience,     suffix: '',  label: 'Years Experience' },
];

// ─────────────────────────────────────────────────────────────────────────────

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
      const eased    = 1 - Math.pow(1 - progress, 3);
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
  return (
    <div className="border-y border-white/5 bg-surface/20 py-12">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-16 gap-y-8 px-8">
        {STATS.map(({ value, suffix, label }) => (
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
