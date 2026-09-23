import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/blog";
import { BLOG } from "@/data/blog/blogData";
import { Button, Eyebrow, SectionHeading } from "../Primitives";
import LandingIcon from "../landing/LandingIcon";
import Breadcrumb from "./Breadcrumb";
import FeedLink from "./FeedLink";
import PostCard from "./PostCard";
import PostCover from "./PostCover";
import styles from "./Blog.module.css";

const SUGGEST_HREF = "mailto:hello@innbase.co?subject=Blog%20topic%20suggestion";

function TopicNav({ categories, active, total }) {
  return (
    <div className={styles.topicsWrap}>
      <div className="ib-container">
        <nav className={styles.topics} aria-label="Blog topics">
          <div>
            <h2>Find your topic.</h2>
            <p>Read everything, or start with the part of the day you want to tighten up.</p>
          </div>
          <ul className={styles.topicNav}>
            <li>
              <Link href={BLOG.path} aria-current={active ? undefined : "page"}>
                All guides
                <small>{total}</small>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={category.path} aria-current={active?.id === category.id ? "page" : undefined}>
                  {category.name}
                  <small>{category.count}</small>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

function Featured({ post }) {
  return (
    <section className={styles.featuredSection} aria-label="Featured guide">
      <div className="ib-container">
        <article className={styles.featured}>
          <PostCover cover={post.cover} size="large" priority />
          <div className={styles.featuredCopy}>
            <Eyebrow>START HERE</Eyebrow>
            <h2>
              <Link href={post.path}>
                {post.headline} <em>{post.emphasis}</em>
              </Link>
            </h2>
            <p>{post.excerpt}</p>
            <div className={styles.byline}>
              <Link href={post.category.path}>{post.category.name}</Link>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingMinutes} min read</span>
            </div>
            <div className="ib-actions">
              <Button href={post.path} variant="dark">
                Read the guide
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function TopicList({ categories, heading }) {
  return (
    <section className="ib-section ib-paper-alt" id="topics">
      <div className="ib-container">
        <SectionHeading eyebrow="BROWSE BY TOPIC" title={heading} />
        <ul className={styles.topicList}>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={category.path} className={styles.topicRow}>
                <LandingIcon name={category.icon} size={27} />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <span className={styles.topicCount}>
                  {category.count} {category.count === 1 ? "guide" : "guides"}
                </span>
                <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function BlogHome({ posts, categories, category = null }) {
  const isHome = !category;
  const featured = isHome ? posts[0] : null;
  const list = isHome ? posts.slice(1) : posts;
  const others = categories.filter((c) => c.id !== category?.id);

  return (
    <div className={styles.page}>
      <section className={`ib-dark ${styles.hero} ${styles.homeHero}`} aria-labelledby="blog-title">
        <div className="ib-container">
          <Breadcrumb items={isHome ? [{ label: "Blog" }] : [{ label: "Blog", href: BLOG.path }, { label: category.name }]} />
          <div className={styles.heroBody}>
            <Eyebrow>{isHome ? "THE INNBASE BLOG" : category.name.toUpperCase()}</Eyebrow>
            <h1 id="blog-title">
              {isHome ? (
                <>
                  Hotel operations,
                  <br />
                  <em>explained plainly.</em>
                </>
              ) : (
                <>
                  {category.headline}
                  <br />
                  <em>{category.emphasis}</em>
                </>
              )}
            </h1>
            <div className={styles.heroIntro}>
              <p>
                {isHome
                  ? "Practical guides on payments, stock, shifts, and guest requests, written for hotels, restaurants, and bars across Nigeria."
                  : category.intro}
              </p>
              <FeedLink />
            </div>
          </div>
        </div>
      </section>

      <TopicNav categories={categories} active={category} total={posts.length && (isHome ? posts.length : categories.reduce((n, c) => n + c.count, 0))} />

      {featured && <Featured post={featured} />}

      {list.length > 0 && (
        <section className={styles.listSection} aria-labelledby="guides-title">
          <div className="ib-container">
            <div className={styles.listHeading}>
              <Eyebrow>{isHome ? "MORE TO READ" : "ALL GUIDES"}</Eyebrow>
              <h2 id="guides-title">
                Plain answers to
                <br />
                <em>everyday questions.</em>
              </h2>
            </div>
            <div className={styles.grid}>
              {list.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {isHome ? (
        <TopicList
          categories={categories}
          heading={
            <>
              Start with the part of the day
              <br />
              <em>that worries you most.</em>
            </>
          }
        />
      ) : (
        others.length > 0 && (
          <TopicList
            categories={others}
            heading={
              <>
                More to explore,
                <br />
                <em>one topic at a time.</em>
              </>
            }
          />
        )
      )}

      <section className={styles.suggest}>
        <div className={`ib-container ${styles.suggestInner}`}>
          <div>
            <Eyebrow>YOUR QUESTION, NEXT</Eyebrow>
            <h2>
              Something we should
              <br />
              <em>write about?</em>
            </h2>
          </div>
          <div>
            <p>Tell us what you are trying to work out in your hotel, restaurant, or bar. Good questions become guides.</p>
            <div className="ib-actions">
              <Button href={SUGGEST_HREF}>Suggest a topic</Button>
              <FeedLink />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
