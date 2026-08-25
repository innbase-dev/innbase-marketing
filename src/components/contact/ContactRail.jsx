import Link from "next/link";
import Icon from "@/components/Icon";

export default function ContactRail() {
    return (
        <div className="rail">
            <div className="rail-card whatsapp">
                <span className="rail-ico">
                    <Icon name="message-circle" className="icon" />
                </span>
                <h4>Prefer WhatsApp?</h4>
                <p>
                    Quick questions get quick answers. Chat with us directly, no
                    form required.
                </p>
                <a
                    href="https://wa.me/2349064169441"
                    target="_blank"
                    rel="noopener"
                    className="btn btn-brass btn-sm"
                >
                    Chat with us
                </a>
            </div>

            <div className="rail-card">
                <h4>Other ways to reach us</h4>
                <div className="rail-links">
                    <a href="mailto:hello@innbase.co">
                        <Icon name="mail" className="icon" />
                        hello@innbase.co
                    </a>
                    <a href="tel:+2349064169441">
                        <Icon name="phone" className="icon" />
                        +234 000 000 0000
                    </a>
                    <Link href="/auth">
                        <Icon name="log-in" className="icon" />
                        Already a customer? Log in
                    </Link>
                </div>
            </div>

            <div className="rail-card">
                <h4>Why we ask this</h4>
                <p style={{ marginBottom: 0 }}>
                    Every enquiry becomes a traceable record — so nothing gets
                    lost between &quot;we spoke to sales&quot; and
                    &quot;we&apos;re now a customer.&quot;
                </p>
                <p className="rail-quote">
                    &quot;Contact Us should identify why someone is reaching
                    out, collect just enough context, and get them talking to
                    the right person.&quot;
                </p>
            </div>
        </div>
    );
}
