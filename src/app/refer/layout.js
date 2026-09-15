import "./portal.css";
import PortalShell from "@/components/referral/PortalShell";

export const metadata = {
  title: {
    template: "%s | Innbase Referrals",
    default: "Referral Portal | Innbase",
  },
  robots: { index: false, follow: false },
};

export default function ReferLayout({ children }) {
  return <PortalShell>{children}</PortalShell>;
}
