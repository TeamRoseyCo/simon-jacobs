"use client";

import { useId, useState } from "react";
import { bookHref, scorecardHref } from "@/lib/content";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
  turnover: string;
  role: string;
  intent: string;
  question: string;
};

const empty: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
  turnover: "",
  role: "",
  intent: "",
  question: "",
};

// Lead qualification. Thresholds come from the Ideal Client Profile
// (founder-led UK marketing agencies, ~£500k-£2.5m turnover). A lead qualifies
// for a discovery call only if they are a decision-maker AND at/above the
// turnover floor. Everyone else is still captured, then routed to the free
// Scorecard instead of the calendar, so Simon's call time goes to real fits.
//
// FUTURE: add a minimum-spend gate here once Simon sets the figure
// (see docs/later-improvements.md).
const TURNOVER_BANDS = [
  { value: "under-250k", label: "Under £250k", qualifies: false },
  { value: "250k-500k", label: "£250k – £500k", qualifies: false },
  { value: "500k-2_5m", label: "£500k – £2.5m", qualifies: true },
  { value: "over-2_5m", label: "£2.5m+", qualifies: true },
] as const;

const ROLES = [
  { value: "founder", label: "Founder / owner", qualifies: true },
  { value: "director", label: "Director or partner (I make the call)", qualifies: true },
  { value: "other", label: "Something else", qualifies: false },
] as const;

const INTENTS = [
  "Tax planning",
  "Profit extraction",
  "Accountancy / year-end",
  "Exit or sale prep",
  "Not sure yet",
] as const;

function isQualified(turnover: string, role: string) {
  const t = TURNOVER_BANDS.find((b) => b.value === turnover);
  const r = ROLES.find((x) => x.value === role);
  return Boolean(t?.qualifies && r?.qualifies);
}

// Validates client-side, then POSTs to /api/contact (which re-validates
// server-side, stores the lead, and relays to Simon's inbox). The success
// screen branches on qualification: a fit is sent to the booking calendar,
// everyone else to the Scorecard.
export default function ContactForm() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      turnover: f.turnover.length === 0,
      role: f.role.length === 0,
      question: f.question.trim().length === 0,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    const q = isQualified(f.turnover, f.role);

    setServerError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _kind: "contact", ...f, qualified: q }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setQualified(q);
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
    return qualified ? (
      <div className="finance-card mx-auto max-w-2xl p-8 text-center md:p-10">
        <h3 className="font-serif text-2xl text-ink">
          You are exactly who Simon works with.
        </h3>
        <p className="mx-auto mt-3 max-w-[460px] text-sm leading-7 text-muted">
          Pick a time that suits you and he will come to the call with your
          question already in hand.
        </p>
        <a
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Book your discovery call
        </a>
      </div>
    ) : (
      <div className="finance-card mx-auto max-w-2xl p-8 text-center md:p-10">
        <h3 className="font-serif text-2xl text-ink">
          Thanks{f.firstName ? `, ${f.firstName}` : ""} — got it.
        </h3>
        <p className="mx-auto mt-3 max-w-[480px] text-sm leading-7 text-muted">
          A one-to-one call may not be the right fit just yet, but the best
          place to start is the free Profit-Rich Scorecard: a score across 7
          areas and a 90-day plan, no call needed. Simon has your details and
          will be in touch as the agency grows.
        </p>
        <a
          href={scorecardHref}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Take the free Scorecard
        </a>
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-turnover`} className={labelBase}>
            Annual turnover {req}
          </label>
          <select
            id={`${id}-turnover`}
            value={f.turnover}
            onChange={set("turnover")}
            aria-invalid={errors.turnover}
            className={`${fieldBase} ${errors.turnover ? "border-red-500" : "border-border"}`}
          >
            <option value="" disabled>
              Select a range
            </option>
            {TURNOVER_BANDS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {errors.turnover ? (
            <p className="mt-1 text-xs text-red-600">Please choose a range.</p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${id}-role`} className={labelBase}>
            Your role {req}
          </label>
          <select
            id={`${id}-role`}
            value={f.role}
            onChange={set("role")}
            aria-invalid={errors.role}
            className={`${fieldBase} ${errors.role ? "border-red-500" : "border-border"}`}
          >
            <option value="" disabled>
              Select one
            </option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {errors.role ? (
            <p className="mt-1 text-xs text-red-600">Please choose one.</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-intent`} className={labelBase}>
          What do you most need help with?{" "}
          <span className="text-muted">(optional)</span>
        </label>
        <select
          id={`${id}-intent`}
          value={f.intent}
          onChange={set("intent")}
          className={`${fieldBase} border-border`}
        >
          <option value="">Select one</option>
          {INTENTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
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
