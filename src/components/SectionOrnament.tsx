'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  /** Tone — light section or dark section. */
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * SECTION ORNAMENT — a thin gold hairline with a small marquise diamond at
 * the centre. Sits between major sections as a page-break ornament, like
 * the ones printed in fine maison catalogues. Draws in on scroll.
 *
 * Inserted manually wherever you want a quiet visual breath.
 */
export default function SectionOrnament({ variant = 'light', className = '' }: Props) {
  const prefersReduced = useReducedMotion();
  const stroke = variant === 'dark' ? 'var(--gold-light)' : 'var(--gold-deep)';
  const ruleColor = variant === 'dark' ? 'var(--rule-invert)' : 'var(--rule)';

  return (
    <div className={`relative flex items-center justify-center py-10 ${className}`}>
      <motion.span
        initial={prefersReduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, ease: [0.22, 0.61, 0.36, 1] }}
        className="h-px flex-1 origin-right"
        style={{ background: ruleColor }}
      />
      <motion.svg
        initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        viewBox="-50 -70 100 140"
        width="14"
        height="20"
        className="mx-4 flex-none"
        aria-hidden
      >
        <path
          d="M 0 -60 C 24 -42 38 -22 42 0 C 38 22 24 42 0 60 C -24 42 -38 22 -42 0 C -38 -22 -24 -42 0 -60 Z"
          fill={stroke}
          opacity={0.9}
        />
      </motion.svg>
      <motion.span
        initial={prefersReduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, ease: [0.22, 0.61, 0.36, 1] }}
        className="h-px flex-1 origin-left"
        style={{ background: ruleColor }}
      />
    </div>
  );
}
