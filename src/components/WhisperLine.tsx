'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  /** The whisper text — small, tracked, almost an aside. */
  children: string;
  /** Tone — gold on dark, or gold-deep on light. */
  tone?: 'dark' | 'light';
  /** Optional className override for spacing. */
  className?: string;
}

/**
 * WhisperLine — the smallest thing on the page, arriving last. Used as a
 * closing aside on every route so visitors notice the maison is still
 * speaking after the CTA.
 */
export default function WhisperLine({
  children,
  tone = 'light',
  className = 'mt-16',
}: Props) {
  const prefersReduced = useReducedMotion();
  const color = tone === 'dark' ? 'text-ivory/45' : 'text-charcoal/55';

  return (
    <motion.p
      initial={prefersReduced ? false : { opacity: 0, letterSpacing: '0.78em' }}
      whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
      viewport={{ once: true }}
      transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={`font-sans text-[9.5px] uppercase ${color} ${className}`}
    >
      {children}
    </motion.p>
  );
}
