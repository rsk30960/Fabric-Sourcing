# Volume 4 — Service Modules

> Status: **Solid.** Consulting and Sourcing both specified (enquiry fields, workflow, lead assignment,
> quote/turnaround). AI & Digital Solutions confirmed placeholder. Custom Uniform Programs resolved as
> not a distinct service (merged into Volume 3). Open: landing page copy/proof points, Sourcing's exact
> partnership-enquiry fields.

## 4.1 Services in scope

- [ ] Textile Consulting
- [ ] Sourcing
- ~~Custom Uniform Programs~~ — **Resolved: same as Volume 3's Uniforms divisions, not distinct.** Uniforms
  (School + Corporate) are made-to-order — removed as a separate service module, see §4.5 note and
  Volume 3 §3.1.
- [x] AI & Digital Solutions — **confirmed placeholder only**, see §4.6
- [ ] [TBD — any others?]

## 4.2 Per-service template

For each service, define:

- **Landing page** — purpose, key value props, proof points (case studies, credentials)
- **Service enquiry form** — fields specific to this service (may differ from general Contact form —
  see Volume 2 §2.3 for the baseline)
- **Workflow** — what happens after submission, step by step, from enquiry to engagement
- **Lead assignment** — which internal team/person this routes to, and how (see Volume 5 for admin-side rules)
- **Quote request process** — how a formal quote gets generated and delivered, timeline expectations

## 4.3 Textile Consulting

- **Landing page:** [TBD]
- **Service enquiry form:** **Resolved — dedicated fields confirmed** (plus baseline contact fields,
  Volume 2 §2.3): **Company size/scale**, **Current challenge/problem** (open text), **Engagement type
  preference** (e.g., one-time audit, ongoing retainer, project-based — [TBD] exact options list).
- **Workflow:** [TBD]
- **Lead assignment:** **Resolved — solo.** Routes to the founder; no assignment logic needed for v1 (§4.7).
- **Quote request process:** **Resolved — 1-2 business days** turnaround to first response/quote (§4.7-adjacent
  decision, applies across Consulting and Sourcing). Displayed to the buyer as a concrete expectation after
  submission, not vague "we'll be in touch" language.

## 4.4 Sourcing

*(Renamed from "Global Sourcing" — Volume 1 §1.3. This is the flagship, primary-revenue service, not a
peer category — landing page and messaging should reflect that, not undersell it as one of several equal
services.)*

- **Landing page:** [TBD]
- **Service enquiry form:** **Corrected — distinct from the Specification Enquiry Form, not a reuse of it.**
  Confirmed: Sourcing is about buyers wanting a **broader ongoing partnership relationship** (multiple
  product types/seasons), not a one-off product quote — this is different in kind from the per-product
  Specification form (Volume 3 §3.3). Needs its own field set oriented around the relationship rather than
  a single spec: product categories of interest, expected order frequency/volume, target markets, business
  type/scale. [TBD] finalize exact fields.
- **Workflow:** **Partially resolved:** submission → founder reviews → **branches** on completeness —
  (a) details clear → direct quote with price/conditions, or (b) details unclear → clarifying query sent to
  buyer → buyer responds → quote. [TBD] how the clarification round-trip is handled in the Admin Portal
  (Volume 5 §5.3 lead status — needs a status like "Awaiting Clarification" distinct from "New"/"Quoted").
- **Lead assignment:** **Resolved — solo.** Routes to the founder; no assignment logic needed for v1 (§4.7).
- **Quote request process:** **Resolved — conditional, not a fixed discovery-call step.** Within the 1-2
  business day SLA: **if the submitted details are clear/complete, respond directly with price and
  conditions** — no discovery call needed. **If details are unclear or incomplete, raise a clarifying query
  first** before quoting. This means the enquiry form (fields above) needs to capture enough detail to make
  direct quoting *possible* when the buyer provides it, while the workflow (below) must support a
  clarification round-trip when they don't.

## 4.5 ~~Custom Uniform Programs~~ — merged into Volume 3

**Resolved: not a separate service.** Uniforms are **made-to-order** — bulk/branded organizational uniform
business is exactly what Volume 3's School Uniforms and Corporate Uniforms divisions already are, not a
distinct service module. Handled entirely through the standard product/Specification Enquiry Form flow
(Volume 3 §3.1, §3.3) — organization type, headcount, and branding/artwork requirements map directly onto
the existing Specification Enquiry Form fields (Product reference, Quantity, Artwork, Styling).
No separate landing page, form, or workflow needed here.

## 4.6 AI & Digital Solutions (future)

- **Resolved: placeholder only.** Not a real offering at launch — show as "coming soon" or a brief teaser,
  no functional spec needed yet.
- Candidate directions to revisit later (not committed, just captured so the idea isn't lost): AI-assisted
  design from buyer reference images (ties to the upload feature already in Volume 3 §3.3), virtual
  sampling/3D visualization to reduce physical sample shipping for international buyers, AI-assisted
  partner-factory matching for the Sourcing division, demand forecasting for repeat institutional uniform
  buyers, auto-generated spec-sheets/tech-packs from the free-text Fabric/Trims/Styling fields (§3.3).

## 4.7 Open questions

- **Resolved: solo operation for now.** All enquiries across every division/service are currently handled
  by one person — Volume 5's lead assignment logic can be trivial for v1 (everything routes to one owner),
  no multi-person/round-robin assignment needed yet. Revisit if/when a team is hired.
- **Resolved (follows from solo operation + Volume 6's unified Lead entity):** all services funnel into
  one shared Lead/Quotation system rather than distinct pipelines — there's no organizational reason to
  fragment them with a single-person team, and Volume 6 already treats Specification Requests as attaching
  to the same Lead entity used everywhere else.
