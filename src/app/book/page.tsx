import type { Metadata } from 'next';
import BookingForm from './BookingForm';

export const metadata: Metadata = {
  title: 'Book a private viewing',
  description:
    'Reserve a one-hour private viewing at CLEAR Jewelry. Pick a date and a time slot; we confirm via LINE @clearjewelry. Gaysorn Centre, Bangkok.',
  // Keep /book out of the index — it's a transactional page, not editorial.
  robots: { index: false, follow: false },
};

/**
 * /book — the in-house booking form.
 *
 * Previously this page played a 1.6s gilt animation and then redirected
 * straight to LINE. Per the latest brief that was one click too many,
 * and the booking flow now needs to gather time slot + visitor details
 * in-page before handing off to LINE. The form copies all the entered
 * details to the clipboard so the visitor can paste straight into the
 * LINE chat after adding @clearjewelry as a friend.
 */
export default function BookPage() {
  return <BookingForm />;
}
