import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    slug: "xay-kenh-tiktok",
    icon: <img src="./tiktok.png" alt="Xây kênh TikTok" />,
    title: "Xây dựng kênh TikTok",
    desc: "Lên chiến lược nội dung theo ngành hàng, bắt trend phù hợp, tăng view thật và xây dựng hình ảnh chuyên nghiệp.",
    color: "#010101",
    bg: "from-slate-700/10 to-slate-700/5",
    tags: ["Chiến lược nội dung", "Bắt trend", "Tăng chuyển đổi"],
  },
  {
    slug: "quang-cao-da-nen-tang",
    icon: <img src="./facebook.png" alt="Quảng cáo đa nền tảng" />,
    title: "Quảng cáo đa nền tảng",
    desc: "Triển khai Facebook Ads, TikTok Ads, Shopee Ads theo mục tiêu nhận diện, inbox, chuyển đổi và doanh số.",
    color: "#1877f2",
    bg: "from-blue-600/10 to-blue-600/5",
    tags: ["Facebook Ads", "TikTok Ads", "Shopee Ads"],
  },
  {
    slug: "cham-soc-fanpage",
    icon: <img src="./verify.png" alt="Chăm sóc Fanpage" />,
    title: "Chăm sóc Fanpage",
    desc: "Lên kế hoạch nội dung, viết bài chuẩn insight, thiết kế hình ảnh đồng bộ, đăng bài đúng giờ và báo cáo định kỳ.",
    color: "#e25c1e",
    bg: "from-orange-600/10 to-orange-600/5",
    tags: ["Nội dung insight", "Thiết kế đồng bộ", "Báo cáo định kỳ"],
  },
  {
    slug: "quay-dung-video-thiet-ke",
    icon: "🎬",
    title: "Quay dựng video & thiết kế",
    desc: "Sản xuất video, hình ảnh, TVC, nội dung bán hàng và nhận diện thương hiệu giúp thương hiệu nổi bật hơn.",
    color: "#7c3aed",
    bg: "from-violet-600/10 to-violet-600/5",
    tags: ["Video bán hàng", "TVC", "Bộ nhận diện"],
  },
  {
    slug: "thiet-ke-website-app-shopee",
    icon: "🌐",
    title: "Thiết kế Website / App / Shopee",
    desc: "Giao diện hiện đại, chuẩn SEO, tối ưu hiển thị sản phẩm, tăng chuyển đổi và hỗ trợ vận hành bán hàng 24/7.",
    color: "#0a2463",
    bg: "from-blue-900/10 to-blue-900/5",
    tags: ["Chuẩn SEO", "Gian hàng Shopee", "Tối ưu chuyển đổi"],
  },
  {
    slug: "tich-xanh-bao-ve-kenh",
    icon: "🛡️",
    title: "Tích xanh & bảo vệ kênh",
    desc: "Tư vấn hồ sơ uy tín, kiểm tra rủi ro vi phạm, xử lý cảnh báo và hướng dẫn livestream đúng chính sách.",
    color: "#10b981",
    bg: "from-green-600/10 to-green-600/5",
    tags: ["Tích xanh TikTok/FB", "Xử lý cảnh báo", "Chính sách LIVE"],
  },
];

export function Services() {
  return (
    <section id="services" className="pt-12 pb-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Dịch vụ tiêu biểu
          </span>
          <h2
            className="text-[#0d1b2a] mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            GIẢI PHÁP TOÀN DIỆN
            <br />
            <span className="text-[#0a2463]">VỀ DIGITAL MARKETING</span>
          </h2>
          <p
            className="text-[#5a6a85] max-w-xl mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}
          >
            Thiết kế theo nhu cầu thực tế của cá nhân, nhà bán hàng và doanh nghiệp: từ tư vấn
            chiến lược, sản xuất nội dung đến quảng cáo và hệ thống bán hàng.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={`/dich-vu/${svc.slug}`}
                className={`group relative bg-white rounded-2xl p-6 border border-[#e8edf7] hover:border-[#0a2463]/25 hover:shadow-2xl hover:shadow-[#0a2463]/8 transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${svc.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative flex flex-col h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm"
                    style={{ background: `${svc.color}18`, border: `1.5px solid ${svc.color}28` }}
                  >
                    {svc.icon}
                  </div>
                  <h3
                    className="text-[#0d1b2a] mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.05rem", fontWeight: 700 }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[#5a6a85] text-sm mb-4 flex-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}
                  >
                    {svc.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {svc.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${svc.color}14`, color: svc.color, border: `1px solid ${svc.color}22` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mt-auto"
                    style={{ color: svc.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Xem chi tiết
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p
            className="text-[#5a6a85] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Chưa biết nên chọn dịch vụ nào? Để HL MEDIA tư vấn miễn phí cho bạn.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#0a2463] hover:bg-[#0d2d7a] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Nhận tư vấn miễn phí <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
