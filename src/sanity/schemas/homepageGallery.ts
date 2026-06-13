import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepageGallery',
  title: 'Homepage featured pieces',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredPieces',
      title: 'Featured pieces',
      type: 'array',
      description: 'Drag pieces in here to feature them on the homepage. Reorder by dragging. 8–12 pieces recommended (more than 12 are ignored, fewer than 8 backfilled from the rest of the gallery).',
      of: [{ type: 'reference', to: [{ type: 'galleryPiece' }] }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage featured pieces' }),
  },
});
