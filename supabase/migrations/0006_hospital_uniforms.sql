-- Adds Hospital Uniforms as a sixth division — Owned Manufacturing, matching School/Corporate/
-- Industrial Workwear. Run in the Supabase SQL Editor (idempotent — safe to re-run).

alter table public.categories drop constraint if exists categories_division_check;
alter table public.categories add constraint categories_division_check check (division in (
  'Fashion Apparel', 'School Uniforms', 'Corporate Uniforms',
  'Industrial Workwear', 'Hospital Uniforms', 'Technical Fabrics'
));

insert into public.categories (division, subcategory)
select v.division, v.subcategory
from (values
  ('Hospital Uniforms', 'Doctor''s Coat'),
  ('Hospital Uniforms', 'Nurse Scrub Set'),
  ('Hospital Uniforms', 'Support Staff Uniform'),
  ('Hospital Uniforms', 'Scrub Cap')
) as v(division, subcategory)
where not exists (
  select 1 from public.categories c where c.division = v.division and c.subcategory = v.subcategory
);

notify pgrst, 'reload schema';
