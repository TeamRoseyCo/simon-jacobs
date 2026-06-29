# Simon — Discovery Checklist (Gate 1)

> Info we still need from Simon (he never returned an intake form). Fill the
> **Answer:** lines as they come in. Grouped by how much each one blocks the build.
> Full context for each item lives in `gate-1-understand.md`.

---

## 🔴 Blocks conversion — get these first

- [x] **1. Booking link.** Every rival's main CTA is "Book a call"; we're still on a `mailto:`. Does he have / will he set up a Calendly or Cal.com link for the 15-min discovery call?
  - **Answer:** ✅ Google Calendar appointment link → `https://calendar.app.google/LjoJzvA8E1p9E8oV7`. *(TODO: replace `mailto:` bookHref across the site with this.)*

- [x] **2. Where do leads go?** To wire the three forms (contact, consult, newsletter) we need a destination — which inbox, and is there a CRM/mailing tool (Mailchimp, HubSpot, a spreadsheet)?
  - **Answer:** Booking routes to his email. **No CRM / mailing tool yet** → newsletter + contact/consult forms still need a destination (pick Resend/Formspree/etc.). *Confirm exact inbox address.*

- [x] **3. Accreditation marks.** Can he supply / approve display of the CIOT (CTA) mark, the ICAEW (ACA) mark, and any PwC-alumni mark? (We currently only have the *words* "CTA · ACA · Ex-PwC".)
  - **Answer:** ✅ Confirmed **ACA + CIOT** memberships. ICAEW + CIOT logos **already in repo & live** (`public/accreditations/`). ex-PwC stays text-only (no alumni mark). *Add Xero Bronze + Zoho partner badges — see #8.*

---

## 🟠 Sharpens positioning — needed to lock copy

- [x] **4. Is "agencies" a hard niche?** Two of his three current testimonials are a **dentist** and a **landlord**, which contradicts the single-agency ICP. Keep them and soften the niche, or drop them for sharper focus?
  - **Answer:** ✅ **Hard niche — main focus is UK marketing agencies.** Implication: **drop the dentist (Hamish B) + landlord (Jaison M) testimonials** from the site and replace with agency ones (see "to collect" #7). Keep Joe G (digital agency).

- [x] **5. Canonical brand name.** Site shows the firm as **"SRJ International"**, the email is **simon@jacobs-taxes.com**, the project is "Simon Jacobs". Which is the real brand — and is there a logo file?
  - **Answer:** Public brand / website = **Jacobs Taxes** (trading name). **SRJ International Limited** = the legal company name. Treat as interchangeable but lead with *Jacobs Taxes* on-site. *(TODO: update `firm` in `content.ts` from "SRJ International"; `srj-logo` asset exists in repo.)*

- [~] **6. Reviews / rating.** Does he have a Google Business profile or Trustpilot we can surface? (Smooth shows "4.8 from 103 reviews"; the #1-ranked rivals have 100–130 Google reviews.)
  - **Answer:** ⏳ "We'll see" → **moved to To-collect (confirm later).** This is the #1 competitor gap; start a Google Business Profile + harvest reviews when ready.

---

## 🟡 Strengthens proof — nice to have for launch

- [~] **7. Agency testimonials.** Can he get 1–2 lines from actual *agency* founders (first name + "digital agency" is enough)?
  - **Answer:** ⏳ **Will collect → moved to To-collect (confirm later).** Needed to replace the dropped dentist/landlord quotes (see #4).

- [x] **8. Xero / QuickBooks partner status** (and tier)?
  - **Answer:** ✅ **Xero Bronze Partner** + **Zoho Partner**. *(TODO: source both badge logos, add to accreditation/partner strip.)*

- [ ] **9. One quantified outcome.** A real "saved £X by…" / "structured Y" line — rivals are all weak here, so this would out-prove them.
  - **Answer:** ⏳ Still thinking — didn't keep "before" figures. Open; revisit. (Joe G testimonial's "save thousands… kept Personal Allowance" is the nearest thing we have.)

- [x] **10. Awards / memberships** worth displaying, if any?
  - **Answer:** ✅ **ACA (ICAEW)** + **CIOT** memberships. Already displayed via the Accreditations strip. No awards mentioned.

---

## 🟢 Confirm only

- [ ] **11. Colours & type.** Does he like the blue / teal / seafoam palette and the italic Playfair emphasis?
  - **Answer:**

- [ ] **12. Tone.** Is the plain-English, slightly cheeky line ("Stop using Claude for taxes") on-brand for him?
  - **Answer:**

- [ ] **13. Photos.** Prague photos / headshot — do we have usage rights, and which to feature?
  - **Answer:**

---

## ⏳ To collect / confirm later (not blockers)

Tracked here so they don't get lost. None block starting the build.

- [ ] **Google reviews / rating** (#6) — set up Google Business Profile, harvest reviews. *The single biggest competitor gap.* "We'll see."
- [ ] **Agency testimonials** (#7) — 1–2 real quotes from marketing-agency founders, to replace the dropped dentist + landlord quotes.
- [ ] **Quantified outcome** (#9) — a "saved £X / structured Y" line. No before-data kept; revisit.
- [ ] **Xero Bronze + Zoho badge images** (#8) — source the partner-logo files.
- [ ] **Exact lead inbox + newsletter destination** (#2) — confirm address; decide if newsletter just emails him or uses a tool.
- [ ] **Confirm-later items** (#11 colours/type, #12 tone, #13 photos) — review once site updates land.

---

### Settled — don't re-ask
- No price list on the site (his call). Confirmed correct: **none** of the 5 rivals publish full prices. His reference numbers: £100/hr calls; books £150–£400/mo; tax returns on top.
- Sharp single ICP (agencies) — pending the §4 decision above.
