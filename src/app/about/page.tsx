'use client';

import Reveal from '@/components/Reveal';
import Wordmark from '@/components/Wordmark';
import OrnateDivider from '@/components/OrnateDivider';
import CinematicPlate from '@/components/CinematicPlate';
import MagneticButton from '@/components/MagneticButton';
import MarquiseSealDraw from '@/components/MarquiseSealDraw';
import LetterDropTitle from '@/components/LetterDropTitle';
import CountUp from '@/components/CountUp';
import WhisperLine from '@/components/WhisperLine';
import { BRAND } from '@/lib/brand';
import { useT, useLocale } from '@/components/LanguageProvider';

export default function AboutPage() {
  const t = useT();
  const { locale } = useLocale();
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  const steps = [
    { n: '01', t: t('bsp.steps.1.t'), b: t('bsp.steps.1.b') },
    { n: '02', t: t('bsp.steps.2.t'), b: t('bsp.steps.2.b') },
    { n: '03', t: t('bsp.steps.3.t'), b: t('bsp.steps.3.b') },
    { n: '04', t: t('bsp.steps.4.t'), b: t('bsp.steps.4.b') },
  ];

  return (
    <>
      {/* ============================== I · THE MAISON ============================== */}
      <section className="relative bg-ivory pt-40 lg:pt-48 pb-20 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 30%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 35%, transparent 70%)',
          }}
        />

        {/* enormous act numeral, wall-painted */}
        <span
          aria-hidden
          className="ghost-numeral right-[4vw] top-24"
          style={{ fontSize: 'clamp(180px, 24vw, 420px)' }}
        >
          I
        </span>

        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep">
              Maison · Atelier
            </span>
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep tabular-nums">
              Vol. <CountUp to={yearsActive} pad={2} /> · {BRAND.establishedYear}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-end">
            <Reveal>
              <p className="eyebrow text-gold-deep">I &nbsp;·&nbsp; {t('mai.eyebrow')}</p>
              <h1
                className="display leading-[0.96] mt-4 tracking-[-0.012em]"
                style={{ fontSize: 'clamp(48px, 8vw, 160px)' }}
                lang={locale}
              >
                <LetterDropTitle text={t('mai.title.l1')} />
                <span className="display-italic text-gold"> {t('mai.title.l2')}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p
                className="dropcap font-sans text-[15.5px] tracking-[0.02em] text-charcoal/85 leading-[1.9]"
                lang={locale}
              >
                {t('mai.opening')}
              </p>
              <hr className="gold-rule mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <OrnateDivider className="mt-16" />
          </Reveal>
        </div>
      </section>

      {/* ============================== II · PHILOSOPHY ============================== */}
      <section className="relative bg-ivory pb-32 lg:pb-40 overflow-hidden">
        <span
          aria-hidden
          className="ghost-numeral left-[2vw] -top-10"
          style={{ fontSize: 'clamp(160px, 20vw, 380px)' }}
        >
          II
        </span>
        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            {/* brandmark draws itself in gold pen on scroll */}
            <div className="relative aspect-square max-w-[460px] mx-auto w-full flex items-center justify-center">
              <MarquiseSealDraw className="w-full h-full" ariaLabel={`${BRAND.name} brandmark`} />
              <span
                className="absolute -inset-6 rounded-full -z-10 pointer-events-none breathe"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(194,161,77,0.22) 0%, rgba(194,161,77,0.05) 60%, transparent 100%)',
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow text-gold-deep mb-4">II &nbsp;·&nbsp; {t('phi.eyebrow')}</p>
            <h2
              className="display leading-[1.06]"
              style={{ fontSize: 'clamp(32px, 4.6vw, 68px)' }}
              lang={locale}
            >
              {t('phi.title')}
            </h2>
            <p
              className="font-sans text-[15px] tracking-[0.02em] text-charcoal/85 leading-[1.9] mt-8"
              lang={locale}
            >
              {t('phi.body')}
            </p>
            <hr className="gold-rule mt-10" />
          </Reveal>
        </div>
      </section>

      {/* ============================== INTERLUDE · CINEMATIC PLATE ============================== */}
      <CinematicPlate
        src="/images/gallery/editorial-ruby-parure-black.jpg"
        alt="Pear diamond vine earring, worn — CLEAR Jewelry"
        eyebrow={t('abt.plate.eyebrow')}
        title={
          <>
            {t('abt.plate.title.l1')}
            <span className="display-italic text-gold-light"> {t('abt.plate.title.l2')}</span>
          </>
        }
        body={t('abt.plate.body')}
        align="left"
        tone="dark"
        height="short"
      />

      {/* ============================== III · BESPOKE ============================== */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 50%, rgba(194,161,77,0.25) 0%, rgba(194,161,77,0.05) 35%, rgba(0,0,0,0) 70%)',
          }}
        />
        <span
          aria-hidden
          className="ghost-numeral on-dark right-[3vw] top-6"
          style={{ fontSize: 'clamp(160px, 20vw, 380px)' }}
        >
          III
        </span>
        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="eyebrow text-gold-light">III &nbsp;·&nbsp; {t('bsp.eyebrow')}</p>
            <h2
              className="display leading-[1.04] mt-4"
              style={{ fontSize: 'clamp(36px, 5vw, 88px)' }}
              lang={locale}
            >
              {t('bsp.title')}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ol className="space-y-10 mt-2">
              {steps.map((step) => (
                <li key={step.n} className="grid grid-cols-[60px_1fr] gap-6 items-start">
                  <span className="display-italic text-gold-light text-3xl">{step.n}</span>
                  <div>
                    <h3 className="display text-2xl">{step.t}</h3>
                    <p
                      className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/90 mt-2 leading-relaxed"
