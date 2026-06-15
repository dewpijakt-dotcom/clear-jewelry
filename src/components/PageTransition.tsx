'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

/**
 * Page transition — between routes a brief ivory veil rises from bottom,
 * holds, and lifts off. The content fades in behind it. Feels like the
 * maison opening another room.
 *
 * Wrap children in layout's main. Keys on pathname so AnimatePresence
 * fires on every navigation. Reduced motion: instant swap, no veil.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {/* The gilt veil — only renders during transitions */}
        {!prefersReduced && (
          <motion.div
            initial={{ scaleY: 1, transformOrigin: 'top' }}
            animate={{ scaleY: 0, transformOrigin: 'top' }}
            exit={{ scaleY: 1, transformOrigin: 'bottom' }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-[90] pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, var(--ivory) 0%, var(--paper) 50%, var(--ivory) 100%)',
            }}
            aria-hidden
          >
            {/* gold rule across the centre of the veil */}
            <span
              className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gold-light/60"
              aria-hidden
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
