import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

const referralAuth = clerkMiddleware({
  // Server redirects cannot read the props on the React ClerkProvider.
  signInUrl: "/refer/sign-in",
  signUpUrl: "/refer/sign-up",
});

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  // This read-only lookup is already public in the BFF and backend. Let it
  // resolve attribution without a Clerk session or a sign-in handshake.
  if (request.nextUrl.pathname === "/refer/api/trpc/referrals.resolveReferralToken") {
    return NextResponse.next();
  }

  // Portal pages still use auth.protect(); private API procedures verify
  // identity independently. The public landing page does not match below.
  return referralAuth(request, event);
}

export const config = {
  matcher: [
    "/refer/portal/:path*",
    "/refer/sign-in/:path*",
    "/refer/sign-up/:path*",
    "/refer/api/:path*",
  ],
};
