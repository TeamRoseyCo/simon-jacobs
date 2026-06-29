import type { Metadata } from "next";
import LegalDoc from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing your use of the Jacobs Taxes website, including the important note that site content is general information, not advice.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of Use" updated="[DATE]">
      <p>
        These terms govern your use of <strong>jacobs-taxes.com</strong> (the
        &ldquo;Site&rdquo;), operated by <strong>SRJ International Limited</strong>{" "}
        trading as Jacobs Taxes. By using the Site you agree to these terms. If
        you do not agree, please do not use the Site.
      </p>

      <h2>1. Not advice</h2>
      <p>
        The content on this Site (including the blog, the Profit-Rich Scorecard,
        and any guides) is general information for founder-led UK marketing
        agencies. It is <strong>not</strong> tax, accounting, legal, or
        financial advice, and it does not create a client relationship. Tax
        depends on your specific circumstances and the rules change. Before
        acting, get advice tailored to your situation, for example by booking a
        consultation. [PLACEHOLDER: confirm wording with Simon&rsquo;s
        professional body / PI insurer.]
      </p>

      <h2>2. The Scorecard</h2>
      <p>
        The Profit-Rich Scorecard is an indicative self-assessment tool. Its
        score and any suggestions are for guidance only and are not a formal
        review of your affairs.
      </p>

      <h2>3. Using the Site</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Site for any unlawful purpose;</li>
        <li>
          attempt to gain unauthorised access to the Site, its admin area, or
          any underlying systems;
        </li>
        <li>
          copy, republish, or exploit Site content except as allowed below.
        </li>
      </ul>

      <h2>4. Intellectual property</h2>
      <p>
        All content on the Site, including text, branding, and design, is owned
        by SRJ International Limited or its licensors and is protected by law.
        You may view and share links to it for personal, non-commercial use, but
        you may not reproduce it without permission.
      </p>

      <h2>5. Links to other sites</h2>
      <p>
        The Site may link to third-party sites (such as a booking calendar or
        professional bodies). We are not responsible for their content or
        practices.
      </p>

      <h2>6. Liability</h2>
      <p>
        We work to keep the Site accurate and available but make no guarantees
        that it will be error-free or uninterrupted. To the extent permitted by
        law, we are not liable for any loss arising from your reliance on Site
        content. Nothing in these terms excludes liability that cannot be
        excluded by law. [PLACEHOLDER: confirm liability wording with adviser /
        insurer.]
      </p>

      <h2>7. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the
        courts of England and Wales have exclusive jurisdiction. [PLACEHOLDER:
        confirm jurisdiction.]
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:simon@jacobs-taxes.com">simon@jacobs-taxes.com</a>.
      </p>
    </LegalDoc>
  );
}
