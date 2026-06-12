/**
 * Three-language copy for the site: English, Thai, Chinese (Simplified).
 *
 * Polite particle in Thai always ครับ — never ค่ะ.
 *
 * To add a translatable string: add to each of `en`, `th`, `zh`, then call
 * `useT()(key)` (or `t(locale, key)` on the server) wherever it appears.
 */

export type Locale = 'en' | 'th' | 'zh';

export const LOCALES: { id: Locale; short: string; label: string }[] = [
  { id: 'en', short: 'EN', label: 'English' },
  { id: 'th', short: 'TH', label: 'ไทย' },
  { id: 'zh', short: 'CN', label: '中文' },
];

export const COPY = {
  // ── Navigation ──────────────────────────────────────────────
  'nav.home':         { en: 'Home',           th: 'หน้าแรก',          zh: '首页' },
  'nav.gallery':      { en: 'Gallery',        th: 'แกลเลอรี',         zh: '臻品' },
  'nav.about':        { en: 'Maison',         th: 'เกี่ยวกับเรา',      zh: '品牌' },
  'nav.info':         { en: 'Visit',          th: 'มาเยือน',          zh: '探访' },
  'nav.contact':      { en: 'Contact',        th: 'ติดต่อ',           zh: '联络' },
  'nav.book':         { en: 'Book Appointment', th: 'นัดหมายชมเครื่องประดับ', zh: '预约鉴赏' },
  'nav.bookShort':    { en: 'Book',           th: 'นัดหมาย',         zh: '预约' },

  // ── Hero ────────────────────────────────────────────────────
  'hero.eyebrow':     { en: 'Bangkok · Since 1993', th: 'กรุงเทพฯ · ตั้งแต่ปี 1993', zh: '曼谷 · 自1993年' },
  'hero.title.l1':    { en: 'Gemstone art',        th: 'ศิลปะแห่งอัญมณี',     zh: '宝石之艺' },
  'hero.title.l2':    { en: 'since 1993.',         th: 'ตั้งแต่ปี 1993',     zh: '自1993年起' },
  'hero.lede':        {
    en: 'An independent Thai high-jewellery house. Unheated Burmese rubies, royal blue Ceylon sapphires, fancy diamonds. Hand-set, signed CLEAR 1993.',
    th: 'เมซงเครื่องประดับชั้นสูงสัญชาติไทย ทับทิมพม่าไม่เผา ไพลินซีลอนรอยัลบลู และเพชรหลากสี ฝังด้วยมือ ลงนาม CLEAR 1993 ครับ',
    zh: '泰国独立高级珠宝世家。未经加热的缅甸红宝石、皇家蓝锡兰蓝宝石、彩钻。手工镶嵌，CLEAR 1993 签鉴。',
  },
  'hero.cta.book':    { en: 'Book on LINE',       th: 'นัดหมายผ่าน LINE', zh: '通过 LINE 预约' },
  'hero.cta.gallery': { en: 'View Gallery',       th: 'ชมแกลเลอรี',      zh: '浏览臻品' },
  'hero.scroll':      { en: 'Scroll',             th: 'เลื่อนลง',         zh: '下滑' },

  // ── Trust strip ─────────────────────────────────────────────
  'trust.gia.l':      { en: 'GIA-Certified',      th: 'รับรอง GIA',     zh: 'GIA 认证' },
  'trust.gia.d':      { en: 'Every signature stone', th: 'อัญมณีลายเซ็นทุกชิ้น', zh: '每一颗签名宝石' },
  'trust.un.l':       { en: 'Unheated Rarities',  th: 'อัญมณีหายากไม่เผา', zh: '未经加热的珍稀宝石' },
  'trust.un.d':       { en: 'Burmese rubies · Royal blue sapphires', th: 'ทับทิมพม่า · ไพลินรอยัลบลู', zh: '缅甸红宝石 · 皇家蓝宝石' },
  'trust.bp.l':       { en: 'Bespoke Design',     th: 'ออกแบบเฉพาะตัว',  zh: '定制设计' },
  'trust.bp.d':       { en: 'One-of-one commissions', th: 'งานสั่งทำชิ้นเดียวในโลก', zh: '独一无二的委托作品' },
  'trust.yr.l':       { en: 'Since 1993',         th: 'ตั้งแต่ปี 1993',  zh: '自1993年' },
  'trust.yr.d':       { en: '30+ years in Bangkok', th: 'กว่า 30 ปีในกรุงเทพฯ', zh: '深耕曼谷三十余载' },

  // ── Signature pieces section ────────────────────────────────
  'sig.eyebrow':      { en: 'Signature',          th: 'ลายเซ็น',         zh: '臻选' },
  'sig.title.l1':     { en: 'The pieces we are',  th: 'ผลงานที่เรา',     zh: '我们最为' },
  'sig.title.l2':     { en: 'known for.',         th: 'เป็นที่จดจำ',     zh: '人所熟知的作品' },
  'sig.body':         {
    en: 'Every signature stone is GIA-certified. Every setting is finished by hand. Each piece is a one-of-one composition — never a reproduction.',
    th: 'อัญมณีลายเซ็นทุกชิ้นได้รับการรับรอง GIA ทุกตัวเรือนตกแต่งด้วยมือ ทุกชิ้นเป็นการประพันธ์ชิ้นเดียวในโลก ไม่ใช่งานทำซ้ำ ครับ',
    zh: '每一颗签名宝石均通过 GIA 认证，每一处镶嵌皆出自手工，每一件作品都是独一无二的构成 — 绝非复制。',
  },
  'sig.viewall':      { en: 'View the full gallery', th: 'ชมแกลเลอรีทั้งหมด', zh: '浏览全部臻品' },

  // ── Heritage band ───────────────────────────────────────────
  'her.eyebrow':      { en: 'The House',          th: 'เมซง',             zh: '世家' },
  'her.title.l1':     { en: 'Thirty years of',    th: 'สามทศวรรษแห่ง',  zh: '三十年' },
  'her.title.l2':     { en: 'rare stones.',       th: 'อัญมณีหายาก',     zh: '珍稀宝石之路' },
  'her.body':         {
    en: 'CLEAR Jewelry was founded in Bangkok in 1993 to do one thing quietly and well: source the rarest coloured stones in the world, set them by hand, and only ever sign work we would wear ourselves.',
    th: 'CLEAR Jewelry ก่อตั้งในกรุงเทพฯ เมื่อปี 1993 ด้วยเป้าหมายเดียวที่ทำอย่างเงียบและประณีต — สรรหาอัญมณีสีที่หายากที่สุดในโลก ฝังด้วยมือ และลงนามเฉพาะผลงานที่เราเองพร้อมจะสวมใส่ ครับ',
    zh: 'CLEAR Jewelry 创立于1993年曼谷，专注于一件事：搜罗世界最珍稀的彩色宝石，亲手镶嵌，仅在我们自己愿意佩戴的作品上署名。',
  },
  'her.cta':          { en: 'Read the maison story', th: 'อ่านเรื่องราวของเมซง', zh: '阅读品牌故事' },

  // ── Closing CTA ─────────────────────────────────────────────
  'cls.title.l1':     { en: 'Visit the atelier',  th: 'เยี่ยมชมอาเตอลิเย', zh: '莅临工坊' },
  'cls.title.l2':     { en: 'at Gaysorn.',        th: 'ที่เกษร',            zh: '于 Gaysorn 商场' },
  'cls.body':         {
    en: 'Private viewings by appointment. Bring an idea, an heirloom, or a stone you love. We will design the rest.',
    th: 'ชมโดยส่วนตัวตามนัดหมาย นำไอเดีย ของสะสมในครอบครัว หรืออัญมณีที่คุณรักมา ส่วนที่เหลือเราจะออกแบบให้ ครับ',
    zh: '私密预约赏鉴。请携带您的构想、家传珍宝或心爱宝石前来 — 其余皆交由我们设计。',
  },
  'cls.cta.book':     { en: 'Book on LINE',       th: 'นัดหมายผ่าน LINE', zh: '通过 LINE 预约' },
  'cls.cta.contact':  { en: 'All channels',       th: 'ช่องทางทั้งหมด',   zh: '全部联络方式' },
  'cls.whisper':      { en: 'Quietly. Well. Since 1993.', th: 'อย่างเงียบ ประณีต ตั้งแต่ปี 1993', zh: '沉静 · 精致 · 自1993年' },

  // ── The Vault (home — locket reveal) ────────────────────────
  'vault.eyebrow':    { en: 'The vault opens',    th: 'เปิดตู้นิรภัย',     zh: '宝库开启' },
  'vault.hint':       { en: 'Keep scrolling',     th: 'เลื่อนลงต่อ',       zh: '继续下滑' },
  'vault.caption':    {
    en: 'The season’s centerpiece — a diamond toi-et-moi, two stones in a single fluid line.',
    th: 'ชิ้นเอกประจำฤดูกาล — แหวนโต-เอ-มัวร์เพชร สองเม็ดในเส้นเดียวพลิ้วต่อเนื่อง ครับ',
    zh: '本季臻品 — 钻石对石戒指，两颗美钻于一线之间相依。',
  },
  'vault.label':      { en: 'Lot No. 01 · Signed CLEAR 1993', th: 'ลำดับที่ 01 · ลงนาม CLEAR 1993', zh: '臻品编号 01 · CLEAR 1993 签鉴' },

  // ── Footer ──────────────────────────────────────────────────
  'foot.cta':         { en: 'Reserve an Appointment', th: 'จองนัดหมาย', zh: '预约鉴赏' },
  'foot.atelier':     { en: 'Atelier',            th: 'อาเตอลิเย',       zh: '工坊' },
  'foot.hours':       { en: 'Hours',              th: 'เวลาทำการ',      zh: '营业时间' },
  'foot.contact':     { en: 'Direct',             th: 'ติดต่อโดยตรง',   zh: '直接联络' },
  'foot.ig':          { en: 'Instagram',          th: 'อินสตาแกรม',     zh: 'Instagram' },
  'foot.line':        { en: 'LINE',               th: 'LINE',           zh: 'LINE' },
  'foot.legal':       { en: '© 1993–{year} CLEAR Jewelry · Bangkok', th: '© 1993–{year} CLEAR Jewelry · กรุงเทพฯ', zh: '© 1993–{year} CLEAR Jewelry · 曼谷' },
  'foot.legend':      { en: 'Made by hand. Set by hand. Signed CLEAR 1993.', th: 'ทำด้วยมือ ฝังด้วยมือ ลงนาม CLEAR 1993', zh: '手作 · 手镶 · CLEAR 1993 签鉴' },

  // ── Gallery page ────────────────────────────────────────────
  'gal.eyebrow':      { en: 'The Gallery',        th: 'แกลเลอรี',         zh: '臻品鉴赏' },
  'gal.title.l1':     { en: 'Every piece,',       th: 'ทุกผลงาน',         zh: '每一件' },
  'gal.title.l2':     { en: 'a one-of-one.',      th: 'ชิ้นเดียวในโลก',   zh: '独一无二' },
  'gal.body':         {
    en: 'Filter by category to see the colored stones, marquise diamonds, and signature settings we are best known for. Most stones live in the safe — please book to view in person.',
    th: 'กรองตามหมวดหมู่เพื่อชมพลอยสี เพชรมาร์คีส์ และตัวเรือนลายเซ็นที่เราเป็นที่จดจำ พลอยส่วนใหญ่เก็บในตู้นิรภัย โปรดนัดหมายเพื่อชมตัวจริง ครับ',
    zh: '依类别筛选，鉴赏我们最为人知的彩色宝石、马眼形美钻与经典镶嵌。多数臻品珍藏于保险柜，敬请预约亲临赏鉴。',
  },
  'gal.empty':        { en: 'No pieces in this category yet — check back soon.', th: 'ยังไม่มีผลงานในหมวดนี้ — โปรดกลับมาเร็วๆ นี้ ครับ', zh: '此类目暂无作品 — 请稍后再来' },

  // ── Maison / About ──────────────────────────────────────────
  'mai.eyebrow':      { en: 'The Maison',         th: 'เมซง',             zh: '世家' },
  'mai.title.l1':     { en: 'Thirty years of',    th: 'สามทศวรรษแห่ง',  zh: '三十年' },
  'mai.title.l2':     { en: 'rare stones.',       th: 'อัญมณีหายาก',     zh: '珍稀宝石之路' },
  'mai.opening':      {
    en: 'CLEAR Jewelry was founded in Bangkok in 1993 by a single family of gemologists who believed Thai high-jewellery deserved its own independent name. Thirty years later the brief is unchanged: source the rarest stones in the world, set them by hand, and only ever sign work we would wear ourselves.',
    th: 'CLEAR Jewelry ก่อตั้งในกรุงเทพฯ เมื่อปี 1993 โดยครอบครัวนักอัญมณีศาสตร์เพียงครอบครัวเดียว ผู้เชื่อว่าเครื่องประดับชั้นสูงของไทยควรมีชื่อของตนเอง สามทศวรรษต่อมา ภารกิจยังคงเดิม — สรรหาอัญมณีที่หายากที่สุด ฝังด้วยมือ และลงนามเฉพาะผลงานที่เราพร้อมจะสวมเอง ครับ',
    zh: 'CLEAR Jewelry 由一个宝石学家家族于1993年在曼谷创立，他们坚信泰国的高级珠宝值得拥有属于自己的独立名号。三十年来初心未改 — 搜罗世间最稀有的宝石，亲手镶嵌，仅在我们愿意自佩的作品上署名。',
  },
  'phi.eyebrow':      { en: 'Philosophy',         th: 'ปรัชญา',           zh: '理念' },
  'phi.title':        { en: 'Rare colour. Flawless luster.', th: 'สีหายาก ความวาวสมบูรณ์แบบ', zh: '珍稀彩色 · 完美光泽' },
  'phi.body':         {
    en: 'We work primarily with unheated Burmese rubies, royal blue Ceylon sapphires, fancy and black diamonds, and the occasional Paraiba tourmaline. Every signature stone is GIA-certified. Every setting is finished by a master polisher we have worked with for fifteen years. Nothing is rushed; nothing is mass-produced.',
    th: 'เราทำงานเป็นหลักกับทับทิมพม่าไม่เผา ไพลินซีลอนรอยัลบลู เพชรหลากสีและเพชรดำ และพาราอิบาทัวมาลีนเป็นครั้งคราว อัญมณีลายเซ็นทุกชิ้นได้รับการรับรอง GIA ตัวเรือนทุกชิ้นตกแต่งโดยช่างขัดมือซึ่งเราทำงานร่วมกันมาสิบห้าปี ไม่มีอะไรเร่งรีบ ไม่มีอะไรผลิตจำนวนมาก ครับ',
    zh: '我们专攻未经加热的缅甸红宝石、皇家蓝锡兰蓝宝石、彩钻与黑钻，偶有帕拉伊巴碧玺。每颗签名宝石均通过 GIA 认证，每件镶嵌皆由与我们合作十五年的打磨大师亲手完成。绝不仓促，绝无量产。',
  },
  'bsp.eyebrow':      { en: 'Bespoke',            th: 'งานสั่งทำ',        zh: '定制' },
  'bsp.title':        { en: 'Bring an idea, an heirloom, a stone you love.', th: 'นำไอเดีย ของสะสมในครอบครัว อัญมณีที่คุณรัก', zh: '请携来您的构想、家传珍宝、心爱宝石' },
  'bsp.steps.1.t':    { en: 'Conversation',       th: 'พูดคุย',           zh: '初谈' },
  'bsp.steps.1.b':    {
    en: 'A private meeting at the atelier. We listen, sketch, and look at stones together. No pressure, no fixed time.',
    th: 'พบกันเป็นการส่วนตัวที่อาเตอลิเย เรารับฟัง วาดภาพ และเลือกอัญมณีร่วมกัน ไม่มีแรงกดดัน ไม่มีเวลากำหนด ครับ',
    zh: '于工坊私密会面。我们倾听、勾勒、与您共选宝石。无压力，无定时。',
  },
  'bsp.steps.2.t':    { en: 'Stone selection',    th: 'คัดเลือกอัญมณี',  zh: '选石' },
  'bsp.steps.2.b':    {
    en: 'We present pre-vetted GIA-certified options across budgets. You touch, you compare, you choose.',
    th: 'เรานำเสนอตัวเลือกที่คัดกรองและรับรอง GIA แล้วในหลายระดับงบประมาณ คุณสัมผัส เปรียบเทียบ และเลือก ครับ',
    zh: '我们呈上经预选、GIA 认证的选项，涵盖多档预算。亲触、对比、由您选定。',
  },
  'bsp.steps.3.t':    { en: 'Design & approval',  th: 'ออกแบบและอนุมัติ', zh: '设计与审定' },
  'bsp.steps.3.b':    {
    en: 'Hand-drawn sketches, then 3D renders. We revise until the line of the piece feels exactly right.',
    th: 'ภาพร่างด้วยมือ ตามด้วยภาพเรนเดอร์ 3D เราปรับแก้จนกว่าเส้นสายของชิ้นงานจะสมบูรณ์ ครับ',
    zh: '先手绘草图，再 3D 渲染。反复调整，直至线条尽善尽美。',
  },
  'bsp.steps.4.t':    { en: 'Setting & finish',   th: 'ฝังและตกแต่ง',    zh: '镶嵌与打磨' },
  'bsp.steps.4.b':    {
    en: 'Hand-set, hand-polished. Typical lead time four to six weeks for signature commissions.',
    th: 'ฝังด้วยมือ ขัดด้วยมือ ระยะเวลาทำงานทั่วไปสี่ถึงหกสัปดาห์สำหรับงานสั่งทำลายเซ็น ครับ',
    zh: '手工镶嵌、手工打磨。签名委托通常需四至六周完成。',
  },
  'bsp.cta':          { en: 'Begin a commission', th: 'เริ่มงานสั่งทำ',   zh: '开始委托' },
  'abt.plate.eyebrow': { en: 'Interlude · The Atelier Eye', th: 'อินเทอร์ลูด · สายตาของอาเตอลิเย', zh: '间章 · 工坊之眼' },
  'abt.plate.title.l1': { en: 'Light, weighed', th: 'แสง — ชั่งน้ำหนัก', zh: '光，称量于' },
  'abt.plate.title.l2': { en: 'by hand.', th: 'ด้วยมือ', zh: '指尖' },
  'abt.plate.body': {
    en: 'Before a stone is ever drawn, it is watched — at the window, under candlelight, aga