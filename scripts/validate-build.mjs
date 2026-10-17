import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { attr, elements } from './html.mjs';

const root = resolve('dist');
const site = 'https://www.woongsnote.dev';
const baseline = JSON.parse(
  await readFile('tests/fixtures/published-posts.json', 'utf8')
);
const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) =>
      e.isDirectory() ? walk(resolve(dir, e.name)) : [resolve(dir, e.name)]
    )
  );
  return nested.flat();
}
const files = await walk(root);
const pages = new Map();
for (const file of files.filter(
  (f) => f.endsWith('.html') && !f.includes(`${sep}pagefind${sep}`)
)) {
  const path =
    '/' +
    relative(root, file)
      .split(sep)
      .join('/')
      .replace(/index\.html$/, '')
      .replace(/\/$/, '');
  const html = await readFile(file, 'utf8');
  pages.set(path === '' ? '/' : path, { file, html, nodes: elements(html) });
}
const getPage = (path) =>
  pages.get(path.replace(/\/$/, '') || '/') ??
  pages.get(`${path.replace(/\/$/, '')}.html`);
for (const path of [
  '/',
  '/archive',
  '/about',
  ...baseline.map((p) => `/${p.slug}`),
])
  check(getPage(path), `Missing page ${path}`);
const tagPages = [...pages.keys()].filter((p) => p.startsWith('/tags/'));
check(tagPages.length > 0, 'No tag pages');
const articlePages = [...pages.values()].filter((p) =>
  p.nodes.some((n) => attr(n, 'data-pagefind-body') !== undefined)
);
check(
  articlePages.length >= baseline.length,
  'Published article count decreased'
);

for (const post of baseline) {
  const page = getPage(`/${post.slug}`);
  if (!page) continue;
  check(
    page.nodes.some(
      (n) =>
        n.tagName === 'link' &&
        attr(n, 'rel') === 'canonical' &&
        attr(n, 'href') === `${site}/${post.slug}`
    ),
    `Canonical changed: ${post.slug}`
  );
  check(
    page.nodes.some(
      (n) =>
        attr(n, 'property') === 'article:published_time' &&
        attr(n, 'content') === `${post.publishedDate}T00:00:00.000Z`
    ),
    `Publication changed: ${post.slug}`
  );
  const source = await readFile(
    `src/content/posts/${post.source}`,
    'utf8'
  ).catch(() => '');
  check(
    new RegExp(`^slug: ['"]?${post.slug}['"]?\\s*$`, 'm').test(source),
    `Source slug changed: ${post.source}`
  );
}

let links = 0;
for (const [path, page] of pages) {
  const canonical = page.nodes.find(
    (n) => n.tagName === 'link' && attr(n, 'rel') === 'canonical'
  );
  check(
    attr(canonical ?? {}, 'href') ===
      `${site}${path === '/404.html' ? '/404' : path}`,
    `Unexpected canonical: ${path}`
  );
  check(
    page.nodes.some((n) => attr(n, 'data-search-modal') !== undefined),
    `Search modal missing: ${path}`
  );
  for (const node of page.nodes) {
    const ref = ['a', 'link'].includes(node.tagName)
      ? attr(node, 'href')
      : ['img', 'script'].includes(node.tagName)
        ? attr(node, 'src')
        : undefined;
    if (!ref || ref === '#' || /^(mailto:|tel:|data:|javascript:)/.test(ref))
      continue;
    const url = new URL(ref, `${site}${path}`);
    if (url.origin !== site) continue;
    const targetPath =
      decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
    const target = getPage(targetPath);
    const file = resolve(root, '.' + url.pathname);
    const exists =
      target ||
      (file.startsWith(root + sep) &&
        (await stat(file)
          .then((s) => s.isFile())
          .catch(() => false)));
    check(exists, `Broken internal reference: ${path} -> ${ref}`);
    if (url.hash && target) {
      const id = decodeURIComponent(url.hash.slice(1));
      check(
        target.nodes.some(
          (n) => attr(n, 'id') === id || attr(n, 'name') === id
        ),
        `Missing anchor: ${path} -> ${ref}`
      );
    }
    links++;
  }
}

const rss = await readFile(resolve(root, 'rss.xml'), 'utf8');
const rssItems = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
  (m) => m[1]
);
check(rssItems.length === articlePages.length, 'RSS/article count mismatch');
for (const post of baseline) {
  const item = rssItems.find((item) =>
    item.includes(`<link>${site}/${post.slug}</link>`)
  );
  check(
    item &&
      item.includes(`<guid isPermaLink="true">${site}/${post.slug}</guid>`),
    `RSS URL/GUID changed: ${post.slug}`
  );
  check(
    item &&
      item.includes(
        `<pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>`
      ),
    `RSS publication changed: ${post.slug}`
  );
}
const dates = rssItems.map((item) =>
  Date.parse(item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? '')
);
check(
  dates.every(
    (date, i) => Number.isFinite(date) && (!i || dates[i - 1] >= date)
  ),
  'RSS publication ordering changed'
);
const sitemapIndex = await readFile(resolve(root, 'sitemap-index.xml'), 'utf8');
const sitemapURLs = new Set();
for (const [, loc] of sitemapIndex.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const url = new URL(loc);
  check(url.origin === site, `Unexpected sitemap origin: ${loc}`);
  const xml = await readFile(resolve(root, '.' + url.pathname), 'utf8');
  for (const [, entry] of xml.matchAll(/<loc>(.*?)<\/loc>/g))
    sitemapURLs.add(entry);
}
for (const path of [
  '/',
  '/archive',
  '/about',
  ...baseline.map((p) => `/${p.slug}`),
])
  check(sitemapURLs.has(`${site}${path}`), `Missing sitemap URL ${path}`);
for (const path of tagPages) {
  const noindex = getPage(path).nodes.some(
    (n) =>
      attr(n, 'name') === 'robots' && attr(n, 'content')?.startsWith('noindex')
  );
  check(
    sitemapURLs.has(`${site}${path}`) !== noindex,
    `Tag indexing policy changed: ${path}`
  );
}
const entry = JSON.parse(
  await readFile(resolve(root, 'pagefind/pagefind-entry.json'), 'utf8')
);
check(
  entry.languages.ko?.page_count === articlePages.length,
  'Pagefind index/article count mismatch'
);
for (const name of ['pagefind/pagefind.js', 'pagefind/pagefind-entry.json'])
  check(
    (await stat(resolve(root, name))).size > 0,
    `Empty Pagefind asset ${name}`
  );
assert.equal(failures.length, 0, failures.join('\n'));
console.log(
  `Build validation passed: ${pages.size} HTML pages, ${baseline.length} preserved URLs/dates, ${tagPages.length} tags, ${links} internal references, RSS/sitemap/Pagefind.`
);
