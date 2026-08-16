"use client";

import { useId, useState } from "react";
import { attributionPayload } from "@/lib/attribution";
import { trackLead } from "@/lib/analytics";

type Variant = "panel" | "footer";

// Captures and validates the email client-side, then POSTs to /api/contact
// (_kind: "subscribe") which stores the lead in Supabase and notifies Simon.
export default function NewsletterSignup({
  variant = "panel",
}: {
  variant?: Variant;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const footer = variant === "footer";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus("error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Same invisible lead-source fields the other two forms send, so an
        // email capture from the footer is attributed like any other enquiry.
        body: JSON.stringify({
          _kind: "subscribe",
          email: email.trim(),
          ...attributionPayload(),
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      setEmail("");
      trackLead({ form: "newsletter" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "done") {
    return (
      <p className={footer ? "text-sm text-[#55636f]" : "text-base text-ink"}>
        Thanks. You&apos;re on the list, look out for the first email.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex w-full flex-col gap-3 sm:flex-row ${
        footer ? "" : "mx-auto max-w-md"
      }`}
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <input
        id={`${id}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@yourbusiness.co.uk"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        aria-invalid={status === "error"}
        className={
          footer
            ? "min-h-11 flex-1 rounded-[10px] border border-[rgba(8,19,31,0.14)] bg-white px-4 text-sm text-ink placeholder:text-[#5C6570] outline-none focus:border-accent"
            : "min-h-12 flex-1 rounded-[10px] border border-border bg-white px-4 text-sm text-ink outline-none focus:border-accent"
        }
      />
      <button
        type="submit"
        disabled={submitting}
        className={
          footer
            ? "ap-btn min-h-11 disabled:opacity-70"
            : "inline-flex min-h-12 items-center justify-center rounded-[10px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-accent disabled:opacity-70"
        }
      >
        {submitting ? "Subscribing…" : "Subscribe"}
      </button>
      {/* Was `sm:sr-only`, which hid this message at every width from 640px up.
          The form is noValidate, so a sighted desktop user who mistyped their
          address got no feedback at all and assumed it had worked. That is a
          lead lost silently, and a WCAG 3.3.1 failure.

          Not set in red: the palette has no error hue and adding one would put
          a stray colour on the page. The message carries its own icon and the
          input takes a heavier border, so the error does not depend on colour
          at all, which is stronger under 1.4.1 anyway. Ink on white is 18.11. */}
      {status === "error" ? (
        <span role="alert" className="ns-error">
          <span aria-hidden="true">!</span>
          Something went wrong. Please try again.
        </span>
      ) : null}
    </form>
  );
}
