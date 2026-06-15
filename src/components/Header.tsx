'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BRAND, NAV_LINKS } from '@/lib/brand';
import Wordmark from './Wordmark';
import LanguageToggle from './LanguageToggle';
import { useT } from './LanguageProvider';

/**
 * Sticky minimal header.
 *  - Transparent over the hero (homepage).
 *  - Ivory + hairline gold border once scrolled or on inner pages.
 *  - BOOK CTA links directly to /book (the in-house booking form). The
 *    form itself opens a LINE handoff for the actual reservation.
 *  - Three-language toggle on the right of the nav.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-700 ease-elegant',
          solid
            ? 'bg-ivory/95 backdrop-blur border-b border-[var(--rule)] text-charcoal'
            : 'bg-transparent text-ivory',
        )}
        style={
          solid
            ? {
                boxShadow:
                  '0 14px 40px -28px rgba(148,116,51,0.35), 0 1px 0 rgba(148,116,51,0.18)',
              }
            : undefined
        }
      >
        {/* Header is now 96px (was 82px) to accommodate the larger logo */}
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 h-[96px] flex items-center justify-between">
          <Link
            href="/"
            aria-label={BRAND.name}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Wordmark size="md" variant={solid ? 'dark' : 'light'} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'group relative font-sans text-[11.5px] uppercase tracking-[0.28em] pb-1 transition-colors duration-500 ease-elegant',
                    active ? 'text-gold' : 'hover:text-gold',
                  )}
                >
                  {t(link.labelKey)}
                  <span
                    className={clsx(
                      'absolute left-0 right-0 -bottom-0.5 h-px bg-gold origin-left transition-transform duration-700 ease-bezel',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              );
            })}
            <LanguageToggle variant={solid ? 'dark' : 'light'} className="ml-2" />
            {/*
              BOOK CTA — premium primary action. Solid-fill, gold border,
              uppercase tracked. Consistent with the home hero CTA so the
              "book" affordance is unmistakable wherever it appears.
              Routes to /book (the in-house form), not LINE directly.
            */}
            <Link
              href="/book"
              className={clsx(
                'cta-book group relative inline-flex items-center gap-2.5 font-sans text-[11.5px] uppercase tracking-[0.32em] px-7 py-3.5 transition-all duration-500 ease-elegant',
                solid
                  ? 'bg-charcoal text-ivory border border-charcoal hover:bg-gold hover:border-gold hover:text-charcoal'
                  : 'bg-ivory text-charcoal border border-ivory hover:bg-gold hover:border-gold hover:text-charcoal',
              )}
              style={{
                boxShadow: solid
                  ? '0 6px 18px -10px rgba(148,116,51,0.55)'
                  : '0 6px 18px -10px rgba(255,255,255,0.5), 0 0 0 1px rgba(216,190,126,0.45)',
              }}
            >
              <span>{t('nav.book')}</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col items-end gap-[5px] p-2"
          >
            <span
              className={clsx(
                'block h-[1px] w-8 transition-all duration-500',
                solid ? 'bg-charcoal' : 'bg-ivory',
              )}
            />
            <span
              className={clsx(
                'block h-[1px] w-6 transition-all duration-500',
                solid ? 'bg-charcoal' : 'bg-ivory',
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-[60] lg:hidden transition-all duration-700 ease-elegant',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative h-full flex flex-col text-ivory">
          <div className="px-6 h-[96px] flex items-center justify-between">
            <Wordmark size="md" variant="light" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-ivory text-[11px] uppercase tracking-[0.28em] p-2"
            >
              ✕
            </button>
          </div>
          <hr className="gold-rule full opacity-30" />

          <nav className="flex-1 flex flex-col items-center justify-center gap-7 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="display text-3xl tracking-[-0.01em] hover:text-gold-light transition-colors duration-500"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            {/* Mobile BOOK CTA — full-width primary, same styling vocabulary */}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2.5 bg-gold text-charcoal px-9 py-4 font-sans text-[12px] uppercase tracking-[0.32em] hover:bg-ivory transition-colors duration-500"
              style={{ boxShadow: '0 10px 24px -10px rgba(216,190,126,0.6)' }}
            >
              {t('nav.book')} →
            </Link>
            <LanguageToggle variant="light" className="mt-6" />
          </nav>

          <div className="px-6 py-10 text-center text-[10.5px] uppercase tracking-[0.28em] text-gold-deep">
            {BRAND.addressLines[0]} · {BRAND.hours}
          </div>
        </div>
      </div>
    </>
  );
}
