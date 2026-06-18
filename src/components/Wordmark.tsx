import clsx from 'clsx';
import { BRAND } from '@/lib/brand';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  /** If true, renders only the marquise glyph (no wordmark text). */
  iconOnly?: boolean;
  /** If true, renders only the wordmark text (no glyph). */
  noIcon?: boolean;
  className?: string;
}

/**
 * Logotype wordmark — marquise diamond glyph + "CLEAR" serif over
 * "JEWELRY · EST. 1993" fine-tracked sans.
 *
 * Sizes bumped 2025-06: the header logo was too small to read on retina.
 * The `light` variant now ships a soft drop-shadow so the wordmark stays
 * legible over photographic hero backgrounds.
 */
const SIZES = {
  sm: { glyph: 30, clear: 24, sub: 10,   spacing: 0.36, gap: 12 },
  md: { glyph: 42, clear: 32, sub: 11.5, spacing: 0.40, gap: 14 },
  lg: { glyph: 64, clear: 52, sub: 14,   spacing: 0.44, gap: 20 },
  xl: { glyph: 128, clear: 104, sub: 24, spacing: 0.5,  gap: 30 },
} as const;

// Responsive overrides for the oversize `xl` hero wordmark. The fixed
// 104px + 0.24em + 24px + 0.5em sizes overflowed mobile viewports
// (the 'JEWELRY · Est. 1993' line wrapped past the right edge on a
// 390px iPhone). These clamp() pairs scale down gracefully on narrow
// viewports while keeping the desktop presence intact (clamp upper
// bounds match the original SIZES.xl numbers exactly).
const XL_RESPONSIVE = {
  clearFontSize: 'clamp(46px, 11vw, 104px)',
  // Subtitle tracking was the worst offender; relaxes from 0.32em on
  // small screens to the original 0.5em from ~640px and up.
  subFontSize: 'clamp(11px, 2.4vw, 24px)',
  clearLetterSpacing: 'clamp(0.14em, 0.24em, 0.24em)',
  subLetterSpacing: 'clamp(0.28em, 0.5em, 0.5em)',
} as const;

export default function Wordmark({
  size = 'md',
  variant = 'dark',
  iconOnly = false,
  noIcon = true,    // glyph removed brand-wide per owner request; pass noIcon={false} to opt in
  className,
}: WordmarkProps) {
  const s = SIZES[size];
  const ink = variant === 'light' ? 'text-ivory' : 'text-charcoal';
  const subTone =
    variant === 'light' ? 'text-gold-light/90' : 'text-gold-deep';
  const stroke = variant === 'light' ? '#E2C681' : '#947433';
  const facet = variant === 'light' ? 'rgba(226,198,129,0.55)' : 'rgba(148,116,51,0.55)';
  const dot = variant === 'light' ? '#EBD9A8' : '#C2A14D';
  // On a photographic hero the ivory wordmark needs a soft halo so it
  // doesn't dissolve into bright highlights. Charcoal variant sits on
  // ivory paper so no shadow needed.
  const textShadow =
    variant === 'light' ? '0 1px 14px rgba(0,0,0,0.55), 0 0 28px rgba(0,0,0,0.35)' : undefined;
  const glyphFilter =
    variant === 'light' ? 'drop-shadow(0 1px 4px rgba(0,0,0,0.45))' : undefined;

  return (
    <span className={clsx('inline-flex items-center', className)} style={{ gap: s.gap }}>
      {!noIcon && (
        <>
        {/* Marquise diamond glyph */}
        <svg
        viewBox="-110 -150 220 300"
        width={s.glyph}
        height={s.glyph * 1.18}
        aria-hidden
        style={{ flex: '0 0 auto', filter: glyphFilter }}
      >
        <path
          d="M 0 -140 C 60 -110 96 -60 108 0 C 96 60 60 110 0 140 C -60 110 -96 60 -108 0 C -96 -60 -60 -110 0 -140 Z"
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
        />
        <g fill="none" stroke={facet} strokeWidth={0.9}>
          <path d="M 0 -140 L -65 -28" />
          <path d="M 0 -140 L 0 -22" />
          <path d="M 0 -140 L 65 -28" />
          <path d="M -108 0 L -65 -28" />
          <path d="M -108 0 L -65 28" />
          <path d="M 108 0 L 65 -28" />
          <path d="M 108 0 L 65 28" />
          <path d="M 0 140 L -65 28" />
          <path d="M 0 140 L 0 22" />
          <path d="M 0 140 L 65 28" />
          <path d="M -65 -28 L 0 -22 L 65 -28" />
          <path d="M -65 28 L 0 22 L 65 28" />
        </g>
        <circle r="3" fill={dot} opacity={0.85} />
        </svg>
        </>
      )}

      {!iconOnly && (
        <span className="flex flex-col leading-[1]" style={{ rowGap: Math.max(2, s.glyph * 0.12) }}>
          <span
            className={clsx('display', ink)}
            style={{
              fontSize: size === 'xl' ? XL_RESPONSIVE.clearFontSize : s.clear,
              letterSpacing: size === 'xl' ? XL_RESPONSIVE.clearLetterSpacing : '0.24em',
              fontWeight: 500,
              lineHeight: 1,
              textShadow,
            }}
          >
            {BRAND.wordmark}
          </span>
          <span
            className={clsx('font-sans uppercase', subTone)}
            style={{
              fontSize: size === 'xl' ? XL_RESPONSIVE.subFontSize : s.sub,
              letterSpacing: size === 'xl' ? XL_RESPONSIVE.subLetterSpacing : `${s.spacing}em`,
              fontWeight: 400,
              lineHeight: 1,
              textShadow,
              whiteSpace: 'nowrap',
            }}
          >
            {BRAND.wordmarkSubtitle} · Est. {BRAND.establishedYear}
          </span>
        </span>
      )}
    </span>
  );
}
