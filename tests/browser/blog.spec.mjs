import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import sharp from 'sharp';

const origin = 'http://127.0.0.1:3035';
const posts = [
  ['where-hotel-revenue-leaks', 'hotel-revenue-leaks'],
  ['reconcile-bank-transfers-hotel-restaurant', 'bank-transfers'],
  ['how-to-run-a-bar-stock-count', 'bar-stock-count'],
  ['what-is-stock-variance', 'stock-variance'],
  ['shift-handover-checklist-hotel-restaurant', 'shift-handover'],
  ['handle-guest-requests-whatsapp-calls-front-desk', 'guest-requests'],
];

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort()
  );
});

test('every article renders its own illustration, canonical URL and AI context', async ({ page }) => {
  test.setTimeout(90000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [slug, asset] of posts) {
    const path = `/blog/${slug}`;
    expect((await page.goto(origin + path)).status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://innbase.co' + path);
    const illustration = page.locator(`img[src*="${asset}.webp"]`).first();
    await expect(illustration).toBeVisible();
    await expect.poll(() => illustration.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    expect(await illustration.evaluate(img => getComputedStyle(img).objectFit)).toBe('contain');
    const ai = page.getByRole('region', { name: 'Explore this topic with AI.' });
    const link = ai.getByRole('link', { name: /Open ChatGPT/ });
    const prompt = new URL(await link.getAttribute('href')).searchParams.get('q');
    expect(prompt).toContain('https://innbase.co' + path);
    expect(prompt).toContain('Use simple English');
    expect(prompt).toContain('The guide\'s main points:');
    expect(prompt).not.toContain('127.0.0.1');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug} at ${width}px`).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test('article and sidebar fill the container, and sharing controls have matching type and height', async ({ page }) => {
  await page.goto(origin + '/blog/where-hotel-revenue-leaks');
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const grid = page.locator('[class*="bodyGrid"]');
    const bounds = await grid.evaluate(element => {
      const rect = node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width }; };
      return { grid: rect(element), container: rect(element.parentElement), article: rect(element.firstElementChild), sidebar: rect(element.lastElementChild) };
    });
    expect(Math.abs(bounds.grid.width - bounds.container.width)).toBeLessThan(1);
    expect(Math.abs(bounds.article.left - bounds.container.left)).toBeLessThan(1);
    expect(Math.abs(bounds.sidebar.right - bounds.container.right)).toBeLessThan(1);
    if (width > 1000) expect(bounds.article.right).toBeLessThan(bounds.sidebar.left);
    const controls = page.locator('[class*="shareRow"]').locator('a, button');
    const dimensions = await controls.evaluateAll(nodes => nodes.map(node => {
      const style = getComputedStyle(node);
      return { height: node.getBoundingClientRect().height, font: style.fontSize, lineHeight: style.lineHeight };
    }));
    expect(dimensions).toHaveLength(4);
    for (const value of dimensions) {
      expect(value.height).toBe(44);
      expect(value.font).toBe('13px');
      expect(value.lineHeight).toBe('13px');
    }
  }
});

test('AI choices work with the keyboard and prepare distinct article-specific questions', async ({ page }) => {
  await page.goto(origin + '/blog/how-to-run-a-bar-stock-count');
  const panel = page.getByRole('region', { name: 'Explore this topic with AI.' });
  const choices = panel.getByRole('button');
  const link = panel.getByRole('link', { name: /Open ChatGPT/ });
  const prompts = [];
  for (let index = 0; index < 3; index += 1) {
    await choices.nth(index).focus();
    await page.keyboard.press('Enter');
    await expect(choices.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect(panel.locator('button[aria-pressed="true"]')).toHaveCount(1);
    const url = new URL(await link.getAttribute('href'));
    expect(url.origin).toBe('https://chatgpt.com');
    prompts.push(url.searchParams.get('q'));
  }
  expect(new Set(prompts).size).toBe(3);
  expect(prompts[0]).toContain('five short points');
  expect(prompts[1]).toContain('practical checklist');
  expect(prompts[2]).toContain('asking one short question');
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('copy link gives feedback without resizing and offers a selected URL if clipboard access fails', async ({ page }) => {
  await page.addInitScript(() => {
    window.copiedArticle = null;
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async value => { window.copiedArticle = value; } },
    });
  });
  const canonical = 'https://innbase.co/blog/where-hotel-revenue-leaks';
  await page.goto(origin + '/blog/where-hotel-revenue-leaks');
  const copy = page.getByRole('button', { name: 'Copy link', exact: true });
  const before = await copy.boundingBox();
  await copy.click();
  const copied = page.getByRole('button', { name: 'Copied', exact: true });
  await expect(copied).toBeVisible();
  const after = await copied.boundingBox();
  expect(after.width).toBe(before.width);
  expect(after.height).toBe(before.height);
  expect(await page.evaluate(() => window.copiedArticle)).toBe(canonical);
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Permission denied'); }; });
  await copied.click();
  const fallback = page.getByRole('textbox', { name: 'Copy this article link' });
  await expect(fallback).toHaveValue(canonical);
  await expect(fallback).toBeFocused();
  expect(await fallback.evaluate(input => input.selectionEnd - input.selectionStart)).toBe(canonical.length);
});

test('blog listings, RSS, sitemap and every Open Graph image work; missing topics and posts return 404', async ({ page, request }) => {
  test.setTimeout(90000);
  await page.goto(origin + '/blog');
  await expect(page.locator('footer a[href="/blog"]')).toHaveText('Blog');
  await page.getByRole('button', { name: 'Resources', exact: true }).click();
  await expect(page.getByRole('link', { name: /The Innbase blog/ })).toBeVisible();
  for (const path of ['/blog', '/blog/category/payments', '/blog/category/stock', '/blog/category/operations']) {
    expect((await page.goto(origin + path)).status()).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    await page.setViewportSize({ width: 320, height: 950 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  const feed = await (await request.get(origin + '/blog/feed.xml')).text();
  expect((feed.match(/<item>/g) || []).length).toBe(6);
  const sitemap = await (await request.get(origin + '/sitemap.xml')).text();
  for (const [slug] of posts) {
    expect(feed).toContain('/blog/' + slug);
    expect(sitemap).toContain('/blog/' + slug);
  }
  for (const path of ['/blog/og', ...posts.map(([slug]) => '/blog/og/' + slug)]) {
    const response = await request.get(origin + path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([1200, 630]);
  }
  for (const path of ['/blog/no-such-post', '/blog/category/no-such-topic', '/blog/og/no-such-post', '/innbase-blog/src/app/blog']) {
    expect((await request.get(origin + path)).status(), path).toBe(404);
  }
});

test('article has no WCAG A/AA violations in the refreshed content and captures responsive previews', async ({ page }, testInfo) => {
  await page.goto(origin + '/blog/where-hotel-revenue-leaks');
  await page.evaluate(() => document.fonts.ready);
  const audit = await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  // Full-page captures do not scroll into lazy images. Decode them for the
  // preview without changing the component's production loading strategy.
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('main img'));
    for (const image of images) image.loading = 'eager';
    await Promise.all(images.map(image => image.decode()));
  });
  await page.screenshot({ path: testInfo.outputPath('blog-article-desktop.png'), fullPage: true });
  await page.locator('[class*="bodyGrid"]').evaluate(element => {
    window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - 330, behavior: 'instant' });
  });
  await page.screenshot({ path: testInfo.outputPath('blog-article-body-desktop.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('blog-article-mobile.png'), fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin + '/blog');
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('main img'));
    for (const image of images) image.loading = 'eager';
    await Promise.all(images.map(image => image.decode()));
  });
  await page.screenshot({ path: testInfo.outputPath('blog-index-desktop.png'), fullPage: true });
});
