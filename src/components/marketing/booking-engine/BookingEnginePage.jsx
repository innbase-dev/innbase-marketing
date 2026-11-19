import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, CalendarCheck, CalendarClock, CheckCheck, DoorOpen, MessageCircle, ShieldCheck, Smartphone, Users } from "lucide-react";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { BOOKING_FAQ, CONFIRMATION_ROUTES, DESK_ROLES, HERO_BOOKED } from "@/data/bookingEngineData";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import AvailabilityBoard from "./AvailabilityBoard";
import ReservationDesk from "./ReservationDesk";
import styles from "./BookingEngine.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=booking-engine";

const heroCells = Object.fromEntries(HERO_BOOKED.nights.map((n) => [`${HERO_BOOKED.room}:${n}`, { state: "new", label: HERO_BOOKED.label }]));

export default function BookingEnginePage() {
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>BOOKING ENGINE</Eyebrow>
            <h1>Every room sold once.<br /><em>Every confirmation backed by money.</em></h1>
            <p>By phone, on WhatsApp or at the desk, your team books from one live availability. Hold a room while the guest pays, and confirm it when the deposit is verified, not when someone says it’s on the way.</p>
            <div className="ib-actions">
              <Button href="#desk">Try the reservation desk</Button>
              <TextLink href={PILOT_HREF}>Join the pilot list</TextLink>
            </div>
            <Reassurance>Built for the bookings your team takes.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHead}>
                <div><small>THIS WEEKEND · SAMPLE PROPERTY</small><b>Availability</b></div>
                <span><CalendarClock size={14} aria-hidden="true" />Live</span>
              </div>
              <AvailabilityBoard compact cells={heroCells} caption="Sample weekend availability with Deluxe 204 newly booked" />
            </div>
            <div className={styles.heroBubble} aria-hidden="true">
              <span><MessageCircle size={13} />WhatsApp · 2:14 pm</span>
              <p>Do you have a deluxe room for Friday and Saturday?</p>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className="ib-note-icon"><CalendarCheck size={21} aria-hidden="true" /></span>
              <div>
                <small>DELUXE 204 · FRI–SAT</small>
                <strong>Confirmed. Deposit verified.</strong>
                <p><CheckCheck size={12} aria-hidden="true" />Balance due at check-in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [BedDouble, "One live availability", "Rooms and room types, one supply"],
            [CalendarClock, "Holds that end on time", "Set by your property"],
            [ShieldCheck, "Confirmed when the money lands", "Claims wait for verification"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

      <ReservationDesk />

      <section className={`ib-section ib-paper-alt ${styles.routes}`} id="confirmation">
        <div className="ib-container">
          <SectionHeading eyebrow="THREE WAYS TO SAY YES" title={<>A confirmed booking.<br /><em>Never just a promise.</em></>}>
            <p>“I’ve sent it” is not a deposit, and a hold is not a free room. Innbase Booking keeps the difference visible.</p>
          </SectionHeading>
          <ol className={styles.routeGrid}>
            {CONFIRMATION_ROUTES.map((route, i) => (
              <li key={route.key}>
                <span className={styles.routeNumber}>0{i + 1}</span>
                <h3>{route.title}</h3>
                <p>{route.body}</p>
                <ol className={styles.chain} aria-label={`${route.title} status sequence`}>
                  {route.chain.map((link, j) => (
                    <li key={link} className={j === route.chain.length - 1 ? styles.chainEnd : ""}>{link}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Every role knows<br /><em>what happens next.</em></>}>
            <p>A booking passes through several hands before the guest arrives. Each one sees the same record, and each step has an owner.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Users size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>FRONT DESK · ACCOUNTS · MANAGERS</span>
              <h3>Built for<br /><em>the people at the desk.</em></h3>
              <p>The first release covers the bookings your team takes by phone, on WhatsApp and at the desk. Online self-booking and booking-site connections are not part of it.</p>
            </div>
            <ol className="ib-numbered-list">
              {DESK_ROLES.map((role, i) => (
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
            <h2>A booking is not a note.<br /><em>It’s the start of the stay.</em></h2>
            <p>From the first enquiry, the booking knows its room, what it is owed and how the guest will reach you. The rest of Innbase works from the same record.</p>
            <TextLink href="/#product">Meet the platform</TextLink>
          </div>
          <div className="ib-platform">
            <div className="ib-platform-pair">
              <Link href="/platform/rooms-and-guests"><span>THE ROOM</span><h3>Rooms &amp;<br /><em>guests</em></h3><p>One supply for rooms and room types.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
              <Link href="/platform/payments"><span>THE MONEY</span><h3>Payments &amp;<br /><em>reconciliation</em></h3><p>Every booking knows what it’s owed.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
            <div className="ib-platform-connection" aria-hidden="true" />
            <div className="ib-platform-record"><span className="ib-dot" />One booking. One operational record.</div>
            <div className={styles.connectedModules}>
              <Link href={MARKETING_DESTINATIONS.guest.href}><Smartphone size={15} aria-hidden="true" />Guest Companion<span>Stay access closes at checkout</span></Link>
              {isVisible(MARKETING_DESTINATIONS.doorAccess) && <Link href={MARKETING_DESTINATIONS.doorAccess.href}><DoorOpen size={15} aria-hidden="true" />Door access<span>Room entry follows the stay</span></Link>}
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={BOOKING_FAQ}
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Booking is in development and being tested ahead of its pilot. Tell us how your hotel takes bookings today."
      />
    </>
  );
}
