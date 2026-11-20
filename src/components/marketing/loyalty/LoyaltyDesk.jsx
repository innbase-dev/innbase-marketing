"use client";

import { useRef, useState } from "react";
import { ArrowRight, Ban, Check, CircleDashed, Gift, Phone, Receipt, RotateCcw, UserRound } from "lucide-react";
import { GUEST, MODES, PHONE, PROGRAMMES, REWARDS, SALES, naira } from "@/data/loyaltyData";
import { SectionHeading } from "../Primitives";
import demo from "../feature/FeatureDemo.module.css";
import styles from "./Loyalty.module.css";

const FIRST_SALE = 18460;

// 1-based visit on which the perk is earned, and the spend that earned it.
function earning(programme, target) {
  let total = 0;
  for (let i = 0; i < SALES.length; i += 1) {
    total += SALES[i];
    if (programme === "visits" && i + 1 >= target) return { at: i + 1, spend: total };
    if (programme === "cumulative" && total >= target) return { at: i + 1, spend: total };
    if (programme === "threshold" && SALES[i] >= target) return { at: i + 1, spend: SALES[i] };
  }
  return null;
}

function progress(programme, target, visits) {
  const sales = SALES.slice(0, visits);
  if (programme === "visits") return { text: `${Math.min(visits, target)} of ${target} visits`, ratio: Math.min(visits / target, 1) };
  if (programme === "cumulative") {
    const spend = sales.reduce((a, b) => a + b, 0);
    return { text: `${naira(Math.min(spend, target))} of ${naira(target)}`, ratio: Math.min(spend / target, 1) };
  }
  const best = Math.max(0, ...sales);
  return { text: best ? `Biggest visit ${naira(best)} · needs ${naira(target)}` : `Needs ${naira(target)} in one visit`, ratio: Math.min(best / target, 1) };
}

function Choice({ legend, name, options, value, onChange }) {
  return (
    <fieldset className={styles.choice}>
      <legend>{legend}</legend>
      <div className={styles.chips}>
        {options.map((o) => (
          <label key={o.key} className={`${styles.chip} ${value === o.key ? styles.chipOn : ""}`}>
            <input type="radio" name={name} value={o.key} checked={value === o.key} onChange={() => onChange(o.key)} />
            <span>{o.label}</span>
            {o.hint && <small>{o.hint}</small>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function LoyaltyDesk() {
  const [programme, setProgramme] = useState("visits");
  const [target, setTarget] = useState(5);
  const [reward, setReward] = useState("meal");
  const [mode, setMode] = useState("cashier");
  const [visits, setVisits] = useState(0);
  const [redeemedManually, setRedeemedManually] = useState(false);
  const [tried, setTried] = useState(false);
  const actionRef = useRef(null);

  const p = PROGRAMMES.find((x) => x.key === programme);
  const r = REWARDS.find((x) => x.key === reward);
  const m = MODES.find((x) => x.key === mode);
  const earn = earning(programme, target);
  const earned = earn && visits >= earn.at;
  const redeemed = earned && (mode === "auto" || redeemedManually);
  const prog = progress(programme, target, visits);
  const spendToDate = SALES.slice(0, visits).reduce((total, amount) => total + amount, 0);
  const sale = visits > 0 ? SALES[visits - 1] : null;
  const nextSale = SALES[visits];

  function restart() {
    setVisits(0);
    setRedeemedManually(false);
    setTried(false);
  }

  function pick(setter) {
    return (value) => { setter(value); restart(); };
  }

  function pickProgramme(key) {
    setProgramme(key);
    setTarget(PROGRAMMES.find((x) => x.key === key).initial);
    restart();
  }

  function focusAction() {
    requestAnimationFrame(() => actionRef.current?.focus({ preventScroll: true }));
  }

  function recordSale() {
    setVisits(visits + 1);
    focusAction();
  }

  function redeem() {
    setRedeemedManually(true);
    focusAction();
  }

  let perk;
  if (!sale) perk = ["pending", "Checked after the sale"];
  else if (redeemed) perk = ["pass", `${r.label} · redeemed`];
  else if (earned) perk = ["win", `${r.label} · available`];
  else perk = ["pending", `Not yet · ${prog.text}`];

  let note;
  if (!sale) note = "Changing a rule starts a fresh set of visits so you can try another programme.";
  else if (redeemed && mode === "auto") note = "Applied the moment she qualified, with no staff step. You saw the cost before it was applied.";
  else if (redeemed) note = "You saw what the perk cost before anyone redeemed it. Whether that is worth it is your call.";
  else if (earned && mode === "cashier") note = "The perk waits on the cashier’s screen until they choose to apply it.";
  else if (earned) note = "The perk stays available until Ifeoma asks for it.";
  else note = "Each visit is counted from the sale itself. Ifeoma doesn’t have to ask, or remember.";

  let actionLabel = null;
  if (!earned && nextSale) actionLabel = visits === 0 ? `Record a sale: ${naira(nextSale)}` : `Next visit: ${naira(nextSale)} sale`;
  else if (earned && !redeemed) actionLabel = mode === "cashier" ? "Cashier applies the perk" : "Ifeoma asks for her perk";

  const status = !sale ? "Waiting for a sale" : redeemed ? "Perk redeemed" : earned ? "Perk available" : `Visit ${visits} recorded`;

  return (
    <section className={`ib-section ib-experience ${demo.surface}`} id="explorer">
      <div className="ib-container">
        <SectionHeading eyebrow="TRY THE IDEA" title={<>Set the rule.<br /><em>Watch it play out.</em></>}>
          <p>Choose a programme and a reward, then record a regular’s visits at the counter. You see what the perk costs you next to the spend that earned it.</p>
        </SectionHeading>

        <div className="ib-demo-stage">
          <div className="ib-demo-topline"><span>PROGRAMME EXPLORER</span><span>Design concept · example sales</span></div>

          <div className={styles.deskGrid}>
            <div className={styles.side}>
              <div className="ib-demo-label"><span>01 / YOUR PROGRAMME</span><span>Owner or manager</span></div>
              <div className={styles.panel}>
                <Choice legend="Programme" name="loyalty-programme" value={programme} onChange={pickProgramme}
                  options={PROGRAMMES.map((x) => ({ key: x.key, label: x.short }))} />
                <Choice legend="Qualifies at" name="loyalty-target" value={String(target)} onChange={(v) => { setTarget(Number(v)); restart(); }}
                  options={p.options.map((t) => ({ key: String(t), label: p.optionLabel(t) }))} />
                <Choice legend="Reward" name="loyalty-reward" value={reward} onChange={pick(setReward)}
                  options={REWARDS.map((x) => ({ key: x.key, label: x.label, hint: `costs ${naira(x.cost)}` }))} />
                <Choice legend="Redeemed" name="loyalty-mode" value={mode} onChange={pick(setMode)}
                  options={MODES.map((x) => ({ key: x.key, label: x.label }))} />
                <p className={styles.modeDetail}>{m.detail}</p>

                <div className={styles.cost}>
                  <small>WHAT IT COSTS YOU</small>
                  <p className={styles.rule}>{p.describe(target)} → {r.label}</p>
                  <dl>
                    <div><dt>Reward cost</dt><dd>{naira(r.cost)}</dd></div>
                    <div><dt>Earned after</dt><dd>{earned ? (programme === "threshold" ? `One ${naira(earn.spend)} visit` : `${earn.at} visits · ${naira(earn.spend)}`) : "Not earned yet"}</dd></div>
                    <div className={earned ? styles.costLive : ""}><dt>Cost against that spend</dt><dd>{earned ? `${((r.cost / earn.spend) * 100).toFixed(1)}%` : "—"}</dd></div>
                  </dl>
                </div>
              </div>
            </div>

            <div className="ib-demo-connector" aria-hidden="true"><span /><ArrowRight size={24} /><span /></div>

            <div className={styles.side}>
              <div className="ib-demo-label"><span>02 / AT THE COUNTER</span><span>Cashier</span></div>
              <div className={styles.counter}>
                <div className={styles.till}>
                  <span className={styles.tillIcon} aria-hidden="true"><Receipt size={19} /></span>
                  <div><small>{sale ? `SALE #${FIRST_SALE + visits}` : "THE TILL"}</small><b>{sale ? `Completed · ${naira(sale)}` : "Waiting for a sale"}</b></div>
                </div>

                <ol className={styles.flow}>
                  <li className={sale ? styles.flow_pass : undefined}>
                    <span>{sale ? <Check size={14} aria-hidden="true" /> : <CircleDashed size={14} aria-hidden="true" />}</span>
                    <div><b>Sale completed</b><p>{sale ? `${naira(sale)} recorded as normal` : "Recorded as it is today"}</p></div>
                  </li>
                  <li className={sale ? styles.flow_pass : undefined}>
                    <span>{sale ? <Phone size={14} aria-hidden="true" /> : <CircleDashed size={14} aria-hidden="true" />}</span>
                    <div><b>“Know this guest?”</b><p>{sale ? <>{PHONE} · <strong>{GUEST}</strong>, visit {visits}</> : "One field. No account needed."}</p></div>
                  </li>
                  <li key={`${perk[0]}-${visits}`} className={styles[`flow_${perk[0]}`]}>
                    <span>{perk[0] === "pending" ? <CircleDashed size={14} aria-hidden="true" /> : perk[0] === "win" ? <Gift size={14} aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}</span>
                    <div><b>Perk check</b><p>{perk[1]}</p></div>
                  </li>
                </ol>

                <div className={styles.meter}>
                  <div className={styles.meterHead}><span><UserRound size={13} aria-hidden="true" />{GUEST}</span><span>{prog.text}</span></div>
                  <div className={styles.bar} aria-hidden="true"><i style={{ width: `${prog.ratio * 100}%` }} /></div>
                  <dl className={styles.spend}>
                    <div><dt>Spend to date</dt><dd>{naira(spendToDate)}</dd></div>
                    <div><dt>Reward cost</dt><dd>{naira(r.cost)}</dd></div>
                  </dl>
                </div>

                {redeemed && <p className={styles.applied}><Gift size={15} aria-hidden="true" /><span><b>{r.label}</b> applied to sale #{FIRST_SALE + earn.at}. Cost to you: {naira(r.cost)}.</span></p>}

                <div className={styles.actions}>
                  {actionLabel && <button type="button" className="ib-button ib-button-dark" ref={actionRef} onClick={earned ? redeem : recordSale}>{actionLabel}<ArrowRight size={16} aria-hidden="true" /></button>}
                  {redeemed && !tried && <button type="button" className={styles.tryButton} ref={actionRef} onClick={() => setTried(true)}>Try: apply the perk again</button>}
                  {redeemed && tried && <p className={styles.refusal} role="status"><Ban size={15} aria-hidden="true" /><span>Already redeemed. Each perk is designed to be used once.</span></p>}
                </div>
              </div>
            </div>
          </div>

          <div className="ib-demo-bottom">
            <p>{note}</p>
            <button type="button" className="ib-reset" onClick={restart}><RotateCcw size={15} aria-hidden="true" />Reset example</button>
          </div>
          <p className={styles.visuallyHidden} role="status">{status}. {perk[1]}.</p>
        </div>
      </div>
    </section>
  );
}
