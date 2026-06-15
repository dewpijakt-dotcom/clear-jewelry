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
 *  - Book CTA links DIRECTLY to LINE (@clearjewelry) — no form.
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
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 h-[82px] flex items-center justify-between">
          <Link
            href="/"
            aria-label={BRAND.name}
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <Wordmark size="sm" variant={solid ? 'dark' : 'light'} />
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
                  {/* hairline gold underline that draws in */}
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
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'font-sans text-[11.5px] uppercase tracking-[0.24em] px-5 py-3 border transition-all duration-500 ease-elegant',
                solid
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory'
                  : 'border-ivory text-ivory hover:bg-ivory hover:text-charcoal',
              )}
            >
              {t('nav.book')}
            </a>
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
          <div className="px-6 h-[82px] flex items-center justify-between">
            <Wordmark size="sm" variant="light" />
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
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 border border-gold text-gold-light px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.28em]"
            >
              {t('nav.book')}
            </a>
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
