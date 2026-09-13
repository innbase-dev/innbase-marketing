"use client";

import { useState } from "react";
import { ArrowRight, Check, MapPin, QrCode, Smartphone, Workflow, Bath } from "lucide-react";
import { GC_FAQ } from "@/data/guestCompanionData";
import GuestDemo, { GUEST_SERVICES } from "./GuestDemo";
import { Button, Eyebrow, FAQ, HotelImage, ProductBridge, Reassurance, SectionHeading, TextLink } from "./Primitives";

export default function GuestPage() {
  const [scenario, setScenario] = useState("food");
  const [stage, setStage] = useState(0);
  function selectScenario(key) { setScenario(key); setStage(0); }
  return <>
    <section className="ib-dark ib-guest-opening"><div className="ib-container ib-split-hero"><div className="ib-hero-copy"><Eyebrow>GUEST COMPANION</Eyebrow><h1>Great hospitality.<br />One tap <em>closer.</em></h1><p>The easy way for guests to order, request, and reach your hotel. The clear way for your team to take care of it.</p><div className="ib-actions"><Button href="#experience">Explore the experience</Button><TextLink href="/contact">Let’s talk</TextLink></div><Reassurance>No app. No account. Just scan.</Reassurance></div><div className="ib-guest-scene"><div className="ib-scene-photo"><HotelImage priority /><div className="ib-photo-shade" /><span className="ib-scene-caption">THE LITTLE THINGS.<br />TAKEN CARE OF.</span></div><div className="ib-hero-phone"><div className="ib-phone-top"><b>Guest Companion</b><span>•••</span></div><span className="ib-phone-location"><MapPin size={12} aria-hidden="true" />Room 204</span><h2>Make yourself<br /><em>at home.</em></h2><p>What can we do for you?</p><div className="ib-phone-services">{GUEST_SERVICES.filter(s => ["food", "room", "housekeeping", "help"].includes(s.key)).map(({ key, Icon, label }) => <a href="#experience" onClick={() => selectScenario(key)} key={key}><Icon size={22} aria-hidden="true" />{label}</a>)}</div><div className="ib-phone-footer">Your stay, with <b>Innbase</b></div></div><div className="ib-floating-note"><span className="ib-note-icon"><Bath size={21} aria-hidden="true" /></span><div><small>EXAMPLE REQUEST · ROOM 204</small><strong>Fresh towels? On it.</strong><p><Check size={12} aria-hidden="true" />Received by Housekeeping</p></div></div></div></div>
      <div className="ib-container ib-essentials">{[[QrCode, "Scan from wherever they are", "In the room, at a table, around the hotel"], [Smartphone, "The phone they already have", "Opens in the browser. Nothing to download."], [Workflow, "One connected operation", "Requests arrive where the work happens."]].map(([Icon, title, body]) => <div key={title}><Icon size={25} aria-hidden="true" /><p>{title}<span>{body}</span></p></div>)}</div>
    </section>
    <GuestDemo selected={scenario} onSelect={selectScenario} stage={stage} setStage={setStage} />
    <section className="ib-section ib-paper-alt" id="how-it-works"><div className="ib-container"><SectionHeading eyebrow="A WARMER WELCOME" title={<>A small code.<br /><em>A big welcome.</em></>}><p>No new hardware in every room. No extra account for your guests. Just a simple way to reach the people taking care of them.</p></SectionHeading><div className="ib-welcome-flow"><div className="ib-scan-card"><QrCode size={62} strokeWidth={1.2} aria-hidden="true" /><span>ROOM · TABLE · BAR</span><h3>Your hotel.<br /><em>Within reach.</em></h3><p>A QR code or link opens your property’s Guest Companion.</p></div><ol className="ib-numbered-list">{[["Scan. Settle in.", "Guests open the link or scan the code. Their room or table gives the request its context."], ["A little something?", "They browse the services your property offers and choose what they need."], ["Your team takes it from here.", "The request arrives in Innbase, ready for the right team to receive and complete."]].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowRight size={20} aria-hidden="true" /></li>)}</ol></div></div></section>
    <ProductBridge /><FAQ items={GC_FAQ} />
  </>;
}
