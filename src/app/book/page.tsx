import type { Metadata } from 'next';
import BookForm from '@/components/BookForm';
import Reveal from '@/components/Reveal';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Reserve a private viewing at the CLEAR Jewelry atelier on the 3rd floor of Gaysorn Centre, Bangkok.',
};

export default function BookPage() {
  return (
    <>
      <section className="bg-ivory pt-40 lg:pt-48 pb-12">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow text-gold-deep">By appointment</p>
            <h1 className="display text-[clamp(44px,7vw,108px)] leading-[1.0] mt-4">
              Reserve a private
              <span className="display-italic text-gold"> viewing.</span>
            </h1>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/75 max-w-xl mx-auto mt-10 leading-relaxed">
              Most signature stones live in the safe. Tell us when you would like
              to visit and what you would like to see — we will have everything
              ready, along with a coffee.
            </p>
            <hr className="gold-rule mx-auto mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
          <Reveal>
            <BookForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 grid md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <p className="eyebrow text-gold-light mb-3">Atelier</p>
            <p className="display text-xl leading-snug">{BRAND.addressLines[0]}</p>
            <p className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/70 mt-1">
              {BRAND.addressLines[1]}
              <br />
              {BRAND.addressLines[2]}
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold-light mb-3">Hours</p>
            <p className="display text-xl">{BRAND.hours}</p>
            <p className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/70 mt-1">
              {BRAND.transitNote}
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold-light mb-3">Direct</p>
            <p className="display text-xl">
              <a href={`tel:${BRAND.phoneTel}`} className="hover:text-gold-light transition-colors">
                {BRAND.phoneDisplay}
              </a>
            </p>
            <p className="font-sans text-[12.5px] tracking-[0.02em] text-ivory/70 mt-1">
              LINE ·{' '}
              <a href={BRAND.lineUrl} target="_blank" rel="noreferrer" className="hover:text-gold-light transition-colors">
                {BRAND.lineHandle}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
