# Volume 2 — Website Functional Requirements

> Status: **All pages drafted.** §2.3-2.14 cover the full sitemap. Genuinely open items are flagged inline
> (e.g., Legal page content blocked on Volume 7 + real legal review, Careers roles undefined, catalogue
> download SEO strategy) — those aren't "not started," they're real decisions/content still needed.

## 2.1 Page Template

Every page in the site gets a section with these subsections:

- **Purpose** — what this page exists to do, for whom
- **Wireframe** — link to design file / Figma / sketch
- **UI Components** — list of components used (hero, card grid, filter bar, form, etc.)
- **Input Fields** — if the page has forms, table of fields (name, type, required)
- **Validation Rules** — per field
- **Business Logic** — what happens on submit/interaction, any conditional behavior
- **Success/Error Messages** — exact copy for each state
- **SEO Requirements** — title tag, meta description, H1, schema markup, target keywords
- **Mobile Behaviour** — what changes on small screens
- **Security Requirements** — rate limiting, CAPTCHA, sanitization, auth if applicable

## 2.2 Sitemap (draft — confirm against Volume 1 scope)

- [ ] Home
- [ ] About / Company (see §2.4a — drafted)
- [ ] Divisions & Products (Volume 3) — product-type divisions, browsable catalogue:
  - [ ] Fashion Apparel
  - [ ] School Uniforms
  - [ ] Corporate Uniforms
  - [ ] Industrial Workwear
  - [ ] Technical Fabrics *(enquiry-first, no grid — Volume 3 §3.1)*
- [ ] Services (Volume 4) — relationship/advisory, not browsable products:
  - [ ] Textile Consulting
  - [ ] Sourcing *(renamed from "Global Sourcing" — Volume 1 §1.3; flagship service)*
  - [ ] AI & Digital Solutions *(future — placeholder/"coming soon" only, Volume 4 §4.6)*
- [ ] Product Catalogue index (see Volume 3 for schema/filters)
- [ ] Product Detail Page
- [ ] Service Detail / Landing pages (Consulting, Sourcing — Volume 4)
- [ ] Blog / Knowledge Centre index
- [ ] Blog Post detail
- [ ] Contact (see §2.3 — drafted)
- [ ] Specification / Quote Request (see Volume 3 §3.3 — drafted there, not duplicated here)
- [x] Careers — **confirmed in scope**, freelance/contract-oriented (see §2.12)
- [ ] Legal (Privacy Policy, Terms, Cookie Policy)
- [ ] 404 / error pages

## 2.3 Contact Form — worked example (per user's spec)

**Purpose:** the **low-friction, exploratory** enquiry point — for visitors who aren't ready to spec a
product yet (general questions, Consulting interest, "not sure what I need"). **Resolved (Volume 6):** this
is deliberately distinct from the Specification Enquiry Form (Volume 3 §3.3), which is the higher-detail
path for buyers ready to request a product quote. Both create/attach to a Lead record either way.

**Fields:**

| Field | Type | Required |
|---|---|---|
| Name | text | Yes |
| Company | text | No |
| Mobile | tel | Yes |
| Email | email | Yes |
| Country | select | Yes |
| Business Type | select | Yes |
| Requirement | select/multi | Yes |
| Message | textarea | No |
| File Upload | file | No |

**Validation:**

- Name: required, 2–100 characters
- Mobile: country-aware validation (format depends on selected Country)
- Email: RFC-compliant format
- File: PDF/JPG/DOCX only, max 10 MB
- Required-field indicators shown inline
- Spam protection: **CAPTCHA — resolved: Cloudflare Turnstile** (see [tech-stack.md](tech-stack.md))
- Duplicate submission handling: [TBD — e.g., debounce/disable button on submit, dedupe by email+timestamp window]

**Business Logic:** **Resolved (Volume 4 §4.7):** creates a Lead record (Volume 6), routes to the founder —
solo operation, no team/inbox routing logic needed for v1. [TBD] auto-reply email — depends on Volume 8's
still-open Email integration decision.

**Success/Error Messages:** [TBD exact copy] — should state the confirmed **1-2 business day** response
time (Volume 4 §4.3/§4.4), same as the Specification form (Volume 3 §3.3).

**SEO Requirements:** N/A (form page, but page itself needs title/meta) [TBD]

**Mobile Behaviour:** [TBD — stacked fields, tap targets ≥44px]

**Security Requirements:** CAPTCHA, server-side validation, file-type/size enforcement, rate limiting on submit endpoint

---

## 2.4 Home

**Purpose:** primary landing point for **cold organic/search traffic** (Volume 1 §1.5 — zero existing
referral network, the site itself is the discovery channel). Needs to establish credibility fast for a
visitor who's never heard of the company, and route them toward a division or a conversion action.

**UI Components:**
- Hero: single-brand positioning as a **Sourcing Partner** (Volume 1 §1.1) — should state the hybrid model
  plainly (owned manufacturing for Uniforms/Workwear + partner-factory sourcing for everything else) since
  that's a genuine differentiator, not something to bury.
- Division grid/nav: all divisions live at launch (Volume 1 §1.3) — Fashion Apparel, School Uniforms,
  Corporate Uniforms, Industrial Workwear, Technical Fabrics, Consulting, Sourcing, Blog. AI & Digital
  Solutions shown as "coming soon" only (Volume 4 §4.6).
- Trust-signal section: samples/trial-order process (Volume 1 §1.4) and partner-factory credibility —
  structure this section now even though the actual factory/cert content is deferred (Volume 3 §3.4), so it
  has somewhere to go once ready.
- Founder teaser: brief credibility line + photo, linking to the full About page profile (§2.5).
- Primary CTAs: all three confirmed conversion channels (Volume 1 §1.5) — enquiry/Specification form entry,
  WhatsApp click-to-chat, gated catalogue download.

**Input Fields:** none directly (CTAs link out to Contact/Specification forms).

**Business Logic:** [TBD] which CTA gets primary visual weight — likely the Specification form given it's
the highest-intent path, but worth deciding deliberately rather than defaulting.

**Success/Error Messages:** N/A (no form on this page).

**SEO Requirements:** [TBD] — this is the page carrying the most SEO weight given zero referral traffic
(Volume 1 §1.5); title/meta/H1/keyword targeting deserves real attention once brand name (Volume 1) is final.

**Mobile Behaviour:** [TBD] — division grid likely collapses to a scrollable list; CTAs should stay
reachable without excessive scrolling given WhatsApp/enquiry are primary conversion paths.

**Security Requirements:** N/A (no form/input on this page directly).

## 2.5 About

**Purpose:** the credibility page. Since IronShield is a brand-new company with no corporate history
(Volume 1 §1.1), this page has to do more work than a typical "About Us" — it's substituting founder
track record for company history as the primary trust signal.

**UI Components:**
- **Founder profile** (confirmed visible — Volume 1 §1.1): bio, photo, 20-year industry background,
  credentials. [TBD] actual bio copy/photo — content to be supplied separately, not fabricated here.
- Business model explainer: the hybrid delivery model (owned manufacturing vs. partner-factory sourcing —
  Volume 1 §1.1/§1.3) and the domestic + export market coverage, stated plainly since it's a genuine
  differentiator.
- Partner factory network section: structural placeholder for factory/partner credentials once available
  (Volume 3 §3.4 — deferred content).
- Samples/trial-order process explainer (Volume 1 §1.4 trust signal) — how a new buyer can test quality
  before committing to a full order.

**Input Fields:** none (this page is persuasive, not transactional — CTAs link to Contact/Specification forms).

**Business Logic:** N/A — no form on this page.

**Success/Error Messages:** N/A.

**SEO Requirements:** [TBD] — likely targets founder-name/expertise and "new sourcing partner" type queries
once brand name is final.

**Mobile Behaviour:** [TBD] — founder profile and business model sections should stack cleanly; avoid
burying the founder photo/credentials below the fold on mobile given how load-bearing it is for trust.

**Security Requirements:** N/A (no form/input on this page directly).

---

## 2.6 Division/Product Listing Pages

Applies to **Fashion Apparel, School Uniforms, Corporate Uniforms, Industrial Workwear** — the four
browsable-grid divisions (Volume 3 §3.1). Technical Fabrics is a distinct case, see §2.7.

**Purpose:** browse/filter products within a division, build confidence via production-type/market
transparency, and drive to the Specification Enquiry Form (Volume 3 §3.3).

**UI Components:**
- Category/subcategory nav — per division's confirmed garment types (Volume 3 §3.1, e.g., School Uniforms:
  Shirt/Pant/Skirt/Tie/Sportswear/Winter Jacket)
- Filter bar — category, size, color, fabric, certification, **Production Type**, **Markets Served**, MOQ
  range (Volume 3 §3.1 filters)
- Product card grid — image, name, brief spec teaser, **Production Type** badge (Owned Manufacturing /
  Partner-Sourced) and **Markets Served** badge (Domestic/Export) shown per card, since this is a confirmed
  trust/credibility differentiator (Volume 1 §1.3), not incidental metadata
- "Add to enquiry list" control per card — feeds the confirmed multi-product Specification form (Volume 3
  §3.1/§3.3)
- Secondary CTAs: WhatsApp click-to-chat, gated catalogue download (Volume 1 §1.5)

**Input Fields:** filter controls only (not a submitted form — client-side/query-param state).

**Validation:** N/A for filters; server-side sanitization of filter query params (Volume 7 §7.7 baseline).

**Business Logic:** "Add to enquiry list" appends the product as a line item to an in-progress Specification
form submission (Volume 3 §3.3 multi-line-item structure) rather than submitting anything immediately.

**Success/Error Messages:** empty state when filters match no products. [TBD exact copy]

**SEO Requirements:** [TBD] — category-level title/meta, structured data (ItemList/Product schema — note:
no `price` in schema markup since pricing is quote-only, Volume 3 §3.1), target keywords per division.
**Industrial Workwear specifically:** certification badges will be incomplete until compliance data is
supplied (deferred, Volume 3 §3.1) — page should degrade gracefully without those badges rather than block
launch on missing content.

**Mobile Behaviour:** [TBD] — filter bar likely collapses to a drawer/modal; grid likely single/double column.

**Security Requirements:** baseline (Volume 7 §7.7) — no elevated risk beyond standard input sanitization.

## 2.7 Technical Fabrics (distinct page type)

**Purpose:** unlike the other four divisions, this is **enquiry-first, no product grid** (confirmed,
Volume 3 §3.1) — buyer specifies by treatment or application rather than browsing fixed SKUs.

**UI Components:** capability explainer (what treatments/applications are possible), the Specification
Enquiry Form (Volume 3 §3.3) embedded directly rather than a "browse then enquire" flow. [TBD] whether a
few commonly-requested fabric types are shown as illustrative examples for SEO/discoverability even though
the real offering is fully custom (open question carried from Volume 3 §3.1).

**Input Fields / Validation / Business Logic:** inherits Volume 3 §3.3 entirely.

**SEO Requirements:** [TBD] — needs a capability/application-keyword strategy rather than per-product SEO,
since there are no individual product pages to rank here.

**Mobile Behaviour / Security Requirements:** same baseline as §2.6.

## 2.8 Product Detail Page

**Purpose:** single-product deep dive for the four browsable divisions — build the case for a Specification
enquiry.

**UI Components:**
- Image gallery ([TBD] dimensions/format spec — Volume 3 §3.1 open item)
- Spec table: fabric composition, GSM, sizes, colors, MOQ, lead time, certifications (Volume 3 §3.1 schema)
- **Production Type** and **Markets Served** badges (same as listing page, §2.6)
- Partner Factory Reference display — if Production Type = Partner-Sourced, links to factory/partner
  credentials (**structural placeholder only** — content deferred, Volume 3 §3.4)
- Downloadable spec sheet (PDF)
- Related products ([TBD] logic — Volume 3 §3.1 open item)
- Primary CTA: "Add to Enquiry" → feeds the Specification form as a line item (§2.6 business logic)
- Secondary CTA: WhatsApp click-to-chat

**Business Logic:** same "add as line item" pattern as §2.6.

**SEO Requirements:** [TBD] — per-product title/meta, Product structured data (no `price` field — quote-only,
Volume 3 §3.1), image alt-text requirements.

**Mobile Behaviour:** [TBD] — gallery likely swipeable, spec table likely stacks or collapses to an accordion.

**Security Requirements:** baseline (Volume 7 §7.7).

## 2.9 Service Detail Pages

### 2.9a Textile Consulting

**Purpose:** build the case for an advisory engagement.

**UI Components:** value proposition, founder credibility tie-in (links to About §2.5 — the 20-year
expertise is the actual product being sold here), engagement-type explainer.

**Input Fields:** **Resolved (Volume 4 §4.3)** — dedicated form, baseline contact fields (§2.3) plus:
**Company size/scale**, **Current challenge/problem** (open text), **Engagement type** (one-time audit /
ongoing retainer / project-based — [TBD] exact option list).

**Business Logic:** creates a Lead (Volume 6), solo routing (Volume 4 §4.7), 1-2 business day response
(Volume 4 §4.3).

**SEO Requirements / Mobile Behaviour / Security Requirements:** [TBD], baseline otherwise.

### 2.9b Sourcing

**Purpose:** the flagship service landing page (Volume 4 §4.4) — positioned for buyers wanting an **ongoing
partnership relationship**, not a one-off product quote. Should not read as a peer of the other divisions/services.

**UI Components:** partnership value proposition, hybrid delivery model explainer (owned manufacturing +
partner-factory network — Volume 1 §1.1), trust signals (samples/trial process, partner factory
credentials — Volume 1 §1.4), a **distinct enquiry form** (not the Specification form — Volume 4 §4.4
correction).

**Input Fields:** draft field set from Volume 4 §4.4, **not yet finalized**: product categories of
interest, expected order frequency/volume, target markets, business type/scale — plus baseline contact
fields (Volume 2 §2.3).

**Business Logic:** **Resolved (Volume 4 §4.4) — conditional response, not a fixed discovery-call step.**
Creates a Lead; within the 1-2 business day SLA, the founder either (a) responds directly with price and
conditions if the submitted details are clear/complete, or (b) sends a clarifying query first if not —
see Volume 5 §5.3's new "Awaiting Clarification" lead status. Solo routing (Volume 4 §4.7).

**SEO Requirements / Mobile Behaviour / Security Requirements:** [TBD], baseline otherwise.

---

## 2.10 Product Catalogue Index

**Purpose:** top-level "browse everything" hub, distinct from the per-division listing pages (§2.6) —
serves visitors who land looking for the catalogue broadly rather than a specific division (e.g., from a
generic search query or the gated catalogue download, Volume 1 §1.5/Volume 3 §3.1). Not a duplicate product
grid — routes into the division pages rather than re-listing every product.

**UI Components:** division cards/tiles linking to each of the 5 product divisions (§2.6, §2.7), a
top-level gated catalogue download CTA (Volume 3 §3.1 — confirmed gated behind lead form).

**Business Logic:** catalogue download gate creates a Lead (Volume 6), same pattern as other gated content.

**SEO Requirements:** [TBD] — likely the page that captures broad "[industry] catalogue/supplier" type
queries, funneling into division-specific pages for narrower intent.

**Mobile Behaviour / Security Requirements:** [TBD], baseline otherwise.

## 2.11 Blog / Knowledge Centre

**Purpose:** the primary organic-acquisition surface (Volume 1 §1.5 — zero existing referral network means
SEO/content carries real acquisition weight, not just credibility polish). Author is the founder — direct
extension of the About page's credibility strategy (§2.5).

**UI Components (index):** post grid/list, category filter (categories aligned to divisions — Volume 5
§5.4), featured/latest post highlight.

**UI Components (detail):** article body, founder author byline (photo/credentials — ties to §2.5), related
posts, social share, CTA back to relevant division/Specification form if the post is product/topic-related.

**Input Fields:** none on public pages (authoring happens in Admin Portal, Volume 5 §5.4).

**Business Logic:** N/A on public side beyond standard page render.

**SEO Requirements:** **highest-priority SEO surface on the site** per Volume 1 §1.5 — Article/BlogPosting
structured data, per-post title/meta, target keyword strategy per division. [TBD] actual content calendar/
topics — a content strategy question, not just a technical spec.

**Mobile Behaviour / Security Requirements:** [TBD], baseline otherwise.

## 2.12 Careers

**Confirmed in scope** — oriented around **freelance/contract hiring**, not full-time roles (solo operation
today, plans to bring on freelancers — Volume 1/4 solo-operation context). This is a materially different
page than a typical corporate Careers page.

**Purpose:** attract freelance talent relevant to the business (e.g., pattern makers, garment technicians,
regional sourcing agents — [TBD] actual roles/skills needed, not yet specified).

**UI Components:** roles/skills-needed list or open-ended "work with us" pitch (depends on whether specific
roles are defined yet — [TBD]), application form.

**Input Fields:** Name, Email, Mobile, Area of expertise/role, Portfolio/Resume (file upload), Availability,
Rate expectation (optional), Message.

**Validation:** baseline (Volume 2 §2.1 pattern) — file upload type/size limits (align with Volume 2 §2.3
constraints: PDF/JPG/DOCX, max 10 MB, or portfolio-appropriate formats if different).

**Business Logic:** **[OPEN QUESTION]** this is a **Candidate**, not a sales Lead — Volume 6 doesn't yet
have an entity for this. Recommend a distinct `Candidates` entity rather than overloading the Leads table,
since freelancer applications have a completely different lifecycle (Volume 5 would need a lightweight
Careers/Candidates management view, not currently specified).

**Success/Error Messages:** [TBD exact copy].

**SEO Requirements / Mobile Behaviour:** [TBD], baseline.

**Security Requirements:** baseline (Volume 7 §7.7) plus resume/portfolio file upload validation.

## 2.13 Legal Pages (Privacy Policy, Terms, Cookie Policy)

**Not drafted here — content requires Volume 7 decisions plus actual legal review, not something to
fabricate.** Volume 7 (Security & Compliance) is still largely untouched, and legal page *content* is a
compliance/legal matter, not a product-spec one — recommend this gets real legal input once Volume 7's
open questions (§7.5 GDPR/international compliance — relevant given confirmed export scope, Volume 1 §1.6)
are resolved, rather than drafting placeholder legal text now.

**Structural requirements only (safe to specify now):**
- Privacy Policy, Terms of Service, Cookie Policy as separate pages, linked from site footer
- Cookie consent banner (Volume 7 §7.5) — privacy-preserving default per standing project practice
- [TBD] Everything else — genuinely blocked on Volume 7 + legal review

## 2.14 404 / Error Pages

**Purpose:** recover a lost visitor without losing the conversion opportunity, given how much this site
relies on organic/cold traffic (Volume 1 §1.5) — a dead-end 404 wastes hard-won traffic.

**UI Components:** friendly message, search or clear navigation back to Home/Divisions, link to a couple of
prominent divisions or the Blog.

**Business Logic:** [TBD] whether 404s get logged/monitored (broken-link detection) — worth doing given
SEO is load-bearing here (Volume 1 §1.5), so broken internal links have real cost.

**SEO Requirements:** must return true HTTP 404 status (not a soft-404), excluded from sitemap/indexing.

**Mobile Behaviour / Security Requirements:** [TBD], baseline otherwise.
