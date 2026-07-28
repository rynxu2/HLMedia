import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.js";
import { prisma } from "../config/db.js";

export function requireRole(...roles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { role: true },
    });
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
}
