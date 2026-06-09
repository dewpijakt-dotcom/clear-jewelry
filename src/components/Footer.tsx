import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import Wordmark from './Wordmark';

/**
 * Site footer. Dark charcoal background, ivory + gold text, four tappable
 * contact channels, address + hours, Book CTA, IG icon, copyright line.
 */
export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-24 pb-12">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
        {/* Top: brand + CTA */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 pb-16 border-b border-[var(--rule-invert)]">
          <div>
            <Wordmark size="lg" variant="light" />
            <p className="display-italic text-2xl text-ivory/85 mt-8 max-w-md leading-snug">
              {BRAND.tagline}.
            </p>
            <p className="font-sans text-[12px] tracking-[0.18em] text-gold-light/80 mt-6 max-w-md leading-relaxed">
              An independent Thai high-jewellery house. Unheated Burmese rubies,
              royal blue sapphires, fancy diamonds. Hand-set in Bangkok.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6">
            <p className="eyebrow text-gold-light">Visit the atelier</p>
            <Link href="/book" className="btn btn-light">
              Book Appointment <span className="btn-arrow">→</span>
            </Link>
            <Link
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-gold-light hover:text-ivory transition-colors duration-500"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Middle: channels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-[var(--rule-invert)]">
          <FooterChannel
            label="Atelier"
            primary={BRAND.addressLines[0]}
            secondary={`${BRAND.addressLines[1]} · ${BRAND.addressLines[2]}`}
            tertiary={BRAND.transitNote}
          />
          <FooterChannel
            label="Hours"
            primary={BRAND.hours}
            secondary="By appointment recommended"
          />
          <FooterChannel
            label="Direct lines"
            primary={
              <Link href={`tel:${BRAND.phoneTel}`} className="hover:text-gold-light transition-colors">
                {BRAND.phoneDisplay}
              </Link>
            }
            secondary={
              <Link href={BRAND.lineUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                LINE · {BRAND.lineHandle}
              </Link>
            }
            tertiary="Reply within one business day"
          />
          <FooterChannel
            label="Instagram"
            primary={
              <Link href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                {BRAND.instagramHandle}
              </Link>
            }
            secondary="Every new piece, first."
          />
        </div>

        {/* Bottom: legal */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.22em] uppercase text-ivory/60">
          <p>© 1993–{new Date().getFullYear()} CLEAR Jewelry · Bangkok</p>
          <p className="text-gold-deep">Made by hand. Set by hand. Signed CLEAR 1993.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterChannel({
  label,
  primary,
  secondary,
  tertiary,
}: {
  label: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  tertiary?: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-gold-light/80 mb-4">{label}</p>
      <div className="display text-[20px] leading-snug text-ivory">{primary}</div>
      {secondary && <p className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/70 mt-2 leading-relaxed">{secondary}</p>}
      {tertiary && <p className="font-sans text-[12px] tracking-[0.04em] text-ivory/60 mt-2 leading-relaxed">{tertiary}</p>}
    </div>
  );
}
