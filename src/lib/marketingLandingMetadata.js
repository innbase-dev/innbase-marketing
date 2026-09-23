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
  };
}
