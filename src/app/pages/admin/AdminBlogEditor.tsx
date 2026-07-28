import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { 
  ArrowLeft, Settings, Save, Eye, EyeOff, Loader2, Image as ImageIcon, Plus, Trash2, X,
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Minus, Terminal, Link2, Undo2, Redo2,
  Sparkles, Lightbulb, AlertTriangle, Rocket, Bookmark, Columns, Monitor, Edit3
} from "lucide-react";
import { blogApi, uploadApi } from "../../lib/api";
import { markdownToHtml } from "../blog/BlogDetail";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

const categories = ["Facebook / TikTok Ads", "TikTok Marketing", "Livestream", "SEO & Website", "Chiến lược bán hàng", "Khác"];

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Blog states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [status, setStatus] = useState<"published" | "draft">("draft");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // UI states
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [error, setError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">("split");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inlineFileInputRef = useRef<HTMLInputElement>(null);

  // Configure Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: false,
        linkify: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#0a2463] hover:underline font-semibold",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
    ],
    content: "",
    onUpdate: () => {
      setIsDirty(true);
    },
  });

  // Fetch blog data if editing
  useEffect(() => {
    if (!id || !editor) return;
    setLoading(true);
    blogApi.getById(Number(id))
      .then((blog) => {
        setTitle(blog.title ?? "");
        setCategory(blog.category ?? categories[0]);
        setStatus(blog.status ?? "draft");
        setExcerpt(blog.excerpt ?? "");
        setImage(blog.image ?? "");
        setTags(blog.tags ?? []);
        
        // Set content inside Tiptap
        editor.commands.setContent(blog.content ?? "", false, { contentType: "markdown" });
        // Reset dirty check after initial load
        setTimeout(() => setIsDirty(false), 100);
      })
      .catch((err) => {
        console.error("Failed to load blog:", err);
        setError("Không thể tải thông tin bài viết.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, editor]);

  // Handle uploader click
  const triggerThumbnailUpload = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadApi.upload(file);
      setImage(result.url);
      setIsDirty(true);
    } catch (err) {
      console.error("Failed to upload thumbnail:", err);
      setError("Tải ảnh thumbnail thất bại.");
    } finally {
      setUploading(false);
    }
  };

  // Inline images upload
  const triggerInlineImageUpload = () => {
    inlineFileInputRef.current?.click();
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInline(true);
    try {
      const result = await uploadApi.upload(file);
      if (editor) {
        editor
          .chain()
          .focus()
          .setImage({ src: result.url, alt: file.name })
          .run();
      }
    } catch (err) {
      console.error("Failed to upload inline image:", err);
      setError("Tải ảnh nội dung thất bại.");
    } finally {
      setUploadingInline(false);
    }
  };

  // Add tag
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setIsDirty(true);
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, idx) => idx !== indexToRemove));
    setIsDirty(true);
  };

  // Save handler
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Tiêu đề không được để trống.");
      return;
    }

    const content = (editor as any)?.getMarkdown() || "";
    if (!content.trim()) {
      setError("Nội dung bài viết không được để trống.");
      return;
    }

    setSaving(true);
    setError("");

    // Generate slug from title (Vietnamese-aware)
    const generateSlug = (text: string) =>
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        || `blog-${Date.now()}`;

    // Estimate read time
    const wordCount = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} phút đọc`;

    const payload: Record<string, unknown> = {
      title,
      excerpt: excerpt || title.substring(0, 150),
      content,
      category,
      category_color: "#0a2463",
      status,
      image: image || "",
      tags,
      read_time: readTime,
    };

    // Only set slug + published_at on create
    if (!isEdit) {
      payload.slug = generateSlug(title);
      if (status === "published") {
        payload.published_at = new Date().toISOString();
      }
    } else if (status === "published") {
      // Set published_at on publish if not already set
      payload.published_at = new Date().toISOString();
    }

    try {
      if (isEdit) {
        await blogApi.update(Number(id), payload);
      } else {
        await blogApi.create(payload);
      }
      setIsDirty(false);
      navigate("/quan-ly/blog");
    } catch (err: any) {
      console.error("Failed to save blog:", err);
      setError(err.message || "Lưu bài viết thất bại, vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  // Go back handler
  const handleBack = () => {
    if (isDirty) {
      if (window.confirm("Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn quay lại?")) {
        navigate("/quan-ly/blog");
      }
    } else {
      navigate("/quan-ly/blog");
    }
  };

  // Link toggle
  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Nhập địa chỉ URL:", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertCallout = (type: "tip" | "warning" | "highlight" | "summary" | "cta") => {
    if (!editor) return;
    let html = "";
    if (type === "tip") {
      html = `<div class="callout-tip"><p>💡 <strong>Mẹo hay:</strong> Nhập nội dung mẹo hoặc lưu ý hữu ích tại đây...</p></div>`;
    } else if (type === "warning") {
      html = `<div class="callout-warning"><p>⚠️ <strong>Lưu ý quan trọng:</strong> Nhập nội dung cảnh báo hoặc điểm cần tránh tại đây...</p></div>`;
    } else if (type === "highlight") {
      html = `<div class="callout-highlight"><p>🚀 <strong>Bí quyết thành công:</strong> Nhập yếu tố cốt lõi giúp tăng chuyển đổi tại đây...</p></div>`;
    } else if (type === "summary") {
      html = `<div class="callout-summary"><p>📌 <strong>Tóm tắt:</strong> Nhập điểm chính tóm tắt của phần này...</p></div>`;
    } else if (type === "cta") {
      html = `<p><a href="/#contact" class="blog-cta-btn">👉 ĐĂNG KÝ TƯ VẤN BÁN HÀNG NGAY</a></p>`;
    }
    editor.chain().focus().insertContent(html).run();
  };

  const insertHighlight = (color: "yellow" | "green" | "blue" | "pink") => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");
    const text = selectedText || "Nội dung nổi bật";
    const html = `<mark class="highlight-${color}">${text}</mark>`;
    editor.chain().focus().insertContent(html).run();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#5a6a85]" style={{ fontFamily: F }}>
        <Loader2 size={36} className="animate-spin text-[#0a2463] mb-4" />
        <p className="text-sm">Đang tải dữ liệu bài viết...</p>
      </div>
    );
  }

  const currentContentMarkdown = (editor as any)?.getMarkdown() || "";
  const livePreviewHtml = markdownToHtml(currentContentMarkdown);

  return (
    <div className={`space-y-6 mx-auto pb-20 transition-all ${viewMode === 'split' ? 'max-w-7xl' : 'max-w-5xl'}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#e8edf7] pb-4 gap-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-2.5 rounded-xl border border-[#e8edf7] hover:bg-[#f4f6fb] text-[#5a6a85] transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-xs text-[#9aa5b8] font-semibold" style={{ fontFamily: F }}>
              {isEdit ? "CẬP NHẬT BÀI VIẾT" : "SOẠN THẢO BÀI MỚI"}
            </span>
            <h1 className="text-xl text-[#0d1b2a] font-extrabold tracking-tight mt-0.5" style={{ fontFamily: FB }}>
              {isEdit ? "CHỈNH SỬA BLOG" : "VIẾT BÀI MỚI"}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#f0f3fa] p-1 rounded-xl border border-[#e8edf7] mr-2">
            <button
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'edit' ? 'bg-white text-[#0a2463] shadow-sm font-bold' : 'text-[#5a6a85] hover:text-[#0d1b2a]'}`}
              style={{ fontFamily: F }}
              title="Chỉ soạn thảo"
            >
              <Edit3 size={13} /> Sửa
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'split' ? 'bg-white text-[#0a2463] shadow-sm font-bold' : 'text-[#5a6a85] hover:text-[#0d1b2a]'}`}
              style={{ fontFamily: F }}
              title="Chia đôi màn hình xem trước trực tiếp"
            >
              <Columns size={13} /> Chia đôi Live
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'preview' ? 'bg-white text-[#0a2463] shadow-sm font-bold' : 'text-[#5a6a85] hover:text-[#0d1b2a]'}`}
              style={{ fontFamily: F }}
              title="Xem trước kết quả"
            >
              <Monitor size={13} /> Xem trước
            </button>
          </div>

          {/* Status badge & toggler */}
          <button 
            onClick={() => {
              setStatus(s => s === "published" ? "draft" : "published");
              setIsDirty(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              status === "published" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" 
                : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
            }`}
            style={{ fontFamily: F }}
          >
            {status === "published" ? (
              <>
                <Eye size={13} /> Công khai
              </>
            ) : (
              <>
                <EyeOff size={13} /> Bản nháp
              </>
            )}
          </button>

          {/* Settings button */}
          <button 
            onClick={() => setShowDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#e8edf7] text-[#5a6a85] bg-white hover:bg-[#f4f6fb] text-xs font-semibold transition-all"
            style={{ fontFamily: F }}
          >
            <Settings size={13} /> Thiết lập
          </button>

          {/* Save button */}
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#ff6b35] hover:bg-[#ff8c5a] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-orange-500/20 disabled:opacity-60"
            style={{ fontFamily: F }}
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Lưu bài viết
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3" style={{ fontFamily: F }}>
          {error}
        </div>
      )}

      {/* Editor Content Area */}
      <div className="bg-white rounded-3xl border border-[#e8edf7] shadow-xl shadow-[#0a2463]/4 overflow-hidden min-h-[500px]">
        {/* Editor Toolbar */}
        {editor && (
          <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-[#e8edf7] bg-[#f8f9fc]">
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()} 
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`p-2 rounded-lg transition-colors ${editor.isActive("bold") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Chữ đậm"
            >
              <Bold size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleItalic().run()} 
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`p-2 rounded-lg transition-colors ${editor.isActive("italic") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Chữ nghiêng"
            >
              <Italic size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleStrike().run()} 
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`p-2 rounded-lg transition-colors ${editor.isActive("strike") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Gạch ngang"
            >
              <Strikethrough size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleCode().run()} 
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={`p-2 rounded-lg transition-colors ${editor.isActive("code") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Code inline"
            >
              <Code size={15} />
            </button>

            <div className="h-4 w-[1px] bg-[#e8edf7] mx-1" />

            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Tiêu đề 1"
            >
              <Heading1 size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Tiêu đề 2"
            >
              <Heading2 size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Tiêu đề 3"
            >
              <Heading3 size={15} />
            </button>

            <div className="h-4 w-[1px] bg-[#e8edf7] mx-1" />

            <button 
              onClick={() => editor.chain().focus().toggleBulletList().run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("bulletList") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Danh sách dấu chấm"
            >
              <List size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleOrderedList().run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("orderedList") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Danh sách số"
            >
              <ListOrdered size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleBlockquote().run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("blockquote") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Trích dẫn"
            >
              <Quote size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("codeBlock") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Khối Code"
            >
              <Terminal size={15} />
            </button>

            <div className="h-4 w-[1px] bg-[#e8edf7] mx-1" />

            <button 
              onClick={setLink} 
              className={`p-2 rounded-lg transition-colors ${editor.isActive("link") ? "bg-[#e8edf7] text-[#0a2463]" : "text-[#5a6a85] hover:bg-[#f4f6fb]"}`}
              title="Chèn liên kết"
            >
              <Link2 size={15} />
            </button>

            <button 
              onClick={triggerInlineImageUpload}
              disabled={uploadingInline}
              className="p-2 rounded-lg text-[#5a6a85] hover:bg-[#f4f6fb] transition-colors flex items-center justify-center disabled:opacity-50"
              title="Chèn ảnh vào nội dung"
            >
              {uploadingInline ? <Loader2 size={15} className="animate-spin text-[#0a2463]" /> : <ImageIcon size={15} />}
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={inlineFileInputRef} 
              onChange={handleInlineImageUpload} 
              className="hidden" 
            />

            <button 
              onClick={() => editor.chain().focus().setHorizontalRule().run()} 
              className="p-2 rounded-lg text-[#5a6a85] hover:bg-[#f4f6fb] transition-colors"
              title="Đường kẻ ngang"
            >
              <Minus size={15} />
            </button>

            <div className="h-4 w-[1px] bg-[#e8edf7] mx-1" />

            {/* Quick Presets & Highlights Dropdowns/Buttons */}
            <div className="flex items-center gap-1 bg-[#f0f4ff] px-2 py-1 rounded-xl border border-[#dbeefd]">
              <span className="text-[11px] font-bold text-[#0a2463] uppercase tracking-wider mr-1 flex items-center gap-1" style={{ fontFamily: F }}>
                <Sparkles size={12} className="text-[#ff6b35]" /> Mẫu nhanh:
              </span>

              <button
                type="button"
                onClick={() => insertCallout("tip")}
                className="px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors flex items-center gap-1"
                style={{ fontFamily: F }}
                title="Chèn khung Mẹo hay"
              >
                <Lightbulb size={12} /> Mẹo hay
              </button>

              <button
                type="button"
                onClick={() => insertCallout("warning")}
                className="px-2 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors flex items-center gap-1"
                style={{ fontFamily: F }}
                title="Chèn khung Lưu ý quan trọng"
              >
                <AlertTriangle size={12} /> Lưu ý
              </button>

              <button
                type="button"
                onClick={() => insertCallout("highlight")}
                className="px-2 py-1 rounded-lg text-xs font-semibold bg-[#0a2463] text-white hover:bg-[#0a2463]/90 transition-colors flex items-center gap-1"
                style={{ fontFamily: F }}
                title="Chèn khung Bí quyết thành công"
              >
                <Rocket size={12} className="text-[#ff6b35]" /> Bí quyết
              </button>

              <button
                type="button"
                onClick={() => insertCallout("summary")}
                className="px-2 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors flex items-center gap-1"
                style={{ fontFamily: F }}
                title="Chèn khung Tóm tắt"
              >
                <Bookmark size={12} /> Tóm tắt
              </button>

              <button
                type="button"
                onClick={() => insertCallout("cta")}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#ff6b35] text-white hover:bg-[#e55a24] transition-colors shadow-sm"
                style={{ fontFamily: F }}
                title="Chèn nút bấm Đăng ký tư vấn CTA"
              >
                👉 Nút CTA
              </button>

              <div className="h-3 w-[1px] bg-blue-200 mx-1" />

              {/* Color Marker Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertHighlight("yellow")}
                  className="w-5 h-5 rounded-full bg-yellow-300 hover:scale-110 transition-transform border border-yellow-400"
                  title="Highlight vàng"
                />
                <button
                  type="button"
                  onClick={() => insertHighlight("green")}
                  className="w-5 h-5 rounded-full bg-green-300 hover:scale-110 transition-transform border border-green-400"
                  title="Highlight xanh lá"
                />
                <button
                  type="button"
                  onClick={() => insertHighlight("blue")}
                  className="w-5 h-5 rounded-full bg-blue-300 hover:scale-110 transition-transform border border-blue-400"
                  title="Highlight xanh dương"
                />
                <button
                  type="button"
                  onClick={() => insertHighlight("pink")}
                  className="w-5 h-5 rounded-full bg-pink-300 hover:scale-110 transition-transform border border-pink-400"
                  title="Highlight hồng"
                />
              </div>
            </div>

            <div className="h-4 w-[1px] bg-[#e8edf7] mx-1" />

            <button 
              onClick={() => editor.chain().focus().undo().run()} 
              disabled={!editor.can().chain().focus().undo().run()}
              className="p-2 rounded-lg text-[#5a6a85] hover:bg-[#f4f6fb] disabled:opacity-30 transition-colors"
              title="Hoàn tác"
            >
              <Undo2 size={15} />
            </button>
            <button 
              onClick={() => editor.chain().focus().redo().run()} 
              disabled={!editor.can().chain().focus().redo().run()}
              className="p-2 rounded-lg text-[#5a6a85] hover:bg-[#f4f6fb] disabled:opacity-30 transition-colors"
              title="Làm lại"
            >
              <Redo2 size={15} />
            </button>
          </div>
        )}

        {/* Editor Main Layout (Supports Edit, Split, Preview modes) */}
        <div className={viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#e8edf7]' : ''}>
          {/* Editor Input Column */}
          {(viewMode === 'edit' || viewMode === 'split') && (
            <div className="p-6 md:p-8 space-y-6">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Tiêu đề bài viết..."
                className="w-full text-2xl md:text-3xl font-extrabold text-[#0d1b2a] focus:outline-none border-b border-[#e8edf7]/50 pb-4 placeholder:text-gray-300"
                style={{ fontFamily: F }}
              />

              <EditorContent editor={editor} className="min-h-[450px] prose-editor" />
            </div>
          )}

          {/* Live Preview Column */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="p-6 md:p-8 bg-[#f8f9fc] space-y-6 overflow-y-auto max-h-[85vh]">
              <div className="flex items-center justify-between border-b border-[#e8edf7] pb-3">
                <span className="text-xs font-bold text-[#0a2463] uppercase tracking-wider flex items-center gap-1.5" style={{ fontFamily: F }}>
                  <Monitor size={14} className="text-[#ff6b35]" /> Xem trước trực tiếp giao diện bài viết
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#0a2463] text-white font-semibold" style={{ fontFamily: F }}>
                  {category}
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#0d1b2a] leading-tight" style={{ fontFamily: FB }}>
                  {title || "Tiêu đề bài viết sẽ xuất hiện tại đây..."}
                </h1>

                {excerpt && (
                  <div className="bg-[#0a2463]/8 border-l-4 border-[#0a2463] rounded-r-xl px-4 py-3 text-[#0a2463] font-medium italic text-sm" style={{ fontFamily: F }}>
                    {excerpt}
                  </div>
                )}

                {image && (
                  <img src={image} alt="Cover" className="w-full h-48 md:h-64 object-cover rounded-2xl border border-[#e8edf7]" />
                )}

                <div 
                  className="prose prose-lg max-w-none text-[#374151] pt-4"
                  style={{ fontFamily: F, lineHeight: 1.8 }}
                  dangerouslySetInnerHTML={{ __html: livePreviewHtml || "<p className='text-gray-400 italic'>Soạn thảo nội dung ở bên trái để xem trước giao diện tại đây...</p>" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Settings Drawer */}
      <AnimatePresence>
        {showDrawer && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDrawer(false)}
              className="fixed inset-0 z-40 bg-[#040a18]"
            />

            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-[#e8edf7]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8edf7]">
                <h3 className="text-base text-[#0d1b2a] font-bold" style={{ fontFamily: F }}>
                  Thiết lập bài viết
                </h3>
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="w-8 h-8 rounded-full bg-[#f4f6fb] hover:bg-[#e8edf7] flex items-center justify-center transition-colors"
                >
                  <X size={15} className="text-[#5a6a85]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Image upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#0d1b2a]" style={{ fontFamily: F }}>
                    Ảnh Thumbnail
                  </label>
                  <div 
                    onClick={triggerThumbnailUpload}
                    className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-[#e8edf7] rounded-2xl bg-[#f8f9fc] hover:border-[#0a2463]/30 transition-colors cursor-pointer relative overflow-hidden group"
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleThumbnailUpload} 
                      className="hidden" 
                    />
                    
                    {uploading ? (
                      <div className="text-center p-4">
                        <Loader2 size={24} className="text-[#0a2463] mx-auto mb-2 animate-spin" />
                        <p className="text-[#9aa5b8] text-xs" style={{ fontFamily: F }}>Đang tải ảnh lên...</p>
                      </div>
                    ) : image ? (
                      <>
                        <img src={image} alt="Thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold">
                          Thay đổi ảnh
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={28} className="text-[#9aa5b8] mx-auto mb-2" />
                        <p className="text-[#5a6a85] text-xs font-semibold" style={{ fontFamily: F }}>Tải ảnh lên</p>
                        <p className="text-[#9aa5b8] text-[10px] mt-0.5" style={{ fontFamily: F }}>Định dạng JPG, PNG, WEBP</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category select */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#0d1b2a]" style={{ fontFamily: F }}>
                    Danh mục bài viết
                  </label>
                  <select 
                    value={category} 
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setIsDirty(true);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white transition-all"
                    style={{ fontFamily: F }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#0d1b2a]" style={{ fontFamily: F }}>
                    Mô tả ngắn (Excerpt)
                  </label>
                  <textarea 
                    value={excerpt} 
                    onChange={(e) => {
                      setExcerpt(e.target.value);
                      setIsDirty(true);
                    }}
                    rows={4}
                    placeholder="Mô tả ngắn gọn nội dung bài viết hiển thị ở trang danh sách..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white transition-all resize-none leading-relaxed"
                    style={{ fontFamily: F }}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#0d1b2a]" style={{ fontFamily: F }}>
                    Thẻ bài viết (Tags)
                  </label>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      placeholder="Nhập thẻ rồi nhấn Enter..."
                      className="w-full px-4 py-3 rounded-xl border border-[#e8edf7] bg-[#f8f9fc] text-sm focus:outline-none focus:border-[#0a2463] focus:bg-white transition-all"
                      style={{ fontFamily: F }}
                    />
                    
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags.map((t, idx) => (
                          <span 
                            key={t} 
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#f0f3fa] text-[#0a2463] font-semibold border border-[#e8edf7]"
                            style={{ fontFamily: F }}
                          >
                            {t}
                            <button 
                              type="button" 
                              onClick={() => removeTag(idx)}
                              className="w-4 h-4 rounded-full bg-white hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer footer */}
              <div className="p-6 border-t border-[#e8edf7] bg-[#f8f9fc]">
                <button 
                  onClick={() => setShowDrawer(false)}
                  className="w-full py-3 bg-[#0a2463] hover:bg-[#1a3a7a] text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-[#0a2463]/15"
                  style={{ fontFamily: F }}
                >
                  Xác nhận thiết lập
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
