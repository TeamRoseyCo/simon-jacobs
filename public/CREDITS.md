# Third-party artwork

## Process step icons

`diagnose.webp`, `plan.webp`, `maintain.webp` — the three 160px discs above the
Diagnose / Plan / Maintain cards on `/services`, wired up by `stepEmoji` in
`src/app/services/page.tsx`. Rendered at 64px, so 160 is comfortably retina.

**Noto Emoji**, from `googlefonts/noto-emoji`, Apache License 2.0. Free to use
commercially, no attribution required on the page. Recorded here anyway, because
a licence you cannot trace is a licence you cannot defend.

### Why not Apple's

These shipped as the Apple set from June 2026 (commit `c58b1e3`) until
2026-08-17, because Apple's are the ones people picture when they say "emoji".
They came out because Apple Color Emoji is licensed for use on Apple platforms
only, so serving the artwork off Simon's own domain is not his to do. Hazem
caught it and made the call to swap.

If the glossy look is wanted back, the licensable options are Twemoji
(CC BY 4.0, needs visible attribution somewhere on the site) or OpenMoji
(CC BY-SA 4.0, whose share-alike terms are not worth it for an icon). Noto is
the one with no strings.

### Regenerating

```sh
# code -> name, matching the stepEmoji order in src/app/services/page.tsx
# 1f50d diagnose   1f4cb plan   1f504 maintain
curl -sfL "https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/512/emoji_u<code>.png" -o /tmp/e.png
sips -z 160 160 /tmp/e.png --out /tmp/e-160.png
cwebp -q 90 -alpha_q 100 /tmp/e-160.png -o public/<name>.webp
```

Some codepoints are filed with a variation selector, so if `emoji_u<code>.png`
404s try `emoji_u<code>_fe0f.png`.

## Unresolved

`cookie.webp` — the icon in the cookie consent banner (`CookieConsent.tsx`).
Not Apple's set (Apple's cookie has no bite taken out of it), but the source is
untraced, so the licence is unknown. Either find where it came from or replace
it with Noto `1f36a` on the same principle as above.

`claude.webp` — used by `ClaudeGif.tsx`. A logo rather than emoji art, so this
is a trademark question, not an emoji licensing one. Not reviewed.
