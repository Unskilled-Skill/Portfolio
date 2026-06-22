import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';
import { localizedPath, withLocale } from '../../lib/locale';

const NAV_SECTIONS = ['projects', 'about', 'skills', 'contact'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, ui } = settings;
  const { scrollTo, scrollToTop } = useSmoothScroll();
  const isProjectPage = location.pathname.startsWith('/projects/') || location.pathname.startsWith('/nl/projects/');
  const activeSection = useScrollSpy(NAV_SECTIONS, 120);

  useEffect(() => {
    const onScroll = () => {
      const de = document.documentElement;
      const max = de.scrollHeight - de.clientHeight || 1;
      setProgress(Math.min(Math.max(window.scrollY / max, 0), 1) * 100);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const aboutLabel = locale === 'nl' ? 'Over' : 'About';

  const navLinks = [
    { id: 'projects', index: '01', label: ui.work },
    { id: 'about', index: '02', label: aboutLabel },
    { id: 'skills', index: '03', label: ui.expertise },
  ];

  const monoLink =
    'font-mono text-xs uppercase tracking-[0.1em] text-rf-ink/60 transition-colors hover:text-rf-ink whitespace-nowrap';

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/[0.08] bg-rf-bg/[0.86] backdrop-blur-md">
      {/* scroll progress */}
      <div className="absolute inset-x-0 top-0 h-[3px]">
        <div className="h-full bg-rf-accent transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
      </div>

      <div className="mx-auto flex max-w-shell items-center justify-between gap-6 px-[clamp(20px,5vw,72px)] py-4">
        <Link
          to={withLocale('/', locale)}
          onClick={(e) => {
            if (location.pathname === '/' || location.pathname === '/nl') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className="flex items-center gap-3"
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center bg-rf-accent font-display text-base font-extrabold tracking-[-0.04em] text-rf-bg">
            RF
          </span>
          <span className="font-display text-base font-semibold tracking-[-0.01em] text-rf-ink">{identity.name}</span>
        </Link>

        {isProjectPage ? (
          <Link to={withLocale('/', locale)} className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-rf-ink/70 transition-colors hover:text-rf-accent">
            <ArrowLeft size={15} />
            {ui.back}
          </Link>
        ) : (
          <>
            <nav className="hidden items-center gap-[clamp(14px,2.2vw,30px)] min-[760px]:flex">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`rf-navlink ${monoLink}`}
                  data-active={activeSection === l.id}
                >
                  <span className="text-rf-accent">{l.index}</span> {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 bg-rf-ink px-4 py-[9px] font-mono text-xs uppercase tracking-[0.1em] text-rf-bg transition-colors hover:bg-rf-accent hover:text-white"
              >
                {ui.contact} →
              </button>
              <Link
                to={localizedPath(location.pathname, locale === 'en' ? 'nl' : 'en')}
                className="border border-white/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-rf-ink/50 transition-colors hover:border-rf-accent hover:text-rf-accent"
              >
                {locale === 'en' ? 'NL' : 'EN'}
              </Link>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-rf-ink/70 transition-colors hover:text-rf-ink min-[760px]:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}
      </div>

      {menuOpen && !isProjectPage && (
        <nav className="border-t border-white/[0.08] bg-rf-bg/95 backdrop-blur-md min-[760px]:hidden">
          <div className="flex flex-col gap-4 px-[clamp(20px,5vw,72px)] py-5">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => { setMenuOpen(false); scrollTo(l.id); }}
                className="text-left font-mono text-xs uppercase tracking-[0.1em] text-rf-ink/70 transition-colors hover:text-rf-ink"
              >
                <span className="text-rf-accent">{l.index}</span> {l.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); scrollTo('contact'); }}
              className="text-left font-mono text-xs uppercase tracking-[0.1em] text-rf-accent"
            >
              {ui.contact} →
            </button>
            <Link
              to={localizedPath(location.pathname, locale === 'en' ? 'nl' : 'en')}
              className="text-left font-mono text-xs uppercase tracking-[0.1em] text-rf-ink/70 transition-colors hover:text-rf-accent"
            >
              {locale === 'en' ? ui.languageDutch : ui.languageEnglish}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
