import { notFound } from "next/navigation";
import BlogHome from "@/components/marketing/blog/BlogHome";
import MarketingShell from "@/components/marketing/MarketingShell";
import {
  buildBlogIndexMetadata,
  getCategories,
  getCategory,
  getPostsByCategory,
  isTopicIndexable,
  topicJsonLd,
} from "@/lib/blog";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Known topics remain prerendered; resolve() handles unknown topics with 404.
// This avoids Next 16.3.2's internal NoFallbackError for dynamicParams=false.
export const dynamicParams = true;

export function generateStaticParams() {
  // Every topic gets a real page, even one with a single post today — see
  // metadata below for how a thin topic is kept out of search results
  // without being unreachable for a reader already on the blog.
  return getCategories().map(({ id }) => ({ category: id }));
}

function resolve(params) {
  const category = getCategory(params.category);
  if (!category) notFound();
  return category;
}

export async function generateMetadata({ params }) {
  const category = resolve(await params);
  const indexable = isTopicIndexable(category);
  return buildBlogIndexMetadata({
    title: category.seoTitle,
    description: category.description,
    path: category.path,
    robots: indexable ? undefined : { index: false, follow: true },
    imageAlt: `${category.name}: guides from the Innbase blog`,
  });
}

export default async function BlogCategoryPage({ params }) {
  const category = resolve(await params);
  const posts = getPostsByCategory(category.id);
  const categories = getCategories();

  return (
    <MarketingShell>
      <BlogHome posts={posts} categories={categories} category={category} />
      <JsonLd
        data={[
          topicJsonLd(category, posts),
          breadcrumbJsonLd(category.name, category.path),
        ]}
      />
    </MarketingShell>
  );
}
