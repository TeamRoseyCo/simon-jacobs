import Image from "next/image";

// The software Simon runs client books on. Logos pulled into /public.
export default function WorksWith({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const label = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/55" : "text-muted";
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ${className}`}
    >
      <a
        href="https://www.xero.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 transition hover:opacity-70"
      >
        <Image src="/xero.svg" alt="Xero" width={30} height={30} />
        <span className={`text-sm font-medium ${label}`}>
          Xero <span className={sub}>· Bronze Partner</span>
        </span>
      </a>
      <a
        href="https://www.zoho.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 transition hover:opacity-70"
      >
        <Image src="/zoho.svg" alt="Zoho" width={28} height={28} />
        <span className={`text-sm font-medium ${label}`}>Zoho</span>
      </a>
    </div>
  );
}
