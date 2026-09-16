import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import "./site.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AttributionCapture from "@/components/AttributionCapture";
import { site } from "@/lib/content";
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-figtree",
  fallback: ["Arial", "Helvetica", "Segoe UI", "sans-serif"],
});

const siteUrl = site.url;
const GA_IDS = ["G-FJGM7PLZEC", "G-6S1EHH7C90"];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chartered Tax Advisers for UK Business Owners | SRJ International",
    template: "%s | SRJ International",
  },
  description:
    "Tax planning, profit extraction, and accountancy for owner-managed UK businesses. Chartered Tax Adviser (CTA · ACA) and PwC trained, with a focus on cross-border tax and business sales.",
  keywords: [
    "chartered tax adviser",
    "accountants for UK business owners",
    "UK to Dubai tax advice",
    "cross-border tax adviser UK",
    "tax when selling a business UK",
    "profit extraction",
    "director pay",
    "corporation tax planning",
    "tax adviser for marketing agencies",
    "agency accountant",
  ],
  authors: [{ name: "SRJ International" }],
  creator: "SRJ International",
  publisher: "SRJ International",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "SRJ International",
    title: "SRJ International | Chartered Tax Advisers for UK Business Owners",
    description:
      "Tax planning, profit extraction, and accountancy for owner-managed UK businesses, so you stop leaving money on the table.",
    images: [
      {
        url: "/simon-jacobs.jpg",
        width: 961,
        height: 961,
        alt: "SRJ International, Chartered Tax Advisers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SRJ International | Chartered Tax Advisers for UK Business Owners",
    description:
      "Tax planning, profit extraction, and accountancy for owner-managed UK businesses.",
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
  "@id": `${siteUrl}/#organization`,
  name: "SRJ International",
  legalName: "SRJ International Limited",
  alternateName: "Jacobs Taxes",
  description:
    "Tax planning, profit extraction, and accountancy for owner-managed UK businesses.",
  url: siteUrl,
  image: `${siteUrl}/simon-jacobs.jpg`,
  logo: `${siteUrl}/simon-jacobs.jpg`,
  email: "simon@srjinternational.co.uk",
  telephone: "+447821900992",
  areaServed: "GB",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10 Northcliffe Drive",
    addressLocality: "London",
    addressRegion: "England",
    postalCode: "N20 8JZ",
    addressCountry: "GB",
  },
  sameAs: [site.linkedin, site.instagram, site.icaew],
  founder: { "@id": `${siteUrl}/#simon-jacobs` },
  knowsAbout: [
    "Tax planning",
    "Profit extraction",
    "Corporation tax",
    "Director remuneration",
    "Cross-border taxation",
    "Statutory residence test",
    "Business sale and exit planning",
    "Business Asset Disposal Relief",
    "VAT",
    "Self assessment",
  ],
};
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "SRJ International",
  alternateName: ["Jacobs Taxes", "SRJ International Limited"],
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-GB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="site-shell flex-1 bg-bg text-ink">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />

        <AttributionCapture />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />

        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_IDS[0]}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`gtag('js', new Date());
${GA_IDS.map((id) => `gtag('config', '${id}');`).join("\n")}`}
        </Script>
      </body>
    </html>
  );
}
