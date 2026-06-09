'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FILTER_TABS, GALLERY, GalleryItem } from '@/lib/gallery-manifest';
import PieceTile from './PieceTile';
import Lightbox from './Lightbox';
import clsx from 'clsx';

/**
 * Filterable masonry gallery. Tabs along the top filter by category;
 * the grid morphs smoothly. Click any tile to open the lightbox.
 */
export default function GalleryClient() {
  const [filter, setFilter] = useState<(typeof FILTER_TABS)[number]['id']>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(() => {
    if (filter === 'all') return GALLERY;
    return GALLERY.filter((it) => it.categories.includes(filter));
  }, [filter]);

  return (
    <>
      {/* Filter tabs */}
      <section className="bg-ivory border-y border-[var(--rule-soft)] sticky top-[78px] z-30 backdrop-blur">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-5 overflow-x-auto">
          <div className="flex items-center gap-2 lg:gap-1 min-w-max">
            {FILTER_TABS.map((tab) => {
              const active = tab.id === filter;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={clsx(
                    'px-4 lg:px-5 py-2.5 font-sans text-[11.5px] uppercase tracking-[0.28em] transition-all duration-500 ease-elegant border',
                    active
                      ? 'border-charcoal bg-charcoal text-ivory'
                      : 'border-transparent text-charcoal/65 hover:text-charcoal hover:border-[var(--rule)]',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 0.61, 0.36, 1] }}
                  className={clsx(
                    // Asymmetric placement: every third tile spans extra for rhythm.
                    item.aspect === 'wide' && 'lg:col-span-2',
                  )}
                >
                  <PieceTile item={item} onClick={() => setActiveIndex(i)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {items.length === 0 && (
            <p className="text-center font-sans text-[14px] text-charcoal/60 py-20">
              No pieces in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <Lightbox
        item={activeIndex !== null ? items[activeIndex] : null}
        onClose={() => setActiveIndex(null)}
        onPrev={
          activeIndex !== null && activeIndex > 0
            ? () => setActiveIndex(activeIndex - 1)
            : undefined
        }
        onNext={
          activeIndex !== null && activeIndex < items.length - 1
            ? () => setActiveIndex(activeIndex + 1)
            : undefined
        }
      />
    </>
  );
}
