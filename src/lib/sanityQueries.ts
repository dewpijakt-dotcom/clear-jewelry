/**
 * GROQ queries.
 *
 * Each visible-text field is fetched in its RAW form (string for legacy /
 * unmigrated documents; { en, th, zh } object for documents migrated by
 * scripts/migrate-to-localized.mjs). The adapter's `loc()` helper
 * normalises both shapes before they reach React.
 *
 * This dual-shape support means the site renders correctly whether the
 * migration has been run or not — empty / missing Thai/Chinese fall back
 * to English via pickLocalized().
 */

/* ───────────── Site settings (singleton) ───────────── */
export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  brandName, wordmark, wordmarkSubtitle,
  tagline,
  establishedYear,
  phoneDisplay, phoneTel,
  lineHandle, lineUrl,
  addressLines, addressOneLine, hours, transitNote,
  googleMapEmbedUrl,
  trustSignals,
  navLinks,
  footerNote,
  "ogImage": ogImage.asset->url
}`;

/* ───────────── Homepage singleton + featured pieces ───────────── */
export const HOMEPAGE_QUERY = `{
  "homepage": *[_id == "homepage"][0]{
    "heroImage": heroImage{ ..., asset->{ url, metadata } },
    "heroImageMobile": heroImageMobile{ ..., asset->{ url, metadata } },
    heroImageAlt,
    heroEyebrow, heroTitle, heroItalic, heroLede,
    ctaPrimaryLabel, ctaPrimaryHref,
    ctaSecondaryLabel, ctaSecondaryHref,
    ctaPlateEyebrow,
    signatureEyebrow, signatureTitle, signatureBody,
    storyEyebrow, storyTitle, storyBody,
    "storyImage": storyImage{ ..., asset->{ url, metadata } }, storyImageAlt,
    closingTitle, closingBody
  },
  "featured": *[_id == "homepageGallery"][0].featuredPieces[]->{
    _id, name, alt, description,
    "image": image{ ..., asset->{ url, metadata } }, aspect,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  },
  "allHero": *[_type == "galleryPiece" && hero == true]|order(order asc){
    _id, name, alt, description,
    "image": image{ ..., asset->{ url, metadata } }, aspect,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  }
}`;

/* ───────────── Full gallery ───────────── */
export const GALLERY_QUERY = `{
  "pieces": *[_type == "galleryPiece"]|order(order asc, _createdAt asc){
    _id, name, alt, description,
    "image": image{ ..., asset->{ url, metadata } }, aspect, hero, order,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  },
  "categories": *[_type == "category"]|order(order asc){
    _id, title, "slug": slug.current
  }
}`;

/* ───────────── Sub-pages ───────────── */
export const ABOUT_QUERY = `*[_id == "aboutPage"][0]{
  maisonTitle, maisonBody,
  philosophyTitle, philosophyBody,
  "bespokeSteps": bespokeSteps[]{ number, title, body },
  portraitImage, portraitImageAlt
}`;

export const INFO_QUERY = `*[_id == "infoPage"][0]{
  title, description,
  "sections": sections[]{ eyebrow, title, body }
}`;

export const CONTACT_QUERY = `*[_id == "contactPage"][0]{
  headline, subhead,
  "channels": channels[]{ label, value, href, secondary },
  mapEmbedUrl
}`;

/* ───────────── Helpers ───────────── */
const REVALIDATE = 60;

import { sanityClient } from './sanity';

export async function fetchSanity<T>(query: string): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } } as any);
  } catch {
    return null;
  }
}
