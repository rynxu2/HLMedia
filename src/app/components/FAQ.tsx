import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Bên mình mới bắt đầu bán online thì nên chọn dịch vụ nào?",
    a: "Nên bắt đầu bằng tư vấn chiến lược, xây nội dung nền tảng và chọn 1–2 kênh chính như Fanpage, TikTok hoặc Shopee để triển khai trước. HL MEDIA sẽ tư vấn gói phù hợp sau khi nắm được sản phẩm, mục tiêu, ngân sách và tình trạng kênh hiện tại.",
  },
  {
    q: "HL MEDIA có nhận chạy quảng cáo theo khu vực không?",
    a: "Có. HL MEDIA có thể triển khai quảng cáo theo khu vực, độ tuổi, sở thích, hành vi và mục tiêu cụ thể như inbox, nhận diện thương hiệu hoặc chuyển đổi mua hàng.",
  },
  {
    q: "Có hỗ trợ làm nội dung video không?",
    a: "Có. HL MEDIA hỗ trợ lên kịch bản, quay dựng, edit video ngắn, thiết kế hình ảnh và nội dung bán hàng theo từng ngành hàng cụ thể.",
  },
  {
    q: "Có đào tạo để tự chạy Ads không?",
    a: "Có. Khóa học Facebook & TikTok Ads thực chiến giúp học viên hiểu cách setup, đọc chỉ số và tối ưu chiến dịch cơ bản — không còn lo \"đốt tiền\" vô ích.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#f8f9fc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Câu hỏi thường gặp
          </span>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 800,
              color: "#0d1b2a",
            }}
          >
            BẠN CÒN THẮC MẮC GÌ?
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                aria-expanded={open === i}
              >
                <span
                  className="text-[#0d1b2a] font-semibold text-sm pr-4 group-hover:text-[#0a2463] transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#5a6a85] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180 text-[#ff6b35]" : ""}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p
                      className="text-[#5a6a85] text-sm px-6 pb-5 leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
