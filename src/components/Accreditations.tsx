import Image from "next/image";

type Item = {
  mark: string;
  caption: string;
  logo?: { src: string; width: number; height: number };
};

const items: Item[] = [
  {
    mark: "ICAEW",
    caption: "Chartered Accountant",
    logo: { src: "/accreditations/icaew.png", width: 600, height: 988 },
  },
  {
    mark: "CIOT",
    caption: "Chartered Tax Adviser",
    logo: { src: "/accreditations/ciot.png", width: 392, height: 726 },
  },
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
        </div>
      ))}
    </div>
  );
}
