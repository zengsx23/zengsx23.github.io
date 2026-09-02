import type { MetadataRoute } from 'next';

const SITE_URL = 'https://zengsx23.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languageAlternates = {
    'zh-CN': `${SITE_URL}/zh/`,
    'en-US': `${SITE_URL}/`,
  };

  return [
    {
      url: `${SITE_URL}/zh/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: [`${SITE_URL}/profile-photo.jpg`],
      alternates: { languages: languageAlternates },
    },
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${SITE_URL}/profile-photo.jpg`],
      alternates: { languages: languageAlternates },
    },
  ];
}
