'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Lightbox from './Lightbox';
import { useLocale } from './LanguageProvider';
import { flattenItem } from '@/lib/i18n';
import type { LocalizedGalleryItem } from '@/lib/sanityAdapter';

/**
 * Home-page gallery preview — a dense uniform-square wall.
 * Sanity-fed via LocalizedGalleryItem: { name, alt, description } are
 * Localized objects. Resolved to plain strings via useLocale() so the
 * captions flip when the user toggles EN/TH/ZH.
 */
export default function GalleryShowcaseClient({ items }: { items: LocalizedGalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { locale } = useLocale();

  return (
    <>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-1">
        {items.map((item, i) => {
          const flat = flattenItem(item, locale);
          const isHover = hoverIndex === i;
          const displayName = flat.name || flat.description;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="group relative block w-full aspect-square overflow-hidden bg-charcoal text-left"
              aria-label={flat.alt}
            >
              {item.src && (
                <Image
                  src={(item.src && item.src.startsWith("http")) ? item.src : ("/images/gallery/" + item.src)}
                  alt={flat.alt}
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
                {/* Category badge intentionally omitted — categories on home items
                    are slug strings ('rings', 'necklaces' …), which render unlocalised
                    and styled-uppercase as ugly. The localised name shows on Gallery. */}
                <h3 className="display text-ivory text-lg lg:text-xl mt-1 leading-snug">
                  {displayName}
                </h3>
                {flat.name && flat.description && (
                  <p className="font-sans italic text-[12px] text-ivory/85 mt-2 leading-snug line-clamp-3">
                    {flat.description}
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
