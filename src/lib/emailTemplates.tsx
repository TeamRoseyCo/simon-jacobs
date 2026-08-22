import * as React from "react";
import { render } from "@react-email/render";
import { bookHref, site } from "@/lib/content";
import {
  CallEmail1,
  CallEmail2,
  ScorecardEmail1,
  ScorecardEmail2,
  InstagramEmail3,
  type EmailProps,
} from "@/emails/templates";

// Send-ready lead emails, authored as branded react-email components (see
// src/emails/) and rendered to HTML + plaintext here. Copy lives in the
// components and is mirrored in docs/email-copy.md. Each function is async
// because react-email's render() is async.
export type TemplateVars = {
  firstName: string;
  resourceLink?: string;
  unsubLink: string;
};

export type Template = { subject: string; text: string; html: string };

function propsFrom(vars: TemplateVars): EmailProps {
  return {
    firstName: vars.firstName,
    bookingLink: bookHref,
    instagramLink: site.instagram,
    resourceLink: vars.resourceLink,
    unsubLink: vars.unsubLink,
  };
}

async function build(subject: string, element: React.ReactElement): Promise<Template> {
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);
  return { subject, text, html };
}

export function callEmail1(vars: TemplateVars): Promise<Template> {
  return build("Here's your link to get booked in", <CallEmail1 {...propsFrom(vars)} />);
}

export function callEmail2(vars: TemplateVars): Promise<Template> {
  return build("The 60% tax trap most business owners miss", <CallEmail2 {...propsFrom(vars)} />);
}

export function scorecardEmail1(vars: TemplateVars): Promise<Template> {
  return build("Your Profit-Rich Scorecard is on its way", <ScorecardEmail1 {...propsFrom(vars)} />);
}

export function scorecardEmail2(vars: TemplateVars): Promise<Template> {
  return build("How did your scorecard land?", <ScorecardEmail2 {...propsFrom(vars)} />);
}

export function instagramEmail3(vars: TemplateVars): Promise<Template> {
  return build("Where I post the free stuff (most days)", <InstagramEmail3 {...propsFrom(vars)} />);
}
