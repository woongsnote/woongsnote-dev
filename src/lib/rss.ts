import type { CollectionEntry } from 'astro:content';

type BuildRssParams = {
  site: URL | string;
  title: string;
  description: string;
  items: CollectionEntry<'blog'>[];
};

function toCdata(value: string) {
  return `<![CDATA[${value.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
}

// CDATA를 쓰지 않는 필드(링크 등)에는 escape가 필요할 때가 있음
function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function buildRssXml({ site, title, description, items }: BuildRssParams) {
  const base = String(site).replace(/\/+$/, ''); // 끝 슬래시 제거(// 방지)

  const itemXml = items
    .map((post) => {
      const url = `${base}/${post.id}`;
      const postTitle = post.data.title ?? '';
      const postDesc = post.data.description ?? '';
      const html = post.rendered?.html ?? '';

      return `
<item>
  <title>${toCdata(postTitle)}</title>
  <link>${escapeXml(url)}</link>
  <guid isPermaLink="true">${escapeXml(url)}</guid>
  <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>
  <description>${toCdata(postDesc)}</description>
  <content:encoded>${toCdata(html)}</content:encoded>
  ${
    post.data.tags?.map((tag) => `<category>${toCdata(tag)}</category>`).join('') ??
    ''
  }
</item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
  <channel>
    <title>${toCdata(title)}</title>
    <link>${escapeXml(base)}</link>
    <description>${toCdata(description)}</description>
    <language>ko</language>
${itemXml}
  </channel>
</rss>`;
}
