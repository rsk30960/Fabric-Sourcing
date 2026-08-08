-- Textile Academy — docs/platform-vision-v2.md. Structure-only phase: schema + navigable
-- category/topic structure, all articles seeded as 'coming_soon'. Real content (especially
-- Workwear Academy's compliance/safety-standard topics — FR Clothing, PPE, EN Standards, NFPA,
-- Arc Flash — and Incoterms under Global Sourcing) needs expert review before publishing, same
-- principle already applied to the Legal pages (Volume 2 §2.13) and Workwear certifications
-- (Volume 3 §3.1). Idempotent — safe to select-all and re-run.

create table if not exists public.academy_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.academy_categories enable row level security;
drop policy if exists "Academy categories are publicly readable" on public.academy_categories;
create policy "Academy categories are publicly readable" on public.academy_categories
  for select to anon, authenticated using (true);
grant select on public.academy_categories to anon, authenticated;
drop policy if exists "Authenticated can manage academy categories" on public.academy_categories;
create policy "Authenticated can manage academy categories" on public.academy_categories
  for all to authenticated using (true) with check (true);
grant insert, update, delete on public.academy_categories to authenticated;

create table if not exists public.academy_articles (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.academy_categories(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  body text,
  is_compliance_sensitive boolean not null default false,
  status text not null default 'coming_soon' check (status in ('coming_soon', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (category_id, slug)
);

alter table public.academy_articles enable row level security;
-- Structure (including "coming soon" stubs) is publicly browsable on purpose — visitors should
-- see the full academy map even before every topic has real content, same as the site's other
-- "coming soon" patterns (AI & Digital Solutions, Volume 4 §4.6).
drop policy if exists "Academy articles are publicly readable" on public.academy_articles;
create policy "Academy articles are publicly readable" on public.academy_articles
  for select to anon, authenticated using (true);
grant select on public.academy_articles to anon, authenticated;
drop policy if exists "Authenticated can manage academy articles" on public.academy_articles;
create policy "Authenticated can manage academy articles" on public.academy_articles
  for all to authenticated using (true) with check (true);
grant insert, update, delete on public.academy_articles to authenticated;

notify pgrst, 'reload schema';
