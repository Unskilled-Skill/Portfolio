import { FadeIn } from '../ui/FadeIn';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function AboutSection() {
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { about, ui } = settings;

  return (
    <section className="relative py-24 bg-surface/30">
      <div className="mx-auto max-w-3xl px-8 lg:px-16">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              {ui.whoIAm}
            </p>
            <h2 className="text-3xl font-thin tracking-tight md:text-4xl">
              {ui.whoIAm}
            </h2>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={100}>
          <div className="space-y-5">
            {about.paragraphs.map((text, i) => (
              <p key={i} className="text-base font-light leading-relaxed text-white/75">
                {text}
              </p>
            ))}
            <p className="text-sm font-light text-white/40">{about.institution}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
