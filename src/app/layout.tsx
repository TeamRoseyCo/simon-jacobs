import type { Metadata } from "next";
import { Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";

const brandScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
});

// Italic display face used for the teal emphasis motif (highlight words).
const displaySerif = Playfair_Display({
  weight: ["500", "600"],
  style: ["italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const siteUrl = "https://simonjacobs.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Simon Jacobs | Chartered Tax Adviser for UK Marketing Agencies",
    template: "%s | Simon Jacobs",
  },
  description:
    "Tax planning, profit extraction, and accountancy for UK marketing agencies. Chartered Tax Adviser (CTA · ACA) and ex-PwC, helping agency owners keep more of what they earn.",
  keywords: [
    "tax adviser for marketing agencies",
    "agency tax planning UK",
    "profit extraction",
    "chartered tax adviser",
    "agency accountant",
    "director pay",
    "corporation tax planning",
  ],
  authors: [{ name: "Simon Jacobs" }],
  creator: "Simon Jacobs",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Simon Jacobs",
    title: "Simon Jacobs | Chartered Tax Adviser for UK Marketing Agencies",
    description:
      "Tax planning, profit extraction, and accountancy for UK marketing agencies, so you stop leaving money on the table.",
    images: [
      {
        url: "/simon-jacobs.jpg",
        width: 961,
        height: 961,
        alt: "Simon Jacobs, Chartered Tax Adviser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Jacobs | Chartered Tax Adviser for UK Marketing Agencies",
    description:
      "Tax planning, profit extraction, and accountancy for UK marketing agencies.",
    images: ["/simon-jacobs.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Simon Jacobs",
  description:
    "Tax planning, profit extraction, and accountancy for UK marketing agencies.",
  url: siteUrl,
  image: `${siteUrl}/simon-jacobs.jpg`,
  email: "hello@simonjacobs.co.uk",
  areaServed: "GB",
  knowsAbout: [
    "Tax planning",
    "Profit extraction",
    "Corporation tax",
    "Director remuneration",
    "Agency accountancy",
  ],
  founder: {
    "@type": "Person",
    name: "Simon Jacobs",
    jobTitle: "Chartered Tax Adviser",
    description:
      "Chartered Tax Adviser (CTA) and Chartered Accountant (ACA), ex-PwC, specialising in UK marketing agencies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`h-full antialiased ${brandScript.variable} ${displaySerif.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="site-shell flex-1 overflow-hidden bg-bg text-ink">
          {children}
        </main>
        <SiteFooter />
        <ScrollReveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
