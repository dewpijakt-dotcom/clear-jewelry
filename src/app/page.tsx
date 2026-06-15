import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'fs';
import { join } from 'path';
import { BRAND } from '@/lib/brand';
import { getHomepage } from '@/lib/sanityAdapter';
import { pickLocalized } from '@/lib/i18n';
import Reveal from '@/components/Reveal';
import HeroPlaceholder from '@/components/HeroPlaceholder';
import Wordmark from '@/components/Wordmark';
import GalleryShowcaseClient from '@/components/GalleryShowcaseClient';
import T from '@/components/T';
import L from '@/components/L';

/**
 * HOME — full-bleed hero, signature pieces showcase, brand story teaser,
 * trust signals strip, closing CTA card. Hardcoded chrome via <T>;
 * Sanity-fed text via <L> so EN/TH/ZH all flip with the toggle.
 */
export default async function HomePage() {
  const cms = await getHomepage();
  const heroSrc = cms.hero.src;
  // Server-side EN initial render for image alt — clients re-render in their locale.
  const heroAltEn = pickLocalized(cms.hero.alt, 'en') || 'A CLEAR Jewelry signature piece.';
  const heroExists = existsSync(join(process.cwd(), 'public', 'images', 'hero', 'hero-main.jpg'));
  const signature = cms.featured;
  // Primary CTA href stays as URL (not localized)
  const ctaPrimaryHref = cms.ctaPrimaryHref || '/book';
  const ctaSecondaryHref = cms.ctaSecondaryHref || '/gallery';

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative h-[100svh] min-h-[680px] w-full flex items-center justify-center overflow-hidden">
        {heroExists ? (
          <Image
            src={heroSrc}
            alt={heroAltEn}
            fill
            sizes="100vw"
            priority
            className="object-cover object-[50%_28%] md:object-center"
          />
        ) : (
          <HeroPlaceholder />
        )}
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
              <L value={cms.heroEyebrow} />
            </p>
          </Reveal>
          <Reveal y={56} duration={1.6} delay={0.15}>
            <h1
              className="display font-light text-[clamp(48px,10vw,160px)] leading-[0.95] tracking-[-0.012em]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}
            >
              <L value={cms.heroTitle} />
              <span className="block display-italic text-gold-light"><L value={cms.heroItalic} /></span>
            </h1>
          </Reveal>
          <Reveal y={28} duration={1.2} delay={0.5}>
            <p
              className="mt-8 lg:mt-10 max-w-xl mx-auto font-sans text-[13.5px] lg:text-[14px] tracking-[0.04em] text-ivory leading-[1.75]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}
            >
              <L value={cms.heroLede} />
            </p>
          </Reveal>
          <Reveal y={20} duration={1} delay={0.75}>
            <div className="mt-12 lg:mt-16 inline-block">
              <div className="relative flex items-center justify-center gap-4 lg:gap-5 mb-7 px-6 py-2 rounded-full sm:rounded-none sm:px-0 sm:py-0 bg-charcoal/55 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-0">
                <span className="hidden sm:block h-px w-12 lg:w-16 bg-gold-light/70" />
                <span
                  className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-light whitespace-nowrap"
                  style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
                >
                  <L value={cms.ctaPlateEyebrow} />
                </span>
                <span className="hidden sm:block h-px w-12 lg:w-16 bg-gold-light/70" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <Link
                  href="/book"
                  className="group/cta relative inline-flex items-center gap-3 px-12 py-[20px] bg-gold text-charcoal uppercase tracking-[0.34em] text-[12.5px] font-medium hover:bg-ivory transition-all duration-700 ease-elegant overflow-hidden"
                  style={{
                    boxShadow: '0 22px 50px -22px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.6)',
                  }}
                >
                  <span className="relative z-10"><L value={cms.ctaPrimaryLabel} fallback="Book an Appointment" /></span>
                  <span className="relative z-10 transition-transform duration-500 group-hover/cta:translate-x-1">→</span>
                </Link>
                <Link
                  href={ctaSecondaryHref}
                  className="font-sans text-[12.5px] uppercase tracking-[0.42em] text-ivory hover:text-gold-light transition-colors duration-500 underline underline-offset-[10px] decoration-gold-light/80 decoration-[1px] pt-2 sm:pt-0"
                >
                  <L value={cms.ctaSecondaryLabel} />
                </Link>
              </div>

              <div className="mt-7 flex justify-center">
                <span className="block h-px w-40 bg-gold-light/40" />
              </div>
            </div>
          </Reveal>
        </div>

        <div
          className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/85 text-[10px] tracking-[0.32em] uppercase"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
        >
          <T k="home.scroll" />
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
            <p className="eyebrow text-gold-deep"><L value={cms.signatureEyebrow} fallback=""/></p>
            <h2 className="display text-[clamp(40px,6vw,84px)] leading-[1.02] mt-4 max-w-3xl">
              <L value={cms.signatureTitle} fallback="" />
              {!pickLocalized(cms.signatureTitle, 'en') && (
                <>
                  <T k="home.sig.title.l1" />
                  <span className="display-italic text-gold"> <T k="home.sig.title.l2" /></span>
                </>
              )}
            </h2>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-xl mt-8 leading-relaxed">
              <L value={cms.signatureBody} fallback="" />
              {!pickLocalized(cms.signatureBody, 'en') && <T k="home.sig.body" />}
            </p>
            <hr className="gold-rule mt-10" />
          </Reveal>

          <GalleryShowcaseClient items={signature} />

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <Link href="/gallery" className="btn">
                <T k="home.sig.cta" /> <span className="btn-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== BRAND STORY TEASER ============================== */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <p className="eyebrow text-gold-light"><L value={cms.storyEyebrow} fallback="" /></p>
            <h2 className="display text-[clamp(40px,6vw,84px)] leading-[1.02] mt-4">
              <L value={cms.storyTitle} fallback="" />
              {!pickLocalized(cms.storyTitle, 'en') && (
                <>
                  <T k="home.story.title.l1" />
                  <span className="display-italic text-gold-light"> <T k="home.story.title.l2" /></span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[15px] tracking-[0.02em] text-ivory/85 leading-[1.85]">
              <L value={cms.storyBody} fallback="" />
              {!pickLocalized(cms.storyBody, 'en') && <T k="home.story.body" />}
            </p>
            <hr className="gold-rule mt-8" />
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 font-sans text-[12px] uppercase tracking-[0.28em] text-gold-light hover:text-ivory transition-colors duration-500"
            >
              <T k="home.story.cta" /> <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================== CLOSING CTA ============================== */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            <Wordmark size="xl" />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="display text-[clamp(36px,5vw,68px)] leading-[1.05] mt-10">
              <L value={cms.closingTitle} fallback="" />
              {!pickLocalized(cms.closingTitle, 'en') && (
                <>
                  <T k="home.close.title.l1" />
                  <span className="display-italic text-gold"> <T k="home.close.title.l2" /></span>
                </>
              )}
            </h2>
            <p className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/75 max-w-xl mx-auto mt-8 leading-relaxed">
              <L value={cms.closingBody} fallback="" />
              {!pickLocalized(cms.closingBody, 'en') && <T k="home.close.body" />}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book" className="btn btn-solid">
                <T k="home.close.cta.book" /> <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact" className="btn">
                <T k="home.close.cta.channels" />
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
