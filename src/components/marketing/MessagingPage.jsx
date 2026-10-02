"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ClipboardCheck,
  MessageCircle,
  MessagesSquare,
  PanelRight,
  Search,
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
    preview: "Can I get two extra towels?",
    incoming: "Can I get two extra towels?",
    reply: "Absolutely. I’ve sent that to Housekeeping.",
    route: "Front Desk",
    badge: "Live",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    guest: "Aisha Bello",
    meta: "Room 405 · Executive Suite",
    preview: "Could you arrange an airport pickup?",
    incoming: "Could you arrange an airport pickup for tomorrow evening?",
    reply: "Of course. What time should we have the driver there?",
    route: "Guest Relations",
    badge: "Open",
  },
  {
    id: "sms",
    label: "SMS",
    guest: "Michael Johnson",
    meta: "Past stay · Room 204",
    preview: "I left my phone charger in the room.",
    incoming: "I think I left my phone charger in room 204.",
    reply: "Found it. Housekeeping has kept it safe at the front desk.",
    route: "Front Desk",
    badge: "Resolved",
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
  const selected = useMemo(() => CHANNELS.find((item) => item.id === selectedId), [selectedId]);

  return (
    <div className={styles.demoShell} aria-label="Illustrative Innbase messaging workspace">
      <div className={styles.demoTopbar}>
        <div>
          <span className={styles.windowDot} />
          <span className={styles.windowDot} />
          <span className={styles.windowDot} />
        </div>
        <span>COMMUNICATIONS · ILLUSTRATIVE VIEW</span>
      </div>
      <div className={styles.demoBody}>
        <aside className={styles.demoQueues} aria-label="Conversation filters">
          <strong>Conversations</strong>
          <button type="button" className={styles.queueActive}>Needs attention <span>3</span></button>
          <button type="button">Mine <span>4</span></button>
          <button type="button">Unassigned <span>1</span></button>
          <div className={styles.queueRule} />
          <strong>Channels</strong>
          {CHANNELS.map((channel) => (
            <button key={channel.id} type="button" onClick={() => setSelectedId(channel.id)} className={channel.id === selectedId ? styles.queueChannelActive : ""}>
              <ChannelMark id={channel.id} />{channel.label}
            </button>
          ))}
        </aside>

        <div className={styles.demoList}>
          <div className={styles.demoSearch}><Search size={14} aria-hidden="true" />Search conversations</div>
          {CHANNELS.map((channel) => (
            <button key={channel.id} type="button" onClick={() => setSelectedId(channel.id)} className={`${styles.conversationRow} ${channel.id === selectedId ? styles.conversationActive : ""}`}>
              <span className={styles.conversationAvatar}>{channel.guest.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
              <span className={styles.conversationText}>
                <b>{channel.guest}</b>
                <small>{channel.preview}</small>
                <em><ChannelMark id={channel.id} />{channel.label}</em>
              </span>
            </button>
          ))}
        </div>

        <section className={styles.demoThread} aria-live="polite">
          <header>
            <div><b>{selected.guest}</b><span>{selected.meta}</span></div>
            <button type="button" className={styles.assignment}><UserRoundCheck size={14} aria-hidden="true" />{selected.route}</button>
            <button type="button" className={styles.taskButton}><ClipboardCheck size={14} aria-hidden="true" />Create task</button>
          </header>
          <div className={styles.messages}>
            <span className={styles.threadDay}>Today</span>
            <div className={styles.incoming}>{selected.incoming}</div>
            <div className={styles.outgoing}>{selected.reply}<span>Sarah · now <CheckCheck size={12} aria-hidden="true" /></span></div>
            <div className={styles.taskArtifact}>
              <span><ClipboardCheck size={16} aria-hidden="true" /></span>
              <div><small>TASK FROM CONVERSATION</small><b>Deliver two extra towels · Room 204</b><p>Guest and source message kept with the work.</p></div>
            </div>
          </div>
          <footer>
            <div><span>Reply in {selected.label}</span><small>{selected.badge}</small></div>
            <button type="button" aria-label="Guest context"><PanelRight size={15} aria-hidden="true" /></button>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default function MessagingPage() {
  return (
    <div className={styles.page}>
      <section className={`ib-dark ${styles.hero}`}>
        <div className="ib-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <Eyebrow>INTEGRATED MESSAGING</Eyebrow>
              <h1>Every guest message.<br /><em>One place to take care of it.</em></h1>
              <p className={styles.intro}>Bring Guest Companion, WhatsApp and SMS conversations into one operational workspace — with the guest, the stay and the next piece of work kept close.</p>
              <div className="ib-actions">
                <Button href="/contact">See Messaging in Innbase</Button>
                <TextLink href="#workflow">How it works</TextLink>
              </div>
              <Reassurance>Conversation on one side. Operational follow-through on the other.</Reassurance>
            </div>
            <InboxDemo />
          </div>
          <div className={styles.channelStrip} aria-label="Supported messaging surfaces shown in the product design">
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
                <div><span>{number}</span><Icon size={24} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`ib-section ib-paper-alt ${styles.contextSection}`}>
        <div className="ib-container">
          <div className={styles.contextGrid}>
            <div className={styles.contextCopy}>
              <Eyebrow>THE CONVERSATION HAS CONTEXT</Eyebrow>
              <h2>Not just a phone number.<br /><em>The guest behind it.</em></h2>
              <p>Keep the conversation beside the information your team needs to respond well: the guest, room or booking context, useful tags, notes and the current owner of the thread.</p>
              <ul>
                <li><Check size={15} aria-hidden="true" />Room and stay context close to the thread</li>
                <li><Check size={15} aria-hidden="true" />Clear conversation status and assignment</li>
                <li><Check size={15} aria-hidden="true" />Operational task creation without losing the source message</li>
              </ul>
            </div>
            <div className={styles.contextCard}>
              <div className={styles.contextCardHead}><span>CO</span><div><b>Chinedu Okafor</b><p>Guest Companion · live</p></div></div>
              <div className={styles.contextRows}>
                <div><span>Room</span><b>204</b></div>
                <div><span>Booking</span><b>BK-20491</b></div>
                <div><span>Stay</span><b>In house</b></div>
                <div><span>Assigned to</span><b>Front Desk Team</b></div>
              </div>
              <div className={styles.contextNote}><MessageCircle size={16} aria-hidden="true" /><div><small>SOURCE MESSAGE</small><p>“Can I get two extra towels?”</p></div></div>
              <div className={styles.contextTask}><ClipboardCheck size={18} aria-hidden="true" /><div><small>CONNECTED TASK</small><b>Deliver two extra towels</b><p>Room 204 · Housekeeping</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className={`ib-section ${styles.operationalSection}`}>
        <div className="ib-container">
          <div className={styles.operationalLead}>
            <Eyebrow>BUILT FOR THE SHIFT, NOT THE INBOX</Eyebrow>
            <h2>A better reply is good.<br /><em>A completed request is better.</em></h2>
          </div>
          <div className={styles.operationalRows}>
            {[
              ["Guest asks", "A request arrives through a supported guest channel.", "Conversation"],
              ["Front desk understands", "The thread carries who the guest is and the stay context available to the team.", "Context"],
              ["Work gets handed off", "Create the task and route the operational follow-through without copying the request into another system.", "Task"],
              ["Conversation stays intact", "The team can return to the original thread with the reason for the work still visible.", "Continuity"],
            ].map(([title, body, label], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><small>{label}</small><h3>{title}</h3><p>{body}</p></div>
                <ArrowRight size={20} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`ib-dark ${styles.bridge}`}>
        <div className="ib-container">
          <div>
            <Eyebrow>ONE CONNECTED GUEST OPERATION</Eyebrow>
            <h2>The guest can just ask.<br /><em>Your team can take it from there.</em></h2>
            <p>Guest Companion gives the guest a direct way in. Messaging gives your team one place to own the conversation. Tasks carry the operational work forward.</p>
            <div className="ib-actions"><Button href="/contact">Let’s talk about your hotel</Button><TextLink href="/guest-companion">Meet Guest Companion</TextLink></div>
          </div>
          <div className={styles.bridgeFlow} aria-label="Guest request flow">
            <div><Sparkles size={20} aria-hidden="true" /><span>Guest Companion</span></div>
            <ArrowRight size={18} aria-hidden="true" />
            <div><MessagesSquare size={20} aria-hidden="true" /><span>Messaging</span></div>
            <ArrowRight size={18} aria-hidden="true" />
            <div><ClipboardCheck size={20} aria-hidden="true" /><span>Task</span></div>
          </div>
        </div>
      </section>

      <FAQ items={FAQ_ITEMS} title={<>A few things<br /><em>worth knowing.</em></>} description="Messaging is part of the wider Innbase operation. We’ll confirm channel setup and rollout details around your property." />
    </div>
  );
}
