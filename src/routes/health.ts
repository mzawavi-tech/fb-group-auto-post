import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "fb-group-auto-post-api",
    timestamp: new Date().toISOString(),
    timezone: process.env.APP_TIMEZONE ?? "Asia/Kuala_Lumpur",
    integrations: {
      metaPublishing: "not_configured",
      facebookGroups: "disabled_pending_capability_verification"
    }
  });
});
