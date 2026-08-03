-- Part 3 of 3 — Blog posts. Generic industry-education content, not claims about this
-- company's specific history/clients — see 0001_seed_demo_content.sql header comment.

insert into public.blogs (title, slug, body, author, category, is_published, publish_date, meta_description)
select v.title, v.slug, v.body, 'Founder', v.category, true, now(), v.meta_description
from (values
  (
    'How to Choose the Right Fabric for Your Next Uniform Order',
    'choosing-the-right-fabric-for-uniforms',
    'Choosing fabric for a uniform program comes down to balancing durability, comfort, and care requirements against budget. Poly-cotton blends remain a popular default for school and corporate uniforms because they resist wrinkling and hold up to frequent washing, while 100% cotton options offer more breathability at the cost of easier creasing. For industrial workwear, factors like abrasion resistance and any required safety compliance take priority over softness. When it comes to sizing runs, it also pays to plan for growth (school uniforms) or a wide range of body types (corporate/industrial) rather than a narrow standard block. If you are not sure where to start, describing your use case and expected wash frequency is usually enough for a sourcing partner to recommend two or three suitable fabric options.',
    'Buyer Guides',
    'A quick primer on fabric selection for school, corporate, and industrial uniform programs.'
  ),
  (
    'Owned Manufacturing vs. Partner Sourcing: What Buyers Should Know',
    'owned-manufacturing-vs-partner-sourcing',
    'Not every supplier produces everything they sell, and that is not necessarily a red flag — it depends on how the relationship is structured. Owned manufacturing gives a buyer direct visibility into production timelines and quality control, since the same company handling your enquiry is also running the factory floor. Partner-sourced production instead relies on a vetted network of allied factories, which can offer more flexibility across a wider range of product categories than any single facility could produce alone. The important question for a buyer is not which model is better in the abstract, but whether the supplier is transparent about which model applies to your specific order, and whether they can show you real evidence (factory credentials, samples, references) to back up their claims either way.',
    'Sourcing',
    'Understanding the difference between owned manufacturing and partner-factory sourcing when evaluating a supplier.'
  ),
  (
    'Understanding GSM: A Quick Guide for Apparel Buyers',
    'understanding-gsm-a-quick-guide',
    'GSM (grams per square meter) measures fabric weight, and it is one of the fastest ways to compare fabric options at a glance. Lighter fabrics (under about 150 GSM) suit warm-climate everyday wear like summer shirts, while heavier fabrics (above 300 GSM) are more common in outerwear, heavy-duty workwear, and cold-weather uniforms. GSM alone does not tell the whole story, though — fiber content and weave structure both affect how a fabric actually performs, so two fabrics with the same GSM can feel and wear very differently. When requesting a quote, it is worth specifying your intended use case (climate, wash frequency, expected wear) rather than a GSM number alone, so your sourcing partner can recommend a fabric that actually fits the job.',
    'Fabrics',
    'A short explainer on fabric weight (GSM) and what it actually means for buyers.'
  )
) as v(title, slug, body, category, meta_description)
where not exists (
  select 1 from public.blogs b where b.slug = v.slug
);
