"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ============================================================================
   Admin dashboard design system. Literal port of the raharesort.com dashboard
   (frosted cards, pill controls, centered table, pagination) on the sky-blue
   .dashboard-panel backdrop. Colours come from the panel-scoped CSS vars.
   ========================================================================== */

/* ---- Layout ---------------------------------------------------------------- */

export function pageWrap(maxWidth = 1100): React.CSSProperties {
  return { maxWidth, margin: "0 auto", padding: "2.25rem 1.25rem 4rem" };
}

export const headerRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "1rem",
};

export const eyebrowStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "var(--color-primary)",
};

export const pageTitleStyle: React.CSSProperties = {
  marginTop: "0.4rem",
  fontSize: "1.75rem",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  fontFamily: "var(--font-sans)",
  color: "var(--color-secondary)",
};

export const controlsRow: React.CSSProperties = {
  margin: "1.5rem 0",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.7rem",
};

export const metaTextStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  fontWeight: 400,
  color: "var(--color-text-muted)",
};

/* ---- Surfaces -------------------------------------------------------------- */

export const cardStyle: React.CSSProperties = {
  borderRadius: 22,
  overflow: "hidden",
  background: "rgba(255,255,255,0.86)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 30px 70px -34px rgba(20,50,90,0.55)",
  border: "1px solid rgba(255,255,255,0.75)",
};

export const emptyCardStyle: React.CSSProperties = {
  ...cardStyle,
  padding: "3.5rem 1.5rem",
  textAlign: "center",
  color: "var(--color-text-muted)",
  fontSize: "0.95rem",
};

/* ---- Buttons & controls ---------------------------------------------------- */

const pillBase: React.CSSProperties = {
  padding: "0.6rem 1.15rem",
  fontSize: "0.74rem",
  fontWeight: 500,
  letterSpacing: "0.06em",
  borderRadius: 999,
  border: "1px solid transparent",
  cursor: "pointer",
};

export function primaryPill(disabled = false): React.CSSProperties {
  return {
    ...pillBase,
    background: "var(--color-secondary)",
    color: "#ffffff",
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "default" : "pointer",
  };
}

export const ghostPill: React.CSSProperties = {
  ...pillBase,
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
  background: "rgba(255,255,255,0.6)",
  color: "var(--color-secondary)",
  border: "1px solid rgba(20,40,80,0.18)",
};

export const roundControl: React.CSSProperties = {
  padding: "0.5rem 0.95rem",
  fontSize: "0.85rem",
  fontWeight: 400,
  border: "1px solid rgba(20,40,80,0.16)",
  borderRadius: 999,
  background: "rgba(255,255,255,0.7)",
  color: "var(--color-secondary)",
  outline: "none",
};

export const searchInput: React.CSSProperties = {
  flex: "1 1 220px",
  maxWidth: 320,
  padding: "0.6rem 1.1rem",
  fontSize: "0.9rem",
  border: "1px solid rgba(20,40,80,0.16)",
  borderRadius: 999,
  background: "rgba(255,255,255,0.7)",
  color: "var(--color-secondary)",
  outline: "none",
};

/** Round 32px icon action button (delete). */
export function actionBtn(color: string, active = false): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    padding: 0,
    color: active ? "#ffffff" : color,
    background: active ? color : "rgba(255,255,255,0.5)",
    border: `1px solid ${color}`,
    borderRadius: 999,
    cursor: active ? "default" : "pointer",
  };
}

/* ---- Table ----------------------------------------------------------------- */

export const thStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "0.95rem 0.85rem",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  background: "rgba(225,240,255,0.5)",
  borderBottom: "1px solid rgba(20,40,80,0.08)",
  whiteSpace: "nowrap",
};

export const tdStyle: React.CSSProperties = {
  padding: "0.8rem 0.85rem",
  borderBottom: "1px solid rgba(20,40,80,0.06)",
  color: "var(--color-secondary)",
  verticalAlign: "top",
};

export const tdCenter: React.CSSProperties = { ...tdStyle, textAlign: "center" };

export const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.9rem",
};

/* ---- Icons ----------------------------------------------------------------- */

export function TrashIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}

/* ---- Pagination ------------------------------------------------------------ */

export const PAGE_SIZES = [15, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 15;

export function usePagination<T>(items: T[], resetKey: string) {
  const [pageSize, setPageSize] = useState<number | "all">(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey, pageSize]);

  const total = items.length;
  const perPage = pageSize === "all" ? Math.max(total, 1) : pageSize;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const paged = useMemo(
    () => items.slice(startIndex, startIndex + perPage),
    [items, startIndex, perPage],
  );
  const showingFrom = total === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + perPage, total);

  return {
    paged,
    page,
    setPage,
    pageSize,
    setPageSize,
    total,
    totalPages,
    currentPage,
    showingFrom,
    showingTo,
  };
}

export function PaginationBar({
  total,
  totalPages,
  currentPage,
  showingFrom,
  showingTo,
  pageSize,
  setPage,
  setPageSize,
}: {
  total: number;
  totalPages: number;
  currentPage: number;
  showingFrom: number;
  showingTo: number;
  pageSize: number | "all";
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number | "all">>;
}) {
  if (total === 0) return null;
  const atStart = pageSize === "all" || currentPage <= 1;
  const atEnd = pageSize === "all" || currentPage >= totalPages;

  return (
    <div
      style={{
        marginTop: "1.1rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.85rem",
      }}
    >
      <span style={metaTextStyle}>
        Showing {showingFrom} to {showingTo} of {total}
      </span>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
          }}
        >
          Per page
          <select
            value={pageSize === "all" ? "all" : String(pageSize)}
            onChange={(e) =>
              setPageSize(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
            aria-label="Rows per page"
            style={roundControl}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
            <option value="all">All</option>
          </select>
        </label>

        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={atStart}
          style={{
            ...roundControl,
            cursor: atStart ? "default" : "pointer",
            opacity: atStart ? 0.45 : 1,
          }}
        >
          Prev
        </button>
        <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
          {pageSize === "all"
            ? "Page 1 of 1"
            : `Page ${currentPage} of ${totalPages}`}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={atEnd}
          style={{
            ...roundControl,
            cursor: atEnd ? "default" : "pointer",
            opacity: atEnd ? 0.45 : 1,
          }}
        >
          Next
        </button>

        <button
          type="button"
          onClick={() =>
            setPageSize((s) => (s === "all" ? DEFAULT_PAGE_SIZE : "all"))
          }
          style={{
            ...roundControl,
            cursor: "pointer",
            background:
              pageSize === "all"
                ? "var(--color-secondary)"
                : "rgba(255,255,255,0.7)",
            color: pageSize === "all" ? "#ffffff" : "var(--color-secondary)",
          }}
        >
          {pageSize === "all" ? "Paginate" : "Show all"}
        </button>
      </div>
    </div>
  );
}
