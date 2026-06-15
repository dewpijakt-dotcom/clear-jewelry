import { useEffect } from 'react';

/**
 * Body scroll lock — used by modal-like surfaces (Lightbox, mobile drawer).
 *
 * iOS Safari ignores `overflow: hidden` on `<body>` and rubber-bands instead,
 * so we use the canonical "position: fixed; top: -scrollY" trick: capture
 * the current scroll, freeze the body, then restore scroll position on
 * unlock. Scrollbar-width compensation prevents a horizontal layout jump
 * on desktop when the vertical scrollbar disappears.
 *
 * Pass `locked=false` to no-op (so the hook can sit unconditionally inside
 * a component whose modal may or may not be open).
 */
export default function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    // Compensate for the missing scrollbar width so content doesn't shift.
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    // Snapshot the styles we are about to override so we can restore.
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    html.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      html.style.overflow = prev.htmlOverflow;
      // Restore the scroll position exactly where the user was before the
      // lock — without this they jump to the top of the page.
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
