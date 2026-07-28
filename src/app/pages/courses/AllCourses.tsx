import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Clock, Users, Star, Phone } from "lucide-react";
import { useSEO, schemas } from "../../hooks/useSEO";
import { ConsultationModal } from "../../components/ConsultationModal";
import { courseApi } from "../../lib/api";

interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  price: string;
  priceValue: number | null;
  duration: string;
  lessons: number | null;
  students: number | null;
  rating: number | null;
  status: string;
  category: string;
  thumbnail: string | null;
  highlight: boolean;
  topics: string[];
  outcomes: string[];
}

/** Map category to visual presentation */
const categoryMeta: Record<string, { icon: string; label: string; color: string }> = {
  "Facebook Ads": { icon: "📣", label: "Quảng cáo", color: "#1877f2" },
  "TikTok Ads": { icon: "📱", label: "TikTok Ads", color: "#000000" },
  "Edit Video": { icon: "🎬", label: "Sáng tạo nội dung", color: "#7c3aed" },
  "Marketing": { icon: "📈", label: "Marketing", color: "#10b981" },
  default: { icon: "📚", label: "Khóa học", color: "#0a2463" },
};

function getMeta(category: string) {
  return categoryMeta[category] || categoryMeta.default;
}

const faqs = [
  { q: "Học online hay offline?", a: "Cả hai hình thức đều có. Online qua Zoom/Google Meet có ghi lại video để xem lại. Offline tại văn phòng HL MEDIA ở Hà Nội." },
  { q: "Không biết gì có học được không?", a: "Hoàn toàn được. Khóa học thiết kế từ người mới bắt đầu — không yêu cầu kiến thức nền." },
  { q: "Học xong có được hỗ trợ tiếp không?", a: "Có. Học viên vào nhóm Zalo riêng để hỏi đáp sau khóa học. HL MEDIA hỗ trợ 30 ngày sau khi kết thúc." },
  { q: "Học phí bao nhiêu?", a: "Liên hệ trực tiếp để nhận bảng giá và lịch khai giảng gần nhất. Có ưu đãi cho nhóm 3+ người đăng ký cùng." },
];

export default function AllCourses() {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseApi.list({ status: 'active' })
      .then((rows) =>
        setCourses(
          rows.map((r: Record<string, unknown>) => ({
            id: r.id as number,
            name: r.name as string,
            description: (r.description ?? '') as string,
            instructor: (r.instructor ?? '') as string,
            price: (r.price ?? '') as string,
            priceValue: (r.price_value ?? r.priceValue ?? null) as number | null,
            duration: (r.duration ?? '') as string,
            lessons: (r.lessons ?? null) as number | null,
            students: (r.students ?? null) as number | null,
            rating: (r.rating ?? null) as number | null,
            status: r.status as string,
            category: (r.category ?? '') as string,
            thumbnail: (r.thumbnail ?? null) as string | null,
            studyMode: (r.study_mode ?? r.studyMode ?? 'Online & Offline') as string,
            highlight: (r.highlight ?? false) as boolean,
            topics: (r.topics ?? []) as string[],
            outcomes: (r.outcomes ?? []) as string[],
          }))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const courseSchemas = courses.map((c) =>
    schemas.course({ title: c.name, desc: c.description, img: c.thumbnail || "" })
  );

  useSEO({
    title: "Khóa Học Marketing Thực Chiến",
    description: "Khóa học Facebook Ads, TikTok Ads và Edit video thực chiến từ HL MEDIA. Học xong tự tin chạy quảng cáo và tạo nội dung chuyên nghiệp.",
    jsonLd: [
      ...courseSchemas,
      schemas.breadcrumb([
        { name: "Trang chủ", url: "/" },
        { name: "Khóa học", url: "/khoa-hoc" },
      ]),
    ],
  });

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #060f1e 0%, #0a2463 100%)" }}>
        <div className="absolute inset-0 opacity-8"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center pb-15 pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Khóa học thực chiến
            </span>
            <h1 className="text-white mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}>
              ĐÀO TẠO ĐỂ BẠN TỰ TIN<br />
              <span className="text-[#ff6b35]">LÀM CHỦ QUẢNG CÁO & NỘI DUNG</span>
            </h1>
            <p className="text-white/60 mb-8 max-w-lg mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
              Không chỉ làm dịch vụ — HL MEDIA còn đào tạo để bạn tự vận hành và kiểm soát hiệu quả của chính mình.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {[["200+", "Học viên đã tốt nghiệp"], ["4.9★", "Đánh giá trung bình"], ["30 ngày", "Hỗ trợ sau khóa học"]].map(([v, l]) => (
                <div key={l} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
                  <span className="text-white font-bold">{v}</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block -mb-1">
            <path d="M0 40H1440V15C1100 40 700 0 0 20V40Z" fill="#f8f9fc" />
          </svg>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-20">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-10 items-center animate-pulse">
                <div className="rounded-3xl bg-[#e8edf7] aspect-[16/10]" />
                <div className="space-y-4">
                  <div className="h-8 bg-[#e8edf7] rounded w-3/4" />
                  <div className="h-4 bg-[#e8edf7] rounded w-full" />
                  <div className="h-4 bg-[#e8edf7] rounded w-5/6" />
                  <div className="flex gap-3">
                    <div className="h-12 bg-[#e8edf7] rounded-xl w-28" />
                    <div className="h-12 bg-[#e8edf7] rounded-xl w-28" />
                    <div className="h-12 bg-[#e8edf7] rounded-xl w-28" />
                  </div>
                  <div className="h-32 bg-[#e8edf7] rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No courses */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-20 text-[#5a6a85]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Chưa có khóa học nào. Vui lòng quay lại sau.
          </div>
        )}

        {/* Courses */}
        {!loading && courses.map((course, i) => {
          const meta = getMeta(course.category);
          return (
            <motion.div key={course.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              {/* Image */}
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0a2463]/15 aspect-[16/10] ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.name} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-[#0a2463] flex items-center justify-center text-6xl">{meta.icon}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/70 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: meta.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {meta.icon} {meta.label}
                  </span>
                </div>
                {/* Stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                  {[
                    { icon: Clock, value: course.duration },
                    { icon: Users, value: `${course.students || 0}+ học viên` },
                    { icon: Star, value: `${course.rating || 4.8}★` },
                  ].map((s) => (
                    <div key={s.value} className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <s.icon size={12} className="text-white/70" />
                      <span className="text-white text-xs font-medium"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                {course.highlight && (
                  <span className="inline-flex items-center gap-1.5 bg-[#ff6b35]/10 text-[#ff6b35] text-xs font-bold px-3 py-1.5 rounded-full border border-[#ff6b35]/25 mb-4"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    ⭐ Khoá học nổi bật
                  </span>
                )}
                <h2 className="text-[#0d1b2a] mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, lineHeight: 1.15 }}>
                  {course.name.toUpperCase()}
                </h2>
                <p className="text-[#5a6a85] mb-5 leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.75 }}>
                  {course.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { label: "Thời lượng", value: course.duration },
                    { label: "Số buổi", value: course.lessons ? `${course.lessons} buổi` : "Liên hệ" },
                    { label: "Hình thức", value: course.studyMode },
                  ].map((m) => (
                    <div key={m.label} className="bg-white border border-[#e8edf7] rounded-xl px-3 py-2">
                      <p className="text-[#5a6a85] text-xs mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.label}</p>
                      <p className="text-[#0d1b2a] text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Topics */}
                {course.topics && course.topics.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[#0d1b2a] font-bold text-sm mb-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Nội dung chương trình:</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {course.topics.map((t) => (
                        <div key={t} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: meta.color }} />
                          <span className="text-[#5a6a85] text-xs leading-snug"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outcomes */}
                {course.outcomes && course.outcomes.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#e8edf7] p-4 mb-6">
                    <p className="text-[#0d1b2a] font-bold text-sm mb-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sau khoá học bạn sẽ:</p>
                    <div className="space-y-2">
                      {course.outcomes.map((o) => (
                        <div key={o} className="flex items-start gap-2">
                          <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: meta.color }} />
                          <span className="text-[#0d1b2a] text-sm"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: meta.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Đăng ký học miễn phí <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-2 block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>FAQ</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0d1b2a" }}>
              CÂU HỎI THƯỜNG GẶP
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e8edf7] p-5">
                <p className="text-[#0d1b2a] font-semibold text-sm mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{f.q}</p>
                <p className="text-[#5a6a85] text-sm leading-relaxed"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl py-14 px-8 md:px-16 text-center"
          style={{ background: "linear-gradient(120deg, #ff6b35 0%, #e84e1b 100%)" }}>
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-white mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}>
              ĐĂNG KÝ NHẬN LỊCH KHAI GIẢNG
            </h2>
            <p className="text-white/75 mb-7 max-w-md mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
              Gọi hoặc nhắn tin Zalo để nhận lịch khai giảng gần nhất và ưu đãi học phí.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-white text-[#e84e1b] hover:bg-[#fff8f5] px-7 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 shadow-xl cursor-pointer"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Đăng ký ngay
              </button>
              <a href="tel:0868367567"
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all backdrop-blur-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Phone size={15} /> 0868 367 567
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      {showModal && (
        <ConsultationModal
          onClose={() => setShowModal(false)}
          defaultService="Khóa học Ads / Edit video"
        />
      )}
    </div>
  );
}
