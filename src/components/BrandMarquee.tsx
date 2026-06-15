'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Thin marquee tape that scrolls slowly under the hero. Reads as a
 * couture press strip — the brand's defining vocabulary. Phrases
 * alternate between italic Cormorant and tracked small-caps Jost,
 * separated by marquise-diamond glyphs.
 *
 * Falls back to a static centred strip under prefers-reduced-motion.
 */
const PHRASES = [
  'Pigeon-Blood Burmese Ruby',
  'Royal Blue Ceylon Sapphire',
  'Paraiba Tourmaline',
  'Tsavorite Garnet',
  'Fancy Diamond',
  'Hand-Set in Bangkok',
  'GIA-Certified',
  'One-of-One Commissions',
  'Maison Clear · Since 1993',
];

function Marquise() {
  return (
    <svg width="14" height="9" viewBox="0 0 24 16" fill="none" aria-hidden className="shrink-0">
      <path d="M12 0 L24 8 L12 16 L0 8 Z" stroke="currentColor" strokeWidth="1" className="text-gold/60" fill="none" />
      <path d="M12 4 L18 8 L12 12 L6 8 Z" fill="currentColor" className="text-gold/40" />
    </svg>
  );
}

function Phrase({ text, italic }: { text: string; italic: boolean }) {
  return (
    <span className="flex items-center gap-12">
      {italic ? (
        <span className="display-italic text-[19px] text-gold-light/90 normal-case tracking-normal">
          {text}
        </span>
      ) : (
        <span className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-light/80">
          {text}
        </span>
      )}
      <Marquise />
    </span>
  );
}

export default function BrandMarquee() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="bg-charcoal text-ivory border-y border-[var(--rule-invert)] overflow-hidden">
        <div className="flex items-center justify-center gap-12 py-5 whitespace-nowrap overflow-x-auto scrollbar-none px-6">
          {PHRASES.slice(0, 4).map((p, i) => (
            <Phrase key={i} text={p} italic={i % 2 === 1} />
          ))}
        </div>
      </div>
    );
  }

  // Triplicate so the loop is seamless
  const list = [...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="bg-charcoal text-ivory border-y border-[var(--rule-invert)] overflow-hidden">
      <motion.div
        className="flex items-center gap-12 py-5 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      >
        {list.map((p, i) => (
          <Phrase key={i} text={p} italic={i % 2 === 1} />
        ))}
      </motion.div>
    </div>
  );
}
