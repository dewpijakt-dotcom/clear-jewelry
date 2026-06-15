'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ReactNode, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  /** How strongly to pull toward the cursor (0..1). */
  strength?: number;
}

/**
 * MagneticButton — pulls toward the cursor by `strength * offset` while
 * hovered, then springs back to centre on leave. Wrap any CTA with this for
 * a quietly tactile interaction.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  target,
  rel,
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 240, damping: 22, mass: 0.5 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block will-change-transform"
    >
      {href ? (
        <a href={href} target={target} rel={rel} onClick={onClick} className={className}>
          {children}
        </a>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return inner;
}
