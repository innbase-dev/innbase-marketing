import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In | Innbase Referrals",
  robots: { index: false, follow: false },
};

export default function ReferralSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn path="/refer/sign-in" signUpUrl="/refer/sign-up" fallbackRedirectUrl="/refer/portal" />
    </div>
  );
}
