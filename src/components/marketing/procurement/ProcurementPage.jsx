import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Check, FileLock2, Landmark, MessageCircle, PackageCheck, ShieldCheck, TriangleAlert, UserCheck, Users } from "lucide-react";
import { CONTROL_SPLIT, PROCUREMENT_FAQ, PROCUREMENT_ROLES } from "@/data/procurementData";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "../Primitives";
import SupplierDesk from "./SupplierDesk";
import styles from "./Procurement.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=procurement";

const HERO_PAYMENTS = [
  ["₦1,200,000", "TRF-88190", "Invoice 0412"],
  ["₦640,000", "TRF-88231", "Invoice 0398"],
];

export default function ProcurementPage() {
  return (
    <>
      <section className={`ib-dark ${styles.opening}`}>
        <div className="ib-container ib-split-hero">
          <div className="ib-hero-copy">
            <Eyebrow>PROCUREMENT &amp; SUPPLIERS</Eyebrow>
            <h1>The invoice says ₦1.2 million.<br /><em>Who approved it?</em></h1>
            <p>Margin leaks before a guest ever arrives. Keep an approved supplier list, check bank details before anyone pays them, and keep proof of every payment where you can find it months later.</p>
            <div className="ib-actions">
              <Button href="#desk">Try the control desk</Button>
              <TextLink href={PILOT_HREF}>Join the pilot list</TextLink>
            </div>
            <Reassurance>Innbase never moves your money.</Reassurance>
          </div>

          <div className={styles.heroScene}>
            <div className={styles.heroCard}>
              <div className={styles.recordHead}>
                <span className={styles.recordIcon} aria-hidden="true"><Building2 size={20} /></span>
                <div><small>SUPPLIER · SAMPLE</small><b>Eko Beverages Ltd</b></div>
                <span className={`${styles.pill} ${styles.pill_sage}`}>Approved</span>
              </div>
              <dl className={styles.heroFacts}>
                <div><dt>Bank account</dt><dd>•••• 4417 · name matches</dd></div>
                <div><dt>Entered by</dt><dd>Chidi · Accounts</dd></div>
                <div><dt>Approved by</dt><dd>Funmi · Owner</dd></div>
              </dl>
              <p className={styles.heroListTitle}>Payments recorded</p>
              <ul className={styles.heroPayments}>
                {HERO_PAYMENTS.map(([amount, ref, invoice]) => (
                  <li key={ref}>
                    <div><b>{amount}</b><span>{ref} · {invoice}</span></div>
                    <span className={styles.heroReceipt}><FileLock2 size={13} aria-hidden="true" />Receipt · clean</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.heroBubble} aria-hidden="true">
              <span><MessageCircle size={13} />Message · unknown number</span>
              <p>We’ve changed banks. Please pay this month’s invoice into our new account.</p>
            </div>
            <div className={`ib-floating-note ${styles.heroNote}`}>
              <span className={`ib-note-icon ${styles.alertIcon}`}><TriangleAlert size={20} aria-hidden="true" /></span>
              <div>
                <small>NEW BANK DETAILS · EKO BEVERAGES</small>
                <strong>Name doesn’t match. Not approved.</strong>
                <p><Check size={12} aria-hidden="true" />Approved account unchanged</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ib-container ib-essentials">
          {[
            [BadgeCheck, "Approved suppliers only", "Per property, signed off"],
            [UserCheck, "Bank details, checked twice", "Name from the bank, a second approver"],
            [FileLock2, "Proof that stays put", "Encrypted, scanned, every opening logged"],
          ].map(([Icon, title, body]) => (
            <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>
          ))}
        </div>
      </section>

      <SupplierDesk />

      <section className={`ib-section ib-paper-alt ${styles.split}`} id="who-holds-what">
        <div className="ib-container">
          <SectionHeading eyebrow="CLEAR BOUNDARIES" title={<>Innbase keeps the record.<br /><em>Your bank keeps the money.</em></>}>
            <p>Supplier payments stay exactly where they are today. Innbase adds the control and the evidence around them.</p>
          </SectionHeading>
          <div className={styles.splitGrid}>
            <div className={styles.splitInnbase}>
              <span className={styles.splitIcon}><ShieldCheck size={24} aria-hidden="true" /></span>
              <small>INNBASE CONTROLS</small>
              <h3>Who, which account,<br /><em>and the proof.</em></h3>
              <ul>{CONTROL_SPLIT.innbase.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <div className={styles.splitBank}>
              <span className={styles.splitIcon}><Landmark size={24} aria-hidden="true" /></span>
              <small>YOUR BANK HANDLES</small>
              <h3>The money.<br /><em>Only your bank.</em></h3>
              <ul>{CONTROL_SPLIT.bank.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
              <p className={styles.splitFoot}>Innbase never initiates, holds or moves supplier payments. It’s a permanent boundary, not a missing feature.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>Two people, not one,<br /><em>behind every bank account.</em></>}>
            <p>Registering a supplier, approving them and entering bank details are separate steps with separate permissions. Approving bank details always takes a second person.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <div className={`ib-scan-card ${styles.scopeCard}`}>
              <Users size={54} strokeWidth={1.2} aria-hidden="true" />
              <span>PURCHASING · ACCOUNTS · OWNERS</span>
              <h3>Starts with<br /><em>the people you pay.</em></h3>
              <p>The first release covers suppliers, their bank details and proof of payment. Purchase orders and deliveries are not part of it.</p>
            </div>
            <ol className="ib-numbered-list">
              {PROCUREMENT_ROLES.map((role, i) => (
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
            <h2>What goes out,<br /><em>next to what comes in.</em></h2>
            <p>Supplier payments sit in the same Innbase operation as the sales, payments and stock they pay for, so the owner sees both sides of the business in one place.</p>
            <TextLink href="/#product">Meet the platform</TextLink>
          </div>
          <div className="ib-platform">
            <div className="ib-platform-pair">
              <Link href={MARKETING_DESTINATIONS.payments.href}><span>THE MONEY</span><h3>Payments &amp;<br /><em>reconciliation</em></h3><p>Money in and money out, on one record.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
              <Link href={MARKETING_DESTINATIONS.inventory.href}><span>THE STOCK</span><h3>Inventory<br /><em>&amp; stock</em></h3><p>Know what came in and what went out.</p><ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
            <div className="ib-platform-connection" aria-hidden="true" />
            <div className="ib-platform-record"><span className="ib-dot" />One hotel. One operational record.</div>
            <div className={styles.connectedModules}>
              <Link href={MARKETING_DESTINATIONS.owners.href}><PackageCheck size={15} aria-hidden="true" />Owners &amp; managers<span>See who approved what</span></Link>
            </div>
          </div>
        </div>
      </section>

      <FAQ
        items={PROCUREMENT_FAQ}
        title={<>A few things<br /><em>worth knowing.</em></>}
        description="Procurement is in development. Tell us how you choose and pay suppliers today."
      />
    </>
  );
}
