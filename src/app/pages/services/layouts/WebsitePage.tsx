/**
 * WebsitePage — "SaaS / Product" layout
 * Centered light hero + browser mockup → 4 metrics → vertical feature list → before/after pain → tech stack → horizontal process
 */
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Phone, X, CheckCircle2, Code2, Zap, TrendingUp, Layout } from "lucide-react";
import { ServiceData } from "../../../data/services";
import { F, FB, ConsultationPopup, FAQSection, OtherServices } from "./shared";

const NAVY = "#0a2463";
const BLUE = "#1e4db7";

const stack = [
  { cat: "Frontend & CMS", items: ["React / Next.js", "WordPress CMS", "Shopify", "Landing Page"], icon: <Code2 size={20} />, color: BLUE },
  { cat: "Backend & Tích hợp", items: ["Node.js / PHP", "VNPay / MoMo", "ZaloPay", "Live chat, CRM"], icon: <Zap size={20} />, color: "#7c3aed" },
  { cat: "SEO & Hiệu năng", items: ["Core Web Vitals", "Schema markup", "Sitemap tự động", "CDN toàn cầu"], icon: <TrendingUp size={20} />, color: "#10b981" },
  { cat: "UI / UX Design", items: ["Figma prototype", "Mobile-first", "A/B test layout", "CRO optimization"], icon: <Layout size={20} />, color: "#f59e0b" },
];

export function WebsitePage({ service }: { service: ServiceData }) {
  const [popup, setPopup] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPopup(true), 5000); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: "#f5f8ff" }}>
      {popup && <ConsultationPopup onClose={() => setPopup(false)} />}

      {/* ── HERO: centered light with browser mockup ── */}
      <section className="relative overflow-hidden pt-28 pb-0 bg-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle,rgba(30,77,183,0.06) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: `${BLUE}08` }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-[#5a6a85] hover:text-[#0d1b2a] text-sm mb-8 transition-colors" style={{ fontFamily: F }}>
              <ArrowLeft size={14} /> Trang chủ
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#1e4db7]/25 bg-[#1e4db7]/8 text-[#1e4db7] mb-5 inline-block" style={{ fontFamily: F }}>
              {service.eyebrow}
            </span>
            <h1 className="mb-3" style={{ fontFamily: FB, fontSize: "clamp(2rem,4.5vw,3.4rem)", fontWeight: 800, lineHeight: 1.08, color: "#0d1b2a" }}>
              {service.title.toUpperCase()}
            </h1>
            <p className="font-semibold text-sm mb-4" style={{ fontFamily: F, color: BLUE }}>{service.subtitle}</p>
            <p className="text-[#5a6a85] mb-8 mx-auto" style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.9rem", maxWidth: "540px" }}>{service.heroDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button onClick={() => setPopup(true)}
                className="group flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-xl hover:-translate-y-0.5"
                style={{ fontFamily: F, background: NAVY, boxShadow: `0 8px 24px ${NAVY}30` }}>
                {service.ctaPrimary} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="tel:0868367567" className="flex items-center gap-2 border border-[#e8edf7] hover:border-[#0a2463]/30 text-[#0d1b2a] px-6 py-3 rounded-full font-semibold text-sm transition-all" style={{ fontFamily: F }}>
                <Phone size={14} /> 0868 367 567
              </a>
            </div>

            {/* Browser mockup */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto max-w-2xl rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-[#e8edf7]">
              <div className="bg-[#1e2a3a] px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                </div>
                <div className="flex-1 bg-[#0a1628] rounded-full px-3 py-1 text-white/40 text-xs flex items-center gap-2" style={{ fontFamily: F }}>
                  <span>🔒</span> yourstore.com
                </div>
              </div>
              <div className="bg-white">
                <div className="h-16" style={{ background: "linear-gradient(135deg,#0a2463,#1e4db7)" }} />
                <div className="px-6 py-5 space-y-3">
                  <div className="h-3 bg-gray-200 rounded-full w-2/3" />
                  <div className="h-3 bg-gray-100 rounded-full" />
                  <div className="h-3 bg-gray-100 rounded-full w-4/5" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-8 bg-[#0a2463] rounded-full w-28" />
                    <div className="h-8 border border-gray-200 rounded-full w-24" />
                  </div>
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {["🛍️","📦","⭐","🏷️"].map((e,i) => <div key={i} className="aspect-square rounded-xl bg-gray-50 flex items-center justify-center text-xl border border-gray-100">{e}</div>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 44" fill="none" className="w-full block mt-8">
          <path d="M0 44H1440V22C1200 44 900 0 720 14C540 28 240 0 0 22V44Z" fill="#f5f8ff" />
        </svg>
      </section>

      {/* ── 4 METRICS STRIP ── */}
      <section className="py-10 border-b border-blue-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {service.results.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center">
                <p className="font-black mb-1" style={{ fontFamily: FB, fontSize: "2rem", color: i === 0 ? BLUE : "#0d1b2a" }}>{r.value}</p>
                <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* ── WORK ITEMS: vertical feature rows ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: BLUE, fontFamily: F }}>Hạng mục công việc</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>CHÚNG TÔI LÀM GÌ CHO BẠN?</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {service.workItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-5 bg-white rounded-2xl border border-blue-100 p-5 hover:shadow-lg hover:shadow-blue-50 hover:-translate-x-0.5 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${NAVY}08` }}>{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2 py-0.5 rounded text-white" style={{ background: NAVY, fontFamily: FB }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[#0d1b2a] font-bold text-sm" style={{ fontFamily: F }}>{item.title}</h3>
                  </div>
                  <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PAIN POINTS: before/after comparison ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: BLUE, fontFamily: F }}>Vấn đề thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN ĐANG GẶP PHẢI ĐIỀU NÀY?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
              <p className="font-bold text-sm text-red-600 mb-4 flex items-center gap-2" style={{ fontFamily: F }}>
                <X size={16} /> Chưa có HL MEDIA
              </p>
              <div className="space-y-3">
                {service.painPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={8} className="text-red-500" />
                    </div>
                    <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <p className="font-bold text-sm mb-4 flex items-center gap-2" style={{ fontFamily: F, color: BLUE }}>
                <CheckCircle2 size={16} /> Sau khi hợp tác HL MEDIA
              </p>
              <div className="space-y-3">
                {["Website hiện đại, tải nhanh dưới 2 giây", "Chuẩn SEO, leo thang Google bền vững", "Gian hàng tối ưu, tỷ lệ chuyển đổi tăng", "Vận hành 24/7, có hỗ trợ kỹ thuật khi cần"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${BLUE}20` }}>
                      <CheckCircle2 size={8} style={{ color: BLUE }} />
                    </div>
                    <p className="text-[#0d1b2a] text-sm leading-relaxed font-medium" style={{ fontFamily: F }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── TECH STACK: 2×2 ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: BLUE, fontFamily: F }}>Tech Stack</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>CÔNG NGHỆ & TÍNH NĂNG BẠN NHẬN ĐƯỢC</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {stack.map((s, i) => (
              <motion.div key={s.cat} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-blue-100 p-6 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-0.5 transition-all overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: s.color }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}10`, color: s.color }}>{s.icon}</div>
                  <p className="font-bold text-sm text-[#0d1b2a]" style={{ fontFamily: F }}>{s.cat}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {s.items.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="text-xs text-[#5a6a85]" style={{ fontFamily: F }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PROCESS: horizontal numbered ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: BLUE, fontFamily: F }}>Quy trình</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.5rem,3.2vw,2.2rem)", fontWeight: 800, color: "#0d1b2a" }}>QUY TRÌNH TRIỂN KHAI 4 BƯỚC</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-blue-100 p-6 text-center hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg mx-auto mb-4" style={{ fontFamily: FB, background: i === 0 ? NAVY : "#e8f0fe", color: i === 0 ? "white" : NAVY }}>
                  {p.step}
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{p.title}</h3>
                <p className="text-[#5a6a85] text-xs leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: BLUE, fontFamily: F }}>Câu hỏi thường gặp</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#0d1b2a" }}>BẠN CÒN THẮC MẮC?</h2>
          </div>
          <FAQSection faq={service.faq} accent={BLUE} />
        </motion.div>

        <OtherServices currentSlug={service.slug} />
      </div>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(120deg,#0a2463 0%,#1e4db7 100%)" }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 800 }}>
            {service.ctaHeading.toUpperCase()}
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.7 }}>
            Nhận demo giao diện miễn phí — HL MEDIA sẽ thiết kế mẫu phù hợp ngành hàng của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setPopup(true)} className="bg-white text-[#0a2463] px-8 py-3.5 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 transition-all" style={{ fontFamily: F }}>
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
