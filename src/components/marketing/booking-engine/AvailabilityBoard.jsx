import { NIGHTS, ROOMS } from "@/data/bookingEngineData";
import styles from "./BookingEngine.module.css";

// A small tape chart: rooms down the side, nights across the top.
// `cells` overrides individual nights, keyed `${roomId}:${night}`, with
// { state: "held" | "new" | "released", label }. Everything else comes from
// the sample bookings in bookingEngineData.
export default function AvailabilityBoard({ cells = {}, focusType = null, offered = null, unavailable = [], caption }) {
  return (
    <div className={styles.board}>
      <table>
        <caption className={styles.visuallyHidden}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Room</th>
            {NIGHTS.map((night) => <th scope="col" key={night}>{night}</th>)}
          </tr>
        </thead>
        <tbody>
          {ROOMS.map((room) => {
            const dimmed = focusType && room.type !== focusType;
            const rowClass = [
              dimmed ? styles.dimmed : "",
              offered === room.id ? styles.offered : "",
              unavailable.includes(room.id) ? styles.unavailable : "",
            ].join(" ");
            return (
              <tr key={room.id} className={rowClass}>
                <th scope="row">
                  <span>{room.type}</span>
                  <b>{room.id}</b>
                </th>
                {NIGHTS.map((night) => {
                  const override = cells[`${room.id}:${night}`];
                  const guest = room.booked[night];
                  const state = override?.state ?? (guest ? "booked" : "free");
                  const label = override?.label ?? guest ?? "";
                  return (
                    <td key={night} className={styles[`cell_${state}`]}>
                      <span className={styles.cellInner}>
                        {label || <span className={styles.visuallyHidden}>Free</span>}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className={styles.legend} aria-label="Key">
        <li><i className={styles.keyFree} />Free</li>
        <li><i className={styles.keyBooked} />Booked</li>
        <li><i className={styles.keyHeld} />On hold</li>
        <li><i className={styles.keyNew} />New booking</li>
      </ul>
    </div>
  );
}
