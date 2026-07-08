import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import CookieConsent from "@/components/CookieConsent";

const siteUrl = "https://srjinternational.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SRJ International | Chartered Tax Advisers for UK Marketing Agencies",
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
  name: "SRJ International",
  legalName: "SRJ International Limited",
  description:
    "Tax planning, profit extraction, and accountancy for UK marketing agencies.",
  url: siteUrl,
  image: `${siteUrl}/simon-jacobs.jpg`,
  email: "simon@srjinternational.co.uk",
  telephone: "+447821900992",
  areaServed: "GB",
  knowsAbout: [
    "Tax planning",
    "Profit extraction",
    "Corporation tax",
    "Director remuneration",
    "Agency accountancy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="site-shell flex-1 overflow-hidden bg-bg text-ink">
          {children}
        </main>
        <SiteFooter />
        <ScrollReveal />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FJGM7PLZEC"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-FJGM7PLZEC');`}
        </Script>
      </body>
    </html>
  );
}
