import { defineField, defineType } from 'sanity';

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
      type: 'localizedString',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'localizedString',
      description: 'Small caps line above the headline. e.g. "Bangkok · Since 1993".',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero headline',
      type: 'localizedString',
      description: 'Main display title. e.g. "Gemstone art".',
    }),
    defineField({
      name: 'heroItalic',
      title: 'Hero italic line',
      type: 'localizedString',
      description: 'Italic gold line below the headline. e.g. "since 1993.".',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero description',
      type: 'localizedText',
      description: 'Short paragraph beneath the headline.',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA label',
      type: 'localizedString',
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
      type: 'localizedString',
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
      type: 'localizedString',
      description: 'The small-caps line between the gold rules above the CTA buttons. e.g. "By Private Appointment".',
    }),

    /* SIGNATURE WALL HEADER ======================================== */
    defineField({
      name: 'signatureEyebrow',
      title: 'Signature section — eyebrow',
      type: 'localizedString',
    }),
    defineField({
      name: 'signatureTitle',
      title: 'Signature section — title',
      type: 'localizedString',
    }),
    defineField({
      name: 'signatureBody',
      title: 'Signature section — body',
      type: 'localizedText',
    }),

    /* STORY SECTION ================================================ */
    defineField({
      name: 'storyEyebrow',
      title: 'Story section — eyebrow',
      type: 'localizedString',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story section — title',
      type: 'localizedString',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story section — body',
      type: 'localizedText',
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
      type: 'localizedString',
    }),

    /* CLOSING ATELIER CTA ========================================== */
    defineField({
      name: 'closingTitle',
      title: 'Closing CTA — title',
      type: 'localizedString',
    }),
    defineField({
      name: 'closingBody',
      title: 'Closing CTA — body',
      type: 'localizedText',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
