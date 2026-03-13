import { skills } from '../../data/skills';
import { SkillCard } from '../ui/SkillCard';
import { FadeIn } from '../ui/FadeIn';

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">
        <FadeIn direction="up">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
              Expertise
            </p>
            <h2 className="text-3xl font-thin tracking-tight md:text-4xl">
              Core Skills
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {skills.map((skill, i) => (
            <FadeIn key={skill.label} direction="up" delay={i * 100}>
              <SkillCard skill={skill} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
