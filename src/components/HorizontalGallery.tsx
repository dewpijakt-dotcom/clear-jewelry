'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GalleryItem } from '@/lib/gallery-manifest';
import { useLocale } from './LanguageProvider';

/**
 * THE PROMENADE — a scroll-pinned horizontal gallery.
 *
 * The page pins while the visitor "walks" past the collection, the way
 * one walks the vitrine wall of a maison salon. Scroll progress maps to
 * horizontal travel; each plate hangs on a near-black wall with a museum
 * label and a hairline gold frame. A progress rail at the bottom marks
 * the visitor's place along the wall.
 *
 * Falls back to a native horizontally-scrollable strip when the visitor
 * prefers reduced motion.
 */
export default function HorizontalGallery({
  items,
  eyebrow,
  titleA,
  titleB,
}: {
  items: GalleryItem[];
  eyebrow: string;
  titleA: string;
  titleB: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { locale } = useLocale();

  // Touch / coarse pointer detection — phones get the same native horizontal
  // scroll as reduced-motion users. The scroll-pinned pattern hijacks vertical
  // swipe on mobile and feels like the page is broken.
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Travel: intro panel (100vw) + n plates — translate the track left.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-86%']);
  const railScale = scrollYProgress;

  if (prefersReduced || isTouch) {
    return (
      <section className="bg-black text-ivory py-24 overflow-hidden">
        <div className="px-6 lg:px-12 mb-10">
          <p className="eyebrow text-gold-light">{eyebrow}</p>
          <h2 className="display mt-3" style={{ fontSize: 'clamp(36px, 5vw, 80px)' }}>
            {titleA} <span className="display-italic text-gold-light">{titleB}</span>
          </h2>
        </div>
        <div className="flex gap-8 overflow-x-auto px-6 lg:px-12 pb-6 scrollbar-none">
          {items.map((item, i) => (
            <Plate key={item.src} item={item} index={i} locale={locale} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${Math.max(items.length, 4) * 90}vh` }}
      aria-label="Horizontal collection promenade"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        {/* faint wall texture + vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(1200px 800px at 50% 50%, rgba(33,30,24,0.9) 0%, rgba(10,9,8,1) 100%)',
          }}
        />
        <div className="paper-grain absolute inset-0 pointer-events-none opacity-60" />

        {/* moving track */}
        <motion.div style={{ x }} className="relative flex items-center gap-[7vw] pl-[8vw] w-max">
          {/* Intro panel */}
          <div className="w-[68vw] sm:w-[44vw] lg:w-[30vw] shrink-0 text-ivory pr-[2vw]">
            <p className="eyebrow-xl text-gold-light">{eyebrow}</p>
            <h2
              className="display leading-[1.02] mt-6"
              style={{ fontSize: 'clamp(40px, 4.8vw, 92px)' }}
            >
              {titleA}
              <span className="block display-italic text-gold-light">{titleB}</span>
            </h2>
            <span className="draw-rule wide mt-10 w-24" />
            <p className="mt-8 font-sans text-[12px] uppercase tracking-[0.32em] text-ivory/60">
              Scroll →
            </p>
          </div>

          {items.map((item, i) => (
            <Plate key={item.src} item={item} index={i} locale={locale} />
          ))}

          {/* End mark */}
          <div className="w-[30vw] shrink-0 flex flex-col items-start text-ivory/70">
            <span className="display-italic text-gold-light" style={{ fontSize: 'clamp(28px, 3vw, 52px)' }}>
              Fin.
            </span>
            <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.32em]">
              The full collection — in the gallery
            </p>
          </div>
        </motion.div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-[8vw] right-[8vw] h-px bg-gold/20">
          <motion.div
            className="h-full bg-gold-light origin-left"
            style={{ scaleX: railScale }}
          />
        </div>
        {/* wall plaque */}
        <div className="absolute top-9 left-[8vw] right-[8vw] flex justify-between text-[10px] uppercase tracking-[0.48em] text-gold-light/70">
          <span>Clear Jewelry · Bangkok</span>
          <span className="tabular-nums">Est. 1993</span>
        </div>
      </div>
    </section>
  );
}

function Plate({
  item,
  index,
  locale,
}: {
  item: GalleryItem;
  index: number;
  locale: 'en' | 'th' | 'zh';
}) {
  return (
    <figure className="relative w-[78vw] sm:w-[52vw] lg:w-[34vw] shrink-0 group">
      <div className="relative aspect-square overflow-hidden bg-graphite">
        <Image
          src={`/images/${item.dir ?? 'gallery'}/${item.src}`}
          alt={item.name[locale]}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 34vw"
          quality={90}
          className="object-cover transition-transform duration-[2200ms] ease-elegant group-hover:scale-[1.05]"
        />
        {/* hairline gold frame, inset like a hung work */}
        <span className="absolute inset-3 border border-gold/35 pointer-events-none" />
        {/* soft gallery downlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(226,198,129,0.10) 0%, transparent 30%, transparent 70%, rgba(10,9,8,0.35) 100%)',
          }}
        />
      </div>
      <figcaption className="mt-5 flex items-baseline justify-between gap-4 text-ivory">
        <div>
          <span className="block font-sans text-[9.5px] tracking-[0.48em] uppercase text-gold-light/