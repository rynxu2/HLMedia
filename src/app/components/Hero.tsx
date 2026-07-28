import { motion } from "motion/react";
import { ArrowRight, Play, Star, TrendingUp } from "lucide-react";

const platforms = [
  { icon: "📘", label: "Facebook Ads" },
  { icon: "🎵", label: "TikTok Ads" },
  { icon: "🛍️", label: "Shopee Ads" },
  { icon: "🌐", label: "Website" },
  { icon: "📹", label: "Video Content" },
  { icon: "📡", label: "Livestream" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060f1e 0%, #0a2463 55%, #0d1b4a 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#ff6b35]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#0a2463]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-10 grid lg:grid-cols-2 gap-10 items-center m-15">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Slogan chip */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-sm mb-5">
            <TrendingUp size={12} className="text-[#ff6b35]" />
            <span className="font-semibold tracking-wide">KẾT NỐI · SÁNG TẠO · BỨT PHÁ</span>
          </div>

          <h1
            className="text-white mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            GIẢI PHÁP TRUYỀN THÔNG
            <br />
            <span className="text-[#ff6b35]">&amp; TĂNG TRƯỞNG DOANH SỐ</span>
            <br />
            <span className="text-white/55">ĐA NỀN TẢNG</span>
          </h1>

          <p
            className="text-white/65 mb-6 max-w-lg"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7 }}
          >
            HL MEDIA đồng hành cùng cá nhân, nhà bán hàng và doanh nghiệp xây dựng thương hiệu,
            phát triển kênh bán hàng và tối ưu doanh thu trên{" "}
            <span className="text-white font-semibold">Facebook, TikTok, Shopee và Website</span>.
          </p>

          <div className="flex flex-wrap gap-3 mb-7">
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow-xl shadow-orange-500/30 hover:-translate-y-0.5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Tư vấn miễn phí ngay
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 border border-white/20 backdrop-blur-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <Play size={14} />
              Xem dịch vụ
            </a>
          </div>

          {/* Platform chips */}
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <span
                key={p.label}
                className="flex items-center gap-1.5 bg-white/8 text-white/70 text-xs px-3 py-1.5 rounded-full border border-white/12"
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — results dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider">Kết quả chiến dịch</p>
                <p className="text-white font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}>
                  Tháng 6 / 2026
                </p>
              </div>
              <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-semibold border border-green-500/30">
                +240% Doanh số
              </span>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-16 mb-4">
              {[35, 55, 45, 72, 60, 85, 68, 92, 78, 100, 88, 115].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                  className="flex-1 rounded-t-sm origin-bottom"
                  style={{
                    height: `${h * 0.85}%`,
                    background:
                      i === 11
                        ? "#ff6b35"
                        : i >= 9
                        ? "rgba(255,107,53,0.45)"
                        : "rgba(255,255,255,0.14)",
                  }}
                />
              ))}
            </div>

            {/* Platform rows */}
            {[
              { label: "Facebook Ads", value: "₫4.200/kết quả", pct: 78 },
              { label: "TikTok Ads", value: "₫2.800/kết quả", pct: 92 },
              { label: "Shopee Ads", value: "ROAS 4.5x", pct: 65 },
            ].map((row) => (
              <div key={row.label} className="mb-2.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/60">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="h-full bg-[#ff6b35] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -left-10 -top-13 bg-[#ff6b35] rounded-xl px-3 py-2.5 shadow-xl"
          >
            <p className="text-white font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>5 Bước</p>
            <p className="text-white/80 text-xs">Quy trình chuẩn</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -right-6 -bottom-10 bg-[#0a2463] border border-white/20 rounded-xl px-3 py-2.5 shadow-xl"
          >
            <p className="text-white font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>24/7</p>
            <p className="text-white/70 text-xs">Hỗ trợ tận tình</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="relative">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block -mb-1" aria-hidden="true">
          <path d="M0 48H1440V24C1200 48 900 0 720 16C540 32 240 0 0 24V48Z" fill="#f8f9fc" />
        </svg>
      </div>
    </section>
  );
}
