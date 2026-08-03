# Volume 5 — Admin Portal

> Status: **Partially specified.** Resolved: lead assignment (solo), lead status needs "Awaiting
> Clarification", no bulk import needed, new Candidates module, CRM decision (§5.8 — native, Admin Portal
> is the system of record). Still open: full lead status list, role permission matrix, quotation workflow
> detail, blog management, dashboard metrics.

## 5.1 Dashboard

- [TBD] Key metrics shown at a glance: new leads, open quotes, pending blog drafts, [others?]
- [TBD] Role-specific views (see 5.5 User Roles)

## 5.2 Product Management

- Create/edit/archive products (fields per Volume 3 §3.1 schema)
- **Resolved:** no bulk import/export needed for v1 — catalogue is under 100 products at launch
  (Volume 3 §3.4), manual entry is sufficient.
- [TBD] Image upload/management workflow
- [TBD] Approval workflow before a product goes live, or direct publish?

## 5.3 Lead Management

- Incoming leads from: Contact form (2.3), Service enquiry forms (Volume 4), Quote requests, Product enquiries
- [TBD] Lead statuses — draft, needs to include **"Awaiting Clarification"** as a distinct state from
  "New"/"Quoted": Volume 4 §4.4 confirmed the Sourcing (and likely Consulting) workflow branches on whether
  submitted details are complete enough to quote directly, or need a clarifying round-trip with the buyer
  first. Draft: New → Awaiting Clarification (if needed) → Quoted → Won/Lost.
- **Resolved:** lead assignment is trivial for v1 — solo operation, everything routes to the founder
  (Volume 4 §4.7). No round-robin/division-based routing logic needed yet.
- [TBD] Notifications (email/WhatsApp) on new lead
- [TBD] Duplicate detection/merging

## 5.4 Blog Management

- [TBD] Draft/publish workflow, author roles
- [TBD] Categories/tags aligned to divisions
- [TBD] SEO fields per post (see 5.5 SEO Manager)
- [TBD] Scheduling (publish at future date/time)?

## 5.5 SEO Manager

- [TBD] Per-page meta title/description editing
- [TBD] Sitemap generation, robots.txt control
- [TBD] Redirect management (301s)
- [TBD] Schema markup control per content type

## 5.6 User Roles

Draft role list — refine once admin users are known:

| Role | Access |
|---|---|
| Super Admin | Full access, user management |
| Content Editor | Blog, product content — no lead/financial data |
| Sales/Lead Manager | Leads, quotations — no content editing |
| [TBD] | |

- [TBD] Role-based access control detailed further in Volume 7 §7.2

## 5.7 Quotation Management

- [TBD] Quote creation from a lead (manual, or templated by product/service?)
- [TBD] Quote status tracking, approval, sending to customer
- [TBD] Quote → won/lost outcome tracking for reporting

## 5.8 CRM Integration

- **Resolved: native.** No existing CRM/tool in use today (confirmed — starting fresh). The Admin Portal's
  Lead Management (§5.3), Quotation Management (§5.7), and Candidates (§5.10) modules **are** the system of
  record — no external CRM integration for v1. Simpler to build, no third-party cost/dependency, appropriate
  for solo operation + sub-100-product catalogue. Revisit only if the business scales up (team growth,
  higher volume) — export/migration path to an external CRM can be considered then, not now.

## 5.9 Analytics

- [TBD] Built-in reporting (leads by source/division, conversion rates) vs. relying on GA4 dashboards
  (see Volume 8 §8 Google Analytics)

## 5.10 Candidates (Careers)

- New, lightweight module — added per Volume 2 §2.12 (Careers, confirmed in scope) and Volume 6's
  `Candidates` entity. **Kept separate from Lead Management (§5.3)** since applicants aren't sales leads.
- [TBD] Minimal view: list applications, view portfolio/resume, mark status (New → Reviewed →
  Engaged/Rejected). Doesn't need the full sophistication of the sales pipeline given solo operation and
  likely low volume.
