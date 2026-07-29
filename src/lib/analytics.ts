// GA4 events, gated on cookie consent.
//
// Nothing here may fire before the visitor has accepted analytics cookies. That
// is a UK PECR/GDPR requirement for a regulated practice, not a nicety, so the
// gate is checked on every call rather than once at module load: a visitor can
// land, submit, and only accept cookies later, or never.
//
// Two layers already exist and this is the third:
//   1. layout.tsx sets Google Consent Mode v2 to denied before gtag loads.
//   2. CookieConsent.tsx flips it to granted on opt-in and stores the choice.
//   3. This module refuses to queue an event at all unless that stored choice
//      says analytics is granted. Consent Mode alone would still let GA4 send a
//      cookieless ping, and the point is that no request leaves the browser.

import { getAttribution } from "@/lib/attribution";

// Must match the key CookieConsent.tsx writes. Kept as a literal in both places
// rather than shared, because the banner's storage format is its own business.
const CONSENT_KEY = "sj-cookie-consent";

type GtagWindow = { gtag?: (...args: unknown[]) => void };

function analyticsGranted(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as { analytics?: boolean }).analytics === true;
  } catch {
    // No stored choice we can read means no consent we can rely on.
    return false;
  }
}

/**
 * Send a GA4 event, or do nothing at all if consent is missing or gtag never
 * loaded (blocked by an extension, offline, still loading). Never throws:
 * analytics failing must not take a form submission down with it.
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (!analyticsGranted()) return;
  const w = window as unknown as GtagWindow;
  if (typeof w.gtag !== "function") return;
  try {
    w.gtag("event", name, params);
  } catch {
    // Nothing to recover: the lead is already stored and emailed server-side.
  }
}

/**
 * The one lead event for the whole site: `generate_lead`, with the channel and
 * (for the contact form) whether the lead qualified. Param names are documented
 * in docs/lead-attribution-2026-07.md, which is also where the note lives about
 * registering them as GA4 custom dimensions before they show in reports.
 *
 * Call it only after the submission has actually succeeded. An event fired
 * optimistically would inflate the count Simon uses to judge which link works.
 */
export function trackLead(opts: {
  form: "contact" | "scorecard" | "newsletter";
  qualified?: boolean;
}): void {
  const a = getAttribution();
  trackEvent("generate_lead", {
    form_type: opts.form,
    // "untagged" rather than an empty string: a lead that arrived without one of
    // Simon's tagged links is a real, countable category, and GA4 drops empty
    // param values so it would otherwise vanish from the report.
    lead_source: a.utm_source ?? "untagged",
    lead_medium: a.utm_medium ?? "untagged",
    lead_campaign: a.utm_campaign ?? "untagged",
    // Only the contact form qualifies anyone. "n/a" keeps the param one type,
    // which a GA4 custom dimension needs.
    qualified: opts.qualified === undefined ? "n/a" : opts.qualified ? "yes" : "no",
    landing_page: a.landing_page ?? "unknown",
  });
}
