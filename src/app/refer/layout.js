import { ClerkProvider } from "@clerk/nextjs";

// Clerk is scoped to the /refer subtree only — the public referral landing
// page, /refer/sign-in, /refer/sign-up, and the authenticated /refer/portal.
// The landing page itself renders Clerk's <Show>/<SignInButton>/<UserButton>
// to switch its CTA between "sign up" and "go to portal", so the provider
// has to sit here rather than deeper in the (auth) group.
//
// The main Innbase platform (hotel operations dashboard) never mounts this
// provider — it uses its own custom auth system entirely.
export default function ReferralSectionLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/refer/sign-in"
      signUpUrl="/refer/sign-up"
      signInFallbackRedirectUrl="/refer/portal"
      signUpFallbackRedirectUrl="/refer/portal"
    >
      {children}
    </ClerkProvider>
  );
}
