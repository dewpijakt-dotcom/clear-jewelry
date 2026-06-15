'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * VAULT REVEAL — the maison's locket breaks open on scroll.
 *
 * Two charcoal vault doors meet at a gold seam, sealed with a marquise
 * wax-seal glyph split across the join. As the visitor scrolls the section
 * toward centre-screen, the doors slide apart — each carrying its half of
 * the broken seal — and the season's centerpiece photograph is revealed,
 * settling from 1.18× to 1× like a camera pulling focus. A museum caption
 * fades up once the doors have cleared.
 *
 * One scroll tracker drives everything (doors, scale, chrome, caption).
 * Reduced motion: renders the open vault as a static plate.
 */

function SealGlyph({ size = 148 }: { size?: number }) {
  return (
    <svg viewBox="-210 -270 420 540" width={size} height={size * 1.28} aria-hidden>
      {/* marquise body */}
      <path
        d="M 0 -250 C 110 -200 175 -110 195 0 C 175 110 110 200 0 250 C -110 200 -175 110 -195 0 C -175 -110 -110 -200 0 -250 Z"
        fill="rgba(10,9,8,0.92)"
        stroke="#E2C681"
        strokeWidth="3"
      />
      {/* inner hairline */}
      <path
        d="M 0 -206 C 90 -165 144 -91 161 0 C 144 91 90 165 0 206 C -90 165 -144 91 -161 0 C -144 -91 -90 -165 0 -206 Z"
        fill="none"
        stroke="rgba(148,116,51,0.85)"
        strokeWidth="1.4"
      />
      <text
        y="8"
        textAnchor="middle"
        fill="#E2C681"
        fontSize="84"
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontStyle: 'italic',
        }}
      >
        C
      </text>
      <text
        y="70"
        textAnchor="middle"
        fill="rgba(226,198,129,0.85)"
        fontSize="30"
        letterSpacing="8"
        style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
      >
        1993
      </text>
    </svg>
  );
}

export default function VaultReveal({
  src,
  alt,
  eyebrow,
  hint,
  caption,
  label,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  hint: string;
  caption: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const doorL = useTransform(scrollYProgress, [0.18, 0.95], ['0%', '-102%']);
  const doorR = useTransform(scrollYProgress, [0.18, 0.95], ['0%', '102%']);
  const photoScale = useTransform(scrollYProgress, [0.18, 1], [1.18, 1]);
  const chromeOpacity = useTransform(scrollYProgress, [0.18, 0.42], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.72, 0.96], [0, 1]);
  const captionShift = useTransform(scrollYProgress, [0.72, 0.96], [26, 0]);

  if (prefersReduced) {
    return (
      <section
        className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-black"
        aria-label={alt}
      >
        <Image src={src} alt={alt} fill sizes="100vw" quality={92} className="object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.45) 0%, rgba(10,9,8,0.08) 40%, rgba(10,9,8,0.80) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 pb-16 px-6 text-center text-ivory">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-light mb-5">{eyebrow}</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.48em] text-gold-light/85">{label}</p>
          <p
            className="display-italic mt-4 max-w-[30ch] mx-auto leading-[1.25]"
            style={{ fontSize: 'clamp(22px, 3vw, 42px)', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
          >
            {caption}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black"
      aria-label={alt}
    >
      {/* the treasure inside */}
      <motion.div style={{ scale: photoScale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="100vw" quality={92} className="object-cover object-center" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,9,8,0.45) 0%, rgba(10,9,8,0.05) 40%, rgba(10,9,8,0.80) 100%)',
        }}
      />

      {/* museum caption — fades up once the doors have cleared */}
      <motion.div
        style={{ opacity: captionOpacity, y: captionShift }}
        className="absolute inset-x-0 bottom-0 z-10 pb-16 lg:pb-20 px-6 text-center text-ivory"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.48em] text-gold-light/85">{label}</p>
        <p
          className="display-italic mt-4 max-w-[30ch] mx-auto leading-[1.25]"
          style={{ fontSize: 'clamp(22px, 3vw, 42px)', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
        >
          {caption}
        </p>
        <span className="block w-14 h-px bg-gold-light/70 mx-auto mt-7" />
      </motion.div>

      {/* left vault door — carries the left half of the seal */}
      <motion.div style={{ x: doorL }} className="absolute inset-y-0 left-0 w-1/2 z-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, #0E0D0B 0%, #1A1815 70%, #26221A 100%)' }}
        />
        <span className="absolute inset-y-10 right-12 w-px bg-gold/15" />
        <span className="absolute inset-y-0 right-0 w-px bg-gold-light/60" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
          <SealGlyph />
        </div>
      </motion.div>

      {/* right vault door — carries the right half of the seal */}
      <motion.div style={{ x: doorR }} className="absolute inset-y-0 right-0 w-1/2 z-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(270deg, #0E0D0B 0%, #1A1815 70%, #26221A 100%)' }}
        />
        <span className="absolute inset-y-10 left-12 w-px bg-gold/15" />
        <span className="absolute inset-y-0 left-0 w-px bg-gold-light/60" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2">
          <SealGlyph />
        </div>
      </motion.div>

      {/* chrome above the doors — eyebrow + scroll hint, fades as it opens */}
      <motion.div
        style={{ opacity: chromeOpacity }}
        className="absolute top-[13%] inset-x-0 z-30 flex flex-col items-center gap-4 pointer-events-none text-center px-6"
      >
        <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-light">{eyebrow}</p>
        <span className="block w-px h-10 bg-gold-light/50" />
        <p className="font-sans text-[9.5px] uppercase tracking-[0.4em] text-ivory/50">{hint}</p>
      </motion.div>
    </section>
  );
}
