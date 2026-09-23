import Image from "next/image";
import styles from "./Blog.module.css";

// Transparent 4:3 artwork is shared by the index, category and article views.
// Contain the entire illustration, including its floor, at every breakpoint.
export default function PostCover({ cover, size = "card", priority = false }) {
  return (
    <div
      className={`${styles.cover}${size === "large" ? ` ${styles.coverLarge}` : ""}`}
      data-tone={cover.tone || "sage"}
    >
      <Image
        className={styles.coverImage}
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes={size === "large"
          ? "(max-width: 760px) calc(100vw - 48px), (max-width: 1000px) 480px, 560px"
          : "(max-width: 760px) calc(100vw - 48px), (max-width: 1000px) 45vw, 420px"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}
