import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '2dkw5oqu';
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || 'production';
export const apiVersion = '2024-01-01';

/** Public read-only client — safe in browser bundle. */
export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/** Build a Sanity-hosted image URL with hotspot-aware cropping. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Compatibility helper — returns a usable URL or null. */
export function sanityImageUrl(source: SanityImageSource | undefined | null, w = 1600): string | null {
  if (!source) return null;
  try {
    return urlFor(source).width(w).auto('format').url();
  } catch {
    return null;
  }
}
