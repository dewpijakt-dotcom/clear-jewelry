import Link from 'next/link';
import { BRAND } from '@/lib/brand';

/**
 * Branded 404 — replaces the default Next.js "This page could not be found."
 * shell with a quiet editorial fallback that still sits inside the site's
 * root layout (so header + footer remain). Bilingual lines so the page
 * reads naturally for both EN and TH visitors without needing a locale
 * lookup (this route is statically rendered by Next).
 */
export default function NotFound() {
  return (
    <main className="bg-ivory text-charcoal min-h-[calc(100vh-180px)] flex items-center">
      <div className="mx-auto max-w-[820px] px-6 lg:px-10 py-28 lg:py-36 text-center">
        <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
          404  ·  PRIVATE ATELIER
        </p>
        <h1
          className="display leading-[1.04] mt-7 text-charcoal"
          style={{ fontSize: 'clamp(40px, 5.6vw, 76px)' }}
        >
          This piece <em className="display-italic text-gold-deep">isn&rsquo;t in the safe.</em>
        </h1>
        <p className="font-sans italic text-[15px] lg:text-[16px] text-charcoal/70 mt-7 leading-[1.85] max-w-[44ch] mx-auto">
          The page you were looking for has moved or was never here. Browse
          the gallery to see what we&rsquo;re currently exhibiting, or
          book a private viewing at the Bangkok atelier.
        </p>
        <p
          lang="th"
          className="font-sans text-[13.5px] text-charcoal/60 mt-4 leading-relaxed max-w-[44ch] mx-auto"
        >
          ไม่พบหน้าที่คุณกำลังมองหา ลองชมแกลเลอรี หรือนัดหมายเข้าชมที่แอตเทอลิเย่ของเรา ครับ
        </p>

        <hr className="border-0 h-px bg-gold-light/50 w-24 mx-auto mt-12" />

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5 min-h-[44px]"
          >
            View the Gallery <span aria-hidden>→</span>
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5 min-h-[44px]"
          >
            Book an appointment <span aria-hidden>→</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal/60 hover:text-charcoal transition-colors duration-500 min-h-[44px]"
          >
            ← Home
          </Link>
        </div>

        <p className="mt-12 font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep/80">
          CLEAR 1993  ·  {BRAND.addressLines?.[0] ?? "Bangkok"}
        </p>
      </div>
    </main>
  );
}
