import { useEffect, useState } from 'react';
import type { Locale, Project, SiteSettings, Skill } from '../types';
import { projects as fallbackProjects } from '../data/projects';
import { skills as fallbackSkills } from '../data/skills';
import { fallbackSiteSettings } from '../data/site';
import { getProjects, getSiteSettings, getSkills, isSanityConfigured } from '../lib/sanity';

export function useProjects(locale: Locale = 'en') {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let cancelled = false;

    getProjects(locale)
      .then((nextProjects) => {
        if (!cancelled) {
          setProjects(nextProjects);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { projects, loading };
}

export function useSkills(locale: Locale = 'en') {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [loading, setLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let cancelled = false;

    getSkills(locale)
      .then((nextSkills) => {
        if (!cancelled) {
          setSkills(nextSkills);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { skills, loading };
}

export function useSiteSettings(locale: Locale = 'en') {
  const [settings, setSettings] = useState<SiteSettings>(fallbackSiteSettings[locale]);
  const [loading, setLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let cancelled = false;
    setSettings(fallbackSiteSettings[locale]);

    getSiteSettings(locale)
      .then((nextSettings) => {
        if (!cancelled) {
          setSettings(nextSettings);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { settings, loading };
}
