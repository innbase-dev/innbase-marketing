import Link from "next/link";
import { ArrowUpRight, CalendarCheck, CalendarClock, DoorOpen, ShieldCheck, Smartphone, Users } from "lucide-react";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { BOOKING_FAQ, CONFIRMATION_ROUTES, DESK_ROLES, DEPOSIT } from "@/data/bookingEngineData";
import { Eyebrow, FAQ, SectionHeading, TextLink } from "../Primitives";
import ReservationDesk from "./ReservationDesk";
import ShiftNote from "../feature/ShiftNote";
import FeatureOpening from "../feature/FeatureOpening";
import styles from "./BookingEngine.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=booking-engine";


export default function BookingEnginePage() {
  return (
    <>
      <FeatureOpening
        name="Booking engine"
        title="One Deluxe left."
        emphasis="Two guests asking."
        intro="Amaka asks for the weekend on WhatsApp. Then the phone rings. See which nights are free, hold the room for her deposit and give the next guest a clear answer."
        primary={{ href: "#desk", label: "Try the reservation desk" }}
        secondary={{ href: PILOT_HREF, label: "Join the pilot list" }}
        photo="/images/marketing/feature-booking.webp"
        alt="Afternoon light across a made-up bed in a boutique hotel room"
        recordLabel="Weekend booking"
        recordTitle="Deluxe 204"
        chapters={[
          { href: "#desk", label: "The reservation desk", detail: "Follow Amaka’s enquiry", Icon: CalendarClock },
          { href: "#confirmation", label: "Holds and deposits", detail: "See what confirms a booking", Icon: ShieldCheck },
          { href: "#how-it-works", label: "At the front desk", detail: "See who handles each decision", Icon: Users },
        ]}
      >
        <div className={styles.weekend}>
          <div className={styles.nights}><span>Friday</span><span>Saturday</span></div>
          <b><CalendarCheck size={15} aria-hidden="true" />Deposit verified · {DEPOSIT}</b>
        </div>
      </FeatureOpening>

      <ReservationDesk />

      <section className="ib-section ib-paper-alt" id="confirmation">
        <div className="ib-container">
          <SectionHeading eyebrow="BOOKING DECISIONS" title={<>When does a hold<br /><em>become a booking?</em></>}>
            <p>“I’ve sent it” is not a deposit, and a hold is not a free room. Innbase Booking keeps the difference visible.</p>
          </SectionHeading>
          <ol className={styles.routeGrid}>
            {CONFIRMATION_ROUTES.map((route) => (
              <li key={route.key}>
                <span className={styles.routeNumber}>{route.key === "deposit" ? "Deposit" : route.key === "hold" ? "Timed hold" : "Company account"}</span>
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
            <ShiftNote
              label="Reservation handover"
              title="Deluxe 204, Friday to Sunday"
              detail="The transfer has been verified. The next shift can see exactly what to collect at check-in."
              entries={[
                ["Guest", "Amaka Bello"],
                ["Verified deposit", "₦45,000"],
                ["Balance at check-in", "₦45,000"],
              ]}
            />
            <ol className="ib-numbered-list">
              {DESK_ROLES.map((role, i) => (
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
        title={<>Questions from<br /><em>the front desk.</em></>}
        description="Ask us about holds, deposits or the channels your guests use to book."
      />
    </>
  );
}
