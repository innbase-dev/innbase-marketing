import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import PostPage from "@/components/marketing/blog/PostPage";
import {
  breadcrumbListJsonLd,
  buildPostMetadata,
  getPost,
  getPosts,
  getRelatedPosts,
  postFaqJsonLd,
  postJsonLd,
} from "@/lib/blog";
import { BLOG } from "@/data/blog/blogData";
import { JsonLd, absoluteUrl } from "@/lib/seo";

// Known posts remain prerendered. Let resolve() return the normal 404 for
// unknown slugs; Next 16.3.2 otherwise logs an internal NoFallbackError.
export const dynamicParams = true;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

function resolve(params) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }) {
  return buildPostMetadata(resolve(await params));
}

export default async function BlogPostPage({ params }) {
  const post = resolve(await params);
  const relatedPosts = getRelatedPosts(post);
  const faq = postFaqJsonLd(post);

  return (
    <MarketingShell>
      <PostPage post={post} relatedPosts={relatedPosts} canonicalUrl={absoluteUrl(post.path)} />
      <JsonLd
        data={[
          postJsonLd(post),
          ...(faq ? [faq] : []),
          breadcrumbListJsonLd([
            { name: "Blog", path: BLOG.path },
            { name: post.category.name, path: post.category.path },
            { name: post.headline, path: post.path },
          ]),
        ]}
      />
    </MarketingShell>
  );
}
