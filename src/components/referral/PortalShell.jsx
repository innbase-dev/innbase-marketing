"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PortalProvider, usePortal } from "./PortalContext";
import ReferModal from "./ReferModal";

const TABS = [
  { href: "/refer", label: "Overview" },
  { href: "/refer/referrals", label: "Referrals" },
  { href: "/refer/rewards", label: "Rewards" },
];

function TopBar() {
  return (
    <header className="pf-topbar">
      <div className="pf-topbar-inner">
        <Link href="/refer" className="pf-topbar-brand">
          <Image src="/images/innbase-light.svg" alt="Innbase" width={96} height={24} priority />
        </Link>
        <nav className="pf-topbar-links">
          <Link href="/refer/help">Help</Link>
          <Link href="/refer/account">Account</Link>
        </nav>
      </div>
    </header>
  );
}

function Tabs() {
  const pathname = usePathname();
  return (
    <div className="pf-tabs">
      <nav className="pf-tabs-inner" aria-label="Referral portal sections">
        {TABS.map((t) => {
          const current = t.href === "/refer" ? pathname === "/refer" : pathname.startsWith(t.href);
          return (
            <Link key={t.href} href={t.href} className="pf-tab" aria-current={current ? "page" : undefined}>
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function StickyReferCta() {
  const { openReferModal } = usePortal();
  return (
    <div className="pf-sticky-cta">
      <button type="button" className="pf-btn pf-btn-primary" onClick={openReferModal}>
        Refer a hotel
      </button>
    </div>
  );
}

export default function PortalShell({ children }) {
  return (
    <PortalProvider>
      <div className="pf">
        <div className="pf-shell">
          <TopBar />
          <Tabs />
          <main className="pf-main" id="main">
            <div className="pf-container">{children}</div>
          </main>
          <StickyReferCta />
        </div>
        <ReferModal />
      </div>
    </PortalProvider>
  );
}
