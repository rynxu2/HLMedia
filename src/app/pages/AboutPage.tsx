import { motion } from "motion/react";
import { Link } from "react-router";
import { useSEO, schemas } from "../hooks/useSEO";
import {
  CheckCircle2, ArrowRight, Target, Lightbulb,
  TrendingUp, Users, Award, Heart, Zap, Shield,
} from "lucide-react";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const values = [
  { icon: Target, title: "Tập trung chuyển đổi", desc: "Mọi chiến lược đều hướng đến kết quả đo lường được — không làm cho đẹp mà làm để ra doanh số.", color: "#ff6b35" },
  { icon: Lightbulb, title: "Giải pháp khoa học", desc: "Phân tích dữ liệu, chân dung khách hàng và hành vi nền tảng trước khi triển khai bất kỳ chiến dịch nào.", color: "#1877f2" },
  { icon: TrendingUp, title: "Tối ưu liên tục", desc: "Không dừng lại ở mức ổn — HL MEDIA luôn thử nghiệm, đo lường và cải thiện từng chu kỳ.", color: "#10b981" },
  { icon: Shield, title: "Minh bạch & trung thực", desc: "Báo cáo số liệu thực tế, không làm đẹp kết quả — chỉ những gì đo lường được mới được báo cáo.", color: "#7c3aed" },
  { icon: Heart, title: "Đồng hành thật sự", desc: "Không chỉ làm dịch vụ — chúng tôi cùng khách hàng xây dựng chiến lược và vận hành dài hạn.", color: "#e91e8c" },
  { icon: Zap, title: "Phản hồi nhanh", desc: "Mọi vấn đề phát sinh đều được xử lý trong giờ làm việc, không để khách hàng chờ đợi.", color: "#f59e0b" },
];

const milestones = [
  { year: "2020", title: "Thành lập HL MEDIA", desc: "Bắt đầu với dịch vụ chạy quảng cáo Facebook cho các nhà bán hàng online nhỏ tại Hà Nội." },
  { year: "2021", title: "Mở rộng dịch vụ TikTok", desc: "Xây dựng đội ngũ chuyên biệt về nội dung TikTok khi nền tảng bùng nổ tại Việt Nam." },
  { year: "2022", title: "Ra mắt dịch vụ Website & App", desc: "Hoàn thiện hệ sinh thái dịch vụ từ content, ads đến hạ tầng kỹ thuật cho khách hàng." },
  { year: "2023", title: "100+ khách hàng tin tưởng", desc: "Đạt cột mốc 100 khách hàng đang hợp tác — từ nhà bán hàng nhỏ đến doanh nghiệp vừa." },
  { year: "2024", title: "Mở rộng sang đào tạo", desc: "Ra mắt khóa học thực chiến Facebook Ads, TikTok Ads và Edit video cho cộng đồng seller." },
  { year: "2025+", title: "Phát triển toàn diện", desc: "Tiếp tục mở rộng đội ngũ, nâng cấp quy trình và đồng hành cùng thêm nhiều thương hiệu Việt.", current: true },
];

const targets = [
  { icon: "🛒", title: "Nhà bán hàng Online", desc: "Tối ưu Fanpage, TikTok, Shopee, nội dung bán hàng và quảng cáo tăng inbox — ra đơn bền vững.", color: "#ff6b35" },
  { icon: "👤", title: "Chuyên gia / Cá nhân thương hiệu", desc: "Xây hình ảnh cá nhân, kênh TikTok chuyên nghiệp, nội dung tư vấn và độ uy tín truyền thông.", color: "#1877f2" },
  { icon: "🏢", title: "Doanh nghiệp địa phương", desc: "Thiết kế nhận diện, website, video, quảng cáo địa phương và chăm sóc kênh bài bản, đồng bộ.", color: "#10b981" },
];

const highlights = [
  "Phân tích sản phẩm và khách hàng mục tiêu",
  "Xây dựng định hướng nội dung dài hạn",
  "Triển khai quảng cáo theo mục tiêu cụ thể",
  "Báo cáo hiệu quả và tối ưu liên tục",
  "Đào tạo và chuyển giao công cụ vận hành",
  "Hỗ trợ xử lý vấn đề nền tảng nhanh chóng",
];

const stats = [
  { value: "100+", label: "Khách hàng tin tưởng" },
  { value: "4+", label: "Năm kinh nghiệm" },
  { value: "6", label: "Nhóm dịch vụ toàn diện" },
  { value: "24/7", label: "Hỗ trợ qua Zalo" },
];

export default function AboutPage() {
  useSEO({
    title: "Giới Thiệu Về HL MEDIA",
    description: "HL MEDIA là đơn vị cung cấp giải pháp truyền thông, quảng cáo và phát triển kênh bán hàng online cho cá nhân, nhà bán hàng và doanh nghiệp tại Việt Nam.",
    jsonLd: [
      schemas.organization(),
      schemas.breadcrumb([
        { name: "Trang chủ", url: "/" },
        { name: "Giới thiệu", url: "/gioi-thieu" },
      ]),
    ],
  });

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-36 pb-0"
        style={{ background: "linear-gradient(135deg,#060f1e 0%,#0a2463 60%,#0d1b4a 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20 mt-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#ff6b35]/40 bg-[#ff6b35]/12 text-[#ff6b35] mb-6 inline-block" style={{ fontFamily: F }}>
                Về HL Media
              </span>
              <h1 className="text-white mb-4" style={{ fontFamily: FB, fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 800, lineHeight: 1.08 }}>
                GIÚP THƯƠNG HIỆU<br />
                <span className="text-[#ff6b35]">PHÁT TRIỂN NHỜ</span><br />
                NỘI DUNG & CÔNG NGHỆ
              </h1>
              <p className="text-white/60 mb-8 max-w-lg" style={{ fontFamily: F, lineHeight: 1.78, fontSize: "0.95rem" }}>
                HL MEDIA là đơn vị cung cấp giải pháp truyền thông, quảng cáo và phát triển kênh bán hàng online.
                Chúng tôi đồng hành từ tư vấn chiến lược, xây dựng nội dung đến chạy quảng cáo và chuyển giao công cụ vận hành.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/lien-he"
                  className="group flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-0.5"
                  style={{ fontFamily: F }}>
                  Tư vấn miễn phí <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all"
                  style={{ fontFamily: F }}>
                  Xem dịch vụ
                </Link>
              </div>
            </motion.div>

            {/* Right — image + badges */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop&auto=format"
                  alt="Đội ngũ HL MEDIA" className="w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/55 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: F }}>Văn phòng</p>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: F }}>Tây Phương, Hà Nội · Lacasta Văn Phú, Hà Đông</p>
                </div>
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -top-5 -right-5 w-24 h-24 bg-[#ff6b35] rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-orange-500/30">
                <span className="font-black text-2xl leading-none" style={{ fontFamily: FB }}>Đa</span>
                <span className="text-xs text-white/80 text-center leading-tight px-1">nền tảng</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="absolute -bottom-11 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 border border-[#e8edf7]">
                <div className="flex gap-1 text-xl">{["/facebook_2.png","/tiktok.png","/shopee.png","/website.png"].map(e => <img src={e} className="w-6 h-6" alt={e} />)}</div>
                <div>
                  <p className="text-[#0d1b2a] text-xs font-bold" style={{ fontFamily: F }}>4 nền tảng chính</p>
                  <p className="text-[#5a6a85] text-xs" style={{ fontFamily: F }}>Facebook · TikTok · Shopee · Web</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <svg viewBox="0 0 1440 50" fill="none" className="w-full block">
          <path d="M0 50H1440V25C1200 50 900 0 720 18C540 36 240 0 0 25V50Z" fill="white" />
        </svg>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-b border-[#e8edf7] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <p className="font-black mb-1" style={{ fontFamily: FB, fontSize: "2.4rem", color: i === 0 ? "#ff6b35" : "#0d1b2a" }}>{s.value}</p>
                <p className="text-[#5a6a85] text-sm" style={{ fontFamily: F }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT DETAIL ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block" style={{ fontFamily: F }}>Chúng tôi làm gì</span>
              <h2 className="text-[#0d1b2a] mb-5" style={{ fontFamily: FB, fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 800, lineHeight: 1.15 }}>
                KHÔNG CHỈ LÀM DỊCH VỤ —<br />
                <span className="text-[#0a2463]">ĐỒng HÀNH THẬT SỰ</span>
              </h2>
              <p className="text-[#5a6a85] mb-4 leading-relaxed" style={{ fontFamily: F, lineHeight: 1.75 }}>
                HL MEDIA là đơn vị cung cấp giải pháp truyền thông, quảng cáo và phát triển kênh bán hàng online cho cá nhân, nhà bán hàng và doanh nghiệp tại Việt Nam.
              </p>
              <p className="text-[#5a6a85] mb-8 leading-relaxed" style={{ fontFamily: F, lineHeight: 1.75 }}>
                Chúng tôi không chỉ làm dịch vụ, mà còn <em className="text-[#0a2463] font-semibold not-italic">đồng hành từ tư vấn chiến lược, xây dựng nội dung, chạy quảng cáo, chăm sóc kênh, đào tạo và chuyển giao công cụ vận hành</em> — để khách hàng có thể tự vận hành bền vững.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#ff6b35] mt-0.5 shrink-0" />
                    <span className="text-[#0d1b2a] text-sm" style={{ fontFamily: F }}>{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#0a2463]/12 aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=500&fit=crop&auto=format"
                alt="HL MEDIA team" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/55 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: F }}>Phương châm</p>
                <p className="text-white font-bold" style={{ fontFamily: F }}>Kết nối · Sáng tạo · Bứt phá</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20" style={{ background: "#f8f9fc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block" style={{ fontFamily: F }}>Giá trị cốt lõi</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 800, color: "#0d1b2a" }}>
              NHỮNG GÌ CHÚNG TÔI TIN VÀO
            </h2>
            <p className="text-[#5a6a85] text-sm mt-3 max-w-lg mx-auto" style={{ fontFamily: F }}>
              6 nguyên tắc định hướng mọi quyết định và cách HL MEDIA đồng hành cùng khách hàng.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#e8edf7] p-6 hover:shadow-xl hover:shadow-[#0a2463]/6 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: v.color }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}12` }}>
                  <v.icon size={22} style={{ color: v.color }} />
                </div>
                <h3 className="text-[#0d1b2a] font-bold text-sm mb-2" style={{ fontFamily: F }}>{v.title}</h3>
                <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block" style={{ fontFamily: F }}>Hành trình</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 800, color: "#0d1b2a" }}>
              HL MEDIA QUA CÁC NĂM
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-[#e8edf7] hidden lg:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`relative grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                  {/* Year bubble — center on desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full items-center justify-center z-10 border-2"
                    style={{
                      background: m.current ? "#ff6b35" : "#0a2463",
                      borderColor: m.current ? "#ff6b35" : "#0a2463",
                    }}>
                    <span className="text-white font-black text-xs" style={{ fontFamily: FB }}>{m.year}</span>
                  </div>

                  {/* Content — alternating left/right */}
                  <div className={`lg:col-span-1 ${i % 2 === 0 ? "lg:text-right lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                    <div className={`bg-[#f8f9fc] border border-[#e8edf7] rounded-2xl p-5 hover:shadow-lg transition-all ${m.current ? "border-[#ff6b35]/30 bg-[#fff8f5]" : ""}`}>
                      {/* Mobile year */}
                      <span className="lg:hidden inline-block text-xs font-black px-2.5 py-1 rounded-full text-white mb-2"
                        style={{ background: m.current ? "#ff6b35" : "#0a2463", fontFamily: FB }}>{m.year}</span>
                      <h3 className="text-[#0d1b2a] font-bold text-sm mb-1.5" style={{ fontFamily: F }}>{m.title}</h3>
                      <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{m.desc}</p>
                      {m.current && (
                        <span className="inline-block mt-2 text-xs font-semibold text-[#ff6b35]" style={{ fontFamily: F }}>● Đang diễn ra</span>
                      )}
                    </div>
                  </div>

                  {/* Empty column for alternating effect */}
                  <div className={`hidden lg:block ${i % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-20" style={{ background: "#f8f9fc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block" style={{ fontFamily: F }}>Nhóm khách hàng</span>
            <h2 style={{ fontFamily: FB, fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 800, color: "#0d1b2a" }}>
              HL MEDIA PHÙ HỢP VỚI AI?
            </h2>
            <p className="text-[#5a6a85] text-sm mt-3 max-w-md mx-auto" style={{ fontFamily: F }}>
              Từ nhà bán hàng online đến doanh nghiệp — chúng tôi có giải pháp riêng cho từng nhóm.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {targets.map((t, i) => (
              <motion.div key={t.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[#e8edf7] p-7 text-center hover:shadow-xl hover:shadow-[#0a2463]/6 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: t.color }} />
                <div className="text-5xl mb-4">{t.icon}</div>
                <h4 className="text-[#0d1b2a] font-bold mb-3" style={{ fontFamily: F, fontSize: "0.95rem" }}>{t.title}</h4>
                <p className="text-[#5a6a85] text-sm leading-relaxed" style={{ fontFamily: F, lineHeight: 1.65 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#060f1e 0%,#0a2463 100%)" }}>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#ff6b35]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white mb-3" style={{ fontFamily: FB, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800 }}>
              SẴN SÀNG HỢP TÁC VỚI HL MEDIA?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto" style={{ fontFamily: F, lineHeight: 1.75 }}>
              Để lại thông tin — chuyên gia HL MEDIA sẽ tư vấn giải pháp phù hợp nhất với ngành hàng và mục tiêu của bạn, hoàn toàn miễn phí.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/lien-he"
                className="group flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
                style={{ fontFamily: F }}>
                Đăng ký tư vấn miễn phí <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/#services"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/18 border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all"
                style={{ fontFamily: F }}>
                Xem tất cả dịch vụ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
