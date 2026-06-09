/**
 * Gallery manifest — the single source of truth for what appears on /gallery.
 *
 * Every image listed here is a real, verified photo from @clearjewelry on Instagram.
 *
 * To add a NEW Instagram photo:
 *   1. Drop the file into /public/images/gallery/   (e.g. emerald-cocktail-ring.jpg)
 *   2. Add an entry below with the filename, category, and caption
 *   3. The site rebuilds and the piece appears in the grid + lightbox
 *
 * If `src` is null, an elegant placeholder tile renders in its place (ivory or
 * onyx surface with a small gold CLEAR mark) at the correct aspect ratio.
 *
 * Categories: 'ring' | 'necklace' | 'earring' | 'ruby' | 'sapphire' | 'diamond' | 'set'
 *
 * `aspect`:
 *   'portrait' = 4 / 5   (taller tiles — earring drops, model shots)
 *   'square'   = 1 / 1   (default IG aspect, most product shots)
 *   'wide'     = 5 / 4   (necklaces, hands, bridal sets)
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
  /** filename inside /public/images/gallery/. If null, renders a placeholder tile. */
  src: string | null;
  /** Display name of the piece. */
  name: string;
  /** Optional stone / setting detail. */
  spec?: string;
  /** Categories this piece belongs to (a piece can be in multiple). */
  categories: GalleryCategory[];
  /** Tile aspect ratio. */
  aspect: GalleryAspect;
  /** Placeholder surface (only used when `src` is null). */
  placeholder?: 'ivory' | 'onyx';
}

/**
 * 18 verified Instagram pieces from @clearjewelry — ordered to give the grid
 * a strong opening (a CLEAR-branded headline shot, a colour-stone moment, a
 * diamond statement, a model wear shot) then deepen into rings, earrings,
 * necklaces.
 */
export const GALLERY: GalleryItem[] = [
  {
    src: 'hero-clear-marquise-earrings.jpg',
    name: 'Marquise Diamond Drop Earrings',
    spec: 'A pair of brilliant marquise diamonds set in a pavé halo, on platinum',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'paraiba-cluster-on-hand.jpg',
    name: 'Paraiba Tourmaline Cluster',
    spec: 'Neon Paraiba tourmaline with marquise &amp; pear diamond surround',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'butterfly-tsavorite-tourmaline-earrings.jpg',
    name: 'Tsavorite &amp; Pink Tourmaline Butterflies',
    spec: 'Cushion tsavorite and pink tourmaline with marquise diamond wings',
    categories: ['earring'],
    aspect: 'square',
  },
  {
    src: 'diamond-necklace-blue-clear.jpg',
    name: 'Riviera Diamond Necklace',
    spec: 'Graduating marquise &amp; round diamonds, hand-set in platinum',
    categories: ['necklace', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'paraiba-cluster-clear-wordmark.jpg',
    name: 'Oval Paraiba Tourmaline Couture',
    spec: 'Vivid Paraiba tourmaline framed by marquise diamond petals',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'riviera-cluster-drop-earrings.jpg',
    name: 'Cluster Diamond Drop Earrings',
    spec: 'A cascade of marquise, pear and round brilliants',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'tsavorite-tourmaline-bypass-ring.jpg',
    name: 'Tsavorite &amp; Tourmaline Bypass',
    spec: 'Green tsavorite and pink tourmaline divided by a marquise diamond',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'oval-diamond-solitaire-blue.jpg',
    name: 'Oval Diamond Solitaire',
    spec: 'A 5-carat oval brilliant on a pavé band — a CLEAR signature',
    categories: ['ring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'cats-eye-chrysoberyl-halo-bokeh.jpg',
    name: 'Cat’s-Eye Chrysoberyl Halo',
    spec: 'Honey chrysoberyl with full pear diamond halo',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'pear-diamond-vine-ear-climber.jpg',
    name: 'Pear Diamond Vine Earring',
    spec: 'A climbing vine of pear and marquise diamonds, worn',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'cats-eye-ring-on-hand.jpg',
    name: 'Cat’s-Eye Halo on Hand',
    spec: 'Soft honey chrysoberyl in a pavé halo — daylight reference',
    categories: ['ring'],
    aspect: 'square',
  },
  {
    src: 'marquise-trinity-burgundy-clear.jpg',
    name: 'Marquise Trinity Ring',
    spec: 'Three marquise diamonds floating on a half-eternity band',
    categories: ['ring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'oval-solitaire-on-hand.jpg',
    name: 'Oval Solitaire on Hand',
    spec: 'A signature oval CLEAR solitaire, in daylight',
    categories: ['ring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'diamond-necklace-sky-clear.jpg',
    name: 'Diamond Vine Necklace',
    spec: 'A delicate diamond vine necklace, sky composition',
    categories: ['necklace', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'marquise-east-west-studs.jpg',
    name: 'East-West Marquise Studs',
    spec: 'A pair of marquise diamonds, set horizontally',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'marquise-bypass-clear-teal.jpg',
    name: 'Marquise Bypass Couture',
    spec: 'Two pavé-set marquise diamonds in a fluid bypass band',
    categories: ['ring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'oval-halo-studs-rose-clear.jpg',
    name: 'Oval Diamond Halo Studs',
    spec: 'Matched oval brilliants surrounded by a single pavé halo',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  {
    src: 'star-ear-climber-model.jpg',
    name: 'Star Diamond Ear Climber',
    spec: 'A constellation of pavé stars, climbing the lobe',
    categories: ['earring', 'diamond'],
    aspect: 'square',
  },
  // Categories below this point still use placeholder tiles — drop in real
  // ruby and sapphire photos to expand those filters.
  {
    src: null,
    name: 'Pigeon Blood Burmese Ruby Halo',
    spec: 'Unheated oval ruby with double diamond halo',
    categories: ['ring', 'ruby'],
    aspect: 'portrait',
    placeholder: 'onyx',
  },
  {
    src: null,
    name: 'Royal Blue Sapphire Cocktail',
    spec: 'Unheated Ceylon sapphire with marquise diamond surround',
    categories: ['ring', 'sapphire'],
    aspect: 'square',
    placeholder: 'ivory',
  },
  {
    src: null,
    name: 'Burmese Ruby Riviera Necklace',
    spec: 'Graduating unheated rubies with diamond spacers',
    categories: ['necklace', 'ruby'],
    aspect: 'wide',
    placeholder: 'onyx',
  },
  {
    src: null,
    name: 'Bridal Diamond Set',
    spec: 'Necklace, earrings &amp; bracelet — matched D-color',
    categories: ['set', 'diamond'],
    aspect: 'wide',
    placeholder: 'ivory',
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
