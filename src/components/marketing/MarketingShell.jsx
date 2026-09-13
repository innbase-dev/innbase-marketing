import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import MarketingNav from "./MarketingNav";
import { FOOTER_GROUPS } from "./navigation";
import { Button, Eyebrow } from "./Primitives";

export default function MarketingShell({ children }) {
  return <div className="ib-site"><MarketingNav /><main id="main">{children}</main><footer className="ib-footer"><div className="ib-container">
    <div className="ib-footer-cta"><div><Eyebrow>FOR THE PEOPLE BEHIND EVERY GREAT STAY</Eyebrow><h2>A little more clarity.<br /><em>A lot more hospitality.</em></h2></div><div><Button>Let’s talk about your hotel</Button><p>Tell us what you run. We’ll take it from there.</p></div></div>
    <div className="ib-footer-grid"><div className="ib-footer-brand"><Link href="/" className="ib-brand" aria-label="Innbase home"><BrandMark /></Link><p>The operating system for the people behind every sale, shift, and stay.</p><span>Built in Nigeria.<br />Made for hospitality.</span></div>{FOOTER_GROUPS.map(group => <nav aria-label={`${group.title} footer links`} key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>)}</div>
    <div className="ib-footer-bottom"><span>© {new Date().getFullYear()} Innbase</span><span>Hospitality, connected.</span><div><Link href="/legal#terms">Terms</Link><Link href="/legal#privacy">Privacy</Link><Link href="/legal#gdpr">Data rights</Link></div></div>
  </div></footer></div>;
}
