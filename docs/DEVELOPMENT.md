# Local Development

## Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 14+ (for campaign storage)

## Setup
```bash
npm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to a dedicated PostgreSQL database. Keep credentials out of Git and chat messages.

Run the initial schema migration:
```bash
npm run db:migrate
```

Start the API:
```bash
npm run dev
```

Health check: `GET http://127.0.0.1:3100/api/health`

## Campaign API
- `GET /api/campaigns?limit=20&offset=0`
- `POST /api/campaigns`
- `GET /api/campaigns/:id`
- `PATCH /api/campaigns/:id`
- `DELETE /api/campaigns/:id`

Example create payload:
```json
{
  "name": "Campaign November",
  "description": "First campaign draft",
  "timezone": "Asia/Kuala_Lumpur"
}
```

Campaign storage returns HTTP 503 until `DATABASE_URL` is configured. The health endpoint reports database state without exposing credentials.

## Scripts
- `npm run dev` — development server
- `npm run typecheck` — TypeScript validation
- `npm run build` — production build
- `npm start` — run compiled server
- `npm run db:migrate` — apply database migrations

## Notes
Authentication, dashboard, group registry, queue, scheduler, and publishing adapters are not implemented yet. Do not expose the development server publicly. Production host/bind settings must be chosen after inspecting the target VPS and reverse proxy.
