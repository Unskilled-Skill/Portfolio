import { Fragment } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function TechStrip() {
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { techStack } = settings;

  if (techStack.length === 0) return null;

  // One seamless lane; rendered twice so the -50% marquee loops without a seam.
  const Lane = () => (
    <div className="flex shrink-0 items-center gap-[clamp(20px,2.6vw,36px)] pr-[clamp(20px,2.6vw,36px)]">
      {techStack.map((tech) => (
        <Fragment key={tech.label}>
          <span className="whitespace-nowrap font-display text-[clamp(16px,1.8vw,22px)] font-semibold text-rf-ink/90">
            {tech.label}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-rf-accent" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="border-y border-white/[0.08] bg-rf-surface">
      <div className="mx-auto flex max-w-shell items-center gap-[clamp(16px,2.4vw,32px)] px-[clamp(20px,5vw,72px)] py-[22px]">
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-rf-ink/[0.34]">Stack</span>
        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div className="flex w-max animate-rf-marquee motion-reduce:animate-none">
            <Lane />
            <Lane />
          </div>
        </div>
      </div>
    </div>
  );
}
