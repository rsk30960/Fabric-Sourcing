-- Attaches product photography to the generic demo products seeded in 0001b. Matches by
-- product name (which is unique in the 0001b seed data) — safe to re-run.
-- Run in the Supabase SQL Editor (products UPDATE is authenticated-only, so the app's anon
-- key can't do this — matches the manual-migration workflow used throughout this project).

update public.products set images = array['/images/products/01-school-tie.jpg'] where name = 'School Tie';
update public.products set images = array['/images/products/02-pleated-school-skirt.jpg'] where name = 'Pleated School Skirt';
update public.products set images = array['/images/products/03-school-trousers.jpg'] where name = 'School Trousers';
update public.products set images = array['/images/products/04-standard-school-shirt.jpg'] where name = 'Standard School Shirt';
update public.products set images = array['/images/products/05-corporate-blazer.jpg'] where name = 'Corporate Blazer';
update public.products set images = array['/images/products/06-corporate-formal-shirt.jpg'] where name = 'Corporate Formal Shirt';
update public.products set images = array['/images/products/07-corporate-trousers.jpg'] where name = 'Corporate Trousers';
update public.products set images = array['/images/products/08-standard-coverall.jpg'] where name = 'Standard Coverall';
update public.products set images = array['/images/products/09-industrial-work-trousers.jpg'] where name = 'Industrial Work Trousers';
update public.products set images = array['/images/products/10-industrial-work-shirt.jpg'] where name = 'Industrial Work Shirt';
update public.products set images = array['/images/products/11-hi-vis-safety-vest.jpg'] where name = 'Hi-Vis Safety Vest';
