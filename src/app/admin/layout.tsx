import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
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
