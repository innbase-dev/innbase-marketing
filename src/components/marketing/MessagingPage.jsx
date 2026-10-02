"use client";

import { useState } from "react";
import {
  Check,
  CheckCheck,
  ClipboardCheck,
  MessageCircle,
  MessagesSquare,
  Smartphone,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { Button, Eyebrow, FAQ, Reassurance, SectionHeading, TextLink } from "./Primitives";
import styles from "./MessagingPage.module.css";

const CHANNELS = [
  {
    id: "guest",
    label: "Guest Companion",
    guest: "Chinedu Okafor",
    meta: "Room 204 · In house",
    incoming: "Can I get two extra towels?",
    reply: "Absolutely. I’ve sent that to Housekeeping.",
    route: "Front Desk",
    badge: "Open",
    task: "Deliver two extra towels",
    taskMeta: "Room 204 · Housekeeping",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    guest: "Aisha Bello",
    meta: "Room 405 · Executive Suite",
    incoming: "Could you arrange an airport pickup for tomorrow evening?",
    reply: "Of course. What time should we have the driver there?",
    route: "Guest Relations",
    badge: "Open",
    task: "Arrange airport pickup",
    taskMeta: "Room 405 · Guest Relations",
  },
  {
    id: "sms",
    label: "SMS",
    guest: "Michael Johnson",
    meta: "Past stay · Room 204",
    incoming: "I think I left my phone charger in room 204.",
    reply: "Found it. Housekeeping has kept it safe at the front desk.",
    route: "Front Desk",
    badge: "Resolved",
    task: "Locate the guest’s phone charger",
    taskMeta: "Room 204 · Housekeeping · Completed",
  },
];

const FAQ_ITEMS = [
  {
    q: "Which conversations can the workspace bring together?",
    a: "The current product design brings Guest Companion, WhatsApp and SMS conversations into the same communications workspace. Channel availability still depends on the connections enabled for your property.",
  },
  {
    q: "Can a message become a task?",
    a: "Yes. A conversation or individual message can become operational work while keeping its guest and conversation context, so the task does not begin as an isolated note.",
  },
  {
    q: "Can conversations be assigned to people or teams?",
    a: "The workspace supports assignment so an open guest conversation can have a clear owner, including individual staff members or an appropriate team.",
  },
  {
    q: "Does Messaging replace Guest Companion?",
    a: "No. Guest Companion is one way guests can reach your hotel. Messaging is the team workspace where those live conversations can sit alongside other supported guest channels.",
  },
];

function ChannelMark({ id }) {
  if (id === "guest") return <Sparkles size={15} aria-hidden="true" />;
  if (id === "whatsapp") return <MessageCircle size={15} aria-hidden="true" />;
  return <Smartphone size={15} aria-hidden="true" />;
}

function InboxDemo() {
  const [selectedId, setSelectedId] = useState("guest");
  const selected = CHANNELS.find((item) => item.id === selectedId);

  return (
    <div className={styles.demoShell} role="group" aria-label="Illustrative Innbase messaging workspace">
      <div className={styles.demoTopbar}>
        <span><MessagesSquare size={18} strokeWidth={1.5} aria-hidden="true" />Conversations</span>
        <small>Illustrative view</small>
      </div>
      <div className={styles.channelButtons} role="group" aria-label="Choose an example conversation">
        {CHANNELS.map((channel) => (
          <button
            key={channel.id}
            type="button"
            onClick={() => setSelectedId(channel.id)}
            aria-pressed={channel.id === selectedId}
            aria-controls="messaging-conversation"
          >
            <ChannelMark id={channel.id} />{channel.label}
          </button>
        ))}
      </div>
      <section id="messaging-conversation" className={styles.demoThread} aria-label={`${selected.label} example conversation`} aria-live="polite" aria-atomic="true">
        <header className={styles.threadHeader}>
          <span className={styles.avatar} aria-hidden="true">{selected.guest.split(" ").map((part) => part[0]).join("")}</span>
          <div><b>{selected.guest}</b><span>{selected.meta}</span></div>
          <span className={styles.assignment}><UserRoundCheck size={15} aria-hidden="true" />{selected.route}</span>
        </header>
        <div className={styles.messages}>
          <span className={styles.threadDay}>Today</span>
          <div className={styles.incoming}>{selected.incoming}</div>
          <div className={styles.outgoing}>{selected.reply}<span>Sarah · now <CheckCheck size={14} aria-hidden="true" /></span></div>
          <div className={styles.taskArtifact}>
            <ClipboardCheck size={21} strokeWidth={1.5} aria-hidden="true" />
            <div><small>CONNECTED TASK</small><b>{selected.task}</b><p>{selected.taskMeta}</p></div>
          </div>
        </div>
        <footer className={styles.threadFooter}>
          <span><ChannelMark id={selected.id} />{selected.label}</span>
          <span className={styles.conversationStatus}>{selected.badge}</span>
        </footer>
      </section>
      <p className={styles.demoCaption}>Choose a channel to explore an example.</p>
    </div>
  );
}

export default function MessagingPage() {
  return (
    <div className={styles.page}>
      <section className="ib-dark" aria-labelledby="messaging-title">
        <div className="ib-container">
          <div className="ib-split-hero">
            <div className={`ib-hero-copy ${styles.heroCopy}`}>
              <Eyebrow>INTEGRATED MESSAGING</Eyebrow>
              <h1 id="messaging-title">Every guest message.<br /><em>Taken care of.</em></h1>
              <p>Guest Companion, WhatsApp and SMS. One place for your team to reply, keep the guest in view, and turn a request into work.</p>
              <div className="ib-actions">
                <Button href="/contact">See Messaging in Innbase</Button>
                <TextLink href="#workflow">How it works</TextLink>
              </div>
              <Reassurance>The guest, the conversation, and the next step. Together.</Reassurance>
            </div>
            <InboxDemo />
          </div>
          <div className={styles.channelStrip} aria-label="Messaging channels shown in the examples">
            <span>ONE COMMUNICATIONS WORKSPACE</span>
            <ul>
              <li><MessageCircle size={15} aria-hidden="true" />WhatsApp</li>
              <li><Smartphone size={15} aria-hidden="true" />SMS</li>
              <li><Sparkles size={15} aria-hidden="true" />Guest Companion</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ib-section" id="workflow">
        <div className="ib-container">
          <SectionHeading eyebrow="FROM MESSAGE TO MOMENT" title={<>Messaging handles the conversation.<br /><em>Tasks handle the work.</em></>}>
            <p>A guest asking for towels is a conversation first. The moment someone needs to do something, turn it into work without making your team rebuild the context.</p>
          </SectionHeading>
          <div className={styles.workflowGrid}>
            {[
              [MessagesSquare, "01", "Receive it together.", "Keep supported guest conversations in one place instead of making the front desk jump between separate threads and tools."],
              [UserRoundCheck, "02", "Give it an owner.", "Assign the conversation to a person or team so the next reply has a clear home and open threads do not depend on memory."],
              [ClipboardCheck, "03", "Turn the request into work.", "Create a task from the conversation or a specific message, carrying the source context into the operational follow-through."],
            ].map(([Icon, number, title, body]) => (
              <article key={number}>
                <div><span>{number}</span><Icon size={25} strokeWidth={1.3} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ib-section ib-paper-alt">
        <div className="ib-container">
          <div className={styles.contextGrid}>
            <div className={styles.contextCopy}>
              <Eyebrow>THE CONVERSATION HAS CONTEXT</Eyebrow>
              <h2>Not just a phone number.<br /><em>The guest behind it.</em></h2>
              <p className={styles.contextIntro}>Keep the conversation beside the information your team needs to respond well: the guest, room or booking context, useful tags, notes and the current owner of the thread.</p>
              <ul>
                <li><Check size={15} aria-hidden="true" />Room and stay context close to the thread</li>
                <li><Check size={15} aria-hidden="true" />Clear conversation status and assignment</li>
                <li><Check size={15} aria-hidden="true" />Operational task creation without losing the source message</li>
              </ul>
            </div>
            <div className={styles.contextCard}>
              <div className={styles.contextCardHead}><span className={styles.avatar}>CO</span><div><b>Chinedu Okafor</b><p>Guest Companion · In house</p></div></div>
              <dl className={styles.contextRows}>
                <div><dt>Room</dt><dd>204</dd></div>
                <div><dt>Booking</dt><dd>BK-20491</dd></div>
                <div><dt>Stay</dt><dd>In house</dd></div>
                <div><dt>Assigned to</dt><dd>Front Desk Team</dd></div>
              </dl>
              <div className={styles.contextNote}><MessageCircle size={16} aria-hidden="true" /><div><small>SOURCE MESSAGE</small><p>“Can I get two extra towels?”</p></div></div>
              <div className={styles.contextTask}><ClipboardCheck size={18} aria-hidden="true" /><div><small>CONNECTED TASK</small><b>Deliver two extra towels</b><p>Room 204 · Housekeeping</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ib-section">
        <div className={`ib-container ${styles.operationalGrid}`}>
          <div>
            <Eyebrow>BUILT FOR THE SHIFT, NOT THE INBOX</Eyebrow>
            <h2>A better reply is good.<br /><em>A completed request is better.</em></h2>
          </div>
          <ol className="ib-numbered-list">
            {[
              ["Guest asks", "A request arrives through a supported guest channel.", "Conversation"],
              ["Front desk understands", "The thread carries who the guest is and the stay context available to the team.", "Context"],
              ["Work gets handed off", "Create the task and route the operational follow-through without copying the request into another system.", "Task"],
              ["Conversation stays intact", "The team can return to the original thread with the reason for the work still visible.", "Continuity"],
            ].map(([title, body, label], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <div><small className={styles.stepLabel}>{label}</small><h3>{title}</h3><p>{body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`ib-section ib-dark ${styles.bridge}`}>
        <div className="ib-container">
          <div>
            <Eyebrow>ONE CONNECTED GUEST OPERATION</Eyebrow>
            <h2>The guest can just ask.<br /><em>Your team can take it from there.</em></h2>
            <p className={styles.bridgeIntro}>Guest Companion gives the guest a direct way in. Messaging gives your team one place to own the conversation. Tasks carry the operational work forward.</p>
            <div className="ib-actions"><Button href="/contact">Let’s talk about your hotel</Button><TextLink href="/guest-companion">Meet Guest Companion</TextLink></div>
          </div>
          <ol className={styles.bridgeFlow} aria-label="Guest request flow">
            {[
              [Sparkles, "FOR YOUR GUESTS", "Guest Companion", "A direct way to reach your hotel."],
              [MessagesSquare, "FOR YOUR TEAM", "Messaging", "One place to own the conversation."],
              [ClipboardCheck, "FOR THE WORK", "Tasks", "A clear next step, with context intact."],
            ].map(([Icon, label, title, body], index) => (
              <li key={title}>
                <Icon size={25} strokeWidth={1.3} aria-hidden="true" />
                <div><small>{label}</small><h3>{title}</h3><p>{body}</p></div>
                <span>0{index + 1}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} title={<>A few things<br /><em>worth knowing.</em></>} description="Messaging is part of the wider Innbase operation. We’ll confirm channel setup and rollout details around your property." />
    </div>
  );
}
