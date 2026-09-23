import { test, expect } from '@playwright/test';

// These requests render src/app/refer/page.js in the production Next server,
// not the portal component fixture. Clerk keys are deliberately absent.
const origin = 'http://127.0.0.1:3035';
const tokenEndpoint = '/refer/api/trpc/referrals.resolveReferralToken';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort()
  );
});

test('public referral page renders its real content without Clerk', async ({ page }) => {
  const errors = [];
  const authRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => {
    if (/clerk|\/refer\/(sign-in|sign-up|portal)/.test(request.url())) {
      authRequests.push(request.url());
    }
  });

  const response = await page.goto(`${origin}/refer`);
  expect(response.status()).toBe(200);
  await expect(page.locator('main h1')).toHaveText(/You know hotels.*Send them our way\./);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://innbase.co/refer');
  const signupLinks = page.getByRole('link', { name: 'Get your referral link' });
  await expect(signupLinks).toHaveCount(2);
  for (const link of await signupLinks.all()) {
    await expect(link).toHaveAttribute('href', '/refer/sign-up');
  }
  await expect(page.getByRole('link', { name: 'Already referring? Sign in' }))
    .toHaveAttribute('href', '/refer/sign-in');

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(authRequests).toEqual([]);
});

test('legacy URL redirects to a working page and preserves referral parameters', async ({ page, request }) => {
  const query = '?ref=valid-token&utm_source=route-test';
  const redirect = await request.get(`${origin}/refer-hotels${query}`, { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toBe(`/refer${query}`);

  const response = await page.goto(`${origin}/refer-hotels${query}`);
  expect(response.status()).toBe(200);
  await expect(page).toHaveURL(`${origin}/refer${query}`);
  await expect(page.locator('main h1')).toContainText('Send them our way.');
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('innbase_referral_token')))
    .toBe('valid-token');

  for (const path of ['/refer/', '/refer-hotels/']) {
    const result = await request.get(origin + path);
    expect(result.status()).toBe(200);
    expect(new URL(result.url()).pathname).toBe('/refer');
  }
});

test('public page is reachable through the real footer and works with JavaScript disabled', async ({ page, browser }) => {
  await page.goto(`${origin}/about`);
  await page.locator('footer a[href="/refer"]').click();
  await expect(page).toHaveURL(`${origin}/refer`);
  await expect(page.locator('main h1')).toContainText('Send them our way.');

  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    expect((await staticPage.goto(`${origin}/refer-hotels`)).status()).toBe(200);
    await expect(staticPage.locator('main h1')).toContainText('Send them our way.');
    await expect(staticPage.getByRole('link', { name: 'Get your referral link' }).first()).toBeVisible();
  } finally {
    await context.close();
  }
});

test('public token lookup reaches the real BFF without a Clerk session', async ({ request }) => {
  const input = encodeURIComponent(JSON.stringify({ referralToken: 'valid-token' }));
  const response = await request.get(`${origin}${tokenEndpoint}?input=${input}`);
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toContain('no-store');
  expect(await response.json()).toEqual({ result: { data: { referrerId: 'referrer-a' } } });

  // The public exception grants no mutation or batching capability.
  const post = await request.post(origin + tokenEndpoint, { data: {} });
  expect(post.status()).toBe(405);
  const batch = await request.get(`${origin}${tokenEndpoint}?batch=1&input=${input}`);
  expect(batch.status()).toBe(400);
});

for (const token of ['invalid-token', 'unavailable-token']) {
  test(`${token} cannot break the public page or create attribution`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const lookup = page.waitForResponse(response => response.url().includes(tokenEndpoint));
    expect((await page.goto(`${origin}/refer?ref=${token}`)).status()).toBe(200);
    const response = await lookup;
    expect(response.status()).toBe(token === 'invalid-token' ? 200 : 503);
    await expect(page.locator('main h1')).toContainText('Send them our way.');
    expect(await page.evaluate(() => sessionStorage.getItem('innbase_referral_token'))).toBeNull();
    expect(errors).toEqual([]);
  });
}

test('unknown referral URLs remain real 404s', async ({ request }) => {
  expect((await request.get(`${origin}/refer/no-such-page`)).status()).toBe(404);
});
