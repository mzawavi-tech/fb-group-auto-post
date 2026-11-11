# Data Model — V1

Initial relational model; SQL migrations follow stack selection.

- **users:** id UUID PK, email unique, password_hash/external_auth_id, role, status, timestamps.
- **campaigns:** id, name, objective, product_or_service, audience, primary_pain_point, offer, CTA, status, created_by, timestamps.
- **content_posts:** id, campaign_id, title, body, language, tone, variant_key, media_asset_url, content_status, created_by, timestamps.
- **groups:** id, name, canonical_url unique, topic, country, state, district, group_rules, eligibility_status, approval_status, notes, timestamps.
- **publishing_connections:** id, provider, destination_type, status, capabilities_json, secret_reference, last_verified_at, timestamps.
- **scheduled_jobs:** id, campaign_id, content_post_id, group_id nullable, connection_id nullable, scheduled_at_utc, timezone, status, unique idempotency_key, attempts, max_attempts, last_error_code/message, external_post_id/url nullable, created_by, timestamps.
- **posting_attempts:** id, scheduled_job_id, attempt_number, started_at, finished_at, outcome, external_post_id/url nullable, error_code/message, correlation_id, adapter_version.
- **audit_logs:** id, actor_user_id nullable, entity_type, entity_id, action, before_json, after_json, created_at.

## Indexes and constraints
Unique groups.canonical_url and scheduled_jobs.idempotency_key; indexes on scheduled_jobs(status, scheduled_at_utc), posting_attempts(scheduled_job_id, attempt_number), and groups(state, district, approval_status, eligibility_status). External post identifiers/URLs are populated only after verified success.

## Data protection
Never store Facebook passwords or plaintext session cookies. Keep tokens outside normal tables using secret references. Redact secrets from logs/exports. Provide owner-managed export/deletion.
