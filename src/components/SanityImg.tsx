'use client';

import { type CSSProperties } from 'react';

/**
 * SanityImg — native <img> bound directly to the Sanity image CDN.
 *
 * HARD LESSON — no opacity gating, ever. Earlier iterations of this
 * component used a `loaded` useState flag flipped from <img onLoad>, with
 * a useEffect mount-time `img.complete` fallback for cache-hit races.
 * Both flavours raced badly on Vercel production builds: under React 18
 * concurrent rendering + hydration, the <img> tag was occasionally parsed
 * and its `load` event fired between the server-rendered HTML hitting
 * the DOM and React committing the client handler, with the useEffect
 * also running on a torn-down ref. Tiles stayed at opacity 0
 * indefinitely on /gallery (the page with the most <img> tags). Clicking
 * a tile force-rendered the parent, which happened to re-fire the effect
 * with a now-live ref — exactly the user-reported symptom of "I can
 * click on the images and then it will show up after I click on them."
 *
 * The fix is to remove the entire bug class: no state, no effect, no
 * ref, no transition, no opacity gating. The browser already does the
 * right thing — paint LQIP background until pixels arrive, then paint
 * pixels on top. We let the browser do its job.
 *
 * Local /public/ assets keep using next/image (hero photo, og.jpg, etc.).
 */

import { urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const DEFAULT_WIDTHS = [400, 640, 900, 1200, 1600];

export interface SanityImgProps {
  source: SanityImageSource | string | null | undefined;
  alt: string;
  sizes: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  maxWidth?: number;
  onLoad?: () => void;
}

function buildUrl(source: SanityImageSource | string, width: number): string {
  if (typeof source === 'string') {
    try {
      const u = new URL(source);
      u.searchParams.set('w', String(width));
      u.searchParams.set('q', '80');
      u.searchParams.set('auto', 'format');
      return u.toString();
    } catch {
      return source;
    }
  }
  try {
    return urlFor(source).width(width).quality(80).auto('format').url();
  } catch {
    return '';
  }
}

export default function SanityImg({
  source,
  alt,
  sizes,
  blurDataURL,
  width,
  height,
  fill = true,
  priority,
  className,
  style,
  maxWidth = 1600,
  onLoad,
}: SanityImgProps) {
  if (!source) return null;

  const widths = DEFAULT_WIDTHS.filter((w) => w <= maxWidth);
  if (widths[widths.length - 1] !== maxWidth) widths.push(maxWidth);
  const srcset = widths.map((w) => `${buildUrl(source, w)} ${w}w`).join(', ');
  const src = buildUrl(source, Math.min(1200, maxWidth));

  const composed: CSSProperties = {
    ...(fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : {}),
    objectFit: 'cover',
    ...(blurDataURL
      ? {
          backgroundImage: `url("${blurDataURL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {}),
    opacity: 1,
    display: 'block',
    ...style,
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      style={composed}
      onLoad={onLoad ? () => onLoad() : undefined}
    />
  );
}
