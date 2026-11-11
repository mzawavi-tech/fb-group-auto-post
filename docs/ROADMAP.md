# Implementation Roadmap — V1

## Milestone 0 — Baseline
- [x] Dedicated repository created
- [x] V1 requirements and architecture baseline
- [x] Existing VPS reuse and application isolation recorded

## Milestone 1 — Foundation
- [x] Initial Node.js 20+ / TypeScript / Express API scaffold committed
- [x] Environment example and TypeScript configuration
- [x] Basic API health endpoint
- [x] Development setup guide
- [ ] Inspect VPS runtime, reverse proxy, database, and deployment conventions
- [ ] Install dependencies and run typecheck/build in a real runtime
- [ ] Select and implement production database
- [ ] Authentication and owner role
- [ ] Dashboard shell/navigation

## Milestone 2 — Campaign/content
- [ ] Campaign CRUD
- [ ] AI provider abstraction and prompts
- [ ] Draft generation, variants, editing, approval
- [ ] Media asset references

## Milestone 3 — Group registry
- [ ] Group CRUD and CSV import/export
- [ ] State/district/topic categorization
- [ ] Rules and eligibility review
- [ ] Allowlist and destination readiness

## Milestone 4 — Scheduler/queue
- [ ] Timezone-aware scheduler
- [ ] Queue worker and job leases
- [ ] Idempotency and duplicate prevention
- [ ] Bounded retries and cancellation
- [ ] Attempt history and audit log

## Milestone 5 — Publishing integration
- [ ] Verify current Meta products, permissions, app review, destination support
- [ ] Implement supported adapters only
- [ ] Keep unsupported group publishing disabled
- [ ] Separately assess browser feasibility; never bypass security controls

## Milestone 6 — Deployment
- [ ] Configure fbpost.referly.my DNS
- [ ] Configure HTTPS reverse proxy
- [ ] Deploy isolated app, worker, scheduler, database
- [ ] Backups, monitoring, log redaction
- [ ] Acceptance tests and handover

Definition of done: code committed, tests pass, deployment documented, result verified. Never mark a job published without verified destination confirmation.

**Current note:** The API scaffold is committed but has not yet been installed, built, or run in a runtime. VPS inspection is still required before production configuration.
