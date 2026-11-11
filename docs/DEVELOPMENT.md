# Local Development

## Prerequisites
- Node.js 20+
- npm 10+

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

Health check: `GET http://127.0.0.1:3100/api/health`

## Scripts
- `npm run dev` — development server
- `npm run typecheck` — TypeScript validation
- `npm run build` — production build
- `npm start` — run compiled server

## Notes
This is the initial API foundation only. Database, authentication, frontend, queue, scheduler, and publishing adapters are not implemented yet. Do not expose the development server publicly. Production host/bind settings must be chosen after inspecting the target VPS and reverse proxy.
