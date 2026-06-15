import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'maisonTitle', title: 'Maison — title', type: 'localizedString' }),
    defineField({ name: 'maisonBody',  title: 'Maison — body',  type: 'localizedText' }),
    defineField({ name: 'philosophyTitle', title: 'Philosophy — title', type: 'localizedString' }),
    defineField({ name: 'philosophyBody',  title: 'Philosophy — body',  type: 'localizedText' }),
    defineField({
      name: 'bespokeSteps',
      title: 'Bespoke process — steps',
      type: 'array',
      description: 'The 4-step bespoke process shown on the About page.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Step number', type: 'string' }),
          defineField({ name: 'title',  title: 'Step title',  type: 'localizedString' }),
          defineField({ name: 'body',   title: 'Step body',   type: 'localizedText' }),
        ],
        preview: { select: { title: 'title.en', subtitle: 'number' } },
      }],
    }),
    defineField({
      name: 'portraitImage',
      title: 'Optional atelier portrait',
      type: 'image',
      description: 'Optional. Leave empty for type-only design.',
      options: { hotspot: true },
    }),
    defineField({ name: 'portraitImageAlt', title: 'Portrait — alt text', type: 'localizedString' }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
