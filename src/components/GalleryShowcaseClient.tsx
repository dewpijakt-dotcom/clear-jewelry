'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { GalleryItem } from '@/lib/gallery-manifest';
import Lightbox from './Lightbox';

/**
 * Home-page gallery preview — a dense uniform-square wall.
 *
 * Inspiration: Graff's "Explore By Gems" rooms and HW's product grids —
 * a wall of strong frames at consistent rhythm, density doing the
 * editorial work. No "hero tile that breaks the grid" — every piece is
 * weighed equally; the typography above the wall sets the eyebrow.
 *
 *  – 4 columns × 3 rows at desktop  (12 tiles)
 *  – 3 columns at tablet
 *  – 2 columns at mobile
 *  – Tight 2px gap, hover veil with caption, lightbox on click
 */
export default function GalleryShowcaseClient({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-1">
        {items.map((item, i) => {
          const isHover = hoverIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="group relative block w-full aspect-square overflow-hidden bg-charcoal text-left"
              aria-label={item.name}
            >
              {item.src && (
                <Image
                  src={`/images/gallery/${item.src}`}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className={clsx(
                    'object-cover transition-transform duration-[1600ms] ease-out',
                    isHover ? 'scale-[1.05]' : 'scale-100',
                  )}
                />
              )}

              {/* hover veil */}
              <div
                className={clsx(
                  'absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-700',
                  'pointer-events-none',
                )}
              />

              {/* hover caption */}
              <div
                className={clsx(
                  'absolute bottom-0 left-0 right-0 p-4 lg:p-5',
                  'translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100',
                  'transition-all duration-700',
                  'pointer-events-none',
                )}
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold-light">
                  {item.categories[0]}
                </p>
                <h3 className="display text-ivory text-lg lg:text-xl mt-1 leading-snug">
                  {item.name}
                </h3>
              </div>
            </button>
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
