# SRS Master Index — Project IronShield

> Status: **Substantially complete.** Volumes 1–8 and 10 all have real, decision-backed content — not
> placeholder skeletons. Volume 9 (UI/UX) remains genuinely blocked on visual identity/brand design.
> Tech stack is now decided — see [tech-stack.md](tech-stack.md). Check each volume's own status line
> for what's resolved vs. still open within it.

## How to use this document set

- Each volume is independent but cross-references others (e.g., Volume 3's product schema feeds Volume 6's
  database design; Volume 2's form specs feed Volume 5's lead management).
- `[TBD]` marks a value or decision that needs the business owner's input.
- `[OPEN QUESTION]` marks something that needs a decision before development can start on that area.
- Nothing here should be treated as committed scope until Volume 1 (Business Requirements) is signed off —
  everything downstream depends on it.

## Recommended fill-in order

1. **Volume 1** — Business Vision, Objectives, Personas. Everything else derives from this.
2. **Volume 3 & 4** — Product Catalogue + Service Modules, since these define what the business actually sells
   and directly shape the site's information architecture.
3. **Volume 2** — Page-by-page functional spec, once the catalogue/services are known.
4. **Volume 6** — Database design, once Volumes 2–4 define what data needs to be stored.
5. **Volume 5** — Admin Portal, once the data model and lead workflows exist.
6. **Volumes 7–10** — Security, API/Integrations, UI/UX System, Testing — these can be drafted in parallel
   once the above are stable, but finalized last.

## Formerly-blocking decisions — now resolved

- ~~Target markets~~ — **Resolved:** domestic (India) + export from launch, specific markets confirmed
  (USA, EU, Middle East, Australia, New Zealand) — Volume 1 §1.6, Volume 7 §7.5.
- ~~E-commerce in scope?~~ — **Resolved:** no, lead-generation only for v1 — Volume 1 §1.6.
- ~~Tech stack~~ — **Resolved:** Next.js + Supabase + Tailwind — see [tech-stack.md](tech-stack.md).

## Still genuinely open

- [OPEN QUESTION] Final brand/company name — still just the "IronShield" working name throughout every
  volume. This is the one foundational item left unresolved, and it touches nearly everything (SEO, About
  page, legal entity name, domain).
- Volume 9 (UI/UX) — blocked on the brand name/visual identity above, not an independent decision.

## Volumes

1. [Business Requirements](volume-1-business-requirements.md)
2. [Website Functional Requirements](volume-2-website-functional-requirements.md)
3. [Product Catalogue](volume-3-product-catalogue.md)
4. [Service Modules](volume-4-service-modules.md)
5. [Admin Portal](volume-5-admin-portal.md)
6. [Database Design](volume-6-database-design.md)
7. [Security & Compliance](volume-7-security-compliance.md)
8. [API & Integrations](volume-8-api-integrations.md)
9. [UI/UX Design System](volume-9-ui-ux-design-system.md)
10. [Testing](volume-10-testing.md)

Plus the standalone [Tech Stack Decision](tech-stack.md), separate from the 10 SRS volumes.
