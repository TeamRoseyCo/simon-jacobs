# Simon Jacobs site: later improvements & things to ask

A running list of work to come back to and decisions that need Simon or Allan.
Not blockers for launch. The site is shippable as-is.

## Questions for Simon (brand sheet feedback)
- [ ] Colour scheme: does the blue + teal + seafoam palette feel like him? (Allan's note.)
- [ ] Fonts: he and Allan split on the reference sites. He likes Foxsmith
      (warm, classic), Allan likes Smooth Accounting (modern). The new italic
      Playfair Display teal emphasis is our answer. Does he like it?
- [ ] Tone of voice: is the plain-English, slightly cheeky tone right
      ("Stop using Claude for taxes")?
- [ ] Send him the brand sheet:
      https://claude.ai/code/artifact/74fd7adc-48e7-407e-8785-ad3554f91f8e
      (flip it to "anyone with the link" first).

## Trust / conversion (biggest gaps vs competitors)
- [ ] **Accreditation badges.** Foxsmith and Smooth both show logos
      (ICAEW/CIOT/ACCA/STEP, Xero Gold). We only have the words "CTA · CA · Ex-PwC".
      Get the CIOT (CTA), ICAEW/ICAS (CA), and PwC alumni marks and add a quiet
      badge strip near the hero or footer. Highest-value missing element.
- [ ] **Testimonials.** Smooth runs client quotes through the page; we have none.
      Ask Simon for one or two real client lines (first name only is fine) and
      wire a testimonial slot. This is the one that actually loses sales.
- [ ] **Xero / QuickBooks partner logo.** If Simon does the books on Xero or QBO,
      add the partner badge ("he runs the software you already use").

## Content / assets
- [ ] **Prague photos.** Allan wants to feature these once they arrive
      (hero, about, or who-this-for).
- [ ] Keep blog in sync with Simon's video posts (his "HMRC don't care what you
      call the expense" video matches our agency-expenses post).

## Engineering / wiring (forms are front-end only right now)
- [ ] **ConsultCta** (home + contact CTA): validates email but does not persist.
- [ ] **ContactForm**: validates but does not send anywhere.
- [ ] **NewsletterSignup** (footer): same.
      Pick a provider (Resend / Formspree / Mailchimp / an /api route) and wire
      all three so leads actually arrive in an inbox/CRM. Needed before real traffic.
- [ ] **GitHub + Vercel.** Site is live at https://simon-jacobs.vercel.app via
      direct CLI deploy, but not yet connected to a GitHub repo for auto-deploy.
      gh auth kept timing out. Finish: push master, connect repo to the Vercel
      project so pushes deploy automatically.

## Design polish (nice-to-have)
- [ ] **Develop the scroll animation more** (Simon/Allan want this).
      Current reveals are a simple slide-up via IntersectionObserver. Could add
      staggered children, parallax on the photos, or a sharper hero entrance.
- [ ] Revisit the italic-teal emphasis once we have live feedback; tune which
      words get emphasised so it reads as intentional, not decorative.

## Settled (don't redo)
- No price list on the site. Simon's call: publishing prices devalues the
  service and only generic firms do it. Qualify leads via the contact form,
  then quote. (His numbers, for reference: £100/hr calls; books £150–£400/mo;
  tax returns on top.)
- Sharp single ICP (agencies). Do not dilute into "influencers/landlords/etc".
