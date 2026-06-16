/**
 * Editorial divider — a single fading gold hairline rule.
 *
 * Previous version had a marquise glyph at the centre flanked by twin
 * dots; the glyph was removed brand-wide per owner direction. Kept the
 * component name so existing call sites don't break.
 */
export default function OrnateDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden>
      <span
        className="block h-px w-full max-w-[420px] lg:max-w-[560px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(194,161,77,0.55) 50%, transparent)',
        }}
      />
    </div>
  );
}
