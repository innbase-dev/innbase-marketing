import { Building2, CheckCircle2, Handshake, MessageCircle, Users } from "lucide-react";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "./Primitives";
import { REFERRAL_STEPS, REFERRAL_REASSURANCES, REFERRAL_AUDIENCE, REFERRAL_FAQS } from "@/data/referralLandingData";

const AUDIENCE_ICONS = [Building2, Handshake, Users, MessageCircle];

export default function ReferralLandingPage() {
  return (
    <>
      <section className="ib-dark ib-section" id="ref-hero">
        <div className="ib-container ib-ref-hero">
          <div>
            <Eyebrow>EARN BY INTRODUCING HOTELS</Eyebrow>
            <h1>
              You know hotels
              <br />
              that could use this.
              <br />
              <em>Send them our way.</em>
            </h1>
            <p style={{ color: "#c3cbc0", fontSize: 18, marginTop: 26, maxWidth: 480 }}>
              Introduce a hotel to Innbase. When they become a paying customer, you get paid — no
              selling required, no cap on how many you refer.
            </p>
            <div className="ib-actions">
              <Button href="/refer/sign-up" variant="primary" prefetch={false}>
                Get your referral link
              </Button>
              <TextLink href="/refer/sign-in" prefetch={false}>Already referring? Sign in</TextLink>
            </div>
            <Reassurance>Free to join. Nothing to sell — just an introduction.</Reassurance>
          </div>

          <div className="ib-ref-card">
            <div className="ib-ref-card-top">
              <span>YOUR REFERRALS</span>
              <small>Illustrative view</small>
            </div>
            <div className="ib-ref-amount">₦40,000</div>
            <p>Earned from 2 referrals so far</p>
            <div className="ib-ref-row">
              <span>Royal Suites Hotel</span>
              <b>₦20,000 ✓</b>
            </div>
            <div className="ib-ref-row">
              <span>Ocean View Hotel</span>
              <span style={{ color: "#7f8c80" }}>In trial</span>
            </div>
            <div className="ib-ref-card-foot">
              <span aria-hidden="true" />
              Rewards land the moment a referral pays.
            </div>
          </div>
        </div>
      </section>

      <section className="ib-section" id="ref-how">
        <div className="ib-container">
          <SectionHeading eyebrow="HOW IT WORKS" title={<>Three steps.<br /><em>Nothing to manage.</em></>}>
            <p>The whole process fits in the time it takes to send a message.</p>
          </SectionHeading>
          <div className="ib-ref-steps">
            {REFERRAL_STEPS.map((step, i) => (
              <div key={step.title}>
                <span aria-hidden="true">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ib-section ib-paper-alt" id="ref-reward">
        <div className="ib-container ib-ref-reward">
          <div className="ib-ref-reward-figure">
            ₦20,000
            <small>for every hotel that becomes a paying customer</small>
          </div>
          <ul className="ib-ref-reward-list">
            {REFERRAL_REASSURANCES.map((item) => (
              <li key={item.title}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <div>
                  <b>{item.title}</b>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ib-section" id="ref-who">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO THIS IS FOR" title={<>If you know a hotel,<br /><em>you can refer it.</em></>}>
            <p>There&apos;s no application, no territory, and no approval process to start.</p>
          </SectionHeading>
          <div className="ib-ref-who">
            {REFERRAL_AUDIENCE.map((item, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
                <div key={item.title}>
                  <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FAQ
        items={REFERRAL_FAQS}
        title={<>Good questions<br />before you <em>start.</em></>}
        description="Anything else? The referral portal has a full help section once you're in."
      />

      <section className="ib-dark ib-section" id="ref-cta">
        <div className="ib-container" style={{ textAlign: "center", maxWidth: 620, marginInline: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Eyebrow>ONE INTRODUCTION AWAY</Eyebrow>
          </div>
          <h2>
            Think of one hotel.
            <br />
            <em>That&apos;s all it takes to start.</em>
          </h2>
          <p style={{ color: "#c3cbc0", fontSize: 17, margin: "22px 0 32px" }}>
            Get your referral link, share it with one hotel today, and watch it move through the
            portal.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button href="/refer/sign-up" prefetch={false}>
              Get your referral link
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
