/**
 * ShieldPage — "Trust / Security" layout
 * Centered dark-green hero + giant shield → 4 trust stats → numbered checklist → health check → vertical process
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, Shield, CheckCircle2 } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

const GREEN = "#10b981";
const DARK_GREEN = "#047857";

const healthChecks = [
  { label: "Không có điểm vi phạm chính sách", ok: true },
  { label: "Video không dùng nhạc không bản quyền", ok: true },
  { label: "Không livestream sản phẩm cấm", ok: true },
  { label: "Xác minh danh tính tài khoản", ok: false },
  { label: "Tỷ lệ hoàn thành đơn > 95%", ok: true },
  { label: "Không sử dụng caption gây hiểu lầm", ok: false },
  { label: "Đủ điều kiện nộp đơn tích xanh", ok: true },
  { label: "Không dùng view/follow ảo", ok: true },
];

export function ShieldPage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "#f0fdf8" }}>
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: centered + giant shield ── */}
      <section className="relative overflow-hidden text-center pt-28 pb-0"
        style={{ background: "linear-gradient(135deg,#022c1f 0%,#064e3b 55%,#065f46 100%)" }}>
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "linear-gradient(45deg,rgba(16,185,129,0.2) 25%,transparent 25%),linear-gradient(-45deg,rgba(16,185,129,0.2) 25%,transparent 25%)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-10 transition-colors" style={{ fontFamily: F }}>
              <ArrowLeft size={14} /> Trang chủ
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#34d399]/40 bg-[#34d399]/10 text-[#34d399] mb-5 inline-block" style={{ fontFamily: F }}>
              {service.eyebrow}
            </span>
            <h1 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(2rem,4.5vw,3.4rem)", fontWeight: 800, lineHeight: 1.08 }}>
              {service.title.toUpperCase()}
            </h1>
            <p className="font-semibold text-sm mb-4" style={{ fontFamily: F, color: "#6ee7b7" }}>{service.subtitle}</p>
            <p className="text-white/60 mb-8 mx-auto" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem", maxWidth: "520px" }}>{service.heroDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button onClick={() => setPopup(true)}
                className="group flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: F, background: GREEN, boxShadow: `0 8px 24px ${GREEN}40` }}>
                {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:0868367567" className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                <Phone size={14} /> 0868 367 567
              </a>
            </div>
          </motion.div>

          {/* Giant shield visual */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-flex items-center justify-center w-56 h-56 mx-auto">
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle,rgba(16,185,129,0.15) 0%,transparent 70%)" }} />
            <Shield size={160} strokeWidth={0.8} style={{ color: GREEN, opacity: 0.12 }} className="absolute" />
            <Shield size={110} strokeWidth={1} style={{ color: GREEN, opacity: 0.3 }} className="absolute" />
            <Shield size={72} strokeWidth={1.5} style={{ color: GREEN, opacity: 0.7 }} className="absolute" />
            <Shield size={40} style={{ color: GREEN }} className="drop-shadow-lg" />
            {/* Orbit badges */}
            {service.results.map((r, i) => {
              const positions = [
                { top: "-1rem", right: "-2rem" },
                { top: "50%", right: "-5rem", transform: "translateY(-50%)" },
                { bottom: "-1rem", right: "-2rem" },
                { top: "50%", left: "-5rem", transform: "translateY(-50%)" },
              ];
              return (
                <motion.div key={r.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.1 }}
                  className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-center min-w-[5rem]"
                  style={positions[i] as React.CSSProperties}>
                  <p className="font-black text-sm" style={{ fontFamily: FB, color: "#6ee7b7" }}>{r.value}</p>
                  <p className="text-white/45 text-[10px]" style={{ fontFamily: F }}>{r.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 44" fill="none" className="w-full block mt-16">
          <path d="M0 44H1440V22C1200 44 900 0 720 14C540 28 240 0 0 22V44Z" fill="#f0fdf8" />
        </svg>
      </section>

      {/* ── 4 TRUST NUMBERS ── */}
      <section className="py-12 border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {service.results.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <p className="font-black mb-1" style={{ fontFamily: FB, fontSize: "2.2rem", color: i === 0 ? GREEN : "#0d1b2a" }}>{r.value}</p>
                <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── PAIN POINTS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: GREEN, fontFamily: F }}>Vấn đề thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN ĐANG GẶP PHẢI ĐIỀU NÀY?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {service.painPoints.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 bg-white rounded-2xl border border-emerald-100 p-4 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5 text-amber-500 text-sm font-bold">!</div>
                <p className="text-[#3d3d3d] text-sm leading-relaxed" style={{ fontFamily: F }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── WORK ITEMS: numbered checklist ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: GREEN, fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ ĐỂ BẢO VỆ KÊNH BẠN?</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-emerald-100 p-5 hover:shadow-md hover:shadow-emerald-500/5 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${GREEN}12` }}>
                  <CheckCircle2 size={20} style={{ color: GREEN }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0d1b2a] font-bold text-sm mb-1" style={{ fontFamily: F }}>{item.title}</h3>
                  <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
                <span className="text-xs text-white px-2 py-1 rounded-full shrink-0" style={{ background: GREEN, fontFamily: FB }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── HEALTH CHECK VISUALIZATION ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: GREEN, fontFamily: F }}>Kiểm tra kênh</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>BỘ CHECKLIST AN TOÀN KÊNH</h2>
            <p className="text-[#5a6a85] text-sm mt-2 max-w-md mx-auto" style={{ fontFamily: F }}>8 tiêu chí HL Media kiểm tra khi audit kênh — biết chính xác kênh đang ở đâu.</p>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-xl shadow-emerald-500/5">
            <div className="px-6 py-4 border-b border-emerald-50 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#f0fdf8,#ecfdf5)" }}>
              <div className="flex items-center gap-2">
                <Shield size={18} style={{ color: GREEN }} />
                <span className="font-bold text-sm text-[#0d1b2a]" style={{ fontFamily: F }}>Channel Health Check</span>
              </div>
              <div className="flex gap-3 text-xs" style={{ fontFamily: F }}>
                <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Đạt</span>
                <span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Xem lại</span>
              </div>
            </div>
            <div className="divide-y divide-emerald-50">
              {healthChecks.map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-emerald-50/50 transition-colors">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${c.ok ? "bg-emerald-100" : "bg-amber-100"}`}>
                    {c.ok ? <CheckCircle2 size={14} className="text-emerald-500" /> : <span className="text-amber-500 text-xs font-bold">!</span>}
                  </div>
                  <span className="text-[#0d1b2a] text-sm flex-1" style={{ fontFamily: F }}>{c.label}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`} style={{ fontFamily: F }}>
                    {c.ok ? "✓ Đạt" : "⚠ Xem lại"}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#f0fdf8,#ecfdf5)" }}>
              <p className="text-sm text-[#5a6a85]" style={{ fontFamily: F }}>Kết quả mẫu — kênh thực tế sẽ khác nhau</p>
              <button onClick={() => setPopup(true)} className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1" style={{ fontFamily: F }}>
                Audit kênh của tôi <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── PROCESS: vertical connecting line ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: GREEN, fontFamily: F }}>Quy trình</span>
              <h2 className="text-[#0d1b2a] mb-8" style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, lineHeight: 1.15 }}>
                QUY TRÌNH XỬ LÝ 4 BƯỚC RÕ RÀNG
              </h2>
              <div className="relative pl-8">
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5" style={{ background: `${GREEN}30` }} />
                {service.process.map((p, i) => (
                  <motion.div key={p.step} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="relative pb-8 last:pb-0">
                    <div className="absolute -left-8 w-7 h-7 rounded-full border-2 flex items-center justify-center top-0 font-black text-xs"
                      style={{ background: i === 0 ? GREEN : "#f0fdf8", borderColor: GREEN, color: i === 0 ? "white" : GREEN, fontFamily: FB }}>
                      {p.step}
                    </div>
                    <p className="text-[#0d1b2a] font-bold text-sm mb-1" style={{ fontFamily: F }}>{p.title}</p>
                    <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#022c1f]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/55 text-xs mb-1" style={{ fontFamily: F }}>HL MEDIA · Bảo vệ kênh</p>
                <p className="text-white font-bold text-sm" style={{ fontFamily: F }}>{service.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-4 py-2 text-center">
                <p className="text-emerald-300 font-black text-lg" style={{ fontFamily: FB }}>95%</p>
                <p className="text-white/70 text-xs" style={{ fontFamily: F }}>Tỷ lệ thành công</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: GREEN, fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent={GREEN} />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#059669 0%,#047857 100%)" }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Kiểm tra rủi ro miễn phí — HL MEDIA sẽ đánh giá kênh và đề xuất hướng xử lý phù hợp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)} className="bg-white text-[#047857] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: F }}>
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
