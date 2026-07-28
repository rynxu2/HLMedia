import { Router, Request, Response, NextFunction } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import * as dashboardService from "../services/dashboard.service.js";

export const dashboardRouter = Router();

dashboardRouter.get("/stats", requireAuth, requireRole("admin"), async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await dashboardService.getStats();
    res.json(stats);
  } catch (err) { next(err); }
});

dashboardRouter.get("/recent-leads", requireAuth, requireRole("admin"), async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await dashboardService.getRecentLeads();
    res.json(leads);
  } catch (err) { next(err); }
});

dashboardRouter.get("/activity", requireAuth, requireRole("admin"), async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const activity = await dashboardService.getRecentActivity();
    res.json(activity);
  } catch (err) { next(err); }
});
