'use client';

import { useEffect } from 'react';

/**
 * Two-element cursor — a small gold dot tracking position 1:1, and a larger
 * ring that follows with bezel easing. Hidden entirely on touch / coarse
 * pointer devices via CSS media query. Hover state expands the ring over any
 * link, button, or [data-cursor="hover"] element.
 */
export default function CustomCursor() {
  useEffect(() => {
    // Bail entirely on touch / coarse pointer
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isCoarse) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x, ry = y;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    const setVar = (el: HTMLElement, vx: number, vy: number) => {
      el.style.transform = `translate3d(${vx}px, ${vy}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVar(dot, x, y);
    };

    // Higher lerp = ring follows tighter. 0.4 feels crisp without being rigid.
    const tick = () => {
      rx += (x - rx) * 0.4;
      ry += (y - ry) * 0.4;
      setVar(ring, rx, ry);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const HOVER_SELECTOR =
      'a, button, [data-cursor="hover"], [role="button"], input, textarea, select, label';

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest?.(HOVER_SELECTOR)) {
        document.body.dataset.cursorMode = 'hover';
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest?.(HOVER_SELECTOR)) {
        document.body.dataset.cursorMode = '';
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      dot.remove();
      ring.remove();
      delete document.body.dataset.cursorMode;
    };
  }, []);

  return null;
}
