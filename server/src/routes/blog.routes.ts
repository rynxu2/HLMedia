import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "../middleware/validation.js";
import { requireAuth, AuthRequest } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";
import * as blogService from "../services/blog.service.js";
import { parseId } from "../utils/parseId.js";
import { verifyToken } from "../utils/jwt.js";

export const blogRouter = Router();

const createBlogSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(1000),
  content: z.string().min(1).max(500000),
  category: z.string().min(1),
  categoryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  readTime: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const updateBlogSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).max(500000).optional(),
  category: z.string().optional(),
  categoryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  readTime: z.string().optional(),
  status: z.enum(["draft", "published"]).optional(),
}).refine(data => Object.keys(data).length > 0, { message: "At least one field required" });

// Public: list published blogs
blogRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Unauthenticated users can only see published blogs
    let hasAuth = false;
    try {
      const header = req.headers.authorization;
      if (header?.startsWith("Bearer ")) {
        verifyToken(header.slice(7));
        hasAuth = true;
      }
    } catch {}
    const status = hasAuth ? ((req.query.status as string) || "all") : "published";
    const result = await blogService.listBlogs({
      status,
      category: req.query.category as string,
      page: Number(req.query.page) || 1,
      limit: Math.min(Number(req.query.limit) || 20, 100),
    });
    res.json(result);
  } catch (err) { next(err); }
});

// Public: get blog by id
blogRouter.get("/id/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await blogService.getBlogById(parseId(req.params.id));
    res.json(blog);
  } catch (err) { next(err); }
});

// Public: get blog by slug
blogRouter.get("/:slug", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug as string);
    res.json(blog);
  } catch (err) { next(err); }
});

// Admin: create blog
blogRouter.post("/", requireAuth, requireRole("admin"), validate(createBlogSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const blog = await blogService.createBlog({ ...req.body, authorId: req.user!.userId });
    res.status(201).json(blog);
  } catch (err) { next(err); }
});

// Admin: update blog
blogRouter.patch("/:id", requireAuth, requireRole("admin"), validate(updateBlogSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await blogService.updateBlog(parseId(req.params.id), req.body);
    res.json(blog);
  } catch (err) { next(err); }
});

// Admin: delete blog
blogRouter.delete("/:id", requireAuth, requireRole("admin"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await blogService.deleteBlog(parseId(req.params.id));
    res.json({ ok: true });
  } catch (err) { next(err); }
});
