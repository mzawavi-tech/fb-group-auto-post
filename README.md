# FB Group Auto Post

Standalone system for campaign management, AI-assisted content, Facebook group directory, scheduling workflows, and verified posting-status tracking.

- **Status:** API foundation and first Campaign Management endpoints committed
- **Target dashboard:** fbpost.referly.my (after DNS/TLS setup)
- **Infrastructure:** Reuse existing VPS; no new hosting purchase.
- **Isolation:** Separate deployment/database from Referly and GPTWORKPRO.

## Current API foundation
- Node.js 20+, TypeScript, Express
- Helmet security headers, CORS allowlist, structured request logging
- Zod environment validation
- PostgreSQL connection pool and initial schema migration
- Campaign CRUD API with input validation
- JSON 404, centralized error responses, graceful shutdown
- Health endpoint with database readiness status

## Campaign endpoints
- `GET /api/campaigns`
- `POST /api/campaigns`
- `GET /api/campaigns/:id`
- `PATCH /api/campaigns/:id`
- `DELETE /api/campaigns/:id`

See [Development setup](docs/DEVELOPMENT.md) for configuration and examples.

## Publishing guardrails
Use supported Meta interfaces and permissions where available. Keep group publishing disabled until a currently supported and permitted route is verified. Never bypass login challenges, CAPTCHA, checkpoints, rate limits, access controls, or group rules. Never claim success without verified destination confirmation.

## Documentation
- [V1 SRS](docs/SRS-V1.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data model](docs/DATA-MODEL.md)
- [Roadmap](docs/ROADMAP.md)
- [Development setup](docs/DEVELOPMENT.md)

**Verification status:** Changes are committed to GitHub, but installation, typecheck, build, database migration, and runtime tests are still pending in a real Node.js/PostgreSQL environment.
