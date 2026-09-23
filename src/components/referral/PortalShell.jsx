"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PortalProvider, usePortal } from "./PortalContext";
import ReferModal from "./ReferModal";

const TABS = [
  { href: "/refer/portal", label: "Overview" },
  { href: "/refer/portal/referrals", label: "Referrals" },
  { href: "/refer/portal/rewards", label: "Rewards" },
];

function ReferralDialog() {
  const { referModalOpen } = usePortal();
  return referModalOpen ? <ReferModal /> : null;
}

function TopBar() {
  const [logoFailed, setLogoFailed] = useState(false);
  return (
    <header className="pf-topbar">
      <div className="pf-topbar-inner">
        <Link href="/refer/portal" className="pf-topbar-brand">
          {logoFailed ? <span>Innbase</span> : <Image src="/images/innbase-light.svg" alt="Innbase" width={96} height={24} priority onError={() => setLogoFailed(true)} />}
        </Link>
        <nav className="pf-topbar-links" aria-label="Account and help">
          <Link href="/refer/portal/help">Help</Link>
          <Link href="/refer/portal/account">Account</Link>
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
          const current = t.href === "/refer/portal" ? pathname === "/refer/portal" : pathname.startsWith(t.href);
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
  const { openReferModal, canCreateReferrals } = usePortal();
  if (!canCreateReferrals) return null;
  return (
    <div className="pf-sticky-cta">
      <button type="button" className="pf-btn pf-btn-primary" onClick={openReferModal}>
        Refer a hotel
      </button>
    </div>
  );
}

/**
 * Centralizes the loading/error states every portal page would
 * otherwise have to check individually. `workspace` is undefined until
 * both registration and the first workspace fetch complete; page
 * components below this gate can assume it is present.
 */
function PortalGate({ children }) {
  const { isLoading, isError, error, workspace, refetch, requiresSignIn } = usePortal();

  if (isLoading) {
    return (
      <div className="pf-empty" role="status" aria-live="polite">
        <p>Loading your referral portal…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pf-empty" role="alert">
        <p>We couldn&apos;t load your referral portal.</p>
        <p>{error?.message ?? "Please try again."}</p>
        <div style={{ marginTop: 18 }}>
          <>{requiresSignIn ? <Link href="/refer/sign-in" className="pf-btn pf-btn-outline">Sign in again</Link> : <button type="button" className="pf-btn pf-btn-outline" onClick={() => refetch()}>Try again</button>}</>
        </div>
      </div>
    );
  }

  if (!workspace) return <div className="pf-empty" role="status"><h1>Preparing your referral portal</h1><p>Your account is saved. Your details will appear shortly.</p><button className="pf-btn pf-btn-outline" onClick={() => refetch()}>Check again</button></div>;

  return children;
}

export default function PortalShell({ children }) {
  return (
    <PortalProvider>
      <div className="pf">
        <div className="pf-shell">
          <TopBar />
          <Tabs />
          <main className="pf-main" id="main">
            <div className="pf-container">
              <PortalGate>{children}</PortalGate>
            </div>
          </main>
          <StickyReferCta />
        </div>
        <ReferralDialog />
      </div>
    </PortalProvider>
  );
}
