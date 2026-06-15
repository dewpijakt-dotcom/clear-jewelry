'use client';

import { motion } from 'framer-motion';
import { useLocale } from './LanguageProvider';

/**
 * A colourful editorial band showcasing the rare stones we work with.
 * Each tile uses the stone's signature hue as background — no jewelry
 * photo needed; it's a pure colour-and-type moment that breaks the
 * ivory monotony and gives the page real chromatic variety.
 *
 * Horizontal scroll on smaller screens; 5-up grid on desktop.
 */

interface Stone {
  name: { en: string; th: string; zh: string };
  origin: { en: string; th: string; zh: string };
  note: { en: string; th: string; zh: string };
  /** Background hex — the signature saturation of the stone. */
  bg: string;
  /** Foreground text colour. */
  fg: 'ivory' | 'charcoal';
  /** Optional accent gradient overlay */
  sheen?: string;
}

const STONES: Stone[] = [
  {
    name: { en: 'Burmese Ruby', th: 'ทับทิมพม่า', zh: '缅甸红宝石' },
    origin: { en: 'Mogok · Unheated', th: 'โมก๊ก · ไม่เผา', zh: '抹谷 · 未经加热' },
    note: {
      en: 'Pigeon-blood saturation, the standard against which every ruby is measured.',
      th: 'สีพิเจียนบลัด — มาตรฐานสูงสุดของทับทิมทุกเม็ด',
      zh: '鸽血色饱和度 — 红宝石的最高标准。',
    },
    bg: '#7a1729',
    fg: 'ivory',
    sheen:
      'radial-gradient(closest-side at 30% 30%, rgba(255,180,160,0.30) 0%, rgba(255,180,160,0) 60%)',
  },
  {
    name: { en: 'Royal Blue Sapphire', th: 'ไพลินรอยัลบลู', zh: '皇家蓝宝石' },
    origin: { en: 'Ceylon · Unheated', th: 'ซีลอน · ไม่เผา', zh: '锡兰 · 未经加热' },
    note: {
      en: 'A saturated, velvety blue that becomes almost violet under candle light.',
      th: 'สีฟ้านุ่มลึก แตะเฉดม่วงใต้แสงเทียน',
      zh: '饱满如丝绒的湛蓝 — 烛光下几近紫罗兰。',
    },
    bg: '#15294d',
    fg: 'ivory',
    sheen:
      'radial-gradient(closest-side at 70% 35%, rgba(150,180,255,0.32) 0%, rgba(150,180,255,0) 60%)',
  },
  {
    name: { en: 'Paraiba Tourmaline', th: 'พาราอิบาทัวมาลีน', zh: '帕拉伊巴碧玺' },
    origin: { en: 'Brazil · Original mines', th: 'บราซิล · เหมืองดั้งเดิม', zh: '巴西 · 原矿' },
    note: {
      en: 'Cuprian neon — a glow no other gemstone produces.',
      th: 'นีออนทองแดง — ประกายที่ไม่มีอัญมณีใดเปรียบ',
      zh: '含铜霓虹光 — 独一无二的天然光辉。',
    },
    bg: '#0d9aa0',
    fg: 'ivory',
    sheen:
      'radial-gradient(closest-side at 30% 35%, rgba(180,255,250,0.40) 0%, rgba(180,255,250,0) 60%)',
  },
  {
    name: { en: 'Tsavorite Garnet', th: 'ซาโวไรต์การ์เนต', zh: '沙弗莱石榴石' },
    origin: { en: 'Tanzania · Tsavo', th: 'แทนซาเนีย · ซาโว', zh: '坦桑尼亚 · 察沃' },
    note: {
      en: 'Vivid green with extraordinary brilliance and no enhancement.',
      th: 'เขียวสดใส ประกายสูงโดยไม่ผ่านการปรุงแต่ง',
      zh: '鲜艳翠绿，火彩极佳，自然未优化。',
    },
    bg: '#1d633c',
    fg: 'ivory',
    sheen:
      'radial-gradient(closest-side at 65% 30%, rgba(190,255,200,0.32) 0%, rgba(190,255,200,0) 60%)',
  },
  {
    name: { en: 'Fancy Diamonds', th: 'เพชรหลากสี', zh: '彩钻' },
    origin: { en: 'Yellow · Brown · Black', th: 'เหลือง · น้ำตาล · ดำ', zh: '黄 · 棕 · 黑' },
    note: {
      en: 'Naturally tinted brilliants — the rarest of the rare.',
      th: 'เพชรเจียระไนสีจากธรรมชาติ — หายากที่สุดในบรรดาทั้งหมด',
      zh: '天然彩钻 — 珍稀中的极致。',
    },
    bg: '#3b2f1c',
    fg: 'ivory',
    sheen:
      'radial-gradient(closest-side at 50% 30%, rgba(216,190,126,0.45) 0%, rgba(216,190,126,0) 60%)',
  },
];

export default function StonesOfNote() {
  const { locale } = useLocale();

  return (
    <section className="bg-ivory pt-32 lg:pt-40 pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 mb-12 lg:mb-16">
        <div className="grid lg:grid-cols-[auto_1fr_auto] items-end gap-8">
          <div>
            <p className="eyebrow text-gold-deep">IV &nbsp;·&nbsp; Stones of note</p>
            <h2
              className="display leading-[0.98] mt-4"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}
              lang={locale}
            >
              {locale === 'th' ? (
                <>
                  อัญมณีที่เรา<span className="display-italic text-gold"> หลงรัก</span>
                </>
              ) : locale === 'zh' ? (
                <>
                  我们<span className="display-italic text-gold">钟爱</span>之石
                </>
              ) : (
                <>
                  The stones we
                  <span className="display-italic text-gold"> love.</span>
                </>
              )}
            </h2>
          </div>
          <span className="hidden lg:block h-px bg-gold/40 self-end" />
          <p className="font-sans text-[12px] uppercase tracking-[0.28em] text-gold-deep tabular-nums self-end">
            005 / Rarities
          </p>
        </div>
      </div>

      {/* The colour band */}
      <div className="overflow-x-auto lg:overflow-visible scrollbar-none">
        <ul
          className="grid grid-flow-col auto-cols-[78%] sm:auto-cols-[42%] lg:grid-flow-row lg:grid-cols-5 lg:auto-cols-auto gap-3 lg:gap-5 px-6 lg:px-10 mx-auto max-w-[1480px]"
        >
          {STONES.map((s, i) => (
            <motion.li
              key={s.bg}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative aspect-[3/4.4] overflow-hidden group"
              style={{ backgroundColor: s.bg }}
            >
              {/* Sheen */}
              {s.sheen && (
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: s.sheen }}
                />
              )}
              {/* Paper grain for depth */}
              <span
                className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
                }}
              />
              {/* Gold corner hairlines */}
              <span
                className="absolute pointer-events-none"
                style={{ top: 14, left: 14, width: 22, height: 22, borderTop: '1px solid rgba(216,190,126,0.6)', borderLeft: '1px solid rgba(216,190,126,0.6)' }}
              />
              <span
                className="absolute pointer-events-none"
                style={{ bottom: 14, right: 14, width: 22, height: 22, borderBottom: '1px solid rgba(216,190,126,0.6)', borderRight: '1px solid rgba(216,190,126,0.6)' }}
              />

              <div
                className={`relative h-full flex flex-col justify-between p-6 lg:p-8 ${
                  s.fg === 'ivory' ? 'text-ivory' : 'text-charcoal'
                }`}
              >
                <div>
                  <p
                    className={`font-sans text-[10px] uppercase tracking-[0.42em] tabular-nums ${
                      s.fg === 'ivory' ? 'text-gold-light/85' : 'text-gold-deep'
                    }`}
                  >
                    No. {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className="display mt-4 leading-[1.05]"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 34px)' }}
                    lang={locale}
                  >
                    {s.name[locale]}
                  </h3>
                  <span
                    className={`block w-8 h-px mt-3 ${
                      s.fg === 'ivory' ? 'bg-gold-light/80' : 'bg-gold'
                    }`}
                  />
                  <p
                    className={`font-sans text-[10.5px] uppercase tracking-[0.32em] mt-3 ${
                      s.fg === 'ivory' ? 'text-ivory/75' : 'text-charcoal/65'
                    }`}
                    lang={locale}
                  >
                    {s.origin[locale]}
                  </p>
                </div>
                <p
                  className={`font-sans text-[12.5px] tracking-[0.02em] leading-[1.7] mt-6 ${
                    s.fg === 'ivory' ? 'text-ivory/90' : 'text-charcoal/85'
                  }`}
                  lang={locale}
                >
                  {s.note[locale]}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
