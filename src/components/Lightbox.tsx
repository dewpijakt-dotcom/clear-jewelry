'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from './LanguageProvider';
import { flattenItem } from '@/lib/i18n';
import type { LocalizedGalleryItem } from '@/lib/sanityAdapter';

interface LightboxProps {
  item: LocalizedGalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Modal lightbox shown when a tile is clicked. Reads from
 * LocalizedGalleryItem and resolves name/alt/description through
 * the current locale.
 */
export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  const { locale } = useLocale();
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [item, onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  const flat = item ? flattenItem(item, locale) : null;
  const displayName = flat ? (flat.name || flat.description) : '';
  const showSeparate = Boolean(flat?.name && flat?.description);

  return (
    <AnimatePresence>
      {item && flat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6 lg:p-12"
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-6 right-6 text-ivory text-[11px] uppercase tracking-[0.28em] p-2 hover:text-gold-light transition-colors"
          >
            Close ✕
          </button>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-[1100px] w-full grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-charcoal overflow-hidden">
              {item.src && (
                <Image
                  src={item.src.startsWith('http') ? item.src : `/images/gallery/${item.src}`}
                  alt={flat.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              )}
            </div>

            <div className="text-ivory">
              <p className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-light">
                CLEAR 1993
              </p>
              <h2 className="display text-3xl lg:text-4xl leading-snug mt-3">
                {displayName}
              </h2>
              {showSeparate && (
                <p className="font-sans italic text-[14.5px] text-ivory/85 mt-5 leading-relaxed">
                  {flat.description}
                </p>
              )}
              <hr className="border-0 h-px bg-gold-light/40 w-20 mt-7" />
              {item.categories && item.categories.length > 0 && (
                <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-deep">
                  {item.categories.join(' · ')}
                </p>
              )}
            </div>
          </motion.div>

          {onPrev && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous"
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-ivory hover:text-gold-light text-3xl p-3"
            >
              ←
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next"
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-ivory hover:text-gold-light text-3xl p-3"
            >
              →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
