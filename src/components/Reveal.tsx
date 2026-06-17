'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Subtle fade-up reveal on scroll. Respects prefers-reduced-motion.
 * Default duration 1.1s with elegant easing.
 *
 * SAFETY: a fallback timer forces content visible after a short delay,
 * so even if IntersectionObserver fails to fire (e.g. on a client-side
 * route change where the content is already in view and the observer
 * hasn't yet observed it), content NEVER stays trapped at opacity:0.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 1.1,
  className,
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 120 + delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
