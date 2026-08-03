# Project IronShield (working name — brand TBD)

**Premium B2B digital platform for a unified Textile, Apparel, Uniform, Workwear, Sourcing & Consulting company.**

This repo is currently **documentation-only**. It holds the Software Requirements Specification (SRS) that will
become the blueprint for design, development, and QA once the codebase is scaffolded (separate decision, not yet made).

## Status

- [ ] Business name / brand finalized (working name "IronShield" only)
- [x] Volume 1 — Business Requirements: **substantially complete** (vision, brand architecture, market
  scope, objectives/targets, personas, trust signals, conversion channels confirmed)
- [x] Volume 2 — Website Functional Requirements: **all pages drafted** (Home, About, Divisions/Products,
  Services, Catalogue index, Blog, Careers, Legal, 404)
- [x] Volume 3 — Product Catalogue: **solid** (categories, schema, pricing, Specification Enquiry Form,
  catalogue scale confirmed)
- [x] Volume 4 — Service Modules: **solid** (Consulting, Sourcing, AI placeholder confirmed)
- [ ] Volume 5 — Admin Portal: **partially specified** (lead assignment, lead status, Candidates module,
  and CRM decision — native, resolved; roles, quotation workflow still open)
- [x] Volume 6 — Database Design: **solid, all major decisions resolved** (full field lists; delete policy
  and Quotations currency — INR/USD/EUR — both confirmed)
- [ ] Volume 7 — Security & Compliance: **partially resolved** (auth, RBAC priority, compliance posture
  settled — 5-market export exposure confirmed: USA, EU, Middle East, Australia, NZ); encryption/backup
  specifics blocked on stack choice, legal content needs real legal review
- [ ] Volume 8 — API & Integrations: **mostly resolved** (WhatsApp + GA4 confirmed launch requirements;
  CRM + ERP confirmed not needed); Email platform choice and ad pixels still open
- [ ] Volume 9 — UI/UX Design System: blocked on visual identity, correctly untouched
- [x] Volume 10 — Testing: **solid** (worked examples for Specification form + Lead lifecycle, expanded
  cross-cutting checks, test environment strategy resolved); accessibility testing blocked on Volume 9
- [x] Tech stack decision — **resolved**: Next.js + Supabase + Tailwind (matching finrise-website), Resend
  (email), Cloudflare Turnstile (CAPTCHA), wa.me link (WhatsApp), Vercel (hosting, tentative). See
  [docs/tech-stack.md](docs/tech-stack.md).
- [ ] Codebase scaffold — **now unblocked**, not yet started

## Business Divisions in Scope

1. Fashion Apparel
2. School Uniforms
3. Corporate Uniforms
4. Industrial Workwear
5. Technical Fabrics
6. Textile Consulting
7. Sourcing *(flagship service — primary revenue line; renamed from "Global Sourcing", serves both
   domestic and export clients)*
8. AI & Digital Solutions (future — placeholder only)
9. Blog / Knowledge Centre

## Document Set

All SRS volumes live in [`docs/`](docs/). Start at [`docs/00-master-index.md`](docs/00-master-index.md).

| Volume | Title | File |
|---|---|---|
| 1 | Business Requirements | [volume-1-business-requirements.md](docs/volume-1-business-requirements.md) |
| 2 | Website Functional Requirements | [volume-2-website-functional-requirements.md](docs/volume-2-website-functional-requirements.md) |
| 3 | Product Catalogue | [volume-3-product-catalogue.md](docs/volume-3-product-catalogue.md) |
| 4 | Service Modules | [volume-4-service-modules.md](docs/volume-4-service-modules.md) |
| 5 | Admin Portal | [volume-5-admin-portal.md](docs/volume-5-admin-portal.md) |
| 6 | Database Design | [volume-6-database-design.md](docs/volume-6-database-design.md) |
| 7 | Security & Compliance | [volume-7-security-compliance.md](docs/volume-7-security-compliance.md) |
| 8 | API & Integrations | [volume-8-api-integrations.md](docs/volume-8-api-integrations.md) |
| 9 | UI/UX Design System | [volume-9-ui-ux-design-system.md](docs/volume-9-ui-ux-design-system.md) |
| 10 | Testing | [volume-10-testing.md](docs/volume-10-testing.md) |

Plus [docs/tech-stack.md](docs/tech-stack.md) — the tech stack decision, separate from the 10 SRS volumes.

## Deliverables (end state)

- Executive Business Requirements Document (BRD)
- Software Requirements Specification (SRS)
- Database Design Document (ERD)
- API Specification
- UI/UX Design Guide
- Test Plan
- Wireframes
- Content Architecture
- SEO Blueprint
- Development Roadmap
