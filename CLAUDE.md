# CLEAR JEWELRY — Bangkok

A luxury showcase + lead-generation site for CLEAR JEWELRY, an independent Thai high-jewellery house established 1993, located on the 3rd floor of Gaysorn Centre, Gaysorn Village, Bangkok.

## Brand brief — verified

- **Name:** CLEAR JEWELRY (also rendered: Clear Jewelry, CLEAR 1993)
- **Established:** 1993 (30+ years)
- **Concept:** Independent Thai high-jewellery house specializing in rare gemstones — unheated Burmese "pigeon blood" rubies, Royal blue sapphires, fancy & black diamonds, bespoke design
- **Location:** Gaysorn Centre, 3rd Floor, Gaysorn Village, 999 Ploenchit Rd, Lumpini, Pathumwan, Bangkok
- **Hours:** 11:00 – 19:00 daily
- **Phone:** 081-311-6666
- **LINE Official:** @clearjewelry (https://line.me/R/ti/p/@clearjewelry)
- **Instagram:** @clearjewelry (https://www.instagram.com/clearjewelry — 412 posts, 3,572 followers)
- **Old website:** www.clear1993.com (DEAD as of June 2026 — this new site replaces it)
- **Transit:** BTS Chidlom, direct connection to Gaysorn Village

## Voice in one sentence

Quiet luxury, gallery-grade — every piece is a one-of-one composition of rare unheated stones, set by hand, signed CLEAR 1993.

## Aesthetic — five words

Quiet, luxury, gallery, gold, gemstone.

## Palette (white / gold / black)

- white #FFFFFF (pure white)
- ivory #FAF8F4 (warm off-white page background)
- black #0C0B0A (near-black for dramatic sections)
- charcoal #1A1815 (text + nav)
- gold #C2A14D (primary metallic gold accent)
- gold-light #D8BE7E (hover / highlight)
- gold-deep #9C7E33 (borders, hairlines)

Gold used SPARINGLY as accent — hairline rules, small-caps labels, hover states, icons. Never a yellow fill. Light (ivory) and dark (black) sections alternate for drama.

## Typography

- **Display serif:** Cormorant Garamond (or Playfair Display) — elegant high-contrast serif for headings
- **Body sans:** Jost (or Inter) — refined, clean
- **Small-caps labels:** Jost with generous letter-spacing (0.22em+)
- **Thai:** Noto Serif Thai (if EN/TH toggle is wired up later)

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion for reveals + Lenis for smooth scroll
- next/image (lazy, srcset, blur placeholder)
- Static-export friendly, deploy to Vercel

## Pages

1. Home — full-bleed hero + "Gemstone art since 1993" + Book CTA + signature pieces + brand story teaser + trust strip
2. Gallery — filterable grid (All / Rings / Necklaces / Earrings / Rubies / Sapphires / Diamonds / Sets) + lightbox
3. Book Appointment — form (name, email, phone, LINE, date, time, interest, message)
4. About — heritage story, philosophy, bespoke approach
5. Info — gemstone expertise, GIA certification, custom-design process, visiting info
6. Contact — LINE, phone, IG, email, address, hours, Google Map embed

## Animations — restrained

- Fade-up + slight-rise on scroll reveal
- Gentle parallax on hero
- Smooth scroll (Lenis)
- Soft image-hover zoom (1.03x over 1.4s)
- No bouncy, no flashy

## Imagery strategy

- Source: client's Instagram (@clearjewelry) — manually downloaded by client into `/public/images/gallery/`
- Auto-loaded via manifest: `lib/gallery-manifest.ts` lists every image with category + caption
- Until real images are dropped in, elegant placeholder tiles (ivory/black with small gold CLEAR mark) at correct aspect ratios

## Deploy

- Repo: github.com/kirbykung168-art/clear-jewelry
- Live: clear-jewelry.vercel.app
