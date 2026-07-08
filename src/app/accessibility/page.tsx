import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Our commitment to keeping the SRJ International website usable for everyone, and how to report an accessibility problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalDoc title="Accessibility Statement" updated="29 June 2026">
      <p>
        SRJ International is committed to making{" "}
        <strong>srjinternational.co.uk</strong>{" "}
        usable for as many people as possible, including those relying on
        assistive technology.
      </p>

      <h2>1. What we aim for</h2>
      <p>
        We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at
        Level AA. In practice that means we try to:
      </p>
      <ul>
        <li>use clear, readable text and strong colour contrast;</li>
        <li>let you navigate by keyboard;</li>
        <li>label links, buttons, and form fields meaningfully;</li>
        <li>respect a reduced-motion preference for animations;</li>
        <li>keep layouts responsive across devices.</li>
      </ul>

      <h2>2. Known limitations</h2>
      <p>
        We are continuing to improve the Site. There are no known significant
        accessibility issues at this time.
      </p>

      <h2>3. Tell us about a problem</h2>
      <p>
        If you find something hard to use, or need information in a different
        format, please tell us and we will do our best to help:
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:simon@srjinternational.co.uk">simon@srjinternational.co.uk</a>
        </li>
        <li>Phone: 07821 900 992</li>
      </ul>
      <p>
        We aim to reply within 5 working days.
      </p>

      <h2>4. Enforcement</h2>
      <p>
        If you are not happy with our response, you can contact the Equality
        Advisory and Support Service (EASS) at{" "}
        <a href="https://www.equalityadvisoryservice.com">
          equalityadvisoryservice.com
        </a>
        .
      </p>
    </LegalDoc>
  );
}
