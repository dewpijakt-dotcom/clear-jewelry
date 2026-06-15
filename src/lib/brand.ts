/**
 * CLEAR JEWELRY — single source of truth for brand facts.
 * Edit values here; pages read from this file.
 */

export const BRAND = {
  name: 'Clear Jewelry',
  wordmark: 'CLEAR',
  wordmarkSubtitle: 'JEWELRY',
  tagline: 'Gemstone art since 1993',
  establishedYear: 1993,

  // ---- Contact ----
  phoneDisplay: '081-311-6666',
  phoneTel: '+66813116666',
  // No public email — appointments and enquiries route through LINE.
  email: null as string | null,
  lineHandle: '@clearjewelry',
  lineUrl: 'https://line.me/R/ti/p/@clearjewelry',
  instagramHandle: '@clearjewelry',
  instagramUrl: 'https://www.instagram.com/clearjewelry',

  // ---- Location ----
  addressLines: [
    'Gaysorn Centre, 3rd Floor',
    'Gaysorn Village, 999 Ploenchit Rd',
    'Lumpini, Pathumwan, Bangkok',
  ],
  addressOneLine: 'Gaysorn Centre, 3rd Floor, Gaysorn Village, 999 Ploenchit Rd, Lumpini, Pathumwan, Bangkok',
  hours: '11:00 – 19:00 daily',
  transitNote: 'BTS Chidlom · Direct connection to Gaysorn Village',

  // ---- Google Map embed for Gaysorn Village ----
  googleMapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1098!2d100.5424!3d13.7440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed7d35db5b1%3A0xa6c0c6a3b6f4d3f4!2sGaysorn+Village!5e0!3m2!1sen!2sth!4v1700000000000',

  // ---- Trust signals ----
  trustSignals: [
    { label: 'GIA-Certified', detail: 'Every signature stone' },
    { label: 'Unheated Rarities', detail: 'Burmese rubies · Royal blue sapphires' },
    { label: 'Bespoke Design', detail: 'One-of-one commissions' },
    { label: 'Since 1993', detail: '30+ years in Bangkok' },
  ],
};

import type { CopyKey } from './i18n';

export const NAV_LINKS: { href: string; labelKey: CopyKey }[] = [
  { href: '/',         labelKey: 'nav.home' },
  { href: '/gallery',  labelKey: 'nav.gallery' },
  { href: '/about',    labelKey: 'nav.about' },
  { href: '/info',     labelKey: 'nav.info' },
  { href: '/contact',  labelKey: 'nav.contact' },
];
