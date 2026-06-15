import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import BookHandoff from './BookHandoff';

export const metadata: Metadata = {
  title: 'Booking an appointment',
  description:
    'Opening LINE — message @clearjewelry to arrange a private viewing at our atelier in Gaysorn Centre, Bangkok.',
  robots: { index: false, follow: false },
};

/**
 * /book — a brief gilt ceremony, then a hand-off to LINE.
 *
 * Replaces the instant server redirect. The visitor still lands in LINE,
 * but the maison says "welcome" first.
 */
export default function BookPage() {
  return <BookHandoff lineUrl={BRAND.lineUrl} lineHandle={BRAND.lineHandle} />;
}
