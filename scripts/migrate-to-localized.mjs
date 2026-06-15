#!/usr/bin/env node
/**
 * Sanity migration: convert plain-string fields into localizedString /
 * localizedText objects (so the new schema accepts existing documents).
 *
 * - Old shape:   heroTitle: "Gemstone art"
 * - New shape:   heroTitle: { _type: 'localizedString', en: "Gemstone art", th: '', zh: '' }
 *
 * Empty `th` / `zh` are fine — `pickLocalized()` falls back to `en`.
 *
 * Run:
 *   cd "C:\path\to\Clear Jewelry"
 *   set SANITY_AUTH_TOKEN=<paste from sanity.io/manage → API → Tokens (write)>
 *   node scripts/migrate-to-localized.mjs
 *
 * Idempotent: safe to re-run. Skips fields that are already objects.
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error('ERROR: set SANITY_AUTH_TOKEN env var (a write token from sanity.io/manage).');
  process.exit(1);
}

const client = createClient({
  projectId: '2dkw5oqu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

/* Per-schema field lists ----------------------------------------------------
 * Each entry is [documentType, [stringFields], [textFields], optional nested
 * array config]. Fields not listed here are left as-is.
 */
const PLAN = {
  homepage: {
    type: 'homepage',
    str: [
      'heroImageAlt', 'heroEyebrow', 'heroTitle', 'heroItalic',
      'ctaPrimaryLabel', 'ctaSecondaryLabel', 'ctaPlateEyebrow',
      'signatureEyebrow', 'signatureTitle',
      'storyEyebrow', 'storyTitle', 'storyImageAlt',
      'closingTitle',
    ],
    text: ['heroLede', 'signatureBody', 'storyBody', 'closingBody'],
  },
  aboutPage: {
    type: 'aboutPage',
    str: ['maisonTitle', 'philosophyTitle', 'portraitImageAlt'],
    text: ['maisonBody', 'philosophyBody'],
    arrays: [{
      key: 'bespokeSteps',
      itemStr: ['title'],
      itemText: ['body'],
    }],
  },
  infoPage: {
    type: 'infoPage',
    str: ['title'],
    text: ['description'],
    arrays: [{
      key: 'sections',
      itemStr: ['eyebrow', 'title'],
      itemTextArrays: ['body'], // array<text> → array<localizedText>
    }],
  },
  contactPage: {
    type: 'contactPage',
    str: ['headline'],
    text: ['subhead'],
    arrays: [{
      key: 'channels',
      itemStr: ['label', 'secondary'],
    }],
  },
  siteSettings: {
    type: 'siteSettings',
    str: ['tagline', 'addressOneLine', 'hours', 'transitNote'],
    text: ['footerNote'],
    strArrays: ['addressLines'], // array<string> → array<localizedString>
    arrays: [
      { key: 'trustSignals', itemStr: ['label', 'detail'] },
      { key: 'navLinks',     itemStr: ['label'] },
    ],
  },
  galleryPiece: {
    type: 'galleryPiece',
    str: ['alt', 'name'],
    text: ['description'],
  },
  category: {
    type: 'category',
    str: ['title'],
    text: ['description'],
  },
};

function wrapStr(v) {
  if (v == null || v === '') return { _type: 'localizedString', en: '', th: '', zh: '' };
  if (typeof v === 'string') return { _type: 'localizedString', en: v, th: '', zh: '' };
  // Already an object — make sure _type is present, fill missing langs with ''.
  return { _type: 'localizedString', en: v.en ?? '', th: v.th ?? '', zh: v.zh ?? '' };
}
function wrapTxt(v) {
  if (v == null || v === '') return { _type: 'localizedText', en: '', th: '', zh: '' };
  if (typeof v === 'string') return { _type: 'localizedText', en: v, th: '', zh: '' };
  return { _type: 'localizedText', en: v.en ?? '', th: v.th ?? '', zh: v.zh ?? '' };
}
function isWrappedStr(v) { return v && typeof v === 'object' && v._type === 'localizedString'; }
function isWrappedTxt(v) { return v && typeof v === 'object' && v._type === 'localizedText'; }

async function migrateOne(plan) {
  const docs = await client.fetch(`*[_type == $t]{...}`, { t: plan.type });
  console.log(`\n[${plan.type}] ${docs.length} document(s)`);
  for (const doc of docs) {
    const patch = {};
    let changed = false;

    for (const f of plan.str ?? []) {
      if (doc[f] !== undefined && !isWrappedStr(doc[f])) {
        patch[f] = wrapStr(doc[f]);
        changed = true;
      }
    }
    for (const f of plan.text ?? []) {
      if (doc[f] !== undefined && !isWrappedTxt(doc[f])) {
        patch[f] = wrapTxt(doc[f]);
        changed = true;
      }
    }
    for (const f of plan.strArrays ?? []) {
      if (Array.isArray(doc[f])) {
        const next = doc[f].map((v) => (isWrappedStr(v) ? v : wrapStr(v)));
        if (JSON.stringify(next) !== JSON.stringify(doc[f])) {
          patch[f] = next;
          changed = true;
        }
      }
    }
    for (const arrCfg of plan.arrays ?? []) {
      if (!Array.isArray(doc[arrCfg.key])) continue;
      const nextItems = doc[arrCfg.key].map((item) => {
        const out = { ...item };
        for (const f of arrCfg.itemStr ?? []) {
          if (out[f] !== undefined && !isWrappedStr(out[f])) out[f] = wrapStr(out[f]);
        }
        for (const f of arrCfg.itemText ?? []) {
          if (out[f] !== undefined && !isWrappedTxt(out[f])) out[f] = wrapTxt(out[f]);
        }
        for (const f of arrCfg.itemTextArrays ?? []) {
          if (Array.isArray(out[f])) {
            out[f] = out[f].map((v) => (isWrappedTxt(v) ? v : wrapTxt(v)));
          }
        }
        return out;
      });
      if (JSON.stringify(nextItems) !== JSON.stringify(doc[arrCfg.key])) {
        patch[arrCfg.key] = nextItems;
        changed = true;
      }
    }

    if (!changed) {
      console.log(`  - ${doc._id}: already migrated`);
      continue;
    }
    console.log(`  ✓ ${doc._id}: patching ${Object.keys(patch).join(', ')}`);
    await client.patch(doc._id).set(patch).commit({ visibility: 'async' });
  }
}

(async () => {
  for (const plan of Object.values(PLAN)) {
    try {
      await migrateOne(plan);
    } catch (e) {
      console.error(`[${plan.type}] ERROR`, e.message);
    }
  }
  console.log('\nDone.');
})();
