import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact the Atelier',
  description:
    'Two ways to reach CLEAR Jewelry — WhatsApp for the fastest reply, or LINE @clearjewelry. Gaysorn Centre, Bangkok. By appointment.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
