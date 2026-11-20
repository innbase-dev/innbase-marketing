import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift, Phone, Receipt, SlidersHorizontal, Smartphone, Store, UserRound } from "lucide-react";
import { CONTRASTS, GUEST, LOYALTY_FAQ, LOYALTY_ROLES, PARTNER_STEPS, PHONE } from "@/data/loyaltyData";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import LoyaltyDesk from "./LoyaltyDesk";
import styles from "./Loyalty.module.css";

const PARTNER_HREF = "/contact?reason=early-access&feature=loyalty";

export default function LoyaltyPage() {
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>LOYALTY</Eyebrow>
            <h1>They came back nine times.<br /><em>Did anyone notice?</em></h1>
            <p>Your best guests are already loyal. Innbase Loyalty is being designed to reward their real spend, recognise them by the phone number they already give you, and give them a reason to choose you again.</p>
            <div className="ib-actions">
              <Button href={PARTNER_HREF}>Become a design partner</Button>
              <TextLink href="#explorer">Try the idea</TextLink>
            </div>
            <Reassurance>A few conversations, not a project.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.till}>
                <span className={styles.tillIcon} aria-hidden="true"><Receipt size={19} /></span>
                <div><small>AT THE COUNTER · SAMPLE</small><b>Sale completed · ₦42,500</b></div>
              </div>
              <div className={styles.heroField}>
                <small>KNOW THIS GUEST?</small>
                <span><Phone size={14} aria-hidden="true" />{PHONE}</span>
              </div>
              <div className={styles.heroGuest}>
                <span className={styles.avatar} aria-hidden="true"><UserRound size={17} /></span>
                <div><b>{GUEST}</b><p>Visit 9 this quarter</p></div>
              </div>
              <div className={styles.heroPerk}>
                <Gift size={18} aria-hidden="true" />
                <div><small>PERK AVAILABLE</small><b>Free meal</b></div>
              </div>
            </div>
            <div className={styles.heroNumber} aria-hidden="true">
              <span>THE CARD</span>
              <b>{PHONE}</b>
              <p>No app. No sign-up.</p>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className="ib-note-icon"><SlidersHorizontal size={20} aria-hidden="true" /></span>
              <div>
                <small>BEFORE IT’S REDEEMED</small>
                <strong>Costs you ₦12,000.</strong>
                <p>Shown next to the spend that earned it</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [Receipt, "Earned from real spend", "Counted from the sale, not a stamp card"],
            [Smartphone, "The number is the card", "No app, no sign-up, no plastic"],
            [SlidersHorizontal, "Every rule is yours", "And every cost is visible"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

      <LoyaltyDesk />

      <section className={`ib-section ib-paper-alt ${styles.contrasts}`} id="why">
        <div className="ib-container">
          <SectionHeading eyebrow="WHY MOST SCHEMES STALL" title={<>Built around how<br /><em>you already sell.</em></>}>
            <p>Loyalty schemes usually ask guests and staff to do something new. This one is designed to work from what already happens at the till.</p>
          </SectionHeading>
          <ul className={styles.contrastGrid}>
            {CONTRASTS.map((c) => (
              <li key={c.now}>
                <p className={styles.old}>{c.old}</p>
                <h3>{c.now}</h3>
                <p className={styles.contrastBody}>{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>One question<br /><em>at the counter.</em></>}>
            <p>You decide the rules once. After that, the work is a phone number at the till.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Store size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>HOTELS · RESTAURANTS · BARS</span>
              <h3>Regulars,<br /><em>recognised.</em></h3>
              <p>The guest who orders the same drink every Friday, the couple who book the same room every anniversary. Recognised at the counter, without a card.</p>
            </div>
            <ol className="ib-numbered-list">
              {LOYALTY_ROLES.map((role, i) => (
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

      <section className={`ib-section ib-dark ${styles.partner}`} id="design-partners">
        <div className="ib-container ib-bridge">
          <div className={styles.partnerCopy}>
            <Eyebrow>DESIGN PARTNERS</Eyebrow>
            <h2>Help us build the version<br /><em>your regulars deserve.</em></h2>
            <p className={styles.partnerIntro}>Loyalty is in design. We’re looking for a small group of hotels, restaurants and bars to help decide how the first version works, starting from the sales your team already records in Innbase.</p>
            <Button href={PARTNER_HREF}>Become a design partner</Button>
          </div>
          <div>
            <ol className={styles.partnerSteps}>
              {PARTNER_STEPS.map((s, i) => (
                <li key={s.title}><span>0{i + 1}</span><div><h3>{s.title}</h3><p>{s.body}</p></div></li>
              ))}
            </ol>
            <div className={styles.builtOn}>
              <Link href={MARKETING_DESTINATIONS.sales.href}><Receipt size={15} aria-hidden="true" />Point of sale<span>Where the spend is recorded</span><ArrowUpRight size={15} aria-hidden="true" /></Link>
              <Link href={MARKETING_DESTINATIONS.bars.href}><Store size={15} aria-hidden="true" />Bars &amp; lounges<span>Where regulars come back weekly</span><ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={LOYALTY_FAQ}
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Loyalty is in design. Tell us how you look after your regulars today."
      />
    </>
  );
}
