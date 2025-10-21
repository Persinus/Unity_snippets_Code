import { MetadataRoute } from 'next';

const domain = 'https://unity-snippets-code.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}

    