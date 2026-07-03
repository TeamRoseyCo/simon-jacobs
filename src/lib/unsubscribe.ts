import { createHmac, timingSafeEqual } from "crypto";

// Signs/verifies one-click unsubscribe links so anyone can suppress their own
// address without auth, but can't suppress someone else's. Reuses ADMIN_SECRET
// rather than adding another secret to manage/rotate.
function sign(email: string): string {
  const secret = process.env.ADMIN_SECRET ?? "";
  return createHmac("sha256", secret).update(email.toLowerCase()).digest("hex").slice(0, 32);
}

export function unsubscribeUrl(baseUrl: string, email: string): string {
  const token = sign(email);
  return `${baseUrl}/api/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = sign(email);
  const a = Buffer.from(expected);
  const b = Buffer.from(token || "");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
