'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gold gradient bar fixed at the top of the viewport, scaling X 0..1
 * with overall page scroll progress. Subtle but anchors the gallery feel.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX: sx }} aria-hidden />;
}
