import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { leadApi } from "../lib/api";

const contactInfo = [
  { icon: Phone, label: "Hotline", value: "0868 367 567", href: "tel:0868367567" },
  { icon: Mail, label: "Email", value: "hlmedia1804@gmail.com", href: "mailto:hlmedia1804@gmail.com" },
  { icon: MapPin, label: "Địa chỉ 1", value: "Số 44, khu đất mới, xã Tây Phương, Hà Nội", href: "https://maps.app.goo.gl/uSHkhDgyV7JHqwaq6" },
  { icon: MapPin, label: "Địa chỉ 2", value: "Khu Đô Thị Lacasta, Văn Phú, Hà Đông", href: "https://maps.app.goo.gl/vsqGixPCrb8jtpTSA" },
];

const serviceOptions = [
  "Chạy quảng cáo Facebook",
  "Chạy quảng cáo TikTok",
  "Chạy quảng cáo Shopee",
  "Xây kênh TikTok",
  "Chăm sóc Fanpage",
  "Quay dựng video & thiết kế hình ảnh",
  "Thiết kế Website / App / Shopee",
  "Tích xanh / Bảo vệ kênh",
  "Khóa học Ads / Edit video",
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    industry: "",
    message: "",
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

  return (
    <section id="contact" className="py-24 relative overflow-hidden"
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
          className="text-center mb-14"
        >
          <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
            Đăng ký tư vấn
          </span>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            ĐỂ LẠI THÔNG TIN —
            <br />
            <span className="text-[#ff6b35]">HL MEDIA SẼ TƯ VẤN GIẢI PHÁP PHÙ HỢP</span>
          </h2>
          <p
            className="text-white/55 max-w-lg mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}
          >
            Chúng tôi sẽ xem nhanh sản phẩm, ngành hàng, nền tảng hiện tại và mục tiêu của bạn
            để đề xuất hướng triển khai hợp lý.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4 justify-center"
          >
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-start gap-4 bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-5 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#ff6b35]/20 rounded-xl flex items-center justify-center shrink-0">
                  <c.icon size={19} className="text-[#ff6b35]" />
                </div>
                <div>
                  <p
                    className="text-white/45 text-xs uppercase tracking-wider mb-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-white text-sm font-medium group-hover:text-[#ff6b35] transition-colors leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {c.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={52} className="text-green-500 mx-auto mb-4" />
                  <h3
                    className="text-[#0d1b2a] mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.6rem", fontWeight: 800 }}
                  >
                    GỬI THÀNH CÔNG!
                  </h3>
                  <p
                    className="text-[#5a6a85] mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Cảm ơn bạn đã tin tưởng HL MEDIA!
                  </p>
                  <p
                    className="text-[#5a6a85]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Chuyên gia sẽ liên hệ với bạn trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#ff6b35] text-sm font-semibold hover:underline"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3
                    className="text-[#0d1b2a] mb-5"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: 800 }}
                  >
                    FORM TƯ VẤN MIỄN PHÍ
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[#0d1b2a] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Họ và tên *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={form.name}
                        onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }}
                        className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-2.5 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:ring-2 focus:ring-[#0a2463]/10 transition-all"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[#0d1b2a] text-sm font-semibold mb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
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
                        className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-2.5 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:ring-2 focus:ring-[#0a2463]/10 transition-all"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[#0d1b2a] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Dịch vụ quan tâm
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => { setForm({ ...form, service: e.target.value }); setError(''); }}
                      className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-2.5 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:ring-2 focus:ring-[#0a2463]/10 transition-all"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <option value="">Chọn dịch vụ</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-[#0d1b2a] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Ngành hàng / Sản phẩm
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Thời trang, Mỹ phẩm, Thực phẩm..."
                      value={form.industry}
                      onChange={(e) => { setForm({ ...form, industry: e.target.value }); setError(''); }}
                      className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-2.5 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:ring-2 focus:ring-[#0a2463]/10 transition-all"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[#0d1b2a] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Nhu cầu của bạn
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả ngắn gọn mục tiêu, tình trạng kênh hiện tại và vấn đề đang gặp phải..."
                      value={form.message}
                      onChange={(e) => { setForm({ ...form, message: e.target.value }); setError(''); }}
                      className="w-full bg-[#f8f9fc] border border-[#e8edf7] rounded-xl px-4 py-2.5 text-[#0d1b2a] text-sm focus:outline-none focus:border-[#0a2463] focus:ring-2 focus:ring-[#0a2463]/10 transition-all resize-none"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white py-3.5 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <Send size={16} />
                    Gửi yêu cầu tư vấn miễn phí
                  </button>

                  <p
                    className="text-[#5a6a85] text-xs text-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    🔒 Thông tin của quý khách được bảo mật tuyệt đối.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
