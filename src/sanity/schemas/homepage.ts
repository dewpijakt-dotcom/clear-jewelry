import { defineField, defineType } from 'sanity';

const imageWithAlt = (name: string, title: string, description: string) => [
  defineField({
    name,
    title,
    type: 'image',
    description,
    options: { hotspot: true },
  }),
  defineField({
    name: `${name}Alt`,
    title: `${title} — alt text`,
    type: 'string',
    description: 'For screen readers. Required when the image is set.',
  }),
];

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    /* HERO ======================================================= */
    defineField({
      name: 'heroImage',
      title: 'Hero image — desktop',
      type: 'image',
      description: 'The full-bleed photograph at the top of the homepage on desktop. Click after upload to set the focal point.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero image — mobile (optional)',
      type: 'image',
      description: 'Optional separate crop for narrow viewports. Falls back to the desktop image if not set.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image — alt text',
      type: 'string',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      description: 'Small caps line above the headline. e.g. "Bangkok · Since 1993".',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero headline',
      type: 'string',
      description: 'Main display title. e.g. "Gemstone art".',
    }),
    defineField({
      name: 'heroItalic',
      title: 'Hero italic line',
      type: 'string',
      description: 'Italic gold line below the headline. e.g. "since 1993.".',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      description: 'Short paragraph beneath the headline.',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA label',
      type: 'string',
      description: 'e.g. "Book an Appointment".',
    }),
    defineField({
      name: 'ctaPrimaryHref',
      title: 'Primary CTA link',
      type: 'string',
      description: 'Where the primary button goes. Usually /book.',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary CTA label',
      type: 'string',
      description: 'e.g. "View the Gallery".',
    }),
    defineField({
      name: 'ctaSecondaryHref',
      title: 'Secondary CTA link',
      type: 'string',
      description: 'Usually /gallery.',
    }),
    defineField({
      name: 'ctaPlateEyebrow',
      title: 'CTA plate eyebrow',
      type: 'string',
      description: 'The small-caps line between the gold rules above the CTA buttons. e.g. "By Private Appointment".',
    }),

    /* SIGNATURE WALL HEADER ======================================== */
    defineField({
      name: 'signatureEyebrow',
      title: 'Signature section — eyebrow',
      type: 'string',
      description: 'e.g. "Signature".',
    }),
    defineField({
      name: 'signatureTitle',
      title: 'Signature section — title',
      type: 'string',
      description: 'e.g. "The pieces we are known for.".',
    }),
    defineField({
      name: 'signatureBody',
      title: 'Signature section — body',
      type: 'text',
      rows: 3,
    }),

    /* STORY SECTION ================================================ */
    defineField({
      name: 'storyEyebrow',
      title: 'Story section — eyebrow',
      type: 'string',
      description: 'e.g. "Our story".',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story section — title',
      type: 'string',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story section — body',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'storyImage',
      title: 'Story section — optional photograph',
      type: 'image',
      description: 'Optional portrait or atelier image. Leave empty for type-only design.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'storyImageAlt',
      title: 'Story image — alt text',
      type: 'string',
    }),

    /* CLOSING ATELIER CTA ========================================== */
    defineField({
      name: 'closingTitle',
      title: 'Closing CTA — title',
      type: 'string',
    }),
    defineField({
      name: 'closingBody',
      title: 'Closing CTA — body',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
