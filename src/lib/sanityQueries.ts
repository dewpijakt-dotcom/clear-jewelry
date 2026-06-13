import { sanityClient } from './sanity';

/* ───────────── Site settings (singleton) ───────────── */
export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  brandName, wordmark, wordmarkSubtitle, tagline, establishedYear,
  phoneDisplay, phoneTel,
  lineHandle, lineUrl, instagramHandle, instagramUrl,
  addressLines, addressOneLine, hours, transitNote, googleMapEmbedUrl,
  trustSignals, navLinks, footerNote,
  "ogImage": ogImage.asset->url
}`;

/* ───────────── Homepage singleton + featured pieces ───────────── */
export const HOMEPAGE_QUERY = `{
  "homepage": *[_id == "homepage"][0]{
    heroImage, heroImageMobile, heroImageAlt,
    heroEyebrow, heroTitle, heroItalic, heroLede,
    ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref, ctaPlateEyebrow,
    signatureEyebrow, signatureTitle, signatureBody,
    storyEyebrow, storyTitle, storyBody, storyImage, storyImageAlt,
    closingTitle, closingBody
  },
  "featured": *[_id == "homepageGallery"][0].featuredPieces[]->{
    _id, name, alt, description, image, aspect,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  },
  "allHero": *[_type == "galleryPiece" && hero == true]|order(order asc){
    _id, name, alt, description, image, aspect,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  }
}`;

/* ───────────── Full gallery ───────────── */
export const GALLERY_QUERY = `{
  "pieces": *[_type == "galleryPiece"]|order(order asc, _createdAt asc){
    _id, name, alt, description, image, aspect, hero, order,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  },
  "categories": *[_type == "category"]|order(order asc, title asc){
    _id, title, "slug": slug.current
  }
}`;

/* ───────────── Sub-pages ───────────── */
export const ABOUT_QUERY   = `*[_id == "aboutPage"][0]`;
export const INFO_QUERY    = `*[_id == "infoPage"][0]`;
export const CONTACT_QUERY = `*[_id == "contactPage"][0]`;

/* ───────────── Helpers ───────────── */
const REVALIDATE = 60; // seconds — Sanity → Vercel ISR

export async function fetchSanity<T>(query: string): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } } as any);
  } catch {
    return null;
  }
}
