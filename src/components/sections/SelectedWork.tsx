import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { useLocale } from '../../hooks/useLocale';
import { useProjects, useSiteSettings } from '../../hooks/useSanityContent';
import { withLocale } from '../../lib/locale';

const labelMono = 'font-mono text-[10px] uppercase tracking-[0.16em] text-rf-ink/[0.34]';

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className={labelMono}>{label}</div>
      <div className="mt-1 text-sm text-rf-ink/[0.82]">{value}</div>
    </div>
  );
}

function ProjectRow({ project, index, href, viewLabel, last }: { project: Project; index: number; href: string; viewLabel: string; last: boolean }) {
  const num = String(index + 1).padStart(2, '0');
  const imageLeft = index % 2 === 0;
  const main = project.gallery[0]?.src ?? project.heroImage;
  const thumbs = project.gallery.slice(1, 3);
  const isLast = last;

  const media = (
    <div className="order-1 min-w-[280px] flex-[1_1_460px]">
      <div className="overflow-hidden border border-white/10">
        <img
          src={main}
          alt={project.gallery[0]?.alt ?? project.title}
          className="block aspect-[16/10] w-full object-cover transition-transform duration-700 ease-rf hover:scale-[1.04]"
        />
      </div>
      {thumbs.length > 0 && (
        <div className="mt-3 flex gap-3">
          {thumbs.map((t) => (
            <img key={t.src} src={t.src} alt={t.alt} className="h-[104px] w-0 flex-1 border border-white/10 object-cover" />
          ))}
        </div>
      )}
    </div>
  );

  const text = (
    <div className="order-2 min-w-[280px] flex-[1_1_360px]">
      <div className="flex items-baseline gap-[18px]">
        <span
          className="font-display text-[clamp(44px,5vw,68px)] font-extrabold leading-none tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: '1.4px rgba(255,255,255,0.22)' }}
        >
          {num}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-accent">{project.subtitle}</span>
      </div>
      <h3 className="mt-3.5 font-display text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.02] tracking-[-0.025em]">
        {project.title}
      </h3>
      <p className="mt-[18px] max-w-[48ch] text-base leading-[1.65] text-rf-ink/[0.62]">{project.overview}</p>
      <div className="my-6 flex flex-wrap gap-7 border-y border-white/[0.08] py-[18px]">
        <MetaCell label="Role" value={project.meta.role} />
        <MetaCell label="Tools" value={project.meta.tools} />
        <MetaCell label="Focus" value={project.meta.focus} />
      </div>
      <Link
        to={href}
        className="inline-flex items-center gap-2.5 border-b-2 border-rf-accent pb-1 font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink transition-colors hover:text-rf-accent"
      >
        {viewLabel} →
      </Link>
    </div>
  );

  return (
    <article
      data-reveal
      className={`flex flex-wrap items-center gap-[clamp(28px,4vw,64px)] ${
        isLast ? '' : 'mb-[clamp(56px,8vh,96px)] border-b border-white/[0.08] pb-[clamp(56px,8vh,96px)]'
      }`}
    >
      {imageLeft ? (
        <>
          {media}
          {text}
        </>
      ) : (
        <>
          <div className="order-1 min-w-[280px] flex-[1_1_360px] md:order-2">{text}</div>
          <div className="order-2 min-w-[280px] flex-[1_1_460px] md:order-1">{media}</div>
        </>
      )}
    </article>
  );
}

export function SelectedWork() {
  const { locale } = useLocale();
  const { projects } = useProjects(locale);
  const { settings } = useSiteSettings(locale);
  const { startYear, ui } = settings;

  const featured = [...projects].filter((p) => p.featured).sort((a, b) => a.navOrder - b.navOrder);
  const year = new Date().getFullYear();
  const count = String(featured.length).padStart(2, '0');

  return (
    <section id="projects" className="bg-rf-bg/[0.62] px-[clamp(20px,5vw,72px)] pb-[clamp(40px,6vh,80px)] pt-[clamp(72px,12vh,140px)]">
      <div className="mx-auto max-w-shell">
        <div data-reveal className="mb-[clamp(48px,7vh,84px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-rf-accent">(01) {ui.work}</span>
            <h2 data-kinetic className="mt-3.5 font-display text-[clamp(38px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.03em]">
              {ui.workTitle}
            </h2>
          </div>
          <span className="pb-2 font-mono text-xs uppercase tracking-[0.14em] text-rf-ink/[0.34]">
            {startYear}–{year} / {count} {ui.projects}
          </span>
        </div>

        {featured.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            href={withLocale(`/projects/${project.slug}`, locale)}
            viewLabel={ui.viewProject}
            last={i === featured.length - 1}
          />
        ))}

        <div className="mt-[clamp(48px,7vh,80px)] flex justify-center">
          <Link
            to={withLocale('/projects', locale)}
            className="inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.1em] text-rf-ink/[0.55] transition-colors hover:text-rf-accent"
          >
            {ui.viewAllProjects} →
          </Link>
        </div>
      </div>
    </section>
  );
}
