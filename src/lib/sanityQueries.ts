/**
 * GROQ queries. Localized fields are fetched as full objects
 *   { en, th, zh }
 * so the client can pick the right variant via pickLocalized() based on
 * the current locale, with EN fallback when th/zh are empty.
 *
 * For backwards compat, the same projection works whether the document
 * was migrated or not — Sanity simply returns null for missing sub-fields,
 * and pickLocalized handles that gracefully.
 */

/** Project a localizedString/localizedText into a flat object. */
const LOC = `{ en, th, zh }`;

/* ───────────── Site settings (singleton) ───────────── */
export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  brandName, wordmark, wordmarkSubtitle,
  "tagline": tagline${LOC},
  establishedYear,
  phoneDisplay, phoneTel,
  lineHandle, lineUrl, instagramHandle, instagramUrl,
  "addressLines": addressLines[]${LOC},
  "addressOneLine": addressOneLine${LOC},
  "hours": hours${LOC},
  "transitNote": transitNote${LOC},
  googleMapEmbedUrl,
  "trustSignals": trustSignals[]{
    "label": label${LOC},
    "detail": detail${LOC}
  },
  "navLinks": navLinks[]{
    href,
    "label": label${LOC}
  },
  "footerNote": footerNote${LOC},
  "ogImage": ogImage.asset->url
}`;

/* ───────────── Homepage singleton + featured pieces ───────────── */
export const HOMEPAGE_QUERY = `{
  "homepage": *[_id == "homepage"][0]{
    heroImage, heroImageMobile,
    "heroImageAlt": heroImageAlt${LOC},
    "heroEyebrow": heroEyebrow${LOC},
    "heroTitle": heroTitle${LOC},
    "heroItalic": heroItalic${LOC},
    "heroLede": heroLede${LOC},
    "ctaPrimaryLabel": ctaPrimaryLabel${LOC},
    ctaPrimaryHref,
    "ctaSecondaryLabel": ctaSecondaryLabel${LOC},
    ctaSecondaryHref,
    "ctaPlateEyebrow": ctaPlateEyebrow${LOC},
    "signatureEyebrow": signatureEyebrow${LOC},
    "signatureTitle": signatureTitle${LOC},
    "signatureBody": signatureBody${LOC},
    "storyEyebrow": storyEyebrow${LOC},
    "storyTitle": storyTitle${LOC},
    "storyBody": storyBody${LOC},
    storyImage,
    "storyImageAlt": storyImageAlt${LOC},
    "closingTitle": closingTitle${LOC},
    "closingBody": closingBody${LOC}
  },
  "featured": *[_id == "homepageGallery"][0].featuredPieces[]->{
    _id,
    "name": name${LOC},
    "alt": alt${LOC},
    "description": description${LOC},
    image, aspect,
    "categories": categories[]->{ _id, "title": title${LOC}, "slug": slug.current }
  },
  "allHero": *[_type == "galleryPiece" && hero == true]|order(order asc){
    _id,
    "name": name${LOC},
    "alt": alt${LOC},
    "description": description${LOC},
    image, aspect,
    "categories": categories[]->{ _id, "title": title${LOC}, "slug": slug.current }
  }
}`;

/* ───────────── Full gallery ───────────── */
export const GALLERY_QUERY = `{
  "pieces": *[_type == "galleryPiece"]|order(order asc, _createdAt asc){
    _id,
    "name": name${LOC},
    "alt": alt${LOC},
    "description": description${LOC},
    image, aspect, hero, order,
    "categories": categories[]->{ _id, "title": title${LOC}, "slug": slug.current }
  },
  "categories": *[_type == "category"]|order(order asc, title.en asc){
    _id,
    "title": title${LOC},
    "slug": slug.current
  }
}`;

/* ───────────── Sub-pages ───────────── */
export const ABOUT_QUERY = `*[_id == "aboutPage"][0]{
  "maisonTitle": maisonTitle${LOC},
  "maisonBody": maisonBody${LOC},
  "philosophyTitle": philosophyTitle${LOC},
  "philosophyBody": philosophyBody${LOC},
  "bespokeSteps": bespokeSteps[]{
    number,
    "title": title${LOC},
    "body": body${LOC}
  },
  portraitImage,
  "portraitImageAlt": portraitImageAlt${LOC}
}`;

export const INFO_QUERY = `*[_id == "infoPage"][0]{
  "title": title${LOC},
  "description": description${LOC},
  "sections": sections[]{
    "eyebrow": eyebrow${LOC},
    "title": title${LOC},
    "body": body[]${LOC}
  }
}`;

export const CONTACT_QUERY = `*[_id == "contactPage"][0]{
  "headline": headline${LOC},
  "subhead": subhead${LOC},
  "channels": channels[]{
    "label": label${LOC},
    value,
    href,
    "secondary": secondary${LOC}
  },
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
