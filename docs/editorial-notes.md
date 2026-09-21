# Editorial notes archive

This document is the home for project rationale that was previously embedded in application code. It was consolidated on 29 August 2026 so the website source can describe behavior without carrying design reviews, copy history, or stakeholder reminders.

## Content and compliance decisions

- The site is positioned as a general practice, with cross-border tax, exit planning, and agency/creative sectors as specialist areas. The decision record is in [general-practice-repositioning-2026-08.md](general-practice-repositioning-2026-08.md).
- Confirm Simon's ICAEW profile URL before relying on it as structured-data identity evidence.
- Confirm service-checklist wording and the scorecard questions that are not copied verbatim from Simon's approved source.
- Keep testimonial attribution, ratings, and substantiation records current. Remove a rating rather than publishing it without evidence.
- Keep published claims descriptive of the work and position it creates; do not make unconditional outcome claims.

## Design rationale

- The visual system should be judged from the rendered site and current CSS, not a running commentary in stylesheets. Historical moodboards and exploration files remain in `design/moodboards/`.
- The home page and interior pages use a restrained, readable system: clear type hierarchy, one primary action per view, generous spacing, and imagery used as content rather than decoration.
- Use the current responsive behavior as the source of truth. If a meaningful design decision needs recording, add a dated note here or to the relevant design document rather than annotating selectors.

## Operating notes

- Lead attribution, email sequences, scheduled publishing, SEO, and handoff procedures each have a dedicated document in `docs/`. Update those documents when the associated workflow changes.
- Privacy, consent, spam protection, and lead-delivery behavior are deliberate safeguards. Any change to them should be documented in the appropriate operational or compliance document and verified with tests.
- Temporary copy, confirmation requests, and review prompts belong in the relevant planning or sign-off document, never in production source.

## Documentation rule

When context is needed for a future change, add it to a focused Markdown document in `docs/` with a descriptive title. Keep source comments limited to short, necessary implementation constraints.
