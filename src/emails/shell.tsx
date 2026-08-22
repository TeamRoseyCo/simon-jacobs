import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Button,
  Link,
  Hr,
} from "@react-email/components";

// SRJ International brand (mirrors src/app/site.css :root). Emails are light,
// calm and professional — ink text on white, a single blue accent, the site's
// accent→seafoam→teal gradient as a hairline, Georgia for headings.
export const brand = {
  page: "#E4EEF6",
  card: "#FFFFFF",
  surface: "#EEF5FA",
  ink: "#08131F",
  muted: "#2B3139",
  soft: "#5B6672",
  accent: "#2F6FC6",
  seafoam: "#9FE7DC",
  teal: "#1A8275",
  border: "#D9E5EF",
};

const SITE = "https://srjinternational.co.uk";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, Helvetica, 'Segoe UI', sans-serif";

export function Layout({
  preview,
  children,
  unsubLink,
}: {
  preview: string;
  children: React.ReactNode;
  unsubLink: string;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: brand.page, fontFamily: SANS }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "28px 12px 40px" }}>
          <Section
            style={{
              backgroundColor: brand.card,
              borderRadius: "16px",
              overflow: "hidden",
              border: `1px solid ${brand.border}`,
            }}
          >
            {/* brand gradient hairline */}
            <Section
              style={{
                height: "4px",
                lineHeight: "4px",
                fontSize: "1px",
                backgroundColor: brand.accent,
                backgroundImage: `linear-gradient(90deg, ${brand.accent}, ${brand.seafoam}, ${brand.teal})`,
              }}
            >
              &nbsp;
            </Section>
            <Section style={{ padding: "30px 34px 0" }}>
              <Img
                src={`${SITE}/logo/srj-wordmark.png`}
                width="120"
                alt="SRJ International"
                style={{ display: "block", border: "0" }}
              />
            </Section>
            <Section style={{ padding: "18px 34px 30px" }}>{children}</Section>
          </Section>
          <Footer unsubLink={unsubLink} />
        </Container>
      </Body>
    </Html>
  );
}

export function H({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: SERIF,
        fontSize: "23px",
        lineHeight: "1.25",
        fontWeight: 500,
        color: brand.ink,
        margin: "0 0 16px",
      }}
    >
      {children}
    </Text>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontSize: "15px", lineHeight: "1.65", color: brand.muted, margin: "0 0 15px" }}>
      {children}
    </Text>
  );
}

// Emphasised inline text (kept as a component so weight/colour stay consistent).
export function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: brand.ink, fontWeight: 700 }}>{children}</strong>;
}

// The value nugget / "in short" block — the reel-sized insight in each email.
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <Section
      style={{
        backgroundColor: brand.surface,
        borderLeft: `3px solid ${brand.accent}`,
        borderRadius: "10px",
        padding: "16px 18px",
        margin: "4px 0 20px",
      }}
    >
      <Text style={{ fontSize: "14.5px", lineHeight: "1.6", color: brand.ink, margin: 0 }}>
        {children}
      </Text>
    </Section>
  );
}

export function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Section style={{ margin: "6px 0 22px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: brand.accent,
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
          padding: "13px 26px",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}

export function Signoff() {
  return (
    <Section style={{ margin: "6px 0 0" }}>
      <Text style={{ fontSize: "15px", lineHeight: "1.5", color: brand.muted, margin: "0 0 2px" }}>
        Talk soon,
      </Text>
      <Text style={{ fontFamily: SERIF, fontSize: "17px", color: brand.ink, margin: "0 0 2px" }}>
        Simon
      </Text>
      <Text style={{ fontSize: "12.5px", lineHeight: "1.5", color: brand.soft, margin: 0 }}>
        Simon Jacobs — Chartered Tax Adviser (CTA · ACA)
      </Text>
    </Section>
  );
}

export function PS({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: "13px",
        lineHeight: "1.55",
        color: brand.soft,
        margin: "18px 0 0",
        paddingTop: "14px",
        borderTop: `1px solid ${brand.border}`,
      }}
    >
      {children}
    </Text>
  );
}

function Footer({ unsubLink }: { unsubLink: string }) {
  const linkStyle = { color: brand.accent, textDecoration: "none" as const, fontWeight: 600 };
  return (
    <Section style={{ padding: "22px 16px 0" }}>
      <Text style={{ fontSize: "12px", lineHeight: "1.6", color: brand.soft, margin: "0 0 6px" }}>
        <Link href="https://www.instagram.com/simonjacobs_cta" style={linkStyle}>
          Instagram
        </Link>
        {"  ·  "}
        <Link href="https://uk.linkedin.com/in/simon-r-jacobs" style={linkStyle}>
          LinkedIn
        </Link>
        {"  ·  "}
        <Link href={SITE} style={linkStyle}>
          srjinternational.co.uk
        </Link>
      </Text>
      <Hr style={{ borderColor: brand.border, margin: "10px 0" }} />
      <Text style={{ fontSize: "11px", lineHeight: "1.55", color: brand.soft, margin: "0 0 4px" }}>
        SRJ International Limited · 10 Northcliffe Drive, London, England, N20 8JZ
      </Text>
      <Text style={{ fontSize: "11px", lineHeight: "1.55", color: brand.soft, margin: 0 }}>
        You&rsquo;re getting this because you enquired via srjinternational.co.uk.{" "}
        <Link href={unsubLink} style={{ color: brand.soft, textDecoration: "underline" }}>
          Unsubscribe
        </Link>
        .
      </Text>
    </Section>
  );
}
