import type { Metadata } from 'next';

export const metadata: Metadata = {
      title: 'CLEAR Jewelry Studio',
      robots: { index: false, follow: false },
};

export default function StudioLayout(props: { children: React.ReactNode }) {
      return props.children;
}
