'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import MarquiseSealDraw from '@/components/MarquiseSealDraw';
import { useT } from '@/components/LanguageProvider';

interface Props {
  lineUrl: string;
  lineHandle: string;
}

/**
 * The 1.6s hand-off card. Same gilt vocabulary as the loading screen,
 * shorter and more purposeful: a centred seal, a hairline rule, "Opening
 * LINE", then a window.location.replace into the LINE official account.
 *
 * Reduced motion: still pauses, but skips the seal animation.
 * If JS fails: a meta-refresh in the <noscript> tag still does the redirect.
 */
export default function BookHandoff({ lineUrl, lineHandle }: Props) {
  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const t = useT();

  useEffect(() => {
    const t = window.setTimeout(() => {
      window.location.replace(lineUrl);
    }, prefersReduced ? 600 : 1600);
    return () => window.clearTimeout(t);
  }, [lineUrl, prefersReduced]);

  return (
    <main className="fixed inset-0 bg-ivory flex items-center justify-center px-6">
      {/* noscript / fallback redirect */}
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${lineUrl}`} />
      </noscript>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(720px 560px at 50% 50%, rgba(226,198,129,0.32) 0%, rgba(194,161,77,0.10) 35%, rgba(250,248,244,0) 72%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10 text-center max-w-md"
      >
        <p
          className="font-sans text-[10.5px] uppercase tracking-[0.48em] text-gold-deep mb-10"
        >
          {t('maison.label')}
        </p>

        <div className="relative w-32 h-40 mx-auto mb-10">
          <MarquiseSealDraw className="w-full h-full" ariaLabel="CLEAR 1993 brandmark" />
        </div>

        <hr
          className="block w-24 h-px bg-gold border-0 mx-auto"
          aria-hidden
        />

        <h1
          className="display mt-8 leading-[1.05]"
          style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}
        >
          {t('book.opening')}
        </h1>
        <p className="font-sans text-[12px] uppercase tracking-[0.42em] text-gold-deep mt-5">
          {lineHandle}
        </p>

        <p className="font-sans text-[13.5px] tracking-[0.02em] text-charcoal/75 mt-7 leading-relaxed">
          {t('book.body.l1')}{' '}
          <a
            href={lineUrl}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="text-gold-deep underline underline-offset-4 decoration-gold/60 hover:text-charcoal transition-colors duration-500"
          >
            {t('book.body.tap')}
          </a>
          .
        </p>

        <span
          className={`block w-12 h-px bg-gold/70 mx-auto mt-10 transition-all duration-500 ${
            hover ? 'w-20' : ''
          }`}
          aria-hidden
        />
      </motion.div>
    </main>
  );
}
