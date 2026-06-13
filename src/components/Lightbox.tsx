'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { GalleryItem } from '@/lib/gallery-manifest';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Modal lightbox shown when a tile is clicked. Reads from the GalleryItem
 * manifest shape — name + description + alt.
 */
export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
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

  const displayName = item?.name ?? item?.description ?? '';
  const showSeparate = Boolean(item?.name && item?.description);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label={item.alt}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative max-w-6xl w-full grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* image */}
            <div className="relative aspect-square w-full overflow-hidden bg-charcoal">
              {item.src && (
                <Image
                  src={`/images/gallery/${item.src}`}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 60vw"
                  priority
                  className="object-cover"
                />
              )}
            </div>

            {/* caption */}
            <div className="text-ivory">
              {item.categories && item.categories.length > 0 && (
                <p className="font-sans text-[10.5px] uppercase tracking-[0.42em] text-gold-light">
                  {item.categories.join(' · ')}
                </p>
              )}
              <h2
                className="display leading-[1.05] mt-4"
                style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}
              >
                {displayName}
              </h2>
              {showSeparate && (
                <p className="font-sans italic text-[15.5px] text-ivory/85 mt-6 leading-[1.7] max-w-[42ch]">
                  {item.description}
                </p>
              )}
              <hr className="mt-8 border-0 h-px bg-gold-light/40 w-24" />
              <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-light/80">
                Signed CLEAR 1993 · Bangkok
              </p>
            </div>

            {/* close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-2 -right-2 lg:-top-6 lg:-right-6 w-10 h-10 flex items-center justify-center text-ivory hover:text-gold-light transition-colors duration-300 text-2xl leading-none"
            >
              ×
            </button>

            {/* prev/next */}
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous"
                className="hidden md:flex absolute left-[-3rem] top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-ivory/70 hover:text-gold-light transition-colors duration-300 text-2xl"
              >
                ‹
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                aria-label="Next"
                className="hidden md:flex absolute right-[-3rem] top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-ivory/70 hover:text-gold-light transition-colors duration-300 text-2xl"
              >
                ›
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
