'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * LOADING — a gilt ceremony, ivory ground.
 *
 * The maison's brandmark draws itself in front of you in a single
 * uninterrupted ritual on a warm cream paper field: hairlines settle, a
 * thin vertical beam of gold light appears, the marquise diamond outline
 * pen-draws around it, sixteen facet lines hatch in, "CLEAR" inks at the
 * centre in deep gold, "1993" italic settles beneath, a sparkle burst
 * radiates outward, and a whisper line arrives. Then the whole composition
 * rises and dissolves into the site.
 *
 * Total: ~3.4s of ceremony + 0.95s dissolve. Reduced motion: skips.
 */
export default function LoadingScreen() {
  // Plays on every fresh page load. The owner prefers ceremony over speed
  // here — the gilt opening is part of the brand, not just a perf concession.
  const [show, setShow] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setShow(false);
      return;
    }
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';

    // 2.6s ceremony + 0.7s dissolve. Same tight pacing as before.
    const timer = window.setTimeout(() => setShow(false), 2600);

    return () => {
      window.clearTimeout(timer);
      html.style.overflow = prev;
    };
  }, [prefersReduced]);

  const yearsActive = new Date().getFullYear() - 1993;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = '';
      }}
    >
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Soft warm radial — paper warming under a single lamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.65] }}
            transition={{ duration: 2.2, times: [0, 0.55, 1], ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(720px 560px at 50% 50%, rgba(226,198,129,0.32) 0%, rgba(194,161,77,0.10) 35%, rgba(250,248,244,0) 72%)',
            }}
          />

          {/* Subtle paper grain */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
            }}
          />

          {/* TOP HAIRLINE drawing right */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute top-[7%] left-[7%] right-[7%] h-px bg-gold/55 origin-left"
          />
          {/* BOTTOM HAIRLINE drawing left */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 0.05, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute bottom-[7%] left-[7%] right-[7%] h-px bg-gold/55 origin-right"
          />

          {/* CORNER ANNOTATIONS */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-[7%] left-[7%] translate-y-3 font-sans uppercase text-[10px] tracking-[0.48em] text-gold-deep/80"
          >
            Maison · Atelier
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-[7%] right-[7%] translate-y-3 font-sans uppercase text-[10px] tracking-[0.48em] text-gold-deep/80 tabular-nums"
          >
            Vol. {yearsActive} · Est. 1993
          </motion.span>
          {/* Bottom annotations hidden on mobile — corners are pixel-cramped at 375px */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden sm:inline-block absolute bottom-[7%] left-[7%] -translate-y-3 font-sans uppercase text-[10px] tracking-[0.48em] text-gold-deep/60"
          >
            Bangkok
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden sm:inline-block absolute bottom-[7%] right-[7%] -translate-y-3 font-sans uppercase text-[10px] tracking-[0.48em] text-gold-deep/60"
          >
            Gaysorn Centre
          </motion.span>

          {/* VERTICAL BEAM — gold light slit at the centre, the spark from
              which the brandmark grows */}
          <motion.span
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.2,
              times: [0, 0.25, 0.7, 1],
              delay: 0.3,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center pointer-events-none"
            style={{
              width: 2,
              height: 320,
              background:
                'linear-gradient(180deg, rgba(194,161,77,0) 0%, rgba(194,161,77,1) 50%, rgba(194,161,77,0) 100%)',
              filter: 'blur(0.6px)',
              boxShadow: '0 0 24px rgba(194,161,77,0.55)',
            }}
          />

          {/* CENTRE — the marquise diamond drawing itself */}
          <div className="relative" style={{ width: 360, height: 460 }}>
            <svg
              viewBox="-230 -300 460 600"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              {/* GIRDLE OUTLINE — pen draws all the way around */}
              <motion.path
                d="M 0 -250 C 110 -200 175 -110 195 0 C 175 110 110 200 0 250 C -110 200 -175 110 -195 0 C -175 -110 -110 -200 0 -250 Z"
                fill="none"
                stroke="var(--gold)"
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.1, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] },
                  opacity: { duration: 0.3, delay: 0.6 },
                }}
              />

              {/* FACETS — hatch in one by one */}
              {FACETS.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="var(--gold-deep)"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.5, delay: 1.2 + i * 0.035, ease: 'easeOut' },
                    opacity: { duration: 0.18, delay: 1.2 + i * 0.035 },
                  }}
                />
              ))}

              {/* CLEAR — inks in at centre, deep gold for legibility on ivory */}
              <motion.text
                y="14"
                textAnchor="middle"
                fill="var(--gold-deep)"
                fontSize="92"
                letterSpacing="4"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 500,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                CLEAR
              </motion.text>

              {/* 1993 — italic under */}
              <motion.text
                y="84"
                textAnchor="middle"
                fill="var(--gold)"
                fontSize="32"
                letterSpacing="11"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.85, ease: [0.22, 0.61, 0.36, 1] }}
              >
                1993
              </motion.text>
            </svg>

            {/* SPARKLE BURST — six points fire outward from the seal */}
            {BURST.map((b, i) => (
              <motion.svg
                key={i}
                viewBox="0 0 24 24"
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  width: b.size,
                  height: b.size,
                  marginLeft: -b.size / 2,
                  marginTop: -b.size / 2,
                  x: b.x,
                  y: b.y,
                }}
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.5], rotate: 90 }}
                transition={{ duration: 1.0, delay: 1.7 + i * 0.04, ease: 'easeOut' }}
              >
                <path
                  d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
                  fill="rgba(194,161,77,0.95)"
                />
              </motion.svg>
            ))}
          </div>

          {/* WHISPER LINE BELOW THE SEAL */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.78em' }}
            animate={{ opacity: 1, letterSpacing: '0.48em' }}
            transition={{ duration: 1.0, delay: 2.0, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-2 font-sans uppercase text-[10px] text-gold-deep/85"
          >
            Bangkok · Since 1993
          </motion.p>

          {/* PROGRESS HAIRLINE — thin gold bar fills along the bottom hairline */}
          <motion.span
            className="absolute bottom-[7%] left-1/2 -translate-x-1/2 h-[2px] w-[180px] bg-gold/15 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.span
              className="block h-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────── helpers ─────────── */

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

// Six sparkle points firing outward from the seal centre
const BURST = (() => {
  const points: { x: number; y: number; size: number }[] = [];
  const distances = [180, 200, 165, 215, 175, 195];
  for (let i = 0; i < 6; i++) {
    const angle = (-90 + (i * 360) / 6) * (Math.PI / 180);
    points.push({
      x: Math.cos(angle) * distances[i],
      y: Math.sin(angle) * distances[i],
      size: 10 + (i % 3) * 4,
    });
  }
  return points;
})();
