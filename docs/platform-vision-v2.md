# Platform Vision v2 — AI-Powered Digital Textile & Apparel Business Platform

> Status: **North-star vision, not immediate scope.** Supersedes parts of the original 10-volume
> SRS (specifically Volume 1 §1.6's e-commerce/portal decision). Everything else in the original
> SRS (Volumes 1–10, tech-stack.md) remains valid as the foundation this builds on top of — this
> document does not replace them, it extends them.

## What changed and why

The original SRS was scoped for a solo-operator, lead-generation-only business (Volume 1 §1.6:
"no e-commerce checkout... no customer portal"). The user has now provided a much larger target
architecture: a full platform with a Customer Portal, Supplier Portal, CRM, Quotation Engine,
AI Consultant, Textile Academy, Executive Dashboard, and Business Intelligence layer, serving both
external users (Fashion Brands, School Management, Corporate/Industrial/Government Buyers, Export
Buyers, Importers, Dealers, Distributors, Students, Entrepreneurs) and internal users (Super Admin,
Sales, Merchandising, Product Development, Marketing, Customer Support, Finance, Management,
Suppliers).

**Three decisions confirmed with the user (2026):**

1. **This is a phased, long-term vision — not immediate full scope.** Build toward it
   incrementally; don't attempt the whole structure in one push.
2. **The business is still solo/small-team today.** The internal-role list (Sales, Marketing,
   Merchandising, Finance, Customer Support as distinct people) is **aspirational** — the platform
   should be *architected* so real permissions/roles can be added later without a rebuild, but a
   full RBAC system for roles nobody currently occupies is not being built now. This is consistent
   with Volume 7 §7.2's original reasoning ("don't over-invest yet"), just extended forward.
3. **E-commerce/order management is now confirmed in scope — as a future phase.** This
   **supersedes Volume 1 §1.6's "no e-commerce, lead-gen only" decision.** Orders, Invoices, and
   Purchase Orders (Customer Portal, Supplier Portal) are real target functionality, not permanently
   out of scope — they're just not part of the current build slice.

**Current build priority (confirmed): Digital Tools / Calculators.** Concrete, scoped, doesn't
require the team/CRM/portal questions above to be resolved first, and delivers real SEO/engagement
value immediately. See `docs/digital-tools.md` (to be created as tools are built) for the working
list and status of each one.

## Full target architecture (reference — not a build checklist for right now)

```
Homepage
├── Solutions (renamed from "Products" — same underlying divisions, reframed)
├── Industries
├── Textile Academy
├── Knowledge Centre (renamed/expanded from "Blog")
├── AI Consultant
├── Resources
├── About
├── Contact

Customer Portal | Supplier Portal | CRM | Quotation Engine | Admin Panel | Executive Dashboard
```

Full menu structures, portal field lists, CRM entities, AI feature list, KPI list, and the 10
digital tools are as specified by the user in the 2026 platform requirements — not duplicated here
verbatim to avoid this document drifting out of sync with the source conversation. Refer back to
that conversation for the complete structure when scoping each future phase.

## Known tensions to resolve before building specific future phases (not blocking now)

- **AI Consultant** needs an LLM provider/budget decision before any real scoping — not yet asked.
- **Textile Academy** content includes safety/compliance-adjacent topics (EN Standards, NFPA, Arc
  Flash, PPE). Per the same principle already applied to the Legal pages (Volume 2 §2.13) and
  Workwear certifications (Volume 3 §3.1) — **real compliance content needs expert review, not
  generated placeholder text.** When this phase is built, expect structure-only content with clear
  "pending expert review" markers for anything safety-critical, same pattern as the legal pages.
- **CRM entities** (Opportunity, Follow-up, Task, Meeting, Email, Notes, Documents) go well beyond
  the current `leads`/`quotations` schema (Volume 6) — will need real schema design when that phase
  starts, not an assumption that current tables just "grow into" it.
- **Executive Dashboard / BI** needs real transactional data (orders, revenue) flowing through the
  platform first — not meaningful to build before the Customer Portal/order-management phase exists.

## Relationship to existing docs

- Volume 1 §1.6 — e-commerce decision **superseded**, see note above. Should be annotated there,
  not silently contradicted.
- Volumes 2–10, tech-stack.md — remain the accurate spec for what's actually built today. This
  document sits alongside them as the larger destination, not a replacement.
