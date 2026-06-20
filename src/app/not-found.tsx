'use client';

import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import { useT, useLocale } from '@/components/LanguageProvider';

/**
 * Branded 404. Owner-editable copy via Sanity uiLabels (nf.*).
 *
 * Bilingual lines are shown one above the other so the page reads
 * naturally regardless of which locale Next's static 404 resolved at
 * build time; the live language toggle still controls the primary copy.
 */
export default function NotFound() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <main className="bg-ivory text-charcoal min-h-[calc(100vh-180px)] flex items-center">
      <div className="mx-auto max-w-[820px] px-6 lg:px-10 py-28 lg:py-36 text-center">
        <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep" lang={locale}>
          {t('nf.eyebrow')}
        </p>
        <h1
          className="display leading-[1.04] mt-7 text-charcoal"
          style={{ fontSize: 'clamp(40px, 5.6vw, 76px)' }}
          lang={locale}
        >
          {t('nf.title.l1')}{' '}
          <em className="display-italic text-gold-deep">{t('nf.title.l2')}</em>
        </h1>
        <p className="font-sans italic text-[15px] lg:text-[16px] text-charcoal/70 mt-7 leading-[1.85] max-w-[44ch] mx-auto" lang={locale}>
          {t('nf.body')}
        </p>

        <hr className="border-0 h-px bg-gold-light/50 w-24 mx-auto mt-12" />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5 min-h-[44px]"
            lang={locale}
          >
            {t('nf.cta.gallery')} <span aria-hidden>→</span>
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5 min-h-[44px]"
            lang={locale}
          >
            {t('nf.cta.book')} <span aria-hidden>→</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal/60 hover:text-charcoal transition-colors duration-500 min-h-[44px]"
            lang={locale}
          >
            {t('nf.cta.home')}
          </Link>
        </div>

        <p className="mt-12 font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep/80">
          CLEAR 1993  ·  {BRAND.addressLines?.[0] ?? 'Bangkok'}
        </p>
      </div>
    </main>
  );
}
