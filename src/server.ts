import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { pool } from "./config/database";
import { healthRouter } from "./routes/health";
import { campaignsRouter } from "./routes/campaigns";

const logger = pino({ level: env.LOG_LEVEL });
const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"]
}));
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp({ logger }));

app.get("/", (_req, res) => {
  res.status(200).json({
    name: "fb-group-auto-post-api",
    version: "0.1.0",
    status: "running"
  });
});

app.use("/api/health", healthRouter);
app.use("/api/campaigns", campaignsRouter);

app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested endpoint does not exist."
    }
  });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error({ err: error }, "Unhandled request error");
  if (res.headersSent) return;
  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: env.NODE_ENV === "production" ? "An unexpected error occurred." : "An unexpected server error occurred."
    }
  });
};
app.use(errorHandler);

if (require.main === module) {
  const server = app.listen(env.PORT, env.HOST, () => {
    logger.info({ host: env.HOST, port: env.PORT }, "FB Group Auto Post API started");
  });

  const shutdown = (signal: string) => {
    logger.info({ signal }, "Shutdown requested");
    server.close((error) => {
      if (error) {
        logger.error({ err: error }, "Graceful shutdown failed");
        process.exitCode = 1;
      }
      void pool?.end();
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

export { app };
