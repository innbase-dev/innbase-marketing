"use client";

import Link from "next/link";
import { COMPANY_MENU_ITEMS } from "@/data/companyMenuData";

export default function MobileMenu({ open, onClose, pathname }) {
    const isCurrent = (path) => pathname === path;

    return (
        <div
            className={`mobile-menu${open ? " open" : ""}`}
            hidden={!open}
            onClick={(e) => {
                if (e.target === e.currentTarget || e.target.closest("a"))
                    onClose();
            }}
        >
            <div
                className="mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
            >
                <span className="mobile-menu-label">Product</span>
                <Link href="/#product">How it works</Link>
                <Link href="/#demo">Try the live demo</Link>
                <Link href="/#reconciliation">Why it&apos;s trustworthy</Link>
                <span className="mobile-menu-label">Company</span>
                {COMPANY_MENU_ITEMS.map((item) => (
                    <Link
                        href={item.href}
                        key={item.key}
                        className={isCurrent(item.href) ? "current" : undefined}
                    >
                        {item.title}
                    </Link>
                ))}
                <Link
                    href="/pricing"
                    className={isCurrent("/pricing") ? "current" : undefined}
                >
                    Pricing
                </Link>
                <Link href="/#faq">FAQ</Link>
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
