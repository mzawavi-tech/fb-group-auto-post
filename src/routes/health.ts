import { Router } from "express";
import { env } from "../config/env";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "fb-group-auto-post-api",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    timezone: env.APP_TIMEZONE,
    integrations: {
      metaPublishing: "not_configured",
      facebookGroups: "disabled_pending_capability_verification"
    }
  });
});
