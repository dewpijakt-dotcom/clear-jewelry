import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName',         title: 'Brand name',           type: 'string' }),
    defineField({ name: 'wordmark',          title: 'Wordmark (main)',      type: 'string', description: 'Big letters of the logo. Usually "CLEAR".' }),
    defineField({ name: 'wordmarkSubtitle',  title: 'Wordmark subtitle',    type: 'string', description: 'Small line under the wordmark. Usually "JEWELRY".' }),
    defineField({ name: 'tagline',           title: 'Tagline',              type: 'localizedString' }),
    defineField({ name: 'establishedYear',   title: 'Established year',     type: 'number' }),

    /* Contact — phone/handles stay as plain strings (they aren't translated). */
    defineField({ name: 'phoneDisplay',     title: 'Phone (display)',     type: 'string' }),
    defineField({ name: 'phoneTel',         title: 'Phone (dial-able)',   type: 'string', description: 'In international format, e.g. +66813116666.' }),
    defineField({ name: 'lineHandle',       title: 'LINE handle',         type: 'string' }),
    defineField({ name: 'lineUrl',          title: 'LINE URL',            type: 'url' }),
    defineField({
      name: 'addressLines',
      title: 'Address (lines)',
      type: 'array',
      of: [{ type: 'localizedString' }],
    }),
    defineField({ name: 'addressOneLine', title: 'Address (one line)', type: 'localizedString' }),
    defineField({ name: 'hours',          title: 'Opening hours',      type: 'localizedString' }),
    defineField({ name: 'transitNote',    title: 'Transit note',       type: 'localizedString' }),
    defineField({ name: 'googleMapEmbedUrl', title: 'Google Maps embed URL', type: 'url' }),

    /* Trust signals ---------------------------------------------- */
    defineField({
      name: 'trustSignals',
      title: 'Trust signals (homepage strip)',
      type: 'array',
      description: '4 trust signal tiles on the homepage strip.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label',  title: 'Label',  type: 'localizedString' }),
          defineField({ name: 'detail', title: 'Detail', type: 'localizedString' }),
        ],
        preview: { select: { title: 'label.en', subtitle: 'detail.en' } },
      }],
    }),

    /* Global imagery ---------------------------------------------- */
    defineField({
      name: 'ogImage',
      title: 'Social share image (Open Graph)',
      type: 'image',
      description: 'Image used in Facebook / WhatsApp / LinkedIn previews when the site is shared. 1200×630 recommended.',
      options: { hotspot: true },
    }),

    /* Navigation -------------------------------------------------- */
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'href',  title: 'URL',   type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
        ],
        preview: { select: { title: 'label.en', subtitle: 'href' } },
      }],
    }),

    /* Footer ------------------------------------------------------ */
    defineField({ name: 'footerNote', title: 'Footer note', type: 'localizedText' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
