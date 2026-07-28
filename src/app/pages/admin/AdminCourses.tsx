import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, Edit2, Trash2, X, Users, Clock, BookOpen, Loader2, AlertCircle, Layers } from "lucide-react";
import { courseApi } from "../../lib/api";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

type CourseStatus = "active" | "draft" | "ended";

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  status: CourseStatus;
  category: string;
  thumbnail: string;
  lessons: number;
  study_mode?: string;
}

const statusConfig: Record<CourseStatus, { label: string; color: string; bg: string }> = {
  active: { label: "Đang mở",  color: "#10b981", bg: "#ecfdf5" },
  draft:  { label: "Bản nháp", color: "#f59e0b", bg: "#fef9c3" },
  ended:  { label: "Đã kết thúc", color: "#5a6a85", bg: "#f4f6fb" },
};

export default function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setError(null);
      const data = await courseApi.list();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    try {
      setSaving(true);
      setError(null);
      await courseApi.delete(id);
      setDeleteId(null);
      await fetchCourses();
    } catch (err: any) {
      setError(err.message || 'Xoá thất bại');
      setDeleteId(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.7rem", fontWeight: 800 }}>Khóa học</h1>
          <p className="text-[#5a6a85] text-sm mt-0.5" style={{ fontFamily: F }}>
            {courses.filter(c => c.status === "active").length} đang mở · {courses.reduce((a, c) => a + (c.students || 0), 0)} học viên tổng
          </p>
        </div>
        <button onClick={() => navigate("/quan-ly/khoa-hoc/create")}
          className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
          style={{ fontFamily: F }}>
          <Plus size={16} /> Thêm khóa học
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

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#e8edf7] p-4">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa5b8]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm khóa học..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-colors" style={{ fontFamily: F }} />
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden animate-pulse">
              <div className="flex">
                <div className="w-40 shrink-0 bg-[#e8edf7] h-36" />
                <div className="flex-1 p-5 space-y-3">
                  <div className="h-3 bg-[#e8edf7] rounded w-1/3" />
                  <div className="h-4 bg-[#e8edf7] rounded w-3/4" />
                  <div className="h-3 bg-[#e8edf7] rounded w-full" />
                  <div className="h-3 bg-[#e8edf7] rounded w-2/3" />
                  <div className="flex gap-4">
                    <div className="h-3 bg-[#e8edf7] rounded w-16" />
                    <div className="h-3 bg-[#e8edf7] rounded w-16" />
                    <div className="h-3 bg-[#e8edf7] rounded w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (

      /* Course cards */
      <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {filtered.map(course => {
          const sc = statusConfig[course.status as CourseStatus] || statusConfig.draft;
          return (
            <motion.div key={course.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden hover:shadow-xl hover:shadow-[#7c3aed]/5 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/quan-ly/khoa-hoc/edit/${course.id}`)}>
              <div className="flex">
                <div className="relative w-40 shrink-0">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#f4f6fb] flex items-center justify-center">
                      <BookOpen size={24} className="text-[#9aa5b8]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>
                <div className="flex-1 p-5 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs text-[#9aa5b8] mb-1 block" style={{ fontFamily: F }}>{course.category}</span>
                      <h3 className="text-[#0d1b2a] font-bold text-sm leading-snug" style={{ fontFamily: F }}>{course.name}</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold shrink-0" style={{ color: sc.color, background: sc.bg, fontFamily: F }}>{sc.label}</span>
                  </div>

                  <p className="text-[#9aa5b8] text-xs leading-relaxed mb-3 line-clamp-2" style={{ fontFamily: F }}>{course.description}</p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-xs text-[#5a6a85]" style={{ fontFamily: F }}>
                      <Users size={12} /> {course.students} học viên
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#5a6a85]" style={{ fontFamily: F }}>
                      <Clock size={12} /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#5a6a85]" style={{ fontFamily: F }}>
                      <BookOpen size={12} /> {course.lessons} bài
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#5a6a85]" style={{ fontFamily: F }}>
                      <Layers size={12} /> {course.study_mode || "Online & Offline"}
                    </div>
                  </div>

                  <div className="flex justify-end gap-1">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/quan-ly/khoa-hoc/edit/${course.id}`); }} className="w-8 h-8 rounded-lg hover:bg-[#f4f6fb] flex items-center justify-center transition-colors">
                      <Edit2 size={14} className="text-[#5a6a85]" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteId(course.id); }} className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors">
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
              <h4 className="text-[#0d1b2a] font-bold mb-2" style={{ fontFamily: F }}>Xoá khóa học?</h4>
              <p className="text-[#5a6a85] text-sm mb-5" style={{ fontFamily: F }}>Hành động này không thể hoàn tác.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-[#e8edf7] rounded-xl text-sm text-[#5a6a85] font-semibold hover:bg-[#f4f6fb] transition-all" style={{ fontFamily: F }}>Huỷ</button>
                <button onClick={() => handleDelete(deleteId)} disabled={saving}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ fontFamily: F }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : null} Xoá
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
