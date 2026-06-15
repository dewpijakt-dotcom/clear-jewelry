'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import { GalleryItem } from '@/lib/gallery-manifest';
import { useLocale } from './LanguageProvider';

/**
 * MOSAIC WALL — an editorial salon wall in multi-speed parallax.
 *
 * Two rows of photographs drift at different rates as the page scrolls,
 * the way framed works at different depths read while walking past — the
 * parallax of a real room. A floating caption block anchors the top row.
 *
 * Layout (lg, 12 cols):
 *   Row 1:  [   A (5)   ] [   B (4) ] [        CAPTION (3)        ]
 *           [   A (5)   ] [   B (4) ] [        CAPTION (3)        ]
 *
 *   Row 2:  [        D (5)        ] [        C (4)        ] [ . . ]
 *           [        D (5)        ] [        C (4)        ]
 *
 * Each frame drifts vertically at a different rate (A slowest, C fastest),
 * giving the wall depth without breaking the grid. Reduced motion: static.
 */
export default function MosaicWall({
  items,
  eyebrow,
  titleA,
  titleB,
  body,
  numeral,
}: {
  items: GalleryItem[]; // expects 4 (A, B, C, D)
  eyebrow: string;
  titleA: string;
  titleB: string;
  body: string;
  numeral?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Drift rates in pixels — A slowest, C fastest. Kept small enough to
  // avoid edge clipping at any viewport.
  const yA = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const yB = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const yC = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yD = useTransform(scrollYProgress, [0, 1], [34, -34]);

  const [a, b, c, d] = items;

  return (
    <section ref={ref} className="relative bg-ivory py-32 lg:py-44 overflow-hidden">
      {/* ghost wall-painted numeral */}
      {numeral && (
        <span
          aria-hidden
          className="display-italic absolute top-12 right-[3vw] select-none pointer-events-none"
          style={{
            fontSize: 'clamp(180px, 26vw, 460px)',
            color: 'rgba(148,116,51,0.07)',
            lineHeight: 0.85,
          }}
        >
          {numeral}
        </span>
      )}

      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* ROW 1 — A (tall), B (square), CAPTION */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {a && (
            <ParallaxFrame
              item={a}
              y={prefersReduced ? undefined : yA}
              className="lg:col-span-5 aspect-[4/5]"
              priority
            />
          )}
          {b && (
            <div className="lg:col-span-4 lg:pt-20">
              <ParallaxFrame
                item={b}
                y={prefersReduced ? undefined : yB}
                className="aspect-square"
              />
            </div>
          )}

          {/* CAPTION block — anchors top right */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:col-span-3 lg:pt-6"
          >
            <p className="eyebrow text-gold-deep">{eyebrow}</p>
            <h2
              className="display leading-[1.02] mt-5"
              style={{ fontSize: 'clamp(34px, 3.6vw, 64px)' }}
            >
              <span className="block">{titleA}</span>
              <span className="display-italic text-gold-deep block">{titleB}</span>
            </h2>
            <span className="block w-16 h-px bg-gold mt-7" />
            <p className="font-sans text-[14px] tracking-[0.02em] text-charcoal/85 leading-[1.9] mt-7 max-w-[36ch]">
              {body}
            </p>
          </motion.div>
        </div>

        {/* ROW 2 — D (wide), C (tall) */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {d && (
            <ParallaxFrame
              item={d}
              y={prefersReduced ? undefined : yD}
              className="lg:col-span-5 lg:col-start-2 aspect-[4/3]"
            />
          )}
          {c && (
            <ParallaxFrame
              item={c}
              y={prefersReduced ? undefined : yC}
              className="lg:col-span-4 lg:-mt-24 aspect-[3/4]"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ParallaxFrame({
  item,
  y,
  className,
  priority = false,
}: {
  item: GalleryItem;
  y?: MotionValue<number>;
  className?: string;
  priority?: boolean;
}) {
  const { locale } = useLocale();
  return (
    <motion.figure style={y ? { y } : undefined} className={`group ${className ?? ''}`}>
      <div className="relative w-full h-full overflow-hidden bg-cream">
        <Image
          src={`/images/${item.dir ?? 'gallery'}/${item.src}`}
          alt={item.name[locale]}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          quality={90}
          priority={priority}
          className="object-cover transition-transform duration-[2400ms] ease-elegant group-hover:scale-[1.06]"
        />
        {/* hairline gold corner brackets */}
        <span className="absolute pointer-events-none" style={{ top: 12, left: 12, width: 18, height: 18, borderTop: '1px solid rgba(226,198,129,0.65)', borderLeft: '1px solid rgba(226,198,129,0.65)' }} />
        <span className="absolute pointer-events-none" style={{ bottom: 12, right: 12, width: 18, height: 18, borderBottom: '1px solid rgba(226,198,129,0.65)', borderRight: '1px solid rgba(226,198,129,0.65)' }} />

        {/* hover dim + caption */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-700 pointer-events-none" />
        <figcaption clas