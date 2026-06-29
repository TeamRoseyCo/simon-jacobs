import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies Jacobs Taxes uses, and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Policy" updated="[DATE]">
      <p>
        This policy explains how <strong>jacobs-taxes.com</strong> uses cookies
        and similar technologies, and how you can control them. When you first
        visit, our cookie banner lets you accept everything or set your
        preferences by category.
      </p>

      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files stored on your device. Similar
        technologies (such as your browser&rsquo;s local storage) work the same
        way. We use them to remember your cookie choice and, where you allow it,
        to understand how the Site is used.
      </p>

      <h2>2. The categories we use</h2>
      <ul>
        <li>
          <strong>Strictly required</strong>: needed for the Site to work and
          to remember your cookie choice. These cannot be switched off. We store
          your preference in your browser&rsquo;s local storage rather than in a
          tracking cookie.
        </li>
        <li>
          <strong>Analytics</strong>: help us understand how visitors use the
          Site so we can improve it. [PLACEHOLDER: Google Analytics, once
          enabled, sets cookies such as <code>_ga</code> and{" "}
          <code>_ga_*</code>; confirm and list them here.]
        </li>
        <li>
          <strong>Marketing</strong>: used by advertising partners to measure
          and target ads. [PLACEHOLDER: the Meta Pixel, once enabled, sets
          cookies such as <code>_fbp</code>; confirm and list them here.]
        </li>
        <li>
          <strong>Functioning</strong>: enable extra features and personal
          settings. [PLACEHOLDER: list any, or remove this category if unused.]
        </li>
      </ul>

      <h2>3. The cookies on this Site</h2>
      <p>
        [PLACEHOLDER: keep this table accurate as services are added. As of the
        last-updated date, only the strictly-required preference store below is
        in use.]
      </p>
      <ul>
        <li>
          <strong>sj-cookie-consent</strong> (local storage, strictly required), remembers your cookie choice so the banner does not reappear.
        </li>
        <li>
          <strong>[_ga / _ga_*]</strong> (Google Analytics, analytics),
          [PLACEHOLDER: purpose and retention, once enabled].
        </li>
        <li>
          <strong>[_fbp]</strong> (Meta Pixel, marketing), [PLACEHOLDER:
          purpose and retention, once enabled].
        </li>
      </ul>

      <h2>4. Managing your choices</h2>
      <p>
        You can change your mind at any time by clearing this Site&rsquo;s data
        in your browser, which will make the cookie banner appear again. You can
        also block or delete cookies through your browser settings, though some
        parts of the Site may then behave differently.
      </p>

      <h2>5. More information</h2>
      <p>
        For how we handle the personal data behind these cookies, see our{" "}
        <a href="/privacy">Privacy Policy</a>. Questions? Email{" "}
        <a href="mailto:simon@jacobs-taxes.com">simon@jacobs-taxes.com</a>.
      </p>
    </LegalDoc>
  );
}
