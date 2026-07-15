"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Toggle({
  on,
  disabled,
  onChange,
}: {
  on: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={`cc-tg ${on ? "on" : ""}`}
      onClick={() => !disabled && onChange(!on)}
    >
      <span className="cc-tg-knob" />
    </button>
  );
}

type CatKey = "required" | "analytics" | "marketing" | "functioning";

type ConsentChoice = {
  analytics?: boolean;
  marketing?: boolean;
  functioning?: boolean;
};

// Push the user's choice into Google Consent Mode v2. Defaults are set to
// 'denied' in layout.tsx before gtag loads; this flips them on opt-in.
function applyConsent(c: ConsentChoice) {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  const grant = (v: boolean | undefined) => (v ? "granted" : "denied");
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    analytics_storage: grant(c.analytics),
    ad_storage: grant(c.marketing),
    ad_user_data: grant(c.marketing),
    ad_personalization: grant(c.marketing),
    functionality_storage: grant(c.functioning),
    personalization_storage: grant(c.functioning),
  });
}

const CATEGORIES: {
  key: CatKey;
  name: string;
  locked?: boolean;
  desc: string;
}[] = [
  {
    key: "required",
    name: "Strictly Required",
    locked: true,
    desc: "These cookies are required to run our website properly and cannot be switched off.",
  },
  {
    key: "analytics",
    name: "Analytics",
    desc: "These cookies help us understand how visitors interact with the website by collecting and reporting information.",
  },
  {
    key: "marketing",
    name: "Marketing",
    desc: "These cookies are usually set by our marketing and advertising partners to show you relevant ads.",
  },
  {
    key: "functioning",
    name: "Functioning",
    desc: "Functional cookies enable our website to offer additional functions and personal settings.",
  },
];

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [view, setView] = useState<"main" | "prefs">("main");
  const [prefs, setPrefs] = useState({
    analytics: false,
    marketing: false,
    functioning: false,
  });
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sj-cookie-consent");
      if (!stored) {
        setShow(true);
      } else {
        // Returning visitor: re-apply their saved choice to Consent Mode.
        applyConsent(JSON.parse(stored) as ConsentChoice);
      }
    } catch {
      setShow(true);
    }
  }, []);

  // Never show on the internal admin dashboard.
  if (pathname?.startsWith("/admin")) return null;

  function save(choice: Record<string, boolean>) {
    applyConsent(choice);
    try {
      localStorage.setItem(
        "sj-cookie-consent",
        JSON.stringify({ required: true, ...choice, at: "set" }),
      );
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="cc-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
    >
      <div className={`cc-modal ${view === "prefs" ? "cc-modal-prefs" : ""}`}>
        {view === "main" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cc-icon" src="/cookie.webp" alt="" />
            <h2 className="cc-title">Cookie Consent</h2>
            <p className="cc-text">
              Our website uses cookies to make sure you get the best experience
              with us.
            </p>
            <Link className="cc-link" href="/privacy">
              Privacy Policy
            </Link>
            <div className="cc-actions">
              <button
                type="button"
                className="cc-pref"
                onClick={() => setView("prefs")}
              >
                Preferences
              </button>
              <button
                type="button"
                className="cc-accept"
                onClick={() =>
                  save({ analytics: true, marketing: true, functioning: true })
                }
              >
                Accept
              </button>
            </div>
          </>
        ) : (
          <div className="cc-prefs">
            <div className="cc-prefs-bar">
              <button
                type="button"
                className="cc-reject"
                onClick={() =>
                  save({
                    analytics: false,
                    marketing: false,
                    functioning: false,
                  })
                }
              >
                Reject
              </button>
              <button
                type="button"
                className="cc-acceptall"
                onClick={() =>
                  save({ analytics: true, marketing: true, functioning: true })
                }
              >
                Accept All
              </button>
            </div>
            <div className="cc-cats">
              {CATEGORIES.map((c) => (
                <div className="cc-cat" key={c.key}>
                  <div className="cc-cat-head">
                    <h3>{c.name}</h3>
                    <Toggle
                      on={c.locked ? true : prefs[c.key as keyof typeof prefs]}
                      disabled={c.locked}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, [c.key]: v }))
                      }
                    />
                  </div>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="cc-save"
              onClick={() => save(prefs)}
            >
              Save my choices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
