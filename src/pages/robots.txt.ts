import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) =>
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapURL.href}`, ''].join(
    '\n'
  );

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Missing site configuration', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const sitemapURL = new URL('sitemap-index.xml', site);

  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
