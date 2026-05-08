import { useEffect, useState } from 'react';
import type { Project, Skill } from '../types';
import { projects as fallbackProjects } from '../data/projects';
import { skills as fallbackSkills } from '../data/skills';
import { getProjects, getSkills, isSanityConfigured } from '../lib/sanity';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let cancelled = false;

    getProjects()
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
  }, []);

  return { projects, loading };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [loading, setLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let cancelled = false;

    getSkills()
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
  }, []);

  return { skills, loading };
}
