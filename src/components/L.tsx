'use client';

import { useL } from './LanguageProvider';
import { Localized } from '@/lib/i18n';

/**
 * Tiny client wrapper that renders a Sanity-fed Localized value
 * via the `useL()` hook (which picks en/th/zh based on the current
 * locale, falling back to EN when th/zh are empty).
 *
 *   <h1><L value={cms.heroTitle} /></h1>
 *
 * Companion to <T k="..." /> which handles COPY-dict keys.
 */
export default function L({
  value,
  fallback = '',
}: {
  value: Localized | null | undefined;
  fallback?: string;
}) {
  const pick = useL();
  return <>{pick(value) || fallback}</>;
}
