'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  /** Roman numeral, e.g. "I" */
  act: string;
  /** Eyebrow above */
  eyebrow: string;
  /** The display headline */
  title: ReactNode;
  /** Optional supporting line */
  body?: ReactNode;
  /** Background tone */
  variant?: 'ivory' | 'charcoal';
  /** Alignment */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Editorial chapter intro — oversize Roman numeral as a watermark, eyebrow,
 * display headline, hairline rule, optional body. The kind of moment a
 * museum or auction-house catalog uses to mark a new section.
 */
export default function ChapterIntro({
  act,
  eyebrow,
  title,
  body,
  variant = 'ivory',
  align = 'left',
  className = '',
}: Props) {
  const isDark = variant === 'charcoal';
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <section
      className={`relative ${isDark ? 'bg-charcoal text-ivory' : 'bg-ivory text-charcoal'} py-28 lg:py-36 ${className}`}
    >
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 relative">
        {/* Huge transparent Roman numeral watermark */}
        <span
          className={`display select-none pointer-events-none absolute ${
            align === 'center'
              ? 'left-1/2 -translate-x-1/2 -top-8'
              : 'left-6 lg:left-10 -top-16'
          }`}
          style={{
            fontSize: 'clamp(160px, 22vw, 400px)',
            fontStyle: 'italic',
            color: isDark ? 'rgba(226,198,129,0.07)' : 'rgba(148,116,51,0.10)',
            lineHeight: 0.9,
          }}
        >
          {act}
        </span>

        <div className={`relative flex flex-col ${alignClass} gap-8`}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="font-sans uppercase tabular-nums"
            style={{
              fontSize: '11px',
              letterSpacing: '0.48em',
              color: isDark ? 'var(--gold-light)' : 'var(--gold-deep)',
            }}
          >
            {act} &nbsp; · &nbsp; {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="display leading-[0.98] text-balance max-w-[18ch]"
            style={{ fontSize: 'clamp(44px, 7vw, 132px)' }}
          >
            {title}
          </motion.h2>

          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className={`block h-px ${isDark ? 'bg-gold-light' : 'bg-gold'}`}
            style={{ width: align === 'center' ? '120px' : '160px', transformOrigin: 'left' }}
          />

          {body && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-sans text-[15px] leading-[1.9] max-w-2xl"
              style={{ opacity: 0.86 }}
            >
              {body}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
