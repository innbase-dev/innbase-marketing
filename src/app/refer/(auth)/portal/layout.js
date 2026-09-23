import "./portal.css";
import { auth } from "@clerk/nextjs/server";
import PortalShell from "@/components/referral/PortalShell";

export const metadata = {
  title: {
    template: "%s | Innbase Referrals",
    default: "Referral Portal | Innbase",
  },
  robots: { index: false, follow: false },
};

// This is a per-user authenticated dashboard — there's no valid static HTML
// for it, and prerendering it at build time makes auth.protect() run with
// no real request (no cookies/session), which fails and skips rendering
// <PortalShell>/<PortalProvider> underneath. Force this whole segment to
// render per-request instead.
export const dynamic = "force-dynamic";

// Auth guard: this is the only place in the referral portal that must be
// reached with a signed-in Clerk session. Redirects to /refer/sign-in
// (configured in src/proxy.ts) otherwise.
export default async function PortalLayout({ children }) {
  await auth.protect();

  return <PortalShell>{children}</PortalShell>;
}
