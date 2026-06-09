'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/gallery-manifest';
import Wordmark from './Wordmark';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Refined lightbox. Esc closes; arrow keys page; click outside closes.
 * Image scales up gently; caption sits in a narrow gold-rule frame below.
 */
export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] lightbox-backdrop flex items-center justify-center p-6 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 lg:top-10 lg:right-10 text-ivory hover:text-gold-light transition-colors text-[11px] tracking-[0.28em] uppercase"
          >
            Close ✕
          </button>

          {onPrev && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 text-ivory hover:text-gold-light text-3xl"
            >
              ←
            </button>
          )}
          {onNext && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 text-ivory hover:text-gold-light text-3xl"
            >
              →
            </button>
          )}

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[1100px] w-full"
          >
            <div className="relative aspect-[4/5] md:aspect-[5/4] bg-charcoal overflow-hidden">
              {item.src ? (
                <Image
                  src={`/images/gallery/${item.src}`}
                  alt={item.name}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-12 border border-[var(--rule-invert)] pointer-events-none" />
                  <Wordmark size="xl" variant="light" className="opacity-60" />
                </div>
              )}
            </div>

            <div className="mt-6 text-center text-ivory">
              <p className="eyebrow text-gold-light">{item.categories.join(' · ')}</p>
              <h2 className="display text-3xl md:text-4xl mt-2">{item.name}</h2>
              {item.spec && (
                <p className="font-sans text-[13px] tracking-[0.04em] text-ivory/80 mt-3 max-w-xl mx-auto">
                  {item.spec}
                </p>
              )}
              <hr className="gold-rule mx-auto mt-6" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
