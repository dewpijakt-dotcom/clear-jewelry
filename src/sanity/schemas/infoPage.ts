import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'infoPage',
  title: 'Information page',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Page title',       type: 'localizedString' }),
    defineField({ name: 'description', title: 'Meta description', type: 'localizedText' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Edit, reorder, or add sections shown on /info (Expertise · Authenticity · Bespoke · Visiting).',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'localizedString' }),
          defineField({ name: 'title',   title: 'Title',   type: 'localizedString', validation: (R) => R.required() }),
          defineField({
            name: 'body',
            title: 'Body paragraphs',
            type: 'array',
            of: [{ type: 'localizedText' }],
          }),
        ],
        preview: { select: { title: 'title.en', subtitle: 'eyebrow.en' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Information page' }) },
});
