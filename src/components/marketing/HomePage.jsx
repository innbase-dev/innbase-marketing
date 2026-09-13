import Link from "next/link";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  Check,
  Package,
  ReceiptText,
  Users,
  Utensils,
  Wine,
} from "lucide-react";
import { FAQS } from "@/data/faqData";
import { PLANS } from "@/data/pricingPlans";
import OperationsDemo from "./OperationsDemo";
import CustomerStories from "./CustomerStories";
import StockIllustration from "./StockIllustration";
import {
  Button,
  Eyebrow,
  FAQ,
  HotelImage,
  ProductBridge,
  Reassurance,
  SectionHeading,
  TextLink,
} from "./Primitives";
import LogoStrip from "../LogoStrip";
import PlatformAvailabilitySection from "../PlatformAvailabilitySection";

const MODULE_ROWS = [
  {
    id: "sales",
    Icon: ReceiptText,
    title: "From first order to final closeout.",
    body: "Point of sale, open tabs, and payments keep the service record together.",
  },
  {
    id: "rooms",
    Icon: BedDouble,
    title: "A guest is more than a room number.",
    body: "Bookings, guest details, folios, housekeeping, and maintenance in the same operation.",
  },
  {
    id: "shifts",
    Icon: Users,
    title: "A good handover starts before you leave.",
    body: "Give every staff member a clear role, and every shift a closeout that the next team can follow.",
  },
];

const BUSINESS_TYPES = [
  {
    id: "hotels",
    Icon: BedDouble,
    title: "Hotels & guesthouses",
    body: "Connect the front desk, guest services, and back office around each stay.",
  },
  {
    id: "restaurants",
    Icon: Utensils,
    title: "Restaurants",
    body: "Keep orders, tabs, and payments moving with the service.",
  },
  {
    id: "bars",
    Icon: Wine,
    title: "Bars & lounges",
    body: "Follow each sale through stock movements and the shift’s closeout.",
  },
  {
    id: "multi-property",
    Icon: Building2,
    title: "Multiple properties",
    body: "Talk to us about an Enterprise setup for the shape of your operation.",
  },
];

function ModuleRows() {
  return (
    <div className="ib-module-rows">
      {MODULE_ROWS.map(({ id, Icon, title, body }) => (
        <article id={id} key={id}>
          <Icon size={27} strokeWidth={1.3} aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          <ArrowUpRight size={23} aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}

function BusinessGrid() {
  return (
    <div className="ib-business-grid">
      {BUSINESS_TYPES.map(({ id, Icon, title, body }) => (
        <article id={id} key={id}>
          <Icon size={27} strokeWidth={1.3} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{body}</p>
          <TextLink href={id === "multi-property" ? "/contact?plan=enterprise" : "/contact"}>
            Talk about your setup
          </TextLink>
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="ib-dark ib-home-opening">
        <div className="ib-container ib-home-hero">
          <div className="ib-home-title">
            <Eyebrow>THE OPERATING SYSTEM FOR HOSPITALITY</Eyebrow>
            <h1>
              Behind every great stay,
              <br />
              <em>a clearer way to run it.</em>
            </h1>
            <div className="ib-home-hero-bottom">
              <p>
                Every sale, payment, shift, and stock movement. Connected in one place, so your
                team can get back to taking care of people.
              </p>
              <div>
                <Button href="#demo">See how it comes together</Button>
                <Reassurance>Built for hotels, restaurants, and bars.</Reassurance>
              </div>
            </div>
          </div>

          <div className="ib-home-scene">
            <HotelImage priority sizes="100vw" />
            <div className="ib-home-scene-caption">
              <span>HOSPITALITY, CONNECTED.</span>
              <p>
                A calm welcome.
                <br />
                <em>A clear operation.</em>
              </p>
            </div>
            <div className="ib-home-snapshot">
              <div className="ib-snapshot-top">
                <span>YOUR HOTEL / AT A GLANCE</span>
                <small>Illustrative view</small>
              </div>
              <h3>The day, in focus.</h3>
              <div className="ib-snapshot-stats">
                <div>
                  <span>Occupied rooms</span>
                  <b>
                    18<small>/24</small>
                  </b>
                </div>
                <div>
                  <span>Arrivals today</span>
                  <b>06</b>
                </div>
              </div>
              <div className="ib-snapshot-line">
                <span>
                  <Check size={14} /> Room 204 · Guest checked in
                </span>
                <small>Front desk</small>
              </div>
              <div className="ib-snapshot-line">
                <span>
                  <ReceiptText size={14} /> Order #1042 · ₦18,000
                </span>
                <small>Restaurant</small>
              </div>
              <div className="ib-snapshot-line">
                <span>
                  <Package size={14} /> Stock count ready for review
                </span>
                <small>Bar</small>
              </div>
              <Link href="#demo">
                Explore a sample shift
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <LogoStrip />
      </section>

      <section className="ib-section" id="demo">
        <div className="ib-container">
          <SectionHeading
            eyebrow="THE WORK, MADE VISIBLE"
            title={
              <>
                A busy shift.
                <br />
                <em>A connected story.</em>
              </>
            }
          >
            <p>
              Sales in one book. Transfers in another chat. Stock in someone’s memory. Innbase
              brings the records together, so you can follow what happened.
            </p>
          </SectionHeading>
          <OperationsDemo />
        </div>
      </section>

      <section className="ib-section ib-paper-alt" id="product">
        <div className="ib-container">
          <SectionHeading
            eyebrow="ONE PLATFORM. THE WHOLE OPERATION."
            title={
              <>
                Less piecing it together.
                <br />
                <em>More knowing where you stand.</em>
              </>
            }
          />

          <div className="ib-product-feature" id="reconciliation">
            <div className="ib-feature-copy">
              <span className="ib-section-number">01 / FOLLOW THE MONEY</span>
              <h3>
                Every payment
                <br />
                has a <em>backstory.</em>
              </h3>
              <p>
                Connect what was sold to what was paid. Review suggested matches, investigate the
                gaps, and keep a record of who confirmed what.
              </p>
              <TextLink href="#demo">Try a payment match</TextLink>
            </div>
            <div className="ib-ledger-art">
              <div className="ib-ledger-heading">
                <ReceiptText size={22} aria-hidden="true" />
                <span>ONE SALE. CONNECTED RECORDS.</span>
              </div>
              <div>
                <span>Order #1042</span>
                <b>₦18,000</b>
              </div>
              <div>
                <span>Transfer · DIN-1042</span>
                <b>₦18,000</b>
              </div>
              <div>
                <span>Evening shift · Ada</span>
                <b>Linked</b>
              </div>
              <p>
                <span className="ib-dot" /> Illustrative record trail
              </p>
            </div>
          </div>

          <div className="ib-product-feature ib-feature-reverse" id="inventory">
            <div className="ib-feature-copy">
              <span className="ib-section-number">02 / KNOW WHAT’S ON THE SHELF</span>
              <h3>
                The stock should
                <br />
                <em>tell the same story.</em>
              </h3>
              <p>
                Purchases, transfers, sales, and counts belong together. See the difference between
                expected and actual stock while there’s still a useful conversation to have.
              </p>
              <TextLink href="#demo">Explore a stock count</TextLink>
            </div>
            <StockIllustration />
          </div>

          <ModuleRows />
        </div>
      </section>

      <ProductBridge />

      <section className="ib-section" id="roles">
        <div className="ib-container">
          <SectionHeading
            eyebrow="BUILT AROUND REAL HOSPITALITY"
            title={
              <>
                However you welcome people,
                <br />
                <em>make the day work better.</em>
              </>
            }
          >
            <p>
              Clearer records for the owner. Less chasing for the manager. A focused view for the
              people doing the work.
            </p>
          </SectionHeading>
          <BusinessGrid />
        </div>
      </section>

      <CustomerStories />

      <section className="ib-home-pricing">
        <div className="ib-container">
          <div>
            <Eyebrow>A CLEARER START</Eyebrow>
            <h2>
              The complete core platform.
              <br />
              <em>A plan sized to your team.</em>
            </h2>
            <p>Start with a one-month free trial. No card required.</p>
            <Button href="/pricing" variant="dark">
              Find your fit
            </Button>
          </div>
          <div className="ib-price-ladder">
            {PLANS.map((plan) => (
              <Link href={`/pricing#plan-${plan.name.toLowerCase()}`} key={plan.name}>
                <span>
                  {plan.name}
                  <small>{plan.cap}</small>
                </span>
                <strong>
                  {plan.price}
                  <small>/month</small>
                </strong>
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            ))}
            <p>Larger operation? Enterprise is quoted around your setup.</p>
          </div>
        </div>
      </section>

      <PlatformAvailabilitySection />
      <FAQ items={FAQS} />
    </>
  );
}
