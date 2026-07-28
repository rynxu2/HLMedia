import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdminDomain = typeof window !== 'undefined' && (window.location.hostname.startsWith('admin.') || import.meta.env.VITE_APP_MODE === 'admin');
  const targetDashboard = isAdminDomain ? '/dashboard' : '/quan-ly/dashboard';

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate(targetDashboard, { replace: true });
  }, [authLoading, isAuthenticated, navigate, targetDashboard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(targetDashboard);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg,#060f1e 0%,#0a2463 60%,#0d1b4a 100%)" }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35] flex items-center justify-center font-black text-white text-lg" style={{ fontFamily: FB }}>HL</div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: FB }}>HL MEDIA</span>
          </div>
          <h1 className="text-white mb-4" style={{ fontFamily: FB, fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.1 }}>
            QUẢN LÝ<br />
            <span className="text-[#ff6b35]">TRANG WEB</span>
          </h1>
          <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: F }}>
            Hệ thống quản lý nội dung, lead khách hàng, bài blog và khóa học của HL MEDIA.
          </p>
        </div>

        <div className="relative space-y-3">
          {[
            { icon: "📊", label: "Quản lý lead khách hàng" },
            { icon: "📝", label: "Quản lý bài viết blog" },
            { icon: "🎓", label: "Quản lý khóa học" },
            { icon: "📈", label: "Thống kê tổng quan" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 text-white/60 text-sm" style={{ fontFamily: F }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b35] flex items-center justify-center font-black text-white text-lg" style={{ fontFamily: FB }}>HL</div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: FB }}>HL MEDIA Admin</span>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30">
            <div className="mb-7">
              <div className="w-12 h-12 rounded-2xl bg-[#0a2463] flex items-center justify-center mb-4">
                <Lock size={22} className="text-white" />
              </div>
              <h2 className="text-[#0d1b2a]" style={{ fontFamily: FB, fontSize: "1.6rem", fontWeight: 800 }}>Đăng nhập</h2>
              <p className="text-[#5a6a85] text-sm mt-1" style={{ fontFamily: F }}>Nhập thông tin để truy cập trang quản lý</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                <AlertCircle size={15} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-sm" style={{ fontFamily: F }}>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Email</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                  style={{ fontFamily: F }} />
              </div>
              <div>
                <label className="text-[#0d1b2a] text-xs font-semibold mb-1.5 block" style={{ fontFamily: F }}>Mật khẩu</label>
                <div className="relative">
                  <input required type={showPw ? "text" : "password"} value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm text-[#0d1b2a] focus:outline-none focus:border-[#0a2463] focus:bg-white focus:ring-2 focus:ring-[#0a2463]/8 transition-all"
                    style={{ fontFamily: F }} />
                  <button type="button" onClick={() => setShowPw(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa5b8] hover:text-[#5a6a85] transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#0a2463] hover:bg-[#0d2d7a] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#0a2463]/25 hover:-translate-y-0.5 mt-2"
                style={{ fontFamily: F }}>
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn size={16} />
                )}
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <p className="text-center text-[#9aa5b8] text-xs mt-5" style={{ fontFamily: F }}>
              HL Media Admin Panel
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
