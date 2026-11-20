import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Check, ClipboardCheck, DoorOpen, KeyRound, Lock, LockOpen, ShieldCheck, Smartphone, Users } from "lucide-react";
import { DOOR_FAQ, DOOR_ROLES, GUEST, PLAN_B, ROOM } from "@/data/doorAccessData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import AccessDesk from "./AccessDesk";
import styles from "./DoorAccess.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=door-access";
const HERO_CHECKS = ["Booking confirmed", `Room ${ROOM} assigned`, "Deposit confirmed", "No known risk"];

export default function DoorAccessPage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>DOOR ACCESS</Eyebrow>
            <h1>Your guest arrives at 1 a.m.<br /><em>The door is ready.</em></h1>
            <p>Door Access ties room entry to the stay itself. When a booking is confirmed, paid and assigned a room, the guest’s access is granted for that room and that stay, and it is built to end when the stay does.</p>
            <div className="ib-actions">
              <Button href="#desk">Follow a late arrival</Button>
              <TextLink href={PILOT_HREF}>Join the pilot list</TextLink>
            </div>
            <Reassurance>Pilot places are limited. We start by looking at your doors.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.recordHead}>
                <span className={styles.recordIcon} aria-hidden="true"><ShieldCheck size={20} /></span>
                <div><small>GUEST ACCESS · SAMPLE</small><b>{GUEST} · Room {ROOM}</b></div>
              </div>
              <ul className={styles.heroChecks}>
                {HERO_CHECKS.map((c) => <li key={c}><Check size={14} aria-hidden="true" />{c}</li>)}
              </ul>
              <div className={styles.heroWindow}>
                <div><small>FROM</small><b>Fri 2:00 pm</b></div>
                <ArrowRight size={16} aria-hidden="true" />
                <div><small>UNTIL CHECKOUT</small><b>Sun 11:00 am</b></div>
              </div>
            </div>
            <div className={styles.heroKey} aria-hidden="true">
              <span><KeyRound size={13} />Room key</span>
              <b>Room {ROOM}</b>
              <p><LockOpen size={13} />Opened at 1:40 a.m.</p>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className="ib-note-icon"><Lock size={20} aria-hidden="true" /></span>
              <div>
                <small>ACCESS · ROOM {ROOM}</small>
                <strong>This stay only.</strong>
                <p><Check size={12} aria-hidden="true" />Ends at checkout</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [ClipboardCheck, "The whole stay, checked", "Booking, room, payment, risk, dates"],
            [KeyRound, "One grant per stay", "Recorded once, never duplicated"],
            [DoorOpen, "Ends with the stay", "The next guest gets a fresh room"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

      <AccessDesk />

      <section className={`ib-section ib-paper-alt ${styles.planB}`} id="practical">
        <div className="ib-container">
          <SectionHeading eyebrow="BEFORE ANYTHING GOES LIVE" title={<>Every door<br /><em>needs a plan B.</em></>}>
            <p>Smart access is only as good as what happens when something goes wrong. These are settled with you before a single door changes.</p>
          </SectionHeading>
          <ol className={styles.planGrid}>
            {PLAN_B.map((item, i) => (
              <li key={item.title}>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Your night team<br /><em>handles the exceptions.</em></>}>
            <p>Most arrivals need nobody at all. The few that do reach a named manager, with the reason in front of them.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Users size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>FRONT DESK · DUTY MANAGERS · GUESTS</span>
              <h3>Late arrivals,<br /><em>without a late shift.</em></h3>
              <p>Guests reach their room on their own schedule. Your night team is free for the bar bill, the phone and the guest who really needs them.</p>
            </div>
            <ol className="ib-numbered-list">
              {DOOR_ROLES.map((role, i) => (
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
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Door Access is in development. Tell us about your doors, your late arrivals and your night shift."
      />
    </>
  );
}

