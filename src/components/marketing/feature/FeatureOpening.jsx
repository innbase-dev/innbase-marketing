import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button, Eyebrow, TextLink } from "../Primitives";
import styles from "./FeatureOpening.module.css";

export default function FeatureOpening({ name, title, emphasis, intro, primary, secondary, photo, alt, recordLabel, recordTitle, children, chapters }) {
  return (
    <section className={`ib-dark ${styles.opening}`} aria-labelledby="feature-title">
      <div className={`ib-container ${styles.hero}`}>
        <div className={styles.copy}>
          <Eyebrow>{name}</Eyebrow>
          <h1 id="feature-title">{title} <em>{emphasis}</em></h1>
          <p className={styles.intro}>{intro}</p>
          <div className="ib-actions">
            <Button href={primary.href}>{primary.label}</Button>
            <TextLink href={secondary.href}>{secondary.label}</TextLink>
          </div>
        </div>
        <figure className={styles.scene}>
          <div className={styles.photo}>
            <Image src={photo} alt={alt} fill preload sizes="(max-width: 760px) 100vw, (max-width: 1440px) 50vw, 650px" />
          </div>
          <figcaption className={styles.record}>
            <div className={styles.recordHead}>
              <span>{recordLabel}</span>
              <strong>{recordTitle}</strong>
            </div>
            {children}
          </figcaption>
        </figure>
      </div>
      <nav className={`ib-container ${styles.chapters}`} aria-label={`Explore ${name}`}>
        {chapters.map(({ href, label, detail, Icon }) => (
          <a href={href} key={href}>
            <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
            <span><strong>{label}</strong><small>{detail}</small></span>
            <ChevronDown size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </section>
  );
}
