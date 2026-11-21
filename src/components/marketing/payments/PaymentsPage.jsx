import Link from "next/link";
import { ArrowUpRight, BedDouble, Landmark, Receipt, ScanSearch, Users } from "lucide-react";
import { FOUR_FIGURES, PAY_FAQ, PAY_ROLES } from "@/data/paymentsData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Eyebrow, FAQ, SectionHeading, TextLink } from "../Primitives";
import FeatureOpening from "../feature/FeatureOpening";
import ShiftNote from "../feature/ShiftNote";
import PaymentsDesk from "./PaymentsDesk";
import styles from "./Payments.module.css";

const HERO_FIGURES = [["Claimed", "₦18,000"], ["Verified", "₦18,000"], ["Owed", "₦0"]];

export default function PaymentsPage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  return (
    <>
      <FeatureOpening
        name="Payments & reconciliation"
        title="The payment came in."
        emphasis="What was it for?"
        intro="Table 08 says they’ve paid ₦18,000 by transfer. Follow the order from the claim to the money, and see what Innbase does when it can’t be sure."
        primary={{ href: "#desk", label: "Follow a payment" }}
        secondary={{ href: "/contact", label: "Book a demo" }}
        photo="/images/marketing/feature-payments.webp"
        alt="A card payment terminal on a café counter, printing a receipt"
        recordLabel="Order #1042"
        recordTitle="Table 08 · ₦18,000"
        chapters={[
          { href: "#desk", label: "Follow a payment", detail: "From claim to settled", Icon: Receipt },
          { href: "#four-figures", label: "Four figures", detail: "Owed, claimed, verified, settled", Icon: ScanSearch },
          { href: "#how-it-works", label: "Manager decisions", detail: "Who resolves the exceptions", Icon: Users },
        ]}
      >
        <dl className={styles.heroFigures}>
          {HERO_FIGURES.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </FeatureOpening>

      <PaymentsDesk />

      <section className={`ib-section ib-paper-alt ${styles.figuresSection}`} id="four-figures">
        <div className="ib-container">
          <SectionHeading eyebrow="NO BLURRED NUMBERS" title={<>Four figures.<br /><em>Never one guess.</em></>}>
            <p>Most disputes start when “they said they paid” and “we received it” become the same number. Innbase keeps them apart on every order.</p>
          </SectionHeading>
          <ol className={styles.figureGrid}>
            {FOUR_FIGURES.map((f, i) => (
              <li key={f.title}>
                <span>0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Your team records it.<br /><em>The money confirms it.</em></>}>
            <p>Nobody has to scroll through transfer alerts at closing time. The exceptions come to the person who can decide them.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <ShiftNote
              label="Evening shift"
              title="One transfer, two tables"
              detail="A ₦18,000 transfer arrived with no reference while two tables owed ₦18,000. Funmi decided which order it paid, and the next shift can see that she did."
              entries={[
                ["Transfer", "₦18,000 · 9:12 pm"],
                ["Applied to", "Order #1047 · Table 11"],
                ["Resolved by", "Funmi, manager"],
              ]}
            />
            <ol className="ib-numbered-list">
              {PAY_ROLES.map((role, i) => (
                <li key={role.title}>
                  <span>0{i + 1}</span>
                  <div><h3>{role.title}</h3><p>{role.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className={`ib-section ib-dark ${styles.connected}`} id="connected">
        <div className="ib-container ib-bridge">
          <div>
            <Eyebrow>ONE CONNECTED OPERATION</Eyebrow>
            <h2>The order says what’s owed.<br /><em>The money says what’s paid.</em></h2>
            <p>Payments takes its orders from the till and its evidence from your payment provider. Closeout and the owner’s view read the same record.</p>
            <TextLink href="/#product">Meet the platform</TextLink>
          </div>
          <div className="ib-platform">
            <div className="ib-platform-pair">
              <Link href={MARKETING_DESTINATIONS.sales.href}><span>THE ORDER</span><h3>Point<br /><em>of sale</em></h3><p>The sale, the table and the cashier.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
              <Link href={MARKETING_DESTINATIONS.shifts.href}><span>THE CLOSE</span><h3>Staff &amp;<br /><em>shifts</em></h3><p>What each shift took, and what’s still open.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
            <div className="ib-platform-connection" aria-hidden="true" />
            <div className="ib-platform-record"><span className="ib-dot" />One order. One payment trail.</div>
            <div className={styles.connectedModules}>
              {isVisible(booking) && <Link href={booking.href}><BedDouble size={15} aria-hidden="true" />Booking engine<span>Deposits confirmed the same way</span></Link>}
              <Link href={MARKETING_DESTINATIONS.owners.href}><Landmark size={15} aria-hidden="true" />For owners<span>The money, without the phone calls</span></Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={PAY_FAQ}
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Tell us how your guests pay today, and which providers you already use."
      />
    </>
  );
}
