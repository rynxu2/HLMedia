import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Phân tích sản phẩm và khách hàng mục tiêu",
  "Xây dựng định hướng nội dung dài hạn",
  "Triển khai quảng cáo theo mục tiêu cụ thể",
  "Báo cáo hiệu quả và tối ưu liên tục",
  "Đào tạo và chuyển giao công cụ vận hành",
  "Hỗ trợ xử lý vấn đề nền tảng nhanh chóng",
];

const targets = [
  { icon: "🛒", title: "Nhà bán hàng Online", desc: "Tối ưu Fanpage, TikTok, Shopee, nội dung bán hàng và quảng cáo tăng inbox." },
  { icon: "👤", title: "Chuyên gia / Cá nhân thương hiệu", desc: "Xây hình ảnh cá nhân, kênh TikTok, nội dung tư vấn và độ tin cậy truyền thông." },
  { icon: "🏢", title: "Doanh nghiệp địa phương", desc: "Thiết kế nhận diện, website, video, quảng cáo khu vực và chăm sóc kênh bài bản." },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0a2463]/15">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop&auto=format"
                alt="Đội ngũ HL MEDIA làm việc"
                loading="lazy"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/55 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Văn phòng
                </p>
                <p className="text-white font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Tây Phương, Hà Nội · Lacasta Văn Phú, Hà Đông
                </p>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -top-5 -right-5 w-24 h-24 bg-[#ff6b35] rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-orange-500/30"
            >
              <span className="font-black text-2xl leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Đa
              </span>
              <span className="text-xs text-white/80 text-center leading-tight px-1">
                nền tảng
              </span>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
              Về HL MEDIA
            </span>
            <h2
              className="text-[#0d1b2a] mb-5"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              GIÚP THƯƠNG HIỆU PHÁT TRIỂN
              <br />
              <span className="text-[#0a2463]">NHỜ NỘI DUNG, QUẢNG CÁO</span>
              <br />
              VÀ CÔNG NGHỆ
            </h2>
            <p
              className="text-[#5a6a85] mb-4 leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.75 }}
            >
              HL MEDIA là đơn vị cung cấp giải pháp truyền thông, quảng cáo và phát triển kênh
              bán hàng online cho cá nhân, nhà bán hàng và doanh nghiệp.
            </p>
            <p
              className="text-[#5a6a85] mb-8 leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.75 }}
            >
              Chúng tôi không chỉ làm dịch vụ, mà còn{" "}
              <em className="text-[#0a2463] font-semibold not-italic">
                đồng hành từ tư vấn chiến lược, xây dựng nội dung, chạy quảng cáo, chăm sóc
                kênh, đào tạo và chuyển giao công cụ vận hành.
              </em>
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-2.5">
                  <CheckCircle2 size={17} className="text-[#ff6b35] mt-0.5 shrink-0" />
                  <span className="text-[#0d1b2a] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0a2463] hover:bg-[#0d2d7a] text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Tìm hiểu thêm về HL MEDIA
            </a>
          </motion.div>
        </div>

        {/* Target customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-[#e8edf7] pt-16"
        >
          <div className="text-center mb-10">
            <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-2 block">
              Nhóm khách hàng phù hợp
            </span>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 800,
                color: "#0d1b2a",
              }}
            >
              HL MEDIA PHÙ HỢP VỚI AI?
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {targets.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f8f9fc] rounded-2xl p-6 border border-[#e8edf7] text-center hover:shadow-lg hover:shadow-[#0a2463]/8 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{t.icon}</div>
                <h4
                  className="text-[#0d1b2a] mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}
                >
                  {t.title}
                </h4>
                <p
                  className="text-[#5a6a85] text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}
                >
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
