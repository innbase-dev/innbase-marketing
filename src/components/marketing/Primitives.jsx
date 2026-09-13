import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";

export function Button({ href = "/contact", children = "Book a demo", variant = "primary", className = "", ...props }) {
  return <Link href={href} className={`ib-button ib-button-${variant} ${className}`} {...props}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function TextLink({ href, children, ...props }) {
  return <Link className="ib-text-link" href={href} {...props}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}

export function Eyebrow({ children }) { return <p className="ib-eyebrow"><span aria-hidden="true" />{children}</p>; }

export function SectionHeading({ eyebrow, title, children }) {
  return <div className="ib-section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{children && <div className="ib-section-intro">{children}</div>}</div>;
}

export function Reassurance({ children }) { return <p className="ib-reassurance"><Check size={16} aria-hidden="true" />{children}</p>; }

export function HotelImage({ className = "", priority = false, sizes = "(max-width: 760px) 100vw, 50vw" }) {
  return <Image className={`ib-hotel-photo ${className}`} src="/images/marketing/hotel-room.webp" alt="Sunlight falling across a warmly furnished boutique hotel room" width={1254} height={1254} sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}

export function FAQ({ items, title = <>A few things<br />you might <em>wonder.</em></>, description = "Something else on your mind? We’re happy to talk it through." }) {
  return <section className="ib-section ib-faq" id="faq"><div className="ib-container ib-faq-layout"><div><Eyebrow>GOOD QUESTIONS</Eyebrow><h2>{title}</h2><p>{description}</p><TextLink href="/contact">Ask the team</TextLink></div><div>{items.map((item, i) => <details key={item.q} name="marketing-faq" open={i === 0}><summary>{item.q}<Plus size={18} aria-hidden="true" /></summary><div className="ib-faq-answer">{item.a}</div></details>)}</div></div></section>;
}

export function ProductBridge() {
  return <section className="ib-section ib-dark" id="connected"><div className="ib-container ib-bridge"><div><Eyebrow>ONE CONNECTED OPERATION</Eyebrow><h2>Simple on the surface.<br /><em>Connected underneath.</em></h2><p>Guest Companion gives guests a way in. The Operational Assistant helps your team take care of the work. Both belong to the same Innbase operation.</p><TextLink href="/#product">Meet the platform</TextLink></div><div className="ib-platform"><div className="ib-platform-pair"><Link href="/guest-companion"><span>FOR YOUR GUESTS</span><h3>Guest<br /><em>Companion</em></h3><p>Order. Request. Reach you.</p><ArrowUpRight size={20} aria-hidden="true" /></Link><Link href="/assistant"><span>FOR YOUR TEAM</span><h3>Operational<br /><em>Assistant</em></h3><p>Ask. Understand. Take action.</p><ArrowUpRight size={20} aria-hidden="true" /></Link></div><div className="ib-platform-connection" aria-hidden="true" /><div className="ib-platform-record"><span className="ib-dot" />One hotel. One operational record.</div><div className="ib-platform-modules">Sales <span>Payments</span> Guests <span>Inventory</span> Tasks</div></div></div></section>;
}
