#!/usr/bin/env node
/**
 * One-shot migration: parse src/lib/i18n.ts → build a `uiLabels` Sanity
 * document with one row per dot-keyed COPY entry. Includes a human-readable
 * `note` for each row indicating where the label appears.
 *
 * Run once:
 *   set SANITY_AUTH_TOKEN=<editor token from sanity.io/manage>
 *   node scripts/migrate-ui-labels.mjs
 *
 * Idempotent — re-running upserts the same labels (no duplicates).
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) { console.error('SANITY_AUTH_TOKEN missing'); process.exit(1); }

const client = createClient({
  projectId: '2dkw5oqu', dataset: 'production', apiVersion: '2024-01-01', token, useCdn: false,
});

const src = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8');

// Parse `  'key': { en: '...', th: '...', zh: '...' },` blocks.
// Cope with both single-line and multi-line entries.
const entries = [];
const re = /\s'([\w.]+)':\s*\{\s*([^}]+?)\s*\}/g;
let m;
while ((m = re.exec(src)) !== null) {
  const key = m[1];
  const body = m[2];
  const enMatch = body.match(/en:\s*(?:'([^']*)'|"([^"]*)")/);
  const thMatch = body.match(/th:\s*(?:'([^']*)'|"([^"]*)")/);
  const en = enMatch ? (enMatch[1] ?? enMatch[2] ?? '') : '';
  const th = thMatch ? (thMatch[1] ?? thMatch[2] ?? '') : '';
  if (en || th) entries.push({ key, en, th });
}

console.log(`Parsed ${entries.length} keys from i18n.ts`);

// Human-readable notes per namespace + per common key prefix
const NS_NOTES = {
  a11y:   'Accessibility chrome',
  about:  'About page section',
  book:   'Booking form / LINE handoff',
  cls:    'Closing CTA (shared)',
  con:    'Contact page section',
  foot:   'Footer block',
  gal:    'Gallery page section',
  her:    'Hero / brand body',
  home:   'Home page section',
  inf:    'Information page section',
  lb:     'Gallery lightbox aria-labels',
  maison: 'Atelier / Maison label',
  misc:   'Miscellaneous',
  nav:    'Top navigation',
  tag:    'Hours / day badge',
  transit:'BTS / transit note',
  wa:     'WhatsApp contact card',
};

const labels = entries.map((e, i) => {
  const ns = e.key.split('.')[0];
  return {
    _key: `lbl_${i}_${e.key.replace(/[^a-z0-9]/gi, '_').slice(0, 40)}`,
    _type: 'uiLabel',
    key: e.key,
    note: NS_NOTES[ns] ?? '',
    value: {
      _type: 'localizedString',
      en: e.en,
      th: e.th,
      zh: '',
    },
  };
});

(async () => {
  // Upsert the singleton — replace the whole labels array each run so the
  // migration is idempotent and stays in sync with i18n.ts.
  const tx = client.transaction()
    .createIfNotExists({ _id: 'uiLabels', _type: 'uiLabels', labels: [] })
    .patch('uiLabels', (p) => p.set({ labels }));
  await tx.commit();
  console.log(`Upserted ${labels.length} labels into uiLabels`);
})().catch((e) => { console.error('ERR:', e.message); process.exit(1); });
