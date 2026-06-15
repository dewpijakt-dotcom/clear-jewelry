'use client';

import Image from 'next/image';
import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * CURTAIN REVEAL — a scroll-linked clip-path unveiling, on an ivory ground.
 *
 * As the plate scrolls into view the photograph opens from a narrow vertical
 * slit to full bleed — the drawing of a salon curtain in a viewing room.
 * The image simultaneously settles from 1.18× to 1× so the reveal feels
 * like a camera pulling focus, not a wipe.
 *
 * White salon variant: ivory section + ivory wash over the bottom of the
 * photo so the caption reads in charcoal/gold-deep, not ivory-on-dark.
 */
export default function CurtainReveal({
  src,
  alt,
  eyebrow,
  quote,
  attribution,
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  quote: ReactNode;
  attribution?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const inset = useTransform(scrollYProgress, [0, 1], ['42%', '0%']);
  const clipPath = useTransform(inset, (v) => `inset(0% ${v} 0% ${v})`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  const { scrollYProgress: drift } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(drift, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={ref}
      className="relative h-[92svh] min-h-[620px] w-full overflow-hidden bg-ivory"
      aria-label={alt}
    >
      {/* paper grain undertone */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* hairline gold frame insets — the salon picture frame */}
      <span className="absolute pointer-events-none" style={{ top: 28, left: 28, width: 36, height: 36, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span className="absolute pointer-events-none" style={{ top: 28, right: 28, width: 36, height: 36, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
      <span className="absolute pointer-events-none" style={{ bottom: 28, left: 28, width: 36, height: 36, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
      <span className="absolute pointer-events-none" style={{ bottom: 28, right: 28, width: 36, height: 36, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

      <motion.div
        style={prefersReduced ? undefined : { clipPath }}
        className="absolute inset-0"
      >
        <motion.div style={prefersReduced ? undefined : { scale, y }} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            quality={92}
            className="object-cover object-center"
          />
        </motion.div>
        {/* IVORY wash — top a touch, bottom heavy so the caption reads */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(250,248,244,0.45) 0%, rgba(250,248,244,0.10) 30%, rgba(250,248,244,0.55) 70%, rgba(250,248,244,0.94) 100%)',
          }}
        />
      </motion.div>

      {/* caption — dark on ivory */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 lg:pb-28 px-6 text-center text-charcoal">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-160px' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative max-w-[28ch] mx-auto px-6 py-10"
        >
          {/* translucent ivory plinth so the quote reads regardless of
              what's behind it — was relying on text-shadow alone */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(closest-side, rgba(250,248,244,0.85) 0%, rgba(250,248,244,0.55) 55%, rgba(250,248,244,0) 100%)',
            }}
          />
          {eyebrow && (
            <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep mb-7">
              {eyebrow}
            </p>
          )}
          <blockquote
            className="display-italic leading-[1.15] max-w-[22ch] mx-auto text-charcoal"
            style={{
              fontSize: 'clamp(30px, 4.6vw, 76px)',
              textShadow: '0 1px 24px rgba(250,248,244,0.85)',
            }}
          >
            {quote}
          </blockquote>
          {attribution && (
            <p className="mt-8 font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep/85">
              — {attribution}
            </p>
          )}
          <span className="block w-14 h-px bg-gold/70 mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
