import { useMemo } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useProjects, useSiteSettings } from '../../hooks/useSanityContent';

export function StatsSection() {
  const { locale } = useLocale();
  const { projects } = useProjects(locale);
  const { settings } = useSiteSettings(locale);
  const { startYear, ui } = settings;

  const stats = useMemo(() => {
    const uniqueTechnologies = new Set(
      projects.flatMap((project) =>
        project.meta.tools
          .split(/[,•·|]/)
          .map((tool) => tool.trim())
          .filter(Boolean),
      ),
    ).size;

    return [
      { value: projects.length, pad: true, suffix: '', label: ui.statsProjects },
      { value: uniqueTechnologies, pad: false, suffix: '+', label: ui.statsTechnologies },
      { value: new Date().getFullYear() - startYear, pad: true, suffix: '', label: ui.statsYears },
    ];
  }, [projects, startYear, ui.statsProjects, ui.statsTechnologies, ui.statsYears]);

  return (
    <section className="border-y border-white/[0.08] bg-rf-surface">
      <div className="mx-auto flex max-w-shell flex-wrap">
        {stats.map(({ value, pad, suffix, label }, i) => (
          <div
            key={label}
            data-reveal
            className={`flex-[1_1_240px] px-[clamp(24px,4vw,56px)] py-[clamp(40px,6vh,72px)] ${
              i < stats.length - 1 ? 'border-r border-white/[0.08]' : ''
            }`}
          >
            <div className="font-display text-[clamp(52px,7vw,92px)] font-extrabold leading-[0.92] tracking-[-0.04em]">
              <span data-count={value} data-pad={pad ? '1' : undefined}>
                {pad ? '00' : '0'}
              </span>
              {suffix && <span className="text-rf-accent">{suffix}</span>}
            </div>
            <div className="mt-3.5 font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/[0.45]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
