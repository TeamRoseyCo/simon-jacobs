"use client";

import { useId, useState } from "react";

// Merged CTA + email capture: visitors join the list to get their free consult.
// NOTE: validates client-side and confirms, but does not persist yet. Wire the
// email to a provider / booking flow (Mailchimp, Resend, Calendly) to go live.
export default function ConsultCta({
  heading = "Find out what your agency could be keeping.",
  sub = "Join the list and Simon will set you up with a free consultation. No spam, unsubscribe anytime.",
}: {
  heading?: string;
  sub?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus("error");
      return;
    }
    // TODO: send `email` to your list + trigger the consult booking here.
    setStatus("done");
    setEmail("");
  }

  return (
    <section id="book" className="px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="cta-band mx-auto flex w-full max-w-7xl flex-col items-center gap-7 p-8 text-center lg:p-14">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/80">
            {sub}
          </p>
        </div>

        {status === "done" ? (
          <p className="reveal text-lg font-medium text-white">
            You&apos;re on the list. Simon will email you to set up your free
            consultation.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="reveal flex w-full max-w-xl flex-col gap-3 sm:flex-row"
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
              className="min-h-[52px]flex-1 rounded-full border border-white/25 bg-white px-5 py-3.5 text-sm text-ink outline-none placeholder:text-muted focus:border-white"
            />
            <button
              type="submit"
              className="inline-flex min-h-[52px]items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Confirm and get a free consult
            </button>
          </form>
        )}
        {status === "error" ? (
          <p role="alert" className="text-sm text-white">
            Please enter a valid email.
          </p>
        ) : null}
      </div>
    </section>
  );
}
