import { prisma } from "../config/db.js";
import { notifyNewLead } from "./notification.service.js";

interface CreateLeadInput {
  name: string;
  phone: string;
  service?: string;
  industry?: string;
  message?: string;
  source?: string;
}

export async function createLead(data: CreateLeadInput) {
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      phone: data.phone,
      service: data.service || null,
      industry: data.industry || null,
      message: data.message || null,
      source: data.source || "contact",
    },
  });

  // Send notifications async (don't block response)
  notifyNewLead(lead).catch((err) => console.error("Notification error:", err));

  return lead;
}

interface ListLeadsQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export async function listLeads(query: ListLeadsQuery) {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (query.status && query.status !== "all") where.status = query.status;
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search } },
      { service: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.lead.count({ where }),
  ]);

  return { leads, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function getLeadById(id: number) {
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) throw Object.assign(new Error("Lead không tồn tại"), { status: 404 });
  return lead;
}

export async function updateLeadStatus(id: number, status: string) {
  const allowed = ["new", "contacted", "converted", "closed"];
  if (!allowed.includes(status)) throw Object.assign(new Error("Trạng thái không hợp lệ"), { status: 400 });
  return prisma.lead.update({ where: { id }, data: { status } });
}

export async function deleteLead(id: number) {
  return prisma.lead.delete({ where: { id } });
}

export async function exportLeadsCsv(query?: { search?: string; status?: string }) {
  const where: Record<string, unknown> = {};
  if (query?.status && query.status !== "all") where.status = query.status;
  if (query?.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search } },
      { service: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 10000 });
  const escapeCsv = (val: unknown) => {
    const str = String(val ?? "");
    return `"${str.replace(/"/g, '""')}"`;
  };
  const header = "ID,Tên,SĐT,Dịch vụ,Ngành hàng,Tin nhắn,Nguồn,Trạng thái,Ngày tạo";
  const rows = leads.map((l) =>
    [l.id, l.name, l.phone, l.service || "", l.industry || "", l.message || "", l.source, l.status, l.createdAt.toISOString()].map(escapeCsv).join(",")
  );
  return [header, ...rows].join("\n");
}
