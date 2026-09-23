import BlogHome from "@/components/marketing/blog/BlogHome";
import MarketingShell from "@/components/marketing/MarketingShell";
import { BLOG } from "@/data/blog/blogData";
import { blogJsonLd, buildBlogIndexMetadata, getCategories, getPosts } from "@/lib/blog";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildBlogIndexMetadata({
  title: BLOG.seoTitle,
  description: BLOG.description,
  path: BLOG.path,
});

export default function BlogIndexPage() {
  const posts = getPosts();
  const categories = getCategories();
  return (
    <MarketingShell>
      <BlogHome posts={posts} categories={categories} />
      <JsonLd data={[blogJsonLd(), breadcrumbJsonLd("Blog", BLOG.path)]} />
    </MarketingShell>
  );
}
