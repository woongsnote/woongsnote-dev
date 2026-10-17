import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
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
    if (file !== root && !file.startsWith(root + '/'))
      throw new Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
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
  for (const width of [1440, 390]) {
    for (const theme of ['woong-light', 'woong-dark']) {
      const ctx = await context({
        viewport: { width, height: 900 },
        hasTouch: width === 390,
        permissions: ['clipboard-read', 'clipboard-write'],
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`${origin}/responsive-sidebar-design`);
      await page.waitForSelector('.code-copy');
      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        theme
      );
      const code = await page
        .locator('[data-post-body] pre code')
        .first()
        .textContent();
      const button = page.locator('.code-copy').first();
      if (width === 390) await button.tap();
      else {
        await button.focus();
        await page.keyboard.press('Enter');
      }
      await page.waitForFunction(
        () => document.querySelector('.code-copy').textContent === '복사됨'
      );
      assert.equal(
        await page.evaluate(() => navigator.clipboard.readText()),
        code
      );
      if (width === 1440)
        assert.ok(
          await button.evaluate((el) => el === document.activeElement),
          'Copy should preserve keyboard focus'
        );
      assert.ok(
        await page.locator('figcaption[data-rehype-pretty-code-title]').count()
      );
      assert.ok(await page.locator('code span[style]').count());
      const colors = await page
        .locator('pre')
        .first()
        .evaluate((pre) => ({
          bg: getComputedStyle(pre).backgroundColor,
          fg: getComputedStyle(pre.querySelector('span[style]')).color,
        }));
      assert.notEqual(colors.bg, 'rgba(0, 0, 0, 0)');
      themeColors.set(`${width}-${theme}`, colors);
      const geometry = await button.evaluate((button) => {
        const rect = button.getBoundingClientRect();
        const firstLine = button.parentElement
          .querySelector('[data-line]')
          ?.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          overlaps: firstLine && rect.bottom > firstLine.top,
        };
      });
      assert.ok(geometry.width >= 44 && geometry.height >= 44);
      assert.equal(Boolean(geometry.overlaps), false, JSON.stringify(geometry));
      await page
        .locator('pre code')
        .first()
        .evaluate((code) => (code.textContent = 'x'.repeat(500)));
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      );
      const pre = page.locator('pre').first();
      assert.ok(await pre.evaluate((pre) => pre.scrollWidth > pre.clientWidth));
      await pre.focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForFunction(
        () => document.querySelector('pre').scrollLeft > 0
      );

      const opener = page.locator('[data-search-open]').first();
      await opener.click();
      const input = page.locator('[data-search-input]');
      assert.ok(await input.evaluate((el) => el === document.activeElement));
      await input.fill('astro');
      await page.waitForFunction(() =>
        document
          .querySelector('[data-search-status]')
          .textContent.includes('검색 결과')
      );
      assert.ok(await page.locator('[data-search-result]').count());
      assert.ok((await page.locator('[data-search-result]').count()) <= 10);
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
      await input.focus();
      await input.press('ArrowDown');
      assert.ok(
        await page
          .locator('[data-search-result]')
          .first()
          .evaluate((el) => el === document.activeElement)
      );
      await page.keyboard.press('ArrowUp');
      assert.ok(
        await page
          .locator('[data-search-result]')
          .last()
          .evaluate((el) => el === document.activeElement)
      );
      await page.keyboard.press('Escape');
      await page.waitForFunction(
        () => !document.querySelector('[data-search-modal]').open
      );
      assert.ok(await opener.evaluate((el) => el === document.activeElement));
      await page.keyboard.press('Control+k');
      await input.fill('qzxwvqqq');
      await page.waitForFunction(
        () => !document.querySelector('[data-empty]').hidden
      );
      assert.equal(
        await page.locator('[data-search-error]').isVisible(),
        false
      );
      if (width === 390)
        await page
          .locator('[data-search-modal] button[aria-label="닫기"]')
          .tap();
      else await page.keyboard.press('Escape');
      await page.keyboard.press('Meta+k');
      assert.ok(await input.evaluate((el) => el === document.activeElement));
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
        `PASS ${width}px ${theme}: real clipboard/Pagefind, touch/keyboard, focus trap/restore, Ctrl+K/Meta+K, overflow, title/highlight.`
      );
      await ctx.close();
    }
  }

  assert.notDeepEqual(
    themeColors.get('390-woong-light'),
    themeColors.get('390-woong-dark')
  );

  for (const mode of ['denied', 'fallback', 'fallback-failed']) {
    const ctx = await context({
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await ctx.newPage();
    await page.addInitScript((mode) => {
      const clipboard = navigator.clipboard;
      window.readCopied = () => clipboard.readText();
      Object.defineProperty(navigator, 'clipboard', {
        value:
          mode === 'denied'
            ? {
                writeText: async () => {
                  throw new Error('Denied');
                },
              }
            : undefined,
      });
      if (mode === 'fallback-failed') document.execCommand = () => false;
    }, mode);
    await page.goto(`${origin}/responsive-sidebar-design`);
    const expected = await page.locator('pre code').first().textContent();
    await page.locator('.code-copy').first().click();
    await page.waitForFunction(
      (success) =>
        document.querySelector('.code-copy').textContent ===
        (success ? '복사됨' : '복사 실패'),
      mode === 'fallback'
    );
    if (mode === 'fallback')
      assert.equal(await page.evaluate(() => window.readCopied()), expected);
    else
      assert.match(
        await page.locator('[data-code-copy-status]').textContent(),
        /직접 복사/
      );
    console.log(`PASS clipboard ${mode}`);
    await ctx.close();
  }

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
  await input.fill('old');
  await page.waitForTimeout(200);
  await input.fill('new');
  await page.waitForTimeout(500);
  assert.equal(
    await page.locator('[data-search-result] span').first().textContent(),
    'new'
  );
  // Close while a request is pending, then reopen: stale response must stay discarded.
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
