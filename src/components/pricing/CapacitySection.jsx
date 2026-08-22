import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CONTRAST_NEVER, CONTRAST_ACTUAL } from "@/data/pricingPlans";

export default function CapacitySection() {
  return (
    <section className="sec" id="capacity">
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">How growth works</span>
          <h2 className="sec-h2">Your subscription grows with your operation — never a surprise.</h2>
          <p className="sec-sub">
            Staff accounts decide your plan. We keep an eye on real usage too, so you stay
            right-sized as you grow — without ever cutting off a busy shift.
          </p>
        </Reveal>
        <Reveal className="contrast-grid reveal-stag reveal">
          <div className="contrast-col never">
            <div className="contrast-h">
              <Icon name="x" className="icon" style={{ width: 13, height: 13 }} />
              What never happens
            </div>
            <div className="contrast-list">
              {CONTRAST_NEVER.map((item) => (
                <div className="contrast-item" key={item}>
                  <Icon name="x" className="icon" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="contrast-col actual">
            <div className="contrast-h">
              <Icon name="check" className="icon" style={{ width: 13, height: 13 }} />
              What actually happens
            </div>
            <div className="contrast-list">
              {CONTRAST_ACTUAL.map((item) => (
                <div className="contrast-item" key={item}>
                  <Icon name="check" className="icon" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
