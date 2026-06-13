import type { MetadataRoute } from 'next';

const BASE = 'https://clear-jewellery.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`,        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/info`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ];
}
