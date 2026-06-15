import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'localizedString',
      description: 'Shown as a tab on the Gallery page. e.g. "Rings", "Necklaces", "Sapphires", "Bridal".',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Auto-generated from the English title. Used in the URL when filtering.',
      options: {
        source: (doc: any) => doc?.title?.en ?? '',
        maxLength: 60,
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Tab order',
      type: 'number',
      description: 'Lower numbers appear first in the tab strip. Leave blank to sort alphabetically.',
    }),
    defineField({
      name: 'description',
      title: 'Category intro copy (optional)',
      type: 'localizedText',
      description: 'Optional sentence shown above the tiles when this category is selected.',
    }),
  ],
  orderings: [
    { title: 'Tab order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
