'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/lib/brand';

/**
 * LOADING — editorial reveal on an ivory ground.
 *
 *  - Per letter of "CLEAR" then "JEWELRY · EST. 1993", fade in 0→1
 *    opacity and lift translateY(8px)→0 with a 90ms stagger.
 *  - After the type lands, a 1px gold hairline rule draws left→right
 *    underneath the wordmark over ~600ms.
 *  - 300ms hold, then the whole composition dissolves over 600ms.
 *
 * Cumulative: 2400ms display + 600ms exit = 3.0s total reveal.
 * Plays on every navigation (no sessionStorage gate) — the user
 * wants the brand moment every time the site is entered.
 *
 * IMPORTANT — anti-stuck pattern:
 *  The outer wrapper is a plain conditional render. An earlier version
 *  used <AnimatePresence><motion.div exit={{opacity:0}}> for the fade
 *  out, but on the Vercel production build that exit hung at opacity:1
 *  forever, leaving an opaque ivory cover over the entire site.
 *  We now drive the fade with a CSS @keyframes animation that has
 *  `animation-fill-mode: forwards` (lr-fade-out class in globals.css),
 *  and use a second timer to flip `show` to false AFTER the CSS fade
 *  completes. `if (!show) return null` then unmounts the component
 *  reliably — no framer-motion AnimatePresence exit lifecycle to hang.
 */
export default function LoadingScreen() {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  const wordmark = BRAND.wordmark || 'CLEAR';
  const subtitle = `${BRAND.wordmarkSubtitle || 'JEWELRY'} · Est. ${BRAND.establishedYear || 1993}`;

  // Pre-split for the stagger animation.
  const wordmarkChars = useMemo(() => wordmark.split(''), [wordmark]);
  const subtitleChars = useMemo(() => subtitle.split(''), [subtitle]);

  // 2400ms display + 600ms CSS fade-out = 3000ms total.
  // Reduced motion still gets a short hold so the brand moment is
  // not completely skipped.
  const DISPLAY_MS = prefersReduced ? 700 : 2400;
  const FADE_MS = prefersReduced ? 200 : 600;

  useEffect(() => {
    if (!show) return;
    const fadeId = window.setTimeout(() => setFading(true), DISPLAY_MS);
    const unmountId = window.setTimeout(() => setShow(false), DISPLAY_MS + FADE_MS);
    return () => {
      window.clearTimeout(fadeId);
      window.clearTimeout(unmountId);
    };
  }, [DISPLAY_MS, FADE_MS, show]);

  if (!show) return null;

  const easing = [0.22, 0.61, 0.36, 1] as const;

  const charBase = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-ivory ${fading ? 'lr-fade-out' : ''}`}
      style={fading ? { animationDuration: `${FADE_MS}ms` } : undefined}
      aria-hidden
    >
      {/* Warm radial sheen — quiet paper depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 600px at 50% 45%, rgba(226,198,129,0.12) 0%, rgba(226,198,129,0.02) 40%, transparent 75%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* CLEAR — display serif, letter-by-letter */}
        <div
          className="display flex"
          aria-label={wordmark}
          style={{
            fontWeight: 500,
            letterSpacing: '0.24em',
            fontSize: 'clamp(40px, 7vw, 96px)',
            color: 'var(--charcoal)',
            lineHeight: 1,
          }}
        >
          {wordmarkChars.map((ch, i) => (
            <motion.span
              key={`w${i}`}
              initial={prefersReduced ? false : charBase.initial}
              animate={prefersReduced ? { opacity: 1, y: 0 } : charBase.animate}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.55, ease: easing, delay: 0.08 + i * 0.09 }
              }
              style={{ display: 'inline-block' }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        {/* JEWELRY · Est. 1993 — sans, finer stagger */}
        <div
          className="flex mt-3"
          aria-label={subtitle}
          style={{
            fontFamily: 'var(--font-jost), Jost, sans-serif',
            textTransform: 'uppercase',
            fontWeight: 400,
            letterSpacing: '0.42em',
            fontSize: 'clamp(10px, 1.2vw, 13px)',
            color: 'var(--gold-deep)',
            lineHeight: 1,
          }}
        >
          {subtitleChars.map((ch, i) => (
            <motion.span
              key={`s${i}`}
              initial={prefersReduced ? false : { opacity: 0, y: 6 }}
              animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.45, ease: easing, delay: 0.55 + i * 0.025 }
              }
              style={{ display: 'inline-block', whiteSpace: 'pre' }}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        {/* Gold hairline rule — draws left→right after the type lands */}
        <motion.div
          className="mt-6 h-px bg-gold-deep origin-left"
          style={{ width: 'clamp(120px, 14vw, 220px)' }}
          initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.6, ease: easing, delay: 0.85 }
          }
        />
      </div>
    </div>
  );
}
