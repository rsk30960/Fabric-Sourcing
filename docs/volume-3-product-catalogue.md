# Volume 3 — Product Catalogue

> Status: **Solid.** Categories, product schema, pricing model, Specification Enquiry Form, and catalogue
> scale all confirmed. Intentionally deferred (not blockers): factory/partner capacity data, Industrial
> Workwear certifications. Open: image spec details, Measurements format (free text confirmed for v1, but
> whether to revisit per-category).

## 3.1 Product Categories (draft — align to Volume 1 divisions)

- [x] **Fashion Apparel** — segmented by wearer: **Men's, Women's, Kids**. [TBD] garment types within each
  segment (casualwear/formalwear, knits/wovens, etc. — not yet specified).
- [x] **School Uniforms** — garment types: **Shirt, Pant/Trouser, Short Trouser, Skirt, Tie, Sportswear,
  Winter Jacket**. **Made-to-order** (Volume 4 §4.5 — bulk/branded organizational orders, not off-the-shelf
  stock; confirms the quote-per-specification pricing model below). [TBD] whether these vary by grade level
  (primary vs. secondary), and whether sizing is age-based or standard garment sizing.
- [x] **Corporate Uniforms** — garment types: **Shirt, Pant/Trouser, T-Shirts, Blazers**. **Made-to-order**
  (same as School Uniforms — Volume 4 §4.5). [TBD] whether offering varies by industry (hospitality, retail,
  office, healthcare) or is a single standard range across all corporate clients.
- [x] **Industrial Workwear** — garment types: **Shirt, Pant/Trouser, Coverall, Hi-Vis wear**.
  Compliance/safety standards (e.g., hi-vis rating, flame-resistance) — **deferred, to be provided later.**
  Not a launch blocker, but Volume 2's Industrial Workwear page spec and product schema (§3.1 Certifications
  field) should leave clear placeholders for these once available, since the Ops/Safety Manager persona
  (Volume 1 §1.4) looks for exactly this.
- [x] **Technical Fabrics** — **confirmed: no browsable sub-catalogue.** Fully routed through the
  Specification Enquiry Form (§3.3) as a custom sourcing request — buyer specifies by treatment or
  application, no fixed SKU list needed. Carries into Volume 2: the Technical Fabrics page should be
  enquiry-first (a spec form + explanation of capability), not a product grid like the other four divisions.

For each category above, define:

### 3.x [Category Name]

**Product schema** — fields every product in this category needs:

| Field | Type | Notes |
|---|---|---|
| Name | text | |
| SKU/Product Code | text | |
| Category / Subcategory | ref | |
| Description | rich text | |
| **Production Type** | select | **Owned Manufacturing** / **Partner-Sourced** — confirmed field, Volume 1 §1.3. Determines which trust-signal fields below apply. |
| **Markets Served** | multi-select | Domestic / Export — confirmed field, Volume 1 §1.3 (all divisions now serve both). |
| **Partner Factory Reference** | ref | Required if Production Type = Partner-Sourced. Links to a Factory/Partner record (Volume 6) carrying audit reports, certifications, capacity — the primary trust signal per Volume 1 §1.4. |
| Fabric composition | text | e.g., "65% Poly / 35% Cotton" |
| GSM / Weight | number | if applicable |
| Available sizes | multi-select | |
| Available colors | multi-select | |
| MOQ (minimum order quantity) | number | |
| Lead time | text | |
| Certifications | multi-select | e.g., OEKO-TEX, ISO — product/factory-level, distinct from the personal credentials Volume 1 §1.4 confirmed are *not* being used as a trust signal |
| Images | image[] | see spec below |
| Downloadable spec sheet | file | PDF |
| Price | **Decision: quote-on-request only, priced per buyer specification** — not a fixed per-SKU price. Consistent with Volume 1 §1.6 (lead-gen, no checkout), but more specific: catalogue products are a **starting reference/design**, and the actual quote depends on the buyer's fabric, trims, artwork, measurements, and styling choices (see §3.3 Specification Enquiry Form). This is a made-to-spec business, not an off-the-shelf price list. |

**Filters:** [TBD — likely category, size, color, fabric, certification, production type, markets served, MOQ range]

**Image specifications:** [TBD — dimensions, format, max size, required shots (front/back/detail)]

**Downloadable catalogue:** **Decision: gated behind lead form.** Confirmed as one of the three launch
conversion channels (Volume 1 §1.5). [TBD] per-category PDF vs. single full catalogue — likely per-category
given 5 distinct product divisions.

**Technical specification tables:** [TBD — per product, structured spec table vs. free text]

**Related products:** [TBD — logic: same category, frequently paired, cross-division]

**Inquiry workflow:** all three confirmed conversion channels apply per Volume 1 §1.5 — WhatsApp click-to-chat
and the gated catalogue download for casual browsing, and the **Specification Enquiry Form** (§3.3) as the
primary structured path, since pricing is spec-dependent rather than fixed. Every product page should also
surface the **samples/trial-order process** (Volume 1 §1.4 trust signal) as a concrete next step.
**Decision: multi-product enquiry list** — buyers can add several products (e.g., a full uniform program:
shirt + trouser + tie) to a list and submit one combined Specification request, rather than repeating the
form per product. Each item in the list still needs its own fabric/trims/artwork/measurements/styling detail
(§3.3), since specs differ per product even within one combined submission.

## 3.3 Specification Enquiry Form

**Decision:** because pricing is quote-per-specification (not a fixed catalogue price — see product schema
above), the core conversion path needs a dedicated, detailed form beyond the general Contact form
(Volume 2 §2.3). This form captures everything needed to produce an actual quote.

**Purpose:** capture a full custom-order specification so a real, spec-based quote can be produced —
this is the primary structured lead-capture mechanism for the catalogue (product pages route here).

**Structure: one submission, multiple line items.** Per the multi-product enquiry list decision (§3.1 per
category above), one form submission = shared contact/company details + one or more **line items**, each
with its own full spec. UI-wise, this is an "enquiry list" the buyer builds by adding products, then
submits once with shared contact info.

**Shared fields (once per submission):** name, company, email, mobile, country (baseline contact fields
from Volume 2 §2.3).

**Per-line-item fields (repeated for each product added to the list):**

| Field | Type | Required | Notes |
|---|---|---|---|
| Product / Category reference | ref or text | Yes | Which catalogue item this line item is based on, if any |
| Fabric | text / select | Yes | Composition, GSM, or "not sure — advise" option |
| Trims | text | No | Buttons, zippers, labels, etc. |
| Artwork | text + file | No | Logo/branding/print details — pairs with reference image upload below |
| Measurements | **text (free text)** | Yes | **Decision: free text for v1** — buyer describes measurements/sizing in their own words or attaches a spec sheet via reference-image upload. A structured per-category size chart is a possible future refinement, not needed for launch. |
| Styling | text | No | Cut, fit, design details |
| **Reference images** | file[], multiple | No | **Confirmed: buyers can upload reference images** (e.g., a photo of a garment/design they want matched). [TBD] accepted formats/max size/max count — likely same constraint family as Volume 2 §2.3 (image formats, size cap) |
| Quantity | number | Yes | For MOQ/pricing tier assessment |

**Validation:** [TBD — likely mirrors Volume 2 §2.3 baseline (required-field indicators, CAPTCHA, file
type/size limits) plus multi-file upload handling for reference images]

**Business Logic:** **Resolved (Volume 6):** creates a distinct Specification Request record (header +
per-product line items), which also attaches to a Lead for pipeline tracking (Volume 5 §5.3). This form is
used specifically on product/catalogue pages for buyers ready to request a quote — it does **not** replace
the general Contact form (Volume 2 §2.3), which remains the lower-friction path for exploratory enquiries
elsewhere on the site (Home, About, Consulting, general Contact page).

**Success/Error Messages:** [TBD exact copy] should state the confirmed **1-2 business day** turnaround
(Volume 4 §4.3/§4.4 decision, applies site-wide) as a concrete expectation, not vague "we'll be in touch"
language.

## 3.4 Open questions

- **Resolved:** multi-product enquiry list confirmed (§3.1, §3.3) — one submission can carry several
  line-item specs.
- **Resolved:** catalogue is small — **fewer than 100 products** at launch. No bulk CSV/Excel import needed
  for v1; manual entry through the Admin Portal (Volume 5) is sufficient. *(Carries into Volume 5 §5.2.)*
- **Deferred:** Factory/Partner record details (certifications, audit reports, capacity data) — content
  **to be added later**, not a launch blocker. Volume 3 §3.1 (Partner Factory Reference field) and Volume 6
  (Factory/Partner entity) should be built with this schema in mind so the fields exist and can be
  populated later, without needing a data-model change once the content is ready.
- [OPEN QUESTION] For Measurements in §3.3 — free text, or a structured size chart input? Likely varies by
  category (e.g., uniforms may need a size-run table; technical fabrics may not need "measurements" at all).
