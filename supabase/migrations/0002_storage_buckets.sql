-- Storage buckets for file uploads referenced in the core schema (0001).
-- Reference images and resumes are PRIVATE per Volume 7 §7.4 (may contain buyer proprietary
-- designs / candidate personal data) — accessed via signed URLs from the admin portal, never
-- public URLs. Product images and spec sheets are public since they're meant to be browsed.
--
-- Idempotent (bucket insert uses `on conflict do nothing`, every policy is preceded by
-- `drop policy if exists`) — safe to select-all and re-run in full.

insert into storage.buckets (id, name, public)
values
  ('reference-images', 'reference-images', false),
  ('resumes', 'resumes', false),
  ('product-images', 'product-images', true),
  ('spec-sheets', 'spec-sheets', true),
  ('factory-documents', 'factory-documents', false)
on conflict (id) do nothing;

-- Public forms (Specification Enquiry, Careers) upload directly from the browser with the anon
-- key — same reasoning as the anon INSERT policies in 0001. Uploads only, never read/list.
drop policy if exists "Public can upload reference images" on storage.objects;
create policy "Public can upload reference images" on storage.objects
  for insert to anon
  with check (bucket_id = 'reference-images');

drop policy if exists "Public can upload resumes" on storage.objects;
create policy "Public can upload resumes" on storage.objects
  for insert to anon
  with check (bucket_id = 'resumes');

-- Product images / spec sheets: publicly readable, admin-managed.
drop policy if exists "Product images are publicly readable" on storage.objects;
create policy "Product images are publicly readable" on storage.objects
  for select to anon
  using (bucket_id = 'product-images');

drop policy if exists "Spec sheets are publicly readable" on storage.objects;
create policy "Spec sheets are publicly readable" on storage.objects
  for select to anon
  using (bucket_id = 'spec-sheets');

-- Authenticated (the admin) can do everything in every bucket, including reading the private
-- reference-images/resumes/factory-documents buckets.
drop policy if exists "Authenticated can manage all storage objects" on storage.objects;
create policy "Authenticated can manage all storage objects" on storage.objects
  for all to authenticated
  using (true) with check (true);
