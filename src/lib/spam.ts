// src/lib/spam.ts
// Pure helpers for keeping bot / spam submissions out of the contact + scorecard
// forms. Ported from the Rosey Co spam gate. No DB or network here, so it is
// trivially testable and safe to import anywhere.
// RELEVANT FILES: src/app/api/contact/route.ts, src/components/ContactForm.tsx, src/components/ScorecardForm.tsx

const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

/** Lowercase + trim. The minimal cleanup every address gets. */
export function normalizeEmail(email: string): string {
  return String(email || "").trim().toLowerCase();
}

/**
 * Heuristic detector for the automated Gmail dot-abuse / gibberish signups.
 * Returns true only for the clearly-synthetic pattern, never for ordinary
 * addresses like first.last@gmail.com. Conservative on purpose.
 */
export function looksLikeBot(email: string): boolean {
  const norm = normalizeEmail(email);
  const at = norm.lastIndexOf("@");
  if (at < 1) return false;
  const local = norm.slice(0, at);
  const domain = norm.slice(at + 1);
  if (!GMAIL_DOMAINS.has(domain)) return false; // pattern is Gmail-specific

  const dots = (local.match(/\./g) || []).length;
  const frags = local.split(".").filter(Boolean);
  const avgFrag = frags.length ? frags.join("").length / frags.length : 99;

  if (dots >= 3) return true;
  if (dots >= 2 && avgFrag <= 2.5) return true;
  return false;
}

/**
 * Heuristic detector for keyboard-mash / randomly generated names (the garbage
 * rows spam bots submit, e.g. "Xkfjdhslwoe" or "gCpTuqSPMwSFTqcqzFUFmS").
 * Conservative so real names, including short, non-English, and hyphenated ones,
 * pass. Only trips on strong, unambiguous signals:
 *   - a digit inside a human name;
 *   - a run of 6+ consecutive consonants (no natural name does this);
 *   - a long token (10+ letters) with almost no vowels; or
 *   - a long token (12+ letters) whose case flips 6+ times.
 * Short tokens are never judged, they carry too much false-positive risk.
 */
export function looksLikeGibberishName(name: string): boolean {
  const raw = String(name || "").trim();
  if (!raw) return false;
  if (/\d/.test(raw)) return true; // digits never appear in a real name

  const tokens = raw.split(/[\s'\-]+/).filter(Boolean);
  for (const token of tokens) {
    const letters = token.replace(/[^a-z]/gi, "");
    if (letters.length < 10) continue; // too short to judge safely

    if (/[^aeiouy\s'-]{6,}/i.test(token)) return true; // 6+ consonants in a row

    const vowels = (letters.match(/[aeiouy]/gi) || []).length;
    if (vowels / letters.length < 0.15) return true; // long token, almost no vowels

    if (letters.length >= 12) {
      let flips = 0;
      for (let i = 1; i < letters.length; i++) {
        const a = letters[i - 1];
        const b = letters[i];
        if (
          (a === a.toLowerCase() && b === b.toUpperCase() && b !== b.toLowerCase()) ||
          (a === a.toUpperCase() && a !== a.toLowerCase() && b === b.toLowerCase())
        ) {
          flips++;
        }
      }
      if (flips >= 6) return true;
    }
  }
  return false;
}
