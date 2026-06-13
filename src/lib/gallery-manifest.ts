/* =========================================================================
 *  CLEAR JEWELRY · Gallery Manifest
 *  =========================================================================
 *
 *  THIS FILE IS THE SINGLE SOURCE OF TRUTH FOR THE GALLERY.
 *
 *  Add, remove, or reorder entries here and the website will automatically
 *  update both the home page preview and the full Gallery page. No other
 *  code edits required.
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  HOW TO ADD A NEW PIECE
 *  ─────────────────────────────────────────────────────────────────────────
 *
 *  1.  Upload the photo to /public/images/gallery/ in GitHub.
 *      (Open the folder on github.com → "Add file" → "Upload files",
 *      drag the image in, write a commit message, click "Commit changes".)
 *
 *  2.  Open this file (src/lib/gallery-manifest.ts) in GitHub.
 *      Click the pencil icon in the top-right to edit.
 *
 *  3.  Scroll to the bottom of the GALLERY array and copy any existing
 *      entry. Paste it as a new entry (above the closing  `];`  ).
 *
 *  4.  Change four fields on the new entry:
 *        • id          — a short unique tag like "burmese-ruby-ring-2026"
 *        • src         — the filename you uploaded (e.g. "new-ruby.jpg")
 *        • alt         — what the picture shows, plainly, for accessibility
 *        • description — what should appear on hover / in the lightbox.
 *                        Keep it editorial: piece, stone, setting, metal.
 *
 *  5.  (Optional) Set  `hero: true`  if this should appear in the
 *      home-page preview wall. Otherwise it shows on the full Gallery only.
 *
 *  6.  Commit. The site rebuilds in ~45 seconds and the new tile appears.
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  HOW TO REMOVE A PIECE
 *  ─────────────────────────────────────────────────────────────────────────
 *
 *  Delete the entry's `{ ... },` block from the GALLERY array, commit.
 *
 *  ─────────────────────────────────────────────────────────────────────────
 *  HOW TO REORDER
 *  ─────────────────────────────────────────────────────────────────────────
 *
 *  Move entries up or down in the array — order in the array is the order
 *  on the page. (Or set an `order` number on each item for fine control.)
 *
 *  ========================================================================= */

/** Filter tabs on the Gallery page. Each entry can belong to multiple. */
export type GalleryCategory =
  | 'ring'
  | 'necklace'
  | 'earring'
  | 'ruby'
  | 'sapphire'
  | 'diamond'
  | 'set';

/** Tile aspect ratio. Defaults to 'square' when omitted. */
export type GalleryAspect = 'portrait' | 'square' | 'wide';

export interface GalleryItem {
  /** Unique short ID — used for React keys. Pick anything unique. */
  id: string;

  /** Filename inside /public/images/gallery/  (or null for a placeholder tile). */
  src: string | null;

  /** Plain-English description of the picture for screen readers. */
  alt: string;

  /** Editorial caption shown on tile hover and in the lightbox. */
  description: string;

  /** Optional short display name (lightbox heading). Falls back to description. */
  name?: string;

  /** Optional filter categories (used by Gallery page filter tabs). */
  categories?: GalleryCategory[];

  /** Optional tile aspect ratio. Defaults to 'square'. */
  aspect?: GalleryAspect;

  /** True → appears in the Home preview wall (the strongest pieces). */
  hero?: boolean;

  /** Optional sort hint. Lower numbers appear first. */
  order?: number;

  /** Placeholder surface (only used when src is null). */
  placeholder?: 'ivory' | 'onyx';
}

/* =========================================================================
 *  THE GALLERY
 *  ========================================================================= */

export const GALLERY: GalleryItem[] = [
  {
    id: 'sapphire-floral-choker',
    src: 'sapphire-floral-choker-black.jpg',
    alt: 'Royal blue sapphire and diamond floral choker on jet black.',
    description:
      'Twenty oval royal blue sapphires set as star-flowers, framed by pear and round brilliant diamonds. Platinum.',
    name: 'Royal Sapphire Floral Choker',
    categories: ['necklace', 'sapphire', 'set'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'heart-diamond-riviere',
    src: 'editorial-heart-diamond-riviere.jpg',
    alt: 'Heart-shape diamond rivière necklace worn against black velvet.',
    description:
      'Graduated heart-shape diamonds in a single line — a maison rivière, signed CLEAR 1993.',
    name: 'Heart Diamond Rivière',
    categories: ['necklace', 'diamond'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'burmese-ruby-parure',
    src: 'editorial-ruby-parure-black.jpg',
    alt: 'Model in black holding a Burmese ruby parure — necklace, ring and earrings.',
    description:
      'Necklace, ring, earrings — unheated Burmese rubies in a diamond filigree, set in white gold.',
    name: 'Burmese Ruby Parure',
    categories: ['necklace', 'ring', 'earring', 'ruby', 'set'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'sapphire-floral-suite-white',
    src: 'editorial-sapphire-suite-white.jpg',
    alt: 'Model in ivory bridal silhouette wearing the sapphire floral suite.',
    description:
      'Necklace, earrings, ring, bracelet — the sapphire floral language in full parure.',
    name: 'Sapphire Floral Suite',
    categories: ['necklace', 'earring', 'ring', 'sapphire', 'set'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'royal-blue-sapphire-three-stone',
    src: 'royal-blue-sapphire-three-stone.jpg',
    alt: 'Cushion royal blue sapphire three-stone ring on the hand.',
    description:
      'Unheated cushion royal blue sapphire flanked by pear diamond side stones. Platinum.',
    name: 'Royal Blue Sapphire Three-Stone',
    categories: ['ring', 'sapphire'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'sapphire-ruby-trinity',
    src: 'sapphire-ruby-trinity-rings.jpg',
    alt: 'A pair of trinity rings — one royal blue sapphire, one Burmese ruby.',
    description:
      'A pair of trinity rings — royal blue sapphire and Burmese ruby — each crowned by pear diamond pétales.',
    name: 'Sapphire & Ruby Trinity',
    categories: ['ring', 'sapphire', 'ruby'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'burmese-ruby-bypass',
    src: 'ruby-bypass-yellow-diamond-ear.jpg',
    alt: 'Model with hand at temple wearing a Burmese ruby bypass ring and a fancy yellow diamond earring.',
    description:
      'Round Burmese ruby and pear diamonds in a bypass band, with a fancy yellow diamond ear stud opposite.',
    name: 'Burmese Ruby Bypass',
    categories: ['ring', 'earring', 'ruby', 'diamond'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'diamond-floral-garland',
    src: 'diamond-floral-choker-neck.jpg',
    alt: 'All-diamond floral garland choker worn on the neck.',
    description:
      'Pavé diamond flowers strung into a curved garland — a choker that rests like a collar.',
    name: 'Diamond Floral Garland Choker',
    categories: ['necklace', 'diamond'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'sapphire-floral-detail',
    src: 'sapphire-floral-suite-diagonal-black.jpg',
    alt: 'Diagonal detail crop of the sapphire floral suite on black.',
    description:
      'A diagonal detail of the sapphire floral suite — five oval sapphires across a diamond petal-bed.',
    name: 'Sapphire Floral Detail',
    categories: ['necklace', 'sapphire'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'sapphire-suite-close',
    src: 'editorial-sapphire-suite-close.jpg',
    alt: 'Close model portrait wearing the sapphire floral necklace, earring and ring.',
    description:
      'Close portrait of the sapphire floral parure — necklace, earring and ring in conversation.',
    name: 'Sapphire Suite, Close',
    categories: ['necklace', 'earring', 'ring', 'sapphire', 'set'],
    aspect: 'portrait',
    hero: true,
  },
  {
    id: 'pear-diamond-tennis',
    src: 'diamond-tennis-bracelet-pear.jpg',
    alt: 'Diamond tennis bracelet with graduated pear diamonds, worn on the wrist.',
    description:
      'Round brilliant tennis line punctuated by graduated pear diamonds, in rose gold.',
    name: 'Pear Diamond Tennis Bracelet',
    categories: ['diamond'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'tennis-and-open-rings',
    src: 'diamond-tennis-bracelet-open-rings.jpg',
    alt: 'A slender tennis bracelet worn with two open diamond rings.',
    description:
      'Slender round-brilliant tennis bracelet with two open-band diamond rings — the everyday triad.',
    name: 'Tennis Line & Open Rings',
    categories: ['ring', 'diamond', 'set'],
    aspect: 'square',
  },
  {
    id: 'princess-station-bracelet',
    src: 'princess-halo-tennis-bracelet.jpg',
    alt: 'Princess-cut diamond station tennis bracelet on a champagne backdrop.',
    description:
      'A princess-cut diamond station haloed by pavé, set between a fine round-brilliant tennis line.',
    name: 'Princess Station Bracelet',
    categories: ['diamond'],
    aspect: 'square',
  },
  {
    id: 'solitaire-pear-bypass',
    src: 'solitaire-pear-bypass-rings-face.jpg',
    alt: 'Model hand at face wearing a solitaire and a pear-bypass diamond ring.',
    description:
      'Two solitaire languages — the classic round and the curving pear-bypass — worn together.',
    name: 'Solitaire & Pear Bypass',
    categories: ['ring', 'diamond'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'pink-spinel-bypass',
    src: 'spinel-pear-diamond-bypass-velvet.jpg',
    alt: 'Cushion pink spinel and pear diamond bypass ring on a hand against black velvet.',
    description:
      'A cushion pink spinel embraced by a pavé pear diamond — toi-et-moi in a single curve.',
    name: 'Pink Spinel Bypass',
    categories: ['ring', 'ruby'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'diamond-toi-et-moi',
    src: 'diamond-toi-et-moi-ring-velvet.jpg',
    alt: 'Two-stone diamond toi-et-moi ring on a hand resting against black velvet.',
    description:
      'Two pavé-shouldered diamonds in a fluid bypass — a quiet engagement language.',
    name: 'Diamond Toi-et-Moi',
    categories: ['ring', 'diamond'],
    aspect: 'portrait',
  },
  {
    id: 'ruby-stud-pave-band',
    src: 'ruby-stud-pave-band-detail.jpg',
    alt: 'Detail of a model ear with a pink-red ruby earring and a pavé diamond band ring.',
    description:
      'A pink-red Burmese ruby ear stud caught against a pavé diamond band — two-piece, one register.',
    name: 'Ruby Stud · Pavé Band',
    categories: ['earring', 'ring', 'ruby'],
    aspect: 'portrait',
  },
  {
    id: 'yellow-blue-sapphire-orbit',
    src: 'yellow-blue-sapphire-orbit-earring.jpg',
    alt: 'Single-ear shot of an orbit drop earring with a yellow sapphire and a royal blue sapphire.',
    description:
      'A fancy yellow sapphire orbit a royal blue sapphire — each in a diamond halo — set to drop.',
    name: 'Yellow & Blue Sapphire Orbit',
    categories: ['earring', 'sapphire'],
    aspect: 'square',
  },
  {
    id: 'ruby-emerald-toi-et-moi',
    src: 'ring-pink-marquise-pave-band.jpg',
    alt: 'Hand on a leather-bound book wearing a ruby and emerald toi-et-moi ring.',
    description:
      'Oval ruby and emerald in conversation across a pavé bypass band — photographed in repose, hand at rest.',
    name: 'Ruby & Emerald Toi-et-Moi',
    categories: ['ring', 'ruby'],
    aspect: 'square',
    hero: true,
  },
  {
    id: 'tsavorite-tourmaline-suite',
    src: 'set-tsavorite-pink-tourmaline-earrings-ring.jpg',
    alt: 'Pastel pink and mint composition with tsavorite and pink tourmaline butterfly earrings and a matching ring.',
    description:
      'Mismatched butterfly studs in tsavorite and pink tourmaline, paired with the bypass ring — pastel cabinet shot.',
    name: 'Tsavorite & Tourmaline Suite',
    categories: ['earring', 'ring', 'set'],
    aspect: 'square',
  },
  {
    id: 'cluster-studs-twin',
    src: 'earring-pink-tourmaline-detail.jpg',
    alt: 'Two models in profile and three-quarter showing mismatched cluster studs.',
    description:
      'A study of the mismatched butterfly clusters, worn — one ear in profile, one full-front.',
    name: 'Cluster Studs · Twin Portrait',
    categories: ['earring'],
    aspect: 'square',
  },
  {
    id: 'pave-vine-ear',
    src: 'earring-pear-diamond-vine-on-model.jpg',
    alt: 'Close portrait of a blonde model with a pavé diamond vine ear ornament against soft rose.',
    description:
      'The pavé diamond vine catching daylight at the lobe — soft rose ground, hair held back.',
    name: 'Pavé Vine Ear, Worn',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    id: 'paraiba-cluster-on-hand',
    src: 'paraiba-cluster-on-hand.jpg',
    alt: 'Paraiba tourmaline cluster ring on a hand resting beside a stack of books on white marble.',
    description:
      'Vivid Paraiba tourmaline framed by marquise diamond pétales — daylight reference on the hand.',
    name: 'Paraiba Cluster, Worn',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    id: 'star-climber-on-ear',
    src: 'earring-star-climber-on-model.jpg',
    alt: 'Close-up of a model ear with a pavé diamond star ear climber.',
    description:
      'A pavé star climbs the lobe — a small thing, sharply made.',
    name: 'Star Climber, Worn',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    id: 'sapphire-floral-bracelet',
    src: 'sapphire-bracelet-column-black.jpg',
    alt: 'Sapphire floral bracelet photographed as a vertical column on jet black.',
    description:
      'The floral language as a wrist — ten oval royal blue sapphires, pear diamond pétales.',
    name: 'Sapphire Floral Bracelet',
    categories: ['sapphire'],
    aspect: 'portrait',
  },
  {
    id: 'diamond-y-necklace',
    src: 'diamond-y-necklace-black.jpg',
    alt: 'Asymmetric diamond Y-necklace terminating in a large princess-cut diamond on jet black.',
    description:
      'Pear, marquise, oval and emerald-cut diamonds graduate to a princess-cut drop. White gold.',
    name: 'Diamond Y-Necklace',
    categories: ['necklace', 'diamond'],
    aspect: 'portrait',
  },
];

/* =========================================================================
 *  HELPERS — used by the page components. Owner does NOT need to edit.
 *  ========================================================================= */

/** Sort by `order` (if set) then by array index. */
export function sortedGallery(): GalleryItem[] {
  return [...GALLERY].sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return GALLERY.indexOf(a) - GALLERY.indexOf(b);
  });
}

/**
 * The home-page preview wall.
 *
 *   – first, every entry with  `hero: true`  (in manifest order)
 *   – then, non-hero entries fill in if the hero set is below `target` tiles
 *   – grows / shrinks automatically with the manifest
 *
 *   Pass nothing for the default 12-tile wall:  homePreview()
 *   Pass a number to override:                  homePreview(8)
 */
export function homePreview(target = 12): GalleryItem[] {
  const sorted = sortedGallery();
  const heroes = sorted.filter((g) => g.hero);
  const others = sorted.filter((g) => !g.hero);
  return [...heroes, ...others].slice(0, target);
}

/** Filter tabs for the Gallery page. */
export const FILTER_TABS: { id: 'all' | GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ring', label: 'Rings' },
  { id: 'necklace', label: 'Necklaces' },
  { id: 'earring', label: 'Earrings' },
  { id: 'ruby', label: 'Rubies' },
  { id: 'sapphire', label: 'Sapphires' },
  { id: 'diamond', label: 'Diamonds' },
  { id: 'set', label: 'Sets' },
];
