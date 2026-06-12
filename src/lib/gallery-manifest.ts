/**
 * Gallery manifest — CLEAR JEWELRY · Spring 2026 drop + retained archive.
 *
 * 26-piece curated set:
 *   – 20 pieces from the commissioned 2026 editorial (CLEAR_*, S*, A* shoots)
 *   – 6 strong frames retained from the prior archive (high-res, real
 *     photographs, distinctive composition)
 *
 * Pieces ordered for narrative: centrepiece → editorial heroes →
 * signature studio cabinet → editorial supports → retained archive.
 *
 *   priority : 'hero'    — full-bleed candidates, dramatic composition
 *              'gallery' — strong on-hand / editorial pieces for tiles
 *              'detail'  — close studies, secondary gallery use
 *   aspect   : 'square' | 'portrait' | 'landscape'
 *   origin   : 'drop2026' (new commission) | 'archive' (retained)
 */

export type GalleryCategory =
  | 'ring'
  | 'necklace'
  | 'earring'
  | 'diamond'
  | 'coloured';

export type GallerySubject =
  | 'ruby'
  | 'sapphire'
  | 'diamond'
  | 'set'
  | 'editorial';

export type GalleryPriority = 'hero' | 'gallery' | 'detail';
export type GalleryAspect = 'square' | 'portrait' | 'landscape';
export type GalleryOrigin = 'drop2026' | 'archive';

export interface GalleryItem {
  src: string;
  /** Subfolder under /public/images/. Defaults to 'gallery'. */
  dir?: 'gallery' | 'gallery-hd';
  /** Plain-English alt text for accessibility (single language). */
  alt: string;
  name: { en: string; th: string; zh: string };
  spec?: { en: string; th: string; zh: string };
  categories: GalleryCategory[];
  subjects?: GallerySubject[];
  priority?: GalleryPriority;
  aspect?: GalleryAspect;
  origin?: GalleryOrigin;
}

export const GALLERY: GalleryItem[] = [
  /* ============================================================
   *  I. CENTREPIECE — the sapphire floral choker.
   *     Used as: Salon hero (Gallery), primary Hero (Home).
   * ============================================================ */
  {
    src: 'sapphire-floral-choker-black.jpg',
    alt: 'Royal blue sapphire and diamond floral choker on jet black ground, viewed from above.',
    name: {
      en: 'Royal Sapphire Floral Choker',
      th: 'สร้อยคอชั้นเดียว ดอกไม้ไพลินรอยัล',
      zh: '皇家蓝宝石花卉项圈',
    },
    spec: {
      en: 'Twenty oval royal blue sapphires set as star-flowers, framed throughout by pear and round brilliant diamonds. Platinum.',
      th: 'ไพลินรอยัลทรงรียี่สิบเม็ดเรียงเป็นช่อดอกไม้ ล้อมรอบด้วยเพชรเพียร์และทรงกลม ตัวเรือนแพลทินัม',
      zh: '二十颗椭圆形皇家蓝宝石组成花朵，由梨形与圆形美钻环绕，铂金镶嵌',
    },
    categories: ['necklace', 'coloured'],
    subjects: ['sapphire', 'set'],
    priority: 'hero',
    aspect: 'portrait',
    origin: 'drop2026',
  },

  /* ============================================================
   *  II. EDITORIAL HEROES — model plates, full-bleed candidates.
   * ============================================================ */
  {
    src: 'editorial-heart-diamond-riviere.jpg',
    alt: 'Heart-shape diamond rivière necklace worn against black velvet.',
    name: {
      en: 'Heart Diamond Rivière',
      th: 'สร้อยริเวียร์เพชรทรงหัวใจ',
      zh: '心形钻石里维埃拉项链',
    },
    spec: {
      en: 'Graduated heart-shape diamonds in a single line — a maison rivière, signed.',
      th: 'เพชรทรงหัวใจไล่ขนาด ร้อยเรียงต่อเนื่อง — ริเวียร์ของเมซง ลงนาม',
      zh: '心形钻石依大小渐次排列，单股延展 — 经我们签鉴的里维埃拉项链',
    },
    categories: ['necklace', 'diamond'],
    subjects: ['diamond', 'editorial'],
    priority: 'hero',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'editorial-ruby-parure-black.jpg',
    alt: 'Model in black holding an unheated Burmese ruby parure — necklace, ring and earrings.',
    name: {
      en: 'Burmese Ruby Parure',
      th: 'ชุดทับทิมพม่า เต็มชุด',
      zh: '缅甸红宝石全套首饰',
    },
    spec: {
      en: 'Necklace, ring, earrings — unheated Burmese rubies in a diamond filigree, set in white gold.',
      th: 'สร้อยคอ แหวน ต่างหู — ทับทิมพม่าไม่เผา ฝังเพชรพันละเอียด ตัวเรือนทองคำขาว',
      zh: '项链、戒指、耳饰 — 缅甸未加热红宝石，钻石细工镶嵌，白金',
    },
    categories: ['necklace', 'ring', 'earring', 'coloured'],
    subjects: ['ruby', 'set', 'editorial'],
    priority: 'hero',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'editorial-sapphire-suite-white.jpg',
    alt: 'Model in ivory bridal silhouette wearing the sapphire floral suite — necklace, earrings, ring, bracelet.',
    name: {
      en: 'Sapphire Floral Suite',
      th: 'ชุดดอกไม้ไพลิน เต็มชุด',
      zh: '蓝宝石花卉全套',
    },
    spec: {
      en: 'Necklace, earrings, ring, bracelet — the sapphire floral language in full parure.',
      th: 'สร้อยคอ ต่างหู แหวน สร้อยข้อมือ — ภาษาดอกไม้ไพลินครบเซ็ต',
      zh: '项链、耳环、戒指、手链 — 蓝宝石花卉全套首饰',
    },
    categories: ['necklace', 'earring', 'ring', 'coloured'],
    subjects: ['sapphire', 'set', 'editorial'],
    priority: 'hero',
    aspect: 'portrait',
    origin: 'drop2026',
  },

  /* ============================================================
   *  III. SIGNATURE STUDIO — strongest gallery cards (drop 2026).
   * ============================================================ */
  {
    src: 'royal-blue-sapphire-three-stone.jpg',
    alt: 'Cushion-cut royal blue sapphire three-stone ring on hand against neutral ground.',
    name: {
      en: 'Royal Blue Sapphire Three-Stone',
      th: 'แหวนสามหินไพลินรอยัล',
      zh: '皇家蓝宝石三石戒指',
    },
    spec: {
      en: 'Unheated cushion royal blue sapphire flanked by pear diamond side stones. Platinum.',
      th: 'ไพลินรอยัลไม่เผาทรงคุชชั่น ขนาบด้วยเพชรเพียร์ ตัวเรือนแพลทินัม',
      zh: '未加热垫形皇家蓝宝石，两侧梨形钻石，铂金镶嵌',
    },
    categories: ['ring', 'coloured'],
    subjects: ['sapphire'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'sapphire-ruby-trinity-rings.jpg',
    alt: 'Two trinity rings worn on adjacent hands — one royal blue sapphire centre, one Burmese ruby centre.',
    name: {
      en: 'Sapphire & Ruby Trinity',
      th: 'แหวนทรินิตี้ ไพลิน และ ทับทิม',
      zh: '蓝宝石与红宝石三联戒',
    },
    spec: {
      en: 'A pair of trinity rings — royal blue sapphire and Burmese ruby — each crowned by pear diamond pétales.',
      th: 'แหวนทรินิตี้คู่ — ไพลินรอยัลและทับทิมพม่า — ประดับด้วยเพชรเพียร์เป็นกลีบ',
      zh: '一对三联戒 — 皇家蓝宝石与缅甸红宝石 — 顶端梨形钻石如花瓣',
    },
    categories: ['ring', 'coloured'],
    subjects: ['sapphire', 'ruby'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'ruby-bypass-yellow-diamond-ear.jpg',
    alt: 'Model with hand at temple wearing a Burmese ruby bypass ring and a fancy yellow diamond earring.',
    name: {
      en: 'Burmese Ruby Bypass',
      th: 'แหวนไขว้ทับทิมพม่า',
      zh: '缅甸红宝石交错戒指',
    },
    spec: {
      en: 'Round Burmese ruby and pear diamonds in a bypass band, with a fancy yellow diamond ear stud opposite.',
      th: 'ทับทิมพม่าทรงกลมและเพชรเพียร์ ในตัวเรือนไขว้ คู่กับต่างหูเพชรสีเหลืองแฟนซี',
      zh: '圆形缅甸红宝石与梨形钻石交错戒环，配以彩黄钻石耳钉',
    },
    categories: ['ring', 'earring', 'coloured'],
    subjects: ['ruby', 'diamond', 'editorial'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'diamond-floral-choker-neck.jpg',
    alt: 'All-diamond floral choker worn on the neck — pavé clusters in a curved garland.',
    name: {
      en: 'Diamond Floral Garland Choker',
      th: 'สร้อยคอช่อดอกไม้เพชร',
      zh: '钻石花环项圈',
    },
    spec: {
      en: 'Pavé diamond flowers strung into a curved garland — a choker that rests like a collar.',
      th: 'ช่อดอกไม้เพชรพาเว่ เรียงเป็นเส้นโค้ง — สร้อยคอที่วางเรียบเสมือนคอเสื้อ',
      zh: '密钉钻石花朵串成弧形花环 — 似衣领般贴颈',
    },
    categories: ['necklace', 'diamond'],
    subjects: ['diamond'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'sapphire-floral-suite-diagonal-black.jpg',
    alt: 'Sapphire floral suite detail crop running diagonally across black ground.',
    name: {
      en: 'Sapphire Floral Detail',
      th: 'รายละเอียดดอกไม้ไพลิน',
      zh: '蓝宝石花卉特写',
    },
    spec: {
      en: 'A diagonal detail of the sapphire floral suite — five oval sapphires across a diamond petal-bed.',
      th: 'รายละเอียดเฉียงของชุดดอกไม้ไพลิน — ไพลินทรงรีห้าเม็ดบนเตียงกลีบเพชร',
      zh: '蓝宝石花卉的对角线特写 — 五颗椭圆蓝宝石浮于钻石花瓣之上',
    },
    categories: ['necklace', 'coloured'],
    subjects: ['sapphire'],
    priority: 'gallery',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'editorial-sapphire-suite-close.jpg',
    alt: 'Close model portrait wearing the sapphire floral necklace, earring and ring.',
    name: {
      en: 'Sapphire Suite, Close',
      th: 'ชุดไพลิน ระยะใกล้',
      zh: '蓝宝石套装 · 近景',
    },
    spec: {
      en: 'Close portrait of the sapphire floral parure — necklace, earring and ring in conversation.',
      th: 'ภาพระยะใกล้ของชุดดอกไม้ไพลิน — สร้อย ต่างหู แหวน สนทนากัน',
      zh: '蓝宝石花卉首饰套装近景 — 项链、耳环、戒指相互呼应',
    },
    categories: ['necklace', 'earring', 'ring', 'coloured'],
    subjects: ['sapphire', 'set', 'editorial'],
    priority: 'gallery',
    aspect: 'portrait',
    origin: 'drop2026',
  },

  /* ============================================================
   *  IV. STUDIO CABINET — single-piece on-hand and detail shots.
   * ============================================================ */
  {
    src: 'diamond-tennis-bracelet-pear.jpg',
    alt: 'Diamond tennis bracelet with graduated pear and round diamonds, worn on wrist.',
    name: {
      en: 'Pear Diamond Tennis Bracelet',
      th: 'สร้อยข้อมือเทนนิสเพชรเพียร์',
      zh: '梨形钻石网球手链',
    },
    spec: {
      en: 'Round brilliant tennis line punctuated by graduated pear diamonds, in rose gold.',
      th: 'แถวเพชรกลมแบบเทนนิส ขัดด้วยเพชรเพียร์ไล่ขนาด ตัวเรือนทองชมพู',
      zh: '圆形明亮式钻石网球链中段，由渐次梨形钻石点缀，玫瑰金',
    },
    categories: ['diamond'],
    subjects: ['diamond'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'diamond-tennis-bracelet-open-rings.jpg',
    alt: 'Model wearing a slender diamond tennis bracelet alongside two open diamond rings.',
    name: {
      en: 'Tennis Line & Open Rings',
      th: 'สร้อยข้อมือเทนนิสและแหวนเปิด',
      zh: '网球手链与开口戒指',
    },
    spec: {
      en: 'Slender round-brilliant tennis bracelet with two open-band diamond rings — the everyday triad.',
      th: 'สร้อยข้อมือเทนนิสเพชรกลมขนาดเล็ก คู่กับแหวนเพชรเปิดสองวง — ทรินิตี้ของชีวิตประจำวัน',
      zh: '纤巧圆钻网球手链与两枚开口钻石戒指 — 日常三件套',
    },
    categories: ['ring', 'diamond'],
    subjects: ['diamond', 'set'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'princess-halo-tennis-bracelet.jpg',
    alt: 'Princess-cut diamond station tennis bracelet on a soft champagne backdrop.',
    name: {
      en: 'Princess Station Bracelet',
      th: 'สร้อยข้อมือเพชรพรินเซส',
      zh: '公主方钻车站手链',
    },
    spec: {
      en: 'A princess-cut diamond station haloed by pavé, set between a fine round-brilliant tennis line.',
      th: 'เพชรพรินเซสฮาโลพาเว่ คั่นกลางแถวเพชรกลมขนาดเล็ก',
      zh: '公主方钻为站，密钉光晕环绕，居于纤细圆钻链中',
    },
    categories: ['diamond'],
    subjects: ['diamond'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'solitaire-pear-bypass-rings-face.jpg',
    alt: 'Model hand at face wearing a solitaire and a pear-bypass diamond ring, with a stud earring visible.',
    name: {
      en: 'Solitaire & Pear Bypass',
      th: 'แหวนเดี่ยวและแหวนเพียร์ไขว้',
      zh: '单钻与梨形交错戒',
    },
    spec: {
      en: 'Two solitaire languages — the classic round and the curving pear-bypass — worn together.',
      th: 'ภาษาแหวนเดี่ยวสองแบบ — ทรงกลมคลาสสิกและทรงเพียร์ไขว้พลิ้ว — สวมพร้อมกัน',
      zh: '两种单钻语言 — 经典圆钻与流线梨形交错 — 同时佩戴',
    },
    categories: ['ring', 'diamond'],
    subjects: ['diamond', 'editorial'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'spinel-pear-diamond-bypass-velvet.jpg',
    alt: 'Cushion pink spinel and pear diamond bypass ring on a hand against black velvet.',
    name: {
      en: 'Pink Spinel Bypass',
      th: 'แหวนไขว้สปิเนลชมพู',
      zh: '粉色尖晶石交错戒指',
    },
    spec: {
      en: 'A cushion pink spinel embraced by a pavé pear diamond — toi-et-moi in a single curve.',
      th: 'สปิเนลชมพูทรงคุชชั่นโอบโดยเพชรเพียร์พาเว่ — โต-เอ-มัวร์ในเส้นโค้งเดียว',
      zh: '垫形粉色尖晶石与密钉梨形钻石相拥 — 一线弧度间的对石',
    },
    categories: ['ring', 'coloured'],
    subjects: ['ruby'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },
  {
    src: 'diamond-toi-et-moi-ring-velvet.jpg',
    alt: 'Two-stone diamond toi-et-moi ring on a hand resting against black velvet.',
    name: {
      en: 'Diamond Toi-et-Moi',
      th: 'แหวนสองเม็ดโต-เอ-มัวร์',
      zh: '双钻对石戒指',
    },
    spec: {
      en: 'Two pavé-shouldered diamonds in a fluid bypass — a quiet engagement language.',
      th: 'เพชรสองเม็ดบนตัวเรือนไหล่พาเว่ ในแนวไขว้พลิ้ว — ภาษาแห่งการหมั้นอย่างเงียบ',
      zh: '两颗密钉肩饰钻石，柔美交错 — 沉静的订婚语言',
    },
    categories: ['ring', 'diamond'],
    subjects: ['diamond'],
    priority: 'gallery',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'ruby-stud-pave-band-detail.jpg',
    alt: 'Detail of a model ear with a pink-red ruby earring and a pavé diamond band ring.',
    name: {
      en: 'Ruby Stud · Pavé Band',
      th: 'ต่างหูทับทิม · แหวนพาเว่',
      zh: '红宝石钉耳 · 密钉戒环',
    },
    spec: {
      en: 'A pink-red Burmese ruby ear stud caught against a pavé diamond band — two-piece, one register.',
      th: 'ต่างหูทับทิมพม่าสีชมพูแดง ขับกับแหวนพาเว่เพชร — สองชิ้น ภาษาเดียว',
      zh: '粉红缅甸红宝石耳钉与密钉钻石戒指相映 — 二件一调',
    },
    categories: ['earring', 'ring', 'coloured'],
    subjects: ['ruby', 'editorial'],
    priority: 'gallery',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'yellow-blue-sapphire-orbit-earring.jpg',
    alt: 'Single ear shot of an orbit drop earring — yellow sapphire halo above a blue sapphire halo.',
    name: {
      en: 'Yellow & Blue Sapphire Orbit',
      th: 'ต่างหูออร์บิตไพลินเหลือง-น้ำเงิน',
      zh: '黄蓝双色蓝宝石轨道耳环',
    },
    spec: {
      en: 'A fancy yellow sapphire orbit a royal blue sapphire — each in a diamond halo — set to drop.',
      th: 'ไพลินสีเหลืองแฟนซีโคจรรอบไพลินรอยัล — ฮาโลเพชรทั้งคู่ — ห้อยระย้า',
      zh: '彩黄蓝宝石环绕皇家蓝宝石 — 双重钻石光晕 — 垂坠造型',
    },
    categories: ['earring', 'coloured'],
    subjects: ['sapphire'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'drop2026',
  },

  /* ============================================================
   *  V. ARCHIVE — six retained frames from prior shoots.
   *     Selected for: real photograph (not AI render),
   *     distinctive composition, sharp focus, hero or tile-grade.
   * ============================================================ */
  {
    src: 'ring-pink-marquise-pave-band.jpg',
    alt: 'Hand on a leather-bound book holding a ruby and emerald toi-et-moi ring; Montblanc pen and silk in soft focus behind.',
    name: {
      en: 'Ruby & Emerald Toi-et-Moi',
      th: 'แหวนโต-เอ-มัวร์ ทับทิม-มรกต',
      zh: '红宝石与祖母绿对石戒指',
    },
    spec: {
      en: 'Oval ruby and emerald in conversation across a pavé bypass band — photographed in repose, hand at rest.',
      th: 'ทับทิมและมรกตทรงรีสนทนากันบนตัวเรือนไขว้พาเว่ — ถ่ายภาพยามผ่อนพัก มือเป็นที่พักให้',
      zh: '椭圆红宝石与祖母绿隔密钉交错戒环相望 — 镜头捕捉静憩之手',
    },
    categories: ['ring', 'coloured'],
    subjects: ['ruby', 'editorial'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'archive',
  },
  {
    src: 'set-tsavorite-pink-tourmaline-earrings-ring.jpg',
    alt: 'Pastel pink and mint set composition with tsavorite and pink tourmaline butterfly earrings and a matching bypass ring.',
    name: {
      en: 'Tsavorite & Tourmaline Suite',
      th: 'ชุดซาโวไรต์และทัวมาลีน',
      zh: '沙弗莱与碧玺套装',
    },
    spec: {
      en: 'Mismatched butterfly studs in tsavorite and pink tourmaline, paired with the bypass ring — pastel cabinet shot.',
      th: 'ต่างหูคลัสเตอร์ผีเสื้อคนละข้าง ซาโวไรต์และทัวมาลีนชมพู คู่กับแหวนไขว้ — ภาพคาบิเน็ตพาสเทล',
      zh: '不对称蝶翼花簇耳环（沙弗莱与粉色碧玺）与交错戒指相伴 — 粉彩柜中之景',
    },
    categories: ['earring', 'ring', 'coloured'],
    subjects: ['set'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'archive',
  },
  {
    src: 'earring-pink-tourmaline-detail.jpg',
    alt: 'Two models in profile and three-quarter showing mismatched tsavorite and pink tourmaline cluster studs.',
    name: {
      en: 'Cluster Studs · Twin Portrait',
      th: 'ต่างหูคลัสเตอร์ · ภาพคู่',
      zh: '花簇耳钉 · 双人肖像',
    },
    spec: {
      en: 'A study of the mismatched butterfly clusters, worn — one ear in profile, one full-front.',
      th: 'การศึกษาคลัสเตอร์ผีเสื้อคนละข้าง ขณะสวมใส่ — ใบหูข้างหนึ่งด้านข้าง อีกข้างด้านหน้า',
      zh: '不对称蝶翼花簇耳钉的佩戴特写 — 一耳侧影，一耳正面',
    },
    categories: ['earring', 'coloured'],
    subjects: ['editorial'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'archive',
  },
  {
    src: 'earring-pear-diamond-vine-on-model.jpg',
    alt: 'Close portrait of a blonde model with a pavé diamond vine ear ornament against a soft rose ground.',
    name: {
      en: 'Pavé Vine Ear, Worn',
      th: 'ต่างหูเถาวัลย์พาเว่ ขณะสวมใส่',
      zh: '密钉藤蔓耳饰 · 佩戴',
    },
    spec: {
      en: 'The pavé diamond vine catching daylight at the lobe — soft rose ground, hair held back.',
      th: 'ต่างหูเถาวัลย์เพชรพาเว่ รับแสงธรรมชาติบนใบหู — พื้นสีกุหลาบนุ่ม ผมถูกรวบไว้',
      zh: '密钉钻石藤蔓耳饰捕捉日光于耳廓 — 柔和玫瑰背景，发丝向后',
    },
    categories: ['earring', 'diamond'],
    subjects: ['diamond', 'editorial'],
    priority: 'gallery',
    aspect: 'square',
    origin: 'archive',
  },
  {
    src: 'paraiba-cluster-on-hand.jpg',
    alt: 'Paraiba tourmaline cluster ring on a hand resting beside a stack of books on white marble.',
    name: {
      en: 'Paraiba Cluster, Worn',
      th: 'พาราอิบาคลัสเตอร์ ขณะสวมใส่',
      zh: '帕拉伊巴花簇 · 佩戴',
    },
    spec: {
      en: 'Vivid Paraiba tourmaline framed by marquise diamond pétales — daylight reference on the hand.',
      th: 'พาราอิบาทัวมาลีนสีนีออน ล้อมด้วยกลีบเพชรมาร์คีส์ — อ้างอิงแสงธรรมชาติบนมือ',
      zh: '霓虹帕拉伊巴碧玺，马眼形钻石花瓣环绕 — 手部日光佩戴参考',
    },
    categories: ['ring', 'coloured'],
    subjects: ['editorial'],
    priority: 'detail',
    aspect: 'square',
    origin: 'archive',
  },
  {
    src: 'earring-star-climber-on-model.jpg',
    alt: 'Close-up of a model ear with a pavé diamond star ear climber.',
    name: {
      en: 'Star Climber, Worn',
      th: 'ต่างหูดาวไต่ใบหู ขณะสวมใส่',
      zh: '星辰攀耳 · 佩戴',
    },
    spec: {
      en: 'A pavé star climbs the lobe — a small thing, sharply made.',
      th: 'ดาวพาเว่ไต่ขึ้นไปตามติ่งหู — ของเล็ก ทำให้คมชัด',
      zh: '密钉星辰沿耳廓攀升 — 小巧之物，做工锐利',
    },
    categories: ['earring', 'diamond'],
    subjects: ['diamond'],
    priority: 'detail',
    aspect: 'square',
    origin: 'archive',
  },

  /* ============================================================
   *  VI. EDITORIAL DETAIL — supporting plates (drop 2026).
   * ============================================================ */
  {
    src: 'sapphire-bracelet-column-black.jpg',
    alt: 'Sapphire floral bracelet photographed as a vertical column on jet black.',
    name: {
      en: 'Sapphire Floral Bracelet',
      th: 'สร้อยข้อมือดอกไม้ไพลิน',
      zh: '蓝宝石花卉手链',
    },
    spec: {
      en: 'The floral language as a wrist — ten oval royal blue sapphires, pear diamond pétales.',
      th: 'ภาษาดอกไม้บนข้อมือ — ไพลินรอยัลทรงรีสิบเม็ด เพชรเพียร์เป็นกลีบ',
      zh: '花卉语言之于腕间 — 十颗椭圆皇家蓝宝石与梨形钻石花瓣',
    },
    categories: ['coloured'],
    subjects: ['sapphire'],
    priority: 'detail',
    aspect: 'portrait',
    origin: 'drop2026',
  },
  {
    src: 'diamond-y-necklace-black.jpg',
    alt: 'Asymmetric diamond Y-necklace terminating in a large princess-cut diamond, on jet black.',
    name: {
      en: 'Diamond Y-Necklace',
      th: 'สร้อยคอทรงตัว Y เพชร',
      zh: 'Y型钻石项链',
    },
    spec: {
      en: 'Pear, marquise, oval and emerald-cut diamonds graduate to a princess-cut drop. White gold.',
      th: 'เพชรเพียร์ มาร์คีส์ รี และเอเมอรัลด์ ไล่ลงสู่เพชรพรินเซสปลาย ตัวเรือนทองคำขาว',
      zh: '梨形、马眼、椭圆与祖母绿切割钻石依次递降，止于公主方钻吊坠，白金',
    },
    categories: ['necklace', 'diamond'],
    subjects: ['diamond'],
    priority: 'detail',
    aspect: 'portrait',
    origin: 'drop2026',
  },
];

export const FILTER_TABS: { id: 'all' | GalleryCategory; label: { en: string; th: string; zh: string } }[] = [
  { id: 'all',       label: { en: 'All',             th: 'ทั้งหมด',         zh: '全部' } },
  { id: 'ring',      label: { en: 'Rings',           th: 'แหวน',            zh: '戒指' } },
  { id: 'necklace',  label: { en: 'Necklaces',       th: 'สร้อยคอ',         zh: '项链' } },
  { id: 'earring',   label: { en: 'Earrings',        th: 'ต่างหู',           zh: '耳饰' } },
  { id: 'diamond',   label: { en: 'Diamonds',        th: 'เพชร',            zh: '钻石' } },
  { id: 'coloured',  label: { en: 'Coloured Stones', th: 'พลอยสี',          zh: '彩色宝石' } },
];
