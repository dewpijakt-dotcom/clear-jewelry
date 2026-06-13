import { sanityClient, sanityImageUrl } from './sanity';
import { GalleryItem, GALLERY as MANIFEST, sortedGallery, homePreview as manifestHomePreview } from './gallery-manifest';
import { HOMEPAGE_QUERY, GALLERY_QUERY, SITE_SETTINGS_QUERY, ABOUT_QUERY, INFO_QUERY, CONTACT_QUERY } from './sanityQueries';

/* ─── Types returned from Sanity (loose) ─────────────────────────── */
type SanityPiece = {
  _id: string;
  name?: string;
  alt?: string;
  description?: string;
  image?: any;
  aspect?: 'portrait' | 'square' | 'wide';
  hero?: boolean;
  order?: number;
  categories?: { _id: string; title: string; slug?: string }[];
};

const REVALIDATE = 60;

async function fetchSafe<T>(query: string): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } } as any);
  } catch {
    return null;
  }
}

/* ─── Convert SanityPiece → GalleryItem (manifest-compatible) ────── */
function toItem(p: SanityPiece): GalleryItem {
  const url = sanityImageUrl(p.image, 1600) ?? '';
  return {
    id: p._id,
    src: url,            // absolute https URL — components detect with /^https/
    alt: p.alt ?? '',
    description: p.description ?? '',
    name: p.name,
    aspect: p.aspect ?? 'square',
    hero: p.hero,
    order: p.order,
    categories: p.categories?.map((c) => (c.slug ?? c.title.toLowerCase()) as any),
  };
}

/* ─── Public API used by pages ──────────────────────────────────── */
export async function getHomepage() {
  type R = {
    homepage: any | null;
    featured: SanityPiece[] | null;
    allHero: SanityPiece[] | null;
  };
  const data = await fetchSafe<R>(HOMEPAGE_QUERY);
  if (!data) {
    // Fallback: derive a "homepage" shape from manifest + BRAND
    return {
      hero: { src: '/images/hero/hero-main.jpg', alt: 'A CLEAR Jewelry signature piece.' },
      heroEyebrow: 'Bangkok · Since 1993',
      heroTitle: 'Gemstone art',
      heroItalic: 'since 1993.',
      heroLede: 'An independent Thai high-jewellery house. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Hand-set, signed CLEAR 1993.',
      ctaPrimaryLabel: 'Book an Appointment',
      ctaPrimaryHref: '/book',
      ctaSecondaryLabel: 'View the Gallery',
      ctaSecondaryHref: '/gallery',
      ctaPlateEyebrow: 'By Private Appointment',
      signatureEyebrow: 'Signature',
      signatureTitle: 'The pieces we are known for.',
      signatureBody: 'Every signature stone is GIA-certified, every setting hand-finished. Each piece is a one-of-one composition.',
      storyEyebrow: 'Our story',
      storyTitle: 'Thirty years of rare stones.',
      storyBody: 'CLEAR Jewelry was founded in Bangkok in 1993 to do one thing quietly and well: source the rarest coloured stones in the world, set them by hand, and only ever sign work we would wear ourselves.',
      featured: manifestHomePreview(12),
    };
  }
  // Build featured list: explicit picks first, then backfill from hero-flagged
  const explicit = (data.featured ?? []).map(toItem);
  const heroes   = (data.allHero ?? []).map(toItem);
  const seen = new Set(explicit.map((g) => g.id));
  const fill = heroes.filter((g) => !seen.has(g.id));
  const featured = [...explicit, ...fill].slice(0, 12);

  const heroUrl = sanityImageUrl(data.homepage?.heroImage, 2400);
  const heroMobileUrl = sanityImageUrl(data.homepage?.heroImageMobile, 1200);

  return {
    hero: {
      src: heroUrl ?? '/images/hero/hero-main.jpg',
      srcMobile: heroMobileUrl ?? null,
      alt: data.homepage?.heroImageAlt ?? 'A CLEAR Jewelry signature piece.',
    },
    heroEyebrow: data.homepage?.heroEyebrow ?? 'Bangkok · Since 1993',
    heroTitle:   data.homepage?.heroTitle ?? 'Gemstone art',
    heroItalic:  data.homepage?.heroItalic ?? 'since 1993.',
    heroLede:    data.homepage?.heroLede ?? '',
    ctaPrimaryLabel:   data.homepage?.ctaPrimaryLabel ?? 'Book an Appointment',
    ctaPrimaryHref:    data.homepage?.ctaPrimaryHref ?? '/book',
    ctaSecondaryLabel: data.homepage?.ctaSecondaryLabel ?? 'View the Gallery',
    ctaSecondaryHref:  data.homepage?.ctaSecondaryHref ?? '/gallery',
    ctaPlateEyebrow:   data.homepage?.ctaPlateEyebrow ?? 'By Private Appointment',
    signatureEyebrow: data.homepage?.signatureEyebrow ?? 'Signature',
    signatureTitle:   data.homepage?.signatureTitle ?? 'The pieces we are known for.',
    signatureBody:    data.homepage?.signatureBody ?? '',
    storyEyebrow:     data.homepage?.storyEyebrow ?? 'Our story',
    storyTitle:       data.homepage?.storyTitle ?? '',
    storyBody:        data.homepage?.storyBody ?? '',
    storyImage:       sanityImageUrl(data.homepage?.storyImage, 1600),
    storyImageAlt:    data.homepage?.storyImageAlt ?? '',
    closingTitle:     data.homepage?.closingTitle ?? '',
    closingBody:      data.homepage?.closingBody ?? '',
    featured,
  };
}

export async function getFullGallery(): Promise<{ pieces: GalleryItem[]; categories: { id: string; title: string; slug: string }[] }> {
  type R = { pieces: SanityPiece[] | null; categories: { _id: string; title: string; slug: string }[] | null };
  const data = await fetchSafe<R>(GALLERY_QUERY);
  if (!data || !data.pieces || !data.pieces.length) {
    return {
      pieces: sortedGallery(),
      categories: [
        { id: 'all', title: 'All', slug: 'all' },
        { id: 'ring', title: 'Rings', slug: 'ring' },
        { id: 'necklace', title: 'Necklaces', slug: 'necklace' },
        { id: 'earring', title: 'Earrings', slug: 'earring' },
        { id: 'ruby', title: 'Rubies', slug: 'ruby' },
        { id: 'sapphire', title: 'Sapphires', slug: 'sapphire' },
        { id: 'diamond', title: 'Diamonds', slug: 'diamond' },
        { id: 'set', title: 'Sets', slug: 'set' },
      ],
    };
  }
  return {
    pieces: data.pieces.map(toItem),
    categories: (data.categories ?? []).map((c) => ({ id: c._id, title: c.title, slug: c.slug })),
  };
}

export async function getSiteSettings() {
  return fetchSafe<any>(SITE_SETTINGS_QUERY);
}
export async function getAboutPage()   { return fetchSafe<any>(ABOUT_QUERY); }
export async function getInfoPage()    { return fetchSafe<any>(INFO_QUERY); }
export async function getContactPage() { return fetchSafe<any>(CONTACT_QUERY); }
