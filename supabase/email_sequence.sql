-- Email sequence queue + unsubscribe suppression list.
-- Run once in the Supabase project: SQL Editor -> paste -> Run.
-- Same RLS posture as leads.sql: no policies, service-role key only.

create table if not exists public.email_queue (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  lead_id     uuid references public.leads(id) on delete cascade,
  email       text not null,
  first_name  text not null default '',
  track       text not null,              -- 'call' | 'scorecard'
  step        int not null,               -- 2 | 3 (step 1 sends synchronously, never queued)
  vars        jsonb not null default '{}',-- extra template vars (e.g. resource_link)
  send_after  timestamptz not null,
  status      text not null default 'pending', -- 'pending' | 'sent' | 'skipped' | 'failed'
  sent_at     timestamptz
);

create index if not exists email_queue_due_idx
  on public.email_queue (send_after)
  where status = 'pending';

alter table public.email_queue enable row level security;

create table if not exists public.suppressed_emails (
  email       text primary key,
  created_at  timestamptz not null default now(),
  reason      text not null default 'unsubscribe'
);

alter table public.suppressed_emails enable row level security;
