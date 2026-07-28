/**
 * TikTokPage — "Creator / Dark Mode" layout
 * Full-width centered dark hero → content pillars → dark pain section → horizontal work timeline → vertical process
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

const PINK = "#fe2c55";
const TEAL = "#25f4ee";

const pillars = [
  { name: "Giáo dục & Tips", emoji: "💡", color: TEAL, desc: "How-to, mẹo ngành — xây dựng uy tín chuyên gia tự nhiên.", topics: ["5 lỗi khi mua...", "Cách chọn đúng", "Bí kíp tiết kiệm"] },
  { name: "Bán hàng thông minh", emoji: "🛒", color: PINK, desc: "Showcase sản phẩm, unboxing, review thật — chuyển đổi cao.", topics: ["Unboxing + reaction", "Before & After", "So sánh + chốt đơn"] },
  { name: "Giải trí & Trending", emoji: "🔥", color: "#ff6b35", desc: "Bắt trend, thử thách viral — tăng reach tự nhiên không tốn phí.", topics: ["Duet trend hot", "POV sáng tạo", "Stitch phản hồi"] },
  { name: "Hậu trường thương hiệu", emoji: "🎬", color: "#a855f7", desc: "Behind-the-scene, story thương hiệu — tạo kết nối cảm xúc thật.", topics: ["1 ngày làm việc", "Hành trình thành lập", "Team & văn hoá"] },
];

export function TikTokPage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "#fafafa" }}>
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: full-width centered dark ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#05000d 0%,#10001a 60%,#000d1a 100%)" }}>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: `${PINK}10` }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: `${TEAL}0c` }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-0 text-center">
          <div className="text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-10 transition-colors" style={{ fontFamily: F }}>
              <ArrowLeft size={14} /> Trang chủ
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ fontFamily: F, color: PINK, borderColor: `${PINK}40`, background: `${PINK}10` }}>
                {service.eyebrow}
              </span>
              {service.badge && (
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: PINK, fontFamily: F }}>⭐ {service.badge}</span>
              )}
            </div>

            <h1 className="text-white mx-auto mb-4" style={{ fontFamily: FB, fontSize: "clamp(2.4rem,6vw,4.2rem)", fontWeight: 800, lineHeight: 1.05, maxWidth: "800px" }}>
              {service.title.toUpperCase()}
            </h1>
            <p className="font-semibold mb-4 text-sm" style={{ fontFamily: F, color: TEAL }}>{service.subtitle}</p>
            <p className="text-white/55 mb-8 mx-auto" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem", maxWidth: "540px" }}>{service.heroDesc}</p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button onClick={() => setPopup(true)}
                className="group flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: F, background: PINK, boxShadow: `0 8px 24px ${PINK}40` }}>
                {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:0868367567" className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                <Phone size={14} /> 0868 367 567
              </a>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block">
            <div className="w-52 h-[340px] mx-auto rounded-[2.4rem] border-4 border-white/15 overflow-hidden shadow-2xl" style={{ background: "linear-gradient(180deg,#0a0a0a,#151515)" }}>
              <div className="h-7 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-1.5 bg-white/20 rounded-full" />
              </div>
              <div className="px-3 py-2 space-y-2 flex-1">
                {["🎵 Hook 3 giây cực mạnh", "🔥 Trend phù hợp ngành", "👥 Follower thật 100%", "🛒 Chuyển đổi ra đơn"].map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.15 }}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 bg-white/8 border border-white/8">
                    <span className="text-sm">{t.split(" ")[0]}</span>
                    <span className="text-white text-xs font-semibold" style={{ fontFamily: F }}>{t.split(" ").slice(1).join(" ")}</span>
                  </motion.div>
                ))}
              </div>
              <div className="h-9 bg-black/30 flex items-center justify-around px-5">
                {["🏠","🔍","➕","💬","👤"].map((e, i) => <span key={i} className="text-sm opacity-60">{e}</span>)}
              </div>
            </div>
            <div className="absolute -top-4 -right-8 w-16 h-16 rounded-full blur-2xl" style={{ background: PINK }} />
            <div className="absolute -bottom-4 -left-6 w-12 h-12 rounded-full blur-xl" style={{ background: TEAL }} />
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 44" fill="none" className="w-full block mt-8">
          <path d="M0 44H1440V22C1200 44 900 0 720 14C540 28 240 0 0 22V44Z" fill="#fafafa" />
        </svg>
      </section>

      {/* ── CONTENT PILLARS (unique, placed prominently) ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PINK, fontFamily: F }}>Content Framework</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>4 TRỤ CỘT NỘI DUNG CHUẨN HL MEDIA</h2>
            <p className="text-[#5a6a85] text-sm mt-2 max-w-lg mx-auto" style={{ fontFamily: F }}>Mỗi kênh được xây dựng trên 4 content pillar — đa dạng, không nhàm và luôn có mục tiêu chuyển đổi.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: p.color }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${p.color}12` }}>{p.emoji}</div>
                  <div>
                    <p className="font-bold text-sm text-[#0d1b2a]" style={{ fontFamily: F }}>{p.name}</p>
                    <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>~25% nội dung kênh</p>
                  </div>
                </div>
                <p className="text-[#5a6a85] text-sm mb-3" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.topics.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: `${p.color}10`, color: p.color, fontFamily: F }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS: dark section ── */}
      <section className="py-14" style={{ background: "#111" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PINK, fontFamily: F }}>Lỗi thường gặp</span>
            <h2 className="text-white" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800 }}>BẠN CÓ ĐANG MẮC NHỮNG LỖI NÀY?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-2xl p-5 border" style={{ background: "#1a1a1a", borderColor: i % 2 === 0 ? `${PINK}30` : `${TEAL}20`, borderLeftWidth: 3 }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold" style={{ background: i % 2 === 0 ? `${PINK}20` : `${TEAL}20`, color: i % 2 === 0 ? PINK : TEAL }}>!</div>
                <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── WORK ITEMS: horizontal timeline with numbers ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PINK, fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ CHO KÊNH BẠN?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: i % 2 === 0 ? PINK : TEAL }} />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: i % 2 === 0 ? `${PINK}12` : `${TEAL}12`, color: i % 2 === 0 ? PINK : TEAL, fontFamily: FB }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{item.title}</h3>
                <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS: vertical app-style timeline ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PINK, fontFamily: F }}>Quy trình</span>
              <h2 className="text-[#0d1b2a] mb-8" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 800, lineHeight: 1.15 }}>
                QUY TRÌNH 4 BƯỚC XÂY KÊNH BÀI BẢN
              </h2>
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5" style={{ background: `${PINK}25` }} />
                {service.process.map((p, i) => (
                  <motion.div key={p.step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="relative pb-7 last:pb-0">
                    <div className="absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center top-0.5" style={{ background: "#fafafa", borderColor: PINK }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: PINK }} />
                    </div>
                    <p className="text-[#0d1b2a] font-bold text-sm mb-1" style={{ fontFamily: F }}>{p.title}</p>
                    <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/55 text-xs mb-1" style={{ fontFamily: F }}>HL MEDIA · TikTok</p>
                <p className="text-white font-bold text-sm" style={{ fontFamily: F }}>{service.subtitle}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: PINK, fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent={PINK} />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#fe2c55 0%,#7928ca 100%)" }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Để lại thông tin — HL MEDIA sẽ tư vấn định hướng kênh phù hợp nhất với ngành hàng của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)} className="bg-white text-[#7928ca] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: F }}>
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
