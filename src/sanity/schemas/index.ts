import { localizedString, localizedText } from './_localized';
import galleryPiece from './galleryPiece';
import category from './category';
import homepageGallery from './homepageGallery';
import homepage from './homepage';
import aboutPage from './aboutPage';
import infoPage from './infoPage';
import contactPage from './contactPage';
import siteSettings from './siteSettings';

export const schemaTypes = [
  /* Helpers — must come before any field that uses them. */
  localizedString,
  localizedText,
  /* Singletons */
  siteSettings,
  homepage,
  homepageGallery,
  aboutPage,
  infoPage,
  contactPage,
  /* Document types */
  galleryPiece,
  category,
];
