'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Wordmark from './Wordmark';

/**
 * LOADING — restrained editorial breath on an ivory ground.
 *
 * Per owner request: just the typographic wordmark — no marquise glyph,
 * no sparkle burst, no facets. The wordmark sits dead-centre and pulses
 * its opacity (0.55 → 1 → 0.55, ~1.8s, ease-in-out, infinite).
 *
 * Reduced motion: render the wordmark statically at full opacity, no
 * breathing, no dissolve fade — the screen still appears and unmounts
 * after the same total duration so the rest of the page timing is
 * unchanged.
 */
export default function LoadingScreen() {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(true);

  // Plays once on a fresh page load. The owner prefers a beat of stillness
  // here — the wordmark introduces itself before the site arrives.
  const TOTAL_MS = prefersReduced ? 900 : 1800;

  useEffect(() => {
    const id = window.setTimeout(() => setShow(false), TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [TOTAL_MS]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ivory"
          aria-hidden
        >
          {/* Soft ambient ivory paper — tonal warmth without a hard backdrop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 600px at 50% 45%, rgba(226,198,129,0.10) 0%, rgba(226,198,129,0.02) 40%, transparent 75%)',
            }}
          />

          {/* The wordmark itself — type only, breathing. */}
          <motion.div
            className="relative"
            animate={prefersReduced ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={
              prefersReduced
                ? undefined
                : { duration: 1.8, ease: [0.45, 0, 0.55, 1], repeat: Infinity }
            }
          >
            <Wordmark noIcon size="xl" variant="dark" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
