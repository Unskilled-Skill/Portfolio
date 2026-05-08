import { useLocation } from 'react-router-dom';
import { getLocaleFromPath, localizedPath } from '../lib/locale';
import type { Locale } from '../types';

export function useLocale() {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);

  return {
    locale,
    localizedPath: (nextLocale: Locale) => localizedPath(location.pathname, nextLocale),
  };
}
