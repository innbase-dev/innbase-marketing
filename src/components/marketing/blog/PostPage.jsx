import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/blog";
import { buildBlogAiOptions } from "@/lib/blogAi";
import { FAQ } from "../Primitives";
import Breadcrumb from "./Breadcrumb";
import FeedLink from "./FeedLink";
import ExploreWithAI from "./ExploreWithAI";
import PostBody from "./PostBody";
import PostCard from "./PostCard";
import PostCover from "./PostCover";
import ShareLinks from "./ShareLinks";
import TableOfContents from "./TableOfContents";
import styles from "./Blog.module.css";

export default function PostPage({ post, relatedPosts, canonicalUrl }) {
  const updated = post.updatedAt !== post.publishedAt;

  return (
    <article className={styles.page}>
      <section className={`ib-dark ${styles.postHero}`}>
        <div className="ib-container">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category.name, href: post.category.path },
              { label: post.headline },
            ]}
          />
          <div className={styles.postHeroGrid}>
            <div>
              <h1>
                {post.headline} <em>{post.emphasis}</em>
              </h1>
              <div className={styles.postMeta}>
                <Link href={post.category.path}>{post.category.name}</Link>
                <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
                {updated && <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>}
                <span>{post.readingMinutes} min read</span>
              </div>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
            </div>
            <PostCover cover={post.cover} size="large" priority />
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className="ib-container">
          <ExploreWithAI options={buildBlogAiOptions(post, canonicalUrl)} />
          <div className={styles.bodyGrid}>
            <div className={styles.article}>
              <PostBody blocks={post.body} />
              <ShareLinks url={canonicalUrl} title={post.title} />
            </div>

            <aside className={styles.sidebar}>
              {post.takeaways.length > 0 && (
                <div className={styles.takeaways}>
                  <p className={styles.takeawaysTitle}>The short version</p>
                  <ul>
                    {post.takeaways.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {post.headings.length > 1 && <TableOfContents headings={post.headings} />}

              <div className={styles.author}>
                <p className={styles.authorLabel}>Written by</p>
                <p className={styles.authorName}>{post.author.name}</p>
                <p className={styles.authorBio}>{post.author.bio}</p>
              </div>

              <FeedLink>Follow the blog</FeedLink>
            </aside>
          </div>
        </div>
      </section>

      {post.faqs.length > 0 && (
        <div className={styles.postFaq}>
          <FAQ
            items={post.faqs}
            title={
              <>
                Common
                <br />
                <em>questions.</em>
              </>
            }
            description="Still puzzling something out for your property? We’re happy to talk it through."
          />
        </div>
      )}

      {relatedPosts.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <div className="ib-container">
            <div className={styles.relatedHeading}>
              <p className="ib-eyebrow">
                <span aria-hidden="true" />
                KEEP READING
              </p>
              <h2 id="related-title">
                More on running
                <br />
                <em>a tighter operation.</em>
              </h2>
            </div>
            <div className={styles.grid}>
              {relatedPosts.map((related) => (
                <PostCard key={related.slug} post={related} level={3} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
