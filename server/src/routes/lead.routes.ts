import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { validate } from "../middleware/validation.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import * as leadService from "../services/lead.service.js";
import { parseId } from "../utils/parseId.js";

export const leadRouter = Router();

const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { error: "Vui lòng đợi trước khi gửi lại form." },
});

const createLeadSchema = z.object({
  name: z.string().min(1, "Họ tên không được trống"),
  phone: z.string().regex(/^[0-9+\-\s()]{8,15}$/, "Số điện thoại không hợp lệ"),
  service: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

const updateLeadSchema = z.object({
  status: z.enum(["new", "contacted", "converted", "closed"]).optional(),
  name: z.string().min(1).optional(),
  phone: z.string().regex(/^[0-9+\-\s()]{8,15}$/, "Số điện thoại không hợp lệ").optional(),
  service: z.string().optional(),
  industry: z.string().optional(),
  message: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field required" });

// Public: create lead from contact/consultation forms
leadRouter.post("/", leadLimiter, validate(createLeadSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json(lead);
  } catch (err) { next(err); }
});

// Admin: list leads
leadRouter.get("/", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await leadService.listLeads({
      search: req.query.search as string,
      status: req.query.status as string,
      page: Number(req.query.page) || 1,
      limit: Math.min(Number(req.query.limit) || 20, 100),
    });
    res.json(result);
  } catch (err) { next(err); }
});

// Admin: export CSV
leadRouter.get("/export/csv", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, status } = req.query as { search?: string; status?: string };
    const csv = await leadService.exportLeadsCsv({ search, status });
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
    res.send("\uFEFF" + csv); // BOM for Excel UTF-8
  } catch (err) { next(err); }
});

// Admin: get lead by id
leadRouter.get("/:id", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.getLeadById(parseId(req.params.id));
    res.json(lead);
  } catch (err) { next(err); }
});

// Admin: update lead status
leadRouter.patch("/:id", requireAuth, requireRole("admin"), validate(updateLeadSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await leadService.updateLeadStatus(parseId(req.params.id), req.body.status);
    res.json(lead);
  } catch (err) { next(err); }
});

// Admin: delete lead
leadRouter.delete("/:id", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await leadService.deleteLead(parseId(req.params.id));
    res.json({ ok: true });
  } catch (err) { next(err); }
});
