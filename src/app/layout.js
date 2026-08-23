import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Your Hotel Control Center | Innbase",
  description:
    "The AI operating system for hospitality. Automatically reconcile every sale, payment, shift, and stock movement so you always know where revenue is made—or lost.",
  robots: "index,follow,max-image-preview:large",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Hotel Control Center | Innbase",
    description: "Every sale. Every payment. Every shift. Every bottle. Automatically reconciled.",
  },
};

export const viewport = {
  themeColor: "#0b0e13",
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Innbase",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Reconciliation software for hotels and bars — payments, inventory, shifts and guest folios reconciled automatically.",
  areaServed: "NG",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does setup actually take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One afternoon for most properties. We import opening balances and stock counts, connect bank statements and Pos exports, and the first shift runs on Innbase the same evening.",
      },
    },
    {
      "@type": "Question",
      name: "Will my staff need training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each role sees only its own screen. Most teams are comfortable by the second shift.",
      },
    },
    {
      "@type": "Question",
      name: "Which banks and POS providers does it work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Statement imports work with every Nigerian bank our pilots use today, including GTBank, UBA, Access, and Zenith, alongside Moniepoint and Opay POS records.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when a match is wrong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nothing is final until a person confirms it. Innbase proposes matches with a confidence score; you accept, correct, or reject each one.",
      },
    },
    {
      "@type": "Question",
      name: "Is our data safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Data is encrypted in transit and at rest, access is role-based, and you can export everything at any time.",
      },
    },
    {
      "@type": "Question",
      name: "What does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A flat monthly fee per property, quoted on the demo call. All modules and unlimited staff accounts included; no card required to start.",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
      {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
    </html>
  );
}
