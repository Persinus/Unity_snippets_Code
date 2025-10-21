import { MetadataRoute } from 'next';
import { getAllSnippets } from '@/lib/snippets';

// IMPORTANT: Update this to your production domain.
const domain = 'https://unity-codex.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all snippet slugs
  const snippets = getAllSnippets();
  const snippetRoutes = snippets.map((snippet) => ({
    url: `${domain}/snippets/${snippet.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
     {
      url: `${domain}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
     {
      url: `${domain}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...snippetRoutes];
}
