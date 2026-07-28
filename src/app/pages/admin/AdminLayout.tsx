import { useState, Suspense } from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Users, FileText, GraduationCap,
  LogOut, Menu, X, Bell, ChevronRight, Settings, Shield
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const isAdminDomain = typeof window !== 'undefined' && (window.location.hostname.startsWith('admin.') || import.meta.env.VITE_APP_MODE === 'admin');
const prefix = isAdminDomain ? '' : '/quan-ly';

const baseNavItems = [
  { path: `${prefix}/dashboard`, icon: LayoutDashboard, label: "Tổng quan" },
  { path: `${prefix}/leads`, icon: Users, label: "Lead khách hàng", minRole: 'admin' as const },
  { path: `${prefix}/blog`, icon: FileText, label: "Bài viết Blog" },
  { path: `${prefix}/khoa-hoc`, icon: GraduationCap, label: "Khóa học" },
  { path: `${prefix}/nguoi-dung`, icon: Shield, label: "Người dùng", minRole: 'super_admin' as const },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, isAuthenticated, logout, isSuperAdmin, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = baseNavItems.filter(item => {
    if (!item.minRole) return true;
    if (item.minRole === 'super_admin') return isSuperAdmin;
    if (item.minRole === 'admin') return isAdmin;
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f6fb]">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-3 border-[#0a2463]/20 border-t-[#0a2463] rounded-full animate-spin" />
          <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F }}>Đang xác thực...</p>
        </div>
      </div>
    );
  }

  const loginPath = isAdminDomain ? "/login" : "/quan-ly";

  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate(loginPath);
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-5"}`} style={{ background: "#0a2463" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 rounded-xl bg-[#ff6b35] flex items-center justify-center font-black text-white shrink-0" style={{ fontFamily: FB, fontSize: "0.85rem" }}>
          <img src="/logo.png" alt="logo" />
        </div>
        <div>
          <p className="text-white font-bold text-sm" style={{ fontFamily: FB }}>HL MEDIA</p>
          <p className="text-white/40 text-[10px]" style={{ fontFamily: F }}>Admin Panel</p>
        </div>
        {mobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-white/50 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <p className="text-white/30 text-[10px] uppercase tracking-widest px-3 mb-3" style={{ fontFamily: F }}>Menu chính</p>
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active ? "bg-white/15 text-white" : "text-white/55 hover:text-white hover:bg-white/8"
              }`}
              style={{ fontFamily: F }}>
              <item.icon size={18} className={active ? "text-[#ff6b35]" : "group-hover:text-white/80"} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto text-[#ff6b35]" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-4 mt-4 space-y-1">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/8 transition-all" style={{ fontFamily: F }}>
          <Settings size={17} />
          Về trang chủ
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all text-left"
          style={{ fontFamily: F }}>
          <LogOut size={17} />
          Đăng xuất
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6fb]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-60 shrink-0 shadow-xl shadow-[#0a2463]/20">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-60 z-50 lg:hidden shadow-2xl">
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-[#e8edf7] flex items-center justify-between px-5 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[#5a6a85] hover:text-[#0d1b2a] transition-colors">
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5a6a85]" style={{ fontFamily: F }}>
              <span>Admin</span>
              <ChevronRight size={12} />
              <span className="text-[#0d1b2a] font-medium">
                {navItems.find(n => n.path === location.pathname)?.label ?? "Dashboard"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-full bg-[#f4f6fb] hover:bg-[#e8edf7] flex items-center justify-center transition-colors">
              <Bell size={16} className="text-[#5a6a85]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b35] rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0a2463] flex items-center justify-center text-white text-xs font-bold" style={{ fontFamily: FB }}>{user?.displayName?.charAt(0) || "A"}</div>
              <span className="hidden sm:block text-sm text-[#0d1b2a] font-medium" style={{ fontFamily: F }}>{user?.displayName || "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Suspense fallback={
            <div className="flex items-center justify-center py-32">
              <div className="w-8 h-8 border-3 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
