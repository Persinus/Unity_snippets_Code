import { MetadataRoute } from 'next';

// IMPORTANT: Update this to your production domain.
const domain = 'https://unity-codex.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
