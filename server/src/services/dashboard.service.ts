import { prisma } from "../config/db.js";

export async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(startOfToday);
  yesterday.setDate(yesterday.getDate() - 1);

  const [totalLeads, monthLeads, todayLeads, yesterdayLeads, totalBlogs, draftBlogs, totalCourses, activeCourses] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.lead.count({ where: { createdAt: { gte: yesterday, lt: startOfToday } } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "draft" } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: "active" } }),
    ]);

  return [
    { label: "Tổng Lead", value: String(totalLeads), delta: `+${monthLeads} tháng này` },
    { label: "Lead mới hôm nay", value: String(todayLeads), delta: `+${todayLeads - yesterdayLeads} so với hôm qua` },
    { label: "Bài viết Blog", value: String(totalBlogs), delta: `${draftBlogs} bài chờ duyệt` },
    { label: "Khóa học", value: String(totalCourses), delta: `${activeCourses} đang hoạt động` },
  ];
}

export async function getRecentLeads() {
  return prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, phone: true, service: true, status: true, createdAt: true },
  });
}

export async function getRecentActivity() {
  const [recentLeads, recentBlogs] = await Promise.all([
    prisma.lead.findMany({ take: 3, orderBy: { createdAt: "desc" }, select: { name: true, service: true, createdAt: true } }),
    prisma.blog.findMany({ take: 3, orderBy: { updatedAt: "desc" }, select: { title: true, status: true, updatedAt: true } }),
  ]);

  const activities = [
    ...recentLeads.map((l) => ({
      type: "lead" as const,
      text: `Lead mới: ${l.name} — ${l.service || "Chưa chọn dịch vụ"}`,
      time: l.createdAt,
    })),
    ...recentBlogs.map((b) => ({
      type: "blog" as const,
      text: `Blog ${b.status === "published" ? "đã xuất bản" : "cập nhật"}: ${b.title}`,
      time: b.updatedAt,
    })),
  ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);

  return activities;
}
