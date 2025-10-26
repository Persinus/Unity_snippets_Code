
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://unity-snippets-code.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  // Optional: Add the blog to the robots.txt
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://unity-snippets-code.vercel.app/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
