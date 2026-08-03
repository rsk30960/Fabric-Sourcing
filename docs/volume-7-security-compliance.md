# Volume 7 — Security & Compliance

> Status: **Partially resolved.** Auth (password-only, no MFA), RBAC priority (low for v1, solo op), and
> the compliance posture (multi-jurisdiction baseline approach, not 5 separate tracks) are settled. Still
> genuinely open: audit log retention, encryption-at-rest specifics (blocked on stack choice), backup/DR
> specifics (blocked on stack choice). Legal *content* stays out of scope here per Volume 2 §2.13 — real
> legal review needed before launch given the confirmed 5-market compliance exposure.

## 7.1 Authentication

- **Resolved: email/password only for v1, no MFA.** Solo operator, single admin account — revisit if/when
  a team is hired (Careers, Volume 2 §2.12) or the data handled grows more sensitive than it already is.
- [TBD] Customer portal auth — deferred until customer portal is in scope (Volume 1 §1.6)
- Session handling, password policy, account lockout: [TBD] — still worth basic hygiene (strong password
  requirement, lockout after repeated failures) even without MFA, since this single account guards real
  buyer/candidate personal data (§7.5).

## 7.2 Role-Based Access

- **Lower priority for v1 — solo operation (Volume 4 §4.7), effectively one Super Admin account today.**
  Full permission matrix isn't urgent yet, but worth designing the schema to support roles from the start
  (Volume 5 §5.6 draft roles) since Careers (Volume 2 §2.12) confirms freelancers will be brought on —
  RBAC becomes relevant sooner rather than later once that happens.
- [TBD] Permission matrix (role × module × read/write/delete) — defer detailed matrix until roles beyond
  Super Admin are actually needed, but don't hardcode single-user assumptions into the data model.

## 7.3 Audit Logs

- **Partially resolved:** given the confirmed multi-jurisdiction compliance posture (§7.5), audit logging
  isn't just an admin nicety — it's accountability evidence if a data-subject request or dispute ever needs
  to be shown as handled correctly. Should log at minimum: lead status changes, quote approvals, product
  edits, and **any data deletion/export request and its outcome** (§7.5, §6.2).
- [TBD] Retention period for audit logs
- **Resolved for now:** viewable by Super Admin only — the only role that meaningfully exists today
  (§7.2, solo operation).

## 7.4 Data Encryption

- **Resolved: TLS in transit is a non-negotiable baseline**, independent of hosting/stack choice.
- **Resolved: encryption at rest via Supabase's default Postgres encryption** ([tech-stack.md](tech-stack.md))
  — no bespoke work needed, confirmed as predicted here.
- **Sensitive fields needing attention beyond generic PII:** reference images and artwork files uploaded via
  the Specification form (Volume 3 §3.3) may contain buyer proprietary designs — treat with the same care as
  personal data even though it's not classic PII. Candidate resumes/portfolios (Volume 6 Candidates entity)
  similarly. **Resolved (tech-stack.md):** both use private Supabase Storage buckets with signed URLs, not
  public buckets. No payment/financial data in scope (Volume 1 §1.6), which keeps this simpler than a
  typical e-commerce site.

## 7.5 GDPR / International Compliance

**Resolved: confirmed target export markets are USA, EU, Middle East, Australia, New Zealand** (in addition
to the domestic India market — Volume 1 §1.6). This is a genuinely multi-jurisdiction spread, each with its
own (different, overlapping) privacy regime: GDPR (EU), various national laws (Middle East — e.g., UAE PDPL),
Privacy Act 1988/APPs (Australia), Privacy Act 2020 (New Zealand), a patchwork of state-level laws (USA),
and India's own DPDP Act 2023 as the home-jurisdiction baseline.

**Practical approach — build one strong general baseline rather than five separate compliance tracks:**
a consent-first cookie banner, a genuine data-subject access/deletion request mechanism, minimal data
collection (only what the forms in Volume 2/3 actually need), and a clear, honest privacy policy. This
reasonably serves most of these jurisdictions' common requirements at once, given this is a lead-gen B2B
site (no payment/financial data, Volume 1 §1.6) rather than a high-risk data processor.

**Important — not a substitute for real legal review.** Given five distinct jurisdictions, actual legal
compliance sign-off (especially GDPR, which has real enforcement teeth) should happen before or at launch —
consistent with Volume 2 §2.13's stance that legal page *content* isn't something to fabricate here.
This volume specifies functional requirements only; the Privacy Policy/Terms text itself still needs a
lawyer, not a generated placeholder.

**Concrete functional requirements (safe to build now):**
- [TBD] Consent management — cookie banner with genuine accept/decline, not a dark-pattern "accept only" UI
- **Data-subject access/deletion request mechanism** — **Resolved (Volume 6 §6.2):** soft-delete by default
  for day-to-day use, with a genuine hard-delete/anonymization path triggered specifically on an erasure
  request. Satisfies the "not just a soft-delete flag" concern raised here.
- [TBD] Data processing/retention documentation — what's collected, why, how long it's kept
- [TBD] Whether any target-market buyer might require a specific certification (e.g., factory
  audit/compliance cert) as a condition of doing business — this is a **product/sourcing question**
  (Volume 3 §3.4 Factory/Partner credentials), not a data-privacy one; noted here only to avoid conflating
  the two "compliance" meanings.

## 7.6 Backup & Disaster Recovery

- **Resolved: Supabase's built-in automated backups** ([tech-stack.md](tech-stack.md)) — confirmed as
  predicted here, no bespoke DR engineering needed for a solo-operator business at this scale. [TBD] confirm
  the specific backup frequency/retention on whichever Supabase plan tier is chosen actually meets the
  baseline expectation below.
- **Baseline expectation regardless of stack:** automated regular backups + at least one tested restore
  before launch. Not optional, but also not something to over-engineer given the scale.
- [TBD] RTO/RPO targets — likely loose (this isn't a high-availability transactional system), but worth a
  deliberate "how long could we be down before it actually hurts the business" conversation.

## 7.7 Application-level security (feeds into Volume 2 per-page specs)

- CAPTCHA/spam protection on all public forms (baseline requirement — see Volume 2 §2.3)
- Rate limiting on form submission and API endpoints
- File upload validation (type, size, virus scanning?) [TBD]
- Input sanitization / injection prevention (SQL, XSS) — standard baseline, not optional
