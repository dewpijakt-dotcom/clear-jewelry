import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact CLEAR Jewelry — LINE @clearjewelry, +66 81 311 6666, Instagram @clearjewelry. Atelier at Gaysorn Centre, 3rd Floor, Bangkok.',
};

const CHANNELS = [
  {
    label: 'LINE Official',
    primary: BRAND.lineHandle,
    secondary: 'Fastest reply, in Thai or English',
    href: BRAND.lineUrl,
    external: true,
  },
  {
    label: 'Direct phone',
    primary: BRAND.phoneDisplay,
    secondary: 'Daily 11:00 – 19:00 (UTC+7)',
    href: `tel:${BRAND.phoneTel}`,
    external: false,
  },
  {
    label: 'Instagram',
    primary: BRAND.instagramHandle,
    secondary: 'Every new piece, first',
    href: BRAND.instagramUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-ivory pt-40 lg:pt-48 pb-16">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-gold-deep">Contact</p>
            <h1 className="display text-[clamp(48px,8vw,128px)] leading-[0.98] mt-4 max-w-3xl">
              Talk to the
              <span className="display-italic text-gold"> atelier.</span>
            </h1>
            <hr className="gold-rule wide mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Channels */}
          <div className="space-y-10">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={0.06 * i}>
                <Link
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="group block border-b border-[var(--rule-soft)] pb-10 hover:border-gold transition-colors duration-500"
                >
                  <p className="eyebrow text-gold-deep">{c.label}</p>
                  <p
                    className="display text-[clamp(28px,3.6vw,44px)] leading-tight mt-3 group-hover:text-gold transition-colors duration-500"
                    dangerouslySetInnerHTML={{ __html: c.primary }}
                  />
                  <p
                    className="font-sans text-[13px] tracking-[0.04em] text-charcoal/65 mt-3"
                    dangerouslySetInnerHTML={{ __html: c.secondary }}
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Atelier card */}
          <Reveal delay={0.1}>
            <aside className="bg-charcoal text-ivory p-10 lg:p-14">
              <p className="eyebrow text-gold-light">Atelier</p>
              <h2 className="display text-[clamp(28px,3.4vw,40px)] leading-tight mt-3">
                {BRAND.addressLines[0]}
              </h2>
              <p className="font-sans text-[14.5px] tracking-[0.02em] text-ivory/80 leading-relaxed mt-3">
                {BRAND.addressLines[1]}
                <br />
                {BRAND.addressLines[2]}
              </p>
              <hr className="gold-rule mt-8 opacity-70" />
              <dl className="mt-8 space-y-5 text-[13.5px] tracking-[0.02em]">
                <div>
                  <dt className="eyebrow text-gold-light/80">Hours</dt>
                  <dd className="mt-1 text-ivory/90">{BRAND.hours}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-gold-light/80">Transit</dt>
                  <dd className="mt-1 text-ivory/90">{BRAND.transitNote}</dd>
                </div>
              </dl>
              <Link href="/book" className="btn btn-light mt-10">
                Book an Appointment <span className="btn-arrow">→</span>
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-charcoal">
        <div className="relative w-full aspect-[16/8] md:aspect-[21/9]">
          <iframe
            title="Gaysorn Village map"
            src={BRAND.googleMapEmbedUrl}
            className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[1.05] brightness-95"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
