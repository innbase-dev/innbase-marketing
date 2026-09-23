import test from 'node:test';
import assert from 'node:assert/strict';
import { createReferralProxy } from '../../src/lib/referralProxy.js';
import { createReferralRequest } from '../../src/lib/referralRequests.js';
import { preferenceKey, parsePreference, validBeneficiary } from '../../src/lib/referralStorage.js';
import { nairaFormat, formatDate, referralCounts } from '../../src/data/referralPortalData.js';
import { initializeConsentManager } from '../../src/lib/consent.js';

const bank={bankName:'Example Bank',accountNumber:'0123456789',accountName:'Ada Okafor'};
const post=(path='referrals.referHotel',options={})=>new Request(`https://innbase.co/refer/api/trpc/${path}`,{method:'POST',headers:{'content-type':'application/json',origin:'https://innbase.co',...options.headers},body:options.body??'{}'});
const context=(path='referrals.referHotel')=>({params:Promise.resolve({trpc:[path]})});
const response=()=>Response.json({result:{data:{success:true}}});
function fixture(options={}) {const calls=[];return {calls,proxy:createReferralProxy({getIdentityHeaders:async()=>({authorization:'Bearer verified-token'}),getBaseUrl:()=> 'https://api.example.test',fetchUpstream:async(...args)=>{calls.push(args);return response();},...options})};}

test('forwards only verified identity, never caller dev headers or cookies',async()=>{
 const {proxy,calls}=fixture();const result=await proxy(post(undefined,{headers:{'x-dev-clerk-user-id':'attacker',cookie:'secret'}}),context());
 assert.equal(result.status,200);assert.equal(calls[0][1].headers.authorization,'Bearer verified-token');assert.equal(calls[0][1].headers['x-dev-clerk-user-id'],undefined);assert.equal(calls[0][1].headers.cookie,undefined);assert.equal(result.headers.get('cache-control'),'private, no-store');assert.equal(calls[0][1].redirect,'manual');
});
test('private calls fail closed without session; public token lookup does not call auth',async()=>{
 const {proxy,calls}=fixture({getIdentityHeaders:async()=>null});assert.equal((await proxy(post(),context())).status,401);assert.equal(calls.length,0);
 const pub=fixture({getIdentityHeaders:async()=>{throw Error('must not run');}});assert.equal((await pub.proxy(new Request('https://innbase.co/refer/api/trpc/referrals.resolveReferralToken?input=%7B%7D'),context('referrals.resolveReferralToken'))).status,200);
});
test('unknown procedures, nested routes, batching and wrong verbs are rejected before forwarding',async()=>{
 for(const [request,ctx,status] of [[post('sales.complete'),context('sales.complete'),404],[post(),{params:{trpc:['..','sales.complete']}},404],[new Request('https://innbase.co/refer/api/trpc/referrals.portalWorkspace?batch=1'),context('referrals.portalWorkspace'),400],[post('referrals.portalWorkspace'),context('referrals.portalWorkspace'),405]]){
  const {proxy,calls}=fixture();assert.equal((await proxy(request,ctx)).status,status);assert.equal(calls.length,0);
 }
});
test('cross-site and cross-origin mutations are blocked',async()=>{
 for(const headers of [{origin:'https://evil.example'},{'sec-fetch-site':'cross-site'}]){
  const {proxy,calls}=fixture();assert.equal((await proxy(post(undefined,{headers}),context())).status,403);assert.equal(calls.length,0);
 }
});
test('JSON media type, syntax and streaming body limit are enforced',async()=>{
 for(const [options,status] of [[{headers:{'content-type':'text/plain'}},415],[{body:'{'},400],[{body:'x'.repeat(65537)},413]]){
  const {proxy,calls}=fixture();assert.equal((await proxy(post(undefined,options),context())).status,status);assert.equal(calls.length,0);
 }
});
test('configuration and Clerk outages produce useful tRPC envelopes',async()=>{
 for(const options of [{getBaseUrl:()=>undefined},{getBaseUrl:()=> 'https://api.example.test/trpc'},{getIdentityHeaders:async()=>{throw Error('sensitive detail');}}]){
  const {proxy}=fixture(options);const result=await proxy(post(),context());const json=await result.json();assert.equal(result.status,503);assert.equal(json.error.data.httpStatus,503);assert.doesNotMatch(JSON.stringify(json),/sensitive detail/);
 }
});
test('upstream failures, HTML and redirects are surfaced without silently succeeding',async()=>{
 for(const [fetchUpstream,status] of [[async()=>{throw Error('offline');},502],[async()=>new Response('<html>bad gateway</html>',{status:502}),502],[async()=>new Response(null,{status:307,headers:{location:'https://evil.example'}}),502],[async()=>{throw new DOMException('timeout','TimeoutError');},504]]){
  const {proxy}=fixture({fetchUpstream});assert.equal((await proxy(post(),context())).status,status);
 }
});
test('upstream validation status and safe error envelope survive the proxy',async()=>{
 const {proxy}=fixture({fetchUpstream:async()=>Response.json({error:{message:'Account number must be 10 digits.',code:-32600,data:{code:'BAD_REQUEST',httpStatus:400}}},{status:400})});const r=await proxy(post(),context());assert.equal(r.status,400);assert.match((await r.json()).error.message,/10 digits/);
});
test('one pending mutation; a failed response reuses the same idempotency key',async()=>{
 const payloads=[];let release;const request=createReferralRequest(async payload=>{payloads.push(payload);await new Promise(r=>{release=r;});if(payloads.length===1)throw Error('lost response');return {success:true,amountMinor:2_000_000};},()=> 'stable-key');
 const first=request({beneficiary:bank});assert.equal(request({beneficiary:bank}),first);await Promise.resolve();release();await assert.rejects(first);
 const retry=request({beneficiary:bank});await Promise.resolve();release();assert.equal((await retry).amountMinor,2_000_000);assert.equal(payloads[0].idempotencyKey,payloads[1].idempotencyKey);
});
test('new successful operations receive fresh keys and unconfirmed results are not successes',async()=>{
 let seq=0;const keys=[];const request=createReferralRequest(async payload=>{keys.push(payload.idempotencyKey);return {success:true};},()=>String(++seq));await request({hotel:'A'});await request({hotel:'A'});assert.deepEqual(keys,['1','2']);await assert.rejects(createReferralRequest(async()=>({success:false}))({}));
});
test('bank preferences cannot leak through a shared key or malformed storage',()=>{
 assert.notEqual(preferenceKey('user_a','beneficiary'),preferenceKey('user_b','beneficiary'));assert.equal(preferenceKey(null,'beneficiary'),null);assert.equal(parsePreference('{','beneficiary'),null);assert.equal(parsePreference('{"accountNumber":123}','beneficiary'),null);assert.deepEqual(parsePreference('["one",null,123,"two"]','dismissed'),['one','two']);assert.equal(validBeneficiary(bank),true);assert.equal(validBeneficiary({...bank,accountNumber:'123'}),false);
});
test('money stays in minor units and invalid values do not become misleading totals',()=>{
 assert.equal(nairaFormat(2_000_000),'₦20,000');assert.equal(nairaFormat(125),'₦1.25');assert.equal(nairaFormat(null),'—');assert.equal(nairaFormat(NaN),'—');assert.equal(formatDate('broken'),'—');assert.equal(referralCounts([{lifecycle:'RETAINED'},{lifecycle:'TRIAL'},{lifecycle:'DISQUALIFIED'}]).paying,1);
});
test('consent handles a missing script and only initializes a loaded manager once',()=>{
 assert.equal(initializeConsentManager({}),false);let count=0;const scope={silktideConsentManager:{init:()=>count++}};assert.equal(initializeConsentManager(scope),true);initializeConsentManager(scope);assert.equal(count,1);
});
