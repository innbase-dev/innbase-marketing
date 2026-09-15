import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up | Innbase Referrals",
  robots: { index: false, follow: false },
};

export default function ReferralSignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp path="/refer/sign-up" signInUrl="/refer/sign-in" fallbackRedirectUrl="/refer/portal" />
    </div>
  );
}
