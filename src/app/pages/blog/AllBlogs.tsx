import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";
import { blogApi } from "../../lib/api";
import { useSEO, schemas } from "../../hooks/useSEO";

interface BlogPost {
  id: number; slug: string; title: string; excerpt: string;
  category: string; categoryColor: string; image: string | null;
  tags: string[]; readTime: string | null; publishedAt: string | null;
  author?: { displayName: string };
}

export default function AllBlogs() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tất cả");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.list({ status: 'published', limit: 50 })
      .then((rows) =>
        setBlogPosts(
          rows.map((r: Record<string, unknown>) => ({
            id: r.id as number,
            slug: r.slug as string,
            title: r.title as string,
            excerpt: r.excerpt as string,
            category: r.category as string,
            categoryColor: (r.category_color ?? r.categoryColor ?? '#333') as string,
            image: (r.image ?? null) as string | null,
            tags: (r.tags ?? []) as string[],
            readTime: (r.read_time ?? r.readTime ?? null) as string | null,
            publishedAt: (r.published_at ?? r.publishedAt ?? null) as string | null,
            author: (r.profiles as Record<string, unknown> | undefined)
              ? { displayName: ((r.profiles as Record<string, unknown>).display_name ?? (r.profiles as Record<string, unknown>).displayName ?? '') as string }
              : undefined,
          }))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Tất cả", ...new Set(blogPosts.map((p) => p.category))];

  const filtered = blogPosts.filter((p) => {
    const matchCat = cat === "Tất cả" || p.category === cat;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useSEO({
    title: "Blog Marketing — Kiến Thức Bán Hàng Online",
    description: "Chia sẻ kinh nghiệm thực chiến từ đội ngũ HL MEDIA về quảng cáo Facebook, TikTok, Shopee và bán hàng đa nền tảng.",
    jsonLd: [
      schemas.breadcrumb([
        { name: "Trang chủ", url: "/" },
        { name: "Blog", url: "/blog" },
      ]),
    ],
  });

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #060f1e 0%, #0a2463 100%)" }}>
        <div className="absolute inset-0 opacity-8"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center pb-15 pt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#ff6b35] text-xs font-bold uppercase tracking-widest mb-3 block"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Blog Marketing</span>
            <h1 className="text-white mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}>
              KIẾN THỨC GIÚP BẠN<br />
              <span className="text-[#ff6b35]">BÁN HÀNG TỐT HƠN</span>
            </h1>
            <p className="text-white/60 mb-8 max-w-lg mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
              Chia sẻ kinh nghiệm thực chiến từ đội ngũ HL MEDIA về quảng cáo, nội dung và bán hàng đa nền tảng.
            </p>
            {/* Search */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 max-w-md mx-auto">
              <Search size={16} className="text-white/50 shrink-0" />
              <input
                placeholder="Tìm kiếm bài viết..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-white placeholder:text-white/40 text-sm focus:outline-none w-full"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              />
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full block -mb-1">
            <path d="M0 40H1440V15C1100 40 700 0 0 20V40Z" fill="#f8f9fc" />
          </svg>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${cat === c ? "bg-[#0a2463] text-white shadow-md" : "bg-white text-[#5a6a85] border border-[#e8edf7] hover:border-[#0a2463]/30 hover:text-[#0a2463]"}`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {c}
              <span className={`ml-1.5 text-xs ${cat === c ? "text-white/70" : "text-[#5a6a85]"}`}>
                {c === "Tất cả" ? blogPosts.length : blogPosts.filter(p => p.category === c).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8edf7] animate-pulse">
                <div className="h-48 bg-[#f0f3fa]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-[#f0f3fa] rounded w-3/4" />
                  <div className="h-4 bg-[#f0f3fa] rounded w-full" />
                  <div className="h-3 bg-[#f0f3fa] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#5a6a85]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Không tìm thấy bài viết phù hợp.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((post, i) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-[#e8edf7] hover:shadow-2xl hover:shadow-[#0a2463]/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img src={post.image} alt={post.title} loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-[#0a2463] flex items-center justify-center">
                        <span className="text-3xl text-white/30 font-bold">HL</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1.5 rounded-full text-white"
                      style={{ background: post.categoryColor === "#333" ? "#333" : post.categoryColor }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-[#0d1b2a] mb-3 group-hover:text-[#0a2463] transition-colors line-clamp-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.4 }}>
                      {post.title}
                    </h2>
                    <p className="text-[#5a6a85] text-sm mb-4 line-clamp-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}>
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#f0f3fa] text-[#5a6a85]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          <Tag size={9} />{t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#5a6a85]">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />{post.readTime || "5 phút đọc"}
                      </span>
                      <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : ""}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 bg-[#0a2463] rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-white mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800 }}>
            MUỐN TĂNG TRƯỞNG BÁN HÀNG ONLINE?
          </h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
            HL MEDIA đồng hành từ tư vấn chiến lược đến triển khai thực tế — không chỉ chia sẻ kiến thức.
          </p>
          <Link to="/#contact"
            className="inline-flex items-center gap-2 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-xl shadow-orange-500/30"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Nhận tư vấn miễn phí <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
