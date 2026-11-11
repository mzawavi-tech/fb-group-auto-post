import { Router } from "express";
import { env } from "../config/env";
import { checkDatabase } from "../config/database";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const database = await checkDatabase();
  const healthy = database !== "unavailable";
  res.status(healthy ? 200 : 503).json({
    status: healthy ? "ok" : "degraded",
    service: "fb-group-auto-post-api",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    timezone: env.APP_TIMEZONE,
    database,
    integrations: {
      metaPublishing: "not_configured",
      facebookGroups: "disabled_pending_capability_verification"
    }
  });
});
