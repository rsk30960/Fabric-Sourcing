-- Part 1 of 3 — Categories + Suppliers. See 0001_seed_demo_content.sql header comment for
-- context on why this is generic/placeholder data.

insert into public.categories (division, subcategory)
select v.division, v.subcategory
from (values
  ('Fashion Apparel', 'Men''s'), ('Fashion Apparel', 'Women''s'), ('Fashion Apparel', 'Kids'),
  ('School Uniforms', 'Shirt'), ('School Uniforms', 'Pant/Trouser'), ('School Uniforms', 'Skirt'), ('School Uniforms', 'Tie'),
  ('Corporate Uniforms', 'Shirt'), ('Corporate Uniforms', 'Pant/Trouser'), ('Corporate Uniforms', 'Blazers'),
  ('Industrial Workwear', 'Shirt'), ('Industrial Workwear', 'Pant/Trouser'), ('Industrial Workwear', 'Coverall'), ('Industrial Workwear', 'Hi-Vis wear')
) as v(division, subcategory)
where not exists (
  select 1 from public.categories c where c.division = v.division and c.subcategory = v.subcategory
);

insert into public.suppliers (name, region, capacity_summary)
select v.name, v.region, v.capacity_summary
from (values
  ('Partner Facility 1', 'North India', 'Mid-volume apparel production'),
  ('Partner Facility 2', 'Southeast Asia', 'Technical/performance fabric production')
) as v(name, region, capacity_summary)
where not exists (select 1 from public.suppliers s where s.name = v.name);
