import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const courses = [
  {
    icon: "📣",
    label: "Quảng cáo",
    title: "Facebook & TikTok Ads thực chiến",
    desc: "Học cách thiết lập, vận hành, đọc chỉ số và tối ưu quảng cáo để hạn chế tình trạng \"đốt tiền\". Phù hợp cho người mới bắt đầu đến trung cấp.",
    topics: ["Thiết lập chiến dịch", "Đọc chỉ số & tối ưu", "Quản lý ngân sách", "Tránh vi phạm chính sách"],
    color: "#1877f2",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=280&fit=crop&auto=format",
  },
  {
    icon: "🎬",
    label: "Sáng tạo nội dung",
    title: "Edit video từ cơ bản đến nâng cao",
    desc: "Tự dựng video bán hàng, video thương hiệu và video ngắn đa nền tảng, tăng giữ chân người xem và dễ viral hơn.",
    topics: ["Kỹ thuật quay cơ bản", "Edit video bán hàng", "Video ngắn TikTok/Reels", "Hiệu ứng & âm thanh"],
    color: "#7c3aed",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=280&fit=crop&auto=format",
  },
];

export function Courses() {
  return (
    <section id="courses" className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
              Khóa học thực chiến
            </span>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#0d1b2a",
                lineHeight: 1.15,
              }}
            >
              ĐÀO TẠO ĐỂ BẠN TỰ TIN
              <br />
              <span className="text-[#0a2463]">LÀM CHỦ QUẢNG CÁO & NỘI DUNG</span>
            </h2>
          </div>
          <Link
            to="/khoa-hoc"
            className="inline-flex items-center gap-2 text-[#0a2463] font-semibold text-sm hover:text-[#ff6b35] transition-colors shrink-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Xem tất cả khóa học <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to="/khoa-hoc"
                className="group block bg-white rounded-2xl border border-[#e8edf7] overflow-hidden hover:shadow-2xl hover:shadow-[#0a2463]/10 transition-all duration-300 hover:-translate-y-1 h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span
                    className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                    style={{ background: c.color }}
                  >
                    {c.icon} {c.label}
                  </span>
                </div>

                <div className="p-7">
                  <h3
                    className="text-[#0d1b2a] mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-[#5a6a85] text-sm mb-5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}
                  >
                    {c.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {c.topics.map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }} />
                        <span
                          className="text-[#0d1b2a] text-xs"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span
                    className="inline-flex items-center gap-2 font-semibold text-sm transition-colors"
                    style={{ color: c.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Xem chi tiết khóa học{" "}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
