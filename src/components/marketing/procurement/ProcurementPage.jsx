import Link from "next/link";
import { ArrowUpRight, Check, Landmark, PackageCheck, ShieldCheck, TriangleAlert, Users } from "lucide-react";
import { CONTROL_SPLIT, PROCUREMENT_FAQ, PROCUREMENT_ROLES } from "@/data/procurementData";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { Eyebrow, FAQ, SectionHeading, TextLink } from "../Primitives";
import SupplierDesk from "./SupplierDesk";
import ShiftNote from "../feature/ShiftNote";
import FeatureOpening from "../feature/FeatureOpening";
import styles from "./Procurement.module.css";

const PILOT_HREF = "/contact?reason=early-access&feature=procurement";


export default function ProcurementPage() {
  return (
    <>
      <FeatureOpening
        name="Procurement & suppliers"
        title="Same supplier."
        emphasis="New bank details?"
        intro="A message asks accounts to pay Eko Beverages into a different account. Check the name at the bank, see who approved the details and keep the receipt with the supplier."
        primary={{ href: "#desk", label: "Review a bank change" }}
        secondary={{ href: PILOT_HREF, label: "Join the pilot list" }}
        photo="/images/marketing/feature-procurement.webp"
        alt="A hotel receiving clerk checks a delivery docket beside a crate of bottled drinks"
        recordLabel="Supplier review example"
        recordTitle="Eko Beverages Ltd"
        chapters={[
          { href: "#desk", label: "The supplier desk", detail: "Check a change of account", Icon: ShieldCheck },
          { href: "#who-holds-what", label: "Bank and payment records", detail: "Trace a supplier transfer", Icon: Landmark },
          { href: "#how-it-works", label: "Second approval", detail: "See who signs off on changes", Icon: Users },
        ]}
      >
        <dl className={styles.accountReview}>
          <div><dt>•••• 4417</dt><dd><Check size={13} aria-hidden="true" />Approved</dd></div>
          <div><dt>•••• 9035</dt><dd><TriangleAlert size={13} aria-hidden="true" />Name mismatch</dd></div>
        </dl>
      </FeatureOpening>

      <SupplierDesk />

      <section className="ib-section ib-paper-alt" id="who-holds-what">
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
              <p className={styles.splitFoot}>Your team authorises the transfer in your banking app, then attaches the receipt to the supplier record.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ib-section" id="how-it-works">
        <div className="ib-container">
          <SectionHeading eyebrow="WHO DOES WHAT" title={<>One person enters the details.<br /><em>A second approves them.</em></>}>
            <p>Registering a supplier, approving them and entering bank details are separate steps with separate permissions. Approving bank details always takes a second person.</p>
          </SectionHeading>
          <div className="ib-welcome-flow">
            <ShiftNote
              label="Account change review · example"
              title="Eko Beverages Ltd"
              detail="Accounts received new bank details. The account name came back different, so the owner rejected the change."
              entries={[
                ["Approved account", "Ending 4417"],
                ["Requested change", "Ending 9035"],
                ["Reviewed by", "Funmi · Owner"],
              ]}
            />
            <ol className="ib-numbered-list">
              {PROCUREMENT_ROLES.map((role, i) => (
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
        title={<>About paying<br /><em>your suppliers.</em></>}
        description="Ask us about supplier approvals, changes of account or locating a receipt."
      />
    </>
  );
}
