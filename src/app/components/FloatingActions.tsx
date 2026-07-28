import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X } from "lucide-react";

export function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-[#e8edf7] overflow-hidden w-64"
          >
            <div className="bg-[#0a2463] px-4 py-3">
              <p
                className="text-white font-bold text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Liên hệ HL MEDIA
              </p>
              <p className="text-white/55 text-xs">Tư vấn miễn phí — phản hồi nhanh</p>
            </div>
            <div className="p-3 space-y-1.5">
              {[
                { icon: "💬", label: "Nhắn Zalo ngay", color: "#0068ff", href: "https://zalo.me/0868367567" },
                { icon: "📞", label: "Gọi: 0868 367 567", color: "#10b981", href: "tel:0868367567" },
                { icon: "📧", label: "hlmedia1804@gmail.com", color: "#ff6b35", href: "mailto:hlmedia1804@gmail.com" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#f8f9fc] transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: item.color }}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #ff6b35, #ff8c5a)" }}
        aria-label="Liên hệ HL MEDIA"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
