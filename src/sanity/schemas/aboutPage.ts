import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'maisonTitle', title: 'Maison — title', type: 'string' }),
    defineField({ name: 'maisonBody',  title: 'Maison — body',  type: 'text', rows: 6 }),
    defineField({ name: 'philosophyTitle', title: 'Philosophy — title', type: 'string' }),
    defineField({ name: 'philosophyBody',  title: 'Philosophy — body',  type: 'text', rows: 6 }),
    defineField({
      name: 'bespokeSteps',
      title: 'Bespoke process — steps',
      type: 'array',
      description: 'The 4-step bespoke process shown on the About page.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Step number', type: 'string' }),
          defineField({ name: 'title',  title: 'Step title',  type: 'string' }),
          defineField({ name: 'body',   title: 'Step body',   type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'number' } },
      }],
    }),
    defineField({
      name: 'portraitImage',
      title: 'Optional atelier portrait',
      type: 'image',
      description: 'Optional. Leave empty for type-only design.',
      options: { hotspot: true },
    }),
    defineField({ name: 'portraitImageAlt', title: 'Portrait — alt text', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
