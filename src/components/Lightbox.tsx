'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useT } from './LanguageProvider';
import { flattenItem } from '@/lib/i18n';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import type { LocalizedGalleryItem } from '@/lib/sanityAdapter';

interface LightboxProps {
  item: LocalizedGalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Modal lightbox shown when a gallery tile is clicked.
 *
 * UX guarantees:
 *  - **Easy close**: visible ≥44px ✕ button top-right, ESC key, click on the
 *    dark backdrop (anywhere outside the image / caption / controls), and a
 *    swipe-down gesture on touch devices all close the modal.
 *  - **Background lock**: the page underneath does NOT scroll while the
 *    lightbox is open. iOS rubber-band is prevented via the position:fixed
 *    trick inside `useLockBodyScroll`. Scroll position is restored on
 *    close.
 *  - **Focus management**: focus moves to the ✕ button on open and returns
 *    to the previously-focused element on close.
 */
export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  const { locale } = useLocale();
  const t = useT();

  // Lock body scroll for as long as we have an item to display.
  useLockBodyScroll(item !== null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Swipe-down to close — captures the start Y of a one-finger touch and,
  // on touchend, closes if the user moved down >70px in <500ms.
  const touchStartRef = useRef<{ y: number; t: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = { y: e.touches[0].clientY, t: Date.now() };
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const endY = e.changedTouches[0]?.clientY ?? start.y;
    const dy = endY - start.y;
    const dt = Date.now() - start.t;
    if (dy > 70 && dt < 600) onClose();
  }, [onClose]);

  // Keyboard: Esc to close, arrows for prev/next.
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    },
    [item, onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (!item) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onKey]);

  // Focus management: remember who triggered the open, move focus to the
  // close button, and restore focus on close.
  useEffect(() => {
    if (!item) return;
    previouslyFocusedRef.current = (document.activeElement as HTMLElement) || null;
    // setTimeout lets the dialog mount + animate in before we steal focus.
    const id = window.setTimeout(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 80);
    return () => {
      window.clearTimeout(id);
      previouslyFocusedRef.current?.focus?.({ preventScroll: true });
    };
  }, [item]);

  const flat = item ? flattenItem(item, locale) : null;
  const displayName = flat ? (flat.name || flat.description) : '';
  const showSeparate = Boolean(flat?.name && flat?.description);

  return (
    <AnimatePresence>
      {item && flat && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={displayName || t('lb.close')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6 lg:p-12"
          // Backdrop click closes. The inner panel below stops propagation so
          // clicks on the image/caption don't bubble here.
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Prominent close — fixed to viewport corner so it never escapes
              the user's eye. 48px tap target, high-contrast cream-on-dark. */}
          <button
            ref={closeBtnRef}
            type="button"
            aria-label={t('lb.close')}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-charcoal/70 border border-gold-light/60 text-ivory hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300"
            style={{ boxShadow: '0 8px 28px -12px rgba(0,0,0,0.6)' }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6 L18 18" />
              <path d="M18 6 L6 18" />
            </svg>
          </button>

          {/* Inner panel — clicks here MUST NOT bubble to the backdrop */}
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
                <p className="font-sans italic text-[15.5px] text-ivory/95 mt-5 leading-relaxed">
                  {flat.description}
                </p>
              )}
              <hr className="border-0 h-px bg-gold-light/40 w-20 mt-7" />
              {item.categories && item.categories.length > 0 && (
                <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.32em] text-gold-light">
                  {item.categories.join(' · ')}
                </p>
              )}
            </div>
          </motion.div>

          {onPrev && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label={t('lb.prev')}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 text-ivory hover:text-gold-light text-3xl"
            >
              ←
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label={t('lb.next')}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 text-ivory hover:text-gold-light text-3xl"
            >
              →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
