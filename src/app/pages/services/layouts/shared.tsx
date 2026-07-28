import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ServiceData, services } from "../../../data/services";

export { ConsultationModal as ConsultationPopup } from "../../../components/ConsultationModal";

export const F = "'Plus Jakarta Sans', sans-serif";
export const FB = "'Barlow Condensed', sans-serif";

export function FAQSection({ faq, accent = "#ff6b35" }: { faq: ServiceData["faq"]; accent?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e8edf7] overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left group">
              <span className="text-[#0d1b2a] font-semibold text-sm pr-4 group-hover:text-[#0a2463] transition-colors" style={{ fontFamily: F }}>{item.q}</span>
              <ChevronDown size={17} className={`shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} style={{ color: open === i ? accent : "#5a6a85" }} />
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.7 }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OtherServices({ currentSlug }: { currentSlug: string }) {
  const others = services.filter(s => s.slug !== currentSlug).slice(0, 3);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 style={{ fontFamily: FB, fontSize: "clamp(1.3rem,2.8vw,1.7rem)", fontWeight: 800, color: "#0d1b2a" }}>DỊCH VỤ KHÁC CỦA HL MEDIA</h2>
        <Link to="/" className="text-[#ff6b35] text-sm font-semibold hover:underline" style={{ fontFamily: F }}>Xem tất cả →</Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {others.map(s => (
          <Link key={s.slug} to={`/dich-vu/${s.slug}`}
            className="group bg-white rounded-2xl border border-[#e8edf7] p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: `${s.color}12` }}>{s.icon}</div>
            <p className="text-[#0d1b2a] font-bold text-sm mb-1" style={{ fontFamily: F }}>{s.title}</p>
            <p className="text-[#5a6a85] text-xs mb-3" style={{ fontFamily: F }}>{s.subtitle}</p>
            <div className="flex items-center gap-1 text-[#ff6b35] text-xs font-semibold" style={{ fontFamily: F }}>
              Tìm hiểu thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
