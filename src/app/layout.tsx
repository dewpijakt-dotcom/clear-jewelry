import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Noto_Serif_Thai, Noto_Serif_SC } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import MaisonWatermark from '@/components/MaisonWatermark';
import AmbientTint from '@/components/AmbientTint';
import { LanguageProvider } from '@/components/LanguageProvider';
import T from '@/components/T';
import { BRAND } from '@/lib/brand';
import type { Locale } from '@/lib/i18n';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
});

const notoThai = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400'],
  variable: '--font-noto-thai',
  display: 'swap',
});

const notoSC = Noto_Serif_SC({
  weight: ['400'],
  variable: '--font-noto-sc',
  display: 'swap',
  preload: false,
});

const SITE_URL = 'https://clear-jewelry.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    'CLEAR JEWELRY — an independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Gaysorn Centre, Bangkok.',
  keywords: [
    'Clear Jewelry', 'Bangkok jewellery', 'high jewellery', 'Burmese ruby',
    'royal blue sapphire', 'Gaysorn', 'bespoke jewelry Bangkok', 'GIA-certified',
    'จิวเวลรี่ กรุงเทพ', 'อัญมณีหายาก', 'CLEAR 1993',
  ],
  alternates: {
    canonical: '/',
    // hreflang — same content URL, different language variants.
    // The locale switch is client-side so the URL doesn't change; we still
    // surface the alternates so search engines understand the page is offered
    // in EN / TH / ZH and serve the right variant per user locale.
    languages: {
      'en': '/',
      'th': '/?lang=th',
      'zh': '/?lang=zh',
      'x-default': '/',
    },
  },
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'An independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds.',
    type: 'website',
    locale: 'en_TH',
    alternateLocale: ['th_TH', 'zh_CN'],
    siteName: BRAND.name,
    images: [{
      url: '/images/hero/hero-main.jpg',
      width: 1600,
      height: 1067,
      alt: 'CLEAR Jewelry — a signature royal blue sapphire ring, hand-set in platinum.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'High-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds.',
    images: ['/images/hero/hero-main.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* Schema.org Organization (parent) — describes the company. */
const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND.name,
  alternateName: ['CLEAR Jewelry', 'CLEAR 1993'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  foundingDate: String(BRAND.establishedYear),
  founder: { '@type': 'Organization', name: 'CLEAR Family Atelier' },
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: BRAND.phoneTel,
    contactType: 'Customer Service',
    areaServed: 'TH',
    availableLanguage: ['English', 'Thai', 'Chinese'],
  }],
  sameAs: [BRAND.instagramUrl, BRAND.lineUrl],
};

/* Schema.org JewelryStore — the physical local-business node. */
const JEWELRY_STORE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: BRAND.name,
  alternateName: 'CLEAR Jewelry',
  description:
    'Independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Hand-set, GIA-certified, signed CLEAR 1993.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/images/hero/hero-main.jpg`,
  telephone: BRAND.phoneTel,
  foundingDate: String(BRAND.establishedYear),
  priceRange: '฿฿฿฿',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '999 Ploenchit Road, Gaysorn Centre, 3rd Floor, Gaysorn Village',
    addressLocality: 'Lumpini, Pathumwan',
    addressRegion: 'Bangkok',
    postalCode: '10330',
    addressCountry: 'TH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.7440,
    longitude: 100.5424,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '19:00',
    },
  ],
  sameAs: [BRAND.instagramUrl, BRAND.lineUrl],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Unheated Burmese ruby jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Royal blue Ceylon sapphire jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Paraiba tourmaline jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Fancy and black diamond jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke high-jewellery commissions' } },
  ],
};

function readLocaleCookie(): Locale {
  try {
    const v = cookies().get('clear.locale')?.value;
    return v === 'th' || v === 'zh' ? v : 'en';
  } catch {
    return 'en';
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side initial locale from cookie — so first paint matches the
  // user's saved preference (no FOUC) and screen readers + SEO pick up
  // the right language attribute.
  const initialLocale = readLocaleCookie();

  return (
    <html
      lang={initialLocale}
      translate="no"
      className={`${cormorant.variable} ${jost.variable} ${notoThai.variable} ${notoSC.variable} notranslate`}
    >
      <head>
        {/* Tell Chrome/Edge/Safari not to auto-translate — we have a native
            EN/TH/ZH toggle, so browser auto-translate confuses things. */}
        <meta name="google" content="notranslate" />
        {/* Schema.org Organization — parent entity. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        {/* Schema.org JewelryStore — physical local-business node. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JEWELRY_STORE_JSONLD) }}
        />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        <LanguageProvider initialLocale={initialLocale}>
          {/* Skip-to-content link — keyboard users + screen readers. Inside the
              provider so the label localizes via the COPY dict. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-charcoal focus:text-ivory focus:px-4 focus:py-3 focus:text-[11px] focus:tracking-[0.32em] focus:uppercase"
          >
            <T k="a11y.skip" />
          </a>
          <LoadingScreen />
          <ScrollProgress />
          <AmbientTint />
          <MaisonWatermark />
          <SmoothScroll>
            <Header />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
