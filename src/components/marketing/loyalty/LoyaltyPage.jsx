import Link from "next/link";
import { ArrowUpRight, Check, Gift, Receipt, Store } from "lucide-react";
import { CONTRASTS, LOYALTY_FAQ, LOYALTY_ROLES, PARTNER_STEPS } from "@/data/loyaltyData";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, SectionHeading } from "../Primitives";
import LoyaltyDesk from "./LoyaltyDesk";
import ShiftNote from "../feature/ShiftNote";
import FeatureOpening from "../feature/FeatureOpening";
import styles from "./Loyalty.module.css";

const PARTNER_HREF = "/contact?reason=early-access&feature=loyalty";

export default function LoyaltyPage() {
  return (
    <>
      <FeatureOpening
        name="Loyalty"
        title="Make the fifth visit"
        emphasis="one to remember."
        intro="A familiar face, a phone number and five meals at your restaurant. Explore what it would take to offer the next meal on the house, down to the cost of the reward."
        primary={{ href: "#explorer", label: "Try a reward programme" }}
        secondary={{ href: PARTNER_HREF, label: "Become a design partner" }}
        photo="/images/marketing/feature-loyalty.webp"
        alt="A server brings jollof rice, fish and plantain to a diner in a Lagos restaurant"
        recordLabel="Reward programme"
        recordTitle="A meal on the house"
        chapters={[
          { href: "#explorer", label: "The reward calculator", detail: "Test visits, spend and rewards", Icon: Gift },
          { href: "#how-it-works", label: "At the counter", detail: "Follow the sale and redemption", Icon: Receipt },
          { href: "#design-partners", label: "Design partners", detail: "Help shape the programme", Icon: Store },
        ]}
      >
        <div className={styles.visitCard}>
          <div aria-hidden="true">{[1, 2, 3, 4].map(visit => <span key={visit}><Check size={13} /></span>)}<span><Gift size={15} /></span></div>
          <b>5 visits · ₦12,000 reward cost</b>
        </div>
      </FeatureOpening>

      <LoyaltyDesk />

      <section className="ib-section ib-paper-alt" id="why">
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
            <ShiftNote
              label="Counter receipt"
              title="A fifth visit earns lunch."
              detail="Five sales count towards Ifeoma’s reward. The manager can compare the cost of a free meal with the spend that earned it."
              entries={[
                ["Qualifying visits", "5"],
                ["Spend across five visits", "₦164,500"],
                ["Cost of the meal", "₦12,000"],
              ]}
            />
            <ol className="ib-numbered-list">
              {LOYALTY_ROLES.map((role, i) => (
                <li key={role.title}>
                  <span>0{i + 1}</span>
                  <div><h3>{role.title}</h3><p>{role.body}</p></div>
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
        title={<>About your<br /><em>reward programme.</em></>}
        description="Talk to us about repeat visits, reward costs or becoming a design partner."
      />
    </>
  );
}
