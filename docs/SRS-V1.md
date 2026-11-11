# Software Requirements Specification — V1

**Version:** 1.0 — approved baseline  
**Date:** 12 November 2026

## Purpose
Central dashboard to manage campaigns, AI-assisted content, eligible Facebook groups, scheduled publishing jobs, and verified outcomes using existing VPS infrastructure.

## Goals
- Centralize campaign, group, content, scheduling, and history.
- Reduce repetitive campaign preparation.
- Prevent duplicate jobs and preserve an audit trail.
- Support only destinations and publishing methods currently available and permitted.

## V1 scope
- Secure owner authentication and operator role.
- Dashboard for campaigns, queue, outcomes, and upcoming jobs.
- Campaign CRUD: objective, product/service, audience, offer, CTA, status.
- AI-assisted copy drafting, language/tone variants, editing, approval.
- Group directory: name, URL, topic, state, district, rules, eligibility, approval, notes.
- Group allowlist and destination settings.
- Scheduler; default timezone Asia/Kuala_Lumpur.
- Queue states: draft, scheduled, queued, processing, published, failed, blocked, needs_review, cancelled.
- Idempotency, duplicate checks, bounded retries for transient failures.
- Audit trail and CSV export.
- Adapter capability and permission status.

## Out of scope
Mass unsolicited/high-frequency posting; scraping private group content or member lists; bypassing security controls, CAPTCHA, checkpoints, rate limits, or platform restrictions; plaintext password/cookie storage; false success reporting; public multi-tenant SaaS billing.

## Publishing integration
1. Prefer official Meta interfaces and permissions where the destination is supported.
2. Verify current products, permissions, app review, and destination capability before implementation.
3. Keep a Groups adapter disabled until a supported and permitted publishing path is verified.
4. Any browser feasibility prototype requires separate risk review and explicit owner opt-in; stop on CAPTCHA, checkpoint, account restriction, or unexpected security prompts.
5. Never silently fall back from unsupported API to browser automation.
6. UI distinguishes supported, unsupported, not configured, pending verification, and failed.

## Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Secure owner sign-in | Must |
| FR-02 | Campaign management | Must |
| FR-03 | Generate/edit AI drafts | Must |
| FR-04 | Group CRUD/import | Must |
| FR-05 | Approve eligible groups | Must |
| FR-06 | Schedule jobs for eligible destinations | Must |
| FR-07 | Timezone-aware scheduler | Must |
| FR-08 | Record verified worker outcome | Must |
| FR-09 | Idempotency prevents duplicates | Must |
| FR-10 | Bounded transient retries | Must |
| FR-11 | Pause/resume/cancel queued jobs | Must |
| FR-12 | View/export history | Should |
| FR-13 | Adapter capability reporting | Must |

## Non-functional requirements
Isolated deployment/database from Referly and GPTWORKPRO; HTTPS; secure sessions and authorization; secrets outside source control and logs; restart-safe queue; structured redacted logs; backups, retention, and health checks.

## Acceptance criteria
Create campaign and draft; register group and eligibility; schedule job; worker records verified success or explicit blocked/unsupported state; rerun does not duplicate; no secrets in Git/logs; unsupported destinations never show as published.

## Decisions
Reuse existing VPS; target fbpost.referly.my subject to DNS/reverse proxy; timezone Asia/Kuala_Lumpur; separate repo/deployment; implement dashboard/content/group/scheduler foundation before live publishing.
