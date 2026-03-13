import { Code, Box, Eye, Lightbulb, type LucideIcon } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';
import { TechBadges } from '../ui/TechBadges';
import { about } from '../../data/site';

const iconMap: Record<string, LucideIcon> = { Code, Box, Eye, Lightbulb };

export function AboutSection() {
  return (
    <section className="relative py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              About Me
            </p>
            <h2 className="text-3xl font-thin tracking-tight md:text-4xl">
              Who I Am
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn direction="left" delay={100}>
            <div className="space-y-5">
              {about.paragraphs.map((text, i) => (
                <p key={i} className="text-base font-light leading-relaxed text-white/75">
                  {text}
                </p>
              ))}
              <p className="text-sm font-light text-white/40">{about.institution}</p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {about.coreSkills.map(({ icon, label, detail }) => {
                const Icon = iconMap[icon];
                return (
                  <div
                    key={label}
                    className="group rounded-xl border border-white/5 bg-surface/60 p-5 transition-all duration-300 hover:border-accent/30 hover:bg-surface"
                  >
                    {Icon && (
                      <Icon
                        size={22}
                        className="mb-3 text-accent transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <h3 className="mb-1 text-sm font-normal text-white">{label}</h3>
                    <p className="text-xs font-light text-white/45">{detail}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={150}>
          <TechBadges />
        </FadeIn>
      </div>
    </section>
  );
}
