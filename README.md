# CLEAR JEWELRY — Website

An elegant showcase + lead-generation site for **CLEAR JEWELRY**, an independent Thai high-jewellery house since 1993. Built to drive in-store appointments at the Gaysorn Centre atelier.

**Live**: https://clear-jewelry.vercel.app  
**Repo**: https://github.com/kirbykung168-art/clear-jewelry

---

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion (reveals + lightbox)
- Lenis (smooth scroll)
- next/image (AVIF/WebP, lazy, srcset, blur placeholder)
- Deploy: Vercel (auto-deploy on push to `main`)

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — full-bleed hero + signature pieces + brand story + trust strip |
| `/gallery` | Filterable masonry grid (All / Rings / Necklaces / Earrings / Rubies / Sapphires / Diamonds / Sets) + lightbox |
| `/book` | Appointment request form (validated, mailto fallback, success state) |
| `/about` | Heritage, philosophy, 4-step bespoke process |
| `/info` | Expertise, GIA, custom design, visiting info |
| `/contact` | All four contact channels + Gaysorn map |

---

## How to add Instagram images

The gallery is **manifest-driven** — no rebuilds needed when the client adds photos. Steps:

1. **Download** the photos from [@clearjewelry](https://www.instagram.com/clearjewelry) (right-click → save image on desktop, or share → save image on phone). Aim for 1200–1600px on the long edge, JPG at quality 82–86.
2. **Drop** the files into `/public/images/gallery/` with descriptive kebab-case names:
   ```
   burmese-ruby-halo-ring.jpg
   royal-blue-sapphire-cocktail.jpg
   marquise-diamond-trinity-earrings.jpg
   ```
3. **Open** `src/lib/gallery-manifest.ts` and replace the matching entry's `src: null` with the filename, e.g.:
   ```ts
   {
     src: 'burmese-ruby-halo-ring.jpg',
     name: 'Pigeon Blood Burmese Ruby Halo Ring',
     spec: 'Unheated 3.21ct oval ruby · double diamond halo · platinum',
     categories: ['ring', 'ruby'],
     aspect: 'portrait',
   }
   ```
4. **Commit and push** to `main` — Vercel auto-deploys in ~45 seconds.

Until real images are dropped in, the site shows luxe placeholder tiles (ivory or onyx with the gold CLEAR wordmark) at the correct aspect ratios, so the layout reads as final-quality.

### Adding the hero photo

Drop a single high-impact image at `/public/images/hero/hero-main.jpg`. The homepage will use it automatically. If absent, the placeholder onyx-and-gold composition is used.

---

## Configuring brand facts

All contact details, hours, links, and trust signals live in a single file:

```
src/lib/brand.ts
```

Update `BRAND.email` before launch (currently set to the placeholder `info@clearjewelry.com`). Phone, LINE, Instagram, address, hours, transit note, and the trust-signal strip are all editable here.

---

## Form submissions

The Book Appointment form (`src/components/BookForm.tsx`) currently:

1. **Validates** every field in React.
2. **Logs** the payload to the browser console.
3. **Builds** a clean LINE-friendly summary, copies it to the visitor's clipboard, and opens the client's LINE Official account (`@clearjewelry`) in a new tab — the visitor just pastes and sends.
4. **Shows** an elegant in-page success state with a button to reopen LINE.

LINE is the brand's primary channel; there is no public email. To upgrade to a server-side endpoint later (Formspree, Resend, a custom webhook into LINE Notify), replace the body of `submit()` in `BookForm.tsx`. The form data is already validated and shaped.

---

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

The repo is wired to Vercel. Push to `main` and the production deploy goes live in ~45 seconds.

Initial setup (once per project):
1. Create the empty repo at `github.com/kirbykung168-art/clear-jewelry`.
2. Push this folder.
3. Import the repo in Vercel; framework auto-detected as Next.js. No env vars required for the current form strategy.

---

## Optional: EN/TH language toggle

The Noto Serif Thai font is already wired up in `src/app/layout.tsx`. To add a language toggle later:

1. Create a `useLocale` hook + context.
2. Move strings out of `brand.ts` and the pages into `src/lib/copy.ts` keyed by locale (`en`, `th`).
3. Add a small EN | TH switcher in the header.

**Polite particle:** any Thai copy must use ครับ (never ค่ะ/คะ). This is a hard brand rule.

---

## Brand reference

- **Palette**: ivory `#FAF8F4` · charcoal `#1A1815` · gold `#C2A14D` (+ light `#D8BE7E`, deep `#9C7E33`)
- **Display serif**: Cormorant Garamond (loaded via `next/font/google`)
- **Body sans**: Jost
- **Easing**: `cubic-bezier(0.22, 0.61, 0.36, 1)` — slow, elegant, never bouncy

Gold is used sparingly — hairline rules, small-caps labels, hover states, icons — never as a flat fill. Light (ivory) and dark (charcoal) sections alternate for drama, in the rhythm of Cartier / Van Cleef editorial sites.
