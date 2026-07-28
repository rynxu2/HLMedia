import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { validate } from "../middleware/validation.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import * as authService from "../services/auth.service.js";

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Quá nhiều lần thử đăng nhập. Vui lòng đợi 15 phút." },
});

const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được trống"),
  password: z.string().min(1, "Mật khẩu không được trống"),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu phải có chữ hoa, chữ thường và số"),
});

authRouter.post("/login", loginLimiter, validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body.username, req.body.password);
    res.json(result);
  } catch (err) { next(err); }
});

authRouter.get("/me", requireAuth, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getMe(req.user!.userId);
    res.json({ user });
  } catch (err) { next(err); }
});

authRouter.patch("/password", requireAuth, validate(changePasswordSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await authService.changePassword(req.user!.userId, req.body.oldPassword, req.body.newPassword);
    res.json({ ok: true });
  } catch (err) { next(err); }
});
