import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'fs';
import { join } from 'path';
import { BRAND } from '@/lib/brand';
import { GALLERY, homePreview } from '@/lib/gallery-manifest';
import Reveal from '@/components/Reveal';
import HeroPlaceholder from '@/components/HeroPlaceholder';
import Wordmark from '@/components/Wordmark';
import GalleryShowcaseClient from '@/components/GalleryShowcaseClient';

/**
 * HOME — full-bleed hero, signature pieces showcase, brand story teaser,
 * trust signals strip, closing CTA card. Calm, gallery rhythm.
 */
export default function HomePage() {
  // Use a real hero image if one has been dropped in; otherwise the placeholder.
  const heroSrc = '/images/hero/hero-main.jpg';
  const heroExists = existsSync(join(process.cwd(), 'public', 'images', 'hero', 'hero-main.jpg'));

  // Show 6 signature pieces on the homepage (the rest live on /gallery).
  // Home gallery wall — auto-grows from the manifest. Adding a `hero: true`
  // entry in src/lib/gallery-manifest.ts makes it appear here automatically.
  const signature = homePreview(12);

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative h-[100svh] min-h-[680px] w-full flex items-center justify-center overflow-hidden">
        {heroExists ? (
          <Image
            src={heroSrc}
            alt="A CLEAR Jewelry signature piece"
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_28%] md:object-center"
          />
        ) : (
          <HeroPlaceholder />
        )}
        {/* tonal scrim — top + bottom darkened for legibility, middle stays bright */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,9,8,0.62) 0%, rgba(10,9,8,0.18) 22%, rgba(10,9,8,0.10) 50%, rgba(10,9,8,0.48) 78%, rgba(10,9,8,0.78) 100%)',
          }}
        />

        <div className="relative z-10 text-ivory text-center px-6">
          <Reveal y={36} duration={1.4}>
            <p
              className="eyebrow text-gold-light mb-8"
              style={{ textShadow: '0 1px 14px rgba(0,0,0,0.65)' }}
            >
              Bangkok · Since {BRAND.establishedYear}
            </p>
          </Reveal>
          <Reveal y={56} duration={1.6} delay={0.15}>
            <h1
              className="display font-light text-[clamp(48px,10vw,160px)] leading-[0.95] tracking-[-0.012em]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
            >
              Gemstone art
              <span className="block display-italic text-gold-light">since 1993.</span>
            </h1>
          </Reveal>
          <Reveal y={28} duration={1.2} delay={0.5}>
            <p
              className="mt-8 lg:mt-10 max-w-xl mx-auto font-sans text-[13.5px] lg:text-[14px] tracking-[0.04em] text-ivory leading-[1.75]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}
            >
              An independent Thai high-jewellery house. Unheated Burmese rubies,
              royal blue sapphires, fancy diamonds. Hand-set, signed CLEAR 1993.
            </p>
          </Reveal>
          <Reveal y={20} duration={1} delay={0.75}>
            <div className="mt-12 lg:mt-16 inline-block">
              {/* hairline gold rule + eyebrow — high-jewellery brochure plate */}
              <div className="relative flex items-center justify-center gap-4 lg:gap-5 mb-7 px-6 py-2 rounded-full sm:rounded-none sm:px-0 sm:py-0 bg-charcoal/55 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-0">
                <span className="hidden sm:block h-px w-12 lg:w-16 bg-gold-light/70" />
                <span
                  className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-light whitespace-nowrap"
                  style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
                >
                  By Private Appointment
                </span>
                <span className="hidden sm:block h-px w-12 lg:w-16 bg-gold-light/70" />
              </div>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <Link
                  href="/book"
                  className="group/cta relative inline-flex items-center gap-3 px-12 py-[18px] border border-gold-light/90 text-ivory uppercase tracking-[0.34em] text-[12px] font-medium hover:bg-ivory hover:text-charcoal hover:border-ivory transition-all duration-700 ease-elegant overflow-hidden"
                  style={{
                    boxShadow: '0 0 0 1px rgba(216,190,126,0.18), 0 0 48px rgba(216,190,126,0.0)',
                  }}
                >
                  <span className="relative z-10">Book an Appointment</span>
                  <span className="relative z-10 transition-transform duration-500 group-hover/cta:translate-x-1">→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="font-sans text-[12.5px] uppercase tracking-[0.42em] text-ivory hover:text-gold-light transition-colors duration-500 underline underline-offset-[10px] decoration-gold-light/80 decoration-[1px] pt-2 sm:pt-0"
                >
                  View the Gallery
                </Link>
              </div>

              {/* hairline gold rule below */}
              <div className="mt-7 flex justify-center">
                <span className="block h-px w-40 bg-gold-light/40" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* scroll cue — hidden on mobile (collides with photo's embedded CLEAR wordmark) */}
        <div
          className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/85 text-[10px] tracking-[0.32em] uppercase"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          Scroll
        </div>
      </section>

      {/* ============================== TRUST SIGNALS ============================== */}
      <section className="bg-ivory border-y border-[var(--rule-soft)]">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND.trustSignals.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="display text-2xl text-charcoal">{s.label}</p>
                <p className="font-sans text-[11.5px] tracking-[0.12em] uppercase text-gold-deep mt-2">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== SIGNATURE PIECES ============================== */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold-deep">Signature</p>
            <h2 className="display text-[clamp(40px,6vw,84px)] leading-[1.02] mt-4 max-w-3xl">
              The pieces we are
              <span className="display-italic text-gold"> known for.</span>
            </h2>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-xl mt-8 leading-relaxed">
              Every signature stone is GIA-certified, every setting hand-finished.
              Each piece is a one-of-one composition.
            </p>
            <hr className="gold-rule mt-10" />
          </Reveal>

          <GalleryShowcaseClient items={signature} />

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link href="/gallery" className="btn">
                View the full gallery <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== BRAND STORY TEASER ============================== */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <p className="eyebrow text-gold-light">Our story</p>
            <h2 className="display text-[clamp(40px,6vw,84px)] leading-[1.02] mt-4">
              Thirty years of
              <span className="display-italic text-gold-light"> rare stones.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[15px] tracking-[0.02em] text-ivory/85 leading-[1.85]">
              CLEAR Jewelry was founded in Bangkok in 1993 to do one thing
              quietly and well: source the rarest coloured stones in the world,
              and set them by hand. We work primarily with unheated Burmese
              rubies, royal blue Ceylon sapphires, fancy &amp; black diamonds,
              and the occasional Paraiba. Our atelier is small. Our pieces are
              one-of-one. Our relationships, in many cases, are second-generation.
            </p>
            <hr className="gold-rule mt-8" />
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 font-sans text-[12px] uppercase tracking-[0.28em] text-gold-light hover:text-ivory transition-colors duration-500"
            >
              Read the heritage <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================== CLOSING CTA ============================== */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            <Wordmark size="lg" />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="display text-[clamp(36px,5vw,68px)] leading-[1.05] mt-10">
              Visit the atelier at
              <span className="display-italic text-gold"> Gaysorn Centre.</span>
            </h2>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-xl mx-auto mt-8 leading-relaxed">
              Private viewings by appointment. Bring an idea, an heirloom, or a stone you love.
              We will design the rest.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn btn-solid">
                Book an Appointment <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact" className="btn">
                See all contact channels
              </Link>
            </div>
            <p className="mt-10 font-sans text-[11px] tracking-[0.28em] uppercase text-gold-deep">
              {BRAND.addressLines[0]} · {BRAND.hours}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
