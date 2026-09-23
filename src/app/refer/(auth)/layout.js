import { ClerkProvider } from "@clerk/nextjs";
import ReferralsTrpcProvider from "@/components/referral/ReferralsTrpcProvider";

// Only sign-in, sign-up and portal pages need session/query providers.
// The public /refer page must also render when Clerk is unavailable.
export default function ReferralAuthLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/refer/sign-in"
      signUpUrl="/refer/sign-up"
      signInFallbackRedirectUrl="/refer/portal"
      signUpFallbackRedirectUrl="/refer/portal"
    >
      <ReferralsTrpcProvider>{children}</ReferralsTrpcProvider>
    </ClerkProvider>
  );
}
