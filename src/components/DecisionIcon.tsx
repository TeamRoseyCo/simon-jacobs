"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import styles from "./DecisionIcon.module.css";

type DecisionIconProps = {
  artworkSrc: string;
  emoji: string;
};

function isApplePlatform() {
  const platform = navigator.platform ?? "";
  const userAgent = navigator.userAgent ?? "";

  return (
    /Mac|iPhone|iPad|iPod/i.test(platform) ||
    /Macintosh|iPhone|iPad|iPod/i.test(userAgent)
  );
}

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => !isApplePlatform();

export default function DecisionIcon({
  artworkSrc,
  emoji,
}: DecisionIconProps) {
  // The server and Apple devices render the native emoji. Other platforms use
  // the downloaded artwork after hydration, inside the same fixed-size slot.
  const showArtwork = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return (
    <span className={styles.slot} aria-hidden="true">
      {showArtwork ? (
        <Image
          src={artworkSrc}
          alt=""
          fill
          sizes="60px"
          className={styles.artwork}
        />
      ) : (
        <span className={styles.emoji}>{emoji}</span>
      )}
    </span>
  );
}
