'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SanityImg from './SanityImg';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });
import { useLocale, useT } from './LanguageProvider';
import { flattenItem, pickLocalized, Locale, Localized } from '@/lib/i18n';
import type { LocalizedGalleryItem } from '@/lib/sanityAdapter';

type Category = { id: string; title: Localized; slug: string };

interface GalleryClientProps {
  pieces: LocalizedGalleryItem[];
  categories: Category[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Refined editorial gallery — salon hero piece, mixed-aspect mosaic,
 * gold hairline frame on hover, soft lift, lot-number annotations.
 * Names + descriptions flip locale via useLocale().
 */
export default function GalleryClient({ pieces, categories }: GalleryClientProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { locale } = useLocale();
  const t = useT();

  const filtered = useMemo<LocalizedGalleryItem[]>(() => {
    if (filter === 'all') return pieces;
    return pieces.filter((p) => (p.categories ?? []).some((c) => c === filter));
  }, [pieces, filter]);

  const tabs: Category[] = [
    { id: 'all', title: { en: 'All', th: 'ทั้งหมด', zh: '全部' }, slug: 'all' },
    ...categories,
  ];
  const salon = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* Category tab strip */}
      <section className="bg-ivory border-b border-[var(--rule-soft)] sticky top-[82px] z-30">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between gap-6 mb-4 text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
            <span>{t('gal.on_view')}</span>
            <span className="tabular-nums">
              {(filtered.length === 1 ? t('gal.count.work') : t('gal.count.works')).replace('{n}', String(filtered.length))}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-6 px-6 lg:-mx-1 lg:px-1 snap-x snap-mandatory">
            {tabs.map((tab) => {
              const active = tab.slug === filter;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setFilter(tab.slug); setActiveIndex(null); }}
                  className={clsx(
                    'relative px-4 lg:px-6 py-3 font-sans text-[11.5px] uppercase tracking-[0.38em] transition-colors duration-500 shrink-0 snap-start',
                    active ? 'text-charcoal' : 'text-charcoal/55 hover:text-charcoal',
                  )}
                >
                  {pickLocalized(tab.title, locale)}
                  {active && (
                    <motion.span
                      layoutId="gallery-tab-underline"
                      className="absolute left-4 right-4 -bottom-[1px] h-[1px] bg-gold"
                      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SALON CENTREPIECE — the first piece, large editorial frame */}
      {salon && (() => {
        const salonFlat = flattenItem(salon, locale);
        return (
          <section className="bg-ivory pt-16 lg:pt-24 pb-12">
            <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 items-center">
                <button
                  type="button"
                  onClick={() => setActiveIndex(0)}
                  className="group relative block w-full aspect-square overflow-hidden bg-charcoal"
                  aria-label={salonFlat.alt}
                >
                  <RemoteOrLocalImage src={salon.src} imageSource={salon.imageSource} alt={salonFlat.alt} priority blurDataURL={salon.blurDataURL} sizes="(max-width: 1024px) 100vw, 56vw" />
                  <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ top: 18, left: 18, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
                  <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ top: 18, right: 18, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />
                  <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ bottom: 18, left: 18, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
                  <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ bottom: 18, right: 18, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />
                </button>

                <div>
                  <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
                    {t('gal.salon.lot')} {pad(1)}  ·  {t('gal.salon.opening')}
                  </p>
                  <h2
                    className="display leading-[1.02] mt-5 text-charcoal"
                    style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
                  >
                    {salonFlat.name || salonFlat.description}
                  </h2>
                  {salonFlat.description && salonFlat.name && (
                    <p className="font-sans italic text-[15px] text-charcoal/75 mt-6 leading-[1.85] max-w-[44ch]">
                      {salonFlat.description}
                    </p>
                  )}
                  <hr className="border-0 h-px bg-gold-light/50 w-24 mt-8" />
                  <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep">
                    {t('gal.salon.signed')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(0)}
                    className="mt-10 inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5"
                  >
                    {t('gal.salon.view')} <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Editorial divider */}
      {salon && (
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-2 mb-2">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.48em] text-gold-deep/70">
            <span className="block h-px flex-1 bg-gold-light/40" />
            <span>{t('gal.catalogue')}</span>
            <span className="block h-px flex-1 bg-gold-light/40" />
          </div>
        </div>
      )}

      {/* MOSAIC GRID */}
      <section className="bg-ivory pb-24 lg:pb-32 pt-8">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <div
            key={filter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 [grid-auto-flow:dense]"
          >
            {rest.map((item, i) => {
              const original = i + 2;
              const isAboveFold = i < 4;
              const aspect = item.aspect ?? 'square';
              return (
                <PieceCard
                  key={item.id ?? i}
                  item={item}
                  locale={locale}
                  lotNumber={pad(original)}
                  aspect={aspect}
                  priority={isAboveFold}
                  onClick={() => setActiveIndex(i + 1)}
                />
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-sans italic text-[15px] text-charcoal/55 py-24">
              {t('gal.empty')}
            </p>
          )}
        </div>
      </section>

      <Lightbox
        item={activeIndex !== null ? filtered[activeIndex] : null}
        onClose={() => setActiveIndex(null)}
        onPrev={activeIndex !== null && activeIndex > 0 ? () => setActiveIndex(activeIndex - 1) : undefined}
        onNext={activeIndex !== null && activeIndex < filtered.length - 1 ? () => setActiveIndex(activeIndex + 1) : undefined}
        prevItem={activeIndex !== null && activeIndex > 0 ? filtered[activeIndex - 1] : null}
        nextItem={activeIndex !== null && activeIndex < filtered.length - 1 ? filtered[activeIndex + 1] : null}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Tile
 * ───────────────────────────────────────────────────────────────── */
function PieceCard({
  item,
  locale,
  lotNumber,
  aspect,
  onClick,
  priority,
}: {
  item: LocalizedGalleryItem;
  locale: Locale;
  lotNumber: string;
  aspect: 'portrait' | 'square' | 'wide';
  onClick: () => void;
  priority?: boolean;
}) {
  // CSS-only hover — a previous useState('hover') + onMouseEnter/Leave
  // version caused the gallery to flicker during smooth scroll. As the
  // cursor crossed tiles, every tile re-rendered and ran a 700ms
  // transform + box-shadow transition, so the wall visibly twitched as
  // the page moved past the pointer. group-hover keeps all the work on
  // the compositor with zero React re-renders. contain:paint isolates
  // each tile's repaint region so a neighbour's hover can't bleed.
  const aspectClass = 'aspect-square';
  const flat = flattenItem(item, locale);
  const display = flat.name || flat.description;

  return (
    <div className="group flex flex-col" style={{ contain: 'paint' }}>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'relative block w-full overflow-hidden bg-charcoal text-left',
          aspectClass,
          'transition-[transform,box-shadow] duration-700 ease-elegant',
          'shadow-[0_0_0_rgba(0,0,0,0)] lg:group-hover:-translate-y-[3px] group-hover:shadow-[0_18px_38px_-22px_rgba(21,19,15,0.45)]',
        )}
        aria-label={flat.alt}
      >
        <RemoteOrLocalImage src={item.src} imageSource={item.imageSource} alt={flat.alt} priority={priority} blurDataURL={item.blurDataURL} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" />

        <div
          className="absolute pointer-events-none transition-all duration-700 ease-elegant inset-0 opacity-0 group-hover:inset-[10px] group-hover:opacity-100"
          style={{ border: '1px solid rgba(216, 190, 126, 0.7)' }}
        />

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0) 50%, rgba(10,9,8,0.75) 100%)',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 transition-all duration-700 ease-elegant pointer-events-none translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold-light">
            Lot {lotNumber}
          </p>
          <h3 className="display italic text-ivory text-lg lg:text-xl mt-1.5 leading-snug">
            {display}
          </h3>
        </div>
      </button>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="font-sans italic text-[12.5px] text-charcoal/75 leading-snug line-clamp-2 max-w-[28ch]">
          {display}
        </p>
        <p className="font-sans text-[9.5px] uppercase tracking-[0.42em] text-gold-deep/80 tabular-nums shrink-0">
          Lot {lotNumber}
        </p>
      </div>
    </div>
  );
}

/* Image that handles both Sanity CDN URLs and local /images/gallery/ filenames.
 *
 * For Sanity-hosted images (URLs starting with http or the raw image source
 * object), it renders SanityImg which produces a srcset bound directly to
 * cdn.sanity.io — no /_next/image proxy hop. For local manifest fallback
 * filenames it renders a native <img> with the same shape.
 */
function RemoteOrLocalImage({
  src,
  imageSource,
  alt,
  priority,
  sizes,
  blurDataURL,
}: {
  src: string | undefined;
  imageSource?: any;
  alt: string;
  priority?: boolean;
  sizes: string;
  blurDataURL?: string;
}) {
  if (!src && !imageSource) return null;
  if (imageSource || (src && src.startsWith('http'))) {
    return (
      <SanityImg
        source={imageSource ?? src!}
        alt={alt}
        sizes={sizes}
        priority={priority}
        blurDataURL={blurDataURL}
        className="object-cover transition-transform duration-[1800ms] ease-elegant group-hover:scale-[1.04]"
      />
    );
  }
  // Legacy manifest fallback — /public/images/gallery/<file>.jpg
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={`/images/gallery/${src}`}
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      className="transition-transform duration-[1800ms] ease-elegant group-hover:scale-[1.04]"
    />
  );
}
