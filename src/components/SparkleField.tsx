'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Props {
  /** How many sparkles to render. Default 14. */
  count?: number;
  /** Hue: 'gold' | 'ivory'. */
  tone?: 'gold' | 'ivory';
  className?: string;
}

const RNG = (seed: number) => {
  // Simple seeded RNG so SSR + client agree on positions
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

/**
 * Ambient sparkles drifting in a container — pure SVG glyphs, twinkling at
 * staggered intervals. Position is deterministic per seed so it doesn't
 * jitter between SSR and hydration.
 */
export default function SparkleField({ count = 14, tone = 'gold', className = '' }: Props) {
  const sparkles = useMemo(() => {
    const rand = RNG(7);
    return Array.from({ length: count }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 6 + rand() * 14,
      delay: rand() * 4,
      duration: 2.6 + rand() * 3,
      opacity: 0.4 + rand() * 0.55,
      key: i,
    }));
  }, [count]);

  const fill = tone === 'gold' ? 'rgb(226 198 129)' : 'rgb(250 248 244)';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden>
      {sparkles.map((s) => (
        <motion.svg
          key={s.key}
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          className="absolute"
          style={{
            top: `${s.y}%`,
            left: `${s.x}%`,
            transform: 'translate(-50%, -50%)',
            opacity: s.opacity,
          }}
          initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
          animate={{
            opacity: [0, s.opacity, 0],
            scale: [0.4, 1, 0.4],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z"
            fill={fill}
          />
        </motion.svg>
      ))}
    </div>
  );
}
