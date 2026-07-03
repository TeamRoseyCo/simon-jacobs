"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { scorecardAreas, scorecardAnswers } from "@/lib/content";
import { posts } from "@/lib/posts";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AREAS = scorecardAreas;

function rating(score: number, max: number) {
  const pct = score / max;
  if (pct >= 0.75) return "Green";
  if (pct >= 0.45) return "Amber";
  return "Red";
}

export default function ScorecardForm() {
  const [started, setStarted] = useState(false);
  // step 0..AREAS.length-1 = an area; AREAS.length = contact step
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = AREAS.length + 1; // areas + contact
  const onContact = step === AREAS.length;
  const area = AREAS[step];

  const areaComplete = (i: number) =>
    AREAS[i].questions.every((_, qi) => answers[`${i}-${qi}`] !== undefined);

  function pick(qKey: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qKey]: value }));
  }

  async function submit() {
    if (!name.trim()) return setError("Please add your name.");
    if (!EMAIL.test(email.trim())) return setError("Enter a valid email.");
    setError("");
    setSubmitting(true);

    const breakdown = AREAS.map((a, ai) => {
      const score = a.questions.reduce(
        (s, _, qi) => s + (answers[`${ai}-${qi}`] ?? 0),
        0,
      );
      return { area: `${a.letter}: ${a.title}`, score, max: 6, rating: rating(score, 6) };
    });
    const grandTotal = breakdown.reduce((s, b) => s + b.score, 0);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _kind: "scorecard",
          name: name.trim(),
          email: email.trim(),
          total: grandTotal,
          max: AREAS.length * 6,
          rating: rating(grandTotal, AREAS.length * 6),
          breakdown,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not send. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ---- Success ----
  if (done) {
    return (
      <div className="mx-auto w-full max-w-5xl text-center">
        <div className="sc-tick mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal text-3xl text-white">
          ✓
        </div>
        <h2
          className="load-rise mt-6 font-serif text-3xl text-ink"
          style={{ animationDelay: "260ms" }}
        >
          Thanks, {name.split(" ")[0]}.
        </h2>
        <p
          className="load-rise mx-auto mt-3 max-w-[440px] text-base leading-7 text-muted"
          style={{ animationDelay: "360ms" }}
        >
          We will score your answers across all 7 areas and email your
          Profit-Rich Scorecard, plus a 90-day plan, to{" "}
          <span className="font-medium text-ink">{email}</span>. No sales pitch.
        </p>

        <div
          className="load-rise relative left-1/2 mt-14 w-screen -translate-x-1/2 bg-[#eef5fb] py-14 text-center"
          style={{ animationDelay: "520ms" }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-16">
            <h3 className="font-serif text-3xl font-normal leading-tight text-ink md:text-4xl">
              While you wait, a few{" "}
              <span className="em-display text-teal">useful reads.</span>
            </h3>
            <div className="mt-8 grid gap-5 text-left md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="finance-card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={`/blog/${post.slug}.webp`}
                      alt={post.title}
                      fill
                      sizes="(min-width: 768px) 360px, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold text-muted">
                      {post.readingTime}
                    </span>
                    <h4 className="mt-2 font-serif text-lg font-normal leading-snug text-ink">
                      {post.title}
                    </h4>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-ink">
                      Read it →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-8 inline-flex text-sm font-semibold text-ink transition hover:text-teal"
            >
              Check out our blog →
            </Link>
          </div>
        </div>

        <div
          className="load-rise mx-auto mt-14 max-w-xl"
          style={{ animationDelay: "680ms" }}
        >
          <h3 className="font-serif text-2xl text-ink md:text-3xl">
            Or see exactly how{" "}
            <span className="em-display text-teal">we can help.</span>
          </h3>
          <Link
            href="/services"
            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-9 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal hover:shadow-[0_18px_44px_rgba(8,34,75,0.22)]"
          >
            Explore the services
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // ---- Intro / start screen ----
  if (!started) {
    return (
      <div className="mx-auto w-full max-w-xl text-center">
        <h1 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
          The Profit-Rich{" "}
          <span className="em-display text-teal">Scorecard.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[460px] text-base leading-8 text-muted">
          21 quick questions across the 7 areas where agency profit usually
          leaks. We score it and email back your result with a 90-day plan,
          free and no sales pitch.
        </p>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-9 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal"
        >
          Start the scorecard →
        </button>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          7 areas · 21 questions · ~5 minutes
        </p>
      </div>
    );
  }

  // ---- The test ----
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <span>
            {onContact ? "Almost done" : `Area ${step + 1} of ${AREAS.length}`}
          </span>
          <span>{Math.round(((step + (onContact ? 1 : 0)) / total) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e6eef6]">
          <span
            className="block h-full rounded-full bg-teal transition-all duration-300"
            style={{ width: `${((step + (onContact ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <div>
        {!onContact ? (
          <>
            <h2 className="font-serif text-2xl text-ink md:text-3xl">
              {area.title}
            </h2>

            <div className="mt-5 grid gap-4">
              {area.questions.map((q, qi) => {
                const key = `${step}-${qi}`;
                return (
                  <fieldset key={key}>
                    <legend className="text-sm font-medium leading-5 text-ink">
                      {q}
                    </legend>
                    <div className="mt-2.5 grid grid-cols-3 gap-2">
                      {scorecardAnswers.map((label, val) => {
                        const active = answers[key] === val;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => pick(key, val)}
                            aria-pressed={active}
                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                              active
                                ? "border-teal bg-teal text-white"
                                : "border-border bg-white text-muted hover:border-teal/50"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-xl text-ink md:text-2xl">
              Where should we send your results?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Your name and email, and we&apos;ll email your scored scorecard
              with a 90-day plan.
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <label htmlFor="sc-name" className="block text-sm font-medium text-ink">
                  Your name
                </label>
                <input
                  id="sc-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError("");
                  }}
                  className="mt-2 min-h-11 w-full rounded-[10px] border border-border bg-white px-4 text-sm text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="sc-email" className="block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="sc-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@youragency.co.uk"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  className="mt-2 min-h-11 w-full rounded-[10px] border border-border bg-white px-4 text-sm text-ink outline-none focus:border-accent"
                />
              </div>
            </div>
          </>
        )}

        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || submitting}
            className="text-sm font-semibold text-muted transition hover:text-ink disabled:invisible"
          >
            ← Back
          </button>

          {!onContact ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!areaComplete(step)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition enabled:hover:bg-teal disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === AREAS.length - 1 ? "Last step →" : "Next →"}
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-semibold text-white transition hover:bg-teal disabled:opacity-70"
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
                "Email me my results"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
