'use client';

import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

interface Props {
  /** Target value to count to. */
  to: number;
  /** Optional starting value. Default 0. */
  from?: number;
  /** Duration in seconds. Default 2.6. */
  duration?: number;
  /** Delay before starting (s). Default 0.4. */
  delay?: number;
  /** Pad to this many digits (e.g. 2 → "33"). Omit for no padding. */
  pad?: number;
}

/**
 * Tabular count-up — used wherever a number deserves a touch of theatre
 * (years active, works on view, etc.).
 *
 * Reduced motion: snaps directly to the final value.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 2.6,
  delay = 0.4,
  pad,
}: Props) {
  const prefersReduced = useReducedMotion();
  const [n, setN] = useState(from);

  useEffect(() => {
    if (prefersReduced) {
      setN(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [from, to, duration, delay, prefersReduced]);

  const text = pad ? String(n).padStart(pad, '0') : String(n);
  return <>{text}</>;
}
