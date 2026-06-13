import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page headline', type: 'string' }),
    defineField({ name: 'subhead',  title: 'Subhead', type: 'text', rows: 2 }),
    defineField({
      name: 'channels',
      title: 'Contact channels',
      type: 'array',
      description: 'The four contact tiles (LINE, Phone, Instagram, Address). Drag to reorder.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label',     title: 'Label',     type: 'string' }),
          defineField({ name: 'value',     title: 'Value',     type: 'string' }),
          defineField({ name: 'href',      title: 'Link URL (optional)', type: 'string' }),
          defineField({ name: 'secondary', title: 'Secondary line (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps embed URL',
      type: 'url',
      description: 'The full Google Maps embed URL (from Share → Embed a map). Leave empty to hide the map.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});
