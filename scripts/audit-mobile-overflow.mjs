#!/usr/bin/env node
/**
 * Mobile-overflow regression audit.
 *
 * Walks every public route in a fresh Playwright Chromium at 390×844
 * (iPhone-14-class viewport) and fails if any element renders past the
 * right edge of the viewport. Use this whenever a hero/display text
 * or ghost numeral gets a new size — it catches the class of bug
 * where a `clamp()` lower bound + letter-spacing combination still
 * overflows mobile.
 *
 * Usage:
 *   npm i -D playwright
 *   node scripts/audit-mobile-overflow.mjs                 # checks production
 *   BASE=http://localhost:3000 node scripts/audit-mobile-overflow.mjs   # local
 *
 * Exit codes:
 *   0 — every route clean (no clipping at 390px)
 *   1 — at least one element clipped; details printed
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'https://clear-jewelry.vercel.app';
const ROUTES = ['/', '/gallery', '/about', '/info', '/book', '/contact'];
const VIEWPORT = { width: 390, height: 844 };
const TOL = 1; // allow 1px sub-pixel overshoot

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 3, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1' });
  const page = await ctx.newPage();

  let totalBad = 0;
  for (const route of ROUTES) {
    const url = BASE.replace(/\/$/, '') + route;
    process.stdout.write(`→ ${url}\n`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // let fonts + Reveal settle
    const clipped = await page.evaluate(({ tol, vw }) => {
      const SELECTOR = 'h1, h2, h3, .display, [class*="display-italic"], [class*="ghost-numeral"], img, iframe, button, a';
      return Array.from(document.querySelectorAll(SELECTOR))
        .map(el => {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return null;
          if (r.right <= vw + tol && r.left >= -tol) return null;
          return {
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 60),
            text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
            left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
          };
        })
        .filter(Boolean);
    }, { tol: TOL, vw: VIEWPORT.width });

    const horiz = await page.evaluate(() => document.documentElement.scrollWidth);
    if (clipped.length === 0 && horiz <= VIEWPORT.width + TOL) {
      console.log('  ✓ clean (no clipped elements; doc width = ' + horiz + 'px)');
    } else {
      totalBad += clipped.length + (horiz > VIEWPORT.width + TOL ? 1 : 0);
      if (horiz > VIEWPORT.width + TOL) {
        console.log(`  ✗ document scrollWidth = ${horiz}px (viewport ${VIEWPORT.width}px)`);
      }
      for (const c of clipped) {
        console.log(`  ✗ <${c.tag}> "${c.text}" — left=${c.left} right=${c.right} width=${c.width}`);
      }
    }
  }

  await browser.close();
  if (totalBad > 0) {
    console.error(`\nFAILED — ${totalBad} clipping issue${totalBad === 1 ? '' : 's'} found.`);
    process.exit(1);
  } else {
    console.log('\nOK — all routes pass at 390×844.');
  }
}

main().catch((e) => { console.error(e); process.exit(2); });
