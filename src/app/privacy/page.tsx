import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SRJ International collects, uses, and protects your personal data, written to comply with UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy" updated="29 June 2026">
      <p>
        This Privacy Policy explains how your personal data is handled when you
        use <strong>srjinternational.co.uk</strong> (the &ldquo;Site&rdquo;) and its
        contact, newsletter, and Profit-Rich Scorecard forms. It is written to
        comply with the UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>1. Who is responsible (Data Controller)</h2>
      <p>
        <strong>SRJ International Limited</strong>, trading as Jacobs Taxes
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;), is the data controller.
      </p>
      <ul>
        <li>Registered office: 10 Northcliffe Drive, London, England, N20 8JZ</li>
        <li>Company number: 12779246</li>
        <li>
          Contact:{" "}
          <a href="mailto:simon@jacobs-taxes.com">simon@jacobs-taxes.com</a>
        </li>
      </ul>

      <h2>2. What data we collect</h2>
      <p>We only collect what you choose to send us through a form:</p>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email, phone (if given),
          company website (if given), and your message.
        </li>
        <li>
          <strong>Newsletter / consultation sign-up:</strong> your email
          address.
        </li>
        <li>
          <strong>Profit-Rich Scorecard:</strong> your name, email, and the
          answers you select.
        </li>
        <li>
          <strong>Technical data:</strong> a note of which form you used and the
          time of submission. Standard server logs (for example IP address) may
          be processed by our hosting provider for security.
        </li>
      </ul>
      <p>
        We do not knowingly collect data from anyone under 16. Analytics and
        advertising data are only collected if you accept the relevant cookies,
        see our <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>3. Why we use it and the legal basis</h2>
      <ul>
        <li>
          <strong>To reply to you and provide what you asked for</strong> (a
          reply, a scorecard result, a consultation), legal basis: steps taken
          at your request / legitimate interest.
        </li>
        <li>
          <strong>To send updates you signed up for</strong>, legal basis: your
          consent, which you can withdraw at any time.
        </li>
        <li>
          <strong>To measure and improve the Site</strong> (analytics), legal
          basis: your consent.
        </li>
        <li>
          <strong>To keep the Site secure</strong>, legal basis: legitimate
          interest.
        </li>
      </ul>

      <h2>4. Who we share it with (Processors)</h2>
      <p>
        We share data only with service providers that help us run the Site, and
        never sell it:
      </p>
      <ul>
        <li>
          <strong>Vercel</strong>: hosts the Site and may process technical/log
          data.
        </li>
        <li>
          <strong>Supabase</strong>: stores form submissions in a database hosted
          in the EU (Frankfurt, Germany).
        </li>
        <li>
          <strong>FormSubmit</strong>: used to deliver
          your form submission to our inbox.
        </li>
        <li>
          <strong>Google Analytics (Google LLC)</strong>: measures Site usage if
          you accept analytics cookies.
        </li>
        <li>
          <strong>Meta Pixel (Meta Platforms)</strong>: measures ad performance
          if you accept marketing cookies.
        </li>
      </ul>
      <p>
        Where a provider processes data outside the UK, it is covered by
        appropriate safeguards such as the UK International Data Transfer
        Agreement or Addendum to the EU Standard Contractual Clauses.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep form submissions for as long as needed for the purpose you
        contacted us about, or until you ask us to delete them. Newsletter data
        is kept until you unsubscribe.
      </p>

      <h2>6. Your rights</h2>
      <p>Under UK data protection law you can ask us to:</p>
      <ul>
        <li>access a copy of your data;</li>
        <li>correct or update it;</li>
        <li>delete it (the &ldquo;right to erasure&rdquo;);</li>
        <li>restrict or object to how we use it;</li>
        <li>provide it in a portable format;</li>
        <li>withdraw consent at any time.</li>
      </ul>
      <p>
        To exercise any of these, email{" "}
        <a href="mailto:simon@jacobs-taxes.com">simon@jacobs-taxes.com</a>. You
        also have the right to complain to the Information Commissioner&rsquo;s
        Office (ICO) at <a href="https://ico.org.uk">ico.org.uk</a>.
      </p>

      <h2>7. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;last
        updated&rdquo; date above shows the most recent version.
      </p>
    </LegalDoc>
  );
}
