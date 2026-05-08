import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '../hooks/useSanityContent';
import { FadeIn } from '../components/ui/FadeIn';

export function ProjectsPage() {
  const { projects } = useProjects();
  const sorted = [...projects].sort((a, b) => a.navOrder - b.navOrder);

  return (
    <>
      <Helmet>
        <title>Projects — Rochee Faverey</title>
        <meta
          name="description"
          content="All projects by Rochee Faverey — games, interactive experiences, and computer vision."
        />
      </Helmet>

      <section className="relative min-h-screen pt-32 pb-24">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(228,76,101,0.06)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-8 lg:px-16">
          <FadeIn direction="down" threshold={0}>
            <div className="mb-16 text-center">
              <p className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-accent">
                Work
              </p>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                All Projects
              </h1>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((project, i) => {
              const isComingSoon = project.title === 'Coming Soon';
              return (
              <FadeIn key={project.slug} direction="up" delay={i * 80} threshold={0.05}>
                {isComingSoon ? (
                  /* Non-clickable Coming Soon card */
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface/20 opacity-50 cursor-default select-none">
                    {/* Hero image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.heroImage}
                        alt="Coming Soon"
                        loading="lazy"
                        className="h-full w-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                      <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-light text-white/50">
                        Coming Soon
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div>
                        <p className="mb-1 text-xs font-light uppercase tracking-[0.18em] text-white/25">
                          Coming Soon
                        </p>
                        <h2 className="font-display text-xl font-bold text-white/30">
                          Coming Soon
                        </h2>
                      </div>
                      <p className="flex-1 text-sm font-light text-white/20 line-clamp-3">
                        This project is in progress and will be added soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Normal clickable card */
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-surface/40 transition-all duration-300 hover:border-accent/25 hover:bg-surface/70 hover:shadow-xl hover:shadow-accent/8 hover:-translate-y-1"
                  >
                    {/* Hero image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                      {project.featured && (
                        <span className="absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-light text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div>
                        <p className="mb-1 text-xs font-light uppercase tracking-[0.18em] text-accent">
                          {project.subtitle}
                        </p>
                        <h2 className="font-display text-xl font-bold text-white">
                          {project.title}
                        </h2>
                      </div>

                      <p className="flex-1 text-sm font-light leading-relaxed text-white/55 line-clamp-3">
                        {project.overview}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.highlights.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/8 bg-white/4 px-2.5 py-0.5 text-xs font-light text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-sm font-light text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5">
                        View project <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                )}
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
