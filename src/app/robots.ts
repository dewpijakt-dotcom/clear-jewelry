import type { MetadataRoute } from 'next';

const BASE = 'https://clear-jewellery.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /book is a redirect target — don't index.
        disallow: ['/book'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
