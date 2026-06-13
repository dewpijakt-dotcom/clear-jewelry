'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import Lightbox from './Lightbox';
import type { GalleryItem } from '@/lib/gallery-manifest';

type Category = { id: string; title: string; slug: string };

interface GalleryClientProps {
  pieces: GalleryItem[];
  categories: Category[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Refined editorial gallery — salon hero piece, mixed-aspect mosaic,
 * gold hairline frame on hover, soft lift, lot-number annotations,
 * pull-quote breakers every 9 tiles. Sanity-fed (graceful fallback).
 */
export default function GalleryClient({ pieces, categories }: GalleryClientProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo<GalleryItem[]>(() => {
    if (filter === 'all') return pieces;
    return pieces.filter((p) => (p.categories ?? []).some((c) => String(c) === filter));
  }, [pieces, filter]);

  const tabs: Category[] = [{ id: 'all', title: 'All', slug: 'all' }, ...categories];
  const salon = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* Category tab strip */}
      <section className="bg-ivory border-b border-[var(--rule-soft)] sticky top-[82px] z-30 backdrop-blur-md bg-ivory/90">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between gap-6 mb-4 text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
            <span>On View</span>
            <span className="tabular-nums">
              {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
            </span>
          </div>
          <div className="flex items-center gap-2 min-w-max overflow-x-auto scrollbar-none -mx-1 px-1">
            {tabs.map((tab) => {
              const active = tab.slug === filter;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setFilter(tab.slug); setActiveIndex(null); }}
                  className={clsx(
                    'relative px-5 lg:px-6 py-3 font-sans text-[11.5px] uppercase tracking-[0.38em] transition-colors duration-500',
                    active ? 'text-charcoal' : 'text-charcoal/55 hover:text-charcoal',
                  )}
                >
                  {tab.title}
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
      {salon && (
        <section className="bg-ivory pt-16 lg:pt-24 pb-12">
          <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 items-center">
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className="group relative block w-full aspect-square overflow-hidden bg-charcoal"
                aria-label={salon.alt}
              >
                <RemoteOrLocalImage item={salon} priority sizes="(max-width: 1024px) 100vw, 56vw" />
                {/* gold corner brackets */}
                <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ top: 18, left: 18, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
                <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ top: 18, right: 18, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />
                <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ bottom: 18, left: 18, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
                <span className="absolute pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100" style={{ bottom: 18, right: 18, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />
              </button>

              <div>
                <p className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep">
                  Lot {pad(1)} &nbsp;·&nbsp; The opening piece
                </p>
                <h2
                  className="display leading-[1.02] mt-5 text-charcoal"
                  style={{ fontSize: 'clamp(34px, 4.8vw, 64px)' }}
                >
                  {salon.name ?? salon.description}
                </h2>
                {salon.description && salon.name && (
                  <p className="font-sans italic text-[15px] text-charcoal/75 mt-6 leading-[1.85] max-w-[44ch]">
                    {salon.description}
                  </p>
                )}
                <hr className="border-0 h-px bg-gold-light/50 w-24 mt-8" />
                <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep">
                  Signed CLEAR 1993 &nbsp;·&nbsp; Bangkok
                </p>
                <button
                  type="button"
                  onClick={() => setActiveIndex(0)}
                  className="mt-10 inline-flex items-center gap-3 font-sans text-[11.5px] uppercase tracking-[0.34em] text-charcoal hover:text-gold-deep transition-colors duration-500 border-b border-charcoal/40 pb-1.5"
                >
                  View detail <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Editorial divider */}
      {salon && (
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-2 mb-2">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.48em] text-gold-deep/70">
            <span className="block h-px flex-1 bg-gold-light/40" />
            <span>The catalogue</span>
            <span className="block h-px flex-1 bg-gold-light/40" />
          </div>
        </div>
      )}

      {/* MOSAIC GRID — mixed aspect (mostly square, accent portrait), generous gaps */}
      <section className="bg-ivory pb-24 lg:pb-32 pt-8">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
            >
              {rest.map((item, i) => {
                const original = i + 2; // 1-indexed, +1 for salon piece
                // Pull-quote breaker every 9 tiles (skip first row)
                const isBreaker = i > 0 && i % 9 === 0;
                const aspect = item.aspect ?? 'square';
                return (
                  <PieceCard
                    key={item.id ?? i}
                    item={item}
                    lotNumber={pad(original)}
                    aspect={aspect}
                    isBreaker={isBreaker}
                    onClick={() => setActiveIndex(i + 1)}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center font-sans italic text-[15px] text-charcoal/55 py-24">
              No pieces in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <Lightbox
        item={activeIndex !== null ? filtered[activeIndex] : null}
        onClose={() => setActiveIndex(null)}
        onPrev={activeIndex !== null && activeIndex > 0 ? () => setActiveIndex(activeIndex - 1) : undefined}
        onNext={activeIndex !== null && activeIndex < filtered.length - 1 ? () => setActiveIndex(activeIndex + 1) : undefined}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
 *  Tile — gold hairline frame on hover, soft lift, lot caption
 * ───────────────────────────────────────────────────────────────── */
function PieceCard({
  item,
  lotNumber,
  aspect,
  isBreaker,
  onClick,
}: {
  item: GalleryItem;
  lotNumber: string;
  aspect: 'portrait' | 'square' | 'wide';
  isBreaker: boolean;
  onClick: () => void;
}) {
  const [hover, setHover] = useState(false);
  const aspectClass =
    aspect === 'portrait' ? 'aspect-[4/5]'
    : aspect === 'wide'   ? 'aspect-[5/4]'
    : 'aspect-square';

  return (
    <div className={clsx('group flex flex-col', isBreaker && 'lg:col-span-2 lg:row-span-1')}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={clsx(
          'relative block w-full overflow-hidden bg-charcoal text-left',
          aspectClass,
          'transition-transform duration-700 ease-elegant',
          hover && 'lg:-translate-y-[3px]',
        )}
        style={{
          boxShadow: hover ? '0 18px 38px -22px rgba(21, 19, 15, 0.45)' : '0 0 0 rgba(0,0,0,0)',
          transition: 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 700ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
        aria-label={item.alt}
      >
        <RemoteOrLocalImage item={item} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" />

        {/* gold hairline museum-mat frame on hover */}
        <div
          className={clsx(
            'absolute pointer-events-none transition-all duration-700 ease-elegant',
            hover ? 'inset-[10px] opacity-100' : 'inset-0 opacity-0',
          )}
          style={{ border: '1px solid rgba(216, 190, 126, 0.7)' }}
        />

        {/* gentle vertical-only veil for caption pool */}
        <div
          className={clsx(
            'absolute inset-0 pointer-events-none transition-opacity duration-700',
            hover ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            background: 'linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0) 50%, rgba(10,9,8,0.75) 100%)',
          }}
        />

        {/* hover caption */}
        <div
          className={clsx(
            'absolute bottom-0 left-0 right-0 p-5 lg:p-6',
            'transition-all duration-700 ease-elegant pointer-events-none',
            hover ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold-light">
            Lot {lotNumber}
          </p>
          <h3 className="display italic text-ivory text-lg lg:text-xl mt-1.5 leading-snug">
            {item.name ?? item.description}
          </h3>
        </div>
      </button>

      {/* permanent caption below tile — Sotheby's catalogue rhythm */}
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="font-sans italic text-[12.5px] text-charcoal/75 leading-snug line-clamp-2 max-w-[28ch]">
          {item.name ?? item.description}
        </p>
        <p className="font-sans text-[9.5px] uppercase tracking-[0.42em] text-gold-deep/80 tabular-nums shrink-0">
          Lot {lotNumber}
        </p>
      </div>
    </div>
  );
}

/* Image that handles both Sanity CDN URLs and local /images/gallery/ filenames */
function RemoteOrLocalImage({
  item,
  priority,
  sizes,
}: {
  item: GalleryItem;
  priority?: boolean;
  sizes: string;
}) {
  if (!item.src) return null;
  const url = item.src.startsWith('http') ? item.src : `/images/gallery/${item.src}`;
  return (
    <Image
      src={url}
      alt={item.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover transition-transform duration-[1800ms] ease-elegant group-hover:scale-[1.04]"
    />
  );
}
