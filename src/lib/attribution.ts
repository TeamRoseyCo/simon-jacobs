// First-touch lead attribution, captured in the browser and carried through to
// the enquiry.
//
// Why this exists: Simon shares links from his Instagram bio and his LinkedIn
// profile and asked, on 21 July 2026, which of them produced the enquiries he
// had received. Nobody could answer. The UTM tags were on the landing URL, but
// they were gone the moment the visitor clicked through to /contact, so the
// contact form had nothing to send. This module captures the tags on the first
// page of the visit and keeps them for the rest of the session, so whichever
// form the visitor eventually submits still knows where they came from.
//
// First touch wins on purpose. Once a session has a record it is never
// overwritten: an internal navigation, or a second click from a different link
// in the same session, must not be able to take credit from the link that
// actually earned the enquiry.

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  // Off-site referrer only (see fromCurrentPage below).
  referrer?: string;
  // Path of the first page seen this session, e.g. "/scorecard".
  landing_page?: string;
};

// sessionStorage rather than localStorage: attribution should describe this
// visit. A tag from a link clicked three weeks ago is not why someone enquired
// today. Versioned key so a future shape change cannot read an old record.
const KEY = "srj-attribution-v1";

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

// Cap on any single stored value. These come off the URL, so they are whatever
// someone chose to put there, and they end up in Simon's notification email.
const MAX = 200;

// Fallback store for browsers where sessionStorage throws or is unavailable.
// The Instagram and LinkedIn in-app browsers, which are precisely the traffic
// this whole exercise is about, can be locked down that far. Module scope
// survives client-side navigation, which is the case that matters here, and is
// lost on a full page load, which is the best that can be done without setting
// a cookie. Never worse than the unattributed leads we had before.
let memory: Attribution | null = null;

function clean(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  // Collapse newlines: the values are rendered as lines in the notification
  // email, and a smuggled newline could forge one. Also stripped server-side.
  const trimmed = value.replace(/[\r\n\t]+/g, " ").trim().slice(0, MAX);
  return trimmed || undefined;
}

function readStore(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : null;
  } catch {
    // Disabled, full, or holding malformed JSON. Either way: no stored record.
    return null;
  }
}

function writeStore(value: Attribution): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable. `memory` above already holds the same record.
  }
}

function fromCurrentPage(): Attribution {
  const out: Attribution = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const field of UTM_FIELDS) {
      const value = clean(params.get(field));
      if (value) out[field] = value;
    }
    // Only an off-site referrer says anything useful. An internal one would
    // record the previous step in the funnel and hide the real origin.
    const ref = clean(document.referrer);
    if (ref && !ref.startsWith(window.location.origin)) out.referrer = ref;
    // Path only. The tags are already captured as their own fields, so keeping
    // the query string here would only make the notification harder to read.
    out.landing_page = window.location.pathname;
  } catch {
    // Nothing readable about this page. An empty record is a valid answer.
  }
  return out;
}

/**
 * The attribution for this session, capturing it from the current page on the
 * first call and returning the same record on every call after that.
 *
 * Capture-on-read rather than capture-in-an-effect on purpose: React runs child
 * effects before parent effects, so a form's effect can fire before the layout
 * component that would otherwise do the capturing. Making the read self-healing
 * removes that ordering trap entirely.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const stored = readStore() ?? memory;
  if (stored) return stored;
  const fresh = fromCurrentPage();
  memory = fresh;
  writeStore(fresh);
  return fresh;
}

/**
 * The attribution as flat POST-body fields, empty values dropped, ready to
 * spread into a form submission. Used by all three forms so there is one shape
 * for /api/contact to read.
 */
export function attributionPayload(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(getAttribution())) {
    if (value) out[key] = value;
  }
  return out;
}
