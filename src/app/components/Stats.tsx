import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { value: 500, suffix: "+", label: "Khách hàng đồng hành", icon: "🤝" },
  { value: 4, suffix: " nền tảng", label: "Hỗ trợ quảng cáo", icon: "📡" },
  { value: 300, suffix: "%", label: "ROI trung bình đạt được", icon: "📈" },
  { value: 24, suffix: "/7", label: "Hỗ trợ vận hành kênh", icon: "⚡" },
  { value: 5, suffix: " bước", label: "Quy trình rõ ràng", icon: "🗺️" },
  { value: 2, suffix: " văn phòng", label: "Hà Nội — Hà Đông", icon: "📍" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060f1e 0%, #0a2463 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Con số biết nói
          </span>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
            }}
          >
            HL MEDIA MANG LẠI{" "}
            <span className="text-[#ff6b35]">GIÁ TRỊ THỰC</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/12 hover:border-[#ff6b35]/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div
                className="text-white font-black mb-1 text-xl group-hover:text-[#ff6b35] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.6rem", textTransform: "capitalize" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p
                className="text-white/50 text-xs leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
