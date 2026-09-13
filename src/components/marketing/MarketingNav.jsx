"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { NAV_GROUPS } from "./navigation";
import { Button } from "./Primitives";

export default function MarketingNav() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const triggers = useRef({});
  const pathname = usePathname();
  function close() { setOpen(null); setMobile(false); }

  useEffect(() => {
    function outside(event) { if (!root.current?.contains(event.target)) close(); }
    function escape(event) {
      if (event.key !== "Escape") return;
      if (open) { setOpen(null); triggers.current[open]?.focus(); }
      else if (mobile) { setMobile(false); toggle.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    const media = window.matchMedia("(min-width: 1001px)");
    function resize() { close(); }
    media.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); media.removeEventListener("change", resize); };
  }, [open, mobile]);

  function group(item) {
    return <div className="ib-nav-group" key={item.id}>
      <button type="button" className="ib-nav-trigger" ref={el => { triggers.current[item.id] = el; }} aria-expanded={open === item.id} aria-controls={`ib-menu-${item.id}`} onClick={() => setOpen(open === item.id ? null : item.id)}>{item.label}<ChevronDown size={14} aria-hidden="true" /></button>
      <div className="ib-mega" id={`ib-menu-${item.id}`} hidden={open !== item.id}>
        <div className="ib-mega-lead"><span>{item.kicker}</span><h2>{item.title}</h2><p>{item.intro}</p><Link href="/contact" onClick={close}>Let’s talk about your hotel <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        {item.groups.map(column => <div className="ib-mega-col" key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href, description]) => <Link key={href} href={href} onClick={close}><span>{label}<ArrowUpRight size={14} aria-hidden="true" /></span><small>{description}</small></Link>)}</div>)}
      </div>
    </div>;
  }

  return <header className="ib-header" ref={root} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }}><div className="ib-container ib-nav-inner">
    <Link href="/" className="ib-brand" aria-label="Innbase home" onClick={close}><BrandMark /></Link>
    <nav id="ib-navigation" className={`ib-navigation${mobile ? " is-open" : ""}`} aria-label="Main navigation">
      {group(NAV_GROUPS[0])}{group(NAV_GROUPS[1])}<Link href="/pricing" aria-current={pathname === "/pricing" ? "page" : undefined} onClick={close}>Pricing</Link>{group(NAV_GROUPS[2])}<Link href="/about" aria-current={pathname === "/about" ? "page" : undefined} onClick={close}>About</Link>
      <div className="ib-mobile-actions"><a href="https://app.innbase.co/login">Log in <ArrowUpRight size={15} aria-hidden="true" /></a><Button onClick={close}>Book a demo</Button></div>
    </nav>
    <div className="ib-nav-actions"><a href="https://app.innbase.co/login">Log in</a><Button className="ib-button-small">Book a demo</Button></div>
    <button type="button" className="ib-menu-toggle" aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} aria-controls="ib-navigation" ref={toggle} onClick={() => { setMobile(!mobile); setOpen(null); }}>{mobile ? <X size={22} /> : <Menu size={22} />}</button>
  </div></header>;
}
