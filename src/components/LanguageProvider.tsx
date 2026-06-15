'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { COPY, CopyKey, DEFAULT_LOCALE, Locale, Localized, pickLocalized } from '@/lib/i18n';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: CopyKey) => string;
  /** Pick the right string from a Sanity field that may be plain string or { en, th, zh }. */
  l: (value: Localized | null | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** localStorage AND cookie key — kept simple, dot-namespaced. */
const STORAGE_KEY = 'clear.locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)clear\.locale=([^;]+)/);
  const v = match?.[1];
  return v === 'en' || v === 'th' || v === 'zh' ? v : null;
}

function readStorageLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'th' || v === 'zh' ? v : null;
  } catch {
    return null;
  }
}

/**
 * Wraps the whole app. Persists the locale in BOTH localStorage (primary,
 * survives reload) and a cookie (so SSR could read it later if we move to
 * a server-rendered <html lang>). Also keeps the live `<html lang>`
 * attribute in sync so accessibility tools + screen readers pick up the
 * right language as the user toggles.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // First render is always DEFAULT_LOCALE so SSR & first client render match
  // (no React hydration mismatch). The real saved locale is applied in the
  // useEffect below, triggering one re-render after hydration.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = readStorageLocale() ?? readCookieLocale();
    if (saved && saved !== locale) {
      setLocaleState(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect locale on <html lang> + cookie + localStorage whenever it changes.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
    try {
      window.localStorage?.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: (key) => {
      const entry = COPY[key];
      if (!entry) return key; // unknown key — render its name so it's obvious
      return entry[locale] ?? entry.en;
    },
    l: (value) => pickLocalized(value, locale),
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

/** Full context access — locale, setter, t, l. */
export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLocale must be used inside <LanguageProvider>');
  return ctx;
}

/** Convenience: just the translator. Safe outside the provider (returns key). */
export function useT() {
  return useContext(LanguageContext)?.t ?? ((k: string) => k);
}

/** Convenience: just the Sanity-localised picker. Safe outside the provider. */
export function useL() {
  return (
    useContext(LanguageContext)?.l ??
    ((v: Localized | null | undefined) => pickLocalized(v, DEFAULT_LOCALE))
  );
}
