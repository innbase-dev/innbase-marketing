import { test, expect } from '@playwright/test';
import { MARKETING_DESTINATIONS, isPublished } from '../../src/data/marketingDestinations.js';

// Dedicated feature pages have their own demos (covered in platform-features.spec);
// pages on the shared template keep three scenario tabs.
const DEDICATED=new Set(['/platform/payments','/platform/booking-engine','/platform/door-access','/platform/loyalty','/platform/guest-intelligence','/platform/procurement','/platform/messaging']);
const PUBLISHED=Object.values(MARKETING_DESTINATIONS).filter(isPublished).map(({href})=>href).filter(href=>/^\/(platform|solutions)\//.test(href));
const origin='http://127.0.0.1:3035';

test('every published Platform and Solutions page is in the footer and renders',async({page})=>{
 test.setTimeout(90000);
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 await page.goto(`${origin}/platform/payments`);
 const hrefs=await page.locator('footer nav[aria-label="Platform footer links"] a, footer nav[aria-label="Solutions footer links"] a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')).filter(href=>/^\/(platform|solutions)\//.test(href)));
 expect([...hrefs].sort()).toEqual([...PUBLISHED].sort());
 for(const href of hrefs){
  expect((await page.goto(origin+href)).status()).toBe(200);await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://www.innbase.co'+href);
  if(!DEDICATED.has(href)){const tabs=page.getByRole('tab');await expect(tabs).toHaveCount(3);await tabs.first().focus();await page.keyboard.press('ArrowRight');await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');}
  await page.setViewportSize({width:320,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize({width:1440,height:1000});
 }
 const sitemap=await(await page.request.get(origin+'/sitemap.xml')).text();for(const href of hrefs)expect(sitemap).toContain('https://www.innbase.co'+href);
 for(const href of ['/platform/no-such-feature','/solutions/no-such-business'])expect((await page.request.get(origin+href)).status()).toBe(404);
 expect(errors).toEqual([]);
});

test('existing marketing routes and referral redirects still work with third-party scripts blocked',async({page})=>{
 test.setTimeout(60000);const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 for(const href of ['/','/about','/pricing','/guest-companion','/assistant','/contact']){
  expect((await page.goto(origin+href)).status()).toBe(200);await expect(page.locator('main h1')).toBeVisible();
 }
 for(const [old,current] of [['/refer-hotels','/refer'],['/refer/rewards','/refer/portal/rewards'],['/refer/account','/refer/portal/account'],['/refer/help','/refer/portal/help'],['/refer/referrals/example','/refer/portal/referrals/example'],['/sign-in','/refer/sign-in'],['/sign-up','/refer/sign-up']]){
  const response=await page.request.get(origin+old,{maxRedirects:0});expect(response.status()).toBe(308);expect(new URL(response.headers().location,origin).pathname).toBe(current);
 }
 expect(errors).toEqual([]);
});

test('public product cards and controls use hotel workflow labels', async ({ request }) => {
 const response = await request.get(origin + '/sitemap.xml');
 expect(response.ok()).toBe(true);
 const paths = [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
   .map(([, url]) => new URL(url).pathname)
   .filter(path => ['/', '/guest-companion', '/assistant', '/refer'].includes(path)
     || path.startsWith('/platform/') || path.startsWith('/solutions/'));
 expect(paths).toContain('/solutions/multiple-properties');
 expect(paths).toContain('/platform/procurement');
 const stamp = /\billustrative (?:view|scenario|data|record trail|demo|checklist)|\bsample (?:workspace|bank|shift)|\bdesign concept · example sales|(?:Reset|Send|Accept|Confirm) example\b| · example(?=[<"])/i;
 for (const path of paths) {
   const page = await request.get(origin + path);
   expect(page.status(), path).toBe(200);
   expect(await page.text(), path).not.toMatch(stamp);
 }
});
