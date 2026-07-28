/**
 * FanpagePage — "Social / Community" layout
 * Facebook-blue diagonal hero → notification pain cards → 2×3 icon work grid → horizontal 4-step process → post types
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, Bell } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

const FB_BLUE = "#1877f2";

const postTypes = [
  { type: "Bài viết insight", icon: "✍️", freq: "6 bài/tháng", desc: "Nội dung chuyên sâu, đúng tâm lý khách hàng mục tiêu.", color: FB_BLUE },
  { type: "Ảnh sản phẩm", icon: "📸", freq: "5 bài/tháng", desc: "Đồng bộ màu sắc, highlight tính năng nổi bật.", color: "#e25c1e" },
  { type: "Infographic", icon: "📊", freq: "3 bài/tháng", desc: "Dữ liệu, quy trình — dễ chia sẻ, tăng reach.", color: "#10b981" },
  { type: "Minigame / Vote", icon: "🎮", freq: "2 bài/tháng", desc: "Tăng tương tác, kéo organic reach.", color: "#f59e0b" },
  { type: "Video ngắn / Reels", icon: "🎬", freq: "3 bài/tháng", desc: "15–60s, hook mạnh, Facebook ưu tiên video.", color: "#7c3aed" },
  { type: "Story & Highlights", icon: "⭕", freq: "Hàng ngày", desc: "Flash sale, hậu trường — giữ kết nối 24/7.", color: "#fe2c55" },
];

export function FanpagePage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "#f0f4ff" }}>
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: Facebook blue with social card mockup ── */}
      <section className="relative overflow-hidden pt-28 pb-0" style={{ background: "linear-gradient(150deg,#0f2d6e 0%,#1877f2 65%,#0f52b6 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%,rgba(255,255,255,0.06) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,255,255,0.06) 0%,transparent 40%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors" style={{ fontFamily: F }}>
            <ArrowLeft size={14} /> Trang chủ
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30 bg-white/10 text-white/80 mb-5 inline-block" style={{ fontFamily: F }}>
                {service.eyebrow}
              </span>
              <h1 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.08 }}>
                {service.title.toUpperCase()}
              </h1>
              <p className="text-[#fde68a] font-semibold text-sm mb-4" style={{ fontFamily: F }}>{service.subtitle}</p>
              <p className="text-white/65 mb-7 max-w-lg" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem" }}>{service.heroDesc}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPopup(true)}
                  className="group flex items-center gap-2 bg-white text-[#1877f2] px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ fontFamily: F }}>
                  {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="tel:0868367567" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                  <Phone size={14} /> 0868 367 567
                </a>
              </div>
            </motion.div>

            {/* Right — Facebook page mockup */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex justify-center">
              <div className="w-72 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-24 w-full" style={{ background: "linear-gradient(135deg,#1455c0,#0a3da0)" }} />
                <div className="px-5 pb-5">
                  <div className="-mt-10 flex items-end justify-between mb-3">
                    <div className="w-20 h-20 rounded-full border-4 border-white bg-blue-50 flex items-center justify-center text-3xl">🏪</div>
                    <div className="bg-[#1877f2] text-white text-xs px-4 py-1.5 rounded-full font-bold mb-1" style={{ fontFamily: F }}>+ Thích trang</div>
                  </div>
                  <p className="text-[#0d1b2a] font-bold text-sm mb-0.5" style={{ fontFamily: F }}>Thương hiệu của bạn</p>
                  <p className="text-[#5a6a85] text-xs mb-3" style={{ fontFamily: F }}>12,400 người thích trang này</p>
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <p className="text-[#0d1b2a] text-xs mb-2" style={{ fontFamily: F }}>✨ Nội dung chuẩn insight giúp khách nhớ đến bạn ngay lần đầu...</p>
                    <div className="w-full h-18 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-3xl py-4">🎨</div>
                    <div className="flex gap-4 mt-2 text-[#5a6a85] text-xs" style={{ fontFamily: F }}>
                      <span>👍 248</span><span>💬 36</span><span>↗ 12</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <svg viewBox="0 0 1440 44" fill="none" className="w-full block">
          <path d="M0 44H1440V22C1200 44 900 0 720 14C540 28 240 0 0 22V44Z" fill="#f0f4ff" />
        </svg>
      </section>

      {/* ── PAIN POINTS: notification-style cards ── */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: FB_BLUE, fontFamily: F }}>Vấn đề thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>FANPAGE CỦA BẠN ĐANG GẶP PHẢI?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white rounded-2xl border border-blue-100 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center shrink-0">
                  <Bell size={14} className="text-white" />
                </div>
                <p className="text-[#3d3d3d] text-sm leading-relaxed pt-1" style={{ fontFamily: F }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 pb-16">
        {/* ── WORK ITEMS: 2×3 icon grid ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: FB_BLUE, fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ CHO FANPAGE BẠN?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-blue-50 p-5 flex gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${FB_BLUE}10` }}>{item.icon}</div>
                <div>
                  <h3 className="text-[#0d1b2a] font-bold text-sm mb-1.5" style={{ fontFamily: F }}>{item.title}</h3>
                  <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS: horizontal 4-step strip ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: FB_BLUE, fontFamily: F }}>Quy trình</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>QUY TRÌNH TRIỂN KHAI 4 BƯỚC</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5" style={{ background: `${FB_BLUE}20` }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.process.map((p, i) => (
                <motion.div key={p.step} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center bg-white rounded-2xl border border-blue-50 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-xl" style={{ fontFamily: FB, background: i === 0 ? FB_BLUE : i === 3 ? "#0d2460" : "#e8f0fe", color: i <= 1 || i === 3 ? "white" : FB_BLUE }}>
                    {p.step}
                  </div>
                  <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{p.title}</h3>
                  <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── POST TYPES ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: FB_BLUE, fontFamily: F }}>Content Mix</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>BỘ NỘI DUNG FANPAGE TOÀN DIỆN</h2>
            <p className="text-[#5a6a85] text-sm mt-2 max-w-md mx-auto" style={{ fontFamily: F }}>6 loại nội dung phối hợp để Fanpage luôn sống động và thu hút.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {postTypes.map((pt, i) => (
              <motion.div key={pt.type} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: pt.color }} />
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${pt.color}10` }}>{pt.icon}</div>
                  <div>
                    <p className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>{pt.type}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${pt.color}12`, color: pt.color, fontFamily: F }}>{pt.freq}</span>
                  </div>
                </div>
                <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.6 }}>{pt.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: FB_BLUE, fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent={FB_BLUE} />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#1877f2 0%,#0a4fcf 100%)" }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Để lại thông tin — HL MEDIA sẽ gửi kế hoạch nội dung mẫu và tư vấn gói phù hợp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)} className="bg-white text-[#1877f2] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: F }}>
              {service.ctaButton}
            </button>
            <a href="tel:0868367567" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
              <Phone size={15} /> 0868 367 567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
