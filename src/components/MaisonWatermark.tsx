'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Maison watermark — a small marquise glyph + "1993" fixed in the
 * bottom-right corner of every page. The maison's quiet thumbprint that
 * says "you're in our house."
 *
 * Hidden on small screens to avoid corner-clutter. Click-through
 * (pointer-events-none) so it never intercepts taps.
 */
export default function MaisonWatermark() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
      className="hidden md:flex fixed bottom-5 right-5 z-[40] pointer-events-none items-center mix-blend-multiply"
    >
      <span
        className="font-sans text-[8.5px] tracking-[0.42em] uppercase text-gold-deep/80 tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        1993
      </span>
    </motion.div>
  );
}
