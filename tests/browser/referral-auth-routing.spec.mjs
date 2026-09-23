import { test, expect } from '@playwright/test';

// Actual Next.js layouts and Clerk middleware with a signed-out request.
// Synthetic configuration permits local routing checks, not live sign-in.
const origin = 'http://localhost:3037';

test('every portal page still sends a signed-out visitor to the local sign-in page', async ({ request }) => {
  for (const suffix of ['', '/account', '/help', '/referrals', '/referrals/example', '/rewards']) {
    const path = `/refer/portal${suffix}`;
    const response = await request.get(origin + path, {
      maxRedirects: 0,
      headers: { accept: 'text/html' },
    });
    expect(response.status(), path).toBe(307);
    const destination = new URL(response.headers().location);
    expect(destination.origin + destination.pathname).toBe(`${origin}/refer/sign-in`);
    expect(destination.searchParams.get('redirect_url')).toBe(origin + path);
  }

  for (const path of ['/refer/sign-in', '/refer/sign-up']) {
    const response = await request.get(origin + path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(await response.text()).toContain('Innbase Referrals');
  }
});

test('all five private referral procedures reject a missing session', async ({ request }) => {
  for (const [procedure, method] of [
    ['register', 'POST'],
    ['portalWorkspace', 'GET'],
    ['referralDetail', 'GET'],
    ['referHotel', 'POST'],
    ['requestWithdrawal', 'POST'],
  ]) {
    const response = await request.fetch(`${origin}/refer/api/trpc/referrals.${procedure}`, {
      method,
      maxRedirects: 0,
      ...(method === 'POST' ? { data: {}, headers: { origin } } : {}),
    });
    expect(response.status(), procedure).toBe(401);
    expect((await response.json()).error.data.code).toBe('UNAUTHORIZED');
  }
});
