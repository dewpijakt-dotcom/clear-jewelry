'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * MARQUISE SEAL DRAW — the brandmark signs itself.
 *
 * The marquise outline from /public/logo.svg, redrawn as live SVG strokes.
 * On scroll into view the girdle outline draws first with a fine gold pen
 * stroke (stroke-dasharray via framer-motion pathLength), then the sixteen
 * facet lines hatch in one by one, and finally "CLEAR · 1993" inks in at
 * the centre. Reduced motion: renders fully drawn, no animation.
 */

const OUTLINE =
  'M 0 -250 C 110 -200 175 -110 195 0 C 175 110 110 200 0 250 C -110 200 -175 110 -195 0 C -175 -110 -110 -200 0 -250 Z';

const FACETS = [
  // top facets, radiating from the tip
  'M 0 -250 L -120 -50',
  'M 0 -250 L -65 -40',
  'M 0 -250 L 0 -30',
  'M 0 -250 L 65 -40',
  'M 0 -250 L 120 -50',
  // shoulders
  'M -195 0 L -120 -50',
  'M -195 0 L -120 50',
  'M 195 0 L 120 -50',
  'M 195 0 L 120 50',
  // bottom facets
  'M 0 250 L -120 50',
  'M 0 250 L -65 40',
  'M 0 250 L 0 30',
  'M 0 250 L 65 40',
  'M 0 250 L 120 50',
  // girdle lines
  'M -120 -50 L -65 -40 L 0 -30 L 65 -40 L 120 -50',
  'M -120 50 L -65 40 L 0 30 L 65 40 L 120 50',
];

export default function MarquiseSealDraw({
  className = '',
  ariaLabel = 'CLEAR 1993 brandmark',
}: {
  className?: string;
  ariaLabel?: string;
}) {
  const prefersReduced = useReducedMotion();
  const viewport = { once: true, margin: '-100px' as const };

  return (
    <svg viewBox="-230 -300 460 600" className={className} role="img" aria-label={ariaLabel}>
      {/* girdle outline — the pen stroke */}
      <motion.path
        d={OUTLINE}
        fill="none"
        stroke="var(--gold)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={prefersReduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 2.2, ease: [0.22, 0.61, 0.36, 1] }}
      />

      {/* facet hatching */}
      {FACETS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth={1.3}
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={viewport}
          transition={{
            pathLength: { duration: 0.9, delay: 1.0 + i * 0.07, ease: 'easeOut' },
            opacity: { duration: 0.2, delay: 1.0 + i * 0.07 },
          }}
        />
      ))}

      {/* the signature inks in last */}
      <motion.g
        initial={prefersReduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 1.5, delay: 2.3, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <text
          y="18"
          textAnchor="middle"
          fill="var(--gold-deep)"
          fontSize="86"
          letterSpacing="3"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontWeight: 500,
          }}
        >
          CLEAR
        </text>
        <text
          y="88"
          textAnchor="middle"
          fill="var(--gold)"
          fontSize="30"
          letterSpacing="9"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            fontStyle: 'italic',
          }}
        >
          1993
        </text>
      </motion.g>
    </svg>
  );
}
