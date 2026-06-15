'use client';

import { useT } from './LanguageProvider';
import { CopyKey } from '@/lib/i18n';

/**
 * Tiny client wrapper that renders a translated string via the
 * `useT()` hook. Lets server components embed translated copy
 * inline without becoming client components themselves:
 *
 *   <h2><T k="home.sig.title.l1" /></h2>
 */
export default function T({
  k,
  replace,
}: {
  k: CopyKey;
  /** Optional placeholder replacements, e.g. {year: '2026'} → '{year}' → '2026'. */
  replace?: Record<string, string | number>;
}) {
  const t = useT();
  let out = t(k);
  if (replace) {
    for (const [key, val] of Object.entries(replace)) {
      out = out.replace(`{${key}}`, String(val));
    }
  }
  return <>{out}</>;
}
