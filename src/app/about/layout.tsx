import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Maison',
  description:
    'CLEAR Jewelry — a Bangkok high-jewellery atelier since 1993. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Hand-set, GIA-certified, signed CLEAR 1993.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
