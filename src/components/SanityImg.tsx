'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * SanityImg — native <img> bound directly to the Sanity image CDN.
 *
 * Why not next/image: every next/image request goes through Vercel's
 * `/_next/image` proxy which embeds the deployment ID. When the ISR cache
 * for a page holds HTML from a previous deploy AND the JS bundle is fresh,
 * each tile fires once for the stale-SSR proxy URL and once again for the
 * hydrated client's proxy URL — doubling image traffic and saturating
 * the browser's concurrency cap on first load. Sanity's CDN already serves
 * AVIF/WebP via `auto=format` so the Next.js image worker adds no value
 * for Sanity-hosted assets.
 *
 * This component generates a multi-width srcset directly via the project's
 * `urlFor()` builder and renders a plain <img>. It accepts an optional
 * LQIP base64 string and paints it as a soft background while the full
 * image loads — same UX as next/image's `placeholder="blur"` with no
 * proxy hop.
 *
 * IMPORTANT cached-image race: when the browser already has the image in
 * cache, the <img>'s `load` event fires DURING parse — before React commits
 * the onLoad listener. Without a mount-time check, `loaded` would stay
 * false forever and the image would sit at opacity 0.001 (LQIP visible
 * but real image hidden). The useEffect below detects this by checking
 * `img.complete && img.naturalWidth > 0` on mount and flipping `loaded`.
 *
 * Local /public/ assets keep using next/image (hero photo, og.jpg, etc.) —
 * the fix is scoped to Sanity-fed gallery imagery.
 */

import { urlFor } from '@/lib/sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const DEFAULT_WIDTHS = [400, 640, 900, 1200, 1600];

export interface SanityImgProps {
  /** Either the raw Sanity image object (with `_ref`) or a prebuilt CDN URL string. */
  source: SanityImageSource | string | null | undefined;
  alt: string;
  /** CSS sizes attribute, e.g. "(max-width: 768px) 50vw, 25vw". */
  sizes: string;
  /** LQIP base64 string (data URL) from `asset.metadata.lqip`. */
  blurDataURL?: string;
  /** Native intrinsic dimensions for CLS — read from `asset.metadata.dimensions`. */
  width?: number;
  height?: number;
  /** Render fill-style (absolute inset-0). Default true. */
  fill?: boolean;
  /** Eager load (above the fold). Default lazy. */
  priority?: boolean;
  /** Class on the rendered <img>. */
  className?: string;
  /** Inline style override. */
  style?: CSSProperties;
  /** Override the largest width requested. */
  maxWidth?: number;
  /** Callback when the image is fully loaded. */
  onLoad?: () => void;
}

/**
 * Build a Sanity URL for the given width, returning '' on failure
 * so a bad ref doesn't crash the page.
 */
function buildUrl(source: SanityImageSource | string, width: number): string {
  if (typeof source === 'string') {
    // Already a CDN URL — patch the width param.
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
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Race fix: image may already be complete by the time React attaches
  // the onLoad handler (cache, srcset preconnect, etc.). Detect that
  // case on mount and flip `loaded` so the image actually becomes visible.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      onLoad?.();
    }
    // We intentionally do not depend on `onLoad` — it's a stable callback
    // that's called once on cache-hit. Including it would re-run the
    // effect on every parent render and prematurely re-fire the callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!source) return null;

  // Build srcset across the standard widths, capped by maxWidth.
  const widths = DEFAULT_WIDTHS.filter((w) => w <= maxWidth);
  if (widths[widths.length - 1] !== maxWidth) widths.push(maxWidth);
  const srcset = widths
    .map((w) => `${buildUrl(source, w)} ${w}w`)
    .join(', ');
  const src = buildUrl(source, Math.min(1200, maxWidth));

  // Compose styles. LQIP is shown as a soft background under the image
  // until the network swap completes, then fades out.
  // Always opacity 1. The LQIP backgroundImage sits behind the <img>'s
  // own pixels: while the real image is still on the wire, the browser
  // paints nothing for the <img> content and the LQIP shows through. Once
  // the image bytes arrive, the real pixels paint on top of the LQIP.
  // Earlier iterations gated visibility on a `loaded` useState flag, but
  // the flag relied on either the JSX onLoad event firing AFTER React
  // commit, or a mount-time `img.complete` check — both raced badly with
  // browser cache hits in production builds and left tiles stuck invisible.
  // Going opacity-1-always removes the entire race surface.
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
    ...style,
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
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
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
    />
  );
}
