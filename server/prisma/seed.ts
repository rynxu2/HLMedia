import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminPwd = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPwd) {
    console.error("❌ Set ADMIN_SEED_PASSWORD env variable before seeding");
    process.exit(1);
  }
  const passwordHash = await bcrypt.hash(adminPwd, 12);
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      passwordHash,
      displayName: "Admin HL Media",
      role: "admin",
    },
  });
  console.log("✅ Admin user seeded:", admin.username);

  // Seed sample blogs (converting existing content to Markdown)
  const blogs = [
    {
      slug: "huong-dan-chay-quang-cao-facebook-2025",
      title: "Hướng dẫn chạy quảng cáo Facebook 2025",
      excerpt: "Tổng hợp kiến thức từ A-Z về Facebook Ads: từ thiết lập tài khoản, tạo chiến dịch, nhắm mục tiêu đến tối ưu chi phí.",
      content: "# Hướng dẫn chạy quảng cáo Facebook 2025\n\nQuảng cáo Facebook vẫn là kênh tiếp cận khách hàng hiệu quả nhất cho doanh nghiệp nhỏ và vừa tại Việt Nam. Với hơn 70 triệu người dùng, Facebook mang đến cơ hội tiếp cận đúng đối tượng.\n\n## 1. Thiết lập tài khoản Business Manager\n\nBước đầu tiên là tạo tài khoản Business Manager. Truy cập business.facebook.com và làm theo hướng dẫn.\n\n## 2. Xác định mục tiêu chiến dịch\n\nChọn đúng objective: Awareness, Traffic, Engagement, Leads, hoặc Sales.\n\n## 3. Nhắm mục tiêu đối tượng\n\nSử dụng Custom Audiences, Lookalike Audiences và Interest-based targeting.\n\n## 4. Tối ưu ngân sách\n\nBắt đầu với ngân sách nhỏ 200-500k/ngày, theo dõi CPM và CPC.",
      category: "Facebook / TikTok Ads",
      categoryColor: "#1877f2",
      tags: ["facebook ads", "quảng cáo", "digital marketing"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      readTime: "8 phút đọc",
      status: "published",
      publishedAt: new Date("2025-03-15"),
      authorId: admin.id,
    },
    {
      slug: "bi-quyet-ban-hang-tiktok-shop",
      title: "Bí quyết bán hàng trên TikTok Shop",
      excerpt: "Tìm hiểu cách tận dụng TikTok Shop để tăng doanh số. Từ setup gian hàng, tạo content viral đến chiến lược livestream.",
      content: "# Bí quyết bán hàng trên TikTok Shop\n\nTikTok Shop đang bùng nổ tại Việt Nam với hàng triệu đơn hàng mỗi ngày.\n\n## 1. Setup gian hàng chuyên nghiệp\n\nĐăng ký TikTok Shop Seller Center, hoàn thiện hồ sơ và upload sản phẩm.\n\n## 2. Tạo content viral\n\nSử dụng trending sounds, hashtags và storytelling để tạo video hấp dẫn.\n\n## 3. Livestream bán hàng\n\nLivestream vào khung giờ vàng 19h-22h, kết hợp flash sale.",
      category: "TikTok Marketing",
      categoryColor: "#000000",
      tags: ["tiktok", "tiktok shop", "bán hàng online"],
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800",
      readTime: "6 phút đọc",
      status: "published",
      publishedAt: new Date("2025-04-02"),
      authorId: admin.id,
    },
    {
      slug: "thiet-ke-website-ban-hang-chuan-seo",
      title: "Thiết kế website bán hàng chuẩn SEO",
      excerpt: "Hướng dẫn xây dựng website bán hàng chuẩn SEO từ đầu: chọn domain, hosting, cấu trúc site và tối ưu tốc độ.",
      content: "# Thiết kế website bán hàng chuẩn SEO\n\nMột website chuẩn SEO giúp bạn có traffic miễn phí từ Google.\n\n## 1. Chọn domain và hosting\n\nChọn domain .vn hoặc .com ngắn gọn, dễ nhớ. Hosting SSD tốc độ cao.\n\n## 2. Cấu trúc website\n\nSử dụng heading hierarchy (H1 > H2 > H3), breadcrumb, internal linking.\n\n## 3. Tối ưu Core Web Vitals\n\nLCP < 2.5s, FID < 100ms, CLS < 0.1.",
      category: "SEO & Website",
      categoryColor: "#10b981",
      tags: ["website", "seo", "thiết kế web"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      readTime: "10 phút đọc",
      status: "published",
      publishedAt: new Date("2025-04-18"),
      authorId: admin.id,
    },
  ];

  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }
  console.log(`✅ ${blogs.length} blogs seeded`);

  // Seed courses
  const courses = [
    {
      name: "Facebook & TikTok Ads thực chiến",
      description: "Khóa học chạy quảng cáo Facebook và TikTok từ zero đến hero. Học xong tự tin setup và tối ưu chiến dịch quảng cáo.",
      instructor: "HL Media Team",
      price: "2.500.000đ",
      priceValue: 2500000,
      duration: "8 buổi (2h/buổi)",
      lessons: 8,
      students: 120,
      rating: 4.8,
      status: "active",
      category: "Facebook Ads",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600",
      highlight: true,
      topics: ["Setup Business Manager", "Tạo chiến dịch", "Nhắm mục tiêu", "Tối ưu chi phí", "Retargeting", "Scaling"],
      outcomes: ["Tự setup và chạy quảng cáo", "Tối ưu chi phí hiệu quả", "Đọc hiểu data & báo cáo"],
    },
    {
      name: "Edit Video Reels & TikTok",
      description: "Học cách edit video ngắn chuyên nghiệp cho Reels và TikTok. Từ cắt ghép cơ bản đến hiệu ứng nâng cao.",
      instructor: "HL Media Team",
      price: "1.800.000đ",
      priceValue: 1800000,
      duration: "6 buổi (2h/buổi)",
      lessons: 6,
      students: 85,
      rating: 4.9,
      status: "active",
      category: "Edit Video",
      thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600",
      highlight: false,
      topics: ["CapCut Pro", "Premiere Rush", "Trending effects", "Color grading", "Sound design"],
      outcomes: ["Edit video ngắn chuyên nghiệp", "Tạo content viral", "Sử dụng hiệu ứng trending"],
    },
  ];

  for (const course of courses) {
    const existing = await prisma.course.findFirst({ where: { name: course.name } });
    if (!existing) {
      await prisma.course.create({ data: course });
    }
  }
  console.log(`✅ ${courses.length} courses seeded`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
