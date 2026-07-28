import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, FileText, GraduationCap, TrendingUp, ArrowRight, ArrowUp, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router";
import { dashboardApi } from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const iconMap: Record<string, typeof Users> = {
  "Tổng Lead": Users,
  "Lead mới hôm nay": TrendingUp,
  "Bài viết Blog": FileText,
  "Khóa học": GraduationCap,
};
const colorMap: Record<string, { color: string; bg: string }> = {
  "Tổng Lead": { color: "#1877f2", bg: "#e8f0fe" },
  "Lead mới hôm nay": { color: "#ff6b35", bg: "#fff3ed" },
  "Bài viết Blog": { color: "#10b981", bg: "#ecfdf5" },
  "Khóa học": { color: "#7c3aed", bg: "#f3f0ff" },
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "Mới", color: "#1877f2", bg: "#e8f0fe" },
  contacted: { label: "Đã liên hệ", color: "#f59e0b", bg: "#fef9c3" },
  converted: { label: "Đã chốt", color: "#10b981", bg: "#ecfdf5" },
  closed: { label: "Đã đóng", color: "#5a6a85", bg: "#f4f6fb" },
};

interface StatItem { label: string; value: string; delta: string }
interface LeadItem { id: number; name: string; phone: string; service: string | null; status: string; created_at: string }
interface ActivityItem { type: string; text: string; time: string }

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      dashboardApi.getStats(),
      dashboardApi.getRecentLeads(),
      dashboardApi.getActivity(),
    ])
      .then(([s, l, a]) => {
        // Transform stats object into StatItem[]
        const statItems: StatItem[] = [
          { label: "Tổng Lead", value: String(s.totalLeads ?? 0), delta: "Tổng số lead" },
          { label: "Lead mới hôm nay", value: String(s.newLeads ?? 0), delta: "Chưa xử lý" },
          { label: "Bài viết Blog", value: String(s.totalBlogs ?? 0), delta: "Tổng bài viết" },
          { label: "Khóa học", value: String(s.totalCourses ?? 0), delta: "Tổng khóa học" },
        ];
        setStats(statItems);
        setRecentLeads(Array.isArray(l) ? l : []);
        // Transform activity raw data into ActivityItem[]
        const activityItems: ActivityItem[] = (Array.isArray(a) ? a : []).map((item: { created_at: string }) => ({
          type: "lead",
          text: "Lead mới được tạo",
          time: item.created_at,
        }));
        setActivity(activityItems);
      })
      .catch(() => setError('Không thể tải dữ liệu dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.7rem", fontWeight: 800 }}>Tổng quan</h1>
        <p className="text-[#5a6a85] text-sm mt-0.5" style={{ fontFamily: F }}>Chào mừng trở lại, {user?.displayName || "Admin"} · {today}</p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-5 py-4" style={{ fontFamily: F }}>
          <AlertTriangle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#e8edf7] p-5 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-[#f4f6fb] mb-3" />
              <div className="h-8 w-16 bg-[#f4f6fb] rounded mb-2" />
              <div className="h-3 w-24 bg-[#f4f6fb] rounded" />
            </div>
          ))
        ) : stats.map((s, i) => {
          const Icon = iconMap[s.label] || Users;
          const colors = colorMap[s.label] || { color: "#1877f2", bg: "#e8f0fe" };
          return (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-[#e8edf7] p-5 hover:shadow-lg hover:shadow-[#0a2463]/5 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.bg }}>
                <Icon size={20} style={{ color: colors.color }} />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-xs font-semibold" style={{ fontFamily: F }}>
                <ArrowUp size={11} /> {s.delta.split(" ")[0]}
              </div>
            </div>
            <p className="font-black mb-0.5" style={{ fontFamily: FB, fontSize: "2rem", color: "#0d1b2a", lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>{s.label}</p>
            <p className="text-[#9aa5b8] text-xs mt-1" style={{ fontFamily: F }}>{s.delta}</p>
          </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent leads table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e8edf7] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf7]">
            <h2 className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>Lead gần đây</h2>
            <Link to="/quan-ly/leads" className="text-[#1877f2] text-xs font-semibold hover:underline flex items-center gap-1" style={{ fontFamily: F }}>
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#f8f9fc" }}>
                  {["Họ tên", "Dịch vụ", "Thời gian", "Trạng thái"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#5a6a85] uppercase tracking-wider" style={{ fontFamily: F }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f4f6fb]">
                {recentLeads.map((lead, i) => {
                  const sc = statusConfig[lead.status] || statusConfig.new;
                  const timeAgo = new Date(lead.created_at).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
                  return (
                    <tr key={lead.id || i} className="hover:bg-[#f8f9fc] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#0d1b2a] text-xs" style={{ fontFamily: F }}>{lead.name}</p>
                        <p className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>{lead.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[#0d1b2a] text-xs" style={{ fontFamily: F }}>{lead.service || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>
                          <Clock size={11} />{timeAgo}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ color: sc.color, background: sc.bg, fontFamily: F }}>
                          {sc.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-[#e8edf7] p-5">
          <h2 className="text-[#0d1b2a] font-bold text-sm mb-4" style={{ fontFamily: F }}>Hoạt động gần đây</h2>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.type === "lead" ? "#1877f2" : "#10b981" }} />
                <div>
                  <p className="text-[#0d1b2a] text-xs leading-relaxed" style={{ fontFamily: F }}>{a.text}</p>
                  <p className="text-[#9aa5b8] text-[11px] mt-0.5" style={{ fontFamily: F }}>{new Date(a.time).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}</p>
                </div>
              </div>
            ))}
            {activity.length === 0 && !loading && (
              <p className="text-[#9aa5b8] text-xs text-center py-4" style={{ fontFamily: F }}>Chưa có hoạt động nào</p>
            )}
          </div>

          {/* Quick actions */}
          <div className="border-t border-[#e8edf7] pt-4 mt-5 space-y-2">
            <p className="text-[#5a6a85] text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: F }}>Truy cập nhanh</p>
            {[
              { label: "Xem tất cả lead", to: "/quan-ly/leads", color: "#1877f2" },
              { label: "Viết bài mới", to: "/quan-ly/blog", color: "#10b981" },
              { label: "Thêm khóa học", to: "/quan-ly/khoa-hoc", color: "#7c3aed" },
            ].map(item => (
              <Link key={item.to} to={item.to}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#f4f6fb] transition-colors group"
                style={{ fontFamily: F }}>
                <span className="text-xs font-medium text-[#0d1b2a]">{item.label}</span>
                <ArrowRight size={13} style={{ color: item.color }} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
