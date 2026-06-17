'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { COPY, CopyKey, DEFAULT_LOCALE, Locale, Localized, pickLocalized } from '@/lib/i18n';


interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: CopyKey) => string;
  l: (value: Localized | null | undefined) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Persists in BOTH localStorage AND a cookie keyed `clear.locale`. The
 * cookie is what the root layout reads on the server so the first paint
 * matches the user's preference (no FOUC) and `<html lang>` is correct
 * for SEO and screen readers. */
const STORAGE_KEY = 'clear.locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(/(?:^|;\s*)clear\.locale=([^;]+)/);
  const v = m?.[1];
  return v === 'en' || v === 'th' ? v : null;
}

function readStorageLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'en' || v === 'th' ? v : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  labels,
}: {
  children: ReactNode;
  /** Server-rendered locale (read from cookie). Keeps SSR and first client
   * render in sync — no hydration mismatch. */
  initialLocale?: Locale;
  /** Sanity-fetched UI labels keyed by dot-key (nav.home, book.submit, …).
   * Takes precedence over the in-source COPY dict for any key present. */
  labels?: Record<string, Localized> | null;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // After hydration, reconcile with localStorage in case it differs from
  // the cookie (e.g. user toggled in a previous session where the cookie
  // didn't reach the SSR — rare but possible on stale CDN cache).
  useEffect(() => {
    // ?lang=th overrides everything (used by hreflang variants).
    let next: Locale | null = null;
    try {
      const p = new URLSearchParams(window.location.search).get('lang');
      if (p === 'en' || p === 'th') next = p;
    } catch { /* ignore */ }
    if (!next) next = readStorageLocale() ?? readCookieLocale();
    if (next && next !== locale) setLocaleState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On every locale change, update the live <html lang> attribute and
  // persist to both localStorage and cookie so the choice survives reload.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
    try {
      window.localStorage?.setItem(STORAGE_KEY, locale);
    } catch { /* ignore */ }
    if (typeof document !== 'undefined') {
      document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: (key) => {
      // Code-pinned keys ALWAYS use the in-source COPY dict, ignoring any
      // Sanity uiLabels override. Use this for strings that have just been
      // rewritten in code and where stale Sanity drafts would shadow the
      // change. (Removed Sanity entries can linger in the uiLabels doc
      // for weeks until the owner clears them; this guarantees the new
      // copy ships immediately.)
      const PINNED = new Set<string>([
        'wa.name',
      ]);
      if (!PINNED.has(key) && labels && labels[key] != null) {
        const v = pickLocalized(labels[key], locale);
        if (v) return v;
      }
      // Fall back to the in-source dict — guarantees the site never breaks
      // on a missing or empty Sanity label.
      const entry = COPY[key];
      if (!entry) return key;
      return entry[locale] ?? entry.en;
    },
    l: (value) => pickLocalized(value, locale),
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLocale must be used inside <LanguageProvider>');
  return ctx;
}

export function useT() {
  return useContext(LanguageContext)?.t ?? ((k: string) => k);
}

export function useL() {
  return (
    useContext(LanguageContext)?.l ??
    ((v: Localized | null | undefined) => pickLocalized(v, DEFAULT_LOCALE))
  );
}
