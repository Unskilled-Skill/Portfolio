import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/sections/HeroSection';
import { TechStrip } from '../components/sections/TechStrip';
import { SelectedWork } from '../components/sections/SelectedWork';
import { StatsSection } from '../components/sections/StatsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { useSiteSettings } from '../hooks/useSanityContent';
import { useLocale } from '../hooks/useLocale';

export function HomePage() {
  const location = useLocation();
  const { locale } = useLocale();
  const { settings } = useSiteSettings(locale);
  const { seo, identity } = settings;

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
      <TechStrip />
      <SelectedWork />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
