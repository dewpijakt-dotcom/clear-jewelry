'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SanityImg from './SanityImg';
import { useLocale, useT } from './LanguageProvider';
import { flattenItem } from '@/lib/i18n';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import type { LocalizedGalleryItem } from '@/lib/sanityAdapter';

interface LightboxProps {
  item: LocalizedGalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Optional adjacent items for proactive preload — eliminates the
   * text-leads-image lag on next/prev. */
  prevItem?: LocalizedGalleryItem | null;
  nextItem?: LocalizedGalleryItem | null;
}

/**
 * Gallery lightbox — luxury CSS-keyframe transitions.
 *
 * UX guarantees:
 *  - **Easy close**: ✕ top-right (≥48px), Esc key, backdrop click,
 *    swipe-down (>70px in <600ms). Focus moves to ✕ on open and back to
 *    the trigger on close.
 *  - **Background lock**: useLockBodyScroll handles iOS-safe scroll lock.
 *  - **Reliable mount/unmount**: no framer-motion AnimatePresence around
 *    the outer dialog — earlier iterations stalled at opacity 0 on entry
 *    and never unmounted on exit. The dialog mounts/unmounts by simple
 *    conditional rendering. Entry uses CSS keyframes with
 *    `animation-fill-mode: forwards` so the final visible state sticks
 *    even if onAnimationEnd never fires.
 *
 * Close-with-animation pattern:
 *  - User triggers close → `closing` state flips true → exit-out CSS
 *    classes apply (320ms backdrop fade, 280ms image fade-down,
 *    240ms caption fade).
 *  - A setTimeout fires `onClose()` after CLOSE_MS (340ms — exit anim +
 *    20ms safety) — does NOT depend on onAnimationEnd. The component
 *    unmounts cleanly via the parent setting `item = null`.
 *  - Even if the user spam-clicks close, the timer is idempotent and
 *    the parent state guarantees a single unmount.
 *
 * Easing: cubic-bezier(0.16, 1, 0.3, 1) — slow-out editorial curve.
 * Quick start, long graceful settle. Defined per-class in globals.css.
 *
 * prefers-reduced-motion: all .lb-* animations snap (handled in CSS).
 */

const CLOSE_MS = 340;

function resolveSrc(src?: string) {
  if (!src) return '';
  return src.startsWith('http') ? src : `/images/gallery/${src}`;
}

export default function Lightbox({ item, onClose, onPrev, onNext, prevItem, nextItem }: LightboxProps) {
  const { locale } = useLocale();
  const t = useT();

  useLockBodyScroll(item !== null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const navLockRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

  // Closing state — drives the exit animation. We don't unmount the
  // component synchronously when the user clicks close; we play the
  // exit animation first.
  const [closing, setClosing] = useState(false);

  // imageLoaded flips true when the active piece's image has finished
  // loading. Used to drive the thin progress hairline.
  const [imageLoaded, setImageLoaded] = useState(false);

  // Whenever a new item is shown (open OR navigate prev/next), reset
  // the closing state so the entry animation runs.
  useEffect(() => {
    if (item) {
      setClosing(false);
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }
  }, [item?.id]);

  // Belt-and-braces: if the component unmounts mid-close, cancel the timer.
  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Single close path. Idempotent under spam-click.
  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, CLOSE_MS);
  }, [closing, onClose]);

  const safeNav = useCallback((fn?: () => void) => {
    if (!fn) return;
    if (navLockRef.current) return;
    if (closing) return; // don't navigate mid-close
    navLockRef.current = true;
    fn();
    setTimeout(() => { navLockRef.current = false; }, 120);
  }, [closing]);

  // Swipe-down to close (touch only).
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      t: Date.now(),
    };
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const endX = e.changedTouches[0]?.clientX ?? start.x;
    const endY = e.changedTouches[0]?.clientY ?? start.y;
    const dx = endX - start.x;
    const dy = endY - start.y;
    const dt = Date.now() - start.t;
    // Vertical swipe-down → close
    if (Math.abs(dy) > Math.abs(dx) && dy > 70 && dt < 600) requestClose();
    // Horizontal swipe → prev/next
    else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60 && dt < 500) {
      if (dx > 0) safeNav(onPrev);
      else safeNav(onNext);
    }
  }, [requestClose, onPrev, onNext, safeNav]);

  // Keyboard handler — debounced via safeNav.
  const onKey = useCallback((e: KeyboardEvent) => {
    if (!item) return;
    if (e.key === 'Escape') { e.preventDefault(); requestClose(); }
    if (e.key === 'ArrowLeft') safeNav(onPrev);
    if (e.key === 'ArrowRight') safeNav(onNext);
  }, [item, requestClose, onPrev, onNext, safeNav]);

  useEffect(() => {
    if (!item) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onKey]);

  // Focus + restore.
  useEffect(() => {
    if (!item) return;
    previouslyFocusedRef.current = (document.activeElement as HTMLElement) || null;
    const id = window.setTimeout(() => closeBtnRef.current?.focus({ preventScroll: true }), 80);
    return () => {
      window.clearTimeout(id);
      previouslyFocusedRef.current?.focus?.({ preventScroll: true });
    };
  }, [item]);

  // Reset imageLoaded when the active item changes.
  useEffect(() => {
    setImageLoaded(false);
  }, [item?.id]);

  // Preload adjacent piece images — drops next/prev lag to ~0ms when cached.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    [prevItem, nextItem].forEach((adj) => {
      const src = resolveSrc(adj?.src);
      if (!src) return;
      const img = new window.Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [prevItem, nextItem]);

  const flat = item ? flattenItem(item, locale) : null;
  const displayName = flat ? (flat.name || flat.description) : '';
  const showSeparate = Boolean(flat?.name && flat?.description);

  if (!item || !flat) return null;

  // Portal into document.body so the dialog escapes any ancestor that
  // creates a containing block.
  if (typeof document === 'undefined') return null;

  const backdropClass = closing ? 'lb-backdrop-out' : 'lb-backdrop-in';
  const imageClass = closing ? 'lb-image-out' : 'lb-image-in';
  const captionClass = closing ? 'lb-caption-out' : 'lb-caption-in';

  return createPortal(
    <div
      key="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={displayName || t('lb.close')}
      className={`fixed inset-0 z-[80] bg-charcoal/95 backdrop-blur flex items-center justify-center p-6 lg:p-12 ${backdropClass}`}
      onClick={requestClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button — large, persistent, top-right */}
      <button
        ref={closeBtnRef}
        type="button"
        aria-label={t('lb.close')}
        onClick={(e) => { e.stopPropagation(); requestClose(); }}
        className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-charcoal/70 border border-gold-light/60 text-ivory hover:bg-gold hover:text-charcoal hover:border-gold transition-colors duration-300"
        style={{ boxShadow: '0 8px 28px -12px rgba(0,0,0,0.6)' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 6 L18 18" />
          <path d="M18 6 L6 18" />
        </svg>
      </button>

      {/* Inner panel — clicks do NOT bubble to backdrop */}
      <div
        className="relative max-w-[1100px] w-full grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area — keyed by item.id so the inner img instance is
            recreated on prev/next, re-running the SanityImg mount-time
            check and re-firing the entry animation. */}
        <div
          className={`relative aspect-[4/5] lg:aspect-[3/4] bg-charcoal overflow-hidden ${imageClass}`}
          key={`img-${item.id}`}
        >
          {(item.imageSource || (item.src && item.src.startsWith('http'))) ? (
            <SanityImg
              source={item.imageSource ?? item.src!}
              alt={flat.alt}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              blurDataURL={item.blurDataURL}
              className="object-contain"
              style={{ objectFit: 'contain' }}
              maxWidth={2000}
              onLoad={() => setImageLoaded(true)}
            />
          ) : item.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/images/gallery/${item.src}`}
              alt={flat.alt}
              decoding="async"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
              onLoad={() => setImageLoaded(true)}
            />
          ) : null}

          {/* Thin gold loading hairline — only visible while the new
              image is fetching */}
          {!imageLoaded && (
            <div
              className="absolute bottom-0 left-0 h-px bg-gold-light w-full lb-hairline"
              aria-hidden
            />
          )}
        </div>

        {/* Caption */}
        <div key={`cap-${item.id}`} className={`text-ivory ${captionClass}`}>
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
      </div>

      {onPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); safeNav(onPrev); }}
          aria-label={t('lb.prev')}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 text-ivory hover:text-gold-light text-3xl"
        >
          ←
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); safeNav(onNext); }}
          aria-label={t('lb.next')}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 text-ivory hover:text-gold-light text-3xl"
        >
          →
        </button>
      )}
    </div>,
    document.body,
  );
}
