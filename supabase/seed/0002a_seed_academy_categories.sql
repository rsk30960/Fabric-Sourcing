-- Part 1 of 2 — Academy categories (7 rows). Run before 0002b.

insert into public.academy_categories (slug, name, description, sort_order)
select v.slug, v.name, v.description, v.sort_order
from (values
  ('textile-basics', 'Textile Basics', 'Fibres, yarns, fabric construction, and finishing processes.', 1),
  ('apparel-manufacturing', 'Apparel Manufacturing', 'From pattern to inspection — how a garment actually gets made.', 2),
  ('workwear-academy', 'Workwear Academy', 'FR clothing, PPE, and the safety standards behind industrial workwear.', 3),
  ('school-uniform-academy', 'School Uniform Academy', 'Planning, fabric selection, sizing, and buying uniform programs.', 4),
  ('global-sourcing', 'Global Sourcing', 'Incoterms, quality control, vendor selection, export and import.', 5),
  ('textile-business', 'Textile Business', 'Costing, merchandising, buying houses, and factory setup.', 6),
  ('ai-academy', 'AI Academy', 'Where AI is actually being used across fashion, manufacturing, and sourcing.', 7)
) as v(slug, name, description, sort_order)
where not exists (select 1 from public.academy_categories c where c.slug = v.slug);
