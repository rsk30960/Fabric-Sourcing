# Volume 10 — Testing

> Status: **Solid.** Test plan structure plus two fully worked examples (Specification Enquiry Form,
> Lead lifecycle) modeling how remaining per-screen test cases should be written. Cross-cutting areas
> expanded with concrete checks (currency correctness, data deletion, Candidates isolation). Test
> environment strategy and UAT owner resolved. Genuinely blocked: accessibility testing (waits on
> Volume 9), performance thresholds (waits on Volume 1 §1.7 NFR specifics).

## 10.1 Per-screen test template

For every screen/page (mirrors Volume 2 §2.1 template), produce:

- **Functional Test Cases** — does each documented behavior work as specified?
- **Validation Test Cases** — every validation rule in Volume 2 gets a positive and negative test
- **Negative Scenarios** — invalid input, network failure, server error, empty states
- **Performance Tests** — load time targets from Volume 1 §1.7 non-functional requirements
- **Browser Compatibility** — **Resolved default:** last 2 versions of Chrome, Safari, Firefox, Edge. Not a
  hard business requirement, just a sane default for a B2B site with no unusual browser constraints — revisit
  only if analytics later show meaningful traffic outside this matrix.
- **Mobile Testing** — **Resolved default:** test on iOS Safari + Android Chrome, at minimum 375px (small
  phone) and 768px (tablet) viewports. Mobile matters more than a typical B2B site here, since WhatsApp
  click-to-chat (Volume 1 §1.5) is a primary conversion channel and skews mobile-heavy by nature.
- **UAT Checklist** — **Resolved:** performed by the founder directly (solo operation, Volume 4 §4.7) —
  no separate QA/business-owner handoff needed for v1.

## 10.1a Worked example: Specification Enquiry Form (Volume 3 §3.3)

The highest-complexity form on the site (multi-line-item, file upload, feeds a two-table DB structure) —
worth a fully worked test case set as the template for other forms.

- **Functional:**
  - Single-product submission creates one Specification Request + one line item, attached to a new Lead
  - Multi-product submission (the confirmed "enquiry list" — Volume 3 §3.1) creates one Specification
    Request header with multiple line items, each with independent fabric/trims/artwork/measurements/styling
  - Submission correctly attaches to an existing Customer if the email matches a known contact, or creates
    a new Lead otherwise
- **Validation:**
  - Required fields enforced per line item: Fabric, Measurements, Quantity (Volume 3 §3.3)
  - Optional fields (Trims, Artwork, Styling, reference images) can be omitted without blocking submission
  - Reference image upload: correct file types accepted, oversized files rejected with a clear error
    (exact size/format limits still [TBD] in Volume 3 §3.3 — test cases finalize once that's set)
- **Negative Scenarios:**
  - Attempting submission with zero line items is blocked (at least one product required)
  - Network failure mid-multi-file-upload doesn't produce a corrupted/partial Specification Request
  - Invalid email format on shared contact fields is rejected before submission
- **Performance:** uploading several reference images (multi-file) doesn't meaningfully degrade page
  responsiveness — [TBD] concrete threshold, ties to Volume 1 §1.7's still-open performance targets
- **Browser/Mobile:** multi-file upload works correctly across the matrix above, including selecting from
  a mobile camera roll
- **UAT:** founder can view a submitted Specification Request in the Admin Portal exactly as submitted —
  all line items, all reference images, nothing dropped in transit

## 10.1b Worked example: Lead lifecycle (Volume 5 §5.3, Volume 4 §4.4)

- **Functional:**
  - New Lead created from any of the five sources (Contact Form, Specification Request, Consulting Enquiry,
    Sourcing Enquiry, Catalogue Download — Volume 6) starts at status **New**
  - A Sourcing/Consulting enquiry the founder judges incomplete transitions New → **Awaiting Clarification**
    (Volume 4 §4.4's confirmed conditional workflow), and the buyer's follow-up response is visibly attached
    to the same Lead, not lost as a separate untracked thread
  - Lead transitions Awaiting Clarification → Quoted once enough information exists to quote
  - Quoted → Won/Lost outcome is recorded and feeds Volume 5 §5.9 Analytics correctly
- **Negative:** a Lead stuck in Awaiting Clarification with no buyer response is still visible/trackable in
  the Admin Portal (doesn't silently disappear from the pipeline view)

## 10.2 Cross-cutting test areas (not page-specific)

- [ ] Lead capture → admin portal pipeline (end-to-end, across Volumes 2, 5, 6) — see §10.1b worked example
- [ ] Quotation workflow (Volume 4, 5, 6) end-to-end, including **currency correctness** (Volume 6): a
  domestic Lead's quote defaults to INR, an export Lead defaults to USD, and an EU-market Lead can be
  issued in EUR — verify the right default applies and can be overridden per quote
- [ ] **Data deletion** (Volume 6 §6.2, Volume 7 §7.5): a soft-deleted Lead/Customer/Specification
  Request/Candidate disappears from active Admin Portal views but remains recoverable; a hard-delete/
  anonymization request actually removes/scrubs PII while Volume 5 §5.9 aggregate analytics stay intact
  (not silently broken by the deletion)
- [ ] **Candidates isolation** (Volume 6): verify Careers applications never appear in Lead Management
  (§5.3) or pollute sales pipeline Analytics (§5.9) — they're a deliberately separate entity/module (§5.10)
- [ ] Role-based access control (Volume 7 §7.2) — **currently minimal scope**: solo operation means there's
  effectively one Super Admin role in practice for v1; this test area mostly matters once a second admin
  user (e.g., a hired freelancer, Volume 2 §2.12) actually exists — don't over-invest here yet
- [ ] Security testing — CAPTCHA/spam handling, file upload restrictions (both Specification form reference
  images, Volume 3 §3.3, and Careers resume/portfolio uploads, Volume 2 §2.12), injection attempts
  (Volume 7 §7.7)
- [ ] SEO validation — meta tags, structured data, sitemap correctness (Volume 2 SEO Requirements per page).
  Specifically verify Product structured data **omits a `price` field** (Volume 3 §3.1 — quote-only pricing,
  a price in schema markup would be actively wrong, not just missing)
- [ ] Integration testing for each item shipped from Volume 8 (launch-required: WhatsApp click-to-chat opens
  correctly from all three confirmed conversion surfaces — Volume 1 §1.5; GA4 events fire on all three
  conversion channels — Specification form submit, WhatsApp click, gated catalogue download)

## 10.3 Test environments

**Resolved: hard separation, not just a flag.** Given solo operation (Volume 4 §4.7), there's no QA team to
reliably catch "is this a real enquiry or a test submission" — recommend staging use genuinely separate
infrastructure rather than a shared database with an `is_test` flag: a distinct WhatsApp test number (not the
real click-to-chat number, Volume 8), a distinct test email inbox, and a distinct/filtered GA4 property so
staging traffic never pollutes real analytics (Volume 1 §1.5 — where analytics accuracy actually matters for
gauging SEO/acquisition performance) or, worse, a test submission never reaches the founder's real sales
inbox as if it were a genuine ₹10L/month-target lead (Volume 1 §1.2).

[TBD] Staging vs. production data parity specifics — depends on the (currently deferred) tech stack choice.

## 10.4 Open questions

- **Resolved:** UAT performed by the founder directly — solo operation, no separate business-owner/QA
  handoff exists to nominate someone else (§10.1 decision above).
- **Still blocked, not resolved:** accessibility audit sign-off and other compliance-driven testing
  requirements depend on Volume 9's WCAG target, which is itself blocked on visual identity/brand design
  (Volume 9 §9.9). Revisit once Volume 9 unblocks — this isn't neglected, it's a real dependency chain.
