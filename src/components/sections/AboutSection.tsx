import { FadeIn } from '../ui/FadeIn';
import { about } from '../../data/site';

export function AboutSection() {
  return (
    <section className="relative py-24 bg-surface/30">
      <div className="mx-auto max-w-3xl px-8 lg:px-16">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              About Me
            </p>
            <h2 className="text-3xl font-thin tracking-tight md:text-4xl">
              Who I Am
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
