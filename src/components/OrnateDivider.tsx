/**
 * Ornate gold divider — twin hairlines tipped with small gold points, a
 * marquise glyph at centre flanked by two diamond dots. The flourish a
 * maison catalog sets between chapters.
 */
export default function OrnateDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      {/* left hairline, fading outward */}
      <span
        className="block h-px w-28 lg:w-40"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(194,161,77,0.55))' }}
      />
      {/* left dot */}
      <span className="block w-1 h-1 rotate-45 bg-gold/50" />
      {/* central marquise */}
      <svg width="22" height="15" viewBox="0 0 24 16" fill="none">
        <path
          d="M12 0 L24 8 L12 16 L0 8 Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold"
          fill="none"
        />
        <path d="M12 4 L18 8 L12 12 L6 8 Z" fill="currentColor" className="text-gold/60" />
      </svg>
      {/* right dot */}
      <span className="block w-1 h-1 rotate-45 bg-gold/50" />
      {/* right hairline, fading outward */}
      <span
        className="block h-px w-28 lg:w-40"
        style={{ background: 'linear-gradient(90deg, rgba(194,161,77,0.55), transparent)' }}
      />
    </div>
  );
}
