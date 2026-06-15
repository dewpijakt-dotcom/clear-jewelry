import GalleryClient from '@/components/GalleryClient';
import { getFullGallery } from '@/lib/sanityAdapter';
import T from '@/components/T';

export const revalidate = 60;

function toRoman(num: number): string {
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let r = '';
  for (const [v, s] of map) {
    while (num >= v) { r += s; num -= v; }
  }
  return r;
}

/**
 * Gallery — Sanity-driven, with an editorial header that doubles as
 * a museum plaque. Volume / Atelier annotations frame the headline,
 * then the GalleryClient takes over with the salon centrepiece +
 * mosaic catalogue + lot numbers + hairline-frame hover.
 */
export default async function GalleryPage() {
  const { pieces, categories } = await getFullGallery();
  const yearsActive = new Date().getFullYear() - 1993;
  const vol = toRoman(yearsActive);

  return (
    <>
      {/* Editorial header */}
      <section className="relative bg-ivory pt-40 lg:pt-48 pb-16 lg:pb-24 overflow-hidden">
        <span
          aria-hidden
          className="absolute right-[2vw] top-24 lg:top-28 select-none pointer-events-none display"
          style={{
            fontSize: 'clamp(140px, 18vw, 320px)',
            color: 'rgba(148, 116, 51, 0.06)',
            lineHeight: 0.9,
            fontStyle: 'italic',
          }}
        >
          {vol}
        </span>

        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 85% 25%, rgba(194,161,77,0.28) 0%, rgba(194,161,77,0.05) 35%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="grid grid-cols-2 items-center mb-10 text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
            <span><T k="maison.label" /></span>
            <span className="text-right tabular-nums">Volume {vol} · 1993</span>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-20 items-end">
            <div>
              <p className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep">
                <T k="gal.eyebrow" />
              </p>
              <h1
                className="display leading-[0.96] mt-4 max-w-[14ch] tracking-[-0.012em]"
                style={{ fontSize: 'clamp(48px, 8.5vw, 148px)' }}
              >
                <T k="gal.title.l1" />
                <span className="block display-italic text-gold mt-1"><T k="gal.title.l2" /></span>
              </h1>
            </div>

            <div>
              <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/80 leading-[1.9] max-w-[42ch]">
                <T k="gal.lede" />
              </p>
              <hr className="border-0 h-px bg-gold-light/60 w-24 mt-8" />
              <dl className="mt-8 grid grid-cols-2 gap-y-4 text-[11.5px] tracking-[0.04em]">
                <div>
                  <dt className="font-sans uppercase tracking-[0.36em] text-gold-deep/75 text-[10px]"><T k="gal.stat.works" /></dt>
                  <dd className="display text-2xl text-charcoal mt-1 tabular-nums">{String(pieces.length).padStart(3, '0')}</dd>
                </div>
                <div>
                  <dt className="font-sans uppercase tracking-[0.36em] text-gold-deep/75 text-[10px]"><T k="gal.stat.atelier" /></dt>
                  <dd className="display text-2xl text-charcoal mt-1"><T k="gal.stat.bangkok" /></dd>
                </div>
                <div>
                  <dt className="font-sans uppercase tracking-[0.36em] text-gold-deep/75 text-[10px]"><T k="gal.stat.since" /></dt>
                  <dd className="display text-2xl text-charcoal mt-1 tabular-nums">1993</dd>
                </div>
                <div>
                  <dt className="font-sans uppercase tracking-[0.36em] text-gold-deep/75 text-[10px]"><T k="gal.stat.viewing" /></dt>
                  <dd className="display text-2xl text-charcoal mt-1"><T k="gal.stat.appt" /></dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <GalleryClient pieces={pieces} categories={categories} />
    </>
  );
}
