import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Button,
  Link,
  Hr,
} from "@react-email/components";
export const brand = {
  page: "#EDF3F8",
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
        <Container style={{ maxWidth: "580px", margin: "0 auto", padding: "26px 12px 40px" }}>
          <Section
            style={{
              backgroundColor: brand.card,
              borderRadius: "18px",
              overflow: "hidden",
              border: `1px solid ${brand.border}`,
            }}
          >

            <Section
              style={{
                height: "4px",
                lineHeight: "4px",
                fontSize: "1px",
                backgroundColor: brand.accent,
                backgroundImage: `linear-gradient(90deg, ${brand.ink}, ${brand.accent} 55%, ${brand.teal})`,
              }}
            >
              &nbsp;
            </Section>


            <Section style={{ padding: "26px 36px 0" }}>
              <Row>
                <Column style={{ verticalAlign: "middle" }}>
                  <Text
                    style={{
                      fontFamily: SERIF,
                      fontSize: "21px",
                      fontWeight: 600,
                      color: brand.ink,
                      margin: 0,
                      letterSpacing: "0.2px",
                    }}
                  >
                    SRJ International
                  </Text>
                </Column>
                <Column style={{ verticalAlign: "middle", textAlign: "right" }}>
                  <Text
                    style={{
                      fontSize: "9px",
                      letterSpacing: "1.6px",
                      textTransform: "uppercase",
                      color: brand.soft,
                      margin: 0,
                    }}
                  >
                    Chartered Tax Advisers
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section style={{ padding: "16px 36px 0" }}>
              <Hr style={{ borderColor: brand.border, margin: 0 }} />
            </Section>

            <Section style={{ padding: "24px 36px 32px" }}>{children}</Section>
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
        fontSize: "25px",
        lineHeight: "1.22",
        fontWeight: 500,
        color: brand.ink,
        margin: "0 0 18px",
      }}
    >
      {children}
    </Text>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: brand.teal,
        margin: "0 0 10px",
      }}
    >
      {children}
    </Text>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontSize: "15.5px", lineHeight: "1.65", color: brand.muted, margin: "0 0 15px" }}>
      {children}
    </Text>
  );
}

export function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: brand.ink, fontWeight: 700 }}>{children}</strong>;
}
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <Section
      style={{
        backgroundColor: brand.surface,
        borderLeft: `3px solid ${brand.accent}`,
        borderRadius: "12px",
        padding: "18px 20px",
        margin: "6px 0 22px",
      }}
    >
      <Text style={{ fontSize: "15px", lineHeight: "1.62", color: brand.ink, margin: 0 }}>
        {children}
      </Text>
    </Section>
  );
}

export function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Section style={{ margin: "8px 0 24px" }}>
      <Button
        href={href}
        style={{
          backgroundColor: brand.ink,
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
          padding: "14px 28px",
          borderRadius: "10px",
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
    <Section style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${brand.border}` }}>
      <Row>
        <Column style={{ width: "68px", verticalAlign: "top" }}>
          <Img
            src={`${SITE}/simon-jacobs.webp`}
            width="54"
            height="54"
            alt="Simon Jacobs"
            style={{
              borderRadius: "50%",
              border: `2px solid ${brand.border}`,
              display: "block",
              objectFit: "cover",
            }}
          />
        </Column>
        <Column style={{ verticalAlign: "top" }}>
          <Text style={{ fontSize: "14px", color: brand.muted, margin: "0 0 2px" }}>Talk soon,</Text>
          <Text style={{ fontFamily: SERIF, fontSize: "18px", color: brand.ink, margin: "0 0 1px" }}>
            Simon Jacobs
          </Text>
          <Text style={{ fontSize: "12.5px", color: brand.soft, margin: 0 }}>
            Chartered Tax Adviser · CTA · ACA · ex&#8209;PwC
          </Text>
        </Column>
      </Row>
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
        margin: "20px 0 0",
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
    <Section style={{ padding: "24px 20px 0" }}>
      <Text style={{ fontSize: "12px", lineHeight: "1.6", color: brand.soft, margin: "0 0 8px" }}>
        <Link href="https://www.instagram.com/simonjacobs_cta" style={linkStyle}>
          Instagram
        </Link>
        {"   ·   "}
        <Link href="https://uk.linkedin.com/in/simon-r-jacobs" style={linkStyle}>
          LinkedIn
        </Link>
        {"   ·   "}
        <Link href={SITE} style={linkStyle}>
          srjinternational.co.uk
        </Link>
      </Text>
      <Hr style={{ borderColor: brand.border, margin: "10px 0" }} />
      <Text style={{ fontSize: "11px", lineHeight: "1.55", color: brand.soft, margin: "0 0 4px" }}>
        SRJ International Limited, 10 Northcliffe Drive, London, England, N20 8JZ
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
