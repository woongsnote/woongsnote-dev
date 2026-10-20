import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright-core';

const root = resolve('dist');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let file = resolve(root, '.' + decodeURIComponent(url.pathname));

    if (file !== root && !file.startsWith(root + sep)) {
      throw new Error('Invalid path');
    }

    if ((await stat(file)).isDirectory()) {
      file = resolve(file, 'index.html');
    }

    response.writeHead(200, {
      'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

const origin = `http://127.0.0.1:${server.address().port}`;
let browser;

try {
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const context = async (options = {}) => {
    const ctx = await browser.newContext({
      reducedMotion: 'reduce',
      ...options,
    });

    ctx.setDefaultTimeout(10000);

    await ctx.route('**/*', (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue()
        : route.abort()
    );

    return ctx;
  };

  const themeColors = new Map();

  /* ── Responsive / Shiki / Search ── */

  for (const width of [1440, 390]) {
    for (const theme of ['woong-light', 'woong-dark']) {
      const ctx = await context({
        viewport: { width, height: 900 },
        hasTouch: width === 390,
      });

      const page = await ctx.newPage();
      const errors = [];

      page.on('pageerror', (error) => errors.push(error.message));

      const response = await page.goto(`${origin}/responsive-sidebar-design`);

      assert.equal(
        response?.status(),
        200,
        `Post page returned HTTP ${response?.status()}`
      );

      await page.waitForSelector('pre.astro-code');

      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        theme
      );

      /* ── Code title ── */

      const titles = page.locator(
        '[data-post-body] figure.code-figure > figcaption.code-title'
      );

      assert.ok(await titles.count(), 'Code title should exist');
      assert.ok((await titles.first().textContent())?.trim());

      /* ── Shiki syntax highlighting ── */

      const pre = page.locator('[data-post-body] pre.astro-code').first();

      assert.ok(
        await pre.locator('code .line').count(),
        'Shiki lines should exist'
      );

      assert.ok(
        await pre.locator('code span[style]').count(),
        'Shiki tokens should exist'
      );

      const colors = await pre.evaluate((element) => {
        const token = element.querySelector('code span[style]');

        return {
          bg: getComputedStyle(element).backgroundColor,
          fg: token ? getComputedStyle(token).color : null,
        };
      });

      assert.notEqual(colors.bg, 'rgba(0, 0, 0, 0)');
      assert.ok(colors.fg, 'Shiki token color should exist');

      themeColors.set(`${width}-${theme}`, colors);

      /* ── Code overflow / keyboard ── */

      await pre.locator('code').evaluate((code) => {
        code.textContent = 'x'.repeat(500);
      });

      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        ),
        'Code should not overflow the page'
      );

      assert.ok(
        await pre.evaluate(
          (element) => element.scrollWidth > element.clientWidth
        ),
        'Long code should scroll horizontally'
      );

      await pre.focus();

      assert.ok(
        await pre.evaluate((element) => element === document.activeElement),
        'Code block should be keyboard-focusable'
      );

      await page.keyboard.press('ArrowRight');

      await page.waitForFunction(
        () =>
          document.querySelector('[data-post-body] pre.astro-code')
            ?.scrollLeft > 0
      );

      /* ── Search modal ── */

      const opener = page.locator('[data-search-open]').first();

      await opener.click();

      const input = page.locator('[data-search-input]');

      assert.ok(
        await input.evaluate((element) => element === document.activeElement)
      );

      await input.fill('astro');

      await page.waitForFunction(() =>
        document
          .querySelector('[data-search-status]')
          .textContent.includes('검색 결과')
      );

      assert.ok(await page.locator('[data-search-result]').count());
      assert.ok((await page.locator('[data-search-result]').count()) <= 10);

      /* ── Focus trap ── */

      for (let i = 0; i < 15; i++) {
        await page.keyboard.press('Tab');

        assert.ok(
          await page.evaluate(() =>
            document
              .querySelector('[data-search-modal]')
              .contains(document.activeElement)
          )
        );
      }

      /* ── Arrow navigation ── */

      await input.focus();
      await input.press('ArrowDown');

      assert.ok(
        await page
          .locator('[data-search-result]')
          .first()
          .evaluate((element) => element === document.activeElement)
      );

      await page.keyboard.press('ArrowUp');

      assert.ok(
        await page
          .locator('[data-search-result]')
          .last()
          .evaluate((element) => element === document.activeElement)
      );

      /* ── Escape / focus restore ── */

      await page.keyboard.press('Escape');

      await page.waitForFunction(
        () => !document.querySelector('[data-search-modal]').open
      );

      assert.ok(
        await opener.evaluate((element) => element === document.activeElement)
      );

      /* ── Ctrl+K / empty result ── */

      await page.keyboard.press('Control+k');
      await input.fill('qzxwvqqq');

      await page.waitForFunction(
        () => !document.querySelector('[data-empty]').hidden
      );

      assert.equal(
        await page.locator('[data-search-error]').isVisible(),
        false
      );

      if (width === 390) {
        await page
          .locator('[data-search-modal] button[aria-label="닫기"]')
          .tap();
      } else {
        await page.keyboard.press('Escape');
      }

      /* ── Meta+K / search navigation ── */

      await page.keyboard.press('Meta+k');

      assert.ok(
        await input.evaluate((element) => element === document.activeElement)
      );

      await input.fill('react');

      await page.waitForFunction(() =>
        document.querySelector('[data-search-result]')
      );

      const target = await page
        .locator('[data-search-result]')
        .first()
        .getAttribute('href');

      await input.press('ArrowDown');
      await page.keyboard.press('Enter');

      await page.waitForURL(
        (url) =>
          url.pathname.replace(/\/$/, '') ===
          new URL(target, origin).pathname.replace(/\/$/, '')
      );

      await page.waitForLoadState('domcontentloaded');

      assert.deepEqual(errors, []);

      console.log(
        `PASS ${width}px ${theme}: Shiki, code title, theme, overflow, Pagefind, focus trap/restore, Ctrl+K/Meta+K.`
      );

      await ctx.close();
    }
  }

  /* ── Light / dark theme comparison ── */

  const lightColors = themeColors.get('390-woong-light');
  const darkColors = themeColors.get('390-woong-dark');

  assert.notDeepEqual(lightColors, darkColors);
  assert.notEqual(lightColors.bg, darkColors.bg);

  /* ── Highlighted lines ── */

  for (const theme of ['woong-light', 'woong-dark']) {
    const highlightCtx = await context();
    const highlightPage = await highlightCtx.newPage();
    const response = await highlightPage.goto(`${origin}/astro-mdx-blog-setup`);

    assert.equal(
      response?.status(),
      200,
      `Highlight page returned HTTP ${response?.status()}`
    );

    await highlightPage.evaluate(
      (theme) => (document.documentElement.dataset.theme = theme),
      theme
    );

    const highlightedLines = highlightPage.locator(
      'pre.astro-code .line.highlighted'
    );

    assert.ok(await highlightedLines.count(), 'Highlighted lines should exist');

    const background = await highlightedLines
      .first()
      .evaluate((line) => getComputedStyle(line).backgroundColor);

    assert.notEqual(
      background,
      'rgba(0, 0, 0, 0)',
      'Highlighted line should have a background'
    );

    console.log(`PASS ${theme}: highlighted lines and background.`);

    await highlightCtx.close();
  }

  /* ── Search error / retry / stale responses ── */

  const ctx = await context();
  const page = await ctx.newPage();

  await page.route('**/pagefind/pagefind.js', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `let fail=true; export async function search(q) { if(q==='retry' && fail){fail=false;throw Error('offline')}; await new Promise(r=>setTimeout(r,q==='old'?300:20)); return {results:[{data:async()=>({url:'/about',meta:{title:q},excerpt:'result'})}]}; }`,
    })
  );

  await page.goto(origin);
  await page.locator('[data-search-open]').first().click();

  const input = page.locator('[data-search-input]');

  await input.fill('retry');

  await page.waitForFunction(
    () => !document.querySelector('[data-search-error]').hidden
  );

  assert.equal(await page.locator('[data-empty]').isVisible(), false);

  await page.locator('[data-search-retry]').click();

  await page.waitForFunction(() =>
    document.querySelector('[data-search-result]')
  );

  assert.equal(await page.locator('[data-search-error]').isVisible(), false);

  /* ── Response ordering ── */

  await input.fill('old');
  await page.waitForTimeout(200);
  await input.fill('new');
  await page.waitForTimeout(500);

  assert.equal(
    await page.locator('[data-search-result] span').first().textContent(),
    'new'
  );

  /* ── Close while a request is pending ── */

  await input.fill('old');
  await page.waitForTimeout(180);

  await page.keyboard.press('Escape');
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(350);

  assert.equal(await page.locator('[data-search-result]').count(), 0);
  assert.equal(await input.inputValue(), '');

  console.log(
    'PASS search error/retry recovery, response ordering, close during pending request.'
  );

  await ctx.close();
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
