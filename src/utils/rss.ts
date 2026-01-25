import type { CollectionEntry } from 'astro:content';

type BuildRssParams = {
  site: URL | string;
  title: string;
  description: string;
  items: CollectionEntry<'blog'>[];
};

export function buildRssXml({
  site,
  title,
  description,
  items,
}: BuildRssParams) {
  const itemXml = items
    .map((post) => {
      const url = `${site}/${post.id}`;

      return `
        <item>
          <title><![CDATA[${post.data.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>
          <description><![CDATA[${post.data.description ?? ''}]]></description>
          <content:encoded><![CDATA[
            ${post.rendered?.html ?? ''}
          ]]></content:encoded>
          ${post.data.tags?.map((tag) => `<category>${tag}</category>`).join('') ?? ''}
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss
  version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
  <channel>
    <title>${title}</title>
    <link>${site}</link>
    <description>${description}</description>
    <language>ko</language>
    ${itemXml}
  </channel>
</rss>`;
}
