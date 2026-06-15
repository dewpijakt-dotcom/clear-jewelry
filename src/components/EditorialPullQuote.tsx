'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import OrnateDivider from './OrnateDivider';
import SparkleField from './SparkleField';

interface Props {
  /** The big italic line. */
  quote: string;
  /** Small uppercase eyebrow above. */
  eyebrow?: string;
  /** Optional attribution under the quote. */
  attribution?: string;
  /** Background flavour. */
  variant?: 'ivory' | 'charcoal';
}

/**
 * A full-bleed editorial pull quote section. The italic display line drifts
 * up subtly as you scroll past — gives the page a Cartier-style breathing
 * moment between content bands.
 */
export default function EditorialPullQuote({
  quote,
  eyebrow,
  attribution,
  variant = 'ivory',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['28px', '-28px']);

  const isDark = variant === 'charcoal';

  return (
    <section
      ref={ref}
      className={`relative ${isDark ? 'bg-charcoal text-ivory' : 'bg-ivory text-charcoal'} py-28 lg:py-36 overflow-hidden`}
    >
      {/* Soft gold radial sheen */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(900px 700px at 50% 50%, rgba(194,161,77,0.22) 0%, rgba(194,161,77,0.05) 35%, rgba(0,0,0,0) 70%)'
            : 'radial-gradient(900px 700px at 50% 50%, rgba(194,161,77,0.20) 0%, rgba(194,161,77,0.04) 35%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* rare ambient sparkles */}
      <SparkleField count={6} tone="gold" />

      {/* enormous quotation mark, wall-painted */}
      <span
        aria-hidden
        className={`ghost-numeral ${isDark ? 'on-dark' : ''} left-1/2 -translate-x-1/2 top-2`}
        style={{ fontSize: 'clamp(200px, 26vw, 460px)', fontStyle: 'normal' }}
      >
        &ldquo;
      </span>

      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-[1180px] px-6 lg:px-10 text-center"
      >
        <OrnateDivider />
        {eyebrow && (
          <p className={`eyebrow ${isDark ? 'text-gold-light' : 'text-gold-deep'} mt-10`}>
            {eyebrow}
          </p>
        )}
        <p
          className="display-italic mt-8 leading-[1.18] max-w-[18ch] mx-auto"
          style={{ fontSize: 'clamp(36px, 5.4vw, 96px)' }}
        >
          {quote}
        </p>
        {attribution && (
          <p
            className={`font-sans text-[11px] uppercase tracking-[0.32em] mt-10 ${
              isDark ? 'text-gold-light/65' : 'text-charcoal/55'
            }`}
          >
            {attribution}
          </p>
        )}
        <OrnateDivider className="mt-12" />
      </motion.div>
    </section>
  );
}
