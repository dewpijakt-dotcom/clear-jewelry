'use client';

import Link from 'next/link';
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
      label: { en: 'Direct phone', th: 'โทรตรง', zh: '直拨电话' }[locale],
      primary: BRAND.phoneDisplay,
      secondary: t('tag.day'),
      href: `tel:${BRAND.phoneTel}`,
      external: false,
    },
    {
      n: 'III',
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
    </>
  );
}
