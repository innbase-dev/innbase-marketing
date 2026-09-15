import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk is scoped exclusively to the /refer section (public landing page,
// /refer/sign-in, /refer/sign-up, and the authenticated /refer/portal). The
// main Innbase platform runs its own custom auth and must never be touched
// by this proxy. Route-level protection itself lives in
// `src/app/refer/(auth)/portal/layout.js` via `auth.protect()` (Clerk's
// current resource-based guard pattern), so this file only needs to make
// Clerk's request context available across the /refer subtree.
export default clerkMiddleware();

export const config = {
  matcher: ["/refer/:path*"],
};
