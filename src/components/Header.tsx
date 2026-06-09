'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BRAND, NAV_LINKS } from '@/lib/brand';
import Wordmark from './Wordmark';

/**
 * Sticky minimal header.
 *  - Transparent over the hero (homepage).
 *  - Solid ivory (with hairline gold border) once scrolled or on inner pages.
 *  - Refined mobile drawer.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

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
      >
        <div className="mx-auto max-w-[1480px] px-6 lg:px-10 h-[78px] flex items-center justify-between">
          <Link
            href="/"
            aria-label={BRAND.name}
            className="flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <Wordmark size="sm" variant={solid ? 'dark' : 'light'} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-sans text-[12px] uppercase tracking-[0.28em] transition-colors duration-500 ease-elegant',
                  pathname === link.href ? 'text-gold' : 'hover:text-gold',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className={clsx(
                'font-sans text-[12px] uppercase tracking-[0.24em] px-5 py-2.5 border transition-all duration-500 ease-elegant',
                solid
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory'
                  : 'border-ivory text-ivory hover:bg-ivory hover:text-charcoal',
              )}
            >
              Book Appointment
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col items-end gap-[5px] p-2"
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
          'fixed inset-0 z-[60] md:hidden transition-all duration-700 ease-elegant',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-charcoal" />
        <div className="relative h-full flex flex-col text-ivory">
          <div className="px-6 h-[78px] flex items-center justify-between">
            <Wordmark size="sm" variant="light" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="text-ivory text-[11px] uppercase tracking-[0.28em] p-2"
            >
              Close
            </button>
          </div>
          <hr className="gold-rule full opacity-30" />

          <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="display text-3xl tracking-[-0.01em] hover:text-gold-light transition-colors duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="mt-8 border border-gold text-gold px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.28em]"
            >
              Book Appointment
            </Link>
          </nav>

          <div className="px-6 py-10 text-center text-[10.5px] uppercase tracking-[0.28em] text-gold-deep">
            {BRAND.addressLines[0]} · {BRAND.hours}
          </div>
        </div>
      </div>
    </>
  );
}
