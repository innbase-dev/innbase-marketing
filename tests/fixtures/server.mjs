import { build } from 'esbuild';
import { randomUUID } from 'node:crypto';
import { workspace } from './workspace.mjs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

// Local component fixture only. It is never placed in src/app or public/.
const root = fileURLToPath(new URL('../../', import.meta.url));
const fixture = name => resolve(root, 'tests/fixtures', name);
const result = await build({
  entryPoints: [fixture('portal.jsx')], bundle: true, write: false, outdir: 'fixture-build',
  jsx: 'automatic', format: 'esm', platform: 'browser',
  define: { 'process.env.NODE_ENV': '"test"' },
  alias: { '@': resolve(root, 'src'), 'next/link': fixture('next-link.jsx'), 'next/navigation': fixture('next-navigation.js'), 'next/image': fixture('next-image.jsx'), '@clerk/nextjs': fixture('clerk.jsx') },
  loader: { '.woff2': 'file', '.js': 'jsx' }, logLevel: 'error',
});
const js = result.outputFiles.find(f => f.path.endsWith('.js')).contents;
const css = result.outputFiles.find(f => f.path.endsWith('.css')).contents;
const fontRoot = resolve(root, '.next/static/media');
// Reuse the exact fonts produced by the application build when available.
const { readdir } = await import('node:fs/promises');
const fontFiles = await readdir(fontRoot);
let fontCss = '';
const cssFiles = await readdir(resolve(root, '.next/static/css'));
for (const name of cssFiles) {
  const content = await readFile(resolve(root, '.next/static/css', name), 'utf8');
  fontCss += [...content.matchAll(/@font-face\{[^}]+\}/g)].map(m => m[0]).join('\n');
}
const sansName = fontCss.match(/font-family:([^;]+);[^}]*font-style:normal;[^}]*font-weight:400 700/)?.[1];
const serifName = fontCss.match(/font-family:([^;]+);[^}]*font-style:italic/)?.[1];
fontCss += `body {font-family:${sansName || 'Arial'},sans-serif} :root{--font-editorial:${serifName || 'Georgia'}}`;
const sessions = new Map();
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
const server = createServer(async (request, response) => {
  const cookies = Object.fromEntries((request.headers.cookie || '').split('; ').map(c=>c.split('=')));
  const url = new URL(request.url, 'http://localhost');
  const sessionId = cookies['qa-session'] || randomUUID();
  if (!sessions.has(sessionId)) sessions.set(sessionId, {scenario:url.searchParams.get('case') || '',calls:[],counts:{},users:{}});
  const session = sessions.get(sessionId);
  const user = cookies['qa-user'] || 'user_a';
  if (!session.users[user]) session.users[user] = workspace(user,session.scenario);
  const view = session.users[user];
  const send = (value,status=200) => { response.writeHead(status,{'content-type':'application/json','cache-control':'no-store'}); response.end(JSON.stringify(value)); };
  if (url.pathname === '/__fixture') { send(session); return; }
  // Controlled upstream for the REAL Next.js public token BFF tests. No
  // private API endpoints are exposed on this fixture's backend path.
  if (url.pathname === '/trpc/referrals.resolveReferralToken') {
    const input = JSON.parse(url.searchParams.get('input') || 'null');
    if (input?.referralToken === 'unavailable-token') {
      send({error:{message:'Service unavailable',code:-32603,data:{code:'INTERNAL_SERVER_ERROR',httpStatus:503}}},503);
    } else {
      send({result:{data:input?.referralToken === 'valid-token' ? {referrerId:'referrer-a'} : null}});
    }
    return;
  }
  if (url.pathname.startsWith('/refer/api/trpc/')) {
    const procedure = url.pathname.split('/').at(-1);
    let body=''; for await (const chunk of request) body+=chunk;
    const input = body ? JSON.parse(body) : JSON.parse(url.searchParams.get('input') || 'null');
    session.calls.push({procedure,input,user});
    const count = session.counts[procedure] = (session.counts[procedure] || 0)+1;
    const fail = (message,status=503) => send({error:{message,code:-32603,data:{code:status===403?'FORBIDDEN':'INTERNAL_SERVER_ERROR',httpStatus:status}}},status);
    if (procedure==='referrals.register') {
      if(session.scenario==='error-register' && count === 1) { fail('Registration temporarily unavailable'); return; }
      send({result:{data:{success:true,referrerId:view.referrerId,referralToken:view.referralToken}}}); return;
    }
    if (procedure==='referrals.portalWorkspace') {
      if(session.scenario==='error-workspace') { fail('Your session needs attention',403); return; }
      send({result:{data:session.scenario==='lag'&&count===1?null:view}}); return;
    }
    if (procedure==='referrals.resolveReferralToken') { send({result:{data:input?.referralToken==='valid-token'?{referrerId:'referrer-a'}:null}}); return; }
    if (procedure==='referrals.referHotel') {
      await delay(400);
      if(session.scenario==='refer-error' && count===1) {fail('Please try submitting again');return;}
      view.referrals.unshift({...workspace().referrals[3],referralId:`new-${count}`,businessDisplayName:input.businessDisplayName});view.referralCount++;
      send({result:{data:{success:true,referralId:`new-${count}`}}});return;
    }
    if (procedure==='referrals.requestWithdrawal') {
      await delay(500);
      if(session.scenario==='withdraw-error' && count===1) {fail('Bank verification is unavailable',403);return;}
      if(!view.canRequestWithdrawal) {fail('Nothing available to withdraw',403);return;}
      const amountMinor=view.availableMinor;view.availableMinor=0;view.pendingMinor=amountMinor;view.canRequestWithdrawal=false;
      view.rewards.forEach(r=>{if(r.status==='AVAILABLE')r.status='WITHDRAWAL_REQUESTED';});
      view.withdrawals.unshift({withdrawalId:`new-${count}`,amountMinor,status:'REQUESTED',bankName:input.beneficiary.bankName,maskedAccountNumber:'••••'+input.beneficiary.accountNumber.slice(-4),requestedAt:new Date().toISOString()});
      send({result:{data:{success:true,withdrawalId:`new-${count}`,amountMinor,rewardIds:['initial','bonus']}}});return;
    }
    fail('Unexpected fixture procedure',404);return;
  }

  const path = new URL(request.url, 'http://localhost').pathname;
  if (path.endsWith('/portal.js')) { response.setHeader('Content-Type', 'text/javascript'); response.end(js); }
  else if (path.endsWith('/portal.css')) { response.setHeader('Content-Type', 'text/css'); response.end(css); }
  else if (path === '/fonts.css') { response.setHeader('Content-Type', 'text/css'); response.end(fontCss); }
  else if (path.includes('/media/')) {
    const name = path.split('/').at(-1);
    if (!fontFiles.includes(name)) { response.writeHead(404); response.end(); return; }
    response.setHeader('Content-Type','font/woff2'); response.end(await readFile(resolve(fontRoot,name)));
  }
  else if (path.startsWith('/images/')) { response.writeHead(404); response.end(); }
  else { response.setHeader('Set-Cookie',`qa-session=${sessionId}; Path=/; SameSite=Lax`); response.setHeader('Content-Type','text/html'); response.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Referral component fixture</title><link rel="stylesheet" href="/portal.css"><link rel="stylesheet" href="/fonts.css"></head><body><div id="root"></div><script type="module" src="/portal.js"></script></body></html>'); }
});
server.listen(3036,'127.0.0.1');
