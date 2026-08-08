-- Part 2 of 2 — Academy articles (38 rows). Run 0002a first — this looks up category_id by
-- category slug, so categories must already exist.

insert into public.academy_articles (category_id, slug, title, is_compliance_sensitive, sort_order)
select (select id from public.academy_categories where slug = v.category_slug), v.slug, v.title, v.sensitive, v.sort_order
from (values
  ('textile-basics', 'fibres', 'Fibres', false, 1),
  ('textile-basics', 'yarns', 'Yarns', false, 2),
  ('textile-basics', 'fabric', 'Fabric', false, 3),
  ('textile-basics', 'knitting', 'Knitting', false, 4),
  ('textile-basics', 'weaving', 'Weaving', false, 5),
  ('textile-basics', 'dyeing', 'Dyeing', false, 6),
  ('textile-basics', 'printing', 'Printing', false, 7),
  ('textile-basics', 'finishing', 'Finishing', false, 8),
  ('apparel-manufacturing', 'pattern', 'Pattern', false, 1),
  ('apparel-manufacturing', 'sampling', 'Sampling', false, 2),
  ('apparel-manufacturing', 'production', 'Production', false, 3),
  ('apparel-manufacturing', 'quality', 'Quality', false, 4),
  ('apparel-manufacturing', 'packing', 'Packing', false, 5),
  ('apparel-manufacturing', 'inspection', 'Inspection', false, 6),
  ('workwear-academy', 'fr-clothing', 'FR Clothing', true, 1),
  ('workwear-academy', 'ppe', 'PPE', true, 2),
  ('workwear-academy', 'en-standards', 'EN Standards', true, 3),
  ('workwear-academy', 'nfpa', 'NFPA', true, 4),
  ('workwear-academy', 'arc-flash', 'Arc Flash', true, 5),
  ('workwear-academy', 'reflective-clothing', 'Reflective Clothing', true, 6),
  ('school-uniform-academy', 'planning', 'Planning', false, 1),
  ('school-uniform-academy', 'fabric-selection', 'Fabric Selection', false, 2),
  ('school-uniform-academy', 'sizing', 'Sizing', false, 3),
  ('school-uniform-academy', 'maintenance', 'Maintenance', false, 4),
  ('school-uniform-academy', 'buying-guide', 'Buying Guide', false, 5),
  ('global-sourcing', 'incoterms', 'Incoterms', true, 1),
  ('global-sourcing', 'quality-control', 'Quality Control', false, 2),
  ('global-sourcing', 'vendor-selection', 'Vendor Selection', false, 3),
  ('global-sourcing', 'export', 'Export', false, 4),
  ('global-sourcing', 'import', 'Import', false, 5),
  ('textile-business', 'costing', 'Costing', false, 1),
  ('textile-business', 'merchandising', 'Merchandising', false, 2),
  ('textile-business', 'buying-house', 'Buying House', false, 3),
  ('textile-business', 'factory-setup', 'Factory Setup', false, 4),
  ('textile-business', 'marketing', 'Marketing', false, 5),
  ('ai-academy', 'ai-in-fashion', 'AI in Fashion', false, 1),
  ('ai-academy', 'ai-in-manufacturing', 'AI in Manufacturing', false, 2),
  ('ai-academy', 'ai-in-sourcing', 'AI in Sourcing', false, 3)
) as v(category_slug, slug, title, sensitive, sort_order)
where not exists (
  select 1 from public.academy_articles a
  join public.academy_categories c on c.id = a.category_id
  where c.slug = v.category_slug and a.slug = v.slug
);
