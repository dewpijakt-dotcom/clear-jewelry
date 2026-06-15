import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Noto_Serif_Thai, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import MaisonWatermark from '@/components/MaisonWatermark';
import AmbientTint from '@/components/AmbientTint';
import { LanguageProvider } from '@/components/LanguageProvider';
import { BRAND } from '@/lib/brand';

// Trimmed font set — only the weights actually used in the design system.
// Cormorant: 300 (display body), 500 (MarquiseSealDraw + Wordmark serif).
// Jost: 300 (body) and 400 (eyebrows, labels, buttons).
// Noto Serif Thai: 400 (paragraphs). Noto SC: 400 (paragraphs), preload off.
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
  preload: false, // No Latin subset for Simplified Chinese — load on demand
});

export const metadata: Metadata = {
  metadataBase: new URL('https://clear-jewelry.vercel.app'),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    'CLEAR JEWELRY — an independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Gaysorn Centre, Bangkok.',
  keywords: [
    'Clear Jewelry',
    'Bangkok jewellery',
    'high jewellery',
    'Burmese ruby',
    'royal blue sapphire',
    'Gaysorn',
    'bespoke jewelry Bangkok',
    'GIA-certified',
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'An independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds.',
    type: 'website',
    locale: 'en_TH',
    siteName: BRAND.name,
    images: ['/images/hero/hero-main.jpg'],
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
};

// Schema.org JewelryStore — lets Google index the maison as a real local
// business in Bangkok with address, hours, phone, social handles.
const JEWELRY_STORE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: BRAND.name,
  alternateName: 'CLEAR Jewelry',
  description:
    'Independent Thai high-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Hand-set, GIA-certified, signed CLEAR 1993.',
  url: 'https://clear-jewellery.vercel.app',
  logo: 'https://clear-jewellery.vercel.app/logo.png',
  image: 'https://clear-jewellery.vercel.app/images/hero/hero-main.jpg',
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
  sameAs: [
    BRAND.instagramUrl,
    BRAND.lineUrl,
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Unheated Burmese ruby jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Royal blue Ceylon sapphire jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Paraiba tourmaline jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Fancy and black diamond jewellery' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bespoke high-jewellery commissions' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${notoThai.variable} ${notoSC.variable}`}
    >
      <head>
        {/* Schema.org JewelryStore — discoverability + rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JEWELRY_STORE_JSONLD) }}
        />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        {/* Skip-to-content link — keyboard users + screen readers */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-charcoal focus:text-ivory focus:px-4 focus:py-3 focus:text-[11px] focus:tracking-[0.32em] focus:uppercase"
        >
          Skip to content
        </a>

        <LanguageProvider>
          <LoadingScreen />
          <CustomCursor />
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
