"use client";

import { useId, useState } from "react";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  question: string;
};

const empty: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
  question: "",
};

// Validates client-side, then POSTs to /api/contact (which re-validates
// server-side and relays to Simon's inbox). Shows a spinner while in flight.
export default function ContactForm() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setF((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: false }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, boolean> = {
      firstName: f.firstName.trim().length === 0,
      lastName: f.lastName.trim().length === 0,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()),
      question: f.question.trim().length === 0,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setServerError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _kind: "contact", ...f }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Could not send right now. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="finance-card mx-auto max-w-2xl p-8 text-center md:p-10">
        <h3 className="font-serif text-2xl text-ink">
          Thanks, that is exactly what Simon needs.
        </h3>
        <p className="mx-auto mt-3 max-w-[460px] text-sm leading-7 text-muted">
          He will read your question and get back to you to set up a time. Keep
          an eye on your inbox.
        </p>
      </div>
    );
  }

  const fieldBase =
    "mt-2 min-h-12 w-full rounded-[10px] border bg-white px-4 text-sm text-ink outline-none focus:border-accent";
  const labelBase = "block text-sm font-medium text-ink";
  const req = <span className="text-accent">*</span>;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="finance-card mx-auto flex max-w-2xl flex-col gap-5 p-6 text-left md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className={labelBase}>
            First name {req}
          </label>
          <input
            id={`${id}-first`}
            type="text"
            autoComplete="given-name"
            value={f.firstName}
            onChange={set("firstName")}
            aria-invalid={errors.firstName}
            className={`${fieldBase} ${errors.firstName ? "border-red-500" : "border-border"}`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className={labelBase}>
            Last name {req}
          </label>
          <input
            id={`${id}-last`}
            type="text"
            autoComplete="family-name"
            value={f.lastName}
            onChange={set("lastName")}
            aria-invalid={errors.lastName}
            className={`${fieldBase} ${errors.lastName ? "border-red-500" : "border-border"}`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelBase}>
            Email {req}
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={f.email}
            onChange={set("email")}
            aria-invalid={errors.email}
            className={`${fieldBase} ${errors.email ? "border-red-500" : "border-border"}`}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={labelBase}>
            Phone <span className="text-muted">(optional)</span>
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            value={f.phone}
            onChange={set("phone")}
            className={`${fieldBase} border-border`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-website`} className={labelBase}>
          Company website <span className="text-muted">(optional)</span>
        </label>
        <input
          id={`${id}-website`}
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="youragency.co.uk"
          value={f.website}
          onChange={set("website")}
          className={`${fieldBase} border-border`}
        />
      </div>

      <div>
        <label htmlFor={`${id}-question`} className={labelBase}>
          What is the most pressing financial question about your agency? {req}
        </label>
        <textarea
          id={`${id}-question`}
          rows={4}
          value={f.question}
          onChange={set("question")}
          aria-invalid={errors.question}
          placeholder="e.g. How much should I really be paying myself, and what am I leaving on the table at year-end?"
          className={`mt-2 w-full resize-y rounded-[10px] border bg-white px-4 py-3 text-sm leading-6 text-ink outline-none focus:border-accent ${
            errors.question ? "border-red-500" : "border-border"
          }`}
        />
        {errors.question ? (
          <p className="mt-1 text-xs text-red-600">
            This one is required, it is what the call is built around.
          </p>
        ) : null}
      </div>

      {serverError ? (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent disabled:opacity-70"
      >
        {submitting ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
            Sending…
          </>
        ) : (
          "Send my question"
        )}
      </button>
    </form>
  );
}
