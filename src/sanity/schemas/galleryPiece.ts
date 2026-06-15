import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryPiece',
  title: 'Gallery piece',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'image',
      description: 'The piece photograph. Click the image after upload to set the focal point — the gallery tiles crop around it.',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'localizedString',
      description: 'What does the picture show? Used by screen readers. Required.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'localizedString',
      description: 'Short piece name shown as the heading on hover and in the lightbox. e.g. "Royal Sapphire Floral Choker".',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      description: 'Editorial caption shown under the piece name. Lead with the stone, then the setting.',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Which filter tabs should this piece show under? You can pick more than one.',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'hero',
      title: 'Feature on homepage?',
      type: 'boolean',
      description: 'When true, this piece is a candidate for the homepage preview wall. The "Homepage featured pieces" panel makes the final selection.',
      initialValue: false,
    }),
    defineField({
      name: 'aspect',
      title: 'Tile aspect',
      type: 'string',
      description: 'Optional. Affects the Gallery page tile shape. Defaults to square.',
      options: {
        list: [
          { title: 'Square (default)', value: 'square' },
          { title: 'Portrait (4:5)', value: 'portrait' },
          { title: 'Wide (5:4)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'square',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear earlier on the Gallery page. Use the drag handle next to each piece in the document list to reorder visually.',
    }),
  ],
  orderings: [
    { title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A→Z',     name: 'nameAsc',     by: [{ field: 'name.en',  direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'description.en', media: 'image' },
  },
});
