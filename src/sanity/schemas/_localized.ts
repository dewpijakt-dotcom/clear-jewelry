import { defineField, defineType } from 'sanity';

/**
 * Localized string — three side-by-side fields (en, th, zh).
 *
 * Authoring rule: fill `en` (required). Fill `th` and `zh` when ready;
 * empty values fall back to `en` at render time via `pickLocalized()`.
 *
 * Use everywhere a single visible label or headline lives:
 *   defineField({ name: 'heroTitle', title: 'Hero headline', type: 'localizedString' })
 */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized text (single line)',
  type: 'object',
  fieldsets: [
    { name: 'translations', title: 'Translations', options: { columns: 3 } },
  ],
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      fieldset: 'translations',
      description: 'Required. The authoritative source value.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'th',
      title: 'ไทย (Thai)',
      type: 'string',
      fieldset: 'translations',
      description: 'Optional. Empty falls back to English.',
    }),
    defineField({
      name: 'zh',
      title: '中文 (Chinese)',
      type: 'string',
      fieldset: 'translations',
      description: 'Optional. Empty falls back to English.',
    }),
  ],
  preview: {
    select: { title: 'en', subtitle: 'th' },
  },
});

/**
 * Localized text — multi-line paragraph variant. Same fallback rules.
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text (paragraph)',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      description: 'Required. The authoritative source value.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'th',
      title: 'ไทย (Thai)',
      type: 'text',
      rows: 4,
      description: 'Optional. Empty falls back to English.',
    }),
    defineField({
      name: 'zh',
      title: '中文 (Chinese)',
      type: 'text',
      rows: 4,
      description: 'Optional. Empty falls back to English.',
    }),
  ],
  preview: {
    select: { title: 'en', subtitle: 'th' },
  },
});
