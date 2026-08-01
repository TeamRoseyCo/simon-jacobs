"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  cardStyle,
  eyebrowStyle,
  ghostPill,
  headerRow,
  pageTitleStyle,
  pageWrap,
  primaryPill,
} from "../ui";
import type { Post } from "@/lib/posts";

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.8rem",
  fontSize: "0.92rem",
  border: "1px solid rgba(20,40,80,0.16)",
  borderRadius: 8,
  background: "#ffffff",
  color: "var(--color-secondary)",
  outline: "none",
  fontFamily: "inherit",
};

const fieldWrap: React.CSSProperties = { display: "grid", gap: "0.35rem" };

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={fieldWrap}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}

type FaqDraft = { question: string; answer: string };

export default function PostEditor({
  initial,
  originalSlug,
}: {
  initial?: Post;
  originalSlug?: string; // present when editing, so a slug rename still PUTs the right row
}) {
  const router = useRouter();
  const isEdit = Boolean(originalSlug);

  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [updated, setUpdated] = useState(initial?.updated ?? "");
  const [readingTime, setReadingTime] = useState(initial?.readingTime ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [bodyText, setBodyText] = useState((initial?.body ?? []).join("\n\n"));
  const [related, setRelated] = useState((initial?.related ?? []).join(", "));
  const [faqs, setFaqs] = useState<FaqDraft[]>(
    initial?.faqs && initial.faqs.length > 0
      ? initial.faqs
      : [{ question: "", answer: "" }],
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function updateFaq(i: number, field: "question" | "answer", value: string) {
    setFaqs((prev) => prev.map((f, idx) => (idx === i ? { ...f, [field]: value } : f)));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      tag: tag.trim(),
      date: date.trim(),
      updated: updated.trim() || null,
      readingTime: readingTime.trim(),
      excerpt: excerpt.trim(),
      body: bodyText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
      related: related
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/blog/${originalSlug}` : "/api/admin/blog",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Save failed.");
    } catch {
      setError("Network error. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div style={pageWrap(900)}>
      <header style={headerRow}>
        <div>
          <p style={eyebrowStyle}>SRJ International</p>
          <h1 style={pageTitleStyle}>{isEdit ? "Edit post" : "New post"}</h1>
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        style={{ ...cardStyle, marginTop: "1.5rem", padding: "1.75rem", display: "grid", gap: "1.1rem" }}
      >
      <div style={{ display: "grid", gap: "1.1rem", gridTemplateColumns: "1fr 1fr" }}>
        <Field label="Slug (url-safe, e.g. my-post-title)">
          <input
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="Tag (e.g. Capital gains)">
          <input required value={tag} onChange={(e) => setTag(e.target.value)} style={inputStyle} />
        </Field>
      </div>

      <Field label="Title">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      </Field>

      <div style={{ display: "grid", gap: "1.1rem", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <Field label="Date (YYYY-MM-DD)">
          <input
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="Updated (optional)">
          <input
            type="date"
            value={updated}
            onChange={(e) => setUpdated(e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="Reading time (e.g. 5 min read)">
          <input
            required
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            style={inputStyle}
          />
        </Field>
      </div>

      <Field label="Excerpt (shown on the blog index)">
        <textarea
          required
          rows={2}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </Field>

      <Field label="Body — one paragraph per line, blank lines between them. Start a line with '## ' for a subheading. Use [label](/path) for links.">
        <textarea
          required
          rows={16}
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.85rem" }}
        />
      </Field>

      <div>
        <span style={labelStyle}>FAQs (optional, shown as an accordion)</span>
        <div style={{ marginTop: "0.6rem", display: "grid", gap: "0.9rem" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ display: "grid", gap: "0.4rem", padding: "0.85rem", border: "1px solid rgba(20,40,80,0.1)", borderRadius: 8 }}>
              <input
                placeholder="Question"
                value={f.question}
                onChange={(e) => updateFaq(i, "question", e.target.value)}
                style={inputStyle}
              />
              <textarea
                placeholder="Answer"
                rows={2}
                value={f.answer}
                onChange={(e) => updateFaq(i, "answer", e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <button
                type="button"
                onClick={() => setFaqs((prev) => prev.filter((_, idx) => idx !== i))}
                style={{ ...ghostPill, justifySelf: "start", fontSize: "0.7rem" }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "" }])}
          style={{ ...ghostPill, marginTop: "0.7rem" }}
        >
          + Add FAQ
        </button>
      </div>

      <Field label="Related posts (comma-separated slugs, optional)">
        <input
          value={related}
          onChange={(e) => setRelated(e.target.value)}
          style={inputStyle}
        />
      </Field>

      {error ? (
        <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>{error}</p>
      ) : null}

      <div style={{ display: "flex", gap: "0.6rem" }}>
        <button type="submit" disabled={busy} style={primaryPill(busy)}>
          {busy ? "Saving..." : isEdit ? "Save changes" : "Publish post"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          style={ghostPill}
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}
