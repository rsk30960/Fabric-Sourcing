-- Part 2 of 3 — Products. Run 0001a first (products reference categories/suppliers by name).
-- Generic/placeholder catalogue entries — see 0001_seed_demo_content.sql header comment.
-- Technical Fabrics deliberately has no seed products (Volume 3 §3.1 — enquiry-only division).

insert into public.products (category_id, name, description, production_type, markets_served, supplier_id, fabric_composition, available_sizes, available_colors, moq, lead_time, is_published)
select
  (select id from public.categories where division = v.division and subcategory = v.subcategory limit 1),
  v.name, v.description, v.production_type, array['Domestic','Export'],
  (select id from public.suppliers where name = v.supplier_name limit 1),
  v.fabric, v.sizes, v.colors, v.moq, v.lead_time, true
from (values
  ('Fashion Apparel', 'Men''s', 'Classic Oxford Shirt', 'A wardrobe staple — breathable cotton oxford weave, tailored for everyday wear.', 'Partner-Sourced', 'Partner Facility 1', '100% Cotton', array['S','M','L','XL','XXL'], array['White','Blue','Black'], 500, '4-6 weeks'),
  ('Fashion Apparel', 'Men''s', 'Everyday Chino Trousers', 'Comfortable stretch chinos suitable for casual and smart-casual wear.', 'Partner-Sourced', 'Partner Facility 1', '98% Cotton / 2% Elastane', array['30','32','34','36','38'], array['Khaki','Navy','Black'], 500, '4-6 weeks'),
  ('Fashion Apparel', 'Women''s', 'Relaxed Fit Blouse', 'Lightweight, flowing silhouette in a soft viscose blend.', 'Partner-Sourced', 'Partner Facility 1', '70% Viscose / 30% Polyester', array['XS','S','M','L','XL'], array['Ivory','Blush','Charcoal'], 500, '4-6 weeks'),
  ('Fashion Apparel', 'Kids', 'Kids Graphic Tee', 'Soft cotton tee for everyday play, pre-shrunk for a consistent fit.', 'Partner-Sourced', 'Partner Facility 1', '100% Cotton', array['2-3Y','4-5Y','6-7Y','8-9Y'], array['White','Sky Blue','Yellow'], 500, '4-6 weeks'),

  ('School Uniforms', 'Shirt', 'Standard School Shirt', 'Durable, easy-care poly-cotton shirt built for daily school wear.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['22','24','26','28','30','32','34'], array['White','Sky Blue'], 100, '3-4 weeks'),
  ('School Uniforms', 'Pant/Trouser', 'School Trousers', 'Reinforced-seam trousers designed for everyday durability.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['22','24','26','28','30','32','34'], array['Navy','Grey'], 100, '3-4 weeks'),
  ('School Uniforms', 'Skirt', 'Pleated School Skirt', 'Classic pleated skirt, made to your school''s specification.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['22','24','26','28','30'], array['Navy','Grey'], 100, '3-4 weeks'),
  ('School Uniforms', 'Tie', 'School Tie', 'Standard clip-on or knotted tie, custom colors/stripes on request.', 'Owned Manufacturing', null, 'Polyester', array['One Size'], array['Custom'], 200, '2-3 weeks'),

  ('Corporate Uniforms', 'Shirt', 'Corporate Formal Shirt', 'Crisp, tailored shirt suitable for front-of-house and office roles.', 'Owned Manufacturing', null, '70% Cotton / 30% Poly', array['S','M','L','XL','XXL'], array['White','Light Blue'], 100, '3-4 weeks'),
  ('Corporate Uniforms', 'Pant/Trouser', 'Corporate Trousers', 'Structured trousers with a comfortable, all-day fit.', 'Owned Manufacturing', null, '70% Poly / 30% Viscose', array['30','32','34','36','38'], array['Black','Charcoal','Navy'], 100, '3-4 weeks'),
  ('Corporate Uniforms', 'Blazers', 'Corporate Blazer', 'Structured blazer, branding/embroidery available on request.', 'Owned Manufacturing', null, '80% Poly / 20% Viscose', array['S','M','L','XL','XXL'], array['Black','Navy'], 50, '4-5 weeks'),

  ('Industrial Workwear', 'Shirt', 'Industrial Work Shirt', 'Rugged work shirt built for long shifts on the floor.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['S','M','L','XL','XXL','3XL'], array['Navy','Grey'], 100, '3-4 weeks'),
  ('Industrial Workwear', 'Pant/Trouser', 'Industrial Work Trousers', 'Reinforced knees and pockets for on-site durability.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['30','32','34','36','38','40'], array['Navy','Grey'], 100, '3-4 weeks'),
  ('Industrial Workwear', 'Coverall', 'Standard Coverall', 'Full-body coverall for industrial and workshop environments.', 'Owned Manufacturing', null, '65% Poly / 35% Cotton', array['S','M','L','XL','XXL','3XL'], array['Navy','Orange'], 100, '4-5 weeks'),
  ('Industrial Workwear', 'Hi-Vis wear', 'Hi-Vis Safety Vest', 'High-visibility vest for on-site safety. Compliance certification details available on request.', 'Owned Manufacturing', null, '100% Polyester', array['S','M','L','XL','XXL'], array['Orange','Yellow'], 100, '2-3 weeks')
) as v(division, subcategory, name, description, production_type, supplier_name, fabric, sizes, colors, moq, lead_time)
where not exists (
  select 1 from public.products p where p.name = v.name
);
