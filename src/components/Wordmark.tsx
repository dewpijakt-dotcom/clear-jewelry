import { BRAND } from '@/lib/brand';
import clsx from 'clsx';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  className?: string;
}

const SIZE = {
  sm: { wordmark: 'text-base', sub: 'text-[8px]', gap: 'gap-[3px]', spacing: 'tracking-[0.42em]' },
  md: { wordmark: 'text-2xl', sub: 'text-[9px]', gap: 'gap-[5px]', spacing: 'tracking-[0.48em]' },
  lg: { wordmark: 'text-5xl', sub: 'text-[12px]', gap: 'gap-[8px]', spacing: 'tracking-[0.52em]' },
  xl: { wordmark: 'text-[120px]', sub: 'text-[20px]', gap: 'gap-[12px]', spacing: 'tracking-[0.56em]' },
};

/**
 * The CLEAR / JEWELRY stacked wordmark. Gold by default. Use `variant="light"`
 * over dark backgrounds (the wordmark will render in ivory + gold accents).
 */
export default function Wordmark({ size = 'md', variant = 'dark', className }: WordmarkProps) {
  const s = SIZE[size];
  return (
    <div className={clsx('inline-flex flex-col items-center', s.gap, className)}>
      <span
        className={clsx(
          'display font-light leading-none',
          s.wordmark,
          s.spacing,
          variant === 'light' ? 'text-ivory' : 'text-charcoal',
        )}
      >
        {BRAND.wordmark}
      </span>
      <span
        className={clsx(
          'font-sans uppercase',
          s.sub,
          'tracking-[0.62em] text-gold',
        )}
      >
        {BRAND.wordmarkSubtitle}
      </span>
    </div>
  );
}
