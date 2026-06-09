import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Information',
  description:
    'Gemstone expertise, GIA certification, the custom-design process, and visiting information for CLEAR Jewelry at Gaysorn Centre, Bangkok.',
};

const SECTIONS = [
  {
    eyebrow: 'Expertise',
    title: 'Rare &amp; unheated stones',
    body: [
      'Our atelier specializes in stones the wider market rarely touches: unheated Burmese rubies in pigeon-blood saturation, royal blue Ceylon sapphires, fancy and black diamonds, and Paraiba tourmalines from the original Brazilian mines.',
      'Every signature stone is sourced through a small circle of established cutters in Bangkok, Mogok, and Colombo &mdash; relationships built over thirty years and not transferable to anyone else.',
    ],
  },
  {
    eyebrow: 'Authenticity',
    title: 'GIA-certified, every time',
    body: [
      'Every signature stone arrives at our clients with a current GIA report. We work exclusively with internationally recognized laboratories &mdash; GIA, AGL, and SSEF for coloured stones &mdash; and we provide the full chain of certification in writing.',
      'For bespoke commissions involving heirloom stones, we can arrange independent re-certification before remounting at no markup.',
    ],
  },
  {
    eyebrow: 'Bespoke',
    title: 'The custom design process',
    body: [
      'Step one is conversation: a private meeting at the atelier where we listen, sketch, and look at stones together.',
      'Step two is stone selection &mdash; we pre-vet GIA-certified options across budgets so you can touch, compare, and choose.',
      'Step three is design: hand-drawn sketches, then 3D renders, revised until the line of the piece feels exactly right.',
      'Step four is setting and finish &mdash; entirely by hand. Typical lead time is four to six weeks for signature commissions.',
    ],
  },
  {
    eyebrow: 'Visiting',
    title: 'How to find us',
    body: [
      'The atelier is on the 3rd floor of Gaysorn Centre at Gaysorn Village, on the corner of Ploenchit and Ratchadamri roads in Lumpini.',
      'The most direct route is BTS Chidlom &mdash; Gaysorn Village has a covered skywalk straight from the station, so you reach us without crossing the street.',
      'Private parking is available in the Gaysorn basement; ask the concierge for the 3rd floor lift.',
    ],
  },
];

export default function InfoPage() {
  return (
    <>
      <section className="bg-ivory pt-40 lg:pt-48 pb-16">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold-deep">Information</p>
            <h1 className="display text-[clamp(48px,8vw,128px)] leading-[0.98] mt-4 max-w-3xl">
              Everything worth
              <span className="display-italic text-gold"> knowing.</span>
            </h1>
            <hr className="gold-rule wide mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 space-y-24 lg:space-y-32">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}>
              <article className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
                <header>
                  <p className="eyebrow text-gold-deep">{s.eyebrow}</p>
                  <h2
                    className="display text-[clamp(28px,3.6vw,44px)] leading-[1.05] mt-3"
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                </header>
                <div className="space-y-5">
                  {s.body.map((para, j) => (
                    <p
                      key={j}
                      className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85]"
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-24 lg:py-32">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow text-gold-light">Visit by appointment</p>
            <h2 className="display text-[clamp(32px,4.4vw,56px)] leading-tight mt-4">
              {BRAND.addressLines[0]}
            </h2>
            <p className="font-sans text-[14px] tracking-[0.02em] text-ivory/75 mt-3">
              {BRAND.hours} · {BRAND.transitNote}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn btn-light">
                Book an Appointment <span className="btn-arrow">→</span>
              </Link>
              <Link
                href="/contact"
                className="font-sans text-[12px] uppercase tracking-[0.28em] text-ivory/80 hover:text-gold-light transition-colors duration-500 underline underline-offset-8 decoration-gold/60 decoration-[0.5px] pt-4 sm:pt-0"
              >
                All Contact Channels
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
