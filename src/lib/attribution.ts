
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
};
const KEY = "srj-attribution-v1";

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const MAX = 200;
let memory: Attribution | null = null;

function clean(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
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
    return null;
  }
}

function writeStore(value: Attribution): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
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
    const ref = clean(document.referrer);
    if (ref && !ref.startsWith(window.location.origin)) out.referrer = ref;
    out.landing_page = window.location.pathname;
  } catch {
  }
  return out;
}
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const stored = readStore() ?? memory;
  if (stored) return stored;
  const fresh = fromCurrentPage();
  memory = fresh;
  writeStore(fresh);
  return fresh;
}
export function attributionPayload(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(getAttribution())) {
    if (value) out[key] = value;
  }
  return out;
}
