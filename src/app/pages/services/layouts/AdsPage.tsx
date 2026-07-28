/**
 * AdsPage — "Performance & Analytics" layout
 * Dark navy hero | horizontal pain strip | numbered work grid | 2×2 process | case studies | FAQ
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, AlertTriangle } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

export function AdsPage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  const cases = [
    { brand: "Fashion & Beauty", metric: "ROAS 4.2x", sub: "TikTok + Facebook kết hợp", detail: "Giảm CPR 58%, tăng revenue 3.8x sau 45 ngày.", icon: "👗", color: "#e91e8c" },
    { brand: "F&B – Nhà hàng", metric: "200+ leads/tháng", sub: "Facebook Ads theo khu vực", detail: "CPL 15.000đ, chuyển đổi inbox → đặt bàn 32%.", icon: "🍜", color: "#ff6b35" },
    { brand: "Shopee Store", metric: "Doanh số ×3.4", sub: "Shopee Ads + Flash Sale", detail: "Tăng từ 50tr → 170tr/tháng sau 60 ngày.", icon: "🛍️", color: "#ee4d2d" },
  ];

  return (
    <div className="bg-[#f8f9fc]">
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: 2-col dark navy ── */}
      <section className="relative overflow-hidden pt-28 pb-0"
        style={{ background: "linear-gradient(135deg,#060f1e 0%,#0a2463 60%,#0d1b4a 100%)" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#ff6b35]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors" style={{ fontFamily: F }}>
            <ArrowLeft size={14} /> Trang chủ
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-end pb-16">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/12 text-[#ff6b35] mb-5 inline-block" style={{ fontFamily: F }}>
                {service.eyebrow}
              </span>
              <h1 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.08 }}>
                {service.title.toUpperCase()}
              </h1>
              <p className="text-[#ff6b35] font-semibold text-sm mb-4" style={{ fontFamily: F }}>{service.subtitle}</p>
              <p className="text-white/60 mb-8 max-w-lg" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem" }}>{service.heroDesc}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setPopup(true)}
                  className="group flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-0.5"
                  style={{ fontFamily: F }}>
                  {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="tel:0868367567" className="flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white border border-white/20 px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                  <Phone size={14} /> 0868 367 567
                </a>
              </div>
            </motion.div>

            {/* Right — animated metrics dashboard */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider" style={{ fontFamily: F }}>Kết quả chiến dịch</p>
                    <p className="text-white font-bold" style={{ fontFamily: FB, fontSize: "1.1rem" }}>Tháng 6 / 2026</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-semibold border border-green-500/30" style={{ fontFamily: F }}>+240% Doanh số</span>
                </div>
                <div className="flex items-end gap-1.5 h-16 mb-4">
                  {[35,55,45,72,60,85,68,92,78,100,88,115].map((h, i) => (
                    <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.04 }}
                      className="flex-1 rounded-t-sm origin-bottom"
                      style={{ height: `${h * 0.85}%`, background: i === 11 ? "#ff6b35" : i >= 9 ? "rgba(255,107,53,.4)" : "rgba(255,255,255,.14)" }} />
                  ))}
                </div>
                {[{ label: "Facebook Ads", value: "₫4.200/kết quả", pct: 78 }, { label: "TikTok Ads", value: "₫2.800/kết quả", pct: 92 }, { label: "Shopee Ads", value: "ROAS 4.5x", pct: 65 }].map(row => (
                  <div key={row.label} className="mb-2.5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/55" style={{ fontFamily: F }}>{row.label}</span>
                      <span className="text-white font-medium" style={{ fontFamily: F }}>{row.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${row.pct}%` }} transition={{ duration: 0.8, delay: 0.7 }}
                        className="h-full bg-[#ff6b35] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 44" fill="none" className="w-full block">
          <path d="M0 44H1440V22C1200 44 900 0 720 14C540 28 240 0 0 22V44Z" fill="#f8f9fc" />
        </svg>
      </section>

      {/* ── PAIN POINTS: horizontal accent strip ── */}
      <section className="bg-[#fff8f5] border-y border-orange-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-6" style={{ fontFamily: F }}>Bạn đang gặp phải điều này?</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                <AlertTriangle size={16} className="text-[#ff6b35] shrink-0 mt-0.5" />
                <p className="text-[#3d3d3d] text-sm leading-relaxed" style={{ fontFamily: F }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── WORK ITEMS: numbered 2+3 grid ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-2 block" style={{ fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ CHO BẠN?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#e8edf7] p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#0a2463] text-white flex items-center justify-center font-black text-sm shrink-0" style={{ fontFamily: FB }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{item.title}</h3>
                <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS: 2×2 large cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-2 block" style={{ fontFamily: F }}>Quy trình</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>QUY TRÌNH 4 BƯỚC CHUẨN</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {service.process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl border border-[#e8edf7] p-7 overflow-hidden hover:shadow-xl hover:shadow-[#0a2463]/8 transition-all duration-300">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-2xl" style={{ background: i === 0 ? "#ff6b35" : i === 3 ? "#0a2463" : "#e8edf7" }} />
                <p className="font-black mb-2" style={{ fontFamily: FB, fontSize: "2.5rem", color: i === 0 ? "#ff6b35" : i === 3 ? "#0a2463" : "#e8edf7", lineHeight: 1 }}>{p.step}</p>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{p.title}</h3>
                <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CASE STUDIES: 3-col ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-2 block" style={{ fontFamily: F }}>Case Study</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>KẾT QUẢ THỰC TẾ TỪ KHÁCH HÀNG</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <motion.div key={c.brand} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-1.5 w-full" style={{ background: c.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${c.color}12` }}>{c.icon}</div>
                    <div>
                      <p className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>{c.brand}</p>
                      <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>{c.sub}</p>
                    </div>
                  </div>
                  <div className="py-2.5 px-4 rounded-xl mb-3" style={{ background: `${c.color}10` }}>
                    <p className="font-black text-2xl" style={{ fontFamily: FB, color: c.color }}>{c.metric}</p>
                  </div>
                  <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{c.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b35] mb-2 block" style={{ fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent="#ff6b35" />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#ff6b35 0%,#e84e1b 100%)" }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Để lại thông tin — HL MEDIA sẽ tư vấn giải pháp phù hợp nhất với ngành hàng và ngân sách của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)}
              className="bg-white text-[#e84e1b] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: F }}>{service.ctaButton}</button>
            <a href="tel:0868367567" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
              style={{ fontFamily: F }}><Phone size={15} /> 0868 367 567</a>
          </div>
        </div>
      </section>
    </div>
  );
}
