import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { Clock, ArrowLeft, ArrowRight, Tag, Share2, Facebook, Phone } from "lucide-react";
import { blogApi } from "../../lib/api";
import { useSEO, schemas } from "../../hooks/useSEO";
import DOMPurify from "dompurify";
import { marked } from "marked";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryColor: string;
  image: string | null;
  tags: string[];
  readTime: string | null;
  publishedAt: string | null;
  author?: { displayName: string };
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    const mapPost = (r: Record<string, unknown>): BlogPost => ({
      id: r.id as number,
      slug: r.slug as string,
      title: r.title as string,
      excerpt: (r.excerpt ?? '') as string,
      content: (r.content ?? '') as string,
      category: r.category as string,
      categoryColor: (r.category_color ?? r.categoryColor ?? '#333') as string,
      image: (r.image ?? null) as string | null,
      tags: (r.tags ?? []) as string[],
      readTime: (r.read_time ?? r.readTime ?? null) as string | null,
      publishedAt: (r.published_at ?? r.publishedAt ?? null) as string | null,
      author: (r.profiles as Record<string, unknown> | undefined)
        ? { displayName: ((r.profiles as Record<string, unknown>).display_name ?? (r.profiles as Record<string, unknown>).displayName ?? '') as string }
        : undefined,
    });

    blogApi.getBySlug(slug)
      .then((data) => {
        setPost(mapPost(data as Record<string, unknown>));
        // Fire-and-forget view increment
        blogApi.incrementViews(slug);
        // Fetch related posts
        blogApi.list({ status: 'published', limit: 4 })
          .then((rows) =>
            setRelated(
              rows
                .map((r: Record<string, unknown>) => mapPost(r))
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
            )
          )
          .catch(console.error);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // SEO — must be called unconditionally
  useSEO({
    title: post?.title || "Blog — HL MEDIA",
    description: post?.excerpt || "",
    ogType: "article",
    ogImage: post?.image || undefined,
    jsonLd: post
      ? [
          schemas.article({
            title: post.title,
            excerpt: post.excerpt,
            image: post.image || "",
            date: post.publishedAt || "",
            slug: post.slug,
          }),
          schemas.breadcrumb([
            { name: "Trang chủ", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]
      : [],
  });

  if (notFound) return <Navigate to="/blog" replace />;

  if (loading || !post) {
    return (
      <div className="bg-[#f8f9fc] min-h-screen">
        <div className="h-[55vh] min-h-[320px] bg-[#0a2463] animate-pulse" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-4 max-w-3xl animate-pulse">
            <div className="h-6 bg-[#e8edf7] rounded w-3/4" />
            <div className="h-4 bg-[#e8edf7] rounded w-full" />
            <div className="h-4 bg-[#e8edf7] rounded w-5/6" />
            <div className="h-4 bg-[#e8edf7] rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[320px] overflow-hidden">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        )}
        {!post.image && (
          <div className="w-full h-full bg-[#0a2463]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#060f1e]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-4 sm:px-6 max-w-6xl mx-auto w-full left-0 right-0">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm mb-5 transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <ArrowLeft size={14} /> Tất cả bài viết
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: post.categoryColor === "#333" ? "#444" : post.categoryColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-white/50 text-xs"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Clock size={12} /> {post.readTime || "5 phút đọc"}
              </span>
              <span className="text-white/50 text-xs" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : ""}
              </span>
            </div>
            <h1 className="text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15 }}>
              {post.title.toUpperCase()}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Article */}
          <article className="lg:col-span-3">
            {/* Excerpt */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#0a2463]/8 border-l-4 border-[#0a2463] rounded-r-xl px-5 py-4 mb-8">
              <p className="text-[#0a2463] font-semibold italic"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.7 }}>
                {post.excerpt}
              </p>
            </motion.div>

            {/* Content — rendered from Markdown string */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="prose prose-lg max-w-none text-[#374151]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.8 }}>
              <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
              />
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#e8edf7]">
              {(post.tags || []).map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white border border-[#e8edf7] text-[#5a6a85] hover:border-[#0a2463]/30 hover:text-[#0a2463] transition-colors cursor-pointer"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Tag size={10} />{t}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-5">
              <span className="text-[#5a6a85] text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Chia sẻ:</span>
              <button onClick={shareOnFacebook} className="flex items-center gap-1.5 bg-[#1877f2] text-white text-xs px-3 py-1.5 rounded-full font-semibold hover:opacity-90 transition-opacity">
                <Facebook size={12} /> Facebook
              </button>
              <button onClick={copyLink} className="flex items-center gap-1.5 bg-[#f0f3fa] text-[#0a2463] text-xs px-3 py-1.5 rounded-full font-semibold hover:bg-[#e8edf7] transition-colors">
                <Share2 size={12} /> Sao chép link
              </button>
            </div>

            {/* Prev / Next using related posts */}
            {related.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mt-10">
                {related[0] && (
                  <Link to={`/blog/${related[0].slug}`}
                    className="group flex items-start gap-3 bg-white border border-[#e8edf7] rounded-2xl p-4 hover:shadow-lg hover:border-[#0a2463]/20 transition-all duration-200">
                    <ArrowLeft size={16} className="text-[#5a6a85] shrink-0 mt-0.5 group-hover:text-[#0a2463] transition-colors" />
                    <div>
                      <p className="text-[#5a6a85] text-xs mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bài khác</p>
                      <p className="text-[#0d1b2a] text-sm font-semibold line-clamp-2 group-hover:text-[#0a2463] transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{related[0].title}</p>
                    </div>
                  </Link>
                )}
                {related[1] && (
                  <Link to={`/blog/${related[1].slug}`}
                    className="group flex items-start gap-3 bg-white border border-[#e8edf7] rounded-2xl p-4 hover:shadow-lg hover:border-[#0a2463]/20 transition-all duration-200 sm:text-right">
                    <div className="flex-1">
                      <p className="text-[#5a6a85] text-xs mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bài khác</p>
                      <p className="text-[#0d1b2a] text-sm font-semibold line-clamp-2 group-hover:text-[#0a2463] transition-colors"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{related[1].title}</p>
                    </div>
                    <ArrowRight size={16} className="text-[#5a6a85] shrink-0 mt-0.5 group-hover:text-[#0a2463] transition-colors" />
                  </Link>
                )}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            {/* Contact CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#0a2463] rounded-2xl p-5 text-center sticky top-20">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-white font-bold mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95rem" }}>
                Cần tư vấn thêm?
              </h3>
              <p className="text-white/60 text-xs mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.6 }}>
                HL MEDIA sẵn sàng giúp bạn áp dụng vào thực tế
              </p>
              <Link to="/#contact"
                className="block bg-[#ff6b35] hover:bg-[#ff8c5a] text-white text-sm font-semibold py-2.5 rounded-full transition-colors mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Tư vấn miễn phí
              </Link>
              <a href="tel:0868367567"
                className="flex items-center justify-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Phone size={12} /> 0868 367 567
              </a>
            </motion.div>

            {/* Related posts */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl border border-[#e8edf7] p-5">
              <h3 className="text-[#0d1b2a] font-bold text-sm mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Bài viết liên quan</h3>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`}
                    className="group flex gap-3 items-start">
                    {p.image && (
                      <img src={p.image} alt={p.title} loading="lazy"
                        className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition-opacity" />
                    )}
                    <div>
                      <p className="text-[#0d1b2a] text-xs font-semibold line-clamp-2 group-hover:text-[#0a2463] transition-colors leading-snug mb-1"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.title}</p>
                      <span className="flex items-center gap-1 text-[#5a6a85] text-xs"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        <Clock size={10} />{p.readTime || "5 phút đọc"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/blog"
                className="flex items-center gap-1.5 text-[#ff6b35] text-xs font-semibold mt-4 hover:underline"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Xem tất cả bài viết <ArrowRight size={12} />
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** Safely convert Markdown to sanitized HTML */
export function markdownToHtml(md: string): string {
  if (!md) return "";
  const rawHtml = marked.parse(md, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6", "p", "a", "strong", "em", "ul", "ol", "li",
      "img", "blockquote", "code", "pre", "br", "hr", "table", "thead", "tbody", "tr", "th", "td",
      "div", "span", "mark", "b", "i", "u", "s", "del", "ins", "sub", "sup"
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "style", "target", "rel", "width", "height"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ["target"],
  });
}
