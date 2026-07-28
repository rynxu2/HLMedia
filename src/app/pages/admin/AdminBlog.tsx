import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Edit2, Trash2, Eye, ImageIcon, AlertCircle, X } from "lucide-react";
import { blogApi } from "../../lib/api";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

type BlogStatus = "published" | "draft";

interface Blog {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  status: BlogStatus;
  views: number;
  excerpt: string;
  thumbnail: string;
}

const statusConfig: Record<BlogStatus, { label: string; color: string; bg: string }> = {
  published: { label: "Đã đăng", color: "#10b981", bg: "#ecfdf5" },
  draft:     { label: "Bản nháp", color: "#f59e0b", bg: "#fef9c3" },
};

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BlogStatus | "all">("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await blogApi.list({ status: 'all', limit: 50 });
      setBlogs(Array.isArray(res) ? res : []);
    } catch (err: any) {
      console.error('Failed to fetch blogs:', err);
      setError(err.message || 'Không thể tải danh sách bài viết');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const filtered = blogs.filter(b => {
    const matchSearch = (b.title || '').toLowerCase().includes(search.toLowerCase()) || (b.category || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: any) => {
    try {
      await blogApi.delete(id);
      setDeleteId(null);
      await fetchBlogs();
    } catch (err: any) {
      console.error('Failed to delete blog:', err);
      setError(err.message || 'Xoá thất bại');
    }
  };

  const toggleStatus = async (blog: any) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      await blogApi.update(blog.id, { status: newStatus });
      await fetchBlogs();
    } catch (err: any) {
      console.error('Failed to toggle status:', err);
      setError(err.message || 'Thay đổi trạng thái thất bại');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.7rem", fontWeight: 800 }}>Bài viết Blog</h1>
          <p className="text-[#5a6a85] text-sm mt-0.5" style={{ fontFamily: F }}>
            {blogs.filter(b => b.status === "published").length} bài đã đăng · {blogs.filter(b => b.status === "draft").length} bản nháp
          </p>
        </div>
        <button onClick={() => navigate("/quan-ly/blog/create")}
          className="flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-500/25 cursor-pointer"
          style={{ fontFamily: F }}>
          <Plus size={16} /> Viết bài mới
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
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bài viết..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#0a2463] transition-colors" style={{ fontFamily: F }} />
        </div>
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${filterStatus === s ? "bg-[#0a2463] text-white" : "bg-[#f4f6fb] text-[#5a6a85] hover:bg-[#e8edf7]"}`}
              style={{ fontFamily: F }}>
              {s === "all" ? "Tất cả" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden animate-pulse">
              <div className="aspect-video bg-[#e8edf7]" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-[#e8edf7] rounded w-1/3" />
                <div className="h-4 bg-[#e8edf7] rounded w-3/4" />
                <div className="h-3 bg-[#e8edf7] rounded w-full" />
                <div className="h-3 bg-[#e8edf7] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(blog => {
          const sc = statusConfig[blog.status as BlogStatus] ?? statusConfig.draft;
          const blogId = blog.id;
          const displayDate = blog.date || (blog.published_at ? new Date(blog.published_at).toLocaleDateString('vi') : blog.created_at ? new Date(blog.created_at).toLocaleDateString('vi') : '');
          const thumbnail = blog.image || blog.thumbnail || '';
          return (
            <motion.div key={blogId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden hover:shadow-xl hover:shadow-[#0a2463]/6 transition-all duration-300">
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {thumbnail ? <img src={thumbnail} alt={blog.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={32} className="text-[#9aa5b8]" /></div>}
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ color: sc.color, background: sc.bg, fontFamily: F }}>{sc.label}</span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-[#9aa5b8] mb-2 block" style={{ fontFamily: F }}>{blog.category}</span>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2 leading-snug line-clamp-2" style={{ fontFamily: F }}>{blog.title}</h3>
                <p className="text-[#9aa5b8] text-xs leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: F }}>{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>
                    {displayDate} {blog.views > 0 && `· ${blog.views.toLocaleString()} lượt xem`}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleStatus(blog)}
                      className="w-7 h-7 rounded-lg hover:bg-[#f4f6fb] flex items-center justify-center transition-colors cursor-pointer"
                      title="Chuyển trạng thái">
                      <Eye size={14} className="text-[#5a6a85]" />
                    </button>
                    <button onClick={() => navigate(`/quan-ly/blog/edit/${blogId}`)}
                      className="w-7 h-7 rounded-lg hover:bg-[#f4f6fb] flex items-center justify-center transition-colors cursor-pointer">
                      <Edit2 size={14} className="text-[#5a6a85]" />
                    </button>
                    <button onClick={() => setDeleteId(blogId)}
                      className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(4,10,24,0.5)", backdropFilter: "blur(4px)" }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-7 max-w-xs w-full shadow-2xl text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h4 className="text-[#0d1b2a] font-bold mb-2" style={{ fontFamily: F }}>Xoá bài viết?</h4>
              <p className="text-[#5a6a85] text-sm mb-5" style={{ fontFamily: F }}>Hành động này không thể hoàn tác.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-[#e8edf7] rounded-xl text-sm text-[#5a6a85] font-semibold hover:bg-[#f4f6fb] transition-all cursor-pointer" style={{ fontFamily: F }}>Huỷ</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer" style={{ fontFamily: F }}>Xoá bài</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
