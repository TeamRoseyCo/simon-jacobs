import crypto from "crypto";

export const ADMIN_COOKIE = "sj_admin";

/**
 * Token stored in the cookie = sha256(username + password + secret).
 * The raw credentials are never stored client-side.
 */
export function expectedToken(): string | null {
  const user = process.env.ADMIN_USERNAME;
  const pw = process.env.ADMIN_PASSWORD;
  if (!user || !pw) return null;
  const secret = process.env.ADMIN_SECRET || "sj-fallback-secret";
  return crypto.createHash("sha256").update(user + ":" + pw + secret).digest("hex");
}

export function checkCredentials(username: string, password: string): boolean {
  const user = process.env.ADMIN_USERNAME;
  const pw = process.env.ADMIN_PASSWORD;
  if (!user || !pw) return false;
  // constant-time compare on both fields
  const u = safeEqual(username, user);
  const p = safeEqual(password, pw);
  return u && p;
}

export function isAuthed(cookieValue: string | undefined): boolean {
  const expected = expectedToken();
  if (!expected || !cookieValue) return false;
  return safeEqual(cookieValue, expected);
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}
