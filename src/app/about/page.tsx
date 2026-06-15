import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Wordmark from '@/components/Wordmark';
import T from '@/components/T';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Three decades of rare stones. CLEAR Jewelry is an independent Thai high-jewellery house founded 1993 in Bangkok.',
};

const STEPS: { n: string; titleKey: string; bodyKey: string }[] = [
  { n: '01', titleKey: 'about.besp.s1.title', bodyKey: 'about.besp.s1.body' },
  { n: '02', titleKey: 'about.besp.s2.title', bodyKey: 'about.besp.s2.body' },
  { n: '03', titleKey: 'about.besp.s3.title', bodyKey: 'about.besp.s3.body' },
  { n: '04', titleKey: 'about.besp.s4.title', bodyKey: 'about.besp.s4.body' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — editorial */}
      <section className="bg-ivory pt-40 lg:pt-48 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-end">
          <Reveal>
            <p className="eyebrow text-gold-deep"><T k="about.eyebrow" /></p>
            <h1 className="display text-[clamp(48px,8vw,144px)] leading-[0.96] mt-4 tracking-[-0.012em]">
              <T k="about.h1.l1" />
              <span className="display-italic text-gold"> <T k="about.h1.l2" /></span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85]">
              <T k="about.intro.body" />
            </p>
            <hr className="gold-rule mt-8" />
          </Reveal>
        </div>
      </section>

      {/* Editorial split — image (placeholder) + body */}
      <section className="bg-ivory pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] bg-charcoal overflow-hidden">
              <div className="absolute inset-8 border border-[var(--rule-invert)] pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wordmark size="xl" variant="light" className="opacity-50" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow text-gold-deep mb-4"><T k="about.phil.eyebrow" /></p>
            <h2 className="display text-[clamp(32px,4.4vw,56px)] leading-[1.06]">
              <T k="about.phil.h2.l1" />
              <span className="display-italic text-gold"> <T k="about.phil.h2.l2" /></span>
            </h2>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85] mt-8">
              <T k="about.phil.body1" />
            </p>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85] mt-5">
              <T k="about.phil.body2" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bespoke approach — dark band */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="eyebrow text-gold-light"><T k="about.besp.eyebrow" /></p>
            <h2 className="display text-[clamp(36px,5vw,72px)] leading-[1.04] mt-4">
              <T k="about.besp.h2.l1" />
              <span className="display-italic text-gold-light"> <T k="about.besp.h2.l2" /></span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ol className="space-y-10 mt-2">
              {STEPS.map((step) => (
                <li key={step.n} className="grid grid-cols-[60px_1fr] gap-6 items-start">
                  <span className="display-italic text-gold-light text-3xl">{step.n}</span>
                  <div>
                    <h3 className="display text-2xl"><T k={step.titleKey} /></h3>
                    <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/80 mt-2 leading-relaxed">
                      <T k={step.bodyKey} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <hr className="gold-rule mt-12 opacity-70" />
            <Link href="/book" className="btn btn-light mt-10">
              <T k="about.besp.cta" /> <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote close */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow text-gold-deep mb-8"><T k="about.quote.eyebrow" /></p>
            <p className="display-italic text-[clamp(28px,3.8vw,44px)] leading-[1.25] text-charcoal max-w-3xl mx-auto">
              <T k="about.quote.body" />
            </p>
            <hr className="gold-rule mx-auto mt-10" />
            <p className="font-sans text-[11.5px] uppercase tracking-[0.28em] text-charcoal/60 mt-6">
              <T k="about.quote.attr" />
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
