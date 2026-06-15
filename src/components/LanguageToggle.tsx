'use client';

import clsx from 'clsx';
import { LOCALES, Locale } from '@/lib/i18n';
import { useLocale } from './LanguageProvider';

/**
 * Minimal three-letter language pill switcher. EN · TH · CN.
 */
export default function LanguageToggle({
  variant = 'dark',
  className,
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 font-sans text-[10px] tracking-[0.22em] uppercase',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l, i) => (
        <button
          key={l.id}
          type="button"
          onClick={() => setLocale(l.id as Locale)}
          aria-pressed={l.id === locale}
          className={clsx(
            'px-1.5 py-1 transition-colors duration-500',
            l.id === locale
              ? variant === 'light'
                ? 'text-gold-light underline underline-offset-4 decoration-gold/60 decoration-[0.5px]'
                : 'text-gold underline underline-offset-4 decoration-gold/60 decoration-[0.5px]'
              : variant === 'light'
              ? 'text-ivory/60 hover:text-ivory'
              : 'text-charcoal/55 hover:text-charcoal',
          )}
        >
          {l.short}
          {i < LOCALES.length - 1 && (
            <span className={clsx('ml-2', variant === 'light' ? 'text-ivory/30' : 'text-charcoal/25')}>·</span>
          )}
        </button>
      ))}
    </div>
  );
}
