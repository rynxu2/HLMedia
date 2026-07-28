import { prisma } from "../config/db.js";
import { slugify } from "../utils/slugify.js";

interface CreateBlogInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor?: string;
  tags?: string[];
  image?: string;
  readTime?: string;
  status?: string;
  authorId: number;
}

export async function createBlog(data: CreateBlogInput) {
  let slug = slugify(data.title);
  // Ensure unique slug
  const existing = await prisma.blog.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  return prisma.blog.create({
    data: {
      ...data,
      slug,
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });
}

interface ListBlogsQuery {
  status?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function listBlogs(query: ListBlogsQuery) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (query.status && query.status !== "all") where.status = query.status;
  if (query.category) where.category = query.category;

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { displayName: true } } },
    }),
    prisma.blog.count({ where }),
  ]);

  return { blogs, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { author: { select: { displayName: true } } },
  });
  if (!blog) throw Object.assign(new Error("Bài viết không tồn tại"), { status: 404 });

  // Increment view count
  await prisma.blog.update({ where: { slug }, data: { views: { increment: 1 } } });

  return blog;
}

export async function getBlogById(id: number) {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: { author: { select: { displayName: true } } },
  });
  if (!blog) throw Object.assign(new Error("Bài viết không tồn tại"), { status: 404 });
  return blog;
}

export async function updateBlog(id: number, data: Partial<CreateBlogInput>) {
  const updateData: Record<string, unknown> = { ...data };
  if (data.title) {
    let slug = slugify(data.title);
    const existing = await prisma.blog.findFirst({ where: { slug, id: { not: id } } });
    if (existing) slug = `${slug}-${Date.now()}`;
    updateData.slug = slug;
  }
  if (data.status === "published") updateData.publishedAt = new Date();
  return prisma.blog.update({ where: { id }, data: updateData });
}

export async function deleteBlog(id: number) {
  return prisma.blog.delete({ where: { id } });
}
