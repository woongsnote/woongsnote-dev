import assert from 'node:assert/strict';
import {
  readFile,
  readdir,
  writeFile,
  mkdtemp,
  cp,
  symlink,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { attr, elements, text } from './html.mjs';

const sourceDates = [];
for (const name of await readdir('src/content/posts')) {
  if (!name.endsWith('.md')) continue;
  const source = await readFile(`src/content/posts/${name}`, 'utf8');
  for (const match of source.matchAll(
    /^(?:publishedDate|updatedDate):\s*['"]?(\d{4}-\d{2}-\d{2})/gm
  )) {
    sourceDates.push(Date.parse(match[1]));
  }
}
const modified = new Date(Math.max(...sourceDates) + 86400000);
const modifiedISO = modified.toISOString();
const modifiedDay = modifiedISO.slice(0, 10);

// Build an isolated copy, so fixtures never enter the live source or production output.
const sandbox = await mkdtemp(join(tmpdir(), 'woongsnote-content-'));
try {
  for (const name of [
    'src',
    'public',
    'astro.config.ts',
    'tsconfig.json',
    'package.json',
  ]) {
    await cp(name, join(sandbox, name), { recursive: true });
  }
  await symlink(
    resolve('node_modules'),
    join(sandbox, 'node_modules'),
    'junction'
  );
  await writeFile(
    join(sandbox, 'src/content/posts/__validation-updated-date.md'),
    `---\ntitle: Updated date validation\ndescription: Temporary validation fixture\npublishedDate: 2020-01-01\nupdatedDate: ${modifiedDay}\ncategory: Tech\ntags: ['Astro']\nslug: validation-updated-date\n---\n\nValidation fixture.\n`,
    { flag: 'wx' }
  );
  execFileSync(
    process.execPath,
    [resolve('node_modules/astro/bin/astro.mjs'), 'build'],
    { cwd: sandbox, stdio: 'pipe' }
  );
  const updated = elements(
    await readFile(
      join(sandbox, 'dist/validation-updated-date/index.html'),
      'utf8'
    )
  );
  const marker = updated.find(
    (n) => attr(n, 'data-updated-date') !== undefined
  );
  assert.ok(marker && text(marker).includes('수정'));
  assert.ok(
    updated.some(
      (n) =>
        attr(n, 'property') === 'article:modified_time' &&
        attr(n, 'content') === modifiedISO
    )
  );
  const json = JSON.parse(
    text(updated.find((n) => attr(n, 'type') === 'application/ld+json'))
  );
  assert.equal(json.datePublished, '2020-01-01T00:00:00.000Z');
  assert.equal(json.dateModified, modifiedISO);
  const original = elements(
    await readFile(
      join(sandbox, 'dist/astro-content-collections-id-slug/index.html'),
      'utf8'
    )
  );
  assert.ok(!original.some((n) => attr(n, 'data-updated-date') !== undefined));
  assert.ok(
    !original.some((n) => attr(n, 'property') === 'article:modified_time')
  );
  const rss = await readFile(join(sandbox, 'dist/rss.xml'), 'utf8');
  assert.ok(
    rss.includes(`<lastBuildDate>${modified.toUTCString()}</lastBuildDate>`)
  );
  const item = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map((match) => match[1])
    .find((item) =>
      item.includes(
        '<link>https://www.woongsnote.dev/validation-updated-date</link>'
      )
    );
  assert.ok(item?.includes('<pubDate>Wed, 01 Jan 2020 00:00:00 GMT</pubDate>'));
  // The fixture is the oldest publication, despite its newest modification date.
  assert.ok(
    rss.lastIndexOf(
      '<link>https://www.woongsnote.dev/validation-updated-date</link>'
    ) > rss.lastIndexOf('<link>https://www.woongsnote.dev/book-book</link>')
  );
  console.log(
    'Content validation passed: real schema, optional updated date rendering/SEO, publication dates/order, RSS lastBuildDate.'
  );
} finally {
  await rm(sandbox, { recursive: true, force: true });
}
