import { motion } from "motion/react";
import { CheckCircle2, Star, ArrowRight } from "lucide-react";

const plans = [
  {
    title: "Chăm sóc Fanpage",
    badge: null,
    icon: <img src="/verify.png" alt="Fanpage" />,
    desc: "Dành cho thương hiệu cần duy trì hình ảnh chuyên nghiệp và đăng bài đều đặn.",
    features: [
      "Kế hoạch nội dung tuần/tháng",
      "Viết bài chuẩn insight",
      "Thiết kế hình ảnh đồng bộ",
      "Seeding & phản hồi cơ bản",
      "Báo cáo định kỳ",
    ],
    cta: "Tư vấn ngay",
    highlight: false,
    color: "#1877f2",
  },
  {
    title: "Quảng cáo đa nền tảng",
    badge: "⭐ Được chọn nhiều nhất",
    icon: <img src="/facebook.png" alt="Quảng cáo đa nền tảng" />,
    desc: "Dành cho khách hàng muốn tăng inbox, đơn hàng và doanh số trên nhiều kênh.",
    features: [
      "Facebook Ads",
      "TikTok Ads",
      "Shopee Ads",
      "Tối ưu chi phí / kết quả",
      "Báo cáo hiệu quả hàng tuần",
    ],
    cta: "Tư vấn ngay",
    highlight: true,
    color: "#7c3aed",
  },
  {
    title: "Xây kênh TikTok",
    badge: null,
    icon: <img src="/tiktok.png" alt="Xây kênh TikTok" />,
    desc: "Dành cho cá nhân, chuyên gia, chủ shop muốn phát triển kênh video ngắn hiệu quả.",
    features: [
      "Định hướng kênh theo ngành hàng",
      "Lên kịch bản video",
      "Quay dựng / edit theo gói",
      "Tối ưu nhận diện & chuyển đổi",
      "Bắt trend phù hợp",
      "Báo cáo tăng trưởng kênh",
    ],
    cta: "Đăng ký ngay",
    highlight: false,
    color: "#ff6b35",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Bảng giá / Gói dịch vụ
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
            GÓI DỊCH VỤ PHỔ BIẾN
            <br />
            <span className="text-[#0a2463]">CHO TỪNG NHU CẦU</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#5a6a85] mb-12 max-w-xl mx-auto"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}
        >
          Giá có thể điều chỉnh theo ngành hàng, số lượng nội dung, ngân sách quảng cáo và
          mức độ triển khai thực tế. Liên hệ để nhận báo giá chi tiết.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.highlight
                  ? "border-[#ff6b35] shadow-2xl shadow-orange-500/15 scale-105"
                  : "border-[#e8edf7] hover:shadow-xl hover:shadow-[#0a2463]/8"
              }`}
            >
              {plan.highlight && (
                <div className="bg-[#ff6b35] text-white text-xs font-bold text-center py-2 px-4 tracking-wide uppercase">
                  ⭐ Được chọn nhiều nhất
                </div>
              )}
              <div className={`flex flex-col flex-1 p-7 ${plan.highlight ? "bg-white" : "bg-[#f8f9fc]"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
                    style={{ background: `${plan.color}18`, border: `1.5px solid ${plan.color}28` }}
                  >
                    {plan.icon}
                  </div>
                  <h3
                    className="text-[#0d1b2a]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem" }}
                  >
                    {plan.title}
                  </h3>
                </div>

                <p
                  className="text-[#5a6a85] text-sm mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}
                >
                  {plan.desc}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: plan.color }} />
                      <span
                        className="text-[#0d1b2a] text-sm"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    plan.highlight
                      ? "bg-[#ff6b35] hover:bg-[#ff8c5a] text-white shadow-lg shadow-orange-500/25"
                      : "bg-white border border-[#e8edf7] text-[#0a2463] hover:border-[#0a2463]/40 hover:shadow-md"
                  }`}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {plan.cta} <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#5a6a85] mt-8 text-sm"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Chưa chắc gói nào phù hợp? Gọi ngay{" "}
          <a href="tel:0868367567" className="text-[#ff6b35] font-semibold hover:underline">
            0868 367 567
          </a>{" "}
          để được tư vấn miễn phí.
        </motion.p>
      </div>
    </section>
  );
}
