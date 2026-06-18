'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import OrnateDivider from '@/components/OrnateDivider';
import SparkleField from '@/components/SparkleField';
import MagneticButton from '@/components/MagneticButton';
import Wordmark from '@/components/Wordmark';
import LetterDropTitle from '@/components/LetterDropTitle';
import CountUp from '@/components/CountUp';
import WhisperLine from '@/components/WhisperLine';
import { BRAND } from '@/lib/brand';
import { useT, useLocale } from '@/components/LanguageProvider';

const SECTIONS = [
  {
    eyebrow: { en: 'Expertise', th: 'ความเชี่ยวชาญ', zh: '专精' },
    title: {
      en: 'Rare &amp; unheated stones',
      th: 'อัญมณีหายากและไม่เผา',
      zh: '稀有 · 未经加热的宝石',
    },
    body: {
      en: [
        'Our atelier specializes in stones the wider market rarely touches: unheated Burmese rubies in pigeon-blood saturation, royal blue Ceylon sapphires, fancy and black diamonds, and Paraiba tourmalines from the original Brazilian mines.',
        'Every signature stone is sourced through a small circle of established cutters in Bangkok, Mogok, and Colombo &mdash; relationships built over thirty years and not transferable to anyone else.',
      ],
      th: [
        'อาเตอลิเยของเราเชี่ยวชาญในอัญมณีที่ตลาดทั่วไปแทบไม่แตะ ทับทิมพม่าไม่เผาสีพิเจียนบลัด ไพลินซีลอนรอยัลบลู เพชรหลากสีและเพชรดำ และพาราอิบาทัวมาลีนจากเหมืองดั้งเดิมในบราซิล',
        'อัญมณีลายเซ็นทุกชิ้นมาจากกลุ่มช่างเจียระไนใกล้ชิดในกรุงเทพฯ โมก๊ก และโคลอมโบ &mdash; ความสัมพันธ์ที่สร้างมาตลอดสามสิบปี ไม่อาจถ่ายโอนให้ใครได้ ครับ',
      ],
      zh: [
        '我们的工坊专注于市场鲜有触及的宝石：鸽血色未经加热缅甸红宝石、皇家蓝锡兰蓝宝石、彩钻与黑钻，以及来自巴西原矿的帕拉伊巴碧玺。',
        '每一颗签名宝石皆出自曼谷、抹谷与可伦坡的小圈子切磨大师 — 三十年情谊，难以转让。',
      ],
    },
  },
  {
    eyebrow: { en: 'Authenticity', th: 'ความแท้', zh: '正品保证' },
    title: {
      en: 'GIA-certified, every time',
      th: 'รับรอง GIA ทุกชิ้น',
      zh: 'GIA 认证，逐件而行',
    },
    body: {
      en: [
        'Every signature stone arrives at our clients with a current GIA report. We work exclusively with internationally recognized laboratories &mdash; GIA, AGL, and SSEF for coloured stones &mdash; and we provide the full chain of certification in writing.',
        'For bespoke commissions involving heirloom stones, we can arrange independent re-certification before remounting at no markup.',
      ],
      th: [
        'อัญมณีลายเซ็นทุกชิ้นส่งถึงลูกค้าพร้อมใบรับรอง GIA ปัจจุบัน เราทำงานเฉพาะกับห้องปฏิบัติการที่ได้รับการยอมรับระดับสากล &mdash; GIA, AGL และ SSEF สำหรับพลอยสี &mdash; และมอบเอกสารรับรองครบถ้วนเป็นลายลักษณ์อักษร ครับ',
        'สำหรับงานสั่งทำที่ใช้อัญมณีของครอบครัว เรายินดีจัดหาการรับรองใหม่จากห้องปฏิบัติการอิสระก่อนเปลี่ยนตัวเรือน โดยไม่คิดค่ามาร์กอัป',
      ],
      zh: [
        '每颗签名宝石均附最新 GIA 报告。我们专与国际公认实验室合作 &mdash; GIA、AGL、SSEF（彩宝） &mdash; 并提供完整书面证书链。',
        '若委托涉及家传珍石，我们可在重新镶嵌前安排独立复鉴，不收加价。',
      ],
    },
  },
  {
    eyebrow: { en: 'Bespoke', th: 'งานสั่งทำ', zh: '定制' },
    title: {
      en: 'The custom design process',
      th: 'กระบวนการออกแบบเฉพาะตัว',
      zh: '定制设计流程',
    },
    body: {
      en: [
        'Step one is conversation: a private meeting at the atelier where we listen, sketch, and look at stones together.',
        'Step two is stone selection &mdash; we pre-vet GIA-certified options across budgets so you can touch, compare, and choose.',
        'Step three is design: hand-drawn sketches, then 3D renders, revised until the line of the piece feels exactly right.',
        'Step four is setting and finish &mdash; entirely by hand. Typical lead time is four to six weeks for signature commissions.',
      ],
      th: [
        'ขั้นที่หนึ่ง คือการพูดคุย — พบกันเป็นการส่วนตัวที่อาเตอลิเย รับฟัง วาดภาพ และดูอัญมณีร่วมกัน',
        'ขั้นที่สอง คือการคัดเลือกอัญมณี — เราคัดกรองตัวเลือก GIA ตามงบประมาณ ให้ลูกค้าสัมผัส เปรียบเทียบ และเลือก',
        'ขั้นที่สาม คือการออกแบบ — ภาพร่างด้วยมือ ตามด้วยภาพเรนเดอร์ 3D ปรับแก้จนเส้นสายสมบูรณ์',
        'ขั้นที่สี่ คือการฝังและตกแต่ง — ทั้งหมดด้วยมือ ระยะเวลาทั่วไปสี่ถึงหกสัปดาห์สำหรับงานสั่งทำลายเซ็น ครับ',
      ],
      zh: [
        '第一步是初谈 — 于工坊私会，倾听、勾勒、共选宝石。',
        '第二步是选石 — 按预算预选 GIA 认证选项，亲触、对比、由您选定。',
        '第三步是设计 — 手绘草图，转 3D 渲染，反复打磨线条。',
        '第四步是镶嵌与打磨 — 全程手工。签名委托通常需四至六周。',
      ],
    },
  },
  {
    eyebrow: { en: 'Visiting', th: 'การเยี่ยมชม', zh: '探访' },
    title: {
      en: 'How to find us',
      th: 'วิธีมาหาเรา',
      zh: '抵达指引',
    },
    body: {
      en: [
        'The atelier is on the 3rd floor of Gaysorn Centre at Gaysorn Village, on the corner of Ploenchit and Ratchadamri roads in Lumpini.',
        'The most direct route is BTS Chidlom &mdash; Gaysorn Village has a covered skywalk straight from the station, so you reach us without crossing the street.',
        'Private parking is available in the Gaysorn basement; ask the concierge for the 3rd floor lift.',
      ],
      th: [
        'อาเตอลิเยตั้งอยู่ชั้น 3 ของ Gaysorn Centre ใน Gaysorn Village ที่หัวมุมถนนเพลินจิตและราชดำริ ลุมพินี',
        'เส้นทางที่ตรงที่สุดคือ BTS ชิดลม &mdash; Gaysorn Village มีทางเดินลอยฟ้าตรงจากสถานี เดินถึงเราโดยไม่ต้องข้ามถนน ครับ',
        'มีที่จอดรถส่วนตัวที่ชั้นใต้ดิน Gaysorn สอบถามคอนเซียจสำหรับลิฟต์ไปชั้น 3',
      ],
      zh: [
        '工坊位于 Gaysorn Village 内 Gaysorn Centre 3 楼，位于 Lumpini 区 Ploenchit 路与 Ratchadamri 路交汇处。',
        '最直达路线为 BTS Chidlom 站 &mdash; Gaysorn Village 与车站间有空中走廊直达，无需横穿街道。',
        '地下停车场可使用；请告知礼宾人员前往 3 楼电梯。',
      ],
    },
  },
];

const ACT_LABELS = ['I', 'II', 'III', 'IV'];

export default function InfoPage() {
  const t = useT();
  const { locale } = useLocale();
  const yearsActive = new Date().getFullYear() - BRAND.establishedYear;

  return (
    <>
      {/* ============================== INTRO ============================== */}
      <section className="relative bg-ivory pt-40 lg:pt-48 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              'radial-gradient(800px 600px at 80% 30%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.06) 35%, transparent 70%)',
          }}
        />

        {/* enormous ghost folio letter */}
        <span
          aria-hidden
          className="ghost-numeral right-[4vw] top-24"
          style={{ fontSize: 'clamp(180px, 24vw, 420px)' }}
        >
          A
        </span>

        <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
          <div className="flex items-center justify-between mb-12">
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep">
              {t('maison.label')}
            </span>
            <span className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-deep tabular-nums">
              Vol. <CountUp to={yearsActive} pad={2} /> · {BRAND.establishedYear}
            </span>
          </div>

          <Reveal>
            <p className="eyebrow text-gold-deep">A &nbsp;·&nbsp; {t('inf.eyebrow')}</p>
            <h1
              className="display leading-[0.98] mt-4 max-w-4xl"
              style={{ fontSize: 'clamp(48px, 8vw, 160px)' }}
              lang={locale}
            >
              <LetterDropTitle text={t('inf.title.l1')} />
              <span className="display-italic text-gold"> {t('inf.title.l2')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <OrnateDivider className="mt-14" />
          </Reveal>
        </div>
      </section>

      {/* ============================== 4 SECTIONS ============================== */}
      <section className="bg-ivory pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 space-y-24 lg:space-y-32">
          {SECTIONS.map((s, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <article className="relative grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
                {/* ghost act numeral, wall-painted behind the column */}
                <span
                  aria-hidden
                  className="ghost-numeral -left-2 -top-12 hidden lg:block"
                  style={{ fontSize: 'clamp(120px, 14vw, 240px)' }}
                >
                  {ACT_LABELS[i]}
                </span>
                <header className="relative">
                  <p className="eyebrow text-gold-deep">
                    {ACT_LABELS[i]} &nbsp;·&nbsp; {s.eyebrow[locale]}
                  </p>
                  <h2
                    className="display leading-[1.05] mt-3"
                    style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
                    lang={locale}
                    dangerouslySetInnerHTML={{ __html: s.title[locale] }}
                  />
                  <hr className="gold-rule mt-6" />
                </header>
                <div className="relative space-y-5">
                  {s.body[locale].map((para, j) => (
                    <p
                      key={j}
                      className={`font-sans text-[15px] tracking-[0.02em] text-charcoal/85 leading-[1.9] ${
                        i === 0 && j === 0 ? 'dropcap' : ''
                      }`}
                      lang={locale}
                      dangerouslySetInnerHTML={{ __html: para }}
                    />
                  ))}

                  {/* At-a-glance museum plaque for the Visiting section */}
                  {i === SECTIONS.length - 1 && (
                    <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-b border-[var(--rule)] py-8">
                      <div>
                        <dt className="eyebrow text-gold-deep/80">{t('foot.atelier')}</dt>
                        <dd className="display text-[19px] text-charcoal mt-2 leading-snug">
                          {BRAND.addressLines[0]}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-gold-deep/80">{t('foot.hours')}</dt>
                        <dd className="display text-[19px] text-charcoal mt-2 leading-snug" lang={locale}>
                          {t('tag.day')}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-gold-deep/80">BTS</dt>
                        <dd className="display text-[19px] text-charcoal mt-2 leading-snug" lang={locale}>
                          {t('transit')}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              </article>
              {i < SECTIONS.length - 1 && <OrnateDivider className="mt-16 opacity-70" />}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================== VISIT CTA ============================== */}
      <section className="bg-charcoal text-ivory py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 700px at 50% 30%, rgba(194,161,77,0.30) 0%, rgba(194,161,77,0.05) 40%, transparent 75%)',
          }}
        />
        <SparkleField count={6} tone="gold" />
        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-10 text-center">
          <Reveal>
            {/* Wordmark lockup removed — the Footer below already shows
                the canonical CLEAR / JEWELRY brand mark; rendering one
                in this CTA too read as 'the logo twice at the bottom.' */}
            <p className="eyebrow text-gold-light">V &nbsp;·&nbsp; {t('foot.atelier')}</p>
            <h2
              className="display leading-tight mt-6"
              style={{ fontSize: 'clamp(32px, 4.4vw, 64px)' }}
            >
              {BRAND.addressLines[0]}
            </h2>
            <p className="font-sans text-[14px] tracking-[0.02em] text-ivory/85 mt-3">
              {t('tag.day')} · {t('transit')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton href="/book" className="btn btn-light">
                {t('cls.cta.book')} <span className="btn-arrow">→</span>
              </MagneticButton>
              <Link
                href="/contact"
                className="font-sans text-[12px] uppercase tracking-[0.28em] text-ivory/85 hover:text-gold-light transition-colors duration-500 underline underline-offset-8 decoration-gold/60 decoration-[0.5px] pt-4 sm:pt-0"
              >
                {t('cls.cta.contact')}
              </Link>
            </div>
            <WhisperLine tone="dark">
              {t('misc.bangkok.since')}
            </WhisperLine>
          </Reveal>
        </div>
      </section>

      {/* ============================== DIRECTIONS ============================== */}
      <section className="bg-ivory py-24 lg:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 600px at 50% 0%, rgba(194,161,77,0.28) 0%, rgba(194,161,77,0.04) 45%, transparent 75%)',
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-6 lg:px-10">
          <Reveal>
            <header className="text-center mb-10 lg:mb-14">
              <p className="eyebrow text-gold-deep" lang={locale}>
                VI &nbsp;·&nbsp; {t('info.directions.eyebrow')}
              </p>
              <h2
                className="display-italic leading-tight mt-4 text-charcoal"
                style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
                lang={locale}
              >
                {t('info.directions.title')}
              </h2>
              <hr className="border-0 h-px bg-gold-light/60 w-20 mt-6 mx-auto" />
              <p
                className="font-sans text-[14.5px] tracking-[0.02em] text-charcoal/80 leading-[1.85] max-w-[58ch] mx-auto mt-6"
                lang={locale}
              >
                {t('info.directions.body')}
              </p>
            </header>

            <div
              className="relative p-4 lg:p-6 bg-ivory"
              style={{
                border: '1px solid rgba(194, 161, 77, 0.40)',
                boxShadow: '0 14px 44px -20px rgba(20, 16, 12, 0.22), 0 2px 14px rgba(20, 16, 12, 0.06)',
              }}
            >
              {/* corner ornaments */}
              <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, left: 10, width: 22, height: 22, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ top: 10, right: 10, width: 22, height: 22, borderTop: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, left: 10, width: 22, height: 22, borderBottom: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }} />
              <span aria-hidden className="absolute pointer-events-none" style={{ bottom: 10, right: 10, width: 22, height: 22, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }} />

              <div className="relative w-full overflow-hidden bg-charcoal/5">
                {/* Google Maps embed — no API key required for the simple
                    output=embed format. Loads the actual Maps tile UI,
                    fully interactive (pan / zoom / Streetview link). */}
                <iframe
                  title="Gaysorn Centre · Bangkok"
                  src="https://maps.google.com/maps?q=Gaysorn+Centre+Bangkok&z=16&output=embed"
                  className="block w-full h-[280px] lg:h-[420px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Below-embed link row */}
              <div className="mt-5 lg:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center">
                <a
                  href="https://www.google.com/maps?q=Gaysorn+Centre+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] font-sans text-[11px] uppercase tracking-[0.32em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 hover:border-gold-deep"
                  lang={locale}
                >
                  {t('info.directions.openInMaps')} <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Gaysorn+Centre+Bangkok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] font-sans text-[11px] uppercase tracking-[0.32em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 hover:border-gold-deep"
                  lang={locale}
                >
                  {t('info.directions.getDirections')} <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
