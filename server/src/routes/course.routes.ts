import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "../middleware/validation.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import * as courseService from "../services/course.service.js";
import { parseId } from "../utils/parseId.js";
import { verifyToken } from "../utils/jwt.js";

export const courseRouter = Router();

const createCourseSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  instructor: z.string().min(1),
  price: z.string().optional(),
  duration: z.string().min(1),
  lessons: z.number().optional(),
  status: z.enum(["active", "draft", "ended"]).optional(),
  category: z.string().min(1),
  thumbnail: z.string().optional(),
  highlight: z.boolean().optional(),
  topics: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
});

const updateCourseSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  instructor: z.string().optional(),
  price: z.string().optional(),
  duration: z.string().optional(),
  lessons: z.number().optional(),
  status: z.enum(["active", "draft", "ended"]).optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
  highlight: z.boolean().optional(),
  topics: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field required" });

// Public: list active courses
courseRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Unauthenticated users can only see active courses
    let hasAuth = false;
    try {
      const header = req.headers.authorization;
      if (header?.startsWith("Bearer ")) {
        verifyToken(header.slice(7));
        hasAuth = true;
      }
    } catch {}
    const status = hasAuth ? ((req.query.status as string) || "all") : "active";
    const courses = await courseService.listCourses({
      status,
      category: req.query.category as string,
    });
    res.json(courses);
  } catch (err) { next(err); }
});

// Public: get course by id
courseRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.getCourseById(parseId(req.params.id));
    res.json(course);
  } catch (err) { next(err); }
});

// Admin: create course
courseRouter.post("/", requireAuth, requireRole("admin"), validate(createCourseSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) { next(err); }
});

// Admin: update course
courseRouter.patch("/:id", requireAuth, requireRole("admin"), validate(updateCourseSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await courseService.updateCourse(parseId(req.params.id), req.body);
    res.json(course);
  } catch (err) { next(err); }
});

// Admin: delete course
courseRouter.delete("/:id", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await courseService.deleteCourse(parseId(req.params.id));
    res.json({ ok: true });
  } catch (err) { next(err); }
});
