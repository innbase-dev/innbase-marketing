import { buildSocialMetadata } from "./seo";

export function buildLandingMetadata(page) {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    ...buildSocialMetadata({
      title: page.title,
      description: page.description,
      path: page.href,
    }),
    // A preview build can render unpublished pages; keep them out of search.
    ...(page.published ? {} : { robots: { index: false, follow: false } }),
  };
}
