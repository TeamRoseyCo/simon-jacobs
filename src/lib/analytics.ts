
import { getAttribution } from "@/lib/attribution";
const CONSENT_KEY = "sj-cookie-consent";

type GtagWindow = { gtag?: (...args: unknown[]) => void };

function analyticsGranted(): boolean {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as { analytics?: boolean }).analytics === true;
  } catch {
    return false;
  }
}
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
  }
}
export function trackLead(opts: {
  form: "contact" | "scorecard" | "newsletter";
  qualified?: boolean;
}): void {
  const a = getAttribution();
  trackEvent("generate_lead", {
    form_type: opts.form,
    lead_source: a.utm_source ?? "untagged",
    lead_medium: a.utm_medium ?? "untagged",
    lead_campaign: a.utm_campaign ?? "untagged",
    qualified: opts.qualified === undefined ? "n/a" : opts.qualified ? "yes" : "no",
    landing_page: a.landing_page ?? "unknown",
  });
}
