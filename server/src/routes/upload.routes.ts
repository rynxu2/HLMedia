import { Router, Request, Response, NextFunction } from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import * as cloudinaryService from "../services/cloudinary.service.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Chỉ chấp nhận file ảnh"));
  },
});

export const uploadRouter = Router();

uploadRouter.post("/", requireAuth, requireRole("admin"), upload.single("file"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Không tìm thấy file" });
      return;
    }
    const result = await cloudinaryService.uploadImage(req.file.buffer, req.file.originalname);
    res.json(result);
  } catch (err) { next(err); }
});
