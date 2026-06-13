'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { GalleryItem } from '@/lib/gallery-manifest';
import Lightbox from './Lightbox';

/**
 * Home-page gallery preview — a dense uniform-square wall.
 *
 *   – auto-grows from the manifest (no fixed tile count in this component)
 *   – 4 columns × N rows at desktop, 3 at tablet, 2 at mobile
 *   – tight 1–3px gap, hover veil with editorial description, lightbox on click
 */
export default function GalleryShowcaseClient({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-1">
        {items.map((item, i) => {
          const isHover = hoverIndex === i;
          const displayName = item.name ?? item.description;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="group relative block w-full aspect-square overflow-hidden bg-charcoal text-left"
              aria-label={item.alt}
            >
              {item.src && (
                <Image
                  src={`/images/gallery/${item.src}`}
                  alt={item.alt}
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
                  'absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent',
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
                {item.categories && item.categories.length > 0 && (
                  <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-gold-light">
                    {item.categories[0]}
                  </p>
                )}
                <h3 className="display text-ivory text-lg lg:text-xl mt-1 leading-snug">
                  {displayName}
                </h3>
                {item.name && item.description && (
                  <p className="font-sans italic text-[12px] text-ivory/85 mt-2 leading-snug line-clamp-3">
                    {item.description}
                  </p>
                )}
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
