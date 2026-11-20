import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Check, ClipboardCheck, Landmark, Receipt, ScanSearch, UserRoundCheck, Users } from "lucide-react";
import { FOUR_FIGURES, PAY_FAQ, PAY_ROLES } from "@/data/paymentsData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import PaymentsDesk from "./PaymentsDesk";
import styles from "./Payments.module.css";

const HERO_FIGURES = [["Owed", "₦0"], ["Claimed", "₦18,000"], ["Verified", "₦18,000"], ["Settled", "₦18,000"]];

export default function PaymentsPage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>PAYMENTS &amp; RECONCILIATION</Eyebrow>
            <h1>The payment came in.<br /><em>What was it for?</em></h1>
            <p>A transfer alert is only half the story. Innbase keeps every payment with the order it belongs to, applies money only when the match is certain, and leaves anything in doubt to a named person, on the record.</p>
            <div className="ib-actions">
              <Button>Book a demo</Button>
              <TextLink href="#desk">Follow a payment</TextLink>
            </div>
            <Reassurance>We’ll walk through the way your guests actually pay.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.orderHead}>
                <div><small>ORDER #1042 · SAMPLE</small><b>Table 08 · ₦18,000</b></div>
                <span className={`${styles.pill} ${styles.pill_sage}`}>Settled</span>
              </div>
              <dl className={styles.figures}>
                {HERO_FIGURES.map(([label, value]) => (
                  <div key={label} className={value !== "₦0" ? styles.figureOn : ""}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <p className={`${styles.match} ${styles.match_sage}`}><Check size={15} aria-hidden="true" />Reference matches order #1042 exactly</p>
            </div>
            <div className={styles.heroAlert} aria-hidden="true">
              <span><Landmark size={13} />Credit alert</span>
              <b>₦18,000</b>
              <p>Ref: DIN-1042 · 8:47 pm</p>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className="ib-note-icon"><ScanSearch size={20} aria-hidden="true" /></span>
              <div>
                <small>NOT SURE?</small>
                <strong>Innbase doesn’t guess.</strong>
                <p><UserRoundCheck size={12} aria-hidden="true" />A manager decides</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [Receipt, "Every payment has an order", "Amount, table, cashier and shift"],
            [ScanSearch, "Matched only when certain", "Exact references, never a hunch"],
            [ClipboardCheck, "Every decision on record", "Who resolved what, and why it was flagged"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

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
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Users size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>CASHIERS · MANAGERS · OWNERS</span>
              <h3>Fewer awkward<br /><em>conversations.</em></h3>
              <p>No chasing a guest who already paid, and no letting one leave who didn’t. Every answer starts from the order.</p>
            </div>
            <ol className="ib-numbered-list">
              {PAY_ROLES.map((role, i) => (
                <li key={role.title}>
                  <span>0{i + 1}</span>
                  <div><h3>{role.title}</h3><p>{role.body}</p></div>
                  <ArrowRight size={20} aria-hidden="true" />
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
