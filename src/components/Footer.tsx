'use client';

import { BRAND } from '@/lib/brand';
import Wordmark from './Wordmark';
import OrnateDivider from './OrnateDivider';
import { useT, useLocale } from './LanguageProvider';

/**
 * Site footer — restrained editorial rhythm.
 *
 * Mobile-first: single-column vertical stack, generous line-height,
 * tap targets ≥44px on every link. Becomes a multi-column grid only
 * from `lg:` upwards. Charcoal ground, ivory + gold ink.
 */
export default function Footer() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <footer className="relative bg-charcoal text-ivory pt-20 pb-10 lg:pt-24 lg:pb-12 overflow-hidden">
      {/* Ambient gold wash, bottom-left — quieter on mobile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(900px 600px at 12% 100%, rgba(194,161,77,0.18) 0%, rgba(194,161,77,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Enormous ghost wordmark along the foot (desktop only — would
          dwarf the mobile layout) */}
      <span
        aria-hidden
        className="hidden md:block ghost-numeral on-dark left-1/2 -translate-x-1/2 bottom-[-0.18em] whitespace-nowrap"
        style={{ fontSize: 'clamp(120px, 18vw, 340px)' }}
      >
        Clear 1993
      </span>

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* Brand block + LINE CTA — stacks vertically on mobile.
            (A duplicate 'Closing flourish' wordmark used to sit above
            this block — removed because seeing the CLEAR / JEWELRY
            lockup twice on the same footer read as repetitive and
            slightly unprofessional. The main brand block below is the
            canonical footer lockup; the 'Crafted in Bangkok' line that
            accompanied the duplicate is preserved in the legal stripe
            at the foot of the page.) */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12 py-12 lg:py-16 border-b border-[var(--rule-invert)] text-center lg:text-left">
          <div className="lg:max-w-md mx-auto lg:mx-0">
            <div className="flex justify-center lg:justify-start">
              <Wordmark size="lg" variant="light" />
            </div>
            <p
              className="display-italic text-xl lg:text-2xl text-ivory/90 mt-6 lg:mt-8 leading-snug"
              lang={locale}
            >
              {BRAND.tagline}.
            </p>
            <p
              className="font-sans text-[12.5px] tracking-[0.18em] text-gold-light/80 mt-5 lg:mt-6 leading-relaxed"
              lang={locale}
            >
              {t('her.body')}
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-5">
            <p className="eyebrow text-gold-light">{t('foot.atelier')}</p>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-light min-h-[44px]"
            >
              {t('foot.cta')} <span className="btn-arrow">→</span>
            </a>

          </div>
        </div>

        {/* Channels — single column on mobile, three columns at lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-10 py-12 lg:py-16 border-b border-[var(--rule-invert)] text-center lg:text-left">
          <FooterChannel
            label={t('foot.atelier')}
            primary={BRAND.addressLines[0]}
            secondary={`${BRAND.addressLines[1]} · ${BRAND.addressLines[2]}`}
            tertiary={t('transit')}
          />
          <FooterChannel
            label={t('foot.hours')}
            primary={t('tag.day')}
            secondary={t('transit')}
          />
          <FooterChannel
            label={t('foot.contact')}
            primary={
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center lg:justify-start min-h-[44px] hover:text-gold-light transition-colors"
              >
                WhatsApp · {t('wa.name')}
              </a>
            }
            secondary={
              <a
                href={BRAND.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center lg:justify-start min-h-[44px] hover:text-gold-light transition-colors"
              >
                LINE · {BRAND.lineHandle}
              </a>
            }
          />
        </div>

        {/* Legal — centred on mobile, justified on desktop */}
        <OrnateDivider className="mt-10 lg:mt-12 opacity-80" />
        <div className="pt-8 lg:pt-10 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-3 md:gap-4 text-[10.5px] lg:text-[11px] tracking-[0.22em] uppercase text-ivory/60 text-center md:text-left">
          <p lang={locale} className="leading-relaxed">
            {t('foot.legal').replace('{year}', String(new Date().getFullYear()))}
          </p>
          <p className="text-gold-deep" lang={locale}>{t('foot.legend')}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterChannel({
  label,
  primary,
  secondary,
  tertiary,
}: {
  label: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  tertiary?: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-gold-light/80 mb-3 lg:mb-4">{label}</p>
      <div className="display text-[18px] lg:text-[20px] leading-snug text-ivory">{primary}</div>
      {secondary && (
        <div className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/75 mt-2 leading-relaxed">
          {secondary}
        </div>
      )}
      {tertiary && (
        <div className="font-sans text-[12px] tracking-[0.04em] text-ivory/60 mt-2 leading-relaxed">
          {tertiary}
        </div>
      )}
    </div>
  );
}
