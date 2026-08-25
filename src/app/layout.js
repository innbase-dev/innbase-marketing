import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { JsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Innbase",
    default: "Your Hotel Control Center | Innbase",
  },
  description:
    "The AI operating system for hospitality. Automatically reconcile every sale, payment, shift, and stock movement so you always know where revenue is made—or lost.",
  keywords: [
    "hospitality",
    "hotel management",
    "AI operating system",
    "reconciliation",
    "restaurant software",
    "bar software",
    "hotel revenue",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Innbase",
    title: "Your Hotel Control Center | Innbase",
    description:
      "The AI operating system helping hotels, restaurants, and bars eliminate revenue leakage through intelligent reconciliation and operations.",
    url: "https://innbase.co",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Innbase Hotel Control Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Hotel Control Center | Innbase",
    description:
      "Every sale. Every payment. Every shift. Every bottle. Automatically reconciled.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport = {
  themeColor: "#0b0e13",
};

// Site-wide entity schema. These describe the company and the website
// itself, so — unlike FAQPage or Product schema — they are accurate on
// every route and belong in the root layout. Page-specific structured data
// (FAQPage, Offers, BreadcrumbList) lives on the pages whose visible
// content it actually matches; see src/lib/seo.js.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/innbase-light.svg`,
  description:
    "Innbase builds the AI operating system for hospitality — reconciling payments, inventory, shifts, and guest folios automatically for hotels, restaurants, and bars.",
  email: "hello@innbase.co",
  areaServed: "NG",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <Script id="civchat-config" data-cfasync="false">
          {`window.civchat = {apiKey: "nm97mo",};`}
        </Script>
        <Script data-cfasync="false" src="https://innbase.user.com/widget.js" />
      </body>
      <GoogleAnalytics gaId="G-3FF2TGHN9M" />
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
    </html>
  );
}
