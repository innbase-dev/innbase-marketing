import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";
import { Button, Eyebrow, FAQ, TextLink } from "../Primitives";
import LandingIcon from "./LandingIcon";
import LandingScenario from "./LandingScenario";
import styles from "./MiniLandingPage.module.css";

export default function MiniLandingPage({ page }) {
  const related = page.related.map((id) => MARKETING_DESTINATIONS[id]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className={styles.page}>
      <section className={`ib-dark ${styles.hero}`} aria-labelledby="landing-title">
        <div className="ib-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 id="landing-title">{page.headline}<em>{page.emphasis}</em></h1>
              <p className={styles.intro}>{page.intro}</p>
              <div className={styles.actions}>
                <Button href={page.ctaHref || "/contact"}>{page.cta || "Book a demo"}</Button>
                <TextLink href="#how-it-works">A closer look</TextLink>
              </div>
              <p className={styles.reassurance}>
                <Check size={15} aria-hidden="true" />
                {page.reassurance || "Built around the people doing the work."}
              </p>
            </div>
            <LandingScenario key={page.id} scenario={page.scenario} icon={page.icon} />
          </div>
          <div className={styles.connections}>
            <span>{page.section === "platform" ? "ONE CONNECTED PLATFORM" : "BUILT AROUND YOUR OPERATION"}</span>
            <ul>{page.connections.map((connection) => <li key={connection}>{connection}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="ib-section" id="how-it-works" aria-labelledby="workflow-title">
        <div className="ib-container">
          <div className={styles.sectionHeading}>
            <Eyebrow>A CLOSER LOOK</Eyebrow>
            <h2 id="workflow-title">{page.sectionTitle}<br /><em>{page.sectionEmphasis}</em></h2>
          </div>
          <div className={styles.benefits}>
            {page.benefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span className={styles.benefitNumber}>0{index + 1}<ArrowRight size={18} aria-hidden="true" /></span>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
          <aside className={styles.question} aria-label="An everyday question">
            <div>
              <span className={styles.smallLabel}>THE EVERYDAY QUESTION</span>
              <p>{page.question}</p>
            </div>
            <p>{page.answer}</p>
          </aside>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="related-title">
        <div className="ib-container">
          <div className={styles.relatedHeading}>
            <div>
              <Eyebrow>THE NEXT PIECE OF THE STORY</Eyebrow>
              <h2 id="related-title">It works better <em>together.</em></h2>
            </div>
            <TextLink href="/pricing">Find the right plan</TextLink>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedCardTop}>
                  <LandingIcon name={item.icon} size={25} />
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        items={page.faqs}
        title={<>Before you<br /><em>take the next step.</em></>}
        description="A few practical details. If your setup is different, let’s talk it through."
      />
      <JsonLd data={[breadcrumbJsonLd(page.label, page.href), faqSchema]} />
    </div>
  );
}
