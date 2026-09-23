import { test, expect } from '@playwright/test';
const origin='http://127.0.0.1:3035';

test('all ten Platform and Solutions pages survive the integration merge',async({page})=>{
 test.setTimeout(90000);
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
 await page.goto(`${origin}/platform/payments`);
 const hrefs=await page.locator('footer nav[aria-label="Platform footer links"] a, footer nav[aria-label="Solutions footer links"] a').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href')).filter(href=>/^\/(platform|solutions)\//.test(href)));
 expect(hrefs).toHaveLength(10);
 for(const href of hrefs){
  expect((await page.goto(origin+href)).status()).toBe(200);await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://innbase.co'+href);
  const tabs=page.getByRole('tab');await expect(tabs).toHaveCount(3);await tabs.first().focus();await page.keyboard.press('ArrowRight');await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');
  await page.setViewportSize({width:320,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.setViewportSize({width:1440,height:1000});
 }
 const sitemap=await(await page.request.get(origin+'/sitemap.xml')).text();for(const href of hrefs)expect(sitemap).toContain('https://innbase.co'+href);
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
