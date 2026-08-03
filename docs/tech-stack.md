# Tech Stack Decision

> Not one of the 10 SRS volumes — this is the separate "Tech stack decision" tracked in the project
> [README](../README.md). Resolved once requirements stabilized, per that doc's original deferral note.

## Decided

| Layer | Choice | Why |
|---|---|---|
| Frontend framework | **Next.js** | Matches finrise-website (proven, already operated). Strong SSR/SSG support matters given Volume 1 §1.5 — the site is the primary discovery channel, so SEO can't be an afterthought. |
| Styling | **Tailwind CSS** | Matches finrise-website. |
| Backend / Database | **Supabase (Postgres)** | Matches finrise-website — [user memory] confirms comfort driving Supabase's dashboard/SQL Editor directly, which matters for a solo, non-dev-first operation. Postgres fits Volume 6's relational schema well (FKs, line items, soft/hard-delete via row flags + a real delete path). |
| Auth | **Supabase Auth, email/password only** | Matches Volume 7 §7.1's decision — no MFA, no SSO for v1 (solo operator, single admin account). |
| File storage | **Supabase Storage** | Handles Specification form reference images (Volume 3 §3.3), Careers resumes/portfolios (Volume 2 §2.12), product spec sheets, catalogue PDFs. Candidate resumes and buyer reference images should use **private buckets with signed URLs**, not public buckets — they're the sensitive-file categories flagged in Volume 7 §7.4. |
| WhatsApp | **Simple `wa.me` deep-link**, not the Business API | Volume 1/3 only specified click-to-chat, not automation/multi-agent routing. Zero setup cost, no Meta business verification needed — right-sized for solo operation. Revisit only if a real need for automated WhatsApp replies emerges later. |
| Transactional email | **Resend** | Pairs cleanly with a Next.js/Vercel-style deployment. Resolves Volume 8's previously open "Email platform choice" line. Handles form confirmations, quote delivery (Volume 5 §5.7). |
| CAPTCHA | **Cloudflare Turnstile** | Resolves Volume 2 §2.3's "provider TBD." Free, more privacy-friendly and less user-friction than reCAPTCHA's puzzle challenges — fits a B2B site where a genuine buyer shouldn't be annoyed out of submitting an enquiry. |
| Analytics | **GA4** (standard `gtag.js`) | Already confirmed launch-required, Volume 8 §8.1. No change — just noting the standard implementation approach (tag manager optional, not required for v1's scope). |
| Hosting | **Vercel (recommended default)** | Standard pairing for Next.js, zero-config deploys. **Not yet confirmed against where finrise-website is actually hosted** — worth a quick check/decision before scaffolding starts, since keeping both projects on the same host simplifies ops for a solo operator. |

## Consistency with finrise-website

finrise-website's `package.json` shows: Next.js 14 (Pages or App Router — [TBD] check which), plain
JavaScript (no TypeScript), React 18, `@supabase/supabase-js`, Tailwind 3, `lucide-react` for icons, no
CAPTCHA/email vendor visible in dependencies yet. Recommend IronShield mirror these choices (including
**plain JavaScript, not TypeScript**, and `lucide-react`) purely for consistency of operation across your
two projects, unless there's a reason to diverge — not raised as an open question since it's a low-stakes
default, but flagging the assumption here in case it's wrong.

## Still open (implementation-level, not launch-blocking)

- [TBD] Next.js App Router vs. Pages Router — check what finrise-website uses and match it
- [TBD] Confirm Vercel (or wherever finrise-website is actually hosted) as the IronShield host
- [TBD] Supabase project — new dedicated project for IronShield, not shared with finrise-website's (separate
  businesses, separate data — this should be a hard "yes, separate," but worth stating explicitly before
  scaffolding so nobody accidentally provisions tables in the wrong Supabase project)

## What this unblocks

- Volume 7 §7.4 (encryption at rest) — resolved by Supabase's default Postgres encryption at rest, no
  bespoke work needed
- Volume 7 §7.6 (backup/DR) — resolved by Supabase's built-in automated backups; [TBD] confirm backup
  frequency/retention on the chosen Supabase plan tier meets Volume 7's baseline expectation
- Volume 8's Email and CAPTCHA "provider TBD" items — both resolved above
- Codebase scaffolding (README checklist) — no longer blocked; stack is decided
