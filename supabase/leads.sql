-- Jacobs Taxes — leads table
-- Run this once in your Supabase project: SQL Editor → paste → Run.
-- The site writes here via the service-role key (server-side only), so Row
-- Level Security stays ON with no public policies: nothing can read/write it
-- from the browser.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  source      text not null,            -- 'subscribe' | 'contact' | 'scorecard'
  name        text,
  email       text,
  phone       text,
  website     text,
  message     text,                     -- contact question, or scorecard breakdown
  score       text                      -- scorecard total, e.g. "31/42 — Amber"
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;
-- No policies = only the service-role key (used by the server) can touch it.
