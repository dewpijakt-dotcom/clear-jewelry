'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/gallery-manifest';
import PieceTile from './PieceTile';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

/**
 * Client-side gallery showcase used on the homepage. Renders an asymmetric
 * grid of `items` and opens the lightbox on click.
 */
export default function GalleryShowcaseClient({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
        {items.map((item, i) => {
          // First piece is the hero tile (spans 3 cols), then alternate sizing.
          const span =
            i === 0
              ? 'md:col-span-4 md:row-span-2'
              : i === 1
              ? 'md:col-span-2'
              : i === 4
              ? 'md:col-span-3'
              : 'md:col-span-2';
          return (
            <Reveal key={i} delay={i * 0.06} className={span}>
              <PieceTile item={item} onClick={() => setActiveIndex(i)} priority={i === 0} />
            </Reveal>
          );
        })}
      </div>

      <Lightbox
        item={activeIndex !== null ? items[activeIndex] : null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          activeIndex !== null && activeIndex > 0
            ? () => setActiveIndex(activeIndex - 1)
            : undefined
        }
        onNext={
          activeIndex !== null && activeIndex < items.length - 1
            ? () => setActiveIndex(activeIndex + 1)
            : undefined
        }
      />
    </>
  );
}
