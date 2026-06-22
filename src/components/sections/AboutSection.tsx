import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function AboutSection() {
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { about, ui } = settings;
  const [lede, ...rest] = about.paragraphs;

  return (
    <section id="about" className="bg-rf-bg/[0.62] px-[clamp(20px,5vw,72px)] py-[clamp(72px,12vh,140px)]">
      <div className="mx-auto flex max-w-shell flex-wrap gap-[clamp(40px,6vw,96px)]">
        <div data-reveal className="min-w-[260px] flex-[1_1_300px]">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-accent">
            (02) {ui.aboutLabel}
          </span>
          <h2 data-kinetic className="mt-3.5 font-display text-[clamp(38px,5vw,64px)] font-bold leading-[0.98] tracking-[-0.03em]">
            {ui.aboutTitle}
          </h2>
        </div>

        <div data-reveal className="min-w-[300px] flex-[1_1_460px]">
          {lede && <p className="text-[clamp(18px,1.7vw,22px)] leading-[1.6] text-rf-ink/[0.86]">{lede}</p>}
          {rest.map((text, i) => (
            <p key={i} className="mt-[22px] text-[17px] leading-[1.7] text-rf-ink/[0.6]">
              {text}
            </p>
          ))}
          <p className="mt-[26px] font-mono text-xs tracking-[0.08em] text-rf-ink/[0.38]">{about.institution}</p>

          <div className="mt-9 grid grid-cols-2 gap-px border border-white/[0.08] bg-white/[0.08]">
            {about.coreSkills.map((cell) => (
              <div key={cell.label} className="bg-rf-surface p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rotate-45 bg-rf-accent" />
                  <span className="font-display text-lg font-semibold">{cell.label}</span>
                </div>
                <div className="mt-2.5 font-mono text-xs leading-[1.6] text-rf-ink/50">{cell.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
