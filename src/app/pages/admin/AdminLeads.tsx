import { useState, useEffect, useCallback } from "react";
import { leadApi } from "../../lib/api";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, Download, Eye, Phone, Mail, X, ChevronDown, Clock, User, Briefcase, Loader2, AlertCircle } from "lucide-react";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

type Status = "new" | "contacted" | "converted" | "closed";

interface Lead {
  id: number;
  name: string;
  phone: string;
  service: string;
  industry: string;
  message: string;
  source: string;
  status: Status;
  created_at: string;
  updated_at: string;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const statusConfig: Record<Status, { label: string; color: string; bg: string }> = {
  new:       { label: "Mới",        color: "#1877f2", bg: "#e8f0fe" },
  contacted: { label: "Đã liên hệ", color: "#f59e0b", bg: "#fef9c3" },
  converted: { label: "Đã chốt",    color: "#10b981", bg: "#ecfdf5" },
  closed:    { label: "Đã đóng",    color: "#5a6a85", bg: "#f4f6fb" },
};



export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await leadApi.list({ search: search || undefined, status: filterStatus !== 'all' ? filterStatus : undefined, page, limit: 20 });
      setLeads(res.data ?? []);
      setTotal(res.total ?? 0);
    } catch (err: any) {
      console.error("Failed to fetch leads:", err);
      setError(err.message || 'Không thể tải danh sách lead');
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const updateStatus = async (id: number, status: Status) => {
    setSaving(true);
    try {
      await leadApi.update(id, { status });
      if (selected?.id === id) setSelected(s => s ? { ...s, status } : s);
      await fetchLeads();
    } catch (err: any) {
      console.error("Failed to update status:", err);
      setError(err.message || 'Thay đổi trạng thái thất bại');
    } finally {
      setSaving(false);
    }
  };

  const deleteLead = async (id: number) => {
    setSaving(true);
    try {
      await leadApi.delete(id);
      if (selected?.id === id) setSelected(null);
      await fetchLeads();
    } catch (err: any) {
      console.error("Failed to delete lead:", err);
      setError(err.message || 'Xoá thất bại');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {saving && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white border border-[#e8edf7] shadow-xl rounded-xl px-4 py-3 text-sm text-[#0d1b2a]" style={{ fontFamily: F }}>
          <Loader2 size={15} className="animate-spin text-[#1877f2]" /> Đang lưu...
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.7rem", fontWeight: 800 }}>Lead khách hàng</h1>
          <p className="text-[#5a6a85] text-sm mt-0.5" style={{ fontFamily: F }}>{total} lead tổng cộng</p>
        </div>
        <button onClick={async () => {
            try {
              const allLeads = await leadApi.exportAll({ search: search || undefined, status: filterStatus !== 'all' ? filterStatus : undefined });
              const headers = ['ID', 'Họ tên', 'SĐT', 'Dịch vụ', 'Ngành hàng', 'Tin nhắn', 'Nguồn', 'Trạng thái', 'Ngày tạo', 'Ngày cập nhật'];
              const rows = allLeads.map((l: any) => [l.id, l.name, l.phone, l.service, l.industry, l.message, l.source, l.status, l.created_at, l.updated_at].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));
              const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `leads_${filterStatus !== "all" ? filterStatus + "_" : ""}${new Date().toISOString().slice(0, 10)}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            } catch (err: any) {
              console.error("CSV export failed:", err);
              setError(err.message || 'Xuất CSV thất bại');
            }
          }}
          className="flex items-center gap-2 bg-[#0a2463] hover:bg-[#0d2d7a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ fontFamily: F }}>
          <Download size={15} /> Xuất CSV {filterStatus !== "all" || search ? "(đã lọc)" : ""}
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm flex-1" style={{ fontFamily: F }}>{error}</p>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
        </motion.div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#e8edf7] p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa5b8]" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm theo tên, SĐT, dịch vụ..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#0a2463] transition-colors"
            style={{ fontFamily: F }} />
        </div>
        <div className="flex gap-2">
          {(["all", "new", "contacted", "converted", "closed"] as const).map(s => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filterStatus === s ? "bg-[#0a2463] text-white" : "bg-[#f4f6fb] text-[#5a6a85] hover:bg-[#e8edf7]"}`}
              style={{ fontFamily: F }}>
              {s === "all" ? "Tất cả" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{ background: "#f8f9fc", borderBottom: "1px solid #e8edf7" }}>
                {["Khách hàng", "Dịch vụ / Ngành hàng", "Ngày gửi", "Trạng thái", "Hành động"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#5a6a85] uppercase tracking-wider" style={{ fontFamily: F }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f4f6fb]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3.5">
                        <div className="h-4 bg-[#f4f6fb] rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-[#9aa5b8]" style={{ fontFamily: F }}>Không tìm thấy lead nào</td></tr>
              ) : (
                leads.map(lead => {
                  const sc = statusConfig[lead.status as Status] ?? statusConfig.new;
                  return (
                    <motion.tr key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="hover:bg-[#f8f9fc] transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0a2463] flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ fontFamily: FB }}>
                            {lead.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#0d1b2a] text-xs" style={{ fontFamily: F }}>{lead.name}</p>
                            <p className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>{lead.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-[#0d1b2a] text-xs" style={{ fontFamily: F }}>{lead.service}</p>
                        <p className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>{lead.industry}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>
                          <Clock size={11} />{formatDate(lead.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="relative group">
                          <button className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold" style={{ color: sc.color, background: sc.bg, fontFamily: F }}>
                            {sc.label}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => setSelected(lead)}
                          className="flex items-center gap-1.5 text-xs text-[#1877f2] hover:text-[#0d2d7a] font-semibold transition-colors"
                          style={{ fontFamily: F }}>
                          <Eye size={13} /> Xem
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && total > 20 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#e8edf7]">
            <p className="text-xs text-[#9aa5b8]" style={{ fontFamily: F }}>Trang {page} / {Math.ceil(total / 20)}</p>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f4f6fb] text-[#5a6a85] hover:bg-[#e8edf7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ fontFamily: F }}>Trước</button>
              <button disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f4f6fb] text-[#5a6a85] hover:bg-[#e8edf7] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ fontFamily: F }}>Sau</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelected(null)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf7]">
                <h3 className="text-[#0d1b2a] font-bold" style={{ fontFamily: F }}>Chi tiết lead</h3>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-[#f4f6fb] hover:bg-[#e8edf7] flex items-center justify-center transition-colors">
                  <X size={15} className="text-[#5a6a85]" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0a2463] flex items-center justify-center text-white text-xl font-bold" style={{ fontFamily: FB }}>
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#0d1b2a] font-bold" style={{ fontFamily: F }}>{selected.name}</p>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ color: statusConfig[selected.status].color, background: statusConfig[selected.status].bg, fontFamily: F }}>
                      {statusConfig[selected.status].label}
                    </span>
                  </div>
                </div>

                {[
                  { icon: Phone, label: "Số điện thoại", value: selected.phone, href: `tel:${selected.phone.replace(/\s/g, "")}` },
                  { icon: Briefcase, label: "Dịch vụ", value: selected.service },
                  { icon: User, label: "Ngành hàng", value: selected.industry },
                  { icon: Clock, label: "Ngày gửi", value: formatDate(selected.created_at) },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f4f6fb] flex items-center justify-center shrink-0">
                      <item.icon size={15} className="text-[#5a6a85]" />
                    </div>
                    <div>
                      <p className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#0d1b2a] text-sm font-semibold hover:text-[#1877f2] transition-colors" style={{ fontFamily: F }}>{item.value}</a>
                      ) : (
                        <p className="text-[#0d1b2a] text-sm font-semibold" style={{ fontFamily: F }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div>
                  <p className="text-[#9aa5b8] text-xs mb-2" style={{ fontFamily: F }}>Nhu cầu / Tin nhắn</p>
                  <div className="bg-[#f8f9fc] rounded-xl p-4">
                    <p className="text-[#0d1b2a] text-sm leading-relaxed" style={{ fontFamily: F }}>{selected.message}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[#9aa5b8] text-xs mb-2" style={{ fontFamily: F }}>Cập nhật trạng thái</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(statusConfig) as [Status, typeof statusConfig["new"]][]).map(([key, cfg]) => (
                      <button key={key} onClick={() => updateStatus(selected.id, key)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${selected.status === key ? "border-current" : "border-transparent"}`}
                        style={{ color: cfg.color, background: cfg.bg, fontFamily: F }}>
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-[#e8edf7] flex gap-3">
                <a href={`tel:${selected.phone.replace(/\s/g, "")}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0a2463] hover:bg-[#0d2d7a] text-white py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ fontFamily: F }}>
                  <Phone size={15} /> Gọi ngay
                </a>
                <a href={`tel:${selected.phone.replace(/\s/g, "")}`}
                  className="w-12 flex items-center justify-center bg-[#f4f6fb] hover:bg-[#e8edf7] text-[#5a6a85] rounded-xl transition-colors"
                  title="Gọi lại">
                  <Phone size={16} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
