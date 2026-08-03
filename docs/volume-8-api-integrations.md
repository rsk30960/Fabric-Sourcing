# Volume 8 — API & Integrations

> Status: **Mostly resolved.** WhatsApp (wa.me link), GA4, and Email (Resend) confirmed. CRM and ERP
> confirmed **not needed**. See [tech-stack.md](tech-stack.md) for the concrete provider choices. Remaining
> open: Meta Pixel/LinkedIn Insight Tag (pending ad-spend confirmation), Payment Gateway/Inventory/Shipping
> (deferred with e-commerce, Volume 1 §1.6).

## 8.1 Candidate integrations

For each, define: purpose, trigger events, data exchanged, priority (launch vs. future phase).

- [x] **WhatsApp click-to-chat** — **confirmed launch requirement** (Volume 1 §1.5 — one of three confirmed
  conversion channels). **Resolved (tech-stack.md): a simple `wa.me` deep link, not the full WhatsApp
  Business API** — no automation/multi-agent routing needed for solo operation. Priority: **launch**.
- [x] **Email (transactional)** — **Resolved: Resend** ([tech-stack.md](tech-stack.md)). Covers form
  confirmations, quote delivery (Volume 5 §5.7). Marketing/newsletter email is a separate, still-open
  question — not needed for launch.
- ~~**CRM**~~ — **Resolved: not needed.** Volume 5 §5.8 confirmed native CRM (Admin Portal is the system of
  record) — no external CRM integration for v1.
- [ ] **Payment Gateway** — only relevant if/when e-commerce is in scope (Volume 1 §1.6, currently deferred)
- ~~**ERP**~~ — **Resolved: no existing ERP.** Confirmed alongside the CRM answer (Volume 5 §5.8) —
  nothing in use today, starting fresh. No ERP integration needed.
- [ ] **Inventory** — relevant if product availability needs to be live (vs. catalogue being informational only)
- [ ] **Shipping** — relevant only alongside e-commerce/order fulfillment, deferred with it
- [x] **Google Analytics (GA4)** — **launch requirement.** Volume 1 §1.5 confirms zero existing lead
  channels — the site's organic performance must be measurable from day one.
- [ ] **Meta Pixel** — elevated priority: Volume 1 §1.5 flags paid channels as likely necessary to fill the
  gap while organic/SEO ramps up (starting from zero referral traffic). [TBD] confirm whether Meta ads are
  actually planned before building this in.
- [ ] **LinkedIn Insight Tag** — same rationale as Meta Pixel, and more directly aligned to the B2B/sourcing
  buyer persona (§1.4). [TBD] confirm whether LinkedIn ads are planned.

## 8.2 API design principles (once any integration is built)

- [TBD] REST vs. other; auth method for external calls; rate limiting; versioning approach
- [TBD] Webhook strategy if any third party needs to push data in (e.g., CRM status changes)

## 8.3 Open questions

- **Resolved:** no existing CRM, ERP, or email platform in use — confirmed starting fresh (Volume 5 §5.8).
  The Admin Portal (Volume 5) and its database (Volume 6) are authoritative for all business data; no
  external system to reconcile against. Email platform is now resolved too (Resend, above) — nothing left
  open in this section.
