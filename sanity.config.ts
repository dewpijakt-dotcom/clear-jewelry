import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const SINGLETONS = ['siteSettings', 'homepage', 'homepageGallery', 'aboutPage', 'infoPage', 'contactPage'];

export default defineConfig({
  name: 'clear-jewelry',
  title: 'CLEAR Jewelry · Studio',
  projectId: '2dkw5oqu',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons — single-document panels
            S.listItem().title('Site settings').id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Homepage').id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem().title('Homepage featured pieces').id('homepageGallery')
              .child(S.document().schemaType('homepageGallery').documentId('homepageGallery')),
            S.listItem().title('About page').id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('Information page').id('infoPage')
              .child(S.document().schemaType('infoPage').documentId('infoPage')),
            S.listItem().title('Contact page').id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            // Collections
            S.documentTypeListItem('galleryPiece').title('Gallery pieces'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from "create new document" menu — they're managed via the structure
    templates: (templates) => templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (input, ctx) =>
      SINGLETONS.includes(ctx.schemaType)
        ? input.filter((a) => a.action !== 'duplicate' && a.action !== 'delete' && a.action !== 'unpublish')
        : input,
  },
});
