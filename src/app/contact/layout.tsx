import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact the Atelier',
  description:
    'Three ways to reach CLEAR Jewelry — LINE @clearjewelry for fastest reply, direct phone +66 81 311 6666, or Instagram @clearjewelry. Gaysorn Centre, Bangkok. By appointment.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
