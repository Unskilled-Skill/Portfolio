import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLocale } from '../../hooks/useLocale';
import { useSiteSettings } from '../../hooks/useSanityContent';
import { localizedPath, withLocale } from '../../lib/locale';

const NAV_SECTIONS = ['projects', 'skills', 'contact'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { identity, ui } = settings;
  const { scrollTo, scrollToTop } = useSmoothScroll();
  const isProjectPage   = location.pathname.startsWith('/projects/') || location.pathname.startsWith('/nl/projects/');
  const isProjectsList  = location.pathname === '/projects' || location.pathname === '/nl/projects';
  const activeSection   = useScrollSpy(NAV_SECTIONS, 120);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navAction = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const navLinkClass = (active: boolean) =>
    `text-sm font-light transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
      active
        ? 'text-white after:w-full'
        : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4 lg:px-16">
        <Link
          to={withLocale('/', locale)}
          onClick={(e) => {
            if (location.pathname === '/' || location.pathname === '/nl') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          className="text-lg font-light tracking-wide text-white transition-colors hover:text-accent"
        >
          {identity.name}
        </Link>

        {isProjectPage ? (
          <Link
            to={withLocale('/', locale)}
            className="flex items-center gap-2 text-sm font-light text-white/70 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            {ui.back}
          </Link>
        ) : (
          <>
            <nav className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => scrollToTop()}
                className={navLinkClass(!activeSection)}
              >
                {ui.home}
              </button>
              <Link
                to={withLocale('/projects', locale)}
                className={navLinkClass(isProjectsList || activeSection === 'projects' || activeSection === 'skills')}
              >
                {ui.projects}
              </Link>
              <button
                onClick={() => navAction('contact')}
                className={navLinkClass(activeSection === 'contact')}
              >
                {ui.contact}
              </button>
              <Link
                to={localizedPath(location.pathname, locale === 'en' ? 'nl' : 'en')}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-light uppercase tracking-[0.16em] text-white/50 transition-colors hover:border-accent hover:text-accent"
              >
                {locale === 'en' ? 'NL' : 'EN'}
              </Link>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/5 hover:text-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}
      </div>

      {menuOpen && !isProjectPage && (
        <nav className="glass border-t border-white/5 md:hidden">
          <div className="flex flex-col gap-4 px-8 py-4">
            <button
              onClick={() => { setMenuOpen(false); scrollToTop(); }}
              className={`text-left text-sm font-light transition-colors ${!activeSection ? 'text-white' : 'text-white/70 hover:text-white'}`}
            >
              {ui.home}
            </button>
            <Link
              to={withLocale('/projects', locale)}
              className={`text-left text-sm font-light transition-colors ${isProjectsList || activeSection === 'projects' || activeSection === 'skills' ? 'text-accent' : 'text-white/70 hover:text-white'}`}
            >
              {ui.projects}
            </Link>
            <button
              onClick={() => navAction('contact')}
              className={`text-left text-sm font-light transition-colors ${activeSection === 'contact' ? 'text-accent' : 'text-white/70 hover:text-white'}`}
            >
              {ui.contact}
            </button>
            <Link
              to={localizedPath(location.pathname, locale === 'en' ? 'nl' : 'en')}
              className="text-left text-sm font-light text-white/70 transition-colors hover:text-accent"
            >
              {locale === 'en' ? ui.languageDutch : ui.languageEnglish}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
