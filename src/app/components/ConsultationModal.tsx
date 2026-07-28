import { useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Send, CheckCircle2, ArrowRight, Zap, Shield, Star } from "lucide-react";
import { leadApi } from "../lib/api";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const benefits = [
  { icon: Zap, text: "Phản hồi trong 30 phút" },
  { icon: Shield, text: "Tư vấn miễn phí, không cam kết" },
  { icon: Star, text: "Đội ngũ thực chiến nhiều ngành" },
];

const serviceOptions = [
  "Chạy quảng cáo Facebook / TikTok / Shopee",
  "Xây dựng kênh TikTok",
  "Chăm sóc Fanpage",
  "Quay dựng video & thiết kế",
  "Thiết kế Website / App / Shopee",
  "Tích xanh & bảo vệ kênh",
  "Khóa học Ads / Edit video",
];

const SLUG_TO_SERVICE: Record<string, string> = {
  "quang-cao-da-nen-tang": "Chạy quảng cáo Facebook / TikTok / Shopee",
  "xay-kenh-tiktok": "Xây dựng kênh TikTok",
  "cham-soc-fanpage": "Chăm sóc Fanpage",
  "quay-dung-video-thiet-ke": "Quay dựng video & thiết kế",
  "thiet-ke-website-app-shopee": "Thiết kế Website / App / Shopee",
  "tich-xanh-bao-ve-kenh": "Tích xanh & bảo vệ kênh",
};

interface Props {
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationModal({ onClose, defaultService }: Props) {
  const { slug } = useParams<{ slug: string }>();

  const getInitialService = () => {
    if (defaultService) return defaultService;
    if (slug && SLUG_TO_SERVICE[slug]) return SLUG_TO_SERVICE[slug];
    return "";
  };

  const [form, setForm] = useState({ name: "", phone: "", service: getInitialService(), industry: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await leadApi.create({ ...form, source: "consultation" });
      setSent(true);
      setTimeout(onClose, 2600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Gửi thất bại, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        style={{ background: "rgba(4,10,24,0.82)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex"
          style={{ minHeight: "420px" }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── LEFT PANEL ── */}
          <div
            className="hidden sm:flex flex-col justify-between p-8 w-[42%] shrink-0"
            style={{ background: "linear-gradient(160deg,#060f1e 0%,#0a2463 60%,#0d1b4a 100%)" }}
          >
            {/* Top */}
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ff6b35] flex items-center justify-center mb-5">
                <Phone size={18} className="text-white" />
              </div>
              <h3 className="text-white mb-2" style={{ fontFamily: FB, fontSize: "1.45rem", fontWeight: 800, lineHeight: 1.15 }}>
                TƯ VẤN<br />MIỄN PHÍ
              </h3>
              <p className="text-white/50 text-xs mb-7" style={{ fontFamily: F }}>
                HL MEDIA sẽ phân tích và đề xuất giải pháp phù hợp nhất.
              </p>

              <div className="space-y-3">
                {benefits.map(b => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#ff6b35]/15 flex items-center justify-center shrink-0">
                      <b.icon size={14} className="text-[#ff6b35]" />
                    </div>
                    <span className="text-white/70 text-xs" style={{ fontFamily: F }}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 pt-5 mt-6">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1" style={{ fontFamily: F }}>Gọi ngay</p>
              <a href="tel:0868367567" className="text-white font-bold text-lg hover:text-[#ff6b35] transition-colors" style={{ fontFamily: FB }}>
                0868 367 567
              </a>
              <p className="text-white/35 text-xs mt-0.5" style={{ fontFamily: F }}>Zalo · Facebook · Hotline</p>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="flex-1 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between px-7 pt-6 pb-4 border-b border-gray-100">
              <div>
                <h4 className="text-[#0d1b2a] font-bold" style={{ fontFamily: F }}>Để lại thông tin</h4>
                <p className="text-[#5a6a85] text-xs mt-0.5" style={{ fontFamily: F }}>Phản hồi trong 30 phút làm việc</p>
              </div>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 ml-4 mt-0.5">
                <X size={15} className="text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 px-7 py-5">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h4 className="text-[#0d1b2a] font-bold mb-1.5" style={{ fontFamily: FB, fontSize: "1.4rem" }}>GỬI THÀNH CÔNG!</h4>
                  <p className="text-[#5a6a85] text-sm max-w-[220px]" style={{ fontFamily: F }}>
                    HL MEDIA sẽ liên hệ bạn trong thời gian sớm nhất.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 h-full flex flex-col justify-between">
                  <div className="space-y-3.5 flex-1">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Họ và tên *</label>
                        <input required value={form.name} onChange={set("name")} placeholder="Nguyễn Văn A"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                          style={{ fontFamily: F }} />
                      </div>
                      <div>
                        <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Số điện thoại *</label>
                        <input required value={form.phone} onChange={set("phone")} placeholder="0868 xxx xxx" type="tel"
                          pattern="[0-9]{9,11}" maxLength={11}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                          style={{ fontFamily: F }} />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Dịch vụ quan tâm</label>
                      <select value={form.service} onChange={set("service")}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                        style={{ fontFamily: F }}>
                        <option value="">-- Chọn dịch vụ --</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Ngành hàng / Sản phẩm</label>
                      <input value={form.industry} onChange={set("industry")} placeholder="VD: Mỹ phẩm, Thời trang, Nhà hàng..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                        style={{ fontFamily: F }} />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs text-center" style={{ fontFamily: F }}>{error}</p>
                  )}

                  <div className="pt-1">
                    <button type="submit" disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:shadow-orange-500/35"
                      style={{ fontFamily: F }}>
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}
                      {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                      {!isSubmitting && <ArrowRight size={14} />}
                    </button>
                    <p className="text-center text-[#9aa5b8] text-[11px] mt-2" style={{ fontFamily: F }}>
                      🔒 Thông tin được bảo mật tuyệt đối
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
