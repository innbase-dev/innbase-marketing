import Image from "next/image";
import { MARKETING_DESTINATIONS } from "@/data/marketingDestinations";
import { Button } from "../Primitives";
import LandingIcon from "../landing/LandingIcon";
import styles from "./Blog.module.css";

function Block({ block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 id={block.id}>{block.text}</h2>;
    case "h3":
      return <h3 id={block.id}>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className={styles.steps}>
          {block.items.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside className={styles.callout} data-tone={block.tone || "note"}>
          {block.title && <p className={styles.calloutTitle}>{block.title}</p>}
          <p className={styles.calloutText}>{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    case "table":
      return (
        <div className={styles.tableWrap} role="region" aria-label={block.caption} tabIndex={0}>
          <table className={styles.table}>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th scope="col" key={cell}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className={styles.figure}>
          <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 1000px) 100vw, 720px" loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "product": {
      const destination = MARKETING_DESTINATIONS[block.id];
      return (
        <aside className={styles.product} aria-label={destination.label}>
          <LandingIcon name={destination.icon} size={26} />
          <div>
            <p className={styles.productLabel}>{destination.label}</p>
            <p>{block.text}</p>
          </div>
          <Button href={destination.href} className="ib-button-small">
            Explore {destination.label}
          </Button>
        </aside>
      );
    }
    default:
      return null;
  }
}

export default function PostBody({ blocks }) {
  return blocks.map((block, index) => <Block key={index} block={block} />);
}
