import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";
import { blogApi } from "../lib/api";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  image: string | null;
  readTime: string | null;
}

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApi.list({ status: 'published', limit: 3 })
      .then((rows) =>
        setPosts(
          rows.map((r: Record<string, unknown>) => ({
            id: r.id as number,
            slug: r.slug as string,
            title: r.title as string,
            excerpt: (r.excerpt ?? '') as string,
            category: r.category as string,
            categoryColor: (r.category_color ?? r.categoryColor ?? '#333') as string,
            image: (r.image ?? null) as string | null,
            readTime: (r.read_time ?? r.readTime ?? null) as string | null,
          }))
        )
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-[#ff6b35] text-sm font-bold uppercase tracking-widest mb-3 block">
              Blog Marketing
            </span>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "#0d1b2a",
                lineHeight: 1.15,
              }}
            >
              KIẾN THỨC GIÚP BẠN
              <br />
              <span className="text-[#0a2463]">BÁN HÀNG TỐT HƠN TRÊN NỀN TẢNG SỐ</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#0a2463] font-semibold text-sm hover:text-[#ff6b35] transition-colors shrink-0"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Xem tất cả bài viết <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid lg:grid-cols-3 gap-7">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#f8f9fc] rounded-2xl border border-[#e8edf7] overflow-hidden animate-pulse">
                <div className="h-48 bg-[#e8edf7]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-[#e8edf7] rounded w-3/4" />
                  <div className="h-4 bg-[#e8edf7] rounded w-full" />
                  <div className="h-4 bg-[#e8edf7] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16 text-[#5a6a85]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Chưa có bài viết nào.
          </div>
        )}

        {/* Posts */}
        {!loading && posts.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-7">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-[#f8f9fc] rounded-2xl overflow-hidden border border-[#e8edf7] hover:shadow-2xl hover:shadow-[#0a2463]/10 transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0a2463] flex items-center justify-center">
                        <span className="text-white/30 text-4xl">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span
                      className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1.5 rounded-full text-white"
                      style={{
                        background: post.categoryColor || "#0a2463",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-[#0d1b2a] mb-3 group-hover:text-[#0a2463] transition-colors line-clamp-2"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "1rem",
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-[#5a6a85] text-sm mb-5 line-clamp-2"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.65 }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#5a6a85]">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readTime || "5 phút đọc"}
                      </span>
                      <span className="flex items-center gap-1 text-[#ff6b35] font-semibold group-hover:gap-2 transition-all">
                        Đọc tiếp <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
