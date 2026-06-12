'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/lib/brand';
import { GALLERY } from '@/lib/gallery-manifest';
import Reveal from '@/components/Reveal';
import GalleryShowcaseClient from '@/components/GalleryShowcaseClient';
import GoldCornerFrame from '@/components/GoldCornerFrame';
import OrnateDivider from '@/components/OrnateDivider';
import BrandMarquee from '@/components/BrandMarquee';
import StonesOfNote from '@/components/StonesOfNote';
import EditorialPullQuote from '@/components/EditorialPullQuote';
import MosaicWall from '@/components/MosaicWall';
import HorizontalGallery from '@/components/HorizontalGallery';
import CurtainReveal from '@/components/CurtainReveal';
import SparkleField from '@/components/SparkleField';
import MagneticButton from '@/components/MagneticButton';
import GoldSweepHeading from '@/components/GoldSweepHeading';
import VaultReveal from '@/components/VaultReveal';
import MarquiseSealDraw from '@/components/MarquiseSealDraw';
import { useT, useLocale } from '@/components/LanguageProvider';

/**
 * HOME — a gallery you walk through, not a page you read.
 *
 *   Hero (cinematic, slow-settle) → BrandMarquee → Trust strip
 *   → Editorial pull quote (manifesto)
 *   → I.   Signature pieces (museum catalog)
 *   → II.  Worn — parallax mosaic wall (the collection in daylight)
 *   → III. The Promenade — scroll-pinned horizontal gallery (night salon)
 *   → IV.  Stones of note (chromatic band)
 *   → ✦    Curtain reveal — toi-et-moi plate, maison credo
 *   → V.   Heritage band (charcoal)
 *   → VI.  Atelier seal
 *   → VII. Closing CTA (over the dark CLEAR plate)
 */

const bySrc = (src: string) => GALLERY.find((g) => g.src === src)!;

export default function HomePage() {
  const t = useT();
  const { locale } = useLocale();
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);
  // foreground type drifts faster than the photograph — diorama depth
  const heroTypeY = useTransform(scrollYProgress, [0, 1], ['0%', '34%']);

  const signature = GALLERY.slice(0, 6);
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  // II — Worn: lifestyle / on-model photographs
  const mosaic = [
    bySrc('editorial-sapphire-suite-close.jpg'),
    bySrc('solitaire-pear-bypass-rings-face.jpg'),
    bySrc('ruby-stud-pave-band-detail.jpg'),
    bySrc('editorial-sapphire-suite-white.jpg'),
  ].filter(Boolean);

  // III — Promenade: strong studio plates for the dark salon wall
  const promenade = [
    bySrc('royal-blue-sapphire-three-stone.jpg'),
    bySrc('yellow-blue-sapphire-orbit-earring.jpg'),
    bySrc('sapphire-ruby-trinity-rings.jpg'),
    bySrc('diamond-y-necklace-black.jpg'),
    bySrc('diamond-tennis-bracelet-pear.jpg'),
    bySrc('diamond-floral-choker-neck.jpg'),
    bySrc('ruby-bypass-yellow-diamond-ear.jpg'),
  ].filter(Boolean);

  const trust = [
    { l: t('trust.gia.l'), d: t('trust.gia.d') },
    { l: t('trust.un.l'),  d: t('trust.un.d')  },
    { l: t('trust.bp.l'),  d: t('trust.bp.d')  },
    { l: t('trust.yr.l'),  d: t('trust.yr.d')  },
  ];

  // ---- Locale copy for the new gallery acts ----
  const QUOTE_1: Record<typeof locale, string> = {
    en: '“Quietly. Well. Since 1993.”',
    th: '“อย่างเงียบ ประณีต ตั้งแต่ปี 1993”',
    zh: '“沉静 · 精致 · 自1993年”',
  };
  const CREDO: Record<typeof locale, string> = {
    en: '“The stone first. Everything else, in service of the colour.”',
    th: '“อัญมณีมาก่อน ทุกอย่างที่เหลือ — เพื่อรับใช้สีของมัน”',
    zh: '“宝石为先。其余一切 — 皆为彩色而生。”',
  };
  const WORN = {
    eyebrow: { en: 'II · Worn', th: 'II · ขณะสวมใส่', zh: 'II · 佩戴' },
    titleA:  { en: 'Made to be', th: 'สร้างมาเพื่อ', zh: '为生活' },
    titleB:  { en: 'lived in.', th: 'ใช้ชีวิตด้วย', zh: '而作' },
    body: {
      en: 'Not vault jewelry. Our pieces are photographed the way they are worn — at breakfast, at the ear, in motion, in daylight.',
      th: 'ไม่ใช่เครื่องประดับในตู้นิรภัย ผลงานของเราถูกถ่ายภาพอย่างที่ถูกสวมใส่จริง — ยามอาหารเช้า บนใบหู ระหว่างการเคลื่อนไหว ใต้แสงธรรมชาติ ครับ',
      zh: '不是保险柜里的珠宝。我们的作品以佩戴的姿态入镜 — 早餐时分、耳畔、举手投足之间、日光之下。',
    },
  };
  const PROM = {
    eyebrow: { en: 'III · The Promenade', th: 'III · เดินชมคอลเลกชัน', zh: 'III · 漫步藏品' },
    titleA:  { en: 'Walk the', th: 'เดินชม', zh: '漫步' },
    titleB:  { en: 'collection.', th: 'คอลเลกชัน', zh: '臻品之间' },
  };

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-charcoal"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          {/* slow settle: the photograph breathes in on arrival */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="/images/gallery/sapphire-floral-choker-black.jpg"
              alt="Marquise diamond drop earrings by CLEAR Jewelry"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          </motion.div>

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,11,10,0.80) 0%, rgba(12,11,10,0.32) 22%, rgba(12,11,10,0.28) 55%, rgba(12,11,10,0.90) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 700px at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </motion.div>

        {/* drifting stage spotlight scanning the centerpiece */}
        <div aria-hidden className="spotlight-wedge hidden md:block" />

        {/* rare ambient sparkles drifting over the plate */}
        <SparkleField count={6} tone="gold" />

        <GoldCornerFrame inset={28} size={36} thickness={1} />

        {/* Top annotations */}
        <div className="absolute top-[110px] left-0 right-0 z-10 px-6 lg:px-12 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-light/90"
          >
            Maison · Atelier
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-light/90 tabular-nums"
          >
            Vol. <CountUpYears to={yearsActive} /> · Est. {BRAND.establishedYear}
          </motion.span>
        </div>

        {/* Centerpiece — drifts faster than the photograph (diorama depth) */}
        <motion.div
          style={prefersReduced ? undefined : { y: heroTypeY }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-ivory text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -10, letterSpacing: '0.7em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.42em' }}
            transition={{ duration: 1.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-sans text-[11px] uppercase text-gold-light mb-8"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
          >
            {t('hero.eyebrow')}
          </motion.p>

          {/* The wordmark arrives letter by letter, each landing with a flash */}
          <h1
            aria-label={`${BRAND.wordmark} ${BRAND.wordmarkSubtitle} — ${t('hero.title.l1')} ${t('hero.title.l2')}`}
            className="display font-light leading-[0.92] tracking-[-0.012em]"
            style={{
              fontSize: 'clamp(64px, 13vw, 230px)',
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}
          >
            <LetterDropWordmark word={BRAND.wordmark} />
            <motion.span
              aria-hidden
              className="block font-sans font-light uppercase text-gold-light mt-3"
              style={{ fontSize: 'clamp(12px, 1.5vw, 19px)' }}
              initial={prefersReduced ? false : { opacity: 0, letterSpacing: '0.95em' }}
              animate={{ opacity: 1, letterSpacing: '0.58em' }}
              transition={{ duration: 1.9, delay: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {BRAND.wordmarkSubtitle}
            </motion.span>
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 1.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="display-italic text-gold-light mt-7"
            style={{ fontSize: 'clamp(22px, 3.2vw, 44px)', textShadow: '0 1px 18px rgba(0,0,0,0.5)' }}
            lang={locale}
          >
            {t('hero.title.l1')} {t('hero.title.l2')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            className="relative mt-10 max-w-2xl mx-auto"
          >
            <span
              className="absolute -inset-x-8 -inset-y-5 -z-10"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(12,11,10,0.55) 0%, rgba(12,11,10,0.25) 60%, rgba(12,11,10,0) 100%)',
              }}
            />
            <p
              className="font-sans text-[14.5px] tracking-[0.02em] text-ivory leading-relaxed"
              lang={locale}
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.45)' }}
            >
              {t('hero.lede')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.05 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              href={BRAND.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-light"
            >
              {t('hero.cta.book')} <span className="btn-arrow">→</span>
            </MagneticButton>
            <Link
              href="/gallery"
              className="font-sans text-[12px] uppercase tracking-[0.28em] text-ivory hover:text-gold-light transition-colors duration-500 underline underline-offset-8 decoration-gold/60 decoration-[0.5px] pt-3 sm:pt-0"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.45)' }}
            >
              {t('hero.cta.gallery')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-gold-light/85 text-[10px] tracking-[0.32em] uppercase">
            {t('hero.scroll')}
          </span>
          <motion.span
            className="block w-[1px] h-12 bg-gold-light/60 origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ============================== BRAND MARQUEE ============================== */}
      <BrandMarquee />

      {/* ============================== TRUST STRIP ============================== */}
      <section className="bg-ivory border-b border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {trust.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="text-center lg:text-left">
                  <p className="display text-[26px] leading-tight text-charcoal">{s.l}</p>
                  <span className="block w-10 h-px bg-gold mt-3 mx-auto lg:mx-0" />
                  <p className="font-sans text-[11.5px] tracking-[0.14em] uppercase text-gold-deep mt-3">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== EDITORIAL PULL QUOTE ============================== */}
      <EditorialPullQuote
        eyebrow="Manifesto"
        quote={QUOTE_1[locale]}
        attribution="Atelier Clear · Bangkok"
      />

      {/* ============================== ✦ — THE VAULT OPENS ============================== */}
      <VaultReveal
        src="/images/gallery/diamond-toi-et-moi-ring-velvet.jpg"
        alt={t('vault.caption')}
        eyebrow={t('vault.eyebrow')}
        hint={t('vault.hint')}
        caption={t('vault.caption')}
        label={t('vault.label')}
      />

      {/* ============================== I — SIGNATURE PIECES ============================== */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <p className="eyebrow text-gold-deep">I &nbsp;·&nbsp; {t('sig.eyebrow')}</p>
                <h2
                  className="display leading-[0.98] mt-4 max-w-3xl"
                  style={{ fontSize: 'clamp(40px, 6vw, 100px)' }}
                  lang={locale}
                >
                  {t('sig.title.l1')}
                  <span className="display-italic text-gold"> {t('sig.title.l2')}</span>
                </h2>
              </div>
              <p
                className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/80 max-w-md leading-relaxed lg:text-right lg:self-end"
                lang={locale}
              >
                {t('sig.body')}
              </p>
            </div>
            <hr className="gold-rule mt-10" />
          </Reveal>

          <GalleryShowcaseClient items={signature} />

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link href="/gallery" className="btn">
                {t('sig.viewall')} <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== II — WORN (MOSAIC WALL) ============================== */}
      <MosaicWall
        items={mosaic}
        eyebrow={WORN.eyebrow[locale]}
        titleA={WORN.titleA[locale]}
        titleB={WORN.titleB[locale]}
        body={WORN.body[locale]}
        numeral="II"
      />

      {/* ============================== III — THE PROMENADE ============================== */}
      <HorizontalGallery
        items={promenade}
        eyebrow={PROM.eyebrow[locale]}
        titleA={PROM.titleA[locale]}
        titleB={PROM.titleB[locale]}
      />

      {/* ============================== IV — STONES OF NOTE ============================== */}
      <StonesOfNote />

      {/* ============================== ✦ — CURTAIN REVEAL ============================== */}
      <CurtainReveal
        src="/images/gallery/spinel-pear-diamond-bypass-velvet.jpg"
        alt="Ruby and emerald toi-et-moi ring by CLEAR Jewelry"
        eyebrow="In our own words"
        quote={CREDO[locale]}
        attribution="Maison Clear · Bangkok"
      />

      {/* ============================== V — HERITAGE BAND ============================== */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 50%, rgba(194,161,77,0.25) 0%, rgba(194,161,77,0.05) 35%, rgba(0,0,0,0) 70%)',
          }}
        />
        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <p className="eyebrow text-gold-light">V &nbsp;·&nbsp; {t('her.eyebrow')}</p>
            <h2
              className="display leading-[1.0] mt-4"
              style={{ fontSize: 'clamp(40px, 6vw, 100px)' }}
              lang={locale}
            >
              {t('her.title.l1')}
              <span className="block display-italic text-gold-light">
                {t('her.title.l2')}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              className="font-sans text-[15.5px] tracking-[0.02e