"use client";

import Link from "next/link";

export default function MobileMenu({ open, onClose, pathname }) {
  const isCurrent = (path) => pathname === path;

  return (
    <div
      className={`mobile-menu${open ? " open" : ""}`}
      hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.closest("a")) onClose();
      }}
    >
      <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site menu">
        <span className="mobile-menu-label">Product</span>
        <Link href="/#product">How it works</Link>
        <Link href="/#demo">Try the live demo</Link>
        <Link href="/#reconciliation">Why it&apos;s trustworthy</Link>
        <span className="mobile-menu-label">Company</span>
        <Link href="/about" className={isCurrent("/about") ? "current" : undefined}>
          About
        </Link>
        <Link href="/#stories">Customers</Link>
        <Link href="/pricing" className={isCurrent("/pricing") ? "current" : undefined}>
          Pricing
        </Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/legal" className={isCurrent("/legal") ? "current" : undefined}>
          Legal
        </Link>
        <Link href="/contact" className={isCurrent("/contact") ? "current" : undefined}>
          Contact
        </Link>
        <div className="mm-cta-row">
          <Link href="/auth" className="btn btn-ghost-dark">
            Log in
          </Link>
          <Link href="/#cta" className="btn btn-brass">
            Book a demo
          </Link>
        </div>
      </div>
    </div>
  );
}
