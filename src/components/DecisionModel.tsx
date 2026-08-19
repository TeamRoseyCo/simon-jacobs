import styles from "./DecisionModel.module.css";
import DecisionIcon from "./DecisionIcon";

const areas = [
  {
    icon: "📚",
    artworkSrc: "/images/decision-model/fluent-books.png",
    title: "Keep the picture current",
    body: "Know what the business has earned, what it owes and what it can afford before the next decision lands.",
  },
  {
    icon: "🧮",
    artworkSrc: "/images/decision-model/fluent-abacus.png",
    title: "Make tax decisions early",
    body: "Review the position before year-end, while timing, reliefs and the way a transaction is structured can still change.",
  },
  {
    icon: "💷",
    artworkSrc: "/images/decision-model/fluent-pound-banknote.png",
    title: "Choose how money leaves",
    body: "Compare salary, dividends, pension and retained profit against both company cash and your personal tax position.",
  },
  {
    icon: "🧭",
    artworkSrc: "/images/decision-model/fluent-compass.png",
    title: "Prepare for the next move",
    body: "See what hiring, investing, moving country or selling the business changes before you commit.",
  },
] as const;

export default function DecisionModel() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className="ap-eyebrow" data-copy-key="model-eyebrow">
            How it works
          </p>
          <h2 className="ap-h2" data-copy-key="model-heading">
            The work starts before the tax return.
          </h2>
          <p className="ap-sub" data-copy-key="model-intro">
            We keep the books current, review tax before year-end, plan how you
            take money out and check what the next move changes.
          </p>
        </header>

        <div className={styles.grid}>
          {areas.map((area, index) => (
            <article className={styles.item} key={area.title}>
              <div className={styles.meta}>
                <p className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <DecisionIcon
                  artworkSrc={area.artworkSrc}
                  emoji={area.icon}
                />
              </div>
              <h3 data-copy-key={`model-${index + 1}-heading`}>
                {area.title}
              </h3>
              <p data-copy-key={`model-${index + 1}-body`}>{area.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
