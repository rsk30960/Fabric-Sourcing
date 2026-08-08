-- AI Consultant (v1 scope: Knowledge Search + Lead Qualification). Run in the Supabase SQL
-- Editor after 0001-0004, matching this project's manual-migration workflow.
--
-- Leads created by the AI Consultant chat widget need a new value in leads.source. The check
-- constraint from 0001_create_core_schema.sql was declared inline (no explicit name), so
-- Postgres auto-named it <table>_<column>_check — drop/re-add is the idempotent way to widen it.

alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check check (source in (
  'Contact Form', 'Specification Request', 'Consulting Enquiry',
  'Sourcing Enquiry', 'Catalogue Download', 'AI Consultant'
));

notify pgrst, 'reload schema';
