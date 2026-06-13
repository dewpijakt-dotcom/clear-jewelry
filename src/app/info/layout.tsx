import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visit — Information for Visitors',
  description:
    'Everything worth knowing before you visit CLEAR Jewelry. Our expertise in rare unheated stones, GIA-certified authenticity, the bespoke process, and how to find us at Gaysorn Centre, Bangkok.',
};

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
