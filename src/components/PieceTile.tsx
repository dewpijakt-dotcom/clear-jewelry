'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import { GalleryItem } from '@/lib/gallery-manifest';
import Wordmark from './Wordmark';

interface PieceTileProps {
  item: GalleryItem;
  onClick?: () => void;
  priority?: boolean;
}

const ASPECT_CLASS: Record<GalleryItem['aspect'], string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[5/4]',
};

/**
 * Renders a single gallery tile. If `item.src` is set, loads the real image
 * with next/image; otherwise renders a luxe placeholder (ivory or onyx tile
 * with a centered gold CLEAR wordmark).
 */
export default function PieceTile({ item, onClick, priority = false }: PieceTileProps) {
  const [hover, setHover] = useState(false);
  const placeholderSurface = item.placeholder ?? 'ivory';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx(
        'group relative block w-full overflow-hidden text-left',
        ASPECT_CLASS[item.aspect],
        placeholderSurface === 'onyx' ? 'bg-charcoal' : 'bg-ivory',
      )}
      aria-label={item.name}
    >
      {item.src ? (
        <Image
          src={`/images/gallery/${item.src}`}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className={clsx(
            'object-cover transition-transform duration-[1600ms] ease-elegant',
            hover ? 'scale-[1.04]' : 'scale-100',
          )}
        />
      ) : (
        // Elegant placeholder while the client uploads real photos.
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-6 border border-[var(--rule)] pointer-events-none" />
          <Wordmark
            size="md"
            variant={placeholderSurface === 'onyx' ? 'light' : 'dark'}
            className="opacity-50"
          />
        </div>
      )}

      {/* hover veil + caption */}
      <div
        className={clsx(
          'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-elegant',
          'pointer-events-none',
        )}
      />
      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 p-6 lg:p-7',
          'translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100',
          'transition-all duration-700 ease-elegant',
        )}
      >
        <p className="eyebrow text-gold-light">{item.categories[0]}</p>
        <h3 className="display text-ivory text-xl lg:text-2xl mt-1 leading-snug">{item.name}</h3>
        {item.spec && (
          <p className="font-sans text-[11.5px] tracking-[0.04em] text-ivory/80 mt-2">{item.spec}</p>
        )}
      </div>
    </button>
  );
}
