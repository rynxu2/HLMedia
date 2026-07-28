import { Facebook, Youtube, MessageCircle, ArrowUp } from "lucide-react";
import { Link } from "react-router";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  "Dịch vụ": [
    { label: "Facebook / TikTok / Shopee Ads", href: "/dich-vu/quang-cao-da-nen-tang" },
    { label: "Xây kênh TikTok", href: "/dich-vu/xay-kenh-tiktok" },
    { label: "Chăm sóc Fanpage", href: "/dich-vu/cham-soc-fanpage" },
    { label: "Quay dựng video", href: "/dich-vu/quay-dung-video-thiet-ke" },
    { label: "Thiết kế Website / App", href: "/dich-vu/thiet-ke-website-app-shopee" },
  ],
  "Hỗ trợ nền tảng": [
    { label: "Tích xanh TikTok / Facebook", href: "/dich-vu/tich-xanh-bao-ve-kenh" },
    { label: "Bảo vệ kênh", href: "/dich-vu/tich-xanh-bao-ve-kenh" },
    { label: "Tư vấn chính sách LIVE", href: "/lien-he" },
    { label: "Khóa học Ads", href: "/khoa-hoc" },
    { label: "Khóa học Edit video", href: "/khoa-hoc" },
  ],
  "Thông tin": [
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Blog Marketing", href: "/blog" },
    { label: "Câu hỏi thường gặp", href: "/#faq" },
    { label: "Liên hệ", href: "/lien-he" },
  ],
};

const socials = [
  { icon: "/facebook_2.png", href: "https://www.facebook.com/profile.php?id=61579549925630", label: "Facebook", color: "#1877f2" },
  { icon: "/zalo.png", href: "https://zalo.me/0868367567", label: "Zalo", color: "#0068ff" },
];

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "#060f1e" }} className="border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/og_image.png"
                alt="HL MEDIA"
                className="h-20 w-auto object-contain"
              />
            </div>

            <p
              className="text-white/45 text-sm mb-5 max-w-xs leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}
            >
              Giải pháp truyền thông &amp; tăng trưởng doanh số đa nền tảng dành cho cá nhân,
              nhà bán hàng và doanh nghiệp.
            </p>

            <div className="flex gap-3 mb-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors border border-white/10"
                >
                  <img src={s.icon} alt={s.label} className="w-5 h-5 object-contain" />
                </a>
              ))}
            </div>

            <div
              className="space-y-1.5 text-xs"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p className="text-white/40">
                📞{" "}
                <a href="tel:0868367567" className="hover:text-white transition-colors">
                  0868 367 567
                </a>
              </p>
              <p className="text-white/40">
                ✉️{" "}
                <a href="mailto:hlmedia1804@gmail.com" className="hover:text-white transition-colors">
                  hlmedia1804@gmail.com
                </a>
              </p>
              <p className="text-white/35 leading-snug">
                📍 Số 44, khu đất mới, xã Tây Phương, Hà Nội
              </p>
              <p className="text-white/35 leading-snug">
                📍 KĐT Lacasta, Văn Phú, Hà Đông
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-white font-bold text-xs mb-4 uppercase tracking-wider"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/30 text-xs"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            © 2026 HL MEDIA. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-white/25 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <span>Facebook Ads</span>
              <span>·</span>
              <span>TikTok Ads</span>
              <span>·</span>
              <span>Shopee Ads</span>
            </div>
            <button
              onClick={scrollTop}
              className="w-8 h-8 bg-[#ff6b35]/20 hover:bg-[#ff6b35] border border-[#ff6b35]/30 rounded-full flex items-center justify-center transition-all duration-200 group"
              aria-label="Về đầu trang"
            >
              <ArrowUp size={14} className="text-[#ff6b35] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
