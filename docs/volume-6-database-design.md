# Volume 6 — Database Design

> Status: **Solid — all major decisions resolved.** Every entity has a real field list (Customers, Leads,
> Specification Requests, Products, Categories, Quotations, Suppliers, Blogs, Downloads, Candidates).
> Contact Requests removed as redundant with Leads. Delete policy (soft-delete + hard-delete-on-request)
> and Quotations currency (INR/USD/EUR) both resolved. Formal ERD (visual diagram) still pending, but the
> field-level content is here.

## 6.1 Entities (draft)

For each entity below, define: fields, types, constraints, relationships (FK), indexes needed.

### Customers
**Resolved — a converted/known-contact registry, not a login account.** No customer portal exists yet
(deferred, Volume 1 §1.6), so "Customer" here just means a company/contact that's graduated from an
anonymous Lead into a recognized relationship — not an authenticated entity.
- Fields: name, company, email, mobile, country, **market** (Domestic/Export — Volume 1 §1.3), business
  type, persona type (optional — Volume 1 §1.4: Sourcing Buyer / Procurement Manager / Ops Manager /
  Fashion Brand Manager / Consulting Client), created_at, notes.
- Relationship: 1—many with Leads, Quotations, Specification Requests.

### Leads
**Resolved — full field list**, consolidating Volume 5 §5.3's decisions:
- id, **source** (enum: Contact Form / Specification Request / Consulting Enquiry / Sourcing Enquiry /
  Catalogue Download — note: Careers applications do **not** appear here, they create a **Candidate**
  instead, see below), **status** (New → Awaiting Clarification (if
  needed) → Quoted → Won/Lost — Volume 5 §5.3, Volume 4 §4.4), **assigned_to** (always the founder today,
  solo operation — Volume 4 §4.7 — but the field exists so Volume 7 §7.2's future multi-person routing
  doesn't require a schema change later), FK → Customer (nullable — set once identified/converted),
  FK → Product/Service (nullable), **market** (Domestic/Export), division/category tag, internal notes,
  created_at/updated_at.
- **Duplicate detection** (Volume 5 §5.3, still open): recommend a nullable `duplicate_of` FK →
  Lead, populated by an email+timestamp-window dedupe check on submission — exact matching logic still [TBD].

### Specification Requests
- New entity, distinct from a general Lead — captures the detailed custom-order spec from Volume 3 §3.3.
- **Two-table structure** (per Volume 3 §3.3's confirmed multi-product enquiry list):
  - **Specification Request** (header): shared contact/company fields, FK → Lead (every spec request is also
    a Lead, for pipeline/status tracking — Volume 5 §5.3) or FK → Customer, submission timestamp.
  - **Specification Request Line Items** (detail, 1—many per request): FK → Specification Request,
    FK → Product (if based on a catalogue item), fabric, trims, artwork, measurements (free text —
    Volume 3 §3.3), styling, quantity, reference images (file[], see Volume 3 §3.3 upload constraints — [TBD]).
- **Resolved: the two forms coexist, split by funnel stage rather than overlapping.** The general Contact
  form (Volume 2 §2.3) stays the low-friction path for exploratory/non-product enquiries (About/Home/Contact
  page, Consulting, general "not sure what I need yet" visitors). The Specification Request (Volume 3 §3.3)
  is used specifically on product/catalogue pages once a buyer is ready to request a quote against actual
  product specs. This avoids duplicate data capture while keeping the general Contact form genuinely low-effort.
  Both ultimately create/attach to a Lead record for unified pipeline tracking (Volume 5 §5.3).

### Products
- Schema per Volume 3 §3.1 — category, subcategory, fabric, sizes, colors, MOQ, certifications, images, spec sheet
- Relationship: many—many with Categories (if a product can span categories)

### Categories
**Resolved — flat, two-level.** Volume 3 §3.1 shows Division (e.g., School Uniforms) → garment type
(Shirt, Pant, Skirt...) with no deeper nesting anywhere in the confirmed content — only 5 product
divisions total, so a flexible arbitrary-depth tree would be over-engineering. Structure: **Division**
(the 5 product divisions) → **Subcategory** (garment type within it), simple FK, not a recursive tree.

### Quotations
**Resolved — full field list**, aligning to Volume 5 §5.7 and the Sourcing/Consulting workflow (Volume 4
§4.4's conditional quote-or-clarify logic):
- FK → Lead, FK → Customer, FK → Specification Request (nullable — set when the quote originates from a
  product spec rather than a Consulting/Sourcing enquiry), line items (FK → Product or free-text
  description, unit price, quantity, subtotal), **currency** — **Resolved: 3-currency enum, not full
  multi-currency.** `INR` (domestic), `USD` (default export currency), `EUR` (option specifically for EU
  customers) — Middle East/Australia/NZ export quotes default to USD unless/until a reason emerges to add
  more currencies. Simpler than maintaining exchange rates for 5+ currencies, more buyer-friendly than
  forcing EU buyers into USD. Carries into Volume 1 §1.7 (resolves that open item). Status
  (Draft → Sent → Accepted/Rejected/Expired), validity period (e.g., 30 days — [TBD] exact policy), total,
  created_at, created_by (founder, per solo operation).

### Suppliers
*(a.k.a. the Factory/Partner record referenced in Volume 3 §3.1/§3.4 — same entity)*
- **Resolved: hybrid — both customer-facing and internal-only fields on the same record**, not an
  either/or. Volume 3 §3.1 already established the Partner Factory Reference is shown to buyers as a trust
  signal, which requires *some* fields to be public; but a factory partner relationship also has commercial
  terms that shouldn't be exposed. Split:
  - **Public-facing** (shown via Product pages, Volume 2 §2.8): name, region, certifications, capacity
    summary, photos.
  - **Internal-only** (Super Admin access — Volume 7 §7.2): direct contact info, commercial/pricing terms,
    internal notes.
- **Content still deferred** (Volume 3 §3.4 — capacity data, certifications to be added later), but this
  public/internal field split should exist in the schema now so content can populate correctly once ready.

### Blogs
- Title, slug, body, author (founder — ties to Volume 2 §2.5/§2.11 founder-as-author decision), category/tags
  (aligned to the 5 product divisions + services, Volume 5 §5.4), SEO fields (meta title/description —
  Volume 5 §5.5), featured image, published status, publish date.

### Downloads
- File, associated entity (Product spec sheet, Catalogue PDF, Case study), **gated** field (boolean).
  **Resolved for catalogue/spec-sheet downloads: gated = true** (Volume 1 §1.5, Volume 3 §3.1 confirmed
  decision). Other asset types (e.g., case studies, if they exist) can vary — [TBD] per-item, not a global rule.

### ~~Contact Requests~~ — resolved, not a separate entity
**Resolved: folds directly into Leads, no separate raw-submission log.** Volume 2 §2.3 already established
that Contact form submissions create a Lead record directly (source = "Contact Form"). A distinct
"Contact Requests" staging table would just duplicate that without a clear purpose — removed.

### Candidates
- New entity, added per Volume 2 §2.12 (Careers, confirmed in scope — freelance/contract hiring).
  **Deliberately not a Lead** — a job/freelance applicant has a completely different lifecycle
  (application → review → engaged/rejected) from a sales enquiry, and mixing them into one Leads table
  would corrupt sales pipeline reporting (Volume 5 §5.9 Analytics).
- Fields: name, email, mobile, area of expertise/role, portfolio/resume file, availability, rate
  expectation (optional), message, application status.
- Volume 5 (Admin Portal) needs a lightweight Candidates view — not currently specified there.

## 6.2 Open questions

- **Resolved: no multi-tenancy.** Single company, no tenant_id/scoping needed anywhere in the schema.
- **Resolved: soft-delete by default, hard-delete/anonymization on explicit request.** Applies to
  Leads/Customers/Specification Requests/Candidates. Normal day-to-day deletes (e.g., cleaning up spam/junk
  leads) are soft — recoverable, keeps pipeline/reporting intact (Volume 5 §5.9 Analytics unaffected).
  A genuine hard-delete/anonymization path is triggered specifically when a data-subject exercises an
  erasure right (Volume 7 §7.5 — GDPR and equivalents across the confirmed 5-market export exposure).
  [TBD] exact anonymization approach (hard delete vs. field-level scrubbing that preserves aggregate
  analytics) — an implementation detail, not a launch blocker.
- **Resolved pragmatically:** expected data volumes are low — catalogue is confirmed under 100 products
  (Volume 3 §3.4), and leads/month is implicitly low given solo operation (Volume 4 §4.7) and a new company
  targeting ₹10L/month domestically (Volume 1 §1.2, order of magnitude: tens of qualifying enquiries/month,
  not thousands). Standard indexing is sufficient — no special partitioning/sharding design needed at this
  scale. Revisit only if growth materially changes this.
