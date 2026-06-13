'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import PieceTile from './PieceTile';
import Lightbox from './Lightbox';
import type { GalleryItem } from '@/lib/gallery-manifest';

type Category = { id: string; title: string; slug: string };

interface GalleryClientProps {
  pieces: GalleryItem[];
  categories: Category[];
}

export default function GalleryClient({ pieces, categories }: GalleryClientProps) {
  const [filter, setFilter] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Filter pieces by category slug
  const filtered = useMemo<GalleryItem[]>(() => {
    if (filter === 'all') return pieces;
    return pieces.filter((p) => (p.categories ?? []).some((c) => String(c) === filter));
  }, [pieces, filter]);

  const tabs: Category[] = [{ id: 'all', title: 'All', slug: 'all' }, ...categories];

  return (
    <>
      {/* Category tab strip — Jost uppercase, gold underline on active, hairline rule below */}
      <section className="bg-ivory border-b border-[var(--rule-soft)] sticky top-[82px] z-30 backdrop-blur-md bg-ivory/90">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between gap-6 mb-3 text-[10px] uppercase tracking-[0.48em] text-gold-deep">
            <span>On View</span>
            <span className="tabular-nums">
              {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
            </span>
          </div>
          <div className="flex items-center gap-1 min-w-max overflow-x-auto scrollbar-none -mx-1 px-1">
            {tabs.map((tab) => {
              const active = tab.slug === filter;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setFilter(tab.slug); setActiveIndex(null); }}
                  className={clsx(
                    'relative px-4 lg:px-5 py-2.5 font-sans text-[11.5px] uppercase tracking-[0.32em] transition-colors duration-500',
                    active ? 'text-charcoal' : 'text-charcoal/55 hover:text-charcoal',
                  )}
                >
                  {tab.title}
                  {active && (
                    <motion.span
                      layoutId="gallery-tab-underline"
                      className="absolute left-3 right-3 -bottom-[1px] h-[1px] bg-gold"
                      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tile wall — dense uniform square */}
      <section className="bg-ivory py-12 lg:py-20">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px] md:gap-1"
            >
              {filtered.map((item, i) => (
                <PieceTile key={item.id ?? i} item={item} onClick={() => setActiveIndex(i)} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="text-center font-sans text-[14px] text-charcoal/55 py-24">
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
