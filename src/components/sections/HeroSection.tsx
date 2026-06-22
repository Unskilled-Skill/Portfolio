import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function HeroSection() {
  const { scrollTo } = useSmoothScroll();
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, roles, about, startYear, ui } = settings;

  const [firstName, ...rest] = identity.name.split(' ');
  const lastName = rest.join(' ');

  // Derive the hero meta values from existing CMS content; labels are CMS-editable.
  const institutionParts = about.institution.split('·').map((s) => s.trim());
  const meta = [
    { label: ui.metaRole, value: institutionParts[0] ?? '' },
    { label: ui.metaStudying, value: institutionParts[1] ?? '' },
    { label: ui.metaFocus, value: roles.slice(0, 3).join(' · ') },
  ].filter((m) => m.value);

  const labelMono = 'font-mono text-[11px] uppercase tracking-[0.16em] text-rf-ink/[0.34]';

  return (
    <section id="top" className="relative px-[clamp(20px,5vw,72px)] pb-[clamp(40px,7vh,80px)] pt-[clamp(96px,11vh,148px)]">
      <div className="relative z-[1] mx-auto max-w-shell">
        {/* status bar */}
        <div
          data-reveal
          className="mb-[clamp(36px,6vh,64px)] flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-[22px]"
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/[0.62]">
            <span className="h-2 w-2 rounded-full bg-rf-accent shadow-[0_0_0_4px_rgba(228,76,101,0.18)]" />
            {ui.available}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/[0.34]">
            {ui.heroLocation} · {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex flex-wrap items-start gap-[clamp(32px,5vw,72px)]">
          <div className="min-w-0 flex-[1_1_480px]">
            <div data-reveal>
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-rf-accent">
                {roles.join(' · ')}
              </span>
              <h1
                data-hero-title
                className="mt-[18px] font-display text-[clamp(56px,9.5vw,140px)] font-extrabold leading-[0.9] tracking-[-0.035em] text-rf-ink"
              >
                {firstName}
                <br />
                {lastName}
                <span data-secret className="text-rf-accent">.</span>
              </h1>
            </div>

            <p data-reveal className="mt-7 max-w-[46ch] text-[clamp(16px,1.4vw,19px)] leading-[1.65] text-rf-ink/[0.62]">
              {identity.tagline}
            </p>

            {meta.length > 0 && (
              <div data-reveal className="mt-8 flex max-w-[560px] flex-col gap-2.5 border-y border-white/[0.08] py-5">
                {meta.map((m) => (
                  <div key={m.label} className="flex items-baseline gap-4">
                    <span className={`${labelMono} min-w-[78px]`}>{m.label}</span>
                    <span className="text-[15px] text-rf-ink/[0.82]">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div data-reveal className="mt-[30px] flex flex-wrap gap-3.5">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2.5 bg-rf-accent px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-rf-accentHover"
              >
                {ui.viewProjects} →
              </button>
              <a
                href={identity.cvPath}
                download
                className="inline-flex items-center gap-2.5 border border-white/[0.16] px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink/[0.85] transition-colors hover:border-rf-accent hover:text-white"
              >
                {ui.downloadCv} ↓
              </a>
            </div>
          </div>

          {/* framed photo */}
          <div data-reveal className="min-w-[240px] max-w-[380px] flex-[1_1_300px]">
            <div className="relative border border-white/10 bg-rf-surface2">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-rf-accent" />
              <img
                src={identity.avatar}
                alt={identity.name}
                className="block h-[clamp(380px,46vh,470px)] w-full object-cover object-[center_top]"
                style={{ filter: 'contrast(1.03) saturate(1.02)' }}
              />
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-rf-ink/50">{identity.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-rf-accent">EST. {startYear}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
