import type { Locale } from '../types';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALES: Locale[] = ['en', 'nl'];

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl' : DEFAULT_LOCALE;
}

export function stripLocaleFromPath(pathname: string): string {
  if (pathname === '/nl') {
    return '/';
  }

  if (pathname.startsWith('/nl/')) {
    return pathname.slice(3) || '/';
  }

  return pathname || '/';
}

export function localizedPath(pathname: string, locale: Locale): string {
  const barePath = stripLocaleFromPath(pathname);

  if (locale === DEFAULT_LOCALE) {
    return barePath;
  }

  return barePath === '/' ? `/${locale}` : `/${locale}${barePath}`;
}

export function withLocale(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}
