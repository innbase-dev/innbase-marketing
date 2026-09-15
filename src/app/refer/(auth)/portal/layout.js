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

// Auth guard: this is the only place in the referral portal that must be
// reached with a signed-in Clerk session. Redirects to /refer/sign-in
// (configured on the ClerkProvider in the parent (auth) layout) otherwise.
export default async function PortalLayout({ children }) {
  await auth.protect();

  return <PortalShell>{children}</PortalShell>;
}
