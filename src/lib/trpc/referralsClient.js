"use client";

import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";

/**
 * The Referrals-backend tRPC client, scoped to the /refer subtree only.
 *
 * There is no shared type package between this marketing repo and the
 * Innbase API repo, so this is intentionally untyped (`createTRPCReact()`
 * with no generic) rather than importing a cross-repo AppRouter type that
 * doesn't exist here. Procedure names below must match
 * `referrals.router.ts` on the backend exactly:
 *   register, portalWorkspace, referralDetail, referHotel,
 *   requestWithdrawal, resolveReferralToken.
 *
 * IMPORTANT: this points at `/refer/api/trpc`, a same-origin Next.js
 * Route Handler (see src/app/refer/api/trpc/[...trpc]/route.js) -- never
 * directly at the Innbase API's origin. The backend's CORS policy is
 * `credentials: false` (see api/src/main.ts), so a cross-origin browser
 * request could never carry the Clerk session cookie anyway. The proxy
 * is what turns a verified server-side Clerk session into the identity
 * headers the backend's ReferrerIdentityPort expects, and it is the only
 * place INNBASE_API_URL is read -- that value never reaches the browser
 * bundle.
 */
export const trpc = createTRPCReact();

export function createReferralsTrpcClient() {
  return trpc.createClient({
    links: [
      httpLink({
        url: "/refer/api/trpc",
        // Batching is deliberately off. The proxy forwards one HTTP
        // request to one backend procedure; teaching it to also unpack
        // tRPC's batch envelope would roughly double the surface of a
        // component whose only job is to attach an identity header.
        // Portal page load volume (a handful of calls) does not need it.
      }),
    ],
  });
}
