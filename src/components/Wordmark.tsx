import clsx from 'clsx';
import { BRAND } from '@/lib/brand';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  /** If true, renders only the marquise glyph (no wordmark text). */
  iconOnly?: boolean;
  className?: string;
}

/**
 * Logotype wordmark — small marquise diamond glyph on the left, with a
 * typographic stack on the right: "CLEAR" in display serif over "JEWELRY ·
 * EST. 1993" in fine-tracked sans.
 *
 * Replaces the marble PNG roundel, which was unreadable at small sizes.
 * Pure SVG + type — crisp at any pixel density.
 */
const SIZES = {
  sm: { glyph: 22, clear: 18, sub: 8.5,  spacing: 0.34, gap: 10 },
  md: { glyph: 30, clear: 24, sub: 9.5,  spacing: 0.38, gap: 12 },
  lg: { glyph: 56, clear: 44, sub: 13,   spacing: 0.42, gap: 18 },
  xl: { glyph: 120, clear: 96, sub: 22,  spacing: 0.5,  gap: 28 },
} as const;

export default function Wordmark({
  size = 'md',
  variant = 'dark',
  iconOnly = false,
  className,
}: WordmarkProps) {
  const s = SIZES[size];
  const ink = variant === 'light' ? 'text-ivory' : 'text-charcoal';
  const subTone =
    variant === 'light' ? 'text-gold-light/85' : 'text-gold-deep';
  const stroke = variant === 'light' ? '#E2C681' : '#947433';
  const facet = variant === 'light' ? 'rgba(226,198,129,0.55)' : 'rgba(148,116,51,0.55)';
  const dot = variant === 'light' ? '#EBD9A8' : '#C2A14D';

  return (
    <span className={clsx('inline-flex items-center', className)} style={{ gap: s.gap }}>
      {/* Marquise diamond glyph */}
      <svg
        viewBox="-110 -150 220 300"
        width={s.glyph}
        height={s.glyph * 1.18}
        aria-hidden
        style={{ flex: '0 0 auto' }}
      >
        {/* outline */}
        <path
          d="M 0 -140 C 60 -110 96 -60 108 0 C 96 60 60 110 0 140 C -60 110 -96 60 -108 0 C -96 -60 -60 -110 0 -140 Z"
          fill="none"
          stroke={stroke}
          strokeWidth={1.6}
        />
        {/* internal facets */}
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
        {/* centre highlight */}
        <circle r="3" fill={dot} opacity={0.85} />
      </svg>

      {!iconOnly && (
        <span className="flex flex-col leading-[1]" style={{ rowGap: Math.max(2, s.glyph * 0.12) }}>
          <span
            className={clsx('display', ink)}
            style={{
              fontSize: s.clear,
              letterSpacing: '0.24em',
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            {BRAND.wordmark}
          </span>
          <span
            className={clsx('font-sans uppercase', subTone)}
            style={{
              fontSize: s.sub,
              letterSpacing: `${s.spacing}em`,
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {BRAND.wordmarkSubtitle} · Est. {BRAND.establishedYear}
          </span>
        </span>
      )}
    </span>
  );
}
