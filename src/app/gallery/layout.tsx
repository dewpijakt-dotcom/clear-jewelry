import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery — On View',
  description:
    'A curated catalogue of the CLEAR Jewelry collection. Marquise diamond drops, Paraiba tourmaline rings, pigeon-blood Burmese rubies, royal blue sapphires. Shown by appointment at Gaysorn Centre, Bangkok.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
