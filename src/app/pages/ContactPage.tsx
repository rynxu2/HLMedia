import { useState } from "react";
import { motion } from "motion/react";
import {
  Phone, Mail, MapPin, Send, CheckCircle2, Clock,
  MessageCircle, ArrowRight, Zap, Shield, Star,
} from "lucide-react";
import { useSEO, schemas } from "../hooks/useSEO";
import { leadApi } from "../lib/api";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const contactInfo = [
  {
    icon: Phone,
    label: "Hotline tư vấn",
    value: "0868 367 567",
    sub: "Gọi ngay — miễn phí, không cam kết",
    href: "tel:0868367567",
    color: "#ff6b35",
  },
  {
    icon: MessageCircle,
    label: "Zalo",
    value: "0868 367 567",
    sub: "Nhắn tin nhanh qua Zalo",
    href: "https://zalo.me/0868367567",
    color: "#0068ff",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hlmedia1804@gmail.com",
    sub: "Phản hồi trong vòng 2–4 giờ làm việc",
    href: "mailto:hlmedia1804@gmail.com",
    color: "#10b981",
  },
  {
    icon: MapPin,
    label: "Văn phòng Hà Nội",
    value: "Số 44, khu đất mới, xã Tây Phương",
    sub: "Hà Nội · Làm việc T2–T6 · 8:00–18:00",
    href: "https://maps.app.goo.gl/uSHkhDgyV7JHqwaq6",
    color: "#7c3aed",
  },
];

const serviceOptions = [
  "Chạy quảng cáo Facebook",
  "Chạy quảng cáo TikTok",
  "Chạy quảng cáo Shopee",
  "Xây kênh TikTok",
  "Chăm sóc Fanpage",
  "Quay dựng video & thiết kế",
  "Thiết kế Website / App / Shopee",
  "Tích xanh / Bảo vệ kênh",
  "Khóa học Ads / Edit video",
  "Khác",
];

const whyUs = [
  { icon: Zap, text: "Phản hồi trong 30 phút trong giờ làm việc" },
  { icon: Shield, text: "Tư vấn miễn phí, không ràng buộc" },
  { icon: Star, text: "Đội ngũ có kinh nghiệm thực chiến nhiều ngành" },
  { icon: Clock, text: "Hỗ trợ xuyên suốt từ lên kế hoạch đến vận hành" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: "", phone: "", service: "", industry: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await leadApi.create({ ...form, source: "contact" });
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission failed:", err);
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useSEO({
    title: "Liên Hệ HL MEDIA — Tư Vấn Miễn Phí",
    description: "Liên hệ HL MEDIA để nhận tư vấn miễn phí. Hotline: 0868 367 567. Email: hlmedia1804@gmail.com. Văn phòng tại Tây Phương, Hà Nội & Lacasta, Hà Đông.",
    jsonLd: [
      schemas.localBusiness(),
      schemas.breadcrumb([
        { name: "Trang chủ", url: "/" },
        { name: "Liên hệ", url: "/lien-he" },
      ]),
    ],
  });

  return (
    <div className="bg-[#f8f9fc]">
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-36 pb-0"
        style={{ background: "linear-gradient(135deg,#060f1e 0%,#0a2463 60%,#0d1b4a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-[#1877f2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center mb-20 mt-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/12 text-[#ff6b35] mb-6 inline-block"
              style={{ fontFamily: F }}
            >
              Liên hệ & Tư vấn miễn phí
            </span>
            <h1
              className="text-white mb-4"
              style={{ fontFamily: FB, fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 800, lineHeight: 1.08 }}
            >
              HL MEDIA SẴN SÀNG
              <br />
              <span className="text-[#ff6b35]">ĐỒNG HÀNH CÙNG BẠN</span>
            </h1>
            <p
              className="text-white/60 max-w-xl mx-auto mb-10"
              style={{ fontFamily: F, lineHeight: 1.75, fontSize: "0.95rem" }}
            >
              Để lại thông tin — chuyên gia HL MEDIA sẽ phân tích sản phẩm, ngành hàng và mục tiêu
              để đề xuất giải pháp phù hợp nhất, hoàn toàn miễn phí.
            </p>

            {/* Why choose us — chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {whyUs.map((w) => (
                <div
                  key={w.text}
                  className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-2"
                  style={{ fontFamily: F }}
                >
                  <w.icon size={14} className="text-[#ff6b35] shrink-0" />
                  <span className="text-white/70 text-xs">{w.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 50" fill="none" className="w-full block">
          <path d="M0 50H1440V25C1200 50 900 0 720 18C540 36 240 0 0 25V50Z" fill="#f8f9fc" />
        </svg>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* LEFT — Contact cards + hours */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="mb-6">
              <h2
                className="text-[#0d1b2a] mb-1"
                style={{ fontFamily: FB, fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 800 }}
              >
                THÔNG TIN LIÊN HỆ
              </h2>
              <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F }}>
                Chọn kênh liên hệ phù hợp với bạn nhất.
              </p>
            </div>

            {contactInfo.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-[#e8edf7] p-5 hover:shadow-xl hover:shadow-[#0a2463]/6 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${c.color}12` }}
                >
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#5a6a85] text-xs uppercase tracking-wider mb-0.5" style={{ fontFamily: F }}>
                    {c.label}
                  </p>
                  <p
                    className="text-[#0d1b2a] font-bold text-sm mb-0.5 group-hover:text-[#0a2463] transition-colors truncate"
                    style={{ fontFamily: F }}
                  >
                    {c.value}
                  </p>
                  <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>{c.sub}</p>
                </div>
                <ArrowRight size={16} className="text-[#d1d9e6] group-hover:text-[#ff6b35] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </motion.a>
            ))}

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.42 }}
              className="bg-[#0a2463] rounded-2xl p-5 text-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={16} className="text-[#ff6b35]" />
                <p className="font-bold text-sm" style={{ fontFamily: F }}>Văn phòng 2</p>
              </div>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: F }}>
                Khu Đô Thị Lacasta, Văn Phú, Hà Đông, Hà Nội
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-[#e8edf7] shadow-2xl shadow-[#0a2463]/6 overflow-hidden">
              {/* Form header */}
              <div
                className="px-8 py-6 border-b border-[#e8edf7]"
                style={{ background: "linear-gradient(135deg,#f8f9fc,#f0f4ff)" }}
              >
                <h2
                  className="text-[#0d1b2a] mb-1"
                  style={{ fontFamily: FB, fontSize: "1.5rem", fontWeight: 800 }}
                >
                  FORM TƯ VẤN MIỄN PHÍ
                </h2>
                <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F }}>
                  Điền thông tin bên dưới — HL MEDIA sẽ liên hệ trong vòng 30 phút.
                </p>
              </div>

              <div className="px-8 py-7">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3
                      className="text-[#0d1b2a] mb-2"
                      style={{ fontFamily: FB, fontSize: "1.8rem", fontWeight: 800 }}
                    >
                      GỬI THÀNH CÔNG!
                    </h3>
                    <p className="text-[#5a6a85] mb-1" style={{ fontFamily: F }}>
                      Cảm ơn bạn đã tin tưởng HL MEDIA!
                    </p>
                    <p className="text-[#5a6a85] mb-6" style={{ fontFamily: F }}>
                      Chuyên gia sẽ liên hệ với bạn trong thời gian sớm nhất.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", service: "", industry: "", message: "" }); }}
                        className="text-[#ff6b35] text-sm font-semibold hover:underline"
                        style={{ fontFamily: F }}
                      >
                        Gửi yêu cầu khác
                      </button>
                      <span className="text-[#d1d9e6]">·</span>
                      <a href="tel:0868367567" className="flex items-center gap-1.5 text-[#0a2463] text-sm font-semibold hover:underline" style={{ fontFamily: F }}>
                        <Phone size={14} /> Gọi ngay 0868 367 567
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#0d1b2a] text-sm font-semibold mb-1.5" style={{ fontFamily: F }}>
                          Họ và tên *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={form.name}
                          onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }}
                          className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-3 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                          style={{ fontFamily: F }}
                        />
                      </div>
                      <div>
                        <label className="block text-[#0d1b2a] text-sm font-semibold mb-1.5" style={{ fontFamily: F }}>
                          Số điện thoại *
                        </label>
                        <input
                          required
                          type="tel"
                          pattern="[0-9]{9,11}"
                          maxLength={11}
                          placeholder="0868 367 567"
                          value={form.phone}
                          onChange={(e) => { setForm({ ...form, phone: e.target.value }); setError(''); }}
                          className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-3 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                          style={{ fontFamily: F }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#0d1b2a] text-sm font-semibold mb-1.5" style={{ fontFamily: F }}>
                        Dịch vụ quan tâm
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => { setForm({ ...form, service: e.target.value }); setError(''); }}
                        className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-3 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                        style={{ fontFamily: F }}
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#0d1b2a] text-sm font-semibold mb-1.5" style={{ fontFamily: F }}>
                        Ngành hàng / Sản phẩm
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Thời trang, Mỹ phẩm, Thực phẩm, Nhà hàng..."
                        value={form.industry}
                        onChange={(e) => { setForm({ ...form, industry: e.target.value }); setError(''); }}
                        className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-3 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                        style={{ fontFamily: F }}
                      />
                    </div>

                    <div>
                      <label className="block text-[#0d1b2a] text-sm font-semibold mb-1.5" style={{ fontFamily: F }}>
                        Nhu cầu / Vấn đề đang gặp phải
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mô tả ngắn gọn mục tiêu, tình trạng kênh hiện tại và vấn đề đang gặp phải..."
                        value={form.message}
                        onChange={(e) => { setForm({ ...form, message: e.target.value }); setError(''); }}
                        className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-3 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all resize-none"
                        style={{ fontFamily: F }}
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3" style={{ fontFamily: F }}>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white py-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5"
                      style={{ fontFamily: F }}
                    >
                      <Send size={16} />
                      Gửi yêu cầu tư vấn miễn phí
                    </button>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>
                        🔒 Thông tin của quý khách được bảo mật tuyệt đối.
                      </p>
                      <a
                        href="tel:0868367567"
                        className="flex items-center gap-1.5 text-[#0a2463] text-xs font-semibold hover:text-[#ff6b35] transition-colors"
                        style={{ fontFamily: F }}
                      >
                        <Phone size={12} /> Hoặc gọi ngay
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM INFO STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 bg-[#0a2463] rounded-3xl p-8 grid sm:grid-cols-3 gap-6 text-center"
        >
          {[
            { value: "100+", label: "Khách hàng đã hợp tác", icon: "🤝" },
            { value: "30 phút", label: "Thời gian phản hồi trung bình", icon: "⚡" },
            { value: "Miễn phí", label: "Tư vấn, không ràng buộc", icon: "🎁" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl mb-2">{s.icon}</p>
              <p className="text-white font-black mb-1" style={{ fontFamily: FB, fontSize: "1.7rem", textTransform: "capitalize" }}>{s.value}</p>
              <p className="text-white/55 text-sm" style={{ fontFamily: F }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
