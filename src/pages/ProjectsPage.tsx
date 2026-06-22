import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProjects, useSiteSettings } from '../hooks/useSanityContent';
import { useLocale } from '../hooks/useLocale';
import { withLocale } from '../lib/locale';

export function ProjectsPage() {
  const { locale } = useLocale();
  const { projects } = useProjects(locale);
  const { settings } = useSiteSettings(locale);
  const { seo, ui } = settings;
  const sorted = [...projects].sort((a, b) => a.navOrder - b.navOrder);
  const year = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>{ui.projects} — Rochee Faverey</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      {/* header */}
      <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(40px,6vh,72px)] pt-[clamp(120px,18vh,200px)]">
        <div className="mx-auto max-w-shell">
          <div data-reveal className="mb-6 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-rf-ink/60">
            <Link to={withLocale('/', locale)} className="transition-colors hover:text-rf-accent">{ui.home}</Link>
            <span className="text-rf-ink/30">/</span>
            <span className="text-rf-accent">{ui.work}</span>
          </div>
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="m-0 font-display text-[clamp(52px,9vw,128px)] font-extrabold leading-[0.9] tracking-[-0.035em]">
              {ui.selectedWork}
              <span className="text-rf-accent">.</span>
            </h1>
            <span className="max-w-[24ch] pb-2.5 font-mono text-xs uppercase leading-[1.7] tracking-[0.12em] text-rf-ink/40">
              {settings.startYear}–{year} · {ui.projectsTagline} · {ui.location}
            </span>
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(40px,6vh,80px)]">
        <div data-reveal className="mx-auto grid max-w-shell gap-[clamp(18px,2.4vw,32px)] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {sorted.map((project, i) => {
            const isComingSoon = project.title === 'Coming Soon';
            const num = String(i + 1).padStart(2, '0');
            const inner = (
              <>
                <div className="relative overflow-hidden border border-white/10">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className={`block aspect-[16/10] w-full object-cover transition-transform duration-700 ease-rf ${
                      isComingSoon ? 'grayscale' : 'group-hover:scale-[1.05]'
                    }`}
                  />
                  <span
                    className="absolute left-3.5 top-3.5 font-display text-[26px] font-extrabold leading-none text-transparent"
                    style={{ WebkitTextStroke: '1.2px rgba(255,255,255,0.55)' }}
                  >
                    {num}
                  </span>
                </div>
                <div className="mt-[18px] flex items-baseline justify-between gap-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-rf-accent">{project.subtitle}</span>
                </div>
                <h2 className="mt-2 font-display text-[clamp(26px,2.8vw,34px)] font-bold leading-[1.04] tracking-[-0.025em]">
                  {project.title}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.6] text-rf-ink/[0.58] line-clamp-3">{project.overview}</p>
                {!isComingSoon && (
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-rf-ink transition-colors group-hover:text-rf-accent">
                    {ui.viewProject} →
                  </span>
                )}
              </>
            );

            return isComingSoon ? (
              <div key={project.slug} className="flex select-none flex-col opacity-50">{inner}</div>
            ) : (
              <Link key={project.slug} to={withLocale(`/projects/${project.slug}`, locale)} className="group flex flex-col">
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* more coming */}
      <section className="px-[clamp(20px,5vw,72px)] pb-[clamp(72px,11vh,128px)] pt-[clamp(20px,3vh,40px)]">
        <div data-reveal className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5 border-t border-white/[0.08] pt-7">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-rf-ink/[0.45]">
            <span className="h-2 w-2 rounded-full bg-rf-accent shadow-[0_0_0_4px_rgba(228,76,101,0.18)]" />
            {ui.moreProjects}
          </span>
          <Link
            to={`${withLocale('/', locale)}#contact`}
            className="border-b-2 border-rf-accent pb-1 font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink transition-colors hover:text-rf-accent"
          >
            {ui.workWithMe} →
          </Link>
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
