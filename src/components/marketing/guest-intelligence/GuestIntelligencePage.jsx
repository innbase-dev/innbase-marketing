import Link from "next/link";
import { ArrowUpRight, Check, HeartHandshake, MessageSquareText, ShieldCheck, Smartphone, Sparkles, Users } from "lucide-react";
import { BOUNDARIES, GI_FAQ, GI_ROLES, PREFERENCE_TYPES } from "@/data/guestIntelligenceData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Eyebrow, FAQ, SectionHeading, TextLink } from "../Primitives";
import GuestProfileDesk from "./GuestProfileDesk";
import ShiftNote from "../feature/ShiftNote";
import FeatureOpening from "../feature/FeatureOpening";
import styles from "./GuestIntelligence.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=guest-intelligence";

export default function GuestIntelligencePage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  const loyalty = MARKETING_DESTINATIONS.loyalty;
  return (
    <>
      <FeatureOpening
        name="Guest intelligence"
        title="The quiet room."
        emphasis="You remembered."
        intro="Amaka asked for a quiet room on her first stay. When she returns, an authorised receptionist can see what she shared and whether she agreed to use it again."
        primary={{ href: "#desk", label: "Meet a returning guest" }}
        secondary={{ href: PILOT_HREF, label: "Join the pilot list" }}
        photo="/images/marketing/feature-guest.webp"
        alt="A housekeeper arranges a firm linen pillow before a guest arrives"
        recordLabel="Guest preference example"
        recordTitle="Amaka’s next stay"
        chapters={[
          { href: "#desk", label: "The returning guest", detail: "Follow two stays with Amaka", Icon: Smartphone },
          { href: "#what-it-remembers", label: "What stays on file", detail: "Explore preferences and consent", Icon: ShieldCheck },
          { href: "#how-it-works", label: "Staff access", detail: "See who can view her profile", Icon: Users },
        ]}
      >
        <div className={styles.preferenceNote}>
          <MessageSquareText size={19} aria-hidden="true" />
          <div><b>“A quiet room, please.”</b><small>Shared with the front desk</small></div>
        </div>
      </FeatureOpening>

      <GuestProfileDesk />

      <section className="ib-section ib-paper-alt" id="what-it-remembers">
        <div className="ib-container">
          <SectionHeading eyebrow="DELIBERATE BOUNDARIES" title={<>Remember what matters.<br /><em>Leave the rest alone.</em></>}>
            <p>Personal service depends on trust. Guest Intelligence is focused on purpose, and the limits are part of the design.</p>
          </SectionHeading>
          <div className={styles.boundaryGrid}>
            <div className={styles.remembers}>
              <span className={styles.boundaryIcon}><Sparkles size={22} aria-hidden="true" /></span>
              <small>WHAT IT REMEMBERS</small>
              <h3>The details that<br /><em>make a stay.</em></h3>
              <ul>
                {PREFERENCE_TYPES.map(({ type, values }) => <li key={type}><b>{type}</b><span>{values}</span></li>)}
              </ul>
            </div>
            <ol className={styles.limits}>
              {BOUNDARIES.map((item) => (
                <li key={item.title}><Check size={18} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.body}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Your team remembers.<br /><em>She stays in charge.</em></>}>
            <p>Each preference has a clear source, each viewer has been given access, and the guest decides how her preferences are used.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <ShiftNote
              label="Returning guest · example"
              title="Amaka is coming back."
              detail="The team knows which preferences came from Amaka directly and which ones she mentioned at reception."
              entries={[
                ["Quiet room", "Told the front desk"],
                ["Firm pillow", "Shared in Guest Companion"],
                ["Permission", "This property only"],
              ]}
            />
            <ol className="ib-numbered-list">
              {GI_ROLES.map((role, i) => (
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
            <h2>The guest shares it once.<br /><em>Your hotel remembers.</em></h2>
            <p>Guests share preferences from Guest Companion, and returning stays come from your bookings. Guest Intelligence brings them together on one profile.</p>
            <TextLink href="/#product">Meet the platform</TextLink>
          </div>
          <div className="ib-platform">
            <div className="ib-platform-pair">
              <Link href={MARKETING_DESTINATIONS.guest.href}><span>FOR YOUR GUESTS</span><h3>Guest<br /><em>Companion</em></h3><p>Where guests share and decide.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
              {isVisible(booking)
                ? <Link href={booking.href}><span>THE STAY</span><h3>Booking<br /><em>engine</em></h3><p>Where returning stays come from.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
                : <Link href={MARKETING_DESTINATIONS.rooms.href}><span>THE STAY</span><h3>Rooms &amp;<br /><em>guests</em></h3><p>Where every stay is kept.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>}
            </div>
            <div className="ib-platform-connection" aria-hidden="true" />
            <div className="ib-platform-record"><span className="ib-dot" />One guest. One profile, for your hotel.</div>
            {isVisible(loyalty) && (
              <div className={styles.connectedModules}>
                <Link href={loyalty.href}><HeartHandshake size={15} aria-hidden="true" />Loyalty<span>Bring regulars back</span></Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <FAQ
        items={GI_FAQ}
        title={<>About guest<br /><em>preferences.</em></>}
        description="Ask us how preferences, permission and access work at your property."
      />
    </>
  );
}
