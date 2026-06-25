"use client";

import { useId, useState } from "react";

type Variant = "panel" | "footer";

// NOTE: This captures and validates the email client-side and shows a confirmation,
// but it does not yet persist anywhere. Wire `onSubmit` to an email provider
// (Mailchimp, ConvertKit, Resend, or a /api/subscribe route) to actually store it.
export default function NewsletterSignup({
  variant = "panel",
}: {
  variant?: Variant;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  const footer = variant === "footer";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus("error");
      return;
    }
    // TODO: send `email` to your email provider here.
    setStatus("done");
    setEmail("");
  }

  if (status === "done") {
    return (
      <p className={footer ? "text-sm text-white/80" : "text-base text-ink"}>
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
        placeholder="you@youragency.co.uk"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        aria-invalid={status === "error"}
        className={
          footer
            ? "min-h-11 flex-1 rounded-[8px] border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/45 outline-none focus:border-white/45"
            : "min-h-12 flex-1 rounded-[10px] border border-border bg-white px-4 text-sm text-ink outline-none focus:border-accent"
        }
      />
      <button
        type="submit"
        className={
          footer
            ? "inline-flex min-h-11 items-center justify-center rounded-[8px] bg-white px-5 text-sm font-semibold text-ink transition hover:bg-surface"
            : "inline-flex min-h-12 items-center justify-center rounded-[10px] bg-ink px-6 text-sm font-semibold text-white transition hover:bg-accent"
        }
      >
        Subscribe
      </button>
      {status === "error" ? (
        <span
          role="alert"
          className={`text-xs ${footer ? "text-red-300" : "text-red-600"} sm:sr-only`}
        >
          Enter a valid email.
        </span>
      ) : null}
    </form>
  );
}
