import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectSpotlight } from '../components/sections/ProjectSpotlight';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { StatsSection } from '../components/sections/StatsSection';
import { projects } from '../data/projects';
import { seo, identity } from '../data/site';

function Divider() {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const sortedProjects = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => a.navOrder - b.navOrder);

  return (
    <>
      <Helmet>
        <title>{seo.siteTitle}</title>
        <meta name="description"          content={seo.description} />
        <meta property="og:type"          content="website" />
        <meta property="og:title"         content={seo.siteTitle} />
        <meta property="og:description"   content={seo.description} />
        <meta property="og:image"         content={identity.avatar} />
        <meta name="twitter:card"         content="summary_large_image" />
        <meta name="twitter:title"        content={seo.siteTitle} />
        <meta name="twitter:description"  content={seo.description} />
        <meta name="twitter:image"        content={identity.avatar} />
      </Helmet>

      <HeroSection />
      <Divider />

      <AboutSection />
      <Divider />

      <StatsSection />
      <Divider />

      <div id="projects">
        {sortedProjects.map((project, index) => (
          <ProjectSpotlight
            key={project.slug}
            project={project}
            direction={project.spotlightDirection}
            bgClass={index % 2 === 0 ? '' : 'bg-surface/30'}
          />
        ))}
        <div className="flex justify-center py-12 border-t border-white/5">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-light text-white/50 transition-colors hover:text-accent hover:gap-3"
          >
            View all projects
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <Divider />

      <SkillsSection />
      <Divider />

      <ContactSection />
    </>
  );
}
