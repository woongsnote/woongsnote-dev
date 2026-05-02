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

// 본문 내 root-relative URL(/...)만 절대 URL로 변환.
// 절대 URL, 프로토콜 상대(//), 앵커, mailto: 는 그대로 둠.
const absolutize = (html: string, base: string) =>
  html.replace(
    /(href|src)="(\/(?!\/)[^"]*)"/g,
    (_, attr, path) => `${attr}="${base}${path}"`
  );

function renderItem(post: PostEntry, base: string, author: string): string {
  const url = `${base}/${post.id}`;
  const html = absolutize(post.rendered?.html ?? '', base);
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
    `    <content:encoded>${cdata(html)}</content:encoded>`,
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
    '  xmlns:content="http://purl.org/rss/1.0/modules/content/"',
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
