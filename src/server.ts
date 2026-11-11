import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";
import pinoHttp from "pino-http";
import { healthRouter } from "./routes/health";

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });
const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN ?? "http://localhost:5173").split(",") }));
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp({ logger }));

app.get("/", (_req, res) => {
  res.json({ name: "fb-group-auto-post-api", version: "0.1.0", status: "running" });
});
app.use("/api/health", healthRouter);

const port = Number(process.env.PORT ?? 3100);
const host = process.env.HOST ?? "127.0.0.1";

app.listen(port, host, () => {
  logger.info({ host, port }, "FB Group Auto Post API started");
});
