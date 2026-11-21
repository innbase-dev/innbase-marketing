import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const origin = 'http://127.0.0.1:3035';
const features = ['booking-engine', 'door-access', 'loyalty', 'guest-intelligence', 'procurement', 'payments'];

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
});

for (const feature of features) {
  test(`${feature} short URL, chapter links and responsive layout`, async ({ page, request }) => {
    const canonicalPath = `/platform/${feature}`;
    const redirect = await request.get(origin + '/' + feature, { maxRedirects: 0 });
    expect(redirect.status()).toBe(308);
    expect(new URL(redirect.headers().location, origin).pathname).toBe(canonicalPath);
    await page.goto(origin + canonicalPath);
    await expect(page.locator('main h1')).toHaveCount(1);
    const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
    expect(new URL(canonical).pathname).toBe(canonicalPath);
    await expect(page.getByRole('figure').first().getByRole('img')).toBeVisible();
    const chapters = page.getByRole('main').getByRole('navigation', { name: /^Explore / }).getByRole('link');
    await expect(chapters).toHaveCount(3);
    for (const chapter of await chapters.all()) {
      const target = await chapter.getAttribute('href');
      await expect(page.locator(target)).toHaveCount(1);
    }
    const audit = await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, elements: nodes.map(node => node.target) }))).toEqual([]);
    for (const width of [320, 360, 390, 414, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('the desk distinguishes a claimed transfer from a verified deposit', async ({ page }) => {
  await page.goto(origin + '/platform/booking-engine#desk');
  for (const name of ['Check Deluxe availability', 'Hold Deluxe 204 for Amaka', 'Amaka sends a transfer']) {
    await page.getByRole('button', { name }).click();
  }
  await expect(page.getByRole('status')).toContainText('still on hold');
  await page.getByRole('button', { name: 'Accounts verifies the transfer' }).click();
  await expect(page.getByRole('status')).toContainText('booking is confirmed');
});

test('the room key opens on arrival and ends at checkout', async ({ page }) => {
  await page.goto(origin + '/platform/door-access#desk');
  await page.getByRole('button', { name: 'Check the stay' }).click();
  await page.getByRole('button', { name: 'Open Room 108' }).press('Enter');
  await expect(page.getByText('Opened at 1:40 a.m.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Tunde checks out' }).click();
  await expect(page.getByText('Your stay has ended.')).toBeVisible();
});

test('programme cost and spend follow five sales and reset with a new rule', async ({ page }) => {
  await page.goto(origin + '/platform/loyalty#explorer');
  const desk = page.locator('#explorer');
  for (let visit = 0; visit < 5; visit += 1) {
    await desk.getByRole('button', { name: /^(Record a sale|Next visit)/ }).click();
  }
  await expect(desk.getByText('₦164,500', { exact: true })).toBeVisible();
  await expect(desk.getByText('7.3%', { exact: true })).toBeVisible();
  await desk.getByRole('button', { name: 'Cashier applies the perk' }).click();
  await expect(desk.getByRole('status')).toContainText('redeemed');
  await desk.getByRole('radio', { name: 'Visits', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(desk.getByText('₦0', { exact: true })).toBeVisible();
});

test('profile viewing role uses native keyboard behaviour and consent can be withdrawn', async ({ page }) => {
  await page.goto(origin + '/platform/guest-intelligence#desk');
  const desk = page.locator('#desk');
  const manager = desk.getByRole('radio', { name: 'Front desk manager' });
  await manager.focus();
  await page.keyboard.press('ArrowRight');
  await expect(desk.getByText('No access to guest preferences.')).toBeVisible();
  await page.keyboard.press('ArrowLeft');
  await expect(manager).toBeChecked();
  for (const name of [/^Front desk notes/, /^Amaka adds/, 'Amaka agrees', 'Amaka books again', 'Amaka changes her mind']) {
    await desk.getByRole('button', { name }).click();
  }
  await expect(desk.getByText('Personalisation · withdrawn', { exact: true })).toBeVisible();
  await desk.getByRole('button', { name: 'Start again' }).click();
  await expect(desk.getByRole('button', { name: /^Front desk notes/ })).toBeFocused();
});

test('reviewing a supplier bank change preserves the approved account', async ({ page }) => {
  await page.goto(origin + '/platform/procurement#desk');
  const panel = page.getByRole('tabpanel');
  await expect(page.getByRole('tab', { selected: true })).toHaveText('“We’ve changed banks”');
  await panel.getByRole('button', { name: 'Accounts submits the new account' }).click();
  await expect(panel.getByText('Doesn’t match the supplier')).toBeVisible();
  await panel.getByRole('button', { name: 'Funmi reviews the change' }).click();
  await expect(panel.getByText('Rejected by Funmi · kept in history')).toBeVisible();
  await expect(panel.getByText('•••• 4417', { exact: true })).toBeVisible();
});

test('an ambiguous transfer is never applied until a manager resolves it', async ({ page }) => {
  await page.goto(origin + '/platform/payments#desk');
  const panel = page.getByRole('tabpanel');
  await page.getByRole('tab', { name: 'Two tables, one amount' }).click();
  await panel.getByRole('button', { name: 'A ₦18,000 transfer arrives' }).click();
  await expect(panel.getByText('Two orders could own this transfer · flagged for review', { exact: true })).toBeVisible();
  await panel.getByRole('button', { name: 'Try: Apply it to the first order' }).click();
  await expect(panel.getByRole('status')).toContainText('Innbase won’t guess');
  await panel.getByRole('button', { name: 'Funmi resolves it to Table 11' }).click();
  await expect(panel.getByText('Resolved to order #1047 by Funmi, manager', { exact: true })).toBeVisible();
});

test('a guest screenshot never marks an order as paid', async ({ page }) => {
  await page.goto(origin + '/platform/payments#desk');
  await page.getByRole('tab', { name: '“I’ve sent it”' }).click();
  const panel = page.getByRole('tabpanel');
  await panel.getByRole('button', { name: 'Try: Mark it as paid' }).click();
  await expect(panel.getByRole('status')).toContainText('isn’t proof of payment');
});
