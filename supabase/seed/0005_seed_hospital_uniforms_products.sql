-- Generic demo products for the new Hospital Uniforms division — same pattern as 0001b.
-- Run after 0006_hospital_uniforms.sql (categories must exist first).

insert into public.products (category_id, name, description, production_type, markets_served, supplier_id, fabric_composition, available_sizes, available_colors, moq, lead_time, is_published)
select
  (select id from public.categories where division = v.division and subcategory = v.subcategory limit 1),
  v.name, v.description, v.production_type, array['Domestic','Export'],
  null,
  v.fabric, v.sizes, v.colors, v.moq, v.lead_time, true
from (values
  ('Hospital Uniforms', 'Doctor''s Coat', 'Classic Doctor''s Coat', 'Knee-length lab coat in easy-care poly-cotton, built for daily clinical wear.', 'Owned Manufacturing', '65% Poly / 35% Cotton', array['S','M','L','XL','XXL'], array['White'], 100, '3-4 weeks'),
  ('Hospital Uniforms', 'Nurse Scrub Set', 'Standard Nurse Scrub Set', 'Two-piece scrub top and trouser set in breathable poly-cotton, designed for long shifts.', 'Owned Manufacturing', '65% Poly / 35% Cotton', array['XS','S','M','L','XL','XXL'], array['Sky Blue','Navy','Teal'], 100, '3-4 weeks'),
  ('Hospital Uniforms', 'Support Staff Uniform', 'Support Staff Uniform', 'Durable, easy-care uniform for housekeeping, technicians, and other support staff.', 'Owned Manufacturing', '65% Poly / 35% Cotton', array['S','M','L','XL','XXL'], array['Grey','Navy'], 100, '3-4 weeks'),
  ('Hospital Uniforms', 'Scrub Cap', 'Scrub Cap', 'Adjustable scrub cap in breathable cotton, custom colors on request.', 'Owned Manufacturing', '100% Cotton', array['One Size'], array['Custom'], 200, '2-3 weeks')
) as v(division, subcategory, name, description, production_type, fabric, sizes, colors, moq, lead_time)
where not exists (
  select 1 from public.products p where p.name = v.name
);

notify pgrst, 'reload schema';
