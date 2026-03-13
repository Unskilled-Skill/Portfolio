import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../../types';
import { ProjectGrid } from '../ui/ProjectGrid';
import { FadeIn } from '../ui/FadeIn';
import { MagneticButton } from '../ui/MagneticButton';

interface ProjectSpotlightProps {
  project: Project;
  direction: 'left' | 'right';
  bgClass?: string;
}

export function ProjectSpotlight({ project, direction, bgClass = '' }: ProjectSpotlightProps) {
  const contentFadeDirection = direction === 'right' ? 'left' : 'right';

  const contentBlock = (
    <FadeIn direction={contentFadeDirection} delay={100}>
    <div className="flex flex-col justify-center space-y-5 px-10 py-16 lg:px-16 xl:px-20">
      <div>
        <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
          {project.subtitle}
        </p>
        <h3 className="text-3xl font-thin tracking-tight md:text-4xl">
          {project.title}
        </h3>
      </div>

      <p className="font-light leading-relaxed text-white/65">
        {project.overview}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.highlights.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-light text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <div>
        <MagneticButton>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-light text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark hover:shadow-accent/40 hover:gap-3"
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </MagneticButton>
      </div>
    </div>
    </FadeIn>
  );

  const gridBlock = (
    <div className="absolute inset-0">
      <ProjectGrid images={project.gallery} fillHeight />
    </div>
  );

  // Grid is always first in the DOM so on mobile it always appears above the content.
  // On desktop, CSS order swaps it left/right based on direction.
  return (
    <section
      id={project.slug}
      className={`overflow-hidden ${bgClass}`}
    >
      <div className="flex flex-col md:flex-row md:min-h-[620px]">
        <div className={`relative w-full min-h-[320px] md:min-h-0 md:w-[55%] ${direction === 'left' ? 'md:order-2' : 'md:order-1'}`}>
          {gridBlock}
        </div>
        <div className={`flex w-full flex-col justify-center md:w-[45%] ${direction === 'left' ? 'md:order-1' : 'md:order-2'}`}>
          {contentBlock}
        </div>
      </div>
    </section>
  );
}
