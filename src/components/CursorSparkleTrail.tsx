'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * CURSOR SPARKLE TRAIL — a brief wake of gold dust behind the cursor.
 *
 * Scoped to its PARENT element: mount inside a `relative` section (the hero
 * only — never page-wide). Listens for mousemove on the parent, spawns tiny
 * marquise-star glyphs at a throttled rate, and lets a CSS keyframe
 * (`.cursor-dust`) float them up and fade them out before removal.
 *
 * Hard-gated off for touch / coarse pointers and prefers-reduced-motion —
 * the same media queries that hide the custom cursor.
 */
export default function CursorSparkleTrail({ maxParticles = 18 }: { maxParticles?: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const host = hostRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    let last = 0;
    let live = 0;
    const timers: number[] = [];

    const spawn = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 55 || live >= maxParticles) return;
      last = now;

      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left + (Math.random() - 0.5) * 20;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * 20;
      const size = 7 + Math.random() * 9;

      const bit = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      bit.setAttribute('viewBox', '0 0 24 24');
      bit.setAttribute('width', String(size));
      bit.setAttribute('height', String(size));
      bit.setAttribute('aria-hidden', 'true');
      bit.style.position = 'absolute';
      bit.style.left = `${x}px`;
      bit.style.top = `${y}px`;
      bit.style.pointerEvents = 'none';
      bit.classList.add('cursor-dust');
      bit.innerHTML =
        '<path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" fill="rgb(226 198 129)"/>';
      host.appendChild(bit);
      live += 1;

      const id = window.setTimeout(() => {
        bit.remove();
        live -= 1;
      }, 950);
      timers.push(id);
    };

    parent.addEventListener('mousemove', spawn);
    return () => {
      parent.removeEventListener('mousemove', spawn);
      timers.forEach((id) => window.clearTimeout(id));
      host.replaceChildren();
    };
  }, [prefersReduced, maxParticles]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden z-[5]"
    />
  );
}
