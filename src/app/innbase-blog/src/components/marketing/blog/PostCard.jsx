import Link from "next/link";
import { formatDate } from "@/lib/blog";
import PostCover from "./PostCover";
import styles from "./Blog.module.css";

// The whole card is clickable through the title link's ::after (one link per
// card for screen readers and crawlers); the topic link sits above it.
export default function PostCard({ post, level = 3 }) {
  const Heading = `h${level}`;
  return (
    <article className={styles.card}>
      <PostCover cover={post.cover} />
      <div className={styles.cardMeta}>
        <Link href={post.category.path} className={styles.cardTopic}>
          {post.category.name}
        </Link>
        <span>{post.readingMinutes} min read</span>
      </div>
      <Heading className={styles.cardTitle}>
        <Link href={post.path}>
          {post.headline} <em>{post.emphasis}</em>
        </Link>
      </Heading>
      <p className={styles.cardExcerpt}>{post.excerpt}</p>
      <time className={styles.cardDate} dateTime={post.publishedAt}>
        {formatDate(post.publishedAt)}
      </time>
    </article>
  );
}
