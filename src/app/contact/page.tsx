'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from '@/components/Reveal';
import OrnateDivider from '@/components/OrnateDivider';
import GoldCornerFrame from '@/components/GoldCornerFrame';
import SparkleField from '@/components/SparkleField';
import MagneticButton from '@/components/MagneticButton';
import LetterDropTitle from '@/components/LetterDropTitle';
import CountUp from '@/components/CountUp';
import WhisperLine from '@/components/WhisperLine';
import { BRAND } from '@/lib/brand';
import { useT, useLocale } from '@/components/LanguageProvider';

const LINE_QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=480x480&margin=2&data=${encodeURIComponent(BRAND.lineUrl)}`;

/**
 * Contact page.
 *
 * Hierarchy (WhatsApp primary, LINE secondary):
 *  - WhatsApp panel comes FIRST and visually leads (larger card, full
 *    hairline gold border at brand opacity, soft drop shadow, larger QR,
 *    eyebrow "PRIMARY CHANNEL · BY APPOINTMENT", filled-gold CTA).
 *  - LINE panel comes SECOND, materially quieter (smaller QR, lighter
 *    border, no drop shadow, eyebrow "ALSO ON LINE", ghost-outline CTA).
 *
 * Instagram removed at owner's request.
 */
export default function ContactPage() {
  const t = useT();
  const [waOpen, setWaOpen] = useState(false);
  const [lineOpen, setLineOpen] = useState(false);
  const { locale } = useLocale();
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  return (
    <>
      {/* ============================== INTRO ============================== */}
      <section className="relative bg-ivory pt-40 lg:pt-48 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 30%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 35%, transparent 70%)',
          }}
        />

        <span
          aria-hidden
          className="ghost-numeral right-[5vw] top-24"
          style={{ fontSize: 'clamp(180px, 24vw, 420px)' }}
        >
          A
        </span>

        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep">
              {t('maison.label')}
            </span>
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep tabular-nums">
              Vol. <CountUp to={yearsActive} pad={2} /> · {BRAND.establishedYear}
            </span>
          </div>

          <Reveal>
            <p className="eyebrow text-gold-deep">A &nbsp;·&nbsp; {t('con.eyebrow')}</p>
            <h1
              className="display leading-[0.98] mt-4 max-w-3xl"
              style={{ fontSize: 'clamp(48px, 8vw, 160px)' }}
              lang={locale}
            >
              <LetterDropTitle text={t('con.title.l1')} />
              <span className="display-italic text-gold"> {t('con.title.l2')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <OrnateDivider className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* ============================== CHANNELS (WhatsApp primary, LINE secondary) ============================== */}
      <section className="bg-ivory pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1.18fr_0.82fr] gap-8 lg:gap-12 items-start">
            {/* WhatsApp — PRIMARY */}
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

            {/* LINE — SECONDARY */}
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

          {/* Quiet promise line */}
          <Reveal delay={0.22}>
            <p className="mt-14 lg:mt-20 text-center font-sans italic text-[14.5px] text-charcoal/70 tracking-[0.02em] max-w-[44ch] mx-auto">
              {t('book.page.lede')}
            </p>
          </Reveal>

          {/* Atelier card */}
          <Reveal delay={0.12}>
            <aside className="relative bg-charcoal text-ivory p-10 lg:p-14 overflow-hidden mt-16 lg:mt-24">
              <div
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(600px 500px at 100% 0%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 40%, transparent 75%)',
                }}
              />
              <GoldCornerFrame inset={14} size={28} thickness={1} color="rgba(216,190,126,0.55)" />
              <SparkleField count={5} tone="gold" />

              <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-start">
                <div>
                  <p className="eyebrow text-gold-light">III &nbsp;·&nbsp; {t('foot.atelier')}</p>
                  <h2
                    className="display leading-tight mt-3"
                    style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}
                  >
                    {BRAND.addressLines[0]}
                  </h2>
                  <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/90 leading-relaxed mt-3">
                    {BRAND.addressLines[1]}
                    <br />
                    {BRAND.addressLines[2]}
                  </p>
                </div>
                <dl className="space-y-5 text-[13.5px] tracking-[0.02em]">
                  <div>
                    <dt className="eyebrow text-gold-light/85">{t('foot.hours')}</dt>
                    <dd className="mt-1 text-ivory/95">{t('tag.day')}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-gold-light/85">BTS</dt>
                    <dd className="mt-1 text-ivory/95">{t('transit')}</dd>
                  </div>
                  <div className="pt-2">
                    <MagneticButton
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-light"
                    >
                      {t('wa.primary.cta')} <span className="btn-arrow">→</span>
                    </MagneticButton>
                  </div>
                </dl>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ============================== MAP ============================== */}
      <section className="bg-charcoal relative">
        <div className="relative w-full aspect-[16/8] md:aspect-[21/9]">
          <iframe
            title="Gaysorn Village map"
            src={BRAND.googleMapEmbedUrl}
            className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[1.05] brightness-95"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <GoldCornerFrame inset={28} size={36} thickness={1} color="rgba(216,190,126,0.7)" />
        </div>

        <div className="bg-charcoal text-ivory border-t border-[var(--rule-invert)]">
          <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="museum-label text-gold-light">{t('foot.atelier')}</p>
              <p className="display text-[20px] leading-snug mt-2">{BRAND.addressLines[0]}</p>
            </div>
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-ivory/65" lang={locale}>
              {t('tag.day')} &nbsp;·&nbsp; {t('transit')}
            </p>
          </div>
          <div className="text-center pb-8">
            <WhisperLine tone="dark">
              {t('misc.reply')}
            </WhisperLine>
          </div>
        </div>
      </section>

      {/* QR enlargement modals */}
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

/* ─────────────────────────────────────────────────────────────────
 *  WhatsApp panel — PRIMARY treatment
 * ───────────────────────────────────────────────────────────────── */
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
      {/* corner ornaments */}
      <span aria-hidden className="absolute pointer-events-none" style={{ top: 12, left: 12, width: 26, height: 26, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ top: 12, right: 12, width: 26, height: 26, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 12, left: 12, width: 26, height: 26, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 12, right: 12, width: 26, height: 26, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

      <button
        type="button"
        onClick={onEnlarge}
        aria-label={t('wa.enlarge')}
        className="block bg-ivory p-5 transition-transform duration-500 hover:scale-[1.02]"
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

      <div className="text-charcoal">
        <p className="eyebrow text-gold-deep" lang={locale}>{eyebrow}</p>
        <p className="display-italic mt-4 text-charcoal leading-tight" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }} lang={locale}>
          {title}
        </p>
        <hr className="border-0 h-px bg-gold w-20 mt-6" />
        <p className="mt-6 font-sans text-[14.5px] tracking-[0.02em] text-charcoal/85 leading-[1.85] max-w-[36ch]" lang={locale}>
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

/* ─────────────────────────────────────────────────────────────────
 *  LINE panel — SECONDARY treatment
 * ───────────────────────────────────────────────────────────────── */
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
        <p className="mt-4 font-sans text-[12.5px] tracking-[0.02em] text-charcoal/70 leading-[1.75] max-w-[32ch]" lang={locale}>
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

/* ─────────────────────────────────────────────────────────────────
 *  QR modal — generic
 * ───────────────────────────────────────────────────────────────── */
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
          className="mt-5 inline-flex items-center justify-center gap-3 bg-charcoal text-ivory px-7 py-3 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-colors duration-500"
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
