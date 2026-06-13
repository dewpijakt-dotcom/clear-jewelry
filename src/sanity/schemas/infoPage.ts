import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'infoPage',
  title: 'Information page',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Page title',       type: 'string' }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 2 }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Edit, reorder, or add sections shown on /info (Expertise · Authenticity · Bespoke · Visiting).',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
          defineField({ name: 'title',   title: 'Title',   type: 'string', validation: (R) => R.required() }),
          defineField({
            name: 'body',
            title: 'Body paragraphs',
            type: 'array',
            of: [{ type: 'text', rows: 4 }],
          }),
        ],
        preview: { select: { title: 'title', subtitle: 'eyebrow' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Information page' }) },
});
