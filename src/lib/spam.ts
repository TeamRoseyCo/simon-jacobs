
const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);
export function normalizeEmail(email: string): string {
  return String(email || "").trim().toLowerCase();
}
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
