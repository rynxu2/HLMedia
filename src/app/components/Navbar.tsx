import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";

const navLinks = [
  { label: "Trang chủ", anchor: "/" },
  { label: "Giới thiệu", to: "/gioi-thieu" },
  {
    label: "Dịch vụ",
    anchor: "services",
    children: [
      { label: "Quảng cáo đa nền tảng", to: "/dich-vu/quang-cao-da-nen-tang" },
      { label: "Xây dựng kênh TikTok", to: "/dich-vu/xay-kenh-tiktok" },
      { label: "Chăm sóc Fanpage", to: "/dich-vu/cham-soc-fanpage" },
      { label: "Quay dựng video & thiết kế", to: "/dich-vu/quay-dung-video-thiet-ke" },
      { label: "Thiết kế Website / App / Shopee", to: "/dich-vu/thiet-ke-website-app-shopee" },
      { label: "Tích xanh & bảo vệ kênh", to: "/dich-vu/tich-xanh-bao-ve-kenh" },
    ],
  },
  { label: "Khóa học", to: "/khoa-hoc" },
  { label: "Blog", to: "/blog" },
  { label: "Liên hệ", to: "/lien-he" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Pages whose hero has a light background — navbar must always show dark
  const lightHeroPages = ["/dich-vu/thiet-ke-website-app-shopee", "/lien-he"];
  const forceDark = lightHeroPages.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build href: on home page use #anchor, else use /#anchor
  const getHref = (link: typeof navLinks[number]) => {
    if ("to" in link && link.to) return link.to;
    if ("anchor" in link && link.anchor) return isHome ? `/` : `${link.anchor}`;
    return "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md shadow-lg shadow-black/20}`}
      style={{ background: "linear-gradient(135deg, rgb(6, 15, 30) 0%, rgb(10, 36, 99) 60%, rgb(13, 27, 74) 100%)" }}
    >
      {/* Top bar */}
      <div className="bg-[#ff6b35] py-1.5 px-4 text-center hidden md:block">
        <p className="text-white text-sm">
          🔥 Tư vấn miễn phí — Gọi ngay:{" "}
          <a href="tel:0868367567" className="underline font-semibold">
            0868 367 567
          </a>{" "}
          · hlmedia1804@gmail.com
        </p>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="hlmedia logo" className="w-10 h-10 rounded-lg flex items-center justify-center" />
          {/* <div className="w-9 h-9 rounded-lg bg-[#ff6b35] flex items-center justify-center">
            <img src="/logo.png" alt="hlmedia logo" />
          </div> */}
          <div className="flex flex-col leading-none">
            <span
              className="text-white font-black text-lg tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              HL <span className="text-[#ff6b35]">MEDIA</span>
            </span>
            <span className="text-white/40 text-[9px] tracking-widest uppercase">
              Multi-platform Communication
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {"to" in link && link.to ? (
                <Link
                  to={link.to}
                  className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={getHref(link)}
                  className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </a>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-60 bg-[#0d1b2a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#ff6b35]/20 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0868367567"
            className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
          >
            <Phone size={15} />
            <span>0868 367 567</span>
          </a>
          <a
            href={isHome ? "#contact" : "/lien-he"}
            className="bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-500/25 hover:-translate-y-0.5"
          >
            Đăng ký ngay
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060f1e] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                "to" in link && link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={getHref(link)}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
              {/* Mobile service links */}
              <div className="pt-2 border-t border-white/10 mt-1 space-y-1">
                {navLinks.find(l => l.label === "Dịch vụ")?.children?.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-6 py-2 text-white/55 hover:text-white text-xs transition-colors"
                  >
                    → {child.label}
                  </Link>
                ))}
              </div>
              <a
                href={isHome ? "#contact" : "/#contact"}
                className="mt-3 bg-[#ff6b35] text-white text-center py-3 rounded-full font-semibold text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Đăng ký tư vấn miễn phí
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
