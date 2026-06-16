import { sanityClient, sanityImageUrl } from './sanity';
import { GalleryItem, sortedGallery, homePreview as manifestHomePreview } from './gallery-manifest';
import { HOMEPAGE_QUERY, GALLERY_QUERY, SITE_SETTINGS_QUERY, ABOUT_QUERY, INFO_QUERY, CONTACT_QUERY } from './sanityQueries';
import { Localized } from './i18n';

/**
 * Adapter that turns Sanity GROQ results into shapes pages can render.
 *
 * Localized fields come out as `{ en, th, zh }` (or the raw value if
 * the document was never migrated). All call sites should render via
 * `pickLocalized()` (server) or `useL()` (client) so empty fields fall
 * back to EN gracefully.
 */

type SanityPiece = {
  _id: string;
  name?: Localized;
  alt?: Localized;
  description?: Localized;
  image?: any;
  aspect?: 'portrait' | 'square' | 'wide';
  hero?: boolean;
  order?: number;
  categories?: { _id: string; title?: Localized; slug?: string }[];
};

const REVALIDATE = 60;

async function fetchSafe<T>(query: string): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } } as any);
  } catch {
    return null;
  }
}

/** Coerce a Sanity field into our Localized shape, accepting both old
 *  (plain string) and new (object) shapes. */
function loc(v: any): Localized {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return { en: v.en ?? '', th: v.th ?? '', zh: v.zh ?? '' };
}

function toItem(p: SanityPiece): LocalizedGalleryItem {
  const url = sanityImageUrl(p.image, 1600) ?? '';
  return {
    id: p._id,
    src: url,
    alt: loc(p.alt),
    description: loc(p.description),
    name: loc(p.name),
    aspect: p.aspect ?? 'square',
    hero: p.hero,
    order: p.order,
    categories: (p.categories ?? []).map((c) => (c.slug ?? '').toLowerCase()).filter(Boolean),
  };
}

/* ─── Public types ───────────────────────────────────────────────── */

export interface LocalizedGalleryItem {
  id: string;
  src: string;
  alt: Localized;
  name: Localized;
  description: Localized;
  aspect: 'portrait' | 'square' | 'wide';
  hero?: boolean;
  order?: number;
  /** Category slugs the item belongs to. */
  categories: string[];
}

export interface HomepageData {
  hero: { src: string; srcMobile?: string | null; alt: Localized };
  heroEyebrow: Localized;
  heroTitle: Localized;
  heroItalic: Localized;
  heroLede: Localized;
  ctaPrimaryLabel: Localized;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: Localized;
  ctaSecondaryHref: string;
  ctaPlateEyebrow: Localized;
  signatureEyebrow: Localized;
  signatureTitle: Localized;
  signatureBody: Localized;
  storyEyebrow: Localized;
  storyTitle: Localized;
  storyBody: Localized;
  storyImage?: string | null;
  storyImageAlt: Localized;
  closingTitle: Localized;
  closingBody: Localized;
  featured: LocalizedGalleryItem[];
}

/* ─── Public API ─────────────────────────────────────────────────── */

export async function getHomepage(): Promise<HomepageData> {
  type R = {
    homepage: any | null;
    featured: SanityPiece[] | null;
    allHero: SanityPiece[] | null;
  };
  const data = await fetchSafe<R>(HOMEPAGE_QUERY);

  if (!data || !data.homepage) {
    // Fallback when Sanity is unreachable — wrap manifest into localized shape.
    return {
      hero: { src: '/images/hero/hero-main.jpg', alt: 'A CLEAR Jewelry signature piece.' },
      heroEyebrow: { en: 'Bangkok · Since 1993', th: 'กรุงเทพฯ · ตั้งแต่ปี 1993', zh: '曼谷 · 始于 1993' },
      heroTitle: { en: 'Gemstone art', th: 'ศิลปะอัญมณี', zh: '宝石艺术' },
      heroItalic: { en: 'since 1993.', th: 'ตั้งแต่ปี 1993', zh: '自 1993 年。' },
      heroLede: { en: 'An independent Thai high-jewellery house. Unheated Burmese rubies, royal blue sapphires, fancy diamonds. Hand-set, signed CLEAR 1993.', th: '', zh: '' },
      ctaPrimaryLabel: { en: 'Book an Appointment', th: 'นัดหมายเข้าชม', zh: '预约鉴赏' },
      ctaPrimaryHref: '/book',
      ctaSecondaryLabel: { en: 'View the Gallery', th: 'ดูแกลเลอรี', zh: '浏览作品集' },
      ctaSecondaryHref: '/gallery',
      ctaPlateEyebrow: { en: 'By Private Appointment', th: 'นัดล่วงหน้าเป็นการส่วนตัว', zh: '凭预约鉴赏' },
      signatureEyebrow: { en: 'Signature', th: 'ลายเซ็น', zh: '签名之作' },
      signatureTitle: { en: 'The pieces we are known for.', th: 'ผลงานที่ลายเซ็นของเราเป็นที่จดจำ', zh: '我们以此为世所知。' },
      signatureBody: { en: 'Every signature stone is GIA-certified, every setting hand-finished. Each piece is a one-of-one composition.', th: '', zh: '' },
      storyEyebrow: { en: 'Our story', th: 'เรื่องราวของเรา', zh: '我们的故事' },
      storyTitle: { en: 'Thirty years of rare stones.', th: 'สามสิบปีแห่งอัญมณีหายาก', zh: '三十年的稀世宝石。' },
      storyBody: { en: 'CLEAR Jewelry was founded in Bangkok in 1993...', th: '', zh: '' },
      storyImage: null,
      storyImageAlt: '',
      closingTitle: { en: 'Visit the atelier at Gaysorn Centre.', th: '', zh: '' },
      closingBody: { en: 'Private viewings by appointment.', th: '', zh: '' },
      featured: manifestHomePreview(12).map(legacyItemToLocalized),
    };
  }

  const explicit = (data.featured ?? []).map(toItem);
  const heroes   = (data.allHero ?? []).map(toItem);
  const seen = new Set(explicit.map((g) => g.id));
  const fill = heroes.filter((g) => !seen.has(g.id));
  const featured = [...explicit, ...fill].slice(0, 12);

  const heroUrl       = sanityImageUrl(data.homepage?.heroImage, 2400);
  const heroMobileUrl = sanityImageUrl(data.homepage?.heroImageMobile, 1200);

  return {
    hero: {
      src: heroUrl ?? '/images/hero/hero-main.jpg',
      srcMobile: heroMobileUrl ?? null,
      alt: loc(data.homepage?.heroImageAlt) || 'A CLEAR Jewelry signature piece.',
    },
    heroEyebrow:       loc(data.homepage?.heroEyebrow),
    heroTitle:         loc(data.homepage?.heroTitle),
    heroItalic:        loc(data.homepage?.heroItalic),
    heroLede:          loc(data.homepage?.heroLede),
    ctaPrimaryLabel:   loc(data.homepage?.ctaPrimaryLabel),
    ctaPrimaryHref:    data.homepage?.ctaPrimaryHref ?? '/book',
    ctaSecondaryLabel: loc(data.homepage?.ctaSecondaryLabel),
    ctaSecondaryHref:  data.homepage?.ctaSecondaryHref ?? '/gallery',
    ctaPlateEyebrow:   loc(data.homepage?.ctaPlateEyebrow),
    signatureEyebrow:  loc(data.homepage?.signatureEyebrow),
    signatureTitle:    loc(data.homepage?.signatureTitle),
    signatureBody:     loc(data.homepage?.signatureBody),
    storyEyebrow:      loc(data.homepage?.storyEyebrow),
    storyTitle:        loc(data.homepage?.storyTitle),
    storyBody:         loc(data.homepage?.storyBody),
    storyImage:        sanityImageUrl(data.homepage?.storyImage, 1600),
    storyImageAlt:     loc(data.homepage?.storyImageAlt),
    closingTitle:      loc(data.homepage?.closingTitle),
    closingBody:       loc(data.homepage?.closingBody),
    featured,
  };
}

/** Convert a plain (legacy) GalleryItem into a LocalizedGalleryItem. */
function legacyItemToLocalized(g: GalleryItem): LocalizedGalleryItem {
  return {
    id: g.id,
    src: g.src ?? '',
    alt: g.alt ?? '',
    name: g.name ?? '',
    description: g.description ?? '',
    aspect: g.aspect ?? 'square',
    hero: g.hero,
    order: g.order,
    categories: (g.categories ?? []).map((c) => String(c)),
  };
}

export async function getFullGallery(): Promise<{ pieces: LocalizedGalleryItem[]; categories: { id: string; title: Localized; slug: string }[] }> {
  type R = { pieces: SanityPiece[] | null; categories: { _id: string; title?: Localized; slug: string }[] | null };
  const data = await fetchSafe<R>(GALLERY_QUERY);
  if (!data || !data.pieces || !data.pieces.length) {
    return {
      pieces: sortedGallery().map(legacyItemToLocalized),
      categories: [
        { id: 'all',      title: { en: 'All',        th: 'ทั้งหมด',   zh: '全部' }, slug: 'all' },
        { id: 'ring',     title: { en: 'Rings',      th: 'แหวน',      zh: '戒指' }, slug: 'ring' },
        { id: 'necklace', title: { en: 'Necklaces',  th: 'สร้อยคอ',   zh: '项链' }, slug: 'necklace' },
        { id: 'earring',  title: { en: 'Earrings',   th: 'ต่างหู',     zh: '耳饰' }, slug: 'earring' },
        { id: 'ruby',     title: { en: 'Rubies',     th: 'ทับทิม',     zh: '红宝石' }, slug: 'ruby' },
        { id: 'sapphire', title: { en: 'Sapphires',  th: 'ไพลิน',      zh: '蓝宝石' }, slug: 'sapphire' },
        { id: 'diamond',  title: { en: 'Diamonds',   th: 'เพชร',       zh: '钻石' }, slug: 'diamond' },
        { id: 'set',      title: { en: 'Sets',       th: 'เซ็ต',        zh: '套装' }, slug: 'set' },
      ],
    };
  }
  return {
    pieces: data.pieces.map(toItem),
    categories: (data.categories ?? []).map((c) => ({ id: c._id, title: loc(c.title), slug: c.slug })),
  };
}

export async function getSiteSettings() { return fetchSafe<any>(SITE_SETTINGS_QUERY); }
export async function getAboutPage()    { return fetchSafe<any>(ABOUT_QUERY); }
export async function getInfoPage()     { return fetchSafe<any>(INFO_QUERY); }
export async function getContactPage()  { return fetchSafe<any>(CONTACT_QUERY); }

/* Fetch only the trust-signals strip — used on the homepage so the
 * owner-edited values live in Sanity rather than in the hard-coded
 * BRAND constant. Returns LocalizedTrustSignal[]. */
export interface LocalizedTrustSignal {
  label: Localized;
  detail: Localized;
}
export async function getTrustSignals(): Promise<LocalizedTrustSignal[]> {
  const data = await fetchSafe<{ trustSignals: any[] } | null>(
    `*[_id == "siteSettings"][0]{ trustSignals }`
  );
  return (data?.trustSignals ?? []).map((t) => ({
    label: loc(t?.label),
    detail: loc(t?.detail),
  }));
}

/**
 * Fetch every editable UI label keyed by its dot-key (nav.home, book.submit,
 * lb.close, …) as a flat map. Components read it via the LanguageProvider's
 * built-in `t(key)` helper which falls back to the in-source COPY dict if a
 * key is missing here.
 *
 * Returns null when the doc doesn't exist yet (first deploy) or when Sanity
 * is unreachable — that's safe because t() falls back to COPY.
 */
export async function getUILabels(): Promise<Record<string, Localized> | null> {
  const data = await fetchSafe<{ labels: any[] } | null>(
    `*[_id == "uiLabels"][0]{ labels[]{ key, value } }`
  );
  if (!data?.labels) return null;
  const out: Record<string, Localized> = {};
  for (const row of data.labels) {
    if (row?.key) out[row.key] = loc(row.value);
  }
  return out;
}
