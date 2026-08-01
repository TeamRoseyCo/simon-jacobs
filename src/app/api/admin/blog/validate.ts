// Shared payload validation for the blog admin API routes.

export type PostRow = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  updated: string | null;
  reading_time: string;
  excerpt: string;
  body: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validatePostPayload(
  input: unknown,
): { ok: true; row: PostRow } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Missing payload." };
  }
  const b = input as Record<string, unknown>;

  const slug = typeof b.slug === "string" ? b.slug.trim() : "";
  const title = typeof b.title === "string" ? b.title.trim() : "";
  const tag = typeof b.tag === "string" ? b.tag.trim() : "";
  const date = typeof b.date === "string" ? b.date.trim() : "";
  const updated = typeof b.updated === "string" && b.updated.trim() ? b.updated.trim() : null;
  const readingTime = typeof b.readingTime === "string" ? b.readingTime.trim() : "";
  const excerpt = typeof b.excerpt === "string" ? b.excerpt.trim() : "";
  const body = Array.isArray(b.body)
    ? b.body.filter((x): x is string => typeof x === "string" && x.trim() !== "")
    : [];
  const faqs = Array.isArray(b.faqs)
    ? (b.faqs as unknown[])
        .filter(
          (f): f is { question: string; answer: string } =>
            !!f &&
            typeof f === "object" &&
            typeof (f as Record<string, unknown>).question === "string" &&
            typeof (f as Record<string, unknown>).answer === "string" &&
            (f as Record<string, string>).question.trim() !== "" &&
            (f as Record<string, string>).answer.trim() !== "",
        )
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
    : [];
  const related = Array.isArray(b.related)
    ? b.related.filter((x): x is string => typeof x === "string" && x.trim() !== "").map((x) => x.trim())
    : [];

  if (!slug || !SLUG_RE.test(slug)) {
    return { ok: false, error: "Slug must be lowercase letters, numbers, and hyphens only." };
  }
  if (!title) return { ok: false, error: "Title is required." };
  if (!tag) return { ok: false, error: "Tag is required." };
  if (!date || !DATE_RE.test(date)) {
    return { ok: false, error: "Date must be in YYYY-MM-DD format." };
  }
  if (updated && !DATE_RE.test(updated)) {
    return { ok: false, error: "Updated date must be in YYYY-MM-DD format." };
  }
  if (!readingTime) return { ok: false, error: "Reading time is required." };
  if (!excerpt) return { ok: false, error: "Excerpt is required." };
  if (body.length === 0) return { ok: false, error: "Body needs at least one paragraph." };

  return {
    ok: true,
    row: {
      slug,
      title,
      tag,
      date,
      updated,
      reading_time: readingTime,
      excerpt,
      body,
      faqs,
      related,
    },
  };
}
