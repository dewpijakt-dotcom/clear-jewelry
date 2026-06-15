'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, CSSProperties, useEffect, useState } from 'react';

interface Props {
  /** The string to animate letter-by-letter. */
  text: string;
  /** Optional italic accent that fades in after the drop. */
  accent?: ReactNode;
  /** Extra delay before the first letter falls (s). Default 0.15. */
  delay?: number;
  /** Stagger between letters (s). Default 0.11 desktop, 0.06 mobile. */
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  /** Tone of the camera-flash sparkle on landing. */
  sparkleColor?: string;
  /** Optional lang attr. */
  lang?: string;
}

/**
 * LetterDropTitle — each glyph drops in from above through a soft blur,
 * landing with a brief camera-flash sparkle. After the drop, an optional
 * italic accent (e.g. a tagline or year) fades in.
 *
 * Used as the signature h1 entrance across all pages so every route feels
 * like the same maison opening its doors.
 */
export default function LetterDropTitle({
  text,
  accent,
  delay = 0.15,
  stagger,
  className = '',
  style,
  sparkleColor = 'rgb(226 198 129)',
  lang,
}: Props) {
  const prefersReduced = useReducedMotion();
  // Detect mobile so we can tighten the stagger and compress the hero
  // entrance for impatient phone visitors.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const effectiveStagger = stagger ?? (isMobile ? 0.06 : 0.11);
  const letters = Array.from(text);
  const lastDelay = delay + (letters.length - 1) * effectiveStagger;

  return (
    <span
      aria-label={text}
      className={`inline-block ${className}`}
      style={style}
      lang={lang}
    >
      <span aria-hidden className="inline-block whitespace-nowrap">
        {letters.map((ch, i) => {
          const d = delay + i * effectiveStagger;
          // Render explicit non-breaking space for spaces so the spacing holds
          const display = ch === ' ' ? ' ' : ch;
          return (
            <span key={i} className="relative inline-block">
              <motion.span
                initial={
                  prefersReduced
                    ? false
                    : { opacity: 0, y: '-0.55em', filter: 'blur(10px)' }
                }
                animate={{ opacity: 1, y: '0em', filter: 'blur(0px)' }}
                transition={{ duration: 0.95, delay: d, ease: [0.22, 0.61, 0.36, 1] }}
                className="inline-block"
              >
                {display}
              </motion.span>
              {!prefersReduced && ch !== ' ' && (
                <motion.svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    top: '0.05em',
                    right: '-0.05em',
                    width: '0.18em',
                    height: '0.18em',
                  }}
                  initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.35], rotate: 60 }}
                  transition={{ duration: 0.8, delay: d + 0.78, ease: 'easeOut' }}
                >
                  <path
                    d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z"
                    fill={sparkleColor}
                  />
                </motion.svg>
              )}
            </span>
          );
        })}
      </span>
      {accent && (
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: lastDelay + 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-block"
        >
          {accent}
        </motion.span>
      )}
    </span>
  );
}
