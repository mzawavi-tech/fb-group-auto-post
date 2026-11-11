# System Architecture — V1

## Deployment
Independent application on existing VPS. No shared runtime, database schema, environment files, or deployment lifecycle with Referly/GPTWORKPRO.

- Dashboard/API: fbpost.referly.my after DNS/TLS configuration
- Isolated web service, worker, scheduler, and dedicated database
- Existing reverse proxy with dedicated virtual host
- No VPS/DNS changes are performed by this documentation commit.

## Components
1. Dashboard — campaigns, content, groups, schedules, queue, reports.
2. API — authentication, validation, business rules, CRUD.
3. AI content service — provider abstraction for drafting and variants.
4. Group registry — metadata, rules, allowlist, eligibility.
5. Scheduler — discovers due jobs and enqueues idempotently.
6. Queue/worker — processes jobs and records attempts.
7. Publishing adapter — capability discovery, validation, publishing, normalized result.
8. Audit/reporting — attempt history and exports.

## Adapter contract
- getCapabilities()
- getConnectionStatus()
- validateJob(job)
- publish(job)

Normalized outcomes: published, retryable_failure, permanent_failure, blocked, unsupported, needs_auth, needs_review.

Groups adapter is disabled by default until a supported and permitted publishing mechanism is verified. No evasion, checkpoint bypass, or reverse-engineered private endpoint.

## Job lifecycle
draft -> scheduled -> queued -> processing -> published  
processing -> retry_wait -> queued / failed / blocked / needs_review

Use cancellation for scheduled/queued jobs and a lease/lock for processing jobs.

## Reliability
Unique idempotency key per destination job; transactional job claim; bounded backoff for transient errors; configurable destination cooldowns; stop on security challenges/restrictions; secrets stored outside ordinary tables; redact logs; record adapter version and correlation ID.

## Technology direction
Node.js/TypeScript backend and responsive dashboard. Select concrete framework, queue, and database after inspecting VPS runtime and deployment conventions. Keep independent of Referly internals.
