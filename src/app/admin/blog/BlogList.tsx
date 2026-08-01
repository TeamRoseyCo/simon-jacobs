"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  actionBtn,
  cardStyle,
  ghostPill,
  tableStyle,
  tdStyle,
  thStyle,
  TrashIcon,
} from "../ui";

export type BlogListItem = {
  slug: string;
  title: string;
  tag: string;
  date: string;
};

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function onDelete(slug: string) {
    if (!window.confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        window.alert(data.error ?? "Delete failed.");
      }
    } catch {
      window.alert("Network error. Please try again.");
    }
    setDeletingSlug(null);
  }

  return (
    <div style={{ ...cardStyle, marginTop: "1.5rem", overflowX: "auto" }}>
      {posts.length === 0 ? (
        <p style={{ padding: "2.5rem 1.5rem", textAlign: "center", color: "var(--color-text-muted)" }}>
          No posts yet.{" "}
          <Link href="/admin/blog/new" style={{ color: "var(--color-primary)" }}>
            Write the first one →
          </Link>
        </p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thStyle, textAlign: "left" }}>Title</th>
              <th style={thStyle}>Tag</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.slug}>
                <td style={{ ...tdStyle, textAlign: "left" }}>
                  <div style={{ fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                    /blog/{p.slug}
                  </div>
                </td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{p.tag}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{p.date}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                    <Link href={`/admin/blog/${p.slug}`} style={ghostPill}>
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(p.slug)}
                      disabled={deletingSlug === p.slug}
                      style={actionBtn("#c0392b", false)}
                      aria-label={`Delete ${p.title}`}
                      title="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
