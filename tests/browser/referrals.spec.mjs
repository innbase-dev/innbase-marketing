import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const fixtureState = async page => (await page.request.get('/__fixture')).json();
const openPortal = async (page,path='',scenario='') => {await page.goto(`/refer/portal${path}${scenario?`?case=${scenario}`:''}`);await expect(page.locator('main h1')).toBeVisible();};
async function bankFields(page) {await page.getByLabel('Bank name',{exact:true}).fill('Example Bank');await page.getByLabel('Account number',{exact:true}).fill('0123456789');await page.getByLabel('Account name',{exact:true}).fill('Adanna Okafor');}

test('registration failure is visible and retry registers before fetching the workspace',async({page})=>{
 await page.goto('/refer/portal?case=error-register');await expect(page.getByRole('alert')).toContainText('Registration temporarily unavailable');
 await page.getByRole('button',{name:'Try again'}).click();await expect(page.getByRole('heading',{name:'Welcome, Adanna'})).toBeVisible();
 const data=await fixtureState(page);expect(data.calls.findIndex(c=>c.procedure==='referrals.portalWorkspace')).toBeGreaterThan(1);
});
test('workspace failure is not an endless loading screen',async({page})=>{
 await page.goto('/refer/portal?case=error-workspace');await expect(page.getByRole('alert')).toContainText('Your session needs attention');await expect(page.getByRole('button',{name:'Try again'})).toBeEnabled();
});
test('eventually consistent workspace becomes visible without a manual reload',async({page})=>{
 await page.goto('/refer/portal?case=lag');await expect(page.getByRole('heading',{name:'Preparing your referral portal'})).toBeVisible();await expect(page.getByRole('heading',{name:'Welcome, Adanna'})).toBeVisible({timeout:10000});
});
test('overview uses API balances and dismissal removes the earned bonus',async({page})=>{
 await openPortal(page);await expect(page.locator('.pf-stat').filter({hasText:'Total earned'})).toContainText('₦60,000');await expect(page.locator('.pf-stat').filter({hasText:'Available to withdraw'})).toContainText('₦40,000');await expect(page.locator('.pf-surprise')).toContainText('Palm House');await page.getByRole('button',{name:'Dismiss'}).click();await expect(page.locator('.pf-surprise')).toHaveCount(0);
});
test('filters, details and unknown referral remain accessible',async({page})=>{
 await openPortal(page,'/referrals');await page.getByRole('button',{name:'Successful',exact:true}).click();await expect(page.locator('.pf-row-link')).toHaveCount(2);await expect(page.getByRole('button',{name:'Successful',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.locator('.pf-row-link').filter({hasText:'Royal Suites'}).click();await expect(page.getByRole('heading',{name:'Royal Suites'})).toBeVisible();await expect(page.locator('.pf-timeline')).toContainText('Became a paying customer');
 await page.goto('/refer/portal/referrals/missing');await expect(page.getByText('Referral not found',{exact:true})).toBeVisible();
});
test('empty and suspended accounts expose no invalid withdrawal or referral action',async({page})=>{
 await openPortal(page,'/rewards','empty');await expect(page.getByRole('button',{name:'Withdraw ₦0',exact:true})).toBeDisabled();
 await page.goto('/refer/portal?case=suspended'); // new fixture scenario requires a new session
 await page.context().clearCookies();await page.goto('/refer/portal?case=suspended');await expect(page.getByRole('heading',{name:'Welcome, Adanna'})).toBeVisible();await expect(page.getByRole('button',{name:'Refer a hotel',exact:true})).toHaveCount(0);
 await page.getByRole('link',{name:'Rewards',exact:true}).click();await expect(page.getByRole('button',{name:'Withdraw ₦40,000',exact:true})).toBeDisabled();
});
test('referral modal traps focus, closes on Escape, restores focus and resets drafts',async({page})=>{
 await openPortal(page);const trigger=page.getByRole('button',{name:'Refer a hotel',exact:true}).first();await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByLabel('Hotel name',{exact:true}).fill('Unsaved Hotel');for(let i=0;i<13;i++)await page.keyboard.press('Tab');expect(await page.evaluate(()=>Boolean(document.activeElement.closest('[role="dialog"]')))).toBe(true);
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused();await trigger.click();await expect(page.getByLabel('Hotel name',{exact:true})).toHaveValue('');
});
test('link and WhatsApp use innbase.co; failed clipboard leaves a selectable link',async({page})=>{
 await openPortal(page);await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw Error('denied');}},configurable:true}));await page.getByRole('button',{name:'Refer a hotel',exact:true}).first().click();
 await expect(page.getByLabel('Your referral link')).toHaveValue('https://innbase.co/refer?ref=token-user_a');await expect(page.getByRole('link',{name:'Share on WhatsApp'})).toHaveAttribute('href',/https%3A%2F%2Finnbase.co%2Frefer%3Fref%3Dtoken-user_a/);
 await page.getByRole('button',{name:'Copy link',exact:true}).click();await expect(page.getByRole('status')).toContainText('Select and copy');await expect(page.getByLabel('Your referral link')).toBeFocused();
});
test('referral submission handles rejection, reuses idempotency and blocks accidental close',async({page})=>{
 let release;const gate=new Promise(resolve=>{release=resolve;});await page.route('**/refer/api/trpc/referrals.referHotel',async route=>{await gate;await route.continue();});
 await openPortal(page,'','refer-error');await page.getByRole('button',{name:'Refer a hotel',exact:true}).first().click();await page.getByLabel('Hotel name',{exact:true}).fill('New Coastal Hotel');
 await page.getByRole('button',{name:'Submit referral',exact:true}).click();await expect(page.getByRole('button',{name:'Submitting…'})).toBeDisabled();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeVisible();release();await expect(page.getByRole('alert')).toContainText('Please try submitting again');
 await page.getByRole('button',{name:'Submit referral',exact:true}).click();await expect(page.getByRole('status').filter({hasText:'New Coastal Hotel'})).toBeVisible();
 const calls=(await fixtureState(page)).calls.filter(c=>c.procedure==='referrals.referHotel');expect(calls).toHaveLength(2);expect(calls[0].input.idempotencyKey).toBe(calls[1].input.idempotencyKey);
 await page.getByRole('button',{name:'Close',exact:true}).click();await expect(page.locator('.pf-row-link').filter({hasText:'New Coastal Hotel'})).toBeVisible();
});
test('withdrawal validates bank details, prevents duplicate requests, and uses the server amount',async({page})=>{
 await openPortal(page,'/rewards');await page.getByRole('button',{name:'Withdraw ₦40,000',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();expect((await fixtureState(page)).calls.filter(c=>c.procedure==='referrals.requestWithdrawal')).toHaveLength(0);
 await bankFields(page);await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('₦40,000');
 await page.getByRole('button',{name:'Confirm withdrawal',exact:true}).click();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('heading',{name:'Withdrawal requested',exact:true})).toBeVisible();await expect(page.getByRole('status')).toContainText('₦40,000');
 const calls=(await fixtureState(page)).calls.filter(c=>c.procedure==='referrals.requestWithdrawal');expect(calls).toHaveLength(1);expect(calls[0].input.beneficiary.accountNumber).toBe('0123456789');expect(calls[0].input).not.toHaveProperty('amountMinor');
 await page.getByRole('button',{name:'Done',exact:true}).click();await expect(page.getByRole('button',{name:'Withdraw ₦0',exact:true})).toBeDisabled();
});
test('rejected withdrawal preserves the confirmation and retry key',async({page})=>{
 await openPortal(page,'/rewards','withdraw-error');await page.getByRole('button',{name:'Withdraw ₦40,000',exact:true}).click();await bankFields(page);await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Confirm withdrawal',exact:true}).click();await expect(page.getByRole('alert')).toContainText('Bank verification is unavailable');await expect(page.getByRole('heading',{name:'Withdrawal requested'})).toHaveCount(0);
 await page.getByRole('button',{name:'Confirm withdrawal',exact:true}).click();await expect(page.getByRole('heading',{name:'Withdrawal requested'})).toBeVisible();const calls=(await fixtureState(page)).calls.filter(c=>c.procedure==='referrals.requestWithdrawal');expect(calls[0].input.idempotencyKey).toBe(calls[1].input.idempotencyKey);
});
test('bank details can be managed with zero rewards and switching accounts clears cached data',async({page})=>{
 await openPortal(page,'/account','empty');await page.getByRole('button',{name:'Add bank account'}).click();await bankFields(page);await page.getByRole('button',{name:'Save bank details'}).click();await expect(page.getByText('····6789',{exact:true})).toBeVisible();
 await page.evaluate(()=>{document.cookie='qa-user=user_b; Path=/';dispatchEvent(new Event('fixture-user'));});await expect(page.getByText('Bola Ade',{exact:true})).toBeVisible();await expect(page.getByText('Adanna Okafor',{exact:true})).toHaveCount(0);await expect(page.getByText('····6789',{exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'Add bank account'})).toBeVisible();
});
test('malformed stored bank details do not crash the account page; failed sign-out is recoverable',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('innbase:referrals:user_a:beneficiary','{"accountNumber":123}');localStorage.setItem('innbase_referrer_beneficiary',JSON.stringify({bankName:'Wrong User Bank',accountName:'Wrong Person',accountNumber:'9999999999'}));});
 await page.goto('/refer/portal/account?signout=fail');await expect(page.getByRole('button',{name:'Add bank account'})).toBeVisible();await expect(page.getByText('Wrong User Bank')).toHaveCount(0);await page.getByRole('button',{name:'Sign out',exact:true}).click();await expect(page.getByRole('alert')).toContainText('We could not sign you out');await expect(page.getByRole('button',{name:'Sign out',exact:true})).toBeEnabled();
});
test('valid public token is retained without creating a referral',async({page})=>{
 await page.goto('/refer?ref=valid-token');await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem('innbase_referral_token'))).toBe('valid-token');expect((await fixtureState(page)).calls.every(c=>c.procedure==='referrals.resolveReferralToken')).toBe(true);
});
for(const width of [320,390,768,1440]) test(`all portal pages and dialogs fit a ${width}px viewport`,async({page})=>{
 await page.setViewportSize({width,height:950});await openPortal(page,'','long');
 for(const path of ['','/referrals','/referrals/user_a-paid','/rewards','/account','/help']){
  await page.goto(`/refer/portal${path}`);await expect(page.locator('main h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.goto('/refer/portal');await page.getByRole('button',{name:'Refer a hotel',exact:true}).first().click();await expect(page.getByRole('dialog')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('portal pages and both dialogs have no serious accessibility violations',async({page})=>{
 await openPortal(page);for(const path of ['','/referrals','/rewards','/account','/help']){
  await page.goto(`/refer/portal${path}`);await expect(page.locator('main h1')).toBeVisible();const result=await new AxeBuilder({page}).analyze();expect(result.violations.filter(v=>['serious','critical'].includes(v.impact))).toEqual([]);
 }
 await page.goto('/refer/portal');await page.getByRole('button',{name:'Refer a hotel',exact:true}).first().click();let result=await new AxeBuilder({page}).analyze();expect(result.violations.filter(v=>['serious','critical'].includes(v.impact))).toEqual([]);await page.keyboard.press('Escape');
 await page.goto('/refer/portal/rewards');await page.getByRole('button',{name:'Withdraw ₦40,000',exact:true}).click();result=await new AxeBuilder({page}).analyze();expect(result.violations.filter(v=>['serious','critical'].includes(v.impact))).toEqual([]);
});

test('expired client session removes the old workspace and offers sign-in',async({page})=>{
 await openPortal(page);await page.evaluate(()=>{document.cookie='qa-user=signedout; Path=/';dispatchEvent(new Event('fixture-user'));});await expect(page.getByRole('alert')).toContainText('Your session has ended');await expect(page.getByRole('link',{name:'Sign in again'})).toHaveAttribute('href','/refer/sign-in');await expect(page.getByRole('heading',{name:'Welcome, Adanna'})).toHaveCount(0);
});
