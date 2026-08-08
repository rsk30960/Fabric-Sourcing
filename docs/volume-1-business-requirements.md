# Volume 1 — Business Requirements

> Status: **Substantially complete.** Vision, brand architecture, market scope, objectives/targets, personas,
> trust signals, and conversion channels all confirmed. Open: §1.7 NFR specifics (performance/uptime targets),
> §1.6 multi-language.

## 1.1 Business Vision

**IronShield** (working name — final brand name TBD) is a **new company**, founded on the owner's 20+ years
of professional experience in the textile industry. It operates as a **sourcing partner** across the textile,
apparel, uniform, workwear, and technical fabrics space, with a hybrid delivery model:

- **Owned manufacturing** in two divisions — **Uniforms** (School + Corporate) and **Industrial Workwear**.
  These are produced in-house.
- **Everything else — sourcing/agent model.** All other divisions (Fashion Apparel, Technical Fabrics, and
  international orders generally) are fulfilled through **partnered/allied factories**, not owned production.

**Market is a separate axis from division — not a split.** Domestic vs. international is a property of the
*client*, not a separate line of business or a separate "Global Sourcing" division. Every division can serve
either market. Concretely: **Uniforms (owned manufacturing) can also be sold to global/export buyers**, not
just domestically — the owned-manufacturing credibility is a selling point internationally too. The one
confirmed asymmetry is emphasis, not structure: **the primary revenue driver overall is international
sourcing/freelancing business**, while domestic performance is tracked against a concrete monthly target
(§1.2). **Confirmed:** Industrial Workwear also serves both domestic and export markets, same as Uniforms —
both owned-manufacturing divisions are domestic **and** export.

The platform's job is to make this hybrid model *legible and credible* to two different audiences at once:
international buyers (who cannot visit in person and must trust a new company based on the founder's track
record and the partner network) and domestic clients (who want a dependable local supplier/manufacturer).
The 20-year personal track record is the primary trust asset for a brand-new company — the site should lean
on founder credibility (experience, past work, industry relationships) rather than "company history," since
there isn't yet an established corporate history. **Decision: founder will be presented as a named, visible
figure** (bio, photo, credentials) on the About page — the strongest available credibility signal for a new
company. Carries into Volume 2's About page spec and Volume 9 (needs a proper profile/bio component).

## 1.2 Objectives

Draft list — rank/prioritize once confirmed:

- Generate qualified B2B enquiries
- Showcase products and services across all divisions
- Build trust and credibility (certifications, case studies, client logos, export track record)
- Capture and qualify leads into a structured pipeline
- Support exports and international sourcing relationships
- Provide technical/industry knowledge via blog content (SEO + authority)
- Lay groundwork for future e-commerce and a customer portal

**Measurable targets (confirmed):**

- **Domestic:** ≥ ₹10,00,000 (10 lakh) per month in enquiry-driven business, from launch. This is the
  primary domestic KPI — site performance (leads → qualified → won) should be measurable against it.
- **International:** no fixed revenue target yet — success is measured by **qualified enquiry volume** from
  international buyers, since the international client base is still being built. [TBD] once enquiry flow
  is established, revisit whether a revenue or enquiry-count target should replace this.

## 1.3 Brand Architecture

- **Decision:** Single unified brand across all divisions. Divisions are presented as sections/categories
  under one corporate identity, not separate sub-brands.
- **All divisions launch live from day one** (confirmed — no phased rollout).
- Divisions to represent, annotated with delivery model (confirmed). Note: **market (domestic/export) is not
  a division split** — each division below can serve either market unless noted otherwise.
  1. Fashion Apparel — *sourcing, via partner factories*
  2. School Uniforms — **owned manufacturing** (domestic **and** export)
  3. Corporate Uniforms — **owned manufacturing** (domestic **and** export)
  4. Industrial Workwear — **owned manufacturing** (domestic **and** export)
  5. Technical Fabrics — *sourcing, via partner factories*
  6. Textile Consulting — *advisory service, no production*
  7. Sourcing — *sourcing/agent role via partner factories, serving both domestic and international clients.
     This is effectively the company's primary revenue line overall (see §1.1) even though it's listed as one
     division among equals — site messaging should treat it as the flagship service, not undersell it as a
     peer category.*
  8. AI & Digital Solutions *(future — flag as "coming soon" or omit at launch?)* [TBD]
  9. Blog / Knowledge Centre
- Every product/service page should make the delivery model visible where relevant (owned manufacturing vs.
  partner-factory sourced) — it's a credibility differentiator, not something to hide. Market served
  (domestic/export) should also be shown per product/division where it varies. Carries into Volume 2
  (page content) and Volume 3 (product schema — consider "Production Type" and "Markets Served" fields).
- Visual/verbal treatment: shared nav and shared design system across all divisions (per single-brand
  decision above) — no distinct sub-sites.

## 1.4 User Personas

Draft persona slots — each needs goals, pain points, and how the site serves them. Ranked by business
priority per §1.1/§1.2 (international sourcing = primary revenue line; domestic = ₹10L/month target):

| Persona | Who | Primary goal on site | Priority | [TBD details] |
|---|---|---|---|---|
| Sourcing Buyer (domestic or export) | Brand/distributor needing production via partner factories — India or overseas | Trust a new company with no track record — needs founder credibility, partner-factory proof, process clarity | **Primary** (int'l emphasis — see §1.1/§1.2) | |
| Procurement Manager (Uniforms) | School/corporate buyer, domestic **or** export | Get a quote fast, verify credibility, confirm owned-manufacturing capacity | High (₹10L/mo domestic target) | |
| Industrial Safety/Ops Manager | Workwear buyer, compliance-driven, domestic **or** export | Find certified fabrics/specs, confirm owned-manufacturing capacity | High | |
| Fashion Brand Sourcing Manager | Apparel brand looking for manufacturing (domestic or international) | Evaluate sourcing capability, MOQs, partner factory quality assurance | Medium | |
| Textile Consulting Client | Textile business owner needing advisory | Understand service offering, book consult, evaluate founder's 20-yr expertise | Medium | |
| [TBD] | | | | |

- **Confirmed trust signals** (not personal certifications or named past clients — the credibility case rests
  on the partner network and process, not on referenceable prior employers):
  1. **Partner factory credentials** — audit reports, certifications, capacity proof from the factories
     actually producing the goods. Carries into Volume 3 (product schema needs a factory/partner reference)
     and Volume 4 (Sourcing service page should surface this prominently).
  2. **Samples/trial-order process** — a defined, low-commitment way for a new buyer to test quality before
     a full order. This needs to be a documented workflow, not just a claim — carries into Volume 2 (Sourcing/
     product pages should describe the process step-by-step) and Volume 4 (service workflow).

## 1.5 Customer Journey

**Confirmed: starting from zero.** There is no existing referral network, trade show presence, or outreach
channel feeding the business today — **the website itself is the primary discovery channel.** This has
concrete consequences across other volumes, not just this one:

- **SEO/content is not a nice-to-have, it's the acquisition strategy.** Volume 2's per-page SEO requirements
  and the Blog/Knowledge Centre (§1.3 division 9) carry more weight than they would for a business with warm
  referral flow — they need to be built for genuine organic discovery, not just credibility polish.
- **Founder visibility (§1.1) and trust signals (§1.4 open question below) matter more, not less** — a cold
  visitor from a Google search has zero prior trust, unlike a referred lead who arrives pre-vetted.
- **Paid channels may need to fill the gap** while organic/SEO ramps up — worth flagging for Volume 8 (Meta
  Pixel, LinkedIn Insight Tag) as likely launch-relevant rather than optional, since organic traffic takes
  months to build.

Journey mapping (still open):

- [TBD] Map awareness → consideration → enquiry → quote → (future: purchase) → repeat, per persona (§1.4).
  Given zero warm traffic, awareness stage (SEO, content, ads) deserves the most design attention.
- **Confirmed: all three conversion channels are in scope**, not a single primary path:
  1. Structured enquiry/quote form (Volume 2 §2.3 style) — for qualifiable, structured leads
  2. WhatsApp click-to-chat — lower-friction option, common for B2B textile/sourcing buyers
  3. Gated catalogue/spec-sheet download — softer, content-driven lead capture
  [TBD] Which channel is emphasized on which page type (e.g., product pages might lead with WhatsApp +
  gated download, while Sourcing/Consulting service pages lead with the structured quote form) — to be
  decided per-page in Volume 2.

## 1.6 Functional Scope

**Decision:** lead-generation site at launch — no direct checkout. Scope for v1:

- [x] Corporate/marketing pages (Home, About, Divisions, Contact)
- [x] Product catalogue (browsable, filterable, downloadable specs)
- [x] Service landing pages + enquiry workflows
- [x] Blog / Knowledge Centre
- [x] Lead capture + admin lead management
- [x] Quotation request workflow
- [ ] E-commerce checkout / order & invoice management — **status changed (2026):** originally
  "deferred, future phase." **Superseded by `docs/platform-vision-v2.md`** — order/invoice
  management via a Customer Portal and Supplier Portal is now confirmed as real target scope, not
  permanently out of bounds. Still not part of the *current* build slice (current priority: digital
  tools/calculators) — this note exists so the current site's lead-gen-only design isn't mistaken
  for a permanent architectural decision.
- [ ] Customer portal — same status change as above, see `docs/platform-vision-v2.md`
- [ ] Multi-language support? [TBD — export scope (§1.6 market decision) makes this worth revisiting;
  at minimum, confirm whether English-only is acceptable for target export markets]

## 1.7 Non-Functional Requirements

- Performance: [TBD target — e.g., page load, Core Web Vitals]
- Availability: [TBD uptime target]
- Scalability: [TBD expected traffic/catalogue size]
- SEO: must support technical SEO (structured data, sitemaps) — detailed in Volume 2 per-page
- Accessibility: WCAG level — detailed in Volume 9
- Browser/device support: detailed in Volume 10
- Localization/currency for export buyers: **in scope** (domestic + export from launch — see §1.6).
  **Currency: resolved (Volume 6)** — 3-currency model: INR (domestic), USD (default export), EUR
  (option for EU customers). [TBD] remaining specifics: unit systems (metric/imperial for specs), time
  zone handling for enquiry SLAs.
