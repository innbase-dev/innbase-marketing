import { Plus, Quote } from "lucide-react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { Eyebrow } from "./Primitives";

// Existing customer quotes and pilot results from the production project.
// This redesign changes their presentation, not their wording or provenance.
const QUOTES = [
  { text: "The stock count finally defends my bartenders instead of accusing them. That changed the whole mood of a Friday night close.", name: "Tunde Bakare", role: "Owner, Cruizze Hotel & Lounge · Lekki Phase 1" },
  { text: "One screen shows the tab, the room charge, and what’s outstanding. I stopped apologising to guests while I checked three systems.", name: "Emeka Obi", role: "Front Desk Lead, Grand Emperium Hotel · Port Harcourt" },
];

export default function CustomerStories() {
  return <section className="ib-section ib-customer-stories" id="stories"><div className="ib-container">
    <div className="ib-stories-opening"><div><Eyebrow>FROM THE PILOT PROPERTIES</Eyebrow><h2>The people behind the numbers.<br /><em>In their own words.</em></h2><p>Early experiences from the teams running Innbase, shift after shift.</p></div><figure className="ib-featured-quote" id="quote"><Quote size={29} strokeWidth={1.3} aria-hidden="true" /><blockquote>“Close-out used to be 45 minutes of counting and arguing. Now it’s five minutes of confirming what Innbase already matched. <em>The first week honestly felt like cheating.</em>”</blockquote><figcaption><b>Ngozi Adewale</b><span>General Manager, Hotel De George · Lagos Mainland</span></figcaption></figure></div>
    <div className="ib-secondary-quotes">{QUOTES.map(quote => <figure key={quote.name}><blockquote>“{quote.text}”</blockquote><figcaption><b>{quote.name}</b><span>{quote.role}</span></figcaption></figure>)}</div>
    <div className="ib-pilot-results"><p className="ib-label">EXPLORE THE PILOT STORIES</p>{CASE_STUDIES.map(story => <details key={story.name}><summary><span><b>{story.name}</b><small>{story.sub}</small></span><span className="ib-pilot-metric"><strong>{story.metricBig}</strong><small>{story.metricLabel}</small></span><Plus size={18} aria-hidden="true" /></summary><p>{story.caption}</p></details>)}</div>
  </div></section>;
}
