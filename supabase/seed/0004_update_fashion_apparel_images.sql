-- Attaches product photography to the 4 Fashion Apparel demo products seeded in 0001b.
-- Matches by product name (unique in the 0001b seed data) — safe to re-run.
-- Run in the Supabase SQL Editor (products UPDATE is authenticated-only, so the app's anon
-- key can't do this — matches the manual-migration workflow used throughout this project).

update public.products set images = array['/images/products/24-classic-oxford-shirt.jpg'] where name = 'Classic Oxford Shirt';
update public.products set images = array['/images/products/25-everyday-chino-trousers.jpg'] where name = 'Everyday Chino Trousers';
update public.products set images = array['/images/products/26-relaxed-fit-blouse.jpg'] where name = 'Relaxed Fit Blouse';
update public.products set images = array['/images/products/27-kids-graphic-tee.jpg'] where name = 'Kids Graphic Tee';
