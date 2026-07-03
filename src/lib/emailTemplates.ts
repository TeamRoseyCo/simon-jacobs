import { bookHref, site } from "@/lib/content";

// Send-ready copy from docs/email-copy.md, kept in lockstep with that file.
// If the docs change, update here too (and vice versa).

export type TemplateVars = {
  firstName: string;
  resourceLink?: string;
  unsubLink: string;
};

type Template = { subject: string; text: string };

const SIGNOFF_CALL = `
Simon Jacobs · Jacobs Taxes (a trading name of SRJ International Limited)
${site.physicalAddress} · Unsubscribe anytime: {{unsub}}`;

function render(text: string, vars: TemplateVars): string {
  return text
    .replaceAll("{{first_name}}", vars.firstName || "there")
    .replaceAll("{{BOOKING_LINK}}", bookHref)
    .replaceAll("{{RESOURCE_LINK}}", vars.resourceLink ?? "")
    .replaceAll("{{INSTAGRAM_LINK}}", site.instagram)
    .replaceAll("{{unsub}}", vars.unsubLink);
}

export function callEmail1(vars: TemplateVars): Template {
  return {
    subject: "Here's your link to get booked in",
    text: render(
      `Hey {{first_name}},

Thanks for reaching out. I've got your message in front of me, so as promised, here's your link to grab a time that suits you:
→ {{BOOKING_LINK}}

Pick a slot and bring all your questions. I'm already preparing what you gave me, so there's no prep needed on your end.

Between now and then, you'll get the occasional email from me on the things most agency owners find out too late: cutting the tax bill, paying yourself properly, and building an agency worth selling.

All things you won't want to miss. So to make sure they don't get crammed into your promotions tab, do me a quick favour,
First:
Reply to this email with anything. Anything at all, even just a 'hi' or confirmation.

Second:
Add me as a contact. On Gmail desktop, hover over my name for a second and click "Add to Contacts" on the little popup. On mobile, hit the three dots and press "mark as important".

Third:
If one of my emails ever lands in your promotions tab, drag it over to primary. Do that a couple of times and Gmail will start putting me where you'll actually see me.

That's all for now.

Talk soon,
Simon
${SIGNOFF_CALL}`,
      vars,
    ),
  };
}

export function callEmail2(vars: TemplateVars): Template {
  return {
    subject: `Hey ${vars.firstName || "there"}, still want that call?`,
    text: render(
      `Hey {{first_name}}!

Your question came through the other day, but it doesn't look like you've grabbed a time yet.

Everything okay?

If you still want it, here's your link again:
→ {{BOOKING_LINK}}

Or just hit reply and ask me right here. I read every one.

Talk soon,
Simon`,
      vars,
    ),
  };
}

export function scorecardEmail1(vars: TemplateVars): Template {
  return {
    subject: "Your Profit-Rich Scorecard is on its way",
    text: render(
      `Hey {{first_name}},

Nice work finishing the Profit-Rich Scorecard. You've just done something most agency owners don't: looking at where money leaks.

Here's what happens next. I personally score your answers across all 7 areas and send back your full result, plus a 90-day plan with the specific moves to plug the leaks, in order. It lands in your inbox within 2 working days.

But here's the catch: it's no use if it never reaches you. So to make sure your scorecard (and everything after it) doesn't get buried in your promotions tab, do me a quick favour.

First:
Hit reply to this email. Literally anything, even one word. It's the single best way to signal to Gmail not to bury my emails.

Second:
Add me as a contact. On Gmail desktop, hover over my name for a second and click "Add to Contacts". On mobile, hit the three dots and press "mark as important".

Third:
If one of my emails ever slips into your promotions tab, drag it to primary. Do that once or twice and Gmail will start sending me straight through.

While I put yours together, here's something worth a read in the meantime:
→ {{RESOURCE_LINK}}

After that, you'll get the occasional email from me on tax, profit extraction, and building an agency worth selling.

Speak soon. Your scorecard's on its way.

Simon
${SIGNOFF_CALL}`,
      vars,
    ),
  };
}

export function scorecardEmail2(vars: TemplateVars): Template {
  return {
    subject: `Hey ${vars.firstName || "there"}, how did it land?`,
    text: render(
      `Hey {{first_name}}!

I sent over your Profit-Rich Scorecard and 90-day plan a couple of days back.

How did it land?

Hit reply and let me know, even a line. Did anything in there catch you off guard?

More useful bits on the way soon.

Catch you soon,
Simon`,
      vars,
    ),
  };
}

export function instagramEmail3(vars: TemplateVars): Template {
  return {
    subject: "Here's where I post the free stuff (daily)",
    text: render(
      `Hey {{first_name}}.

Whether we've spoken yet or not, I'd rather you didn't wait around for my next email to get something useful.

So here's where the day-to-day stuff lives: my Instagram. I post almost every day for agency owners, on cutting the tax bill, paying yourself properly, and building something actually worth selling. Short, plain, no jargon.

It's the sort of thing most accountants keep behind a closed door (or a bill). I just put it out.

To get it, all you have to do:

1. Follow me here: {{INSTAGRAM_LINK}}
2. Turn on post notifications so you don't miss the good ones.
3. Nick whatever works for your agency.

That's all for now.

Talk soon,
Simon

P.S. It's where I test new ideas first and break down real (anonymised) agency numbers. Got a question about yours? Drop it in the comments and I'll likely turn it into a post.`,
      vars,
    ),
  };
}
