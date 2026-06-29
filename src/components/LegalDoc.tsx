import Link from "next/link";
import type { ReactNode } from "react";

// Shared wrapper for the legal pages (privacy, cookies, terms, accessibility).
export default function LegalDoc({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="legal mx-auto w-full max-w-3xl px-6 pb-24 pt-10 md:px-8 md:pt-14">
      <Link href="/" className="legal-back">
        ← Back home
      </Link>

      <h1 className="legal-title">{title}</h1>
      <p className="legal-updated">Last updated: {updated}</p>

      <div className="legal-body">{children}</div>

      <div className="legal-foot">
        <Link href="/privacy">Privacy</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/accessibility">Accessibility</Link>
      </div>
    </section>
  );
}
