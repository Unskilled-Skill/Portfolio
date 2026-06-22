import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProjects, useSiteSettings } from '../hooks/useSanityContent';
import { useLocale } from '../hooks/useLocale';
import { withLocale } from '../lib/locale';
import { VideoEmbed } from '../components/ui/VideoEmbed';

const eyebrow = 'font-mono text-xs uppercase tracking-[0.14em] text-rf-accent';
const metaLabel = 'font-mono text-[10px] uppercase tracking-[0.16em] text-rf-accent';

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const { projects, loading } = useProjects(locale);
  const { settings } = useSiteSettings(locale);
  const { ui } = settings;
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;

  if (!project && loading) return null;
  if (!project) return <Navigate to={withLocale('/', locale)} replace />;

  const nextProject = projects.find((p) => p.slug === project.nextSlug);
  const prevProject = projects.find((p) => p.slug === project.prevSlug);
  const sideProject = nextProject ?? prevProject;
  const sideLabel = nextProject ? `${ui.nextProject} →` : `← ${ui.prevProject}`;

  return (
    <>
      <Helmet>
        <title>{project.title} — Rochee Faverey</title>
        <meta name="description" content={project.overview} />
        <meta property="og:title" content={`${project.title} — Rochee Faverey`} />
        <meta property="og:description" content={project.overview} />
        <meta property="og:image" content={project.heroImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* hero */}
      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <img src={project.heroImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#131419_4%,rgba(19,20,25,0.72)_42%,rgba(19,20,25,0.28)_100%)]" />
        <div className="relative z-[2] mx-auto w-full max-w-shell px-[clamp(20px,5vw,72px)] pb-[clamp(44px,7vh,84px)]">
          <div data-reveal>
            <div className="mb-[22px] flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-rf-ink/60">
              <Link to={withLocale('/', locale)} className="transition-colors hover:text-rf-accent">{ui.home}</Link>
              <span className="text-rf-ink/30">/</span>
              <Link to={withLocale('/projects', locale)} className="transition-colors hover:text-rf-accent">{ui.work}</Link>
              <span className="text-rf-ink/30">/</span>
              <span className="text-rf-accent">{project.title}</span>
            </div>
            <span className={`text-[13px] ${eyebrow}`}>{project.subtitle}</span>
            <h1 className="mt-3.5 max-w-[14ch] font-display text-[clamp(46px,8vw,116px)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* overview + meta */}
      <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(32px,5vh,56px)] pt-[clamp(56px,9vh,112px)]">
        <div className="mx-auto flex max-w-shell flex-wrap gap-[clamp(40px,6vw,96px)]">
          <div data-reveal className="min-w-[300px] flex-[1_1_460px]">
            <p className="m-0 max-w-[32ch] font-display text-[clamp(19px,2vw,26px)] font-medium leading-[1.5] tracking-[-0.01em] text-rf-ink/[0.88]">
              {project.subtitle}
            </p>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-rf-ink/[0.6]">{project.overview}</p>
          </div>
          <div data-reveal className="flex min-w-[240px] flex-[1_1_280px] flex-col gap-px self-start border border-white/[0.08] bg-white/[0.08]">
            {[
              { label: 'Role', value: project.meta.role },
              { label: 'Tools', value: project.meta.tools },
              { label: 'Focus', value: project.meta.focus },
            ].map((m) => (
              <div key={m.label} className="bg-rf-surface px-[22px] py-5">
                <div className={metaLabel}>{m.label}</div>
                <div className="mt-1.5 text-base text-rf-ink/[0.86]">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* video */}
      {project.youtubeId && (
        <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(40px,6vh,72px)] pt-[clamp(20px,3vh,40px)]">
          <div data-reveal className="mx-auto max-w-shell">
            <div className="mb-5 flex items-center gap-3.5">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/40">{ui.projectVideo}</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <div className="overflow-hidden border border-white/10">
              <VideoEmbed youtubeId={project.youtubeId} title={project.title} />
            </div>
          </div>
        </section>
      )}

      {/* body sections */}
      {project.bodySections.map((section, i) => (
        <section key={i} className="px-[clamp(20px,5vw,72px)] py-[clamp(40px,6vh,80px)]">
          <div className="mx-auto flex max-w-shell flex-wrap gap-[clamp(40px,6vw,96px)]">
            <div data-reveal className="w-[260px] min-w-[200px] flex-[0_0_auto]">
              <span className={eyebrow}>({String(i + 1).padStart(2, '0')}){section.title ? ` ${section.title}` : ''}</span>
            </div>
            <div data-reveal className="min-w-[300px] flex-[1_1_460px]">
              {section.paragraphs.map((para, j) => (
                <p key={j} className={`text-[17px] leading-[1.75] text-rf-ink/[0.72] ${j > 0 ? 'mt-[18px]' : 'm-0'}`}>
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="m-0 mt-6 list-none p-0">
                  {section.list.map((item, k) => (
                    <li
                      key={k}
                      className="flex items-baseline gap-4 border-t border-white/[0.08] py-4 last:border-b last:border-white/[0.08]"
                    >
                      <span className="flex-[0_0_auto] font-mono text-xs text-rf-accent">{String(k + 1).padStart(2, '0')}</span>
                      <span className="text-base leading-[1.6] text-rf-ink/80">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* process */}
      {project.process.length > 0 && (
        <section className="border-t border-white/[0.08] bg-rf-surface px-[clamp(20px,5vw,72px)] py-[clamp(56px,9vh,112px)]">
          <div className="mx-auto max-w-shell">
            <div data-reveal className="mb-[clamp(36px,5vh,56px)]">
              <span className={eyebrow}>{`(0${project.bodySections.length + 1}) ${ui.processTitle}`}</span>
              <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-bold leading-[0.98] tracking-[-0.03em]">
                {ui.processHeadline}
              </h2>
            </div>
            <div
              data-reveal
              className="grid gap-px border border-white/[0.08] bg-white/[0.08] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]"
            >
              {project.process.map((step, i) => (
                <div key={i} className="bg-rf-bg px-6 py-7">
                  <div
                    className="font-display text-[34px] font-extrabold leading-none text-transparent"
                    style={{ WebkitTextStroke: '1.2px rgba(228,76,101,0.7)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="my-4 font-mono text-xs uppercase tracking-[0.12em] text-rf-ink">{step.phase}</div>
                  <p className="m-0 text-sm leading-[1.6] text-rf-ink/[0.55]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* gallery */}
      {project.gallery.length > 0 && (
        <section className="px-[clamp(20px,5vw,72px)] py-[clamp(56px,9vh,112px)]">
          <div className="mx-auto max-w-shell">
            <div data-reveal className="mb-[clamp(28px,4vh,44px)] flex flex-wrap items-end justify-between gap-5">
              <div>
                <span className={eyebrow}>{`(0${project.bodySections.length + 2}) ${ui.galleryLabel}`}</span>
                <h2 className="mt-3.5 font-display text-[clamp(30px,4vw,56px)] font-bold leading-[0.98] tracking-[-0.03em]">
                  {ui.galleryHeadline}
                </h2>
              </div>
              <span className="pb-2 font-mono text-xs uppercase tracking-[0.12em] text-rf-ink/[0.34]">
                {String(project.gallery.length).padStart(2, '0')} {ui.frames}
              </span>
            </div>
            <div data-reveal className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
              {project.gallery.map((img) => (
                <figure key={img.src} className="group relative m-0 overflow-hidden border border-white/10">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="block aspect-[16/10] w-full object-cover transition-transform duration-700 ease-rf group-hover:scale-[1.05]"
                  />
                  {img.overlay && (
                    <figcaption className="absolute bottom-0 left-0 bg-rf-bg/[0.78] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-rf-ink">
                      {img.overlay}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* prev / next */}
      <section className="border-t border-white/[0.08] px-[clamp(20px,5vw,72px)] py-[clamp(40px,6vh,72px)]">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5">
          <Link
            to={withLocale('/projects', locale)}
            className="inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink/60 transition-colors hover:text-rf-accent"
          >
            ← {ui.allWork}
          </Link>
          {sideProject && (
            <Link to={withLocale(`/projects/${sideProject.slug}`, locale)} className="group flex flex-col items-end gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-rf-ink/[0.34]">{sideLabel}</span>
              <span className="font-display text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.02em] text-rf-ink transition-colors group-hover:text-rf-accent">
                {sideProject.title}
              </span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectPage;
