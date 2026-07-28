/**
 * VideoPage — "Cinematic / Agency Portfolio" layout
 * Full-bleed image hero → horizontal pain strip → alternating feature rows → film-strip process → production cards
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

const PURPLE = "#7c3aed";

const productionTypes = [
  { name: "Video TikTok / Reels", duration: "15–60 giây", icon: "📱", color: "#a855f7", tags: ["Hook mạnh", "Caption tự động", "Nhạc trend"] },
  { name: "Video bán hàng", duration: "1–3 phút", icon: "🎯", color: PURPLE, tags: ["Kịch bản AIDA", "CTA rõ ràng", "Phụ đề"] },
  { name: "TVC thương hiệu", duration: "30–60 giây", icon: "📺", color: "#6d28d9", tags: ["Concept sáng tạo", "4K UHD", "Motion graphic"] },
  { name: "Bộ ảnh sản phẩm", duration: "10–30 ảnh/set", icon: "📷", color: "#8b5cf6", tags: ["White background", "Lifestyle", "Detail shot"] },
];

export function VideoPage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  return (
    <div className="bg-[#f8f9fc]">
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: full-bleed image with overlay text ── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,#0d0019 30%,rgba(13,0,25,0.6) 65%,rgba(13,0,25,0.35) 100%)" }} />
          <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(168,85,247,0.08) 3px,rgba(168,85,247,0.08) 4px)" }} />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors" style={{ fontFamily: F }}>
              <ArrowLeft size={14} /> Trang chủ
            </Link>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#a855f7]/40 bg-[#a855f7]/12 text-[#a855f7] mb-5 inline-block" style={{ fontFamily: F }}>
              {service.eyebrow}
            </span>
            <h1 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 800, lineHeight: 1.05 }}>
              {service.title.toUpperCase()}
            </h1>
            <p className="font-semibold text-sm mb-4" style={{ fontFamily: F, color: "#c4b5fd" }}>{service.subtitle}</p>
            <p className="text-white/60 mb-8 max-w-lg" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem" }}>{service.heroDesc}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setPopup(true)}
                className="group flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: F, background: PURPLE, boxShadow: `0 8px 24px ${PURPLE}50` }}>
                {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:0868367567" className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                <Phone size={14} /> 0868 367 567
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS: horizontal dark strip ── */}
      <section className="py-10" style={{ background: "#1a0036" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#c4b5fd", fontFamily: F }}>Vấn đề khách hàng thường gặp</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" style={{ background: `${PURPLE}25`, color: "#c4b5fd" }}>!</div>
                <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: F }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── WORK ITEMS: alternating left/right rows ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PURPLE, fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ CHO BẠN?</h2>
          </div>
          <div className="space-y-6">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-8 ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg" style={{ background: `${PURPLE}12`, border: `1px solid ${PURPLE}25` }}>
                  {item.icon}
                </div>
                <div className="flex-1 bg-white rounded-2xl border border-purple-100 p-5 hover:shadow-xl hover:shadow-purple-50 transition-all duration-300 overflow-hidden relative">
                  <div className={`absolute top-0 ${i % 2 === 0 ? "left-0" : "right-0"} w-1 h-full`} style={{ background: PURPLE }} />
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 !== 0 ? "flex-row-reverse text-right" : ""}`}>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: PURPLE, fontFamily: FB }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>{item.title}</h3>
                  </div>
                  <p className={`text-[#5a6a85] text-sm leading-relaxed ${i % 2 !== 0 ? "text-right" : ""}`} style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS: horizontal film-strip ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PURPLE, fontFamily: F }}>Quy trình</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>QUY TRÌNH SẢN XUẤT CHUYÊN NGHIỆP</h2>
          </div>
          {/* Film strip container */}
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ background: `${PURPLE}25` }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.process.map((p, i) => (
                <motion.div key={p.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative bg-white rounded-2xl border border-purple-100 p-6 overflow-hidden hover:shadow-xl hover:shadow-purple-50 transition-all duration-300">
                  {[["top-2 left-2","border-t border-l"],["top-2 right-2","border-t border-r"],["bottom-2 left-2","border-b border-l"],["bottom-2 right-2","border-b border-r"]].map(([pos,bdr]) => (
                    <div key={pos} className={`absolute ${pos} w-3 h-3 ${bdr} opacity-30`} style={{ borderColor: PURPLE }} />
                  ))}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mb-4 mx-auto" style={{ fontFamily: FB, background: i === 0 ? PURPLE : "#f3f0ff", color: i === 0 ? "white" : PURPLE }}>
                    {p.step}
                  </div>
                  <h3 className="text-[#0d1b2a] font-bold text-sm mb-2 text-center" style={{ fontFamily: F }}>{p.title}</h3>
                  <p className="text-[#5a6a85] text-xs leading-relaxed text-center" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── PRODUCTION TYPES: 2×2 large cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PURPLE, fontFamily: F }}>Danh mục sản xuất</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI SẢN XUẤT GÌ?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {productionTypes.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-purple-100 p-6 overflow-hidden relative hover:shadow-xl hover:shadow-purple-50 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: t.color }} />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: `${t.color}10` }}>{t.icon}</div>
                  <div>
                    <p className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>{t.name}</p>
                    <p className="text-xs" style={{ color: t.color, fontFamily: F }}>{t.duration}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${t.color}10`, color: t.color, fontFamily: F }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PURPLE, fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent={PURPLE} />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#7c3aed 0%,#4c1d95 100%)" }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Gửi yêu cầu ngay — HL MEDIA sẽ liên hệ tư vấn và báo giá phù hợp nhất.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)} className="bg-white text-[#4c1d95] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: F }}>
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
