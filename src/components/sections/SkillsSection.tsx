import { useLocale } from '../../hooks/useLocale';
import { useSkills, useSiteSettings } from '../../hooks/useSanityContent';

export function SkillsSection() {
  const { locale } = useLocale();
  const { skills } = useSkills(locale);
  const { settings } = useSiteSettings(locale);
  const { techStack, ui } = settings;

  return (
    <section id="skills" className="bg-rf-bg/[0.62] px-[clamp(20px,5vw,72px)] pb-[clamp(72px,12vh,140px)] pt-[clamp(20px,3vh,40px)]">
      <div className="mx-auto max-w-shell">
        <div data-reveal className="mb-[clamp(36px,5vh,56px)]">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-accent">(03) {ui.expertise}</span>
          <h2 data-kinetic className="mt-3.5 font-display text-[clamp(38px,5vw,64px)] font-bold leading-[0.98] tracking-[-0.03em]">
            {ui.whatIDo}
          </h2>
        </div>

        <div data-reveal className="border-t border-white/[0.08]">
          {skills.map((skill, i) => (
            <div
              key={skill.label}
              className="flex flex-wrap items-baseline gap-x-[clamp(16px,3vw,48px)] gap-y-2 border-b border-white/[0.08] py-[clamp(24px,3.5vh,38px)] transition-colors hover:bg-rf-accent/[0.04]"
            >
              <span className="w-10 font-mono text-[13px] text-rf-ink/[0.34]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="flex-[1_1_240px] font-display text-[clamp(24px,2.6vw,34px)] font-semibold tracking-[-0.02em]">
                {skill.label}
              </h3>
              <p className="m-0 max-w-[46ch] flex-[1_1_300px] font-mono text-[13px] leading-[1.7] text-rf-ink/[0.55]">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-6 flex flex-wrap gap-2.5">
          {techStack.map((tech) => (
            <span
              key={tech.label}
              className="border border-white/[0.14] px-3.5 py-2 font-mono text-xs tracking-[0.06em] text-rf-ink/70"
            >
              {tech.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
