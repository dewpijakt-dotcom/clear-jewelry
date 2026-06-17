/**
 * CLEAR JEWELRY — i18n layer (EN · TH · ZH).
 *
 * Single source of truth for the language toggle.
 *  - `Locale`   : supported language codes ('en' | 'th'). ZH was retired
 *    from the UX; `zh` keys may still appear in COPY data + Sanity docs
 *    but are never read by the rendering pipeline.
 *  - `LOCALES`  : ordered list powering the EN · TH · CN switcher.
 *  - `COPY`     : every translatable string, keyed, with en/th/zh variants.
 *  - `pickLocalized()` : helper for Sanity content that may be either a plain
 *                        string (current schema) or { en, th, zh } (future
 *                        localized schema) — falls back to EN gracefully.
 *
 * Brand rule for Thai copy: only ever use the polite particle ครับ —
 * never ค่ะ / คะ.
 */

export type Locale = 'en' | 'th';
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALES: { id: Locale; short: string; label: string }[] = [
  { id: 'en', short: 'EN', label: 'English' },
  { id: 'th', short: 'TH', label: 'ไทย' },
];

/** A single translatable entry. `en` is required; th/zh fall back to en. */
type Entry = { en: string; th?: string; zh?: string };

export const COPY: Record<string, Entry> = {
  /* ───── NAV (header + mobile drawer) ───── */
  'nav.home':    { en: 'Home',        th: 'หน้าแรก',      zh: '首页' },
  'nav.gallery': { en: 'Gallery',     th: 'แกลเลอรี',     zh: '作品集' },
  'nav.about':   { en: 'About',       th: 'เกี่ยวกับเรา',  zh: '关于我们' },
  'nav.info':    { en: 'Information', th: 'ข้อมูล',        zh: '资讯' },
  'nav.contact': { en: 'Contact',     th: 'ติดต่อ',        zh: '联系我们' },
  'nav.book':    { en: 'Book',        th: 'นัดหมาย',       zh: '预约' },

  /* ───── SHARED BRAND LINES ───── */
  'her.body': {
    en: 'An independent Thai high-jewellery house. Rare unheated stones, hand-set and signed CLEAR 1993.',
    th: 'เมซงไฮจิวเวลรีอิสระจากประเทศไทย อัญมณีหายากแบบไม่ผ่านการเผา รังสรรค์ด้วยมือ และลงนาม CLEAR 1993 ครับ',
    zh: '独立的泰国高级珠宝世家。稀有未经加热的宝石，纯手工镶嵌，署名 CLEAR 1993。',
  },
  'transit': {
    en: 'BTS Chidlom · Direct connection to Gaysorn Village',
    th: 'BTS ชิดลม · เชื่อมต่อตรงสู่เกษรวิลเลจ',
    zh: 'BTS 奇隆站 · 直通 Gaysorn Village',
  },
  'tag.day': {
    en: '11:00 – 19:00 Daily',
    th: '11:00 – 19:00 ทุกวัน',
    zh: '11:00 – 19:00 每日营业',
  },
  'maison.label': {
    en: 'Maison · Atelier',
    th: 'เมซง · แอตเทอลิเย่',
    zh: '世家 · 工坊',
  },

  /* ───── FOOTER ───── */
  'foot.atelier': { en: 'Atelier', th: 'แอตเทอลิเย่',  zh: '工坊' },
  'foot.hours':   { en: 'Hours',   th: 'เวลาทำการ',    zh: '营业时间' },
  'foot.contact': { en: 'Contact', th: 'ติดต่อ',        zh: '联系方式' },
  'foot.line':    { en: 'LINE Official', th: 'LINE ออฟฟิเชียล', zh: 'LINE 官方账号' },
  'foot.cta': {
    en: 'Enquire via LINE',
    th: 'สอบถามผ่าน LINE ได้เลยครับ',
    zh: '通过 LINE 咨询',
  },
  'foot.legal': {
    en: '© {year} Clear Jewelry. All rights reserved.',
    th: '© {year} Clear Jewelry สงวนลิขสิทธิ์ ครับ',
    zh: '© {year} Clear Jewelry 版权所有',
  },
  'foot.legend': {
    en: 'Signed CLEAR 1993',
    th: 'ลงนาม CLEAR 1993',
    zh: '署名 CLEAR 1993',
  },
  'foot.madein': {
    en: 'Made in Bangkok · MCMXCIII',
    th: 'รังสรรค์ในกรุงเทพฯ · MCMXCIII',
    zh: '产自曼谷 · MCMXCIII',
  },

  /* ───── HOMEPAGE ───── */
  'home.scroll':         { en: 'Scroll', th: 'เลื่อนลง', zh: '向下滚动' },
  'home.sig.eyebrow':    { en: 'Signature', th: 'ลายเซ็น', zh: '签名之作' },
  'home.sig.title.l1':   { en: 'The pieces we are', th: 'ผลงานที่ลายเซ็น', zh: '我们以此' },
  'home.sig.title.l2':   { en: 'known for.', th: 'ของเราเป็นที่จดจำ', zh: '为世所知。' },
  'home.sig.body': {
    en: 'Every signature stone is GIA-certified, every setting hand-finished. Each piece is a one-of-one composition.',
    th: 'อัญมณีลายเซ็นทุกชิ้นรับรองโดย GIA และทุกตัวเรือนตกแต่งด้วยมือ ผลงานทุกชิ้นคือองค์ประกอบที่ไม่ซ้ำใคร ครับ',
    zh: '每颗签名宝石皆经 GIA 认证，每件镶嵌皆为手工完成，皆为独一无二之作。',
  },
  'home.sig.cta':        { en: 'View the full gallery', th: 'ดูแกลเลอรีทั้งหมด', zh: '浏览全部作品' },
  'home.story.eyebrow':  { en: 'Our story', th: 'เรื่องราวของเรา', zh: '我们的故事' },
  'home.story.title.l1': { en: 'Thirty years of', th: 'สามสิบปีแห่ง', zh: '三十年的' },
  'home.story.title.l2': { en: 'rare stones.', th: 'อัญมณีหายาก', zh: '稀世宝石。' },
  'home.story.body': {
    en: 'CLEAR Jewelry was founded in Bangkok in 1993 to do one thing quietly and well: source the rarest coloured stones in the world, and set them by hand. We work primarily with unheated Burmese rubies, royal blue Ceylon sapphires, fancy & black diamonds, and the occasional Paraiba. Our atelier is small. Our pieces are one-of-one. Our relationships, in many cases, are second-generation.',
    th: 'CLEAR Jewelry ก่อตั้งในกรุงเทพมหานครเมื่อปี 1993 เพื่อทำสิ่งเดียวอย่างเงียบ ๆ และทำให้ดี: สรรหาอัญมณีสีหายากที่สุดในโลกและรังสรรค์ด้วยมือ เราทำงานหลักกับทับทิมพม่าไม่เผา ไพลินซีลอนรอยัลบลู เพชรหลากสีและเพชรดำ และพาราอิบาเป็นครั้งคราว แอตเทอลิเย่ของเราเล็ก ผลงานของเราเป็นชิ้นเดียวในโลก และความสัมพันธ์กับลูกค้าหลายราย ก็ส่งต่อมาถึงรุ่นที่สองแล้ว ครับ',
    zh: 'CLEAR Jewelry 于 1993 年创立于曼谷，专注一事并臻于至善：寻觅世间最稀有的彩色宝石，并以手工镶嵌。我们主要使用未经加热的缅甸红宝石、皇家蓝锡兰蓝宝石、彩钻与黑钻，偶有帕拉伊巴。工坊规模虽小，作品皆为独一，许多客户的情谊已传至第二代。',
  },
  'home.story.cta':      { en: 'Read the heritage', th: 'อ่านเรื่องราวเต็ม', zh: '阅读传承故事' },
  'home.close.title.l1': { en: 'Visit the atelier at', th: 'เยี่ยมชมแอตเทอลิเย่ที่', zh: '亲临工坊' },
  'home.close.title.l2': { en: 'Gaysorn Centre.', th: 'เกษรเซ็นเตอร์', zh: '于 Gaysorn 中心。' },
  'home.close.body': {
    en: 'Private viewings by appointment. Bring an idea, an heirloom, or a stone you love. We will design the rest.',
    th: 'นัดชมเป็นการส่วนตัว นำไอเดีย ของในครอบครัว หรืออัญมณีที่คุณรักมาให้เราดู ส่วนที่เหลือเราออกแบบให้ ครับ',
    zh: '可预约私下鉴赏。请携您的想法、家传珍品或您所钟爱的宝石而来，其余皆由我们为您悉心设计。',
  },
  'home.close.cta.book':   { en: 'Book an Appointment', th: 'นัดหมายเข้าชม', zh: '预约鉴赏' },
  'home.close.cta.channels': { en: 'See all contact channels', th: 'ดูช่องทางติดต่อทั้งหมด', zh: '所有联络方式' },

  /* ───── ABOUT PAGE ───── */
  'about.eyebrow':       { en: 'The house', th: 'เมซง', zh: '本世家' },
  'about.h1.l1':         { en: 'Thirty years of', th: 'สามสิบปีแห่ง', zh: '三十年的' },
  'about.h1.l2':         { en: 'rare stones.', th: 'อัญมณีหายาก', zh: '稀世宝石。' },
  'about.intro.body': {
    en: 'CLEAR Jewelry was founded in Bangkok in 1993 by a single family of gemologists who believed Thai high-jewellery deserved its own independent name. Thirty years later the brief is unchanged: source the rarest stones in the world, set them by hand, and only ever sign work we would wear ourselves.',
    th: 'CLEAR Jewelry ก่อตั้งในกรุงเทพมหานครเมื่อปี 1993 โดยครอบครัวอัญมณีศาสตร์ครอบครัวเดียว ที่เชื่อว่าไฮจิวเวลรีของไทยควรมีชื่ออิสระเป็นของตนเอง สามสิบปีต่อมา ภารกิจยังคงเดิม: สรรหาอัญมณีหายากที่สุดในโลก รังสรรค์ด้วยมือ และลงนามเฉพาะผลงานที่เราพร้อมจะสวมใส่เอง ครับ',
    zh: 'CLEAR Jewelry 于 1993 年由一个珠宝鉴定家世家在曼谷创立，他们坚信泰国高级珠宝当拥有自己独立的名号。三十年后宗旨未变：寻觅世间最稀有的宝石、以手工镶嵌、只在自己愿意佩戴的作品上署名。',
  },
  'about.phil.eyebrow':  { en: 'Philosophy', th: 'ปรัชญา', zh: '理念' },
  'about.phil.h2.l1':    { en: 'Rare colour. Flawless', th: 'สีหายาก ประกาย', zh: '稀色，无瑕' },
  'about.phil.h2.l2':    { en: 'luster.', th: 'ไร้ที่ติ', zh: '光泽。' },
  'about.phil.body1': {
    en: 'We work primarily with unheated Burmese rubies, royal blue Ceylon sapphires, fancy & black diamonds, and the occasional Paraiba tourmaline. Every signature stone is GIA-certified. Every setting is finished by a master polisher we have worked with for fifteen years. Nothing is rushed; nothing is mass-produced.',
    th: 'เราทำงานหลักกับทับทิมพม่าไม่เผา ไพลินซีลอนรอยัลบลู เพชรหลากสีและเพชรดำ และพาราอิบาทัวมาลีนเป็นครั้งคราว อัญมณีลายเซ็นทุกชิ้นรับรองโดย GIA และทุกตัวเรือนผ่านการตกแต่งโดยช่างขัดเอกที่ทำงานกับเรามานานสิบห้าปี ไม่มีอะไรเร่งรีบ ไม่มีอะไรที่ผลิตจำนวนมาก ครับ',
    zh: '我们主要使用未经加热的缅甸红宝石、皇家蓝锡兰蓝宝石、彩钻与黑钻，偶有帕拉伊巴碧玺。每颗签名宝石皆经 GIA 认证，每件镶嵌皆出自我们合作十五年的抛光大师之手。从不仓促，从不量产。',
  },
  'about.phil.body2': {
    en: 'The house has remained small on purpose. Our atelier produces only what we can verify ourselves, which means our pieces are one-of-one, and our relationships — with stone dealers, with clients, with the families who have been collecting from us for two generations — are personal.',
    th: 'เมซงคงขนาดเล็กไว้โดยตั้งใจ แอตเทอลิเย่ของเราผลิตเฉพาะที่เราตรวจสอบเองได้ ผลงานจึงเป็นชิ้นเดียวในโลก และความสัมพันธ์ — กับพ่อค้าอัญมณี กับลูกค้า กับครอบครัวที่สะสมงานของเรามาสองรุ่น — ล้วนเป็นเรื่องส่วนตัว ครับ',
    zh: '世家有意保持小规模。工坊只承制我们能亲自审验之作，故作品皆独一，与宝石商、客户、以及收藏我们作品已逾两代的家族之间，皆为情谊。',
  },
  'about.besp.eyebrow':  { en: 'Bespoke', th: 'งานสั่งทำ', zh: '定制' },
  'about.besp.h2.l1':    { en: 'Bring an idea, an heirloom,', th: 'นำไอเดีย ของในครอบครัว', zh: '携您的想法、家传珍品、' },
  'about.besp.h2.l2':    { en: 'a stone you love.', th: 'หรืออัญมณีที่คุณรัก', zh: '或您所爱之宝石而来。' },
  'about.besp.s1.title': { en: 'Conversation', th: 'พูดคุย', zh: '初谈' },
  'about.besp.s1.body': {
    en: 'A private meeting at the atelier. We listen, sketch, and look at stones together. No pressure, no fixed time.',
    th: 'นัดพบเป็นการส่วนตัวที่แอตเทอลิเย่ เรารับฟัง ร่างภาพ และดูอัญมณีไปด้วยกัน ไม่กดดัน ไม่จำกัดเวลา ครับ',
    zh: '于工坊私下会面。我们倾听、勾勒、共同审视宝石。不催不限。',
  },
  'about.besp.s2.title': { en: 'Stone selection', th: 'คัดเลือกอัญมณี', zh: '选石' },
  'about.besp.s2.body': {
    en: 'We present pre-vetted GIA-certified options across budgets. You touch, you compare, you choose.',
    th: 'นำเสนอตัวเลือกอัญมณีรับรอง GIA ที่คัดสรรไว้ตามงบประมาณ คุณสัมผัส เปรียบเทียบ และเลือก ครับ',
    zh: '按预算呈上预先甄选的 GIA 认证选项。亲触、对比、由您选定。',
  },
  'about.besp.s3.title': { en: 'Design & approval', th: 'ออกแบบและอนุมัติ', zh: '设计与确认' },
  'about.besp.s3.body': {
    en: 'Hand-drawn sketches, then 3D renders. We revise until the line of the piece feels exactly right.',
    th: 'ร่างภาพด้วยมือ ตามด้วยภาพเรนเดอร์ 3D ปรับแก้จนเส้นสายของผลงานลงตัวที่สุด ครับ',
    zh: '手绘草图，转为 3D 渲染。反复打磨直至线条尽善尽美。',
  },
  'about.besp.s4.title': { en: 'Setting & finish', th: 'ฝังและตกแต่ง', zh: '镶嵌与精修' },
  'about.besp.s4.body': {
    en: 'Hand-set, hand-polished. Typical lead time four to six weeks for signature commissions.',
    th: 'ฝังด้วยมือ ขัดด้วยมือ ระยะเวลาทั่วไปสี่ถึงหกสัปดาห์สำหรับงานสั่งทำลายเซ็น ครับ',
    zh: '全程手工镶嵌与抛光。签名委托通常需四至六周。',
  },
  'about.besp.cta':      { en: 'Start a commission', th: 'เริ่มงานสั่งทำ', zh: '开始委托' },
  'about.quote.eyebrow': { en: 'In our own words', th: 'ในคำพูดของเราเอง', zh: '我们的自白' },
  'about.quote.body': {
    en: '“A piece worth signing CLEAR 1993 has only ever begun with the stone. Everything else — the metal, the line, the setting — is in service of the colour.”',
    th: '“ผลงานที่ควรค่าแก่การลงนาม CLEAR 1993 เริ่มต้นจากอัญมณีเสมอ ส่วนที่เหลือ — โลหะ เส้นสาย ตัวเรือน — ล้วนรับใช้สีของอัญมณี ครับ”',
    zh: '"凡署名 CLEAR 1993 之作，皆始于宝石。其余 — 金属、线条、镶嵌 — 皆为色泽服务。"',
  },
  'about.quote.attr':    { en: 'Atelier Clear Jewelry · Bangkok', th: 'แอตเทอลิเย่ Clear Jewelry · กรุงเทพฯ', zh: 'Clear Jewelry 工坊 · 曼谷' },

  /* ───── INFO PAGE ───── */
  'inf.eyebrow':   { en: 'A House Manual', th: 'คู่มือเมซง', zh: '世家手册' },
  'inf.title.l1':  { en: 'How we', th: 'วิธีที่เรา', zh: '我们如何' },
  'inf.title.l2':  { en: 'work.', th: 'ทำงาน', zh: '运作。' },

  /* ───── CONTACT PAGE ───── */
  'con.eyebrow':   { en: 'In conversation', th: 'พูดคุยกับเรา', zh: '与我们对话' },
  'con.title.l1':  { en: 'Three quiet ways', th: 'สามช่องทางเรียบง่าย', zh: '三种轻盈方式' },
  'con.title.l2':  { en: 'to reach us.', th: 'ที่จะติดต่อเรา', zh: '与我们联络。' },

  /* ───── GALLERY PAGE ───── */
  'gal.eyebrow':   { en: 'On View  ·  The Gallery', th: 'จัดแสดง · แกลเลอรี', zh: '正在展出 · 作品集' },
  'gal.title.l1':  { en: 'Every piece,', th: 'ทุกชิ้น คือ', zh: '每一件' },
  'gal.title.l2':  { en: 'a one-of-one.', th: 'หนึ่งเดียวในโลก', zh: '皆为独一。' },
  'gal.lede': {
    en: 'Filter by category to see the coloured stones, marquise diamonds, and matched sets we are best known for. Most signature stones live in the safe — book a private viewing to see them in person.',
    th: 'กรองตามหมวดหมู่เพื่อชมพลอยสี เพชรเจียระไนมาคีส์ และเซ็ตเข้าคู่ที่เราถนัด อัญมณีลายเซ็นส่วนใหญ่เก็บไว้ในตู้นิรภัย โปรดนัดชมเป็นการส่วนตัวเพื่อพบเห็นด้วยตาตนเอง ครับ',
    zh: '按类别筛选，可见我们最擅长的彩色宝石、马眼钻与成套之作。多数签名宝石珍藏于保险柜，请预约私下鉴赏，亲临一见。',
  },
  'gal.stat.works':   { en: 'Works', th: 'ผลงาน', zh: '作品' },
  'gal.stat.atelier': { en: 'Atelier', th: 'แอตเทอลิเย่', zh: '工坊' },
  'gal.stat.since':   { en: 'Since', th: 'ตั้งแต่ปี', zh: '自' },
  'gal.stat.viewing': { en: 'Viewing', th: 'การเข้าชม', zh: '鉴赏' },
  'gal.stat.appt':    { en: 'By appointment', th: 'นัดล่วงหน้า', zh: '凭预约' },
  'gal.stat.bangkok': { en: 'Bangkok', th: 'กรุงเทพฯ', zh: '曼谷' },

  /* ───── BOOK / APPOINTMENT FORM ───── */
  'book.eyebrow':       { en: 'Private appointment', th: 'นัดหมายส่วนตัว', zh: '私下预约' },
  'book.title.l1':      { en: 'Reserve your visit', th: 'นัดเข้าชมที่แอตเทอลิเย่', zh: '预约莅临工坊' },
  'book.title.l2':      { en: 'to the atelier.', th: 'ของเรา', zh: '。' },
  'book.intro': {
    en: 'Choose a date and a one-hour slot. We will hold the time for you on LINE — please make sure you have added our LINE Official before submitting.',
    th: 'เลือกวันและช่วงเวลาหนึ่งชั่วโมง เราจะสำรองเวลาไว้ให้ผ่าน LINE — กรุณาเพิ่มเพื่อน LINE Official ของเราก่อนส่งฟอร์ม ครับ',
    zh: '请选择日期与一小时时段。我们将通过 LINE 为您保留时间 — 提交前请先加入我们的 LINE 官方账号。',
  },
  'book.name.label':    { en: 'Name', th: 'ชื่อ', zh: '姓名' },
  'book.name.ph':       { en: 'How may we address you?', th: 'เราจะเรียกคุณว่าอะไรดีครับ', zh: '我们如何称呼您？' },
  'book.phone.label':   { en: 'Phone', th: 'หมายเลขโทรศัพท์', zh: '电话号码' },
  'book.phone.ph':      { en: '+66 or local format', th: '+66 หรือเบอร์ไทย', zh: '+66 或本地号码' },
  'book.line.label':    { en: 'Your LINE ID', th: 'ไอดี LINE ของคุณ', zh: '您的 LINE ID' },
  'book.line.ph':       { en: 'So we can confirm the time with you', th: 'เพื่อให้เรายืนยันเวลากับคุณได้', zh: '以便我们与您确认时间' },
  'book.email.label':   { en: 'Email (optional)', th: 'อีเมล (ไม่บังคับ)', zh: '电子邮件（可选）' },
  'book.email.ph':      { en: 'For the reservation receipt', th: 'สำหรับใบยืนยันการนัดหมาย', zh: '用于预约确认' },
  'book.date.label':    { en: 'Preferred date', th: 'วันที่ต้องการ', zh: '理想日期' },
  'book.time.label':    { en: 'Preferred time', th: 'ช่วงเวลาที่สะดวก', zh: '理想时段' },
  'book.time.note':     { en: 'One-hour slots. Last appointment begins at 15:00.', th: 'แต่ละช่วงหนึ่งชั่วโมง รอบสุดท้ายเริ่ม 15:00 น.', zh: '每节一小时。最后一节 15:00 开始。' },
  'book.message.label': { en: 'How can we help you?', th: 'เราช่วยอะไรคุณได้บ้าง', zh: '我们如何为您效劳？' },
  'book.message.ph': {
    en: 'A stone you have in mind, an heirloom to redesign, anything we should know before we meet.',
    th: 'อัญมณีที่อยู่ในใจ ของในครอบครัวที่อยากออกแบบใหม่ — เล่าให้เราฟังก่อนนัดได้เลย ครับ',
    zh: '心仪的宝石、欲重新设计的家传珍品 — 见面前的任何细节都欢迎告知。',
  },
  'book.line.required.title': {
    en: 'Please add our LINE Official first',
    th: 'กรุณาเพิ่มเพื่อน LINE Official ของเราก่อน',
    zh: '请先添加我们的 LINE 官方账号',
  },
  'book.line.required.body': {
    en: 'Without our LINE @clearjewelry on your contacts, our system cannot confirm the booking. Add us, then submit — your details will be copied so you can paste them into the chat.',
    th: 'หากยังไม่มี LINE @clearjewelry ในรายชื่อเพื่อน ระบบจะยืนยันการนัดหมายไม่ได้ กรุณาเพิ่มเพื่อนก่อน แล้วกดส่ง รายละเอียดจะถูกคัดลอกให้พร้อมวางในแชต ครับ',
    zh: '若您的好友列表中尚无 LINE @clearjewelry，系统将无法确认预约。请先加入好友，再提交 — 您的详情会自动复制，便于在聊天中粘贴。',
  },
  'book.add.line':      { en: 'Add us on LINE', th: 'เพิ่มเพื่อน LINE', zh: '在 LINE 加为好友' },
  'book.qr.caption':    { en: 'Scan to add @clearjewelry', th: 'สแกนเพื่อเพิ่ม @clearjewelry', zh: '扫码添加 @clearjewelry' },
  'book.submit':        { en: 'Reserve & copy my details', th: 'จองนัดและคัดลอกข้อมูล', zh: '预约并复制我的信息' },
  'book.copy.btn':      { en: 'Copy my details', th: 'คัดลอกข้อมูลของฉัน', zh: '复制我的信息' },
  'book.copy.confirm': {
    en: 'Your details have been copied — please paste them in LINE after adding us.',
    th: 'คัดลอกข้อมูลของคุณเรียบร้อยแล้ว — เพิ่มเพื่อน LINE แล้วนำไปวางในแชตได้เลย ครับ',
    zh: '您的信息已复制 — 请在加入 LINE 后于聊天中粘贴。',
  },
  'book.copy.error': {
    en: 'Could not auto-copy — please copy the text manually before sending in LINE.',
    th: 'คัดลอกอัตโนมัติไม่สำเร็จ — กรุณาคัดลอกข้อความด้วยตนเองก่อนส่งใน LINE',
    zh: '自动复制失败 — 请在 LINE 发送前手动复制。',
  },
  'book.required':      { en: 'Required', th: 'จำเป็น', zh: '必填' },
  'book.consent': {
    en: 'By submitting, you agree we may contact you via LINE / phone to confirm the reservation.',
    th: 'การส่งฟอร์มถือว่าคุณยินยอมให้เราติดต่อกลับทาง LINE หรือโทรศัพท์เพื่อยืนยันการนัดหมาย ครับ',
    zh: '提交即表示您同意我们通过 LINE 或电话与您确认预约。',
  },
  'book.summary.heading': {
    en: 'Appointment request — Clear Jewelry',
    th: 'คำขอนัดหมาย — Clear Jewelry',
    zh: '预约申请 — Clear Jewelry',
  },
  'book.body.opening':  { en: 'Opening LINE.', th: 'กำลังเปิด LINE', zh: '正在打开 LINE。' },
  'book.body.l1':       { en: 'Your conversation is opening in LINE. If it does not, you can', th: 'การสนทนากำลังเปิดใน LINE หากไม่เปิด คุณสามารถ', zh: '正在 LINE 中打开对话。如未自动打开，您可' },
  'book.body.tap':      { en: 'tap here', th: 'แตะที่นี่', zh: '点此' },
  /* Kept for back-compat with the legacy BookHandoff component */
  'book.opening':       { en: 'Opening LINE.', th: 'กำลังเปิด LINE', zh: '正在打开 LINE。' },

  /* ───── BOOKING SUCCESS / CONFIRMATION (editorial register) ───── */
  'book.success.thanks':       { en: 'Thank you, {name}.', th: 'ขอบคุณ {name} ครับ' },
  'book.success.body': {
    en: 'We have received your request for {date} at {time}. We will confirm on LINE within one business day.',
    th: 'เราได้รับคำขอนัดของคุณสำหรับวันที่ {date} เวลา {time} เรียบร้อยแล้ว เราจะยืนยันผ่าน LINE ภายในหนึ่งวันทำการ ครับ',
  },
  'book.success.detailsHeading': { en: 'Your request', th: 'รายละเอียดคำขอ' },
  'book.success.detail.name':    { en: 'Name',  th: 'ชื่อ' },
  'book.success.detail.contact': { en: 'Contact', th: 'ช่องทางติดต่อ' },
  'book.success.detail.date':    { en: 'Date',  th: 'วันที่' },
  'book.success.detail.time':    { en: 'Time',  th: 'เวลา' },
  'book.success.detail.message': { en: 'Message', th: 'ข้อความ' },
  'book.success.lineCta':        { en: 'Prefer to chat now? Add us on LINE', th: 'อยากคุยทันที? เพิ่มเพื่อน LINE ได้เลย ครับ' },
  'book.submit.sending':         { en: 'Sending…', th: 'กำลังส่ง…' },
  'book.error.generic':          { en: 'Could not submit. Please copy your details and message us on LINE.', th: 'ส่งฟอร์มไม่สำเร็จ กรุณาคัดลอกข้อมูลของคุณแล้วส่งข้อความถึงเราใน LINE ครับ' },
  'book.error.rate':             { en: 'Too many requests. Please try again in an hour, or message us on LINE.', th: 'ส่งคำขอบ่อยเกินไป กรุณาลองใหม่ในอีกหนึ่งชั่วโมง หรือส่งข้อความใน LINE ครับ' },

  /* ───── CLOSING / SHARED CTAs ───── */
  'cls.cta.book':    { en: 'Book a private viewing', th: 'นัดชมเป็นการส่วนตัว', zh: '预约私下鉴赏' },
  'cls.cta.contact': { en: 'See all channels', th: 'ดูช่องทางทั้งหมด', zh: '查看所有联络方式' },

  /* ───── WHATSAPP — branded QR card on Contact ───── */
  'wa.eyebrow':    { en: 'WhatsApp', th: 'ว็อตส์แอป', zh: 'WhatsApp' },
  'wa.name':       { en: 'Clear Jewellery', th: 'Clear Jewellery', zh: 'Clear Jewellery' },
  'wa.scan':       { en: 'Scan to chat', th: 'สแกนเพื่อแชท', zh: '扫码联系' },
  'wa.open':       { en: 'Open WhatsApp', th: 'เปิด WhatsApp', zh: '打开 WhatsApp' },
  'wa.enlarge':    { en: 'Tap to enlarge', th: 'แตะเพื่อขยาย', zh: '点击放大' },
  'wa.primary.eyebrow': { en: 'Primary channel · By appointment', th: 'ช่องทางหลัก · เปิดให้บริการตามนัด', zh: '主要联络方式 · 预约制' },
  'wa.primary.body':    { en: 'Scan the code or tap below to chat with us. We reply within one business day.', th: 'สแกนรหัสหรือแตะปุ่มด้านล่างเพื่อแชทกับเรา ยินดีตอบกลับภายในหนึ่งวันทำการ', zh: '扫描二维码或点击下方按钮与我们联络。一个工作日内回复。' },
  'wa.primary.cta':     { en: 'Chat on WhatsApp', th: 'แชทบน WhatsApp', zh: '在 WhatsApp 上联络' },
  'line.secondary.eyebrow': { en: 'Also on LINE', th: 'หรือทาง LINE', zh: '亦可使用 LINE' },
  'line.secondary.body':    { en: 'Prefer LINE? Scan the code or tap below to add us as a friend.', th: 'สะดวก LINE มากกว่า สแกนรหัสหรือแตะปุ่มด้านล่างเพื่อเพิ่มเพื่อน', zh: '若您更习惯使用 LINE，请扫码或点按下方加我们为好友。' },
  'line.secondary.cta':     { en: 'Add us on LINE', th: 'เพิ่มเพื่อน LINE', zh: '在 LINE 加为好友' },
  'book.page.eyebrow':  { en: 'By appointment', th: 'เปิดให้บริการตามนัด', zh: '预约制' },
  'book.page.title.l1': { en: 'Reach the', th: 'ติดต่อ', zh: '联络' },
  'book.page.title.l2': { en: 'atelier.', th: 'แอตเทอลิเย่', zh: '工坊' },
  'book.page.lede':     { en: "We'll confirm your appointment within one business day.", th: 'เรายืนยันการนัดหมายภายในหนึ่งวันทำการ', zh: '一个工作日内回复您的预约。' },

  /* ───── A11Y / GLOBAL CHROME ───── */
  'a11y.skip':          { en: 'Skip to content', th: 'ข้ามไปที่เนื้อหา', zh: '跳至正文' },

  /* ───── GALLERY page chrome ───── */
  'gal.on_view':        { en: 'On View', th: 'จัดแสดง', zh: '正在展出' },
  'gal.catalogue':      { en: 'The catalogue', th: 'แคตตาล็อก', zh: '作品目录' },
  'gal.salon.lot':      { en: 'Lot', th: 'ล็อต', zh: '编号' },
  'gal.salon.opening':  { en: 'The opening piece', th: 'ผลงานชิ้นเปิด', zh: '开篇之作' },
  'gal.salon.signed':   { en: 'Signed CLEAR 1993 · Bangkok', th: 'ลงนาม CLEAR 1993 · กรุงเทพมหานคร', zh: '署名 CLEAR 1993 · 曼谷' },
  'gal.count.works':    { en: '{n} works', th: 'ผลงาน {n} ชิ้น', zh: '{n} 件作品' },
  'gal.count.work':     { en: '{n} work', th: 'ผลงาน {n} ชิ้น', zh: '{n} 件作品' },
  'gal.empty':          { en: 'No pieces in this category yet — check back soon.', th: 'ยังไม่มีผลงานในหมวดนี้ — กลับมาเยี่ยมเราใหม่อีกครั้งเร็ว ๆ นี้ ครับ', zh: '此分类暂无作品 — 不久后请再来一观。' },
  'gal.salon.view':     { en: 'View detail', th: 'ดูรายละเอียด', zh: '细赏' },

  /* ───── LIGHTBOX (gallery detail modal) ───── */
  'lb.close':           { en: 'Close gallery', th: 'ปิดแกลเลอรี', zh: '关闭画廊' },
  'lb.prev':            { en: 'Previous piece', th: 'ผลงานก่อนหน้า', zh: '上一件作品' },
  'lb.next':            { en: 'Next piece', th: 'ผลงานถัดไป', zh: '下一件作品' },

  /* ───── MISC ───── */
  'misc.bangkok.since': { en: 'Bangkok · Since 1993', th: 'กรุงเทพฯ · ตั้งแต่ปี 1993', zh: '曼谷 · 始于 1993' },
  'misc.reply':         { en: 'Reply within a day · LINE @clearjewelry', th: 'ตอบกลับภายในหนึ่งวัน · LINE @clearjewelry', zh: '一日内回复 · LINE @clearjewelry' },
};

/**
 * Loose key type — any string is accepted so a future `t('new.key')`
 * never fails the build. Unknown keys render their own name (handled
 * in LanguageProvider), so missing strings are obvious in the UI.
 */
export type CopyKey = string;

/**
 * For Sanity content that may be either a plain `string` (current schema)
 * or a `{ en, th, zh }` localized object (future schema). Always returns
 * a string, falling back to `en` then to the first truthy value.
 *
 * Use this in client components that consume Sanity-fetched text so the
 * site is forward-compatible with a localized Sanity schema without
 * requiring component changes.
 */
export type Localized = string | { en?: string; th?: string; zh?: string };  // zh kept in shape for back-compat with Sanity data, no longer read

export function pickLocalized(value: Localized | null | undefined, locale: Locale): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value.en ?? value.th ?? '';
}

/**
 * Flat helper used by gallery components: convert a LocalizedGalleryItem-like
 * record into a plain { name, alt, description } string view for the given
 * locale. Lives here so it can be imported anywhere without circular deps.
 */
export interface LocalizedItemView {
  name?: Localized;
  alt?: Localized;
  description?: Localized;
}
export interface FlatItemView {
  name: string;
  alt: string;
  description: string;
}
export function flattenItem(item: LocalizedItemView, locale: Locale): FlatItemView {
  return {
    name: pickLocalized(item.name, locale),
    alt: pickLocalized(item.alt, locale),
    description: pickLocalized(item.description, locale),
  };
}
