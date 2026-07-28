import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import { leadRouter } from "./routes/lead.routes.js";
import { blogRouter } from "./routes/blog.routes.js";
import { courseRouter } from "./routes/course.routes.js";
import { uploadRouter } from "./routes/upload.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { prisma } from "./config/db.js";

const app = express();

// Security headers
app.use(helmet());

// Global rate limit: 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500, standardHeaders: true, legacyHeaders: false }));

// Middleware
const allowedOrigins = env.CORS_ORIGIN.split(",").map(s => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/leads", leadRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/courses", courseRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/dashboard", dashboardRouter);

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("[Error]", err.message);
    const status = "status" in err ? (err as { status: number }).status : 500;
    const message = status < 500 ? err.message : "Internal server error";
    res.status(status).json({ error: message });
  },
);

const server = app.listen(env.PORT, () => {
  console.log(`🚀 HL Media API running on http://localhost:${env.PORT}`);
  console.log(`📝 Environment: ${env.NODE_ENV}`);
});
server.timeout = 30000;
const shutdown = async () => {
  console.log("\n🛑 Shutting down gracefully...");
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default app;
