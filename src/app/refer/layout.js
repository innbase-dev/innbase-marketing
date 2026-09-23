// Keep the public landing page outside authentication. Session and query
// providers belong in (auth)/layout.js, shared by sign-in, sign-up and portal.
export default function ReferralSectionLayout({ children }) {
  return children;
}
