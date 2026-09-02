import type { MetadataRoute } from 'next';

const SITE_URL = 'https://zengsx23.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${SITE_URL}/profile-photo.jpg`],
    },
  ];
}
