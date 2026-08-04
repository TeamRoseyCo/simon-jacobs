import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
// Renamed from globals.css on 2 Aug 2026. Turbopack derives the stylesheet's
// chunk URL from this path, and browsers were holding a cached copy of the old
// URL, rendering current HTML against a stale stylesheet. Renaming the file
// mints a URL nothing has cached.
import "./site.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import CookieConsent from "@/components/CookieConsent";
import AttributionCapture from "@/components/AttributionCapture";
import { site } from "@/lib/content";

// Body sans, chosen off the /font-lab comparison. next/font downloads Figtree at
// build time and serves it from our own origin, so there is no request to
// Google at runtime: one less third party on a page that asks for financial
// details, and nothing for the cookie banner to have to cover.
// display:swap so copy paints in the fallback immediately rather than blocking.
// Headings stay Georgia (--font-serif); this variable only feeds --font-sans.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-figtree",
  fallback: ["Arial", "Helvetica", "Segoe UI", "sans-serif"],
});

const siteUrl = site.url;
// GA4 properties. Both are consent-gated by the Consent Mode v2 block below
// (consent is set at the gtag level, so it applies to every config'd property).
// The gtag.js library only needs loading once; extra properties are added with
// additional gtag('config', ...) calls.
const GA_IDS = ["G-FJGM7PLZEC", "G-6S1EHH7C90"];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chartered Tax Advisers for UK Agencies | SRJ International",
    template: "%s | SRJ International",
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
    title: "SRJ International | Chartered Tax Advisers for UK Marketing Agencies",
    description:
      "Tax planning, profit extraction, and accountancy for UK marketing agencies, so you stop leaving money on the table.",
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
    title: "SRJ International | Chartered Tax Advisers for UK Marketing Agencies",
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
  "@id": `${siteUrl}/#organization`,
  name: "SRJ International",
  legalName: "SRJ International Limited",
  alternateName: "Jacobs Taxes",
  description:
    "Tax planning, profit extraction, and accountancy for UK marketing agencies.",
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
  // Reference the one canonical Simon Jacobs Person node (defined in full on
  // /about with the stable @id below) instead of re-describing him here, so
  // Google/LLMs merge every mention into a single entity rather than several
  // near-duplicate inline Persons.
  founder: { "@id": `${siteUrl}/#simon-jacobs` },
  knowsAbout: [
    "Tax planning",
    "Profit extraction",
    "Corporation tax",
    "Director remuneration",
    "Agency accountancy",
  ],
};

// Sitewide WebSite entity, tying the "SRJ International" / "Jacobs Taxes" site
// name to the organization as publisher. Deliberately NO potentialAction /
// SearchAction: the site has no on-site search endpoint, so declaring one would
// be false.
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
        <main className="site-shell flex-1 overflow-hidden bg-bg text-ink">
          {children}
        </main>
        <SiteFooter />
        <ScrollReveal />
        <CookieConsent />
        {/* Records which of Simon's tagged links brought this visitor in, on
            whatever page they land on, so the forms can send it with the
            enquiry. Renders nothing and sets no cookie: the value lives in
            sessionStorage for this visit only, is first-party, and travels no
            further than the enquiry the visitor chooses to submit. Analytics
            stays behind the consent banner, see src/lib/analytics.ts. */}
        <AttributionCapture />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* Google Consent Mode v2: deny all storage BEFORE gtag loads. The
            CookieConsent banner flips these to 'granted' only on user opt-in,
            so no analytics/ads cookies are set without consent (UK PECR/GDPR). */}
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
