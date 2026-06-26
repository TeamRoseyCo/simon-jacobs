// Accreditation marks (ICAEW, CIOT, ex-PwC).
//
// LOGO SWAP: drop the official logo files into /public/accreditations/
// (icaew.svg, ciot.svg, pwc.svg) and set `logo` below. When `logo` is set the
// badge renders the image; otherwise it falls back to the text mark. Use the
// official brand assets:
//   ICAEW: https://www.icaew.com/about-icaew/find-a-chartered-accountant/icaew-member-logo
//   CIOT:  members area / brand guidelines at tax.org.uk
import Image from "next/image";

type Item = {
  mark: string;
  caption: string;
  logo?: string; // e.g. "/accreditations/icaew.svg"
};

const items: Item[] = [
  { mark: "ICAEW", caption: "Chartered Accountant" },
  { mark: "CIOT", caption: "Chartered Tax Adviser" },
  { mark: "ex-PwC", caption: "Big Four trained" },
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
        <div key={item.mark} className="accred-badge">
          {item.logo ? (
            <Image
              src={item.logo}
              alt={`${item.mark}, ${item.caption}`}
              width={120}
              height={48}
              className="accred-logo"
            />
          ) : (
            <span className="accred-mark">{item.mark}</span>
          )}
          <span className="accred-caption">{item.caption}</span>
        </div>
      ))}
    </div>
  );
}
