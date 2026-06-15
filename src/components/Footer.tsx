'use client';

import { BRAND } from '@/lib/brand';
import Wordmark from './Wordmark';
import OrnateDivider from './OrnateDivider';
import MarquiseSealDraw from './MarquiseSealDraw';
import { useT, useLocale } from './LanguageProvider';

/**
 * Site footer — dark charcoal background, ivory + gold text, three contact
 * channels (LINE, phone, Instagram), address + hours, LINE-direct CTA.
 */
export default function Footer() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <footer className="relative bg-charcoal text-ivory pt-24 pb-12 overflow-hidden">
      {/* ambient gold wash, bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(900px 600px at 12% 100%, rgba(194,161,77,0.18) 0%, rgba(194,161,77,0.04) 40%, transparent 70%)',
        }}
      />
      {/* enormous ghost wordmark along the foot of the page */}
      <span
        aria-hidden
        className="ghost-numeral on-dark left-1/2 -translate-x-1/2 bottom-[-0.18em] whitespace-nowrap"
        style={{ fontSize: 'clamp(120px, 18vw, 340px)' }}
      >
        Clear 1993
      </span>

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* Closing flourish — centred seal + whisper */}
        <div className="text-center pb-16 border-b border-[var(--rule-invert)]">
          <div className="relative w-24 h-32 mx-auto mb-6">
            <MarquiseSealDraw className="w-full h-full" ariaLabel={`${BRAND.name} brandmark`} />
          </div>
          <p
            className="font-sans uppercase text-[10px] tracking-[0.6em] text-gold-light/65"
            lang={locale}
          >
            {t('foot.madein')}
          </p>
        </div>

        {/* Top: brand + CTA */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 py-16 border-b border-[var(--rule-invert)]">
          <div>
            <Wordmark size="lg" variant="light" />
            <p
              className="display-italic text-2xl text-ivory/90 mt-8 max-w-md leading-snug"
              lang={locale}
            >
              {BRAND.tagline}.
            </p>
            <p
              className="font-sans text-[12.5px] tracking-[0.18em] text-gold-light/80 mt-6 max-w-md leading-relaxed"
              lang={locale}
            >
              {t('her.body')}
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="eyebrow text-gold-light">{t('foot.atelier')}</p>
            <a href={BRAND.lineUrl} target="_blank" rel="noreferrer" className="btn btn-light">
              {t('foot.cta')} <span className="btn-arrow">→</span>
            </a>
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-gold-light hover:text-ivory transition-colors duration-500"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle: channels */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 py-16 border-b border-[var(--rule-invert)]">
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
              <a href={`tel:${BRAND.phoneTel}`} className="hover:text-gold-light transition-colors">
                {BRAND.phoneDisplay}
              </a>
            }
            secondary={
              <a href={BRAND.lineUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                LINE · {BRAND.lineHandle}
              </a>
            }
            tertiary={
              <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                IG · {BRAND.instagramHandle}
              </a>
            }
          />
        </div>

        {/* Bottom: legal */}
        <OrnateDivider className="mt-12 opacity-80" />
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.22em] uppercase text-ivory/60">
          <p lang={locale}>{t('foot.legal').replace('{year}', String(new Date().getFullYear()))}</p>
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
      <p className="eyebrow text-gold-light/80 mb-4">{label}</p>
      <div className="display text-[20px] leading-snug text-ivory">{primary}</div>
      {secondary && <div className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/75 mt-2 leading-relaxed">{secondary}</div>}
      {tertiary && <div className="font-sans text-[12px] tracking-[0.04em] text-ivory/60 mt-2 leading-relaxed">{tertiary}</div>}
    </div>
  );
}
