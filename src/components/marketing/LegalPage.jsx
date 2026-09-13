import { ArrowUpRight, Plus, FileText } from "lucide-react";
import { TERMS_PANEL, PRIVACY_PANEL, GDPR_PANEL, FAIR_USAGE_PANEL } from "@/data/legalData";
import { Eyebrow } from "./Primitives";

const PANELS = [TERMS_PANEL, PRIVACY_PANEL, GDPR_PANEL, FAIR_USAGE_PANEL];

export default function LegalPage() {
  return <>
    <section className="ib-legal-hero"><div className="ib-container"><Eyebrow>THE DETAILS THAT MATTER</Eyebrow><h1>A clear understanding.<br /><em>From the start.</em></h1><div><p>Your terms, your privacy, and your data rights. The documents that explain how we work together.</p><span>Last updated: August 1, 2026</span></div></div></section>
    <div className="ib-container ib-legal-layout"><aside><nav aria-label="Legal documents"><span>IN THIS GUIDE</span>{PANELS.map((panel, i) => <a key={panel.key} href={`#${panel.key}`}><small>0{i + 1}</small>{panel.tabLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav><p>A question about any of this?<a href="mailto:hello@innbase.co?subject=Legal%20question">hello@innbase.co</a></p></aside><div>{PANELS.map((panel, i) => <section className="ib-legal-document" id={panel.key} key={panel.key}><div className="ib-legal-document-title"><span>0{i + 1} / INNBASE</span><FileText size={23} aria-hidden="true" /></div><h2>{panel.tabLabel}</h2><div className="ib-legal-intro">{panel.intro}</div><div className="ib-legal-sections">{panel.sections.map(section => <details key={section.num} open={section.defaultOpen}><summary><span>{section.num}</span>{section.title}<Plus size={17} aria-hidden="true" /></summary><div className="ib-legal-content">{section.body}</div></details>)}</div><div className="ib-legal-callout">{panel.callout.body}</div></section>)}</div></div>
  </>;
}
