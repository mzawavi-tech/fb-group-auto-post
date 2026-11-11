import { Router } from "express";
import { z } from "zod";
import { pool } from "../config/database";

export const campaignsRouter = Router();

const createCampaignSchema = z.object({
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000).optional().nullable(),
  timezone: z.string().trim().min(1).max(64).default("Asia/Kuala_Lumpur"),
  startsAt: z.string().datetime().optional().nullable(),
  endsAt: z.string().datetime().optional().nullable()
}).refine((value) => {
  if (!value.startsAt || !value.endsAt) return true;
  return new Date(value.endsAt) > new Date(value.startsAt);
}, { message: "endsAt must be later than startsAt", path: ["endsAt"] });

const updateCampaignSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  description: z.string().trim().max(5000).optional().nullable(),
  status: z.enum(["draft", "active", "paused", "archived"]).optional(),
  timezone: z.string().trim().min(1).max(64).optional(),
  startsAt: z.string().datetime().optional().nullable(),
  endsAt: z.string().datetime().optional().nullable()
}).refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required"
});

function requireDatabase(res: import("express").Response): boolean {
  if (pool) return true;
  res.status(503).json({
    error: {
      code: "DATABASE_NOT_CONFIGURED",
      message: "Campaign storage is unavailable until DATABASE_URL is configured."
    }
  });
  return false;
}

campaignsRouter.get("/", async (req, res, next) => {
  if (!requireDatabase(res)) return;
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const offset = Math.max(Number(req.query.offset) || 0, 0);
    const status = req.query.status;
    if (status && !["draft", "active", "paused", "archived"].includes(String(status))) {
      res.status(400).json({ error: { code: "INVALID_STATUS", message: "Unsupported campaign status." } });
      return;
    }
    const values: unknown[] = [];
    let where = "";
    if (status) {
      values.push(status);
      where = "WHERE status = $1";
    }
    values.push(limit, offset);
    const result = await pool!.query(
      `SELECT id, name, description, status, timezone, starts_at AS "startsAt",
              ends_at AS "endsAt", created_at AS "createdAt", updated_at AS "updatedAt"
       FROM campaigns ${where}
       ORDER BY updated_at DESC
       LIMIT $${values.length - 1} OFFSET $${values.length}`,
      values
    );
    res.json({ data: result.rows, pagination: { limit, offset, count: result.rowCount } });
  } catch (error) {
    next(error);
  }
});

campaignsRouter.post("/", async (req, res, next) => {
  if (!requireDatabase(res)) return;
  const parsed = createCampaignSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", details: parsed.error.flatten() } });
    return;
  }
  try {
    const value = parsed.data;
    const result = await pool!.query(
      `INSERT INTO campaigns (name, description, timezone, starts_at, ends_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, status, timezone, starts_at AS "startsAt",
                 ends_at AS "endsAt", created_at AS "createdAt", updated_at AS "updatedAt"`,
      [value.name, value.description ?? null, value.timezone, value.startsAt ?? null, value.endsAt ?? null]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

campaignsRouter.get("/:id", async (req, res, next) => {
  if (!requireDatabase(res)) return;
  if (!z.string().uuid().safeParse(req.params.id).success) {
    res.status(400).json({ error: { code: "INVALID_ID", message: "Campaign id must be a UUID." } });
    return;
  }
  try {
    const result = await pool!.query(
      `SELECT id, name, description, status, timezone, starts_at AS "startsAt",
              ends_at AS "endsAt", created_at AS "createdAt", updated_at AS "updatedAt"
       FROM campaigns WHERE id = $1`,
      [req.params.id]
    );
    if (!result.rowCount) {
      res.status(404).json({ error: { code: "CAMPAIGN_NOT_FOUND", message: "Campaign not found." } });
      return;
    }
    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

campaignsRouter.patch("/:id", async (req, res, next) => {
  if (!requireDatabase(res)) return;
  if (!z.string().uuid().safeParse(req.params.id).success) {
    res.status(400).json({ error: { code: "INVALID_ID", message: "Campaign id must be a UUID." } });
    return;
  }
  const parsed = updateCampaignSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", details: parsed.error.flatten() } });
    return;
  }
  try {
    const fields: Record<string, unknown> = parsed.data;
    const columns: Record<string, string> = {
      name: "name", description: "description", status: "status", timezone: "timezone",
      startsAt: "starts_at", endsAt: "ends_at"
    };
    const values: unknown[] = [];
    const assignments = Object.entries(fields).map(([key, value]) => {
      values.push(value);
      return `${columns[key]} = $${values.length}`;
    });
    values.push(req.params.id);
    const result = await pool!.query(
      `UPDATE campaigns SET ${assignments.join(", ")}, updated_at = NOW()
       WHERE id = $${values.length}
       RETURNING id, name, description, status, timezone, starts_at AS "startsAt",
                 ends_at AS "endsAt", created_at AS "createdAt", updated_at AS "updatedAt"`,
      values
    );
    if (!result.rowCount) {
      res.status(404).json({ error: { code: "CAMPAIGN_NOT_FOUND", message: "Campaign not found." } });
      return;
    }
    res.json({ data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

campaignsRouter.delete("/:id", async (req, res, next) => {
  if (!requireDatabase(res)) return;
  if (!z.string().uuid().safeParse(req.params.id).success) {
    res.status(400).json({ error: { code: "INVALID_ID", message: "Campaign id must be a UUID." } });
    return;
  }
  try {
    const result = await pool!.query("DELETE FROM campaigns WHERE id = $1 RETURNING id", [req.params.id]);
    if (!result.rowCount) {
      res.status(404).json({ error: { code: "CAMPAIGN_NOT_FOUND", message: "Campaign not found." } });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
