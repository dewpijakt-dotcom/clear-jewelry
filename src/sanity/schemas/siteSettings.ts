import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'brandName',         title: 'Brand name',           type: 'string' }),
    defineField({ name: 'wordmark',          title: 'Wordmark (main)',      type: 'string', description: 'Big letters of the logo. Usually "CLEAR".' }),
    defineField({ name: 'wordmarkSubtitle',  title: 'Wordmark subtitle',    type: 'string', description: 'Small line under the wordmark. Usually "JEWELRY".' }),
    defineField({ name: 'tagline',           title: 'Tagline',              type: 'string' }),
    defineField({ name: 'establishedYear',   title: 'Established year',     type: 'number' }),

    /* Contact ----------------------------------------------------- */
    defineField({ name: 'phoneDisplay',     title: 'Phone (display)',     type: 'string' }),
    defineField({ name: 'phoneTel',         title: 'Phone (dial-able)',   type: 'string', description: 'In international format, e.g. +66813116666.' }),
    defineField({ name: 'lineHandle',       title: 'LINE handle',         type: 'string' }),
    defineField({ name: 'lineUrl',          title: 'LINE URL',            type: 'url' }),
    defineField({ name: 'instagramHandle',  title: 'Instagram handle',    type: 'string' }),
    defineField({ name: 'instagramUrl',     title: 'Instagram URL',       type: 'url' }),
    defineField({
      name: 'addressLines',
      title: 'Address (lines)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'addressOneLine', title: 'Address (one line)', type: 'string' }),
    defineField({ name: 'hours',          title: 'Opening hours',      type: 'string' }),
    defineField({ name: 'transitNote',    title: 'Transit note',       type: 'string' }),
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
          defineField({ name: 'label',  title: 'Label',  type: 'string' }),
          defineField({ name: 'detail', title: 'Detail', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'detail' } },
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
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),

    /* Footer ------------------------------------------------------ */
    defineField({ name: 'footerNote', title: 'Footer note', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
