-- Wires product photos into the 4 Hospital Uniforms demo products seeded in 0005.
update public.products set images = array['/images/products/doctors-coat.jpg'] where name = 'Classic Doctor''s Coat';
update public.products set images = array['/images/products/nurse-scrub-set.jpg'] where name = 'Standard Nurse Scrub Set';
update public.products set images = array['/images/products/support-staff-uniform.jpg'] where name = 'Support Staff Uniform';
update public.products set images = array['/images/products/scrub-cap.jpg'] where name = 'Scrub Cap';
