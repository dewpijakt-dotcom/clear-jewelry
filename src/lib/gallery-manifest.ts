/**
 * Gallery manifest — CLEAR JEWELRY · Spring 2026 drop + retained archive.
 *
 * 26-piece curated set:
 *   – 20 pieces from the new commissioned 2026 editorial
 *     (CLEAR_*, S*, A* — sapphire floral suite, ruby parure, diamond
 *      Y-necklace, heart rivière, on-hand studio set)
 *   – 6 retained archive frames that survived the cull on quality
 *     (real photography, distinctive composition, sharp focus)
 *
 * The first item is the salon centrepiece / primary hero. Items
 * 2–4 are full-bleed editorial heroes. The studio cabinet follows.
 */

export type GalleryCategory =
  | 'ring'
  | 'necklace'
  | 'earring'
  | 'ruby'
  | 'sapphire'
  | 'diamond'
  | 'set';

export type GalleryAspect = 'portrait' | 'square' | 'wide';

export interface GalleryItem {
  /** filename inside /public/images/gallery/. */
  src: string | null;
  /** Display name of the piece. */
  name: string;
  /** Stone / setting detail. */
  spec?: string;
  /** Categories this piece belongs to (a piece can be in multiple). */
  categories: GalleryCategory[];
  /** Tile aspect ratio. */
  aspect: GalleryAspect;
  /** Placeholder surface (only used when `src` is null). */
  placeholder?: 'ivory' | 'onyx';
}

export const GALLERY: GalleryItem[] = [
  /* I. CENTREPIECE — sapphire floral choker (Salon hero, primary Hero). */
  {
    src: 'sapphire-floral-choker-black.jpg',
    name: 'Royal Sapphire Floral Choker',
    spec: 'Twenty oval royal blue sapphires set as star-flowers, framed throughout by pear and round brilliant diamonds. Platinum.',
    categories: ['necklace', 'sapphire', 'set'],
    aspect: 'portrait',
  },

  /* II. EDITORIAL HEROES — model plates, full-bleed candidates. */
  {
    src: 'editorial-heart-diamond-riviere.jpg',
    name: 'Heart Diamond Rivière',
    spec: 'Graduated heart-shape diamonds in a single line — a maison rivière, signed CLEAR 1993.',
    categories: ['necklace', 'diamond'],
    aspect: 'portrait',
  },
  {
    src: 'editorial-ruby-parure-black.jpg',
    name: 'Burmese Ruby Parure',
    spec: 'Necklace, ring, earrings — unheated Burmese rubies in a diamond filigree, set in white gold.',
    categories: ['necklace', 'ring', 'earring', 'ruby', 'set'],
    aspect: 'portrait',
  },
  {
    src: 'editorial-sapphire-suite-white.jpg',
    name: 'Sapphire Floral Suite',
    spec: 'Necklace, earrings, ring, bracelet — the sapphire floral language in full parure.',
    categories: ['necklace', 'earring', 'ring', 'sapphire', 'set'],
    aspect: 'portrait',
  },

  /* III. SIGNATURE STUDIO — strongest gallery cards. */
  {
    src: 'royal-blue-sapphire-three-stone.jpg',
    name: 'Royal Blue Sapphire Three-Stone',
    spec: 'Unheated cushion royal blue sapphire flanked by pear diamond side stones. Platinum.',
    categories: ['ring', 'sapphire'],
    aspect: 'square',
  },
  {
    src: 'sapphire-ruby-trinity-rings.jpg',
    name: 'Sapphire &amp; Ruby Trinity',
    spec: 'A pair of trinity rings — royal blue sapphire and Burmese ruby — each crowned by pear diamond pétales.',
    categories: ['ring', 'sapphire', 'ruby'],
    aspect: 'square',
  },
  {
    src: 'ruby-bypass-yellow-diamond-ear.jpg',
    name: 'Burmese Ruby Bypass',
    spec: 'Round Burmese ruby and pear diamonds in a bypass band, with a fancy yellow diamond ear stud opposite.',
    categories: ['ring', 'earring', 'ruby', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'diamond-floral-choker-neck.jpg',
    name: 'Diamond Floral Garland Choker',
    spec: 'Pavé diamond flowers strung into a curved garland — a choker that rests like a collar.',
    categories: ['necklace', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'sapphire-floral-suite-diagonal-black.jpg',
    name: 'Sapphire Floral Detail',
    spec: 'A diagonal detail of the sapphire floral suite — five oval sapphires across a diamond petal-bed.',
    categories: ['necklace', 'sapphire'],
    aspect: 'portrait',
  },
  {
    src: 'editorial-sapphire-suite-close.jpg',
    name: 'Sapphire Suite, Close',
    spec: 'Close portrait of the sapphire floral parure — necklace, earring and ring in conversation.',
    categories: ['necklace', 'earring', 'ring', 'sapphire', 'set'],
    aspect: 'portrait',
  },

  /* IV. STUDIO CABINET — single-piece on-hand and detail shots. */
  {
    src: 'diamond-tennis-bracelet-pear.jpg',
    name: 'Pear Diamond Tennis Bracelet',
    spec: 'Round brilliant tennis line punctuated by graduated pear diamonds, in rose gold.',
    categories: ['diamond'],
    aspect: 'square',
  },
  {
    src: 'diamond-tennis-bracelet-open-rings.jpg',
    name: 'Tennis Line &amp; Open Rings',
    spec: 'Slender round-brilliant tennis bracelet with two open-band diamond rings — the everyday triad.',
    categories: ['ring', 'diamond', 'set'],
    aspect: 'square',
  },
  {
    src: 'princess-halo-tennis-bracelet.jpg',
    name: 'Princess Station Bracelet',
    spec: 'A princess-cut diamond station haloed by pavé, set between a fine round-brilliant tennis line.',
    categories: ['diamond'],
    aspect: 'square',
  },
  {
    src: 'solitaire-pear-bypass-rings-face.jpg',
    name: 'Solitaire &amp; Pear Bypass',
    spec: 'Two solitaire languages — the classic round and the curving pear-bypass — worn together.',
    categories: ['ring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'spinel-pear-diamond-bypass-velvet.jpg',
    name: 'Pink Spinel Bypass',
    spec: 'A cushion pink spinel embraced by a pavé pear diamond — toi-et-moi in a single curve.',
    categories: ['ring', 'ruby'],
    aspect: 'square',
  },
  {
    src: 'diamond-toi-et-moi-ring-velvet.jpg',
    name: 'Diamond Toi-et-Moi',
    spec: 'Two pavé-shouldered diamonds in a fluid bypass — a quiet engagement language.',
    categories: ['ring', 'diamond'],
    aspect: 'portrait',
  },
  {
    src: 'ruby-stud-pave-band-detail.jpg',
    name: 'Ruby Stud · Pavé Band',
    spec: 'A pink-red Burmese ruby ear stud caught against a pavé diamond band — two-piece, one register.',
    categories: ['earring', 'ring', 'ruby'],
    aspect: 'portrait',
  },
  {
    src: 'yellow-blue-sapphire-orbit-earring.jpg',
    name: 'Yellow &amp; Blue Sapphire Orbit',
    spec: 'A fancy yellow sapphire orbit a royal blue sapphire — each in a diamond halo — set to drop.',
    categories: ['earring', 'sapphire'],
    aspect: 'square',
  },

  /* V. ARCHIVE — six retained frames from prior shoots. */
  {
    src: 'ring-pink-marquise-pave-band.jpg',
    name: 'Ruby &amp; Emerald Toi-et-Moi',
    spec: 'Oval ruby and emerald in conversation across a pavé bypass band — photographed in repose, hand at rest.',
    categories: ['ring', 'ruby'],
    aspect: 'square',
  },
  {
    src: 'set-tsavorite-pink-tourmaline-earrings-ring.jpg',
    name: 'Tsavorite &amp; Tourmaline Suite',
    spec: 'Mismatched butterfly studs in tsavorite and pink tourmaline, paired with the bypass ring — pastel cabinet shot.',
    categories: ['earring', 'ring', 'set'],
    aspect: 'square',
  },
  {
    src: 'earring-pink-tourmaline-detail.jpg',
    name: 'Cluster Studs · Twin Portrait',
    spec: 'A study of the mismatched butterfly clusters, worn — one ear in profile, one full-front.',
    categories: ['earring'],
    aspect: 'square',
  },
  {
    src: 'earring-pear-diamond-vine-on-model.jpg',
    name: 'Pavé Vine Ear, Worn',
    spec: 'The pavé diamond vine catching daylight at the lobe — soft rose ground, hair held back.',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'paraiba-cluster-on-hand.jpg',
    name: 'Paraiba Cluster, Worn',
    spec: 'Vivid Paraiba tourmaline framed by marquise diamond pétales — daylight reference on the hand.',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'earring-star-climber-on-model.jpg',
    name: 'Star Climber, Worn',
    spec: 'A pavé star climbs the lobe — a small thing, sharply made.',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },

  /* VI. EDITORIAL DETAIL — supporting plates. */
  {
    src: 'sapphire-bracelet-column-black.jpg',
    name: 'Sapphire Floral Bracelet',
    spec: 'The floral language as a wrist — ten oval royal blue sapphires, pear diamond pétales.',
    categories: ['sapphire'],
    aspect: 'portrait',
  },
  {
    src: 'diamond-y-necklace-black.jpg',
    name: 'Diamond Y-Necklace',
    spec: 'Pear, marquise, oval and emerald-cut diamonds graduate to a princess-cut drop. White gold.',
    categories: ['necklace', 'diamond'],
    aspect: 'portrait',
  },
];

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
