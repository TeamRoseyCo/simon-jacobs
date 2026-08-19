"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PasScrollSequence.module.css";

const draftStages = [
  {
    key: "problem",
    label: "The problem",
    title: "Write the current state.",
    body: "Name what the owner is dealing with before Simon enters the picture.",
  },
  {
    key: "amplify",
    label: "",
    title: "Write the consequence.",
    body: "Show what gets worse if decisions stay reactive until year-end.",
  },
  {
    key: "solution",
    label: "The answer",
    title: "Write the mechanism.",
    body: "Explain advice before the money moves, not compliance after it.",
  },
] as const;

const liveStages = [
  {
    key: "problem",
    label: "The problem",
    title: "The numbers arrive after the decision.",
    body: "The accounts may be correct, but they do not help when you are deciding what to take out, what to reserve, or what the business can afford next.",
  },
  {
    key: "amplify",
    label: "",
    title: "By year-end, the useful options have narrowed.",
    body: "Dividends have been paid, thresholds crossed, and cash committed. The tax return records those choices; it cannot go back and remake them.",
  },
  {
    key: "solution",
    label: "The answer",
    title: "Plan while you still have choices.",
    body: "Keep the records current, review the decision before money moves, and understand the tax and cash consequence before you act.",
  },
] as const;

const stageCount = 3;

type PasScrollSequenceProps = {
  variant?: "live" | "draft";
};

export default function PasScrollSequence({
  variant = "live",
}: PasScrollSequenceProps) {
  const stages = variant === "draft" ? draftStages : liveStages;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const updateMode = () => setIsEnhanced(media.matches);
    updateMode();
    media.addEventListener("change", updateMode);

    return () => media.removeEventListener("change", updateMode);
  }, []);

  useEffect(() => {
    if (!isEnhanced) {
      activeRef.current = 0;
      trackRef.current?.style.removeProperty("--pas-offset");
      return;
    }

    const update = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const offset = progress * (stageCount - 1);
      const nextStage = Math.round(offset);

      trackRef.current?.style.setProperty("--pas-offset", String(offset));

      if (nextStage !== activeRef.current) {
        activeRef.current = nextStage;
        setActiveStage(nextStage);
      }
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnhanced]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} pas-scroll gutter-bleed${isEnhanced ? ` ${styles.enhanced} pas-scroll--enhanced` : ""}`}
      aria-label="Problem, amplification and solution"
      data-pas-section
    >
      <div className={`${styles.sticky} pas-scroll-sticky`} data-pas-sticky>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p className="ap-eyebrow" data-copy-key="pas-section-label">
              {variant === "draft" ? "Diagnosis" : "Before year-end"}
            </p>
            <h2 className="ap-h2" data-copy-key="pas-section-heading">
              {variant === "draft"
                ? "Write the problem, pressure and answer here."
                : "Advice has a shelf life."}
            </h2>
            <p className="ap-sub" data-copy-key="pas-section-intro">
              {variant === "draft"
                ? "Keep this tight: the reader's current state, the cost of leaving it alone, and the mechanism Simon uses to fix it."
                : "Once the money moves, the useful options narrow."}
            </p>
          </div>

          <div className={styles.body}>
            <div className={styles.stage} aria-live="polite">
              <div ref={trackRef} className={styles.track}>
                {stages.map((stage, index) => (
                  <article
                    key={stage.key}
                    className={styles.panel}
                    aria-hidden={isEnhanced && index !== activeStage}
                  >
                    {stage.label ? (
                      <p
                        className="ap-eyebrow"
                        data-copy-key={`pas-${stage.key}-label`}
                      >
                        {stage.label}
                      </p>
                    ) : null}
                    <h3
                      className={`${styles.title} pas-scroll-title`}
                      data-copy-key={`pas-${stage.key}-title`}
                    >
                      {stage.title}
                    </h3>
                    <p
                      className={styles.copy}
                      data-copy-key={`pas-${stage.key}-body`}
                    >
                      {stage.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
