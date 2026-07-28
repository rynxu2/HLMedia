import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Save, Loader2, Upload, X, Plus,
  Settings, BookOpen, Target, Clock, Users, Layers, AlertCircle, Eye, EyeOff, Trash2
} from "lucide-react";
import { courseApi, uploadApi } from "../../lib/api";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const categories = ["Facebook Ads", "TikTok Ads", "Edit Video", "Shopee", "Livestream", "Khác"];

interface CourseData {
  id?: number;
  name: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  status: string;
  category: string;
  thumbnail: string;
  study_mode: string;
  topics: string[];
  outcomes: string[];
  highlight: boolean;
}

const defaultCourse: CourseData = {
  name: "",
  description: "",
  instructor: "HL MEDIA",
  duration: "",
  lessons: 0,
  status: "draft",
  category: categories[0],
  thumbnail: "",
  study_mode: "Online & Offline",
  topics: [],
  outcomes: [],
  highlight: false,
};

/* ─── Reorderable list item component ─── */
function SortableListItem({
  item, index, onRemove, onUpdate, onMoveUp, onMoveDown, isFirst, isLast, placeholder
}: {
  item: string; index: number;
  onRemove: () => void; onUpdate: (val: string) => void;
  onMoveUp: () => void; onMoveDown: () => void;
  isFirst: boolean; isLast: boolean; placeholder: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      className="flex items-center gap-2 group"
    >
      <div className="flex flex-col gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" onClick={onMoveUp} disabled={isFirst}
          className="w-5 h-3.5 flex items-center justify-center rounded hover:bg-[#e8edf7] disabled:opacity-20 transition-colors">
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 4L4 1L7 4" stroke="#5a6a85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button type="button" onClick={onMoveDown} disabled={isLast}
          className="w-5 h-3.5 flex items-center justify-center rounded hover:bg-[#e8edf7] disabled:opacity-20 transition-colors">
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="#5a6a85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <span className="text-xs text-[#9aa5b8] font-mono w-5 text-center shrink-0">{index + 1}</span>
      <input
        value={item}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] focus:bg-white transition-all"
        style={{ fontFamily: F }}
      />
      <button type="button" onClick={onRemove}
        className="w-8 h-8 shrink-0 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
        <X size={14} className="text-red-400" />
      </button>
    </motion.div>
  );
}

/* ─── Sortable list section ─── */
function SortableList({
  title, icon: Icon, items, onChange, placeholder, addLabel, accentColor = "#7c3aed"
}: {
  title: string; icon: React.ElementType;
  items: string[]; onChange: (items: string[]) => void;
  placeholder: string; addLabel: string; accentColor?: string;
}) {
  const addItem = () => onChange([...items, ""]);
  const removeItem = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, val: string) => {
    const next = [...items]; next[i] = val; onChange(next);
  };
  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...items]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; onChange(next);
  };
  const moveDown = (i: number) => {
    if (i >= items.length - 1) return;
    const next = [...items]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; onChange(next);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8edf7]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accentColor + "12" }}>
            <Icon size={16} style={{ color: accentColor }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0d1b2a]" style={{ fontFamily: F }}>{title}</h3>
            <p className="text-xs text-[#9aa5b8]" style={{ fontFamily: F }}>{items.length} mục</p>
          </div>
        </div>
        <button type="button" onClick={addItem}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-[#f4f6fb]"
          style={{ fontFamily: F, color: accentColor }}>
          <Plus size={14} /> {addLabel}
        </button>
      </div>
      <div className="p-5 space-y-2">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <SortableListItem
              key={`${i}-${items.length}`}
              item={item} index={i}
              onRemove={() => removeItem(i)}
              onUpdate={(val) => updateItem(i, val)}
              onMoveUp={() => moveUp(i)}
              onMoveDown={() => moveDown(i)}
              isFirst={i === 0} isLast={i === items.length - 1}
              placeholder={placeholder}
            />
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <button type="button" onClick={addItem}
            className="w-full py-8 border-2 border-dashed border-[#e8edf7] rounded-xl text-[#9aa5b8] text-sm flex flex-col items-center gap-2 hover:border-[#7c3aed]/30 hover:text-[#7c3aed] transition-colors"
            style={{ fontFamily: F }}>
            <Plus size={20} />
            Nhấn để thêm {title.toLowerCase()} đầu tiên
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Main Course Editor ─── */
export default function AdminCourseEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [course, setCourse] = useState<CourseData>(defaultCourse);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = useCallback(<K extends keyof CourseData>(key: K, value: CourseData[K]) => {
    setCourse(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  // Fetch course data when editing
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    courseApi.getById(Number(id))
      .then((data) => {
        setCourse({
          id: data.id,
          name: data.name ?? "",
          description: data.description ?? "",
          instructor: data.instructor ?? "HL MEDIA",
          duration: data.duration ?? "",
          lessons: data.lessons ?? 0,
          status: data.status ?? "draft",
          category: data.category ?? categories[0],
          thumbnail: data.thumbnail ?? "",
          study_mode: data.study_mode ?? "Online & Offline",
          topics: data.topics ?? [],
          outcomes: data.outcomes ?? [],
          highlight: data.highlight ?? false,
        });
        setIsDirty(false);
      })
      .catch(() => {
        setError("Không thể tải thông tin khóa học.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleThumbnailUpload = async (file: File) => {
    try {
      setUploading(true);
      const { url } = await uploadApi.upload(file);
      updateField("thumbnail", url);
    } catch {
      setError("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!course.name.trim()) { setError("Tên khóa học không được trống"); return; }
    if (!course.description.trim()) { setError("Mô tả không được trống"); return; }
    if (!course.duration.trim()) { setError("Thời lượng không được trống"); return; }

    // Clean empty items from lists
    const payload = {
      ...course,
      topics: course.topics.filter(t => t.trim()),
      outcomes: course.outcomes.filter(o => o.trim()),
    };
    delete (payload as any).id;

    try {
      setSaving(true);
      setError("");
      if (isEdit) {
        await courseApi.update(Number(id), payload);
      } else {
        await courseApi.create(payload);
      }
      navigate("/quan-ly/khoa-hoc");
    } catch (err: any) {
      setError(err.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[#7c3aed]" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/quan-ly/khoa-hoc")}
            className="w-9 h-9 rounded-xl bg-white border border-[#e8edf7] flex items-center justify-center hover:bg-[#f4f6fb] transition-colors">
            <ArrowLeft size={16} className="text-[#5a6a85]" />
          </button>
          <div>
            <h1 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.5rem", fontWeight: 800 }}>
              {isEdit ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}
            </h1>
            <p className="text-xs text-[#9aa5b8] mt-0.5" style={{ fontFamily: F }}>
              {isDirty ? "• Chưa lưu thay đổi" : isEdit ? "Đã lưu" : "Tạo mới"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowDrawer(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white text-sm font-semibold text-[#5a6a85] hover:bg-[#f4f6fb] transition-all lg:hidden"
            style={{ fontFamily: F }}>
            <Settings size={15} /> Cài đặt
          </button>
          <button onClick={handleSave} disabled={saving || uploading}
            className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: F }}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isEdit ? "Lưu thay đổi" : "Tạo khóa học"}
          </button>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle size={16} className="text-red-500 shrink-0" />
            <p className="text-red-600 text-sm flex-1" style={{ fontFamily: F }}>{error}</p>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column — Main info */}
        <div className="lg:col-span-2 space-y-6">

          {/* Course name */}
          <div className="bg-white rounded-2xl border border-[#e8edf7] p-5">
            <label className="text-xs font-semibold text-[#0d1b2a] mb-2 block" style={{ fontFamily: F }}>Tên khóa học *</label>
            <input
              value={course.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="VD: Facebook & TikTok Ads thực chiến"
              className="w-full px-4 py-3.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-base focus:outline-none focus:border-[#7c3aed] focus:bg-white transition-all font-semibold"
              style={{ fontFamily: F }}
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-[#e8edf7] p-5">
            <label className="text-xs font-semibold text-[#0d1b2a] mb-2 block" style={{ fontFamily: F }}>Mô tả khóa học *</label>
            <textarea
              value={course.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              placeholder="Mô tả chi tiết về khóa học, đối tượng phù hợp, lợi ích khi tham gia..."
              className="w-full px-4 py-3 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] focus:bg-white transition-all resize-none leading-relaxed"
              style={{ fontFamily: F }}
            />
          </div>

          {/* Topics — Nội dung chương trình */}
          <SortableList
            title="Nội dung chương trình"
            icon={BookOpen}
            items={course.topics}
            onChange={(topics) => updateField("topics", topics)}
            placeholder="VD: Setup Business Manager, Tạo chiến dịch quảng cáo..."
            addLabel="Thêm nội dung"
            accentColor="#0a2463"
          />

          {/* Outcomes — Sau khóa học bạn sẽ */}
          <SortableList
            title="Sau khóa học bạn sẽ"
            icon={Target}
            items={course.outcomes}
            onChange={(outcomes) => updateField("outcomes", outcomes)}
            placeholder="VD: Tự setup và chạy quảng cáo, Tối ưu chi phí hiệu quả..."
            addLabel="Thêm mục tiêu"
            accentColor="#10b981"
          />
        </div>

        {/* Right column — Settings sidebar */}
        <div className="space-y-5">
          {/* Status card */}
          <div className="bg-white rounded-2xl border border-[#e8edf7] p-5">
            <h3 className="text-xs font-bold text-[#0d1b2a] mb-3 flex items-center gap-2" style={{ fontFamily: F }}>
              {course.status === "active" ? <Eye size={14} className="text-emerald-500" /> : <EyeOff size={14} className="text-amber-500" />}
              Trạng thái
            </h3>
            <select
              value={course.status}
              onChange={(e) => updateField("status", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
              style={{ fontFamily: F }}>
              <option value="draft">Bản nháp</option>
              <option value="active">Đang mở</option>
              <option value="ended">Đã kết thúc</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div className="bg-white rounded-2xl border border-[#e8edf7] p-5">
            <h3 className="text-xs font-bold text-[#0d1b2a] mb-3" style={{ fontFamily: F }}>Ảnh thumbnail</h3>
            {course.thumbnail ? (
              <div className="relative group mb-3">
                <img src={course.thumbnail} alt="Thumbnail" className="w-full h-36 object-cover rounded-xl border border-[#e8edf7]" />
                <button onClick={() => updateField("thumbnail", "")}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50">
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            ) : null}
            <label className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-[#e8edf7] bg-[#f8f9fc] text-sm cursor-pointer hover:border-[#7c3aed] transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`} style={{ fontFamily: F }}>
              {uploading ? <Loader2 size={14} className="animate-spin text-[#7c3aed]" /> : <Upload size={14} className="text-[#5a6a85]" />}
              <span className="text-[#5a6a85]">{uploading ? "Đang tải..." : course.thumbnail ? "Đổi ảnh" : "Chọn ảnh"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleThumbnailUpload(f); }} />
            </label>
          </div>

          {/* Course details */}
          <div className="bg-white rounded-2xl border border-[#e8edf7] p-5 space-y-4">
            <h3 className="text-xs font-bold text-[#0d1b2a] mb-1" style={{ fontFamily: F }}>Thông tin chi tiết</h3>

            <div>
              <label className="text-xs text-[#5a6a85] mb-1.5 block flex items-center gap-1.5" style={{ fontFamily: F }}>
                <Layers size={12} /> Danh mục
              </label>
              <select
                value={course.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
                style={{ fontFamily: F }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-[#5a6a85] mb-1.5 block flex items-center gap-1.5" style={{ fontFamily: F }}>
                <BookOpen size={12} /> Hình thức học
              </label>
              <select
                value={course.study_mode}
                onChange={(e) => updateField("study_mode", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
                style={{ fontFamily: F }}>
                <option value="Online & Offline">Online & Offline</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#5a6a85] mb-1.5 block flex items-center gap-1.5" style={{ fontFamily: F }}>
                <Users size={12} /> Giảng viên
              </label>
              <input
                value={course.instructor}
                onChange={(e) => updateField("instructor", e.target.value)}
                placeholder="HL MEDIA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
                style={{ fontFamily: F }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#5a6a85] mb-1.5 block flex items-center gap-1.5" style={{ fontFamily: F }}>
                  <Clock size={12} /> Thời lượng
                </label>
                <input
                  value={course.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  placeholder="8 buổi (2h/buổi)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
                  style={{ fontFamily: F }}
                />
              </div>
              <div>
                <label className="text-xs text-[#5a6a85] mb-1.5 block flex items-center gap-1.5" style={{ fontFamily: F }}>
                  <BookOpen size={12} /> Số bài
                </label>
                <input
                  type="number"
                  value={course.lessons || ""}
                  onChange={(e) => updateField("lessons", +e.target.value)}
                  placeholder="8"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#7c3aed] transition-all"
                  style={{ fontFamily: F }}
                />
              </div>
            </div>

            <label className="flex items-center gap-3 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={course.highlight}
                onChange={(e) => updateField("highlight", e.target.checked)}
                className="w-4 h-4 rounded border-[#e8edf7] text-[#7c3aed] focus:ring-[#7c3aed]"
              />
              <span className="text-xs text-[#5a6a85]" style={{ fontFamily: F }}>Khóa học nổi bật</span>
            </label>
          </div>
        </div>
      </div>

      {/* Settings drawer (mobile/overlay) */}
      <AnimatePresence>
        {showDrawer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: "rgba(4,10,24,0.5)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowDrawer(false)}>
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0d1b2a]" style={{ fontFamily: F }}>Cài đặt khóa học</h3>
                <button onClick={() => setShowDrawer(false)} className="w-8 h-8 rounded-full bg-[#f4f6fb] flex items-center justify-center hover:bg-[#e8edf7]">
                  <X size={15} className="text-[#5a6a85]" />
                </button>
              </div>
              <p className="text-xs text-[#9aa5b8]" style={{ fontFamily: F }}>Các cài đặt nằm ở sidebar phải trên desktop.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
