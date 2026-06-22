import { Link } from 'react-router-dom';
import { useLocale } from '../hooks/useLocale';
import { useSiteSettings } from '../hooks/useSanityContent';
import { withLocale } from '../lib/locale';

export function NotFound() {
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { ui } = settings;

  return (
    <section className="relative flex min-h-screen items-center justify-center px-[clamp(20px,5vw,72px)]">
      <div className="relative z-[1] mx-auto max-w-shell text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-rf-accent">{ui.notFoundEyebrow}</p>
        <h1
          className="font-display text-[clamp(120px,28vw,300px)] font-extrabold leading-[0.82] tracking-[-0.04em] text-transparent"
          style={{ WebkitTextStroke: '1.4px rgba(255,255,255,0.16)' }}
        >
          404
        </h1>
        <h2 className="mt-4 font-display text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.02em]">
          {ui.notFoundTitle}
          <span className="text-rf-accent">.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[17px] leading-[1.7] text-rf-ink/[0.5]">{ui.notFoundDescription}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <Link
            to={withLocale('/', locale)}
            className="inline-flex items-center gap-2.5 bg-rf-accent px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-white transition-colors hover:bg-rf-accentHover"
          >
            {ui.goHome} →
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2.5 border border-white/[0.16] px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.08em] text-rf-ink/[0.85] transition-colors hover:border-rf-accent hover:text-white"
          >
            ← {ui.goBack}
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
