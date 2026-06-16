import { defineField, defineType } from 'sanity';

/**
 * Site-wide UI labels — every short string that lives on the chrome
 * (nav, buttons, eyebrows, footer, form labels, lightbox aria-labels,
 * loading text, etc.) so the owner can edit them without a developer.
 *
 * The component code reads these via `useT(key)`. If a key is missing
 * from the document, the site falls back to the hard-coded COPY dict
 * in `src/lib/i18n.ts`. That means publishing a partial document never
 * breaks the site.
 *
 * Each row is `{ key, note, value: { en, th } }`. The `key` is a stable
 * dot-namespaced identifier like `nav.home`, `book.submit`. The `note`
 * is a description the owner sees alongside the field explaining where
 * the label appears.
 */
export default defineType({
  name: 'uiLabels',
  title: 'UI Labels',
  type: 'document',
  fields: [
    defineField({
      name: 'labels',
      title: 'Labels',
      description:
        "Every small piece of text on the site (nav, buttons, footer, form labels, etc). Search the list by key and edit the EN + TH values. Drag rows to reorder for your convenience — the order doesn't affect the site. Removing a row makes the site fall back to its built-in default for that key.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'uiLabel',
          fieldsets: [
            { name: 'meta', title: 'Identifier', options: { collapsible: true, collapsed: false } },
          ],
          fields: [
            defineField({
              name: 'key',
              title: 'Key',
              description: 'Internal identifier — do not change unless you know what you are doing.',
              type: 'string',
              fieldset: 'meta',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'note',
              title: 'Where this appears',
              description: 'Short description so you can find this label.',
              type: 'string',
              fieldset: 'meta',
            }),
            defineField({
              name: 'value',
              title: 'Translation',
              type: 'localizedString',
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'value.en', note: 'note' },
            prepare({ title, subtitle, note }: any) {
              return {
                title: title || '(no key)',
                subtitle: note ? `${note} — ${subtitle ?? ''}` : (subtitle ?? '(no value)'),
              };
            },
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'UI Labels' }) },
});
