import { motion } from "motion/react";
import { FlaskConical, ShieldCheck, GitBranch, HeadphonesIcon, Target } from "lucide-react";

const values = [
  {
    icon: FlaskConical,
    num: "01",
    title: "Giải pháp khoa học",
    desc: "Không chạy theo cảm tính. HL MEDIA phân tích sản phẩm, chân dung khách hàng, nền tảng phù hợp và mục tiêu doanh thu trước khi triển khai.",
    color: "#6366f1",
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "Ưu tiên chất lượng",
    desc: "Nội dung, hình ảnh, video và quảng cáo đều hướng đến sự rõ ràng, chuyên nghiệp và dễ tạo niềm tin với khách hàng.",
    color: "#10b981",
  },
  {
    icon: GitBranch,
    num: "03",
    title: "Quy trình chuyên nghiệp",
    desc: "Từ tiếp nhận, tư vấn, lên kế hoạch, triển khai đến báo cáo đều có đầu mục rõ ràng và minh bạch.",
    color: "#0a2463",
  },
  {
    icon: HeadphonesIcon,
    num: "04",
    title: "Hỗ trợ tận tình",
    desc: "Đồng hành trong quá trình vận hành kênh, xử lý vấn đề nội dung, quảng cáo và chính sách nền tảng.",
    color: "#ff6b35",
  },
  {
    icon: Target,
    num: "05",
    title: "Tập trung chuyển đổi",
    desc: "Mục tiêu cuối cùng là giúp khách hàng có thêm nhận diện, thêm khách hàng tiềm năng và tăng trưởng doanh số bền vững.",
    color: "#e25c1e",
  },
];

const steps = [
  {
    num: "01",
    title: "Tiếp nhận thông tin",
    desc: "Lắng nghe mục tiêu, sản phẩm, ngân sách, nền tảng đang dùng và vấn đề đang gặp phải.",
  },
  {
    num: "02",
    title: "Phân tích & đề xuất",
    desc: "Đánh giá kênh hiện tại, xác định khách hàng mục tiêu và đề xuất giải pháp phù hợp.",
  },
  {
    num: "03",
    title: "Lập kế hoạch cụ thể",
    desc: "Lên kế hoạch nội dung, lịch đăng, kịch bản video, ngân sách quảng cáo và KPI từng giai đoạn.",
  },
  {
    num: "04",
    title: "Triển khai thực tế",
    desc: "Sản xuất nội dung, chạy quảng cáo, chăm sóc kênh, tối ưu website/gian hàng theo gói dịch vụ.",
  },
  {
    num: "05",
    title: "Báo cáo & tối ưu",
    desc: "Theo dõi chỉ số, báo cáo định kỳ và điều chỉnh để tăng hiệu quả truyền thông và doanh số.",
  },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Tất cả những gì bạn cần
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
            MỘT HỆ SINH THÁI TRUYỀN THÔNG
            <br />
            <span className="text-[#ff6b35]">DÀNH CHO BÁN HÀNG ONLINE</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-[#e8edf7] hover:shadow-xl hover:shadow-[#0a2463]/8 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${v.color}18` }}
                >
                  <v.icon size={20} style={{ color: v.color }} />
                </div>
                <span
                  className="text-xs font-black opacity-20"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.8rem", color: v.color }}
                >
                  {v.num}
                </span>
              </div>
              <h3
                className="text-[#0d1b2a] mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", fontWeight: 700 }}
              >
                {v.title}
              </h3>
              <p
                className="text-[#5a6a85] text-xs leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}
              >
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 5-step process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-[#e8edf7] p-8 md:p-12 shadow-sm"
        >
          <div className="text-center mb-10">
            <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-2 block">
              Quy trình triển khai
            </span>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 800,
                color: "#0d1b2a",
              }}
            >
              QUY TRÌNH 5 BƯỚC RÕ RÀNG, CHUYÊN NGHIỆP
            </h3>
          </div>

          <div className="grid sm:grid-cols-5 gap-6 relative">
            {/* Connector */}
            <div className="hidden sm:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#0a2463]/15 to-transparent" />
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex flex-col items-center justify-center mx-auto mb-4 shadow-md"
                  style={{
                    background: i === 0 ? "#ff6b35" : i === 4 ? "#0a2463" : "white",
                    border: `2px solid ${i === 0 ? "#ff6b35" : i === 4 ? "#0a2463" : "#e8edf7"}`,
                  }}
                >
                  <span
                    className="font-black text-lg"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: i === 0 || i === 4 ? "white" : "#0a2463",
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <h4
                  className="text-[#0d1b2a] mb-1.5 text-xs"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, lineHeight: 1.3 }}
                >
                  {s.title}
                </h4>
                <p
                  className="text-[#5a6a85] text-xs"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.55 }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
