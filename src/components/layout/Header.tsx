import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { identity } from '../../data/site';

const NAV_SECTIONS = ['projects', 'skills', 'contact'];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollTo, scrollToTop } = useSmoothScroll();
  const isProjectPage   = location.pathname.startsWith('/projects/');
  const isProjectsList  = location.pathname === '/projects';
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
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
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
            to="/"
            className="flex items-center gap-2 text-sm font-light text-white/70 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        ) : (
          <>
            <nav className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => scrollToTop()}
                className={navLinkClass(!activeSection)}
              >
                Home
              </button>
              <Link
                to="/projects"
                className={navLinkClass(isProjectsList || activeSection === 'projects' || activeSection === 'skills')}
              >
                Projects
              </Link>
              <button
                onClick={() => navAction('contact')}
                className={navLinkClass(activeSection === 'contact')}
              >
                Contact
              </button>
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
              Home
            </button>
            <Link
              to="/projects"
              className={`text-left text-sm font-light transition-colors ${isProjectsList || activeSection === 'projects' || activeSection === 'skills' ? 'text-accent' : 'text-white/70 hover:text-white'}`}
            >
              Projects
            </Link>
            <button
              onClick={() => navAction('contact')}
              className={`text-left text-sm font-light transition-colors ${activeSection === 'contact' ? 'text-accent' : 'text-white/70 hover:text-white'}`}
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
