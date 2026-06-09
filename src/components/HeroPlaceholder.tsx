/**
 * Hero background placeholder — used when /public/images/hero/hero-main.jpg
 * isn't yet uploaded. Renders a deep onyx gradient with a subtle radial gold
 * sheen + the wordmark watermark, so the layout reads as final-quality.
 */
export default function HeroPlaceholder() {
  return (
    <div className="absolute inset-0">
      {/* base */}
      <div className="absolute inset-0 bg-charcoal" />
      {/* radial gold sheen */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(900px 600px at 70% 35%, rgba(194,161,77,0.28) 0%, rgba(194,161,77,0.10) 35%, rgba(0,0,0,0) 75%)',
        }}
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1400px 900px at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* subtle paper grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
    </div>
  );
}
