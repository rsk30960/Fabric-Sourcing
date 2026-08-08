-- CRM / lead pipeline upgrade — docs/platform-vision-v2.md, phase 1 of the CRM engine.
-- Scoped for solo operation (Volume 7 §7.2 reasoning, extended in platform-vision-v2.md):
-- adds Company, activity/notes timeline, and follow-up Tasks (Meeting folded in as a task
-- type) rather than building out the full CRM entity list (separate Opportunity/Meeting/Email
-- tables) for a team that doesn't exist yet. Idempotent — safe to select-all and re-run.

-- ============================================================================
-- Companies
-- ============================================================================

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  country text,
  website text,
  created_at timestamptz not null default now()
);

alter table public.companies enable row level security;

-- Internal CRM data only — no public form ever writes here directly.
drop policy if exists "Authenticated can manage companies" on public.companies;
create policy "Authenticated can manage companies" on public.companies
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.companies to authenticated;

-- ============================================================================
-- Leads: link to Company, record an estimated deal value
-- ============================================================================

alter table public.leads add column if not exists company_id uuid references public.companies(id);
alter table public.leads add column if not exists estimated_value numeric;
alter table public.leads add column if not exists estimated_value_currency text
  check (estimated_value_currency in ('INR', 'USD', 'EUR'));

-- ============================================================================
-- Lead Activities — notes/activity timeline per lead
-- ============================================================================

create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  type text not null default 'note' check (type in ('note', 'call', 'email', 'meeting', 'status_change')),
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.lead_activities enable row level security;

drop policy if exists "Authenticated can manage lead activities" on public.lead_activities;
create policy "Authenticated can manage lead activities" on public.lead_activities
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.lead_activities to authenticated;

-- Auto-log status changes so the activity timeline has a coherent history without relying on
-- the admin to manually note every change — same pattern as finrise-website's lead_audit_log.
create or replace function public.log_lead_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.status is distinct from old.status then
    insert into public.lead_activities (lead_id, type, content)
    values (new.id, 'status_change', old.status || ' → ' || new.status);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_log_lead_status_change on public.leads;
create trigger trg_log_lead_status_change
  after update on public.leads
  for each row execute function public.log_lead_status_change();

-- ============================================================================
-- Tasks — follow-ups (folds in "Meeting" as a task type with a due date/time)
-- ============================================================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  title text not null,
  due_date date,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

drop policy if exists "Authenticated can manage tasks" on public.tasks;
create policy "Authenticated can manage tasks" on public.tasks
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.tasks to authenticated;

notify pgrst, 'reload schema';
