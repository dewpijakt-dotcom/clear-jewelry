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

export default function ContactPage() {
  const t = useT();
  const [qrOpen, setQrOpen] = useState(false);
  const { locale } = useLocale();
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  const CHANNELS = [
    {
      n: 'I',
      label: t('foot.line'),
      primary: BRAND.lineHandle,
      secondary: {
        en: 'Fastest reply, in Thai or English',
        th: 'ตอบกลับเร็วที่สุด ทั้งภาษาไทยและอังกฤษ',
        zh: '最快回复，泰文或英文皆可',
      }[locale],
      href: BRAND.lineUrl,
      external: true,
    },
    {
      n: 'II',
      label: t('foot.ig'),
      primary: BRAND.instagramHandle,
      secondary: {
        en: 'Every new piece, first',
        th: 'ทุกผลงานใหม่ จากที่นี่ก่อนใคร',
        zh: '每件新作 · 此处首发',
      }[locale],
      href: BRAND.instagramUrl,
      external: true,
    },
  ];

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

        {/* enormous ghost folio letter */}
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

      {/* ============================== CHANNELS + ATELIER CARD ============================== */}
      <section className="bg-ivory pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Channels */}
          <div className="space-y-10">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * i}>
                <Link
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="group block border-b border-[var(--rule-soft)] pb-10 hover:border-gold transition-colors duration-500"
                >
                  <p className="eyebrow text-gold-deep">
                    {c.n} &nbsp;·&nbsp; {c.label}
                  </p>
                  <p
                    className="display leading-tight mt-3 group-hover:text-gold transition-colors duration-500"
                    style={{ fontSize: 'clamp(28px, 3.6vw, 52px)' }}
                  >
                    {c.primary}
                  </p>
                  <p
                    className="font-sans text-[13px] tracking-[0.04em] text-charcoal/75 mt-3"
                    lang={locale}
                  >
                    {c.secondary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* WhatsApp QR card — branded, ivory paper with gold hairline */}
          <Reveal delay={0.18}>
            <aside className="lg:col-span-2">
              <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center bg-cream p-8 lg:p-12 relative"
                style={{
                  background: '#F5EFE4',
                  boxShadow: '0 4px 28px rgba(20, 16, 12, 0.08)',
                  border: '1px solid rgba(194, 161, 77, 0.30)',
                }}
              >
                {/* corner ornaments — refined L-frames */}
                <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, left: 10, width: 24, height: 24, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
                <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, right: 10, width: 24, height: 24, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  aria-label={t('wa.enlarge')}
                  className="block bg-ivory p-4 transition-transform duration-500 hover:scale-[1.02]"
                  style={{ boxShadow: '0 2px 12px rgba(20,16,12,0.06)' }}
                >
                  <Image
                    src={BRAND.whatsappQrPath}
                    alt={t('wa.eyebrow') + ' QR — ' + BRAND.lineHandle}
                    width={220}
                    height={220}
                    className="block w-[180px] h-[180px] lg:w-[220px] lg:h-[220px]"
                  />
                </button>

                <div className="text-charcoal">
                  <p className="eyebrow text-gold-deep">{t('wa.eyebrow')}</p>
                  <p className="display-italic mt-3 text-charcoal" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }} lang={locale}>
                    {t('wa.name')}
                  </p>
                  <hr className="border-0 h-px bg-gold-light/50 w-16 mt-5" />
                  <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep" lang={locale}>
                    {t('wa.scan')}
                  </p>
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light mt-6 !text-charcoal !border-charcoal hover:!bg-charcoal hover:!text-ivory"
                  >
                    {t('wa.open')} <span className="btn-arrow">→</span>
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* Atelier card */}
          <Reveal delay={0.1}>
            <aside className="relative bg-charcoal text-ivory p-10 lg:p-14 overflow-hidden">
              <div
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(600px 500px at 100% 0%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 40%, transparent 75%)',
                }}
              />
              <GoldCornerFrame inset={14} size={28} thickness={1} color="rgba(216,190,126,0.55)" />
              <SparkleField count={5} tone="gold" />

              <div className="relative">
                <p className="eyebrow text-gold-light">IV &nbsp;·&nbsp; {t('foot.atelier')}</p>
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
                <hr className="gold-rule mt-8 opacity-80" />
                <dl className="mt-8 space-y-5 text-[13.5px] tracking-[0.02em]">
                  <div>
                    <dt className="eyebrow text-gold-light/85">{t('foot.hours')}</dt>
                    <dd className="mt-1 text-ivory/95">{t('tag.day')}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-gold-light/85">BTS</dt>
                    <dd className="mt-1 text-ivory/95">{t('transit')}</dd>
                  </div>
                </dl>
                <div className="mt-10">
                  <MagneticButton
                    href={BRAND.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-light"
                  >
                    {t('foot.cta')} <span className="btn-arrow">→</span>
                  </MagneticButton>
                </div>
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

        {/* museum-label plaque beneath the map */}
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

      {/* QR enlarged modal — portaled into document.body so that the
          fixed-positioned overlay is sized against the viewport and not
          against the LoadingReveal motion wrapper's will-change-induced
          containing block (would otherwise stretch to document height
          and push the QR off-screen). */}
      {qrOpen && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setQrOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('wa.enlarge')}
          className="fixed inset-0 z-[95] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-ivory p-6 lg:p-8 max-w-md w-full text-center relative">
            <Image
              src={BRAND.whatsappQrPath}
              alt={t('wa.eyebrow') + ' QR'}
              width={520}
              height={520}
              className="mx-auto w-full max-w-[420px] aspect-square"
            />
            <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep" lang={locale}>
              {t('wa.scan')}
            </p>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-3 bg-charcoal text-ivory px-7 py-3 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-gold hover:text-charcoal transition-colors duration-500"
            >
              {t('wa.open')} →
            </a>
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 text-charcoal/60 hover:text-charcoal text-[11px] uppercase tracking-[0.28em]"
            >
              ✕
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
