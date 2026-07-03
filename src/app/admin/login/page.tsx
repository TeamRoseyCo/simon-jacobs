"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 0.85rem",
  fontSize: "0.95rem",
  border: "1px solid rgba(0,0,0,0.18)",
  background: "#ffffff",
  color: "var(--color-secondary)",
  outline: "none",
};

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Login failed.");
    } catch {
      setError("Network error. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div
      style={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.25rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#ffffff",
          padding: "2.5rem 2rem",
          boxShadow: "0 18px 48px -22px rgba(20,40,80,0.4)",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--color-primary)",
          }}
        >
          SRJ International
        </p>
        <h1
          style={{
            marginTop: "0.5rem",
            fontSize: "1.6rem",
            lineHeight: 1.2,
            color: "var(--color-secondary)",
          }}
        >
          Admin Dashboard
        </h1>
        <div
          style={{
            margin: "1rem 0 1.5rem",
            width: 48,
            height: 2,
            background: "var(--color-accent)",
          }}
        />

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.85rem" }}>
          <label style={{ display: "grid", gap: "0.35rem" }}>
            <span style={labelStyle}>Username</span>
            <input
              type="text"
              required
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={{ display: "grid", gap: "0.35rem" }}>
            <span style={labelStyle}>Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            style={{
              marginTop: "0.35rem",
              padding: "0.8rem 1rem",
              background: "var(--color-secondary)",
              color: "#ffffff",
              border: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? "Signing in..." : "Sign In"}
          </button>

          <p
            aria-live="polite"
            style={{ minHeight: "1.1rem", fontSize: "0.82rem", color: "#c0392b" }}
          >
            {error}
          </p>
        </form>
      </div>
    </div>
  );
}
