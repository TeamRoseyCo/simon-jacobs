import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies SRJ International uses, and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalDoc title="Cookie Policy" updated="29 June 2026">
      <p>
        This policy explains how <strong>srjinternational.co.uk</strong> uses cookies
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
          Site so we can improve it. If you accept analytics cookies, Google
          Analytics sets cookies such as <code>_ga</code> and{" "}
          <code>_ga_*</code> to measure visits and page views.
        </li>
        <li>
          <strong>Marketing</strong>: used by advertising partners to measure
          and target ads. If you accept marketing cookies, the Meta Pixel sets
          cookies such as <code>_fbp</code> to measure ad performance.
        </li>
      </ul>

      <h2>3. The cookies on this Site</h2>
      <p>
        The list below covers the cookies and similar technologies this Site can
        set. Cookies in the analytics and marketing categories are only set after
        you accept that category in the cookie banner.
      </p>
      <ul>
        <li>
          <strong>sj-cookie-consent</strong> (local storage, strictly required),
          remembers your cookie choice so the banner does not reappear.
        </li>
        <li>
          <strong>_ga / _ga_*</strong> (Google Analytics, analytics),
          distinguishes visitors and sessions to measure Site usage. Set only
          with your consent, and typically expires up to two years after your
          last visit.
        </li>
        <li>
          <strong>_fbp</strong> (Meta Pixel, marketing), identifies browsers for
          ad measurement. Set only with your consent, and typically expires about
          90 days after it is set.
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
