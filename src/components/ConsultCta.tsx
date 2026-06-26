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
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      setError("Please enter a valid email.");
      return;
    }
    if (!consent) {
      setError("Please tick the box to consent.");
      return;
    }
    // TODO: send `email` to your list + trigger the consult booking here.
    setError("");
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
            className="email-capture reveal"
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
                if (error) setError("");
              }}
              aria-invalid={Boolean(error)}
              className="email-field"
            />
            <label className="email-consent" htmlFor={`${id}-consent`}>
              <input
                id={`${id}-consent`}
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (error) setError("");
                }}
              />
              <span>
                I consent to Simon Jacobs contacting me by email about a free
                consultation.
              </span>
            </label>
            <button type="submit" className="email-submit">
              Confirm and get a free consult
            </button>
          </form>
        )}
        {error ? (
          <p role="alert" className="text-sm text-white">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
