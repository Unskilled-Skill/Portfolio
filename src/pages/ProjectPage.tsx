import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useProjects } from '../hooks/useSanityContent';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { VideoEmbed } from '../components/ui/VideoEmbed';
import { ProjectGrid } from '../components/ui/ProjectGrid';
import { ReadingProgress } from '../components/ui/ReadingProgress';
import { FadeIn } from '../components/ui/FadeIn';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { projects, loading } = useProjects();
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;

  if (!project && loading) {
    return null;
  }

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const prevProject = projects.find((p) => p.slug === project.prevSlug);
  const nextProject = projects.find((p) => p.slug === project.nextSlug);

  return (
    <>
      <ReadingProgress />

      <Helmet>
        <title>{project.title} — Rochee Faverey</title>
        <meta name="description" content={project.overview} />
        <meta property="og:title" content={`${project.title} — Rochee Faverey`} />
        <meta property="og:description" content={project.overview} />
        <meta property="og:image" content={project.heroImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.heroImage} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-32">
          <FadeIn direction="up" threshold={0}>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/#projects' },
                { label: project.title },
              ]}
            />
            <h1 className="mt-4 text-4xl font-thin tracking-tight md:text-6xl">{project.title}</h1>
            <p className="mt-2 text-lg font-light text-accent">{project.subtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="up">
            <p className="text-lg font-light leading-relaxed text-white/75">{project.overview}</p>
          </FadeIn>
        </div>
      </section>

      {/* Meta Row */}
      <section className="border-y border-white/5 bg-surface/30 py-10">
        <div className="mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
          {[
            { label: 'Role', value: project.meta.role },
            { label: 'Tools', value: project.meta.tools },
            { label: 'Focus', value: project.meta.focus },
          ].map(({ label, value }, i) => (
            <FadeIn key={label} direction="up" delay={i * 80}>
              <div className="text-center">
                <p className="mb-1 text-xs font-light uppercase tracking-[0.2em] text-accent">{label}</p>
                <p className="font-light text-white/80">{value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Video */}
      {project.youtubeId && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn direction="up">
              <h2 className="mb-8 text-center text-2xl font-thin tracking-tight">Project Video</h2>
              <VideoEmbed youtubeId={project.youtubeId} title={project.title} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Body Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-6">
          {project.bodySections.map((section, i) => (
            <FadeIn key={i} direction="up" delay={50}>
              <div>
                {section.title && (
                  <h2 className="mb-5 text-2xl font-thin tracking-tight">{section.title}</h2>
                )}
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="mb-4 font-light leading-relaxed text-white/70">{para}</p>
                ))}
                {section.list && (
                  <ul className="ml-1 space-y-3">
                    {section.list.map((item, k) => (
                      <li key={k} className="flex gap-3 text-white/70">
                        <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                        <span className="font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-surface/30 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="up">
            <h2 className="mb-12 text-center text-2xl font-thin tracking-tight">
              Development Process
            </h2>
          </FadeIn>
          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent md:left-1/2 md:-translate-x-px" />
            <div className="space-y-8">
              {project.process.map((step, i) => (
                <FadeIn key={i} direction="up" delay={i * 80}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Step number dot */}
                    <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-bg text-xs font-light text-accent">
                        {i + 1}
                      </div>
                    </div>
                    {/* Content card */}
                    <div className={`flex-1 pl-2 md:pl-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto' : 'md:pl-12 md:ml-auto md:mr-0'}`}>
                      <div className="rounded-xl border border-white/5 bg-surface/60 px-5 py-4 transition-all duration-300 hover:border-accent/20">
                        <p className="mb-1 text-xs font-light uppercase tracking-[0.2em] text-accent">
                          {step.phase}
                        </p>
                        <p className="font-light text-white/70">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn direction="up">
            <h2 className="mb-8 text-center text-2xl font-thin tracking-tight">Key Highlights</h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.highlights.map((highlight, i) => (
              <FadeIn key={highlight} direction="up" delay={i * 60}>
                <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface/50 px-5 py-4">
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                  <span className="font-light text-white/70">{highlight}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn direction="up">
            <h2 className="mb-8 text-center text-2xl font-thin tracking-tight">Gallery</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <ProjectGrid images={project.gallery} />
          </FadeIn>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="border-t border-white/5 bg-surface/30 py-12">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-white/10 px-5 py-3 font-light text-white/60 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {prevProject.title}
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-white/10 px-5 py-3 font-light text-white/60 transition-all duration-300 hover:border-accent/50 hover:text-white"
            >
              {nextProject.title}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  );
}

export default ProjectPage;
