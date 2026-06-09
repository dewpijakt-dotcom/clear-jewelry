import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Noto_Serif_Thai } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { BRAND } from '@/lib/brand';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

const notoThai = Noto_Serif_Thai({
  subsets: ['thai'],
  weight: ['400', '500'],
  variable: '--font-noto-thai',
  display: 'swap',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      'High-jewellery house since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${notoThai.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
