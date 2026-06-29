import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Full-screen overlay so the admin area reads as its own standalone panel,
// sitting above the public site chrome. The .dashboard-panel class supplies
// the animated sky-blue backdrop and palette (ported from raharesort).
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="dashboard-panel"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        overflowY: "auto",
      }}
    >
      {children}
    </div>
  );
}
