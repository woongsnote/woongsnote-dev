import type { PostEntry } from '@/types';

type BuildRssParams = {
  site: string;
  feedUrl: string;
  title: string;
  description: string;
  language: string;
  author: string;
  items: PostEntry[];
};

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => XML_ESCAPES[c]);

const cdata = (s: string) =>
  `<![CDATA[${s.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

function renderItem(post: PostEntry, base: string, author: string): string {
  const url = `${base}/${post.id}`;
  const categories = (post.data.tags ?? []).map(
    (t) => `    <category>${cdata(t)}</category>`
  );

  return [
    '  <item>',
    `    <title>${cdata(post.data.title)}</title>`,
    `    <link>${escape(url)}</link>`,
    `    <guid isPermaLink="true">${escape(url)}</guid>`,
    `    <pubDate>${post.data.publishedDate.toUTCString()}</pubDate>`,
    `    <dc:creator>${cdata(author)}</dc:creator>`,
    `    <description>${cdata(post.data.description)}</description>`,
    ...categories,
    '  </item>',
  ].join('\n');
}

export function buildRssXml({
  site,
  feedUrl,
  title,
  description,
  language,
  author,
  items,
}: BuildRssParams): string {
  const base = site.replace(/\/+$/, '');
  const lastBuild =
    items[0]?.data.publishedDate.toUTCString() ?? new Date().toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '  xmlns:atom="http://www.w3.org/2005/Atom"',
    '  xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '<channel>',
    `  <title>${cdata(title)}</title>`,
    `  <link>${escape(base)}</link>`,
    `  <description>${cdata(description)}</description>`,
    `  <language>${escape(language)}</language>`,
    `  <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `  <atom:link href="${escape(feedUrl)}" rel="self" type="application/rss+xml" />`,
    '  <generator>Astro</generator>',
    '  <docs>https://www.rssboard.org/rss-specification</docs>',
    ...items.map((item) => renderItem(item, base, author)),
    '</channel>',
    '</rss>',
  ].join('\n');
}
