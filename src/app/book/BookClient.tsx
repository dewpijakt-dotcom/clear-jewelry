'use client';

import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from '@/components/Reveal';
import OrnateDivider from '@/components/OrnateDivider';
import LetterDropTitle from '@/components/LetterDropTitle';
import CountUp from '@/components/CountUp';
import { BRAND } from '@/lib/brand';
import { useT, useLocale } from '@/components/LanguageProvider';

const LINE_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=2&data=${encodeURIComponent(BRAND.lineUrl)}`;

/**
 * /book — Reach the atelier.
 *
 * Replaces the previous in-page booking form. The owner prefers WhatsApp
 * as the primary contact channel, so this page is purely two contact
 * panels and a polite confirmation promise:
 *
 *   1. WhatsApp panel (PRIMARY)
 *      - Listed first, larger card, full hairline gold border, drop shadow,
 *        bigger QR (220/280), eyebrow "PRIMARY CHANNEL · BY APPOINTMENT",
 *        filled-gold CTA "Chat on WhatsApp".
 *   2. LINE panel (SECONDARY)
 *      - Listed second, smaller card, lighter border, no shadow, smaller
 *        QR (160/200), eyebrow "ALSO ON LINE", outline CTA "Add us on LINE".
 *
 * No form, no /api/book, no LINE_CHANNEL_ACCESS_TOKEN, no Google Sheets.
 * The page is read-only contact + a quiet promise of reply timing.
 *
 * Brand register stays Harry Winston / Graff editorial. Hierarchy is
 * carried by size + border weight + button fill contrast, not colour.
 */
export default function BookClient() {
  const t = useT();
  const { locale } = useLocale();
  const [waOpen, setWaOpen] = useState(false);
  const [lineOpen, setLineOpen] = useState(false);
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  return (
    <>
      {/* INTRO */}
      <section className="relative bg-ivory pt-32 lg:pt-44 pb-10 lg:pb-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 30%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 35%, transparent 70%)',
          }}
        />

        <span
          aria-hidden
          className="ghost-numeral right-[5vw] top-20"
          style={{ fontSize: 'clamp(160px, 22vw, 380px)' }}
        >
          B
        </span>

        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10 lg:mb-12">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep">
              {t('maison.label')}
            </span>
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep tabular-nums">
              Vol. <CountUp to={yearsActive} pad={2} /> · {BRAND.establishedYear}
            </span>
          </div>

          <Reveal>
            <p className="eyebrow text-gold-deep" lang={locale}>
              B &nbsp;·&nbsp; {t('book.page.eyebrow')}
            </p>
            <h1
              className="display leading-[0.98] mt-4 max-w-3xl"
              style={{ fontSize: 'clamp(44px, 7.4vw, 132px)' }}
              lang={locale}
            >
              <LetterDropTitle text={t('book.page.title.l1')} />
              <span className="display-italic text-gold"> {t('book.page.title.l2')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <OrnateDivider className="mt-10 lg:mt-14" />
          </Reveal>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="bg-ivory pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.18fr_0.82fr] gap-8 lg:gap-12 items-start">
            {/* WhatsApp — PRIMARY (first on mobile, left on desktop) */}
            <Reveal>
              <WhatsAppPanel
                onEnlarge={() => setWaOpen(true)}
                locale={locale}
                eyebrow={t('wa.primary.eyebrow')}
                title={t('wa.name')}
                body={t('wa.primary.body')}
                cta={t('wa.primary.cta')}
              />
            </Reveal>

            {/* LINE — SECONDARY (second on mobile, right on desktop) */}
            <Reveal delay={0.12}>
              <LinePanel
                onEnlarge={() => setLineOpen(true)}
                locale={locale}
                eyebrow={t('line.secondary.eyebrow')}
                handle={BRAND.lineHandle}
                body={t('line.secondary.body')}
                cta={t('line.secondary.cta')}
              />
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <p className="mt-14 lg:mt-20 text-center font-sans italic text-[15px] lg:text-[16px] text-charcoal/70 tracking-[0.02em] max-w-[44ch] mx-auto leading-[1.8]" lang={locale}>
              {t('book.page.lede')}
            </p>
          </Reveal>
        </div>
      </section>

      {waOpen && typeof document !== 'undefined' && createPortal(
        <QrModal
          src={BRAND.whatsappQrPath}
          isLocal
          eyebrow={t('wa.eyebrow')}
          scanLabel={t('wa.scan')}
          openLabel={t('wa.primary.cta')}
          href={BRAND.whatsappUrl}
          onClose={() => setWaOpen(false)}
          locale={locale}
        />,
        document.body,
      )}
      {lineOpen && typeof document !== 'undefined' && createPortal(
        <QrModal
          src={LINE_QR_SRC}
          isLocal={false}
          eyebrow="LINE"
          scanLabel={t('line.secondary.body')}
          openLabel={t('line.secondary.cta')}
          href={BRAND.lineUrl}
          onClose={() => setLineOpen(false)}
          locale={locale}
        />,
        document.body,
      )}
    </>
  );
}

/* WhatsApp — PRIMARY */
function WhatsAppPanel({
  onEnlarge,
  locale,
  eyebrow,
  title,
  body,
  cta,
}: {
  onEnlarge: () => void;
  locale: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}) {
  const t = useT();
  return (
    <div
      className="relative p-8 lg:p-12 grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center"
      style={{
        background: '#F5EFE4',
        border: '1px solid var(--gold)',
        boxShadow: '0 14px 44px -18px rgba(20, 16, 12, 0.30), 0 4px 18px rgba(20, 16, 12, 0.08)',
      }}
    >
      <span aria-hidden className="absolute pointer-events-none" style={{ top: 12, left: 12, width: 26, height: 26, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ top: 12, right: 12, width: 26, height: 26, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 12, left: 12, width: 26, height: 26, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 12, right: 12, width: 26, height: 26, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

      <button
        type="button"
        onClick={onEnlarge}
        aria-label={t('wa.enlarge')}
        className="block bg-ivory p-5 transition-transform duration-500 hover:scale-[1.02] mx-auto lg:mx-0"
        style={{ boxShadow: '0 2px 14px rgba(20,16,12,0.08)' }}
      >
        <Image
          src={BRAND.whatsappQrPath}
          alt={t('wa.eyebrow') + ' QR'}
          width={280}
          height={280}
          className="block w-[220px] h-[220px] lg:w-[280px] lg:h-[280px]"
        />
      </button>

      <div className="text-charcoal text-center lg:text-left">
        <p className="eyebrow text-gold-deep" lang={locale}>{eyebrow}</p>
        <p className="display-italic mt-4 text-charcoal leading-tight" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }} lang={locale}>
          {title}
        </p>
        <hr className="border-0 h-px bg-gold w-20 mt-6 mx-auto lg:mx-0" />
        <p className="mt-6 font-sans text-[14.5px] tracking-[0.02em] text-charcoal/85 leading-[1.85] max-w-[36ch] mx-auto lg:mx-0" lang={locale}>
          {body}
        </p>
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 px-8 py-4 font-sans text-[12px] uppercase tracking-[0.34em] transition-colors duration-500 min-h-[48px]"
          style={{ background: 'var(--gold)', color: 'var(--charcoal)', border: '1px solid var(--gold)' }}
        >
          {cta} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* LINE — SECONDARY */
function LinePanel({
  onEnlarge,
  locale,
  eyebrow,
  handle,
  body,
  cta,
}: {
  onEnlarge: () => void;
  locale: string;
  eyebrow: string;
  handle: string;
  body: string;
  cta: string;
}) {
  return (
    <div
      className="relative p-6 lg:p-8 grid grid-cols-[auto_1fr] gap-6 lg:gap-8 items-center bg-ivory"
      style={{ border: '1px solid rgba(194, 161, 77, 0.22)' }}
    >
      <button
        type="button"
        onClick={onEnlarge}
        aria-label={t('aria.tapToEnlarge')}
        className="block bg-ivory p-3 lg:p-4 transition-transform duration-500 hover:scale-[1.02]"
        style={{ border: '1px solid rgba(194, 161, 77, 0.18)' }}
      >
        <Image
          src={LINE_QR_SRC}
          alt={`LINE QR · @${handle}`}
          width={200}
          height={200}
          unoptimized
          className="block w-[160px] h-[160px] lg:w-[200px] lg:h-[200px]"
        />
      </button>

      <div className="text-charcoal">
        <p className="eyebrow text-charcoal/55" lang={locale}>{eyebrow}</p>
        <p className="display-italic mt-3 text-charcoal/85 leading-tight" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }} lang={locale}>
          @{handle}
        </p>
        <hr className="border-0 h-px bg-charcoal/15 w-14 mt-4" />
        <p className="mt-4 font-sans text-[13px] tracking-[0.02em] text-charcoal/70 leading-[1.75] max-w-[32ch]" lang={locale}>
          {body}
        </p>
        <a
          href={BRAND.lineUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-3 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.32em] transition-colors duration-500 hover:bg-charcoal hover:text-ivory min-h-[48px]"
          style={{ background: 'transparent', color: 'var(--charcoal)', border: '1px solid var(--charcoal)' }}
        >
          {cta} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

/* QR modal */
function QrModal({
  src,
  isLocal,
  eyebrow,
  scanLabel,
  openLabel,
  href,
  onClose,
  locale,
}: {
  src: string;
  isLocal: boolean;
  eyebrow: string;
  scanLabel: string;
  openLabel: string;
  href: string;
  onClose: () => void;
  locale: string;
}) {
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={eyebrow + ' QR'}
      className="fixed inset-0 z-[95] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6"
    >
      <div onClick={(e) => e.stopPropagation()} className="bg-ivory p-6 lg:p-8 max-w-md w-full text-center relative">
        {isLocal ? (
          <Image src={src} alt={eyebrow + ' QR'} width={520} height={520} className="mx-auto w-full max-w-[420px] aspect-square" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={eyebrow + ' QR'} className="mx-auto w-full max-w-[420px] aspect-square" />
        )}
        <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep" lang={locale}>
          {scanLabel}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-3 bg-charcoal text-ivory px-7 py-3 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-colors duration-500 min-h-[48px]"
        >
          {openLabel} →
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('aria.close')}
          className="absolute top-3 right-3 p-2 text-charcoal/60 hover:text-charcoal text-[11px] uppercase tracking-[0.28em]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
