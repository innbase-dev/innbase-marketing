import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import MiniLandingPage from "@/components/marketing/landing/MiniLandingPage";
import { getLandingPage, getLandingPages } from "@/data/marketingLandingPages";
import { buildLandingMetadata } from "@/lib/marketingLandingMetadata";

// Let resolvePage return a normal notFound() response for unknown slugs.
// Next 16.3.2 logs an internal NoFallbackError with dynamicParams=false.
export const dynamicParams = true;

export function generateStaticParams() {
  return getLandingPages("platform").map(({ slug }) => ({ slug }));
}

async function resolvePage(params) {
  const { slug } = await params;
  const page = getLandingPage("platform", slug);
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }) {
  return buildLandingMetadata(await resolvePage(params));
}

export default async function PlatformPage({ params }) {
  const page = await resolvePage(params);
  return <MarketingShell><MiniLandingPage page={page} /></MarketingShell>;
}
