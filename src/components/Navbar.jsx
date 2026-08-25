"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import ProductMegaMenu from "./ProductMegaMenu";
import CompanyDropdown from "./CompanyDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 10);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("menu-locked", mobileOpen);
    }, [mobileOpen]);

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [mobileOpen]);

    const isCurrent = (path) => pathname === path;

    return (
        <>
            <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
                <div className="nav-inner">
                    <Link
                        href="/"
                        className="nav-wordmark"
                        aria-label="Innbase home"
                    >
                        <Image
                            src="/images/innbase-light.svg"
                            alt="Innbase"
                            width={132}
                            height={28}
                            priority
                        />
                    </Link>

                    <div className="nav-links">
                        <ProductMegaMenu />
                        <Link href="/#product">How it works</Link>
                        <CompanyDropdown />
                        <Link
                            href="/pricing"
                            className={
                                isCurrent("/pricing") ? "current" : undefined
                            }
                            aria-current={
                                isCurrent("/pricing") ? "page" : undefined
                            }
                        >
                            Pricing
                        </Link>
                        <Link href="/#faq">FAQ</Link>
                    </div>

                    <div className="nav-actions">
                        <Link
                            href="/auth"
                            className="btn btn-ghost-dark btn-sm"
                        >
                            Log in
                        </Link>
                        <Link href="/contact" className="btn btn-brass btn-sm">
                            Book a Demo
                        </Link>
                    </div>

                    <button
                        className="nav-mobile-btn"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobileMenu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <Icon
                            name={mobileOpen ? "x" : "menu"}
                            className="icon"
                        />
                    </button>
                </div>
            </nav>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                pathname={pathname}
            />
        </>
    );
}
