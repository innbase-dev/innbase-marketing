import "./marketing.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import ConsentManager from "@/components/ConsentManager";
import { JsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
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
  themeColor: "#101714",
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
    <html lang="en" className={instrumentSerif.variable}>
      <head>
        {/*
          Consent Mode v2 defaults. Must run before GTM/gtag loads anywhere
          on the page, so it's declared beforeInteractive and placed first.
          Silktide's onAccept/onReject handlers below call gtag('consent',
          'update', ...) once the user actually chooses.
        */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ window.dataLayer.push(arguments); }
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              personalization_storage: 'denied'
            });
          `}
        </Script>

        {/* Silktide Consent Manager — stylesheet */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css"
          integrity="sha384-EdMq+R+YOnsbelo08wPenoTlnxbAyxI11NMIxzugx/qAsbh64KcOkqxYqq6pfvO/"
          crossOrigin="anonymous"
          media="all"
        />

        {/* Silktide Consent Manager — brand overrides */}
        <style
          id="silktide-consent-manager-overrides"
          dangerouslySetInnerHTML={{
            __html: `
              #stcm-wrapper {
                --boxShadow: -5px 5px 10px 0px #00000012, 0px 0px 50px 0px #0000001a;
                --fontFamily: Helvetica Neue, Segoe UI, Arial, sans-serif;
                --primaryColor: #f3bc80;
                --backgroundColor: #101714;
                --textColor: #FFFFFF;
                --backdropBackgroundColor: #00000033;
                --backdropBackgroundBlur: 0px;
                --iconColor: #f3bc80;
                --iconBackgroundColor: #101714;
              }
            `,
          }}
        />
      </head>
      <body className={instrumentSans.className}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>

        {/*
          GTM now lives inside <body> as required. It loads unconditionally
          (GTM's container script itself is lightweight), but any GA4/ads
          tags configured *inside* GTM should be set to respect Consent Mode
          signals (GTM reads the same dataLayer 'consent' commands) — check
          your GTM container's built-in Consent Mode setting if you haven't.
        */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}

        {children}

        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />

        <Script id="civchat-config" strategy="lazyOnload" data-cfasync="false">
          {`window.civchat = {apiKey: "nm97mo",};`}
        </Script>
        <Script
          strategy="lazyOnload"
          data-cfasync="false"
          src="https://innbase.user.com/widget.js"
        />

        <ConsentManager />
      </body>
    </html>
  );
}
