import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3100),
  HOST: z.string().default("127.0.0.1"),
  APP_TIMEZONE: z.string().default("Asia/Kuala_Lumpur"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  LOG_LEVEL: z.string().default("info"),
  DATABASE_URL: z.string().url().optional(),
  DB_POOL_MAX: z.coerce.number().int().min(1).max(30).default(10),
  DATABASE_SSL: z.enum(["true", "false"]).default("false").transform((value) => value === "true")
});

export const env = envSchema.parse(process.env);
