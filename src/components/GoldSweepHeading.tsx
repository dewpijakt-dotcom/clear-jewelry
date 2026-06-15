'use client';

import { useEffect, useRef, useState } from 'react';
import { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** HTML tag to use. Default h2. */
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  className?: string;
  /** Inline style passthrough (e.g. clamp() font sizes). */
  style?: CSSProperties;
  /** Language attribute passthrough for i18n copy. */
  lang?: string;
}

/**
 * Display heading that gets a gold gilt sweep — a Cartier/VCA staple. The
 * gradient sits behind the text via background-clip:text. On intersection
 * the .run class is added, animating the gradient position across the word.
 */
export default function GoldSweepHeading({
  children,
  as = 'h2',
  className = '',
  style,
  lang,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setArmed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={`gilt-sweep ${armed ? 'run' : ''} ${className}`} style={style} lang={lang}>
      {children}
    </Tag>
  );
}
