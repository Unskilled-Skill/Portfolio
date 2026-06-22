import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';

export function Footer() {
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, ui } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-rf-surface px-[clamp(20px,5vw,72px)] py-[clamp(28px,4vh,40px)]">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5">
        <span className="font-mono text-xs tracking-[0.08em] text-rf-ink/40">
          © {year} {identity.name} · {ui.footerNote}
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs uppercase tracking-[0.08em] text-rf-ink/50 transition-colors hover:text-rf-accent"
        >
          {ui.backToTop} ↑
        </button>
      </div>
    </footer>
  );
}
