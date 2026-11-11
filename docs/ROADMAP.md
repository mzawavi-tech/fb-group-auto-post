# Implementation Roadmap — V1

## Milestone 0 — Baseline
- [x] Dedicated repository created
- [x] V1 requirements and architecture baseline
- [x] Existing VPS reuse and application isolation recorded

## Milestone 1 — API and data foundation
- [x] Node.js 20+ / TypeScript / Express API scaffold
- [x] Zod environment validation wired into server startup
- [x] CORS allowlist, Helmet security headers, structured request logging
- [x] JSON 404, centralized error response, graceful shutdown
- [x] Health endpoint with database readiness
- [x] PostgreSQL connection pool configuration
- [x] Initial PostgreSQL schema and migration runner
- [x] Campaign CRUD endpoints with request validation
- [ ] Generate and commit npm lockfile
- [ ] Run install, typecheck, build, migration, and endpoint smoke tests in a real runtime
- [ ] Inspect VPS runtime, reverse proxy, database, and deployment conventions
- [ ] Authentication and owner role

## Milestone 2 — Campaign/content
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

**Current note:** API and initial database files are committed, but have not yet been installed, built, or run in a real runtime. VPS inspection and runtime verification remain pending.
