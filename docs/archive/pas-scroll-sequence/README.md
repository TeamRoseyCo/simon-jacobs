# Archived: PasScrollSequence

Removed from the live site on 13 September 2026. The component and its stylesheet
are kept here in full so the block can be restored or rebuilt without archaeology.

## What it was

A scroll-driven problem, amplification and solution sequence that sat between the
accreditation strip and the decision model on the home page, and in draft form on
the internal `/copy-homepage` editor. Three panels advanced as the visitor scrolled
past a sticky pane.

## Why it was removed

Measured on the live deploy at 1440px, headless Chromium, 13 September 2026:

| Measured | Home page |
|---|---|
| Page height at rest | 10,920 px |
| Vertical space with no text or media in it | 2,280 px (21% of the page) |
| Largest single empty band, inside this block | 1,060 px |
| Block wrapper | `min-height: 300svh` |

The wrapper reserved three viewport heights, roughly 2,700 px on a 900 px screen,
to deliver three headings and three sentences. At rest the block reads as a large
empty band: the panels are only present once the scroll handler has run, so they
are invisible to a link preview, to a fast scroll, and to any capture of the page
in its initial state.

Two secondary reasons:

- The sequence listened on `window.addEventListener("scroll")` and drove state from
  it, which repaints on every scroll frame.
- The same argument is made in fewer pixels by the copy already on the page.

## The copy, preserved

Section heading: "Advice has a shelf life."
Eyebrow: "Before year-end."
Intro: "Once the money moves, the useful options narrow."

1. The problem. "The numbers arrive after the decision." The accounts may be
   correct, but they do not help when you are deciding what to take out, what to
   reserve, or what the business can afford next.
2. "By year-end, the useful options have narrowed." Dividends have been paid,
   thresholds crossed, and cash committed. The tax return records those choices;
   it cannot go back and remake them.
3. The answer. "Plan while you still have choices." Keep the records current,
   review the decision before money moves, and understand the tax and cash
   consequence before you act.

This is the timing mechanism from `docs/primer-brief-2026-09.md`, so if the block
is rebuilt as a static section the wording above is the version to start from.

## Restoring it

```
git mv docs/archive/pas-scroll-sequence/PasScrollSequence.tsx src/components/
git mv docs/archive/pas-scroll-sequence/PasScrollSequence.module.css src/components/
```

Then re-add the import and `<PasScrollSequence />` to `src/app/page.tsx`, and
`<PasScrollSequence variant="draft" />` to `src/app/copy-homepage/page.tsx`.
