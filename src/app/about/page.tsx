import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Wordmark from '@/components/Wordmark';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Three decades of rare stones. CLEAR Jewelry is an independent Thai high-jewellery house founded 1993 in Bangkok.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — editorial */}
      <section className="bg-ivory pt-40 lg:pt-48 pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-end">
          <Reveal>
            <p className="eyebrow text-gold-deep">The house</p>
            <h1 className="display text-[clamp(48px,8vw,144px)] leading-[0.96] mt-4 tracking-[-0.012em]">
              Thirty years of
              <span className="display-italic text-gold"> rare stones.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85]">
              CLEAR Jewelry was founded in Bangkok in 1993 by a single family of
              gemologists who believed Thai high-jewellery deserved its own
              independent name. Thirty years later the brief is unchanged:
              source the rarest stones in the world, set them by hand, and only
              ever sign work we would wear ourselves.
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
            <p className="eyebrow text-gold-deep mb-4">Philosophy</p>
            <h2 className="display text-[clamp(32px,4.4vw,56px)] leading-[1.06]">
              Rare colour. Flawless
              <span className="display-italic text-gold"> luster.</span>
            </h2>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85] mt-8">
              We work primarily with unheated Burmese rubies, royal blue Ceylon
              sapphires, fancy &amp; black diamonds, and the occasional Paraiba
              tourmaline. Every signature stone is GIA-certified. Every setting
              is finished by a master polisher we have worked with for fifteen
              years. Nothing is rushed; nothing is mass-produced.
            </p>
            <p className="font-sans text-[15px] tracking-[0.02em] text-charcoal/80 leading-[1.85] mt-5">
              The house has remained small on purpose. Our atelier produces only
              what we can verify ourselves, which means our pieces are
              one-of-one, and our relationships — with stone dealers, with
              clients, with the families who have been collecting from us for
              two generations — are personal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bespoke approach — dark band */}
      <section className="bg-charcoal text-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="eyebrow text-gold-light">Bespoke</p>
            <h2 className="display text-[clamp(36px,5vw,72px)] leading-[1.04] mt-4">
              Bring an idea, an heirloom,
              <span className="display-italic text-gold-light"> a stone you love.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <ol className="space-y-10 mt-2">
              {[
                {
                  n: '01',
                  title: 'Conversation',
                  body:
                    'A private meeting at the atelier. We listen, sketch, and look at stones together. No pressure, no fixed time.',
                },
                {
                  n: '02',
                  title: 'Stone selection',
                  body:
                    'We present pre-vetted GIA-certified options across budgets. You touch, you compare, you choose.',
                },
                {
                  n: '03',
                  title: 'Design & approval',
                  body:
                    'Hand-drawn sketches, then 3D renders. We revise until the line of the piece feels exactly right.',
                },
                {
                  n: '04',
                  title: 'Setting & finish',
                  body:
                    'Hand-set, hand-polished. Typical lead time four to six weeks for signature commissions.',
                },
              ].map((step, i) => (
                <li key={step.n} className="grid grid-cols-[60px_1fr] gap-6 items-start">
                  <span className="display-italic text-gold-light text-3xl">{step.n}</span>
                  <div>
                    <h3 className="display text-2xl">{step.title}</h3>
                    <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/80 mt-2 leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <hr className="gold-rule mt-12 opacity-70" />
            <Link href="/book" className="btn btn-light mt-10">
              Start a commission <span className="btn-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote close */}
      <section className="bg-ivory py-32 lg:py-40">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-10 text-center">
          <Reveal>
            <p className="eyebrow text-gold-deep mb-8">In our own words</p>
            <p className="display-italic text-[clamp(28px,3.8vw,44px)] leading-[1.25] text-charcoal max-w-3xl mx-auto">
              &ldquo;A piece worth signing CLEAR 1993 has only ever begun with
              the stone. Everything else &mdash; the metal, the line, the setting
              &mdash; is in service of the colour.&rdquo;
            </p>
            <hr className="gold-rule mx-auto mt-10" />
            <p className="font-sans text-[11.5px] uppercase tracking-[0.28em] text-charcoal/60 mt-6">
              Atelier {BRAND.name} · Bangkok
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
