# FB Group Auto Post

Standalone system for campaign management, AI-assisted content, Facebook group directory, scheduling workflows, and verified posting-status tracking.

- **Status:** Backend foundation in progress
- **Target dashboard:** fbpost.referly.my (after DNS/TLS setup)
- **Infrastructure:** Reuse existing VPS; no new hosting purchase.
- **Isolation:** Separate deployment/database from Referly and GPTWORKPRO.

## Current API foundation
- Node.js 20+, TypeScript, Express
- Helmet security headers, CORS allowlist, structured request logging
- Environment validation with Zod
- JSON 404 and centralized error responses
- Health endpoint: `GET /api/health`
- Graceful shutdown on SIGTERM/SIGINT

## V1 modules
Dashboard/authentication; campaigns; AI content drafts; group directory and allowlist; scheduler and queue; duplicate prevention; bounded retries; posting history; audit logs; CSV export.

## Publishing guardrails
Use supported Meta interfaces and permissions where available. Keep group publishing disabled until a currently supported and permitted route is verified. Never bypass login challenges, CAPTCHA, checkpoints, rate limits, access controls, or group rules. Never claim success without verified destination confirmation.

## Documentation
- [V1 SRS](docs/SRS-V1.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data model](docs/DATA-MODEL.md)
- [Roadmap](docs/ROADMAP.md)
- [Development setup](docs/DEVELOPMENT.md)

## Development
See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). The code has not yet been built or run in a live runtime; deployment remains pending VPS inspection.
