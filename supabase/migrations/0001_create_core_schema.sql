-- Core schema per docs/volume-6-database-design.md. Run in the Supabase SQL Editor
-- (or `supabase db push` once the project is linked) — no migration tooling wired up yet,
-- matching finrise-website's manual-migration workflow.
--
-- Idempotent: every `create table` uses `if not exists` and every `create policy` is preceded
-- by `drop policy if exists`, so this whole script is safe to select-all and re-run from the
-- top even if a previous run stopped partway through (e.g. after `products` but before
-- `customers`) — nothing errors on objects that already exist.
--
-- Auth model: single founder admin account (Supabase Auth, email/password — Volume 7 §7.1).
-- RBAC is deliberately NOT built out here (Volume 7 §7.2 — "don't over-invest yet," solo
-- operation). Every admin-only table simply grants full access to the `authenticated` role;
-- add real per-role policies only once a second admin user actually exists.
--
-- Soft-delete: Volume 6 §6.2 resolved soft-delete-by-default + hard-delete-on-request. Tables
-- that carry personal data (customers, leads, specification_requests, candidates) get a
-- `deleted_at` column; the app filters `where deleted_at is null` for normal use, and a real
-- `delete` statement is issued only when someone exercises a data-erasure right (Volume 7 §7.5).

-- ============================================================================
-- Categories (Volume 3 §3.1 / Volume 6 — flat, two-level: division -> subcategory)
-- ============================================================================

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  division text not null
    check (division in (
      'Fashion Apparel', 'School Uniforms', 'Corporate Uniforms',
      'Industrial Workwear', 'Technical Fabrics'
    )),
  subcategory text not null, -- e.g. "Shirt", "Coverall" — Volume 3 §3.1 confirmed garment types
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable" on public.categories
  for select to anon, authenticated using (true);
grant select on public.categories to anon, authenticated;

drop policy if exists "Authenticated can manage categories" on public.categories;
create policy "Authenticated can manage categories" on public.categories
  for all to authenticated using (true) with check (true);
grant insert, update, delete on public.categories to authenticated;

-- ============================================================================
-- Suppliers / Factory-Partner records (Volume 3 §3.1/§3.4, Volume 6)
-- Public-facing vs internal-only field split noted in Volume 6 — kept admin-only here since
-- content itself is deferred (Volume 3 §3.4); add a public-facing view once real data exists.
-- ============================================================================

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text,
  certifications text[],
  capacity_summary text,
  photos text[], -- Storage paths
  audit_report_url text, -- Storage path, private bucket
  -- internal-only fields:
  contact_info text,
  commercial_terms text,
  internal_notes text,
  created_at timestamptz not null default now()
);

alter table public.suppliers enable row level security;
drop policy if exists "Authenticated can manage suppliers" on public.suppliers;
create policy "Authenticated can manage suppliers" on public.suppliers
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.suppliers to authenticated;

-- ============================================================================
-- Products (Volume 3 §3.1)
-- ============================================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id),
  name text not null,
  sku text,
  description text,
  production_type text not null check (production_type in ('Owned Manufacturing', 'Partner-Sourced')),
  markets_served text[] not null default array['Domestic', 'Export'], -- Volume 1 §1.3 — all divisions serve both
  supplier_id uuid references public.suppliers(id), -- required in practice when production_type = 'Partner-Sourced'
  fabric_composition text,
  gsm numeric,
  available_sizes text[],
  available_colors text[],
  moq integer,
  lead_time text,
  certifications text[],
  images text[], -- Storage paths
  spec_sheet_url text, -- Storage path
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "Published products are publicly readable" on public.products;
create policy "Published products are publicly readable" on public.products
  for select to anon using (is_published = true);
grant select on public.products to anon;

drop policy if exists "Authenticated can read all products" on public.products;
create policy "Authenticated can read all products" on public.products
  for select to authenticated using (true);
drop policy if exists "Authenticated can manage products" on public.products;
create policy "Authenticated can manage products" on public.products
  for insert to authenticated with check (true);
drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products" on public.products
  for update to authenticated using (true) with check (true);
drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products" on public.products
  for delete to authenticated using (true);
grant select, insert, update, delete on public.products to authenticated;

-- ============================================================================
-- Customers (Volume 6 — converted/known-contact registry, not a login account)
-- ============================================================================

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  mobile text,
  country text,
  market text check (market in ('Domestic', 'Export')),
  business_type text,
  persona_type text,
  notes text,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.customers enable row level security;
drop policy if exists "Authenticated can manage customers" on public.customers;
create policy "Authenticated can manage customers" on public.customers
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.customers to authenticated;

-- ============================================================================
-- Leads (Volume 5 §5.3, Volume 6)
-- ============================================================================

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in (
    'Contact Form', 'Specification Request', 'Consulting Enquiry',
    'Sourcing Enquiry', 'Catalogue Download'
  )),
  status text not null default 'New'
    check (status in ('New', 'Awaiting Clarification', 'Quoted', 'Won', 'Lost')),
  market text check (market in ('Domestic', 'Export')),
  -- Raw contact details captured at submission time — anon can't write to `customers` (admin-only,
  -- see policy above), so a standalone Contact-form Lead has nowhere else to hold this until the
  -- founder manually links/promotes it to a Customer record via customer_id.
  contact_name text,
  contact_company text,
  contact_email text,
  contact_mobile text,
  contact_country text,
  business_type text,
  requirement text,
  message text,
  attachment_path text, -- Storage path (reference-images bucket)
  customer_id uuid references public.customers(id),
  product_id uuid references public.products(id),
  division text,
  notes text,
  duplicate_of uuid references public.leads(id),
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Public enquiry forms (Contact form, Consulting/Sourcing enquiry) submit anonymously and only
-- ever need to INSERT. No SELECT/UPDATE/DELETE granted to anon — same reasoning as
-- finrise-website's leads table: the anon key ships in the public JS bundle.
drop policy if exists "Public forms can insert leads" on public.leads;
create policy "Public forms can insert leads" on public.leads
  for insert to anon with check (true);
grant insert on public.leads to anon;

drop policy if exists "Authenticated can manage leads" on public.leads;
create policy "Authenticated can manage leads" on public.leads
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.leads to authenticated;

-- ============================================================================
-- Specification Requests (Volume 3 §3.3, Volume 6 — header + line items)
-- ============================================================================

create table if not exists public.specification_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  customer_id uuid references public.customers(id),
  name text not null,
  company text,
  email text not null,
  mobile text not null,
  country text,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.specification_requests enable row level security;

drop policy if exists "Public forms can insert specification requests" on public.specification_requests;
create policy "Public forms can insert specification requests" on public.specification_requests
  for insert to anon with check (true);
grant insert on public.specification_requests to anon;

drop policy if exists "Authenticated can manage specification requests" on public.specification_requests;
create policy "Authenticated can manage specification requests" on public.specification_requests
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.specification_requests to authenticated;

create table if not exists public.specification_request_line_items (
  id uuid primary key default gen_random_uuid(),
  specification_request_id uuid not null references public.specification_requests(id) on delete cascade,
  product_id uuid references public.products(id),
  fabric text not null,
  trims text,
  artwork text,
  measurements text not null, -- free text for v1, Volume 3 §3.3
  styling text,
  reference_images text[], -- Storage paths, private bucket
  quantity integer not null,
  created_at timestamptz not null default now()
);

alter table public.specification_request_line_items enable row level security;

drop policy if exists "Public forms can insert spec request line items" on public.specification_request_line_items;
create policy "Public forms can insert spec request line items" on public.specification_request_line_items
  for insert to anon with check (true);
grant insert on public.specification_request_line_items to anon;

drop policy if exists "Authenticated can manage spec request line items" on public.specification_request_line_items;
create policy "Authenticated can manage spec request line items" on public.specification_request_line_items
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.specification_request_line_items to authenticated;

-- ============================================================================
-- Quotations (Volume 5 §5.7, Volume 6 — currency: INR / USD / EUR, resolved)
-- ============================================================================

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id),
  customer_id uuid references public.customers(id),
  specification_request_id uuid references public.specification_requests(id),
  currency text not null check (currency in ('INR', 'USD', 'EUR')),
  status text not null default 'Draft'
    check (status in ('Draft', 'Sent', 'Accepted', 'Rejected', 'Expired')),
  valid_until date,
  total numeric,
  created_at timestamptz not null default now()
);

alter table public.quotations enable row level security;
drop policy if exists "Authenticated can manage quotations" on public.quotations;
create policy "Authenticated can manage quotations" on public.quotations
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.quotations to authenticated;

create table if not exists public.quotation_line_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references public.quotations(id) on delete cascade,
  product_id uuid references public.products(id),
  description text,
  unit_price numeric not null,
  quantity integer not null,
  subtotal numeric not null,
  created_at timestamptz not null default now()
);

alter table public.quotation_line_items enable row level security;
drop policy if exists "Authenticated can manage quotation line items" on public.quotation_line_items;
create policy "Authenticated can manage quotation line items" on public.quotation_line_items
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.quotation_line_items to authenticated;

-- ============================================================================
-- Blogs (Volume 2 §2.11, Volume 6)
-- ============================================================================

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  body text not null,
  author text not null default 'Founder',
  category text,
  tags text[],
  meta_title text,
  meta_description text,
  featured_image text, -- Storage path
  is_published boolean not null default false,
  publish_date timestamptz,
  created_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

drop policy if exists "Published blogs are publicly readable" on public.blogs;
create policy "Published blogs are publicly readable" on public.blogs
  for select to anon using (is_published = true);
grant select on public.blogs to anon;

drop policy if exists "Authenticated can manage blogs" on public.blogs;
create policy "Authenticated can manage blogs" on public.blogs
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.blogs to authenticated;

-- ============================================================================
-- Downloads (Volume 3 §3.1, Volume 6 — gated behind lead form)
-- ============================================================================

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  file_url text not null, -- Storage path
  associated_entity text, -- e.g. "Product Spec Sheet", "Catalogue PDF", "Case Study"
  gated boolean not null default true, -- Volume 3 §3.1 — catalogue/spec-sheet downloads default gated
  created_at timestamptz not null default now()
);

alter table public.downloads enable row level security;
drop policy if exists "Downloads metadata is publicly readable" on public.downloads;
create policy "Downloads metadata is publicly readable" on public.downloads
  for select to anon using (true);
grant select on public.downloads to anon;

drop policy if exists "Authenticated can manage downloads" on public.downloads;
create policy "Authenticated can manage downloads" on public.downloads
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.downloads to authenticated;

-- ============================================================================
-- Candidates (Careers — Volume 2 §2.12, Volume 6. Deliberately NOT a Lead.)
-- ============================================================================

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  mobile text,
  area_of_expertise text,
  portfolio_url text, -- Storage path, private bucket
  availability text,
  rate_expectation text,
  message text,
  status text not null default 'New'
    check (status in ('New', 'Reviewed', 'Engaged', 'Rejected')),
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.candidates enable row level security;

drop policy if exists "Public can insert candidate applications" on public.candidates;
create policy "Public can insert candidate applications" on public.candidates
  for insert to anon with check (true);
grant insert on public.candidates to anon;

drop policy if exists "Authenticated can manage candidates" on public.candidates;
create policy "Authenticated can manage candidates" on public.candidates
  for all to authenticated using (true) with check (true);
grant select, insert, update, delete on public.candidates to authenticated;

-- Force PostgREST to pick up the new tables immediately, rather than waiting for its next
-- automatic schema-cache refresh — otherwise the API can 404 on brand-new tables for a bit.
notify pgrst, 'reload schema';
