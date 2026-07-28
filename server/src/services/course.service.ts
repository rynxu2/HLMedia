import { prisma } from "../config/db.js";

interface CreateCourseInput {
  name: string;
  description: string;
  instructor: string;
  price?: string;
  duration: string;
  lessons?: number;
  status?: string;
  category: string;
  thumbnail?: string;
  highlight?: boolean;
  topics?: string[];
  outcomes?: string[];
}

export async function createCourse(data: CreateCourseInput) {
  return prisma.course.create({ data });
}

interface ListCoursesQuery {
  status?: string;
  category?: string;
}

export async function listCourses(query: ListCoursesQuery & { page?: number; limit?: number }) {
  const where: Record<string, unknown> = {};
  if (query.status && query.status !== "all") where.status = query.status;
  if (query.category) where.category = query.category;
  const limit = Math.min(query.limit || 20, 100);
  const page = Math.max(query.page || 1, 1);
  return prisma.course.findMany({ where, orderBy: { createdAt: "desc" }, take: limit, skip: (page - 1) * limit });
}

export async function getCourseById(id: number) {
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) throw Object.assign(new Error("Khóa học không tồn tại"), { status: 404 });
  return course;
}

export async function updateCourse(id: number, data: Partial<CreateCourseInput>) {
  return prisma.course.update({ where: { id }, data });
}

export async function deleteCourse(id: number) {
  return prisma.course.delete({ where: { id } });
}
