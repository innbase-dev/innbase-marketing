import { Rss } from "lucide-react";
import { BLOG } from "@/data/blog/blogData";

// A plain <a>: the feed is a route handler, not a page to client-navigate to.
export default function FeedLink({ children = "Follow with RSS" }) {
  return (
    <a className="ib-text-link" href={BLOG.feedPath}>
      {children}
      <Rss size={17} aria-hidden="true" />
    </a>
  );
}
