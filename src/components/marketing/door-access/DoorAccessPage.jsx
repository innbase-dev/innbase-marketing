import Link from "next/link";
import { ArrowUpRight, BedDouble, ClipboardCheck, KeyRound, Smartphone, Users } from "lucide-react";
import { DOOR_FAQ, DOOR_ROLES, PLAN_B } from "@/data/doorAccessData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Eyebrow, FAQ, SectionHeading, TextLink } from "../Primitives";
import AccessDesk from "./AccessDesk";
import ShiftNote from "../feature/ShiftNote";
import FeatureOpening from "../feature/FeatureOpening";
import styles from "./DoorAccess.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=door-access";

export default function DoorAccessPage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  return (
    <>
      <FeatureOpening
        name="Door access"
        title="A late arrival."
        emphasis="A key for this stay."
        intro="Tunde reaches Room 108 at 1:40 a.m. Follow the booking, payment and room checks that determine when his key can work and when access ends."
        primary={{ href: "#desk", label: "Follow a late arrival" }}
        secondary={{ href: PILOT_HREF, label: "Join the pilot list" }}
        photo="/images/marketing/feature-door.webp"
        alt="A brushed brass electronic lock on a timber guest-room door"
        recordLabel="Guest key"
        recordTitle="Room 108"
        chapters={[
          { href: "#desk", label: "The late arrival", detail: "Follow the key to checkout", Icon: KeyRound },
          { href: "#practical", label: "Locks and fallbacks", detail: "Plan for a power cut", Icon: ClipboardCheck },
          { href: "#how-it-works", label: "Manager exceptions", detail: "See who can grant access", Icon: Users },
        ]}
      >
        <dl className={styles.keyWindow}>
          <div><dt>Valid from</dt><dd>Fri · 2 pm</dd></div>
          <div><dt>Checkout</dt><dd>Sun · 11 am</dd></div>
        </dl>
      </FeatureOpening>

      <AccessDesk />

      <section className="ib-section ib-paper-alt" id="practical">
        <div className="ib-container">
          <SectionHeading eyebrow="BEFORE ANYTHING GOES LIVE" title={<>Every door<br /><em>needs a plan B.</em></>}>
            <p>Smart access is only as good as what happens when something goes wrong. These are settled with you before a single door changes.</p>
          </SectionHeading>
          <dl className={styles.readiness}>
            {PLAN_B.map(item => (
              <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Your night team<br /><em>handles the exceptions.</em></>}>
            <p>The desk checks the booking. A named manager can approve an unpaid stay and leave a reason the morning shift can read.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <ShiftNote
              label="Night shift"
              title="Room 108, at 1:40 a.m."
              detail="Tunde’s arrival falls inside the access window for this room. The morning shift can see when that permission ends."
              entries={[
                ["Guest", "Tunde Adeyemi"],
                ["Access begins", "Friday · 2:00 pm"],
                ["Access ends", "Sunday · 11:00 am"],
              ]}
            />
            <ol className="ib-numbered-list">
              {DOOR_ROLES.map((role, i) => (
                <li key={role.title}>
                  <span>0{i + 1}</span>
                  <div><h3>{role.title}</h3><p>{role.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ib-section ib-dark" id="connected">
        <div className="ib-container ib-bridge">
          <div>
            <Eyebrow>ONE CONNECTED OPERATION</Eyebrow>
            <h2>The booking holds the key.<br /><em>The stay decides when it works.</em></h2>
            <p>Door Access reads the stay from your bookings and the payment from Payments. It never decides on its own who should be in a room.</p>
            <TextLink href="/#product">Meet the platform</TextLink>
          </div>
          <div className="ib-platform">
            <div className="ib-platform-pair">
              {isVisible(booking)
                ? <Link href={booking.href}><span>THE STAY</span><h3>Booking<br /><em>engine</em></h3><p>Confirmed, assigned, on the right dates.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
                : <Link href={MARKETING_DESTINATIONS.rooms.href}><span>THE STAY</span><h3>Rooms &amp;<br /><em>guests</em></h3><p>Every stay kept together.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>}
              <Link href={MARKETING_DESTINATIONS.payments.href}><span>THE MONEY</span><h3>Payments &amp;<br /><em>reconciliation</em></h3><p>Whether the payment really landed.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
            <div className="ib-platform-connection" aria-hidden="true" />
            <div className="ib-platform-record"><span className="ib-dot" />One stay. One access record.</div>
            <div className={styles.connectedModules}>
              <Link href={MARKETING_DESTINATIONS.guest.href}><Smartphone size={15} aria-hidden="true" />Guest Companion<span>The guest’s way in to everything else</span></Link>
              <Link href={MARKETING_DESTINATIONS.rooms.href}><BedDouble size={15} aria-hidden="true" />Rooms &amp; guests<span>Which rooms can be opened at all</span></Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={DOOR_FAQ}
        title={<>Before you<br /><em>change your locks.</em></>}
        description="Tell us about your existing locks or how your night team handles arrivals."
      />
    </>
  );
}

