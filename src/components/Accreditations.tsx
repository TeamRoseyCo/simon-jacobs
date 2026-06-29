import Image from "next/image";

type Item = {
  mark: string;
  caption: string;
  href: string;
  logo?: { src: string; width: number; height: number };
};

const items: Item[] = [
  {
    mark: "ICAEW",
    caption: "Chartered Accountant",
    href: "https://www.icaew.com",
    logo: { src: "/accreditations/icaew.png", width: 600, height: 988 },
  },
  {
    mark: "CIOT",
    caption: "Chartered Tax Adviser",
    href: "https://www.tax.org.uk",
    logo: { src: "/accreditations/ciot.png", width: 392, height: 726 },
  },
  { mark: "ex-PwC", caption: "Big Four trained", href: "https://www.pwc.co.uk" },
];

export default function Accreditations({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`accred-strip accred-${variant} ${className}`}>
      {items.map((item) => (
        <a
          key={item.mark}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="accred-badge"
          aria-label={`${item.mark}, ${item.caption} (opens in a new tab)`}
        >
          {item.logo ? (
            <Image
              src={item.logo.src}
              alt={`${item.mark}, ${item.caption}`}
              width={item.logo.width}
              height={item.logo.height}
              className="accred-logo"
            />
          ) : (
            <span className="accred-mark">{item.mark}</span>
          )}
          <span className="accred-caption">{item.caption}</span>
        </a>
      ))}
    </div>
  );
}
