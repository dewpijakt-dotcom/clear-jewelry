import type { Metadata } from 'next';
import BookClient from './BookClient';

export const metadata: Metadata = {
  title: 'Book a private viewing',
  description:
    'Reserve a private viewing at CLEAR Jewelry. WhatsApp for the fastest reply, or LINE @clearjewelry. Gaysorn Centre, Bangkok.',
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return <BookClient />;
}
