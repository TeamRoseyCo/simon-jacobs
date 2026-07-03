"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  actionBtn,
  cardStyle,
  controlsRow,
  emptyCardStyle,
  eyebrowStyle,
  ghostPill,
  headerRow,
  metaTextStyle,
  pageTitleStyle,
  pageWrap,
  PaginationBar,
  primaryPill,
  searchInput,
  tableStyle,
  tdCenter,
  tdStyle,
  thStyle,
  TrashIcon,
  usePagination,
} from "./ui";

export type Lead = {
  id: string | number;
  created_at: string;
  source: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  message: string | null;
  score: string | null;
};

const SOURCE_LABELS: Record<string, string> = {
  subscribe: "Newsletter",
  contact: "Contact form",
  scorecard: "Scorecard",
};

function prettySource(source: string): string {
  return SOURCE_LABELS[source] ?? source;
}

function ordinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const month = d.toLocaleString("en-GB", { month: "long" });
  const day = d.getDate();
  return `${month} ${day}${ordinalSuffix(day)}`;
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadCsv(rows: Lead[]) {
  const header = [
    "Date",
    "Source",
    "Name",
    "Email",
    "Phone",
    "Website",
    "Message",
    "Score",
  ];
  const lines = [header.map(csvCell).join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.created_at,
        prettySource(r.source),
        r.name ?? "",
        r.email ?? "",
        r.phone ?? "",
        r.website ?? "",
        r.message ?? "",
        r.score ?? "",
      ]
        .map((v) => csvCell(String(v)))
        .join(","),
    );
  }
  const blob = new Blob(["﻿" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `jacobs-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.email, l.name, prettySource(l.source), l.message, l.score]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [leads, query]);

  const pg = usePagination(filtered, query);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
    router.refresh();
  }

  async function deleteRow(l: Lead) {
    if (deletingId !== null) return;
    if (!window.confirm(`Delete the lead from ${l.email || "this row"}? This cannot be undone.`))
      return;
    setDeletingId(l.id);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: l.id }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      window.alert("Could not delete that lead. Please try again.");
    } catch {
      window.alert("Network error. Please try again.");
    }
    setDeletingId(null);
  }

  return (
    <div style={pageWrap(1080)}>
      <header style={headerRow}>
        <div>
          <p style={eyebrowStyle}>SRJ International</p>
          <h1 style={pageTitleStyle}>Leads</h1>
        </div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            type="button"
            onClick={() => downloadCsv(filtered)}
            disabled={filtered.length === 0}
            style={primaryPill(filtered.length === 0)}
          >
            Download CSV
          </button>
          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            style={ghostPill}
          >
            {loggingOut ? "..." : "Log Out"}
          </button>
        </div>
      </header>

      <div style={controlsRow}>
        <span style={metaTextStyle}>
          {leads.length} total
          {query ? ` / ${filtered.length} shown` : ""}
        </span>
        <input
          type="search"
          placeholder="Search name, email, source or message"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={searchInput}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={emptyCardStyle}>
          {leads.length === 0
            ? "No leads yet. Form submissions will appear here once Supabase is connected."
            : "No leads match your search."}
        </div>
      ) : (
        <div style={cardStyle}>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Source</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Message / Score</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pg.paged.map((l) => (
                  <tr key={l.id}>
                    <td
                      style={{
                        ...tdCenter,
                        whiteSpace: "nowrap",
                        color: "var(--color-text-light)",
                      }}
                      title={new Date(l.created_at).toLocaleString()}
                    >
                      {formatDate(l.created_at)}
                    </td>
                    <td style={{ ...tdCenter, color: "var(--color-text-light)" }}>
                      {prettySource(l.source)}
                    </td>
                    <td style={{ ...tdStyle, color: "var(--color-text-light)" }}>
                      {l.name || "n/a"}
                    </td>
                    <td style={tdStyle}>
                      {l.email ? (
                        <a
                          href={`mailto:${l.email}`}
                          style={{
                            color: "var(--color-secondary)",
                            textDecoration: "none",
                          }}
                        >
                          {l.email}
                        </a>
                      ) : (
                        "n/a"
                      )}
                    </td>
                    <td style={{ ...tdCenter, color: "var(--color-text-light)" }}>
                      {l.phone || "n/a"}
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        maxWidth: 320,
                        whiteSpace: "pre-wrap",
                        color: "var(--color-text-light)",
                      }}
                    >
                      {l.message || l.score || "n/a"}
                    </td>
                    <td style={tdCenter}>
                      <button
                        type="button"
                        onClick={() => deleteRow(l)}
                        disabled={deletingId !== null}
                        title="Delete"
                        aria-label="Delete"
                        style={{
                          ...actionBtn("#c0392b", false),
                          opacity:
                            deletingId !== null && deletingId !== l.id ? 0.4 : 1,
                        }}
                      >
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PaginationBar {...pg} />
    </div>
  );
}
