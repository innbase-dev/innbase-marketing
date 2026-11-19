import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, HeartHandshake, Lock, MessageSquareText, ShieldCheck, Smartphone, Sparkles, UserRound, Users } from "lucide-react";
import { BOUNDARIES, GI_FAQ, GI_ROLES, HERO_PREFERENCES, PREFERENCE_TYPES } from "@/data/guestIntelligenceData";
import { MARKETING_DESTINATIONS, isVisible } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import GuestProfileDesk from "./GuestProfileDesk";
import styles from "./GuestIntelligence.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=guest-intelligence";

export default function GuestIntelligencePage() {
  const booking = MARKETING_DESTINATIONS.bookingEngine;
  const loyalty = MARKETING_DESTINATIONS.loyalty;
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>GUEST INTELLIGENCE</Eyebrow>
            <h1>Your best receptionist remembers everyone.<br /><em>What happens when she leaves?</em></h1>
            <p>A quiet room. A high floor. A firm pillow. Note what a guest prefers once, let the right people on your team see it, and welcome her back as if she never left, with her agreement every step of the way.</p>
            <div className="ib-actions">
              <Button href="#desk">Meet a returning guest</Button>
              <TextLink href={PILOT_HREF}>Join the pilot list</TextLink>
            </div>
            <Reassurance>Her preferences stay with your hotel.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.profileHead}>
                <span className={styles.avatar} aria-hidden="true"><UserRound size={20} /></span>
                <div><small>GUEST PROFILE · SAMPLE</small><b>Amaka Bello</b></div>
                <span className={`${styles.pill} ${styles.pill_sage}`}>Returning guest</span>
              </div>
              <dl className={styles.visits}>
                <div><dt>Completed stays</dt><dd>3</dd></div>
                <div><dt>Last checkout</dt><dd>14 Sept</dd></div>
                <div><dt>Arriving</dt><dd>Friday</dd></div>
              </dl>
              <p className={styles.listTitle}>Preferences</p>
              <ul className={styles.prefs}>
                {HERO_PREFERENCES.map(([label, source]) => (
                  <li key={label}>
                    <b>{label}</b>
                    <span>{source === "Told the front desk" ? <MessageSquareText size={13} aria-hidden="true" /> : <Smartphone size={13} aria-hidden="true" />}{source}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.heroBubble} aria-hidden="true">
              <span><Smartphone size={13} />Guest Companion</span>
              <p>Use my preferences for my next stay here?</p>
              <b><Check size={13} />Yes, use them</b>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className="ib-note-icon"><ShieldCheck size={21} aria-hidden="true" /></span>
              <div>
                <small>CONSENT · AMAKA BELLO</small>
                <strong>Agreed. This hotel only.</strong>
                <p><Check size={12} aria-hidden="true" />She can change her mind anytime</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [MessageSquareText, "Every preference has a source", "Told the team, or shared herself"],
            [Lock, "Seen by the right people", "Access you give, not by default"],
            [HeartHandshake, "Her agreement, her choice", "Given and withdrawn by the guest"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

      <GuestProfileDesk />

      <section className={`ib-section ib-paper-alt ${styles.boundaries}`} id="what-it-remembers">
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
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Users size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>FRONT DESK · GUESTS · ADMINISTRATORS</span>
              <h3>Personal service<br /><em>that doesn’t walk out the door.</em></h3>
              <p>When an experienced receptionist leaves, what she knew about your guests stays with the hotel.</p>
            </div>
            <ol className="ib-numbered-list">
              {GI_ROLES.map((role, i) => (
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
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Guest Intelligence is in development. Tell us how your team remembers guests today."
      />
    </>
  );
}
