'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
  /** Eyebrow above the caption. */
  eyebrow?: string;
  /** Big italic display caption. */
  title?: ReactNode;
  /** Optional supporting line. */
  body?: ReactNode;
  /** Where the caption sits over the image. */
  align?: 'left' | 'right' | 'center' | 'bottom';
  /** Tone. */
  tone?: 'dark' | 'light';
  /** Height: 'tall' (100svh) or 'short' (70svh). */
  height?: 'tall' | 'short';
  /** Optional priority for hero load. */
  priority?: boolean;
  /** Optional Roman act marker overlay (e.g. "II"). */
  act?: string;
}

/**
 * Full-bleed cinematic plate — a single photo with a slow ken-burns motion,
 * subtle scroll-tied parallax, and an editorial caption. Used as visual
 * "breath" between dense content sections.
 */
export default function CinematicPlate({
  src,
  alt,
  eyebrow,
  title,
  body,
  align = 'left',
  tone = 'dark',
  height = 'tall',
  priority = false,
  act,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.7]);

  const hClass = height === 'tall' ? 'h-[100svh] min-h-[640px]' : 'h-[70svh] min-h-[520px]';

  // alignment of the caption block
  const alignClasses = {
    left:   'items-start  text-left   pl-8 lg:pl-20 pr-6 pb-16 lg:pb-24',
    right:  'items-end    text-right  pr-8 lg:pr-20 pl-6 pb-16 lg:pb-24',
    center: 'items-center text-center px-6 pb-16 lg:pb-24',
    bottom: 'items-start  text-left   pl-8 lg:pl-20 pr-6 pb-12 lg:pb-16',
  }[align];

  const textColor = tone === 'dark' ? 'text-ivory' : 'text-charcoal';
  const gradient = tone === 'dark'
    ? 'linear-gradient(180deg, rgba(10,9,8,0.45) 0%, rgba(10,9,8,0.15) 35%, rgba(10,9,8,0.30) 65%, rgba(10,9,8,0.78) 100%)'
    : 'linear-gradient(180deg, rgba(250,248,244,0.35) 0%, rgba(250,248,244,0) 30%, rgba(250,248,244,0.40) 100%)';

  return (
    <section
      ref={ref}
      className={`relative w-full ${hClass} overflow-hidden bg-charcoal`}
      aria-label={typeof title === 'string' ? title : alt}
    >
      {/* image with parallax + ken-burns */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 ken-burns">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={priority}
            quality={92}
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0" style={{ background: gradient }} />
      </motion.div>

      {/* gold corner brackets */}
      <span className="absolute pointer-events-none" style={{ top: 22, left: 22, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
      <span className="absolute pointer-events-none" style={{ top: 22, right: 22, width: 28, height: 28, borderTop: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />
      <span className="absolute pointer-events-none" style={{ bottom: 22, left: 22, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderLeft: '1px solid var(--gold-light)' }} />
      <span className="absolute pointer-events-none" style={{ bottom: 22, right: 22, width: 28, height: 28, borderBottom: '1px solid var(--gold-light)', borderRight: '1px solid var(--gold-light)' }} />

      {/* huge transparent Roman act marker */}
      {act && (
        <span
          className="absolute display top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none select-none"
          style={{
            fontSize: 'clamp(120px, 30vw, 540px)',
            color: tone === 'dark' ? 'rgba(226,198,129,0.10)' : 'rgba(110, 85, 35, 0.10)',
            lineHeight: 1,
            fontStyle: 'italic',
          }}
        >
          {act}
        </span>
      )}

      {/* caption block */}
      <div className={`relative h-full w-full flex flex-col justify-end ${alignClasses}`}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
          className={`max-w-[820px] ${textColor}`}
        >
          {eyebrow && (
            <p
              className="font-sans uppercase mb-6"
              style={{
                fontSize: '11px',
                letterSpacing: '0.42em',
                color: tone === 'dark' ? 'var(--gold-light)' : 'var(--gold-deep)',
              }}
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className="display leading-[1.0] mb-6"
              style={{ fontSize: 'clamp(40px, 6.2vw, 110px)' }}
            >
              {title}
            </h2>
          )}
          {body && (
            <p className="font-sans text-[14.5px] leading-[1.9] max-w-xl" style={{ opacity: 0.88 }}>
              {body}
            </p>
          )}
          <span className="block w-16 h-px bg-gold-light/80 mt-8" />
        </motion.div>
      </div>
    </section>
  );
}
