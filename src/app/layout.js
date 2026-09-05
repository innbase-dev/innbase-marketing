import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Instrument_Sans, Caveat } from "next/font/google";
import Script from "next/script";
import { JsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
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
      <head>
        {/* Silktide Consent Manager — stylesheet */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          id="silktide-consent-manager-css"
          href="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css"
          integrity="sha384-EdMq+R+YOnsbelo08wPenoTlnxbAyxI11NMIxzugx/qAsbh64KcOkqxYqq6pfvO/"
          crossOrigin="anonymous"
        />
        {/* Silktide Consent Manager — brand overrides */}
        <style
          id="silktide-consent-manager-overrides"
          dangerouslySetInnerHTML={{
            __html: `
              #stcm-wrapper {
                --boxShadow: -5px 5px 10px 0px #00000012, 0px 0px 50px 0px #0000001a;
                --fontFamily: Helvetica Neue, Segoe UI, Arial, sans-serif;
                --primaryColor: #d4af37;
                --backgroundColor: #0b0e13;
                --textColor: #FFFFFF;
                --backdropBackgroundColor: #00000033;
                --backdropBackgroundBlur: 0px;
                --iconColor: #d4af37;
                --iconBackgroundColor: #0b0e13;
              }
            `,
          }}
        />
      </head>
      <body className={`${instrumentSans.className} ${caveat.variable}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <Script id="civchat-config" data-cfasync="false">
          {`window.civchat = {apiKey: "nm97mo",};`}
        </Script>
        <Script data-cfasync="false" src="https://innbase.user.com/widget.js" />
        
        {/* Silktide Consent Manager */}
        <Script src="https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js" integrity="sha384-5Pt34uiIbCsvfiiZXoLi4HRf/YBXjr9c8e+gYeVo9smUaInNHYVtc8NZ8wUnXJIq" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script id="silktide-consent-init" strategy="afterInteractive">
          {`window.silktideConsentManager.init({
  backdrop: {
    show: true
  },
  icon: {
    position: "bottomLeft"
  },
  prompt: {
    position: "bottomLeft"
  },
  consentTypes: [
    {
      id: "essential",
      label: "Essential",
      description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
      required: true,
      onAccept: function() {
        console.log('Add logic for the required Essential consent type here');
      }
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
      required: false,
      gtag: [
        "analytics_storage",
        "personalization_storage"
      ],
      scripts: [
        {
          url: "https://www.googletagmanager.com/gtag/js?id=G-3FF2TGHN9M",
          load: "async"
        }
      ],
      onAccept: function() {
        // Google Analytics 4 (G-3FF2TGHN9M)
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-3FF2TGHN9M');
      }
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.</p>",
      required: false,
      gtag: [
        "ad_storage",
        "ad_user_data",
        "ad_personalization"
      ]
    }
  ],
  text: {
    prompt: {
      description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>",
      acceptAllButtonText: "Accept all",
      acceptAllButtonAccessibleLabel: "Accept all cookies",
      rejectNonEssentialButtonText: "Reject non-essential",
      rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
      preferencesButtonText: "Preferences",
      preferencesButtonAccessibleLabel: "Toggle preferences"
    },
    preferences: {
      title: "Customize your cookie preferences",
      description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
      saveButtonText: "Save and close",
      saveButtonAccessibleLabel: "Save your cookie preferences",
      creditLinkText: "Get this banner for free",
      creditLinkAccessibleLabel: "Get this banner for free"
    }
  }
});`}
        </Script>
      </body>

      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
    </html>
  );
}
