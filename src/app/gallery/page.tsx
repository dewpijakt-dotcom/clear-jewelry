import type { Metadata } from 'next';
import Link from 'next/link';
import GalleryClient from '@/components/GalleryClient';
import Reveal from '@/components/Reveal';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Signature pieces by CLEAR Jewelry — unheated Burmese rubies, royal blue sapphires, fancy diamonds, marquise sets. Filter by category.',
};

/**
 * GALLERY — the centrepiece. Filterable masonry grid + lightbox.
 */
export default function GalleryPage() {
  return (
    <>
      <section className="bg-ivory pt-40 lg:pt-48 pb-20">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold-deep">The gallery</p>
            <h1 className="display text-[clamp(48px,8vw,128px)] leading-[0.98] mt-4 max-w-4xl">
              Every piece, a
              <span className="display-italic text-gold"> one-of-one.</span>
            </h1>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/75 max-w-2xl mt-10 leading-relaxed">
              Filter by category to see the colored stones, marquise diamonds,
              and matched sets we are best known for. To enquire about any
              piece, book an appointment — most signature stones live in the
              safe and are shown by request.
            </p>
            <hr className="gold-rule wide mt-10" />
          </Reveal>
        </div>
      </section>

      <GalleryClient />

      <section className="bg-charcoal text-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow text-gold-light">For collectors</p>
            <h2 className="display text-[clamp(32px,4.4vw,56px)] leading-tight mt-4">
              Looking for a particular stone?
            </h2>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/80 max-w-xl mx-auto mt-6 leading-relaxed">
              We hold rare unheated stones not shown publicly. Tell us what you
              are looking for and we will source it.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn btn-light">
                Book an Appointment <span className="btn-arrow">→</span>
              </Link>
              <Link
                href={BRAND.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[12px] uppercase tracking-[0.28em] text-ivory/80 hover:text-gold-light transition-colors duration-500 underline underline-offset-8 decoration-gold/60 decoration-[0.5px] pt-4 sm:pt-0"
              >
                Chat on LINE
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
