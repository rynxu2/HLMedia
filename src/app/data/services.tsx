import { ReactNode } from "react";

export interface ServiceData {
  slug: string;
  icon: ReactNode;
  color: string;
  heroImage: string;
  tags: string[];
  results: { value: string; label: string }[];
  eyebrow: string;
  badge?: string;
  title: string;
  subtitle: string;
  heroDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
  painPoints: string[];
  workItems: { icon: string; title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaButton: string;
}

export const services: ServiceData[] = [
  {
    slug: "quang-cao-da-nen-tang",
    icon: <img src="/facebook.png" alt="facebook" />,
    color: "#1877f2",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop&auto=format",
    tags: ["Facebook Ads", "TikTok Ads", "Shopee Ads", "Retargeting"],
    results: [
      { value: "↓62%", label: "Giảm chi phí/kết quả" },
      { value: "3.8x", label: "ROAS trung bình" },
      { value: "48h", label: "Thời gian setup" },
      { value: "24/7", label: "Theo dõi chiến dịch" },
    ],
    eyebrow: "DỊCH VỤ QUẢNG CÁO",
    title: "Chạy quảng cáo Facebook, TikTok, Shopee",
    subtitle: "Tăng inbox · Tăng đơn · Tăng doanh số",
    heroDesc:
      "HL MEDIA thiết lập, tối ưu và báo cáo minh bạch cho từng chiến dịch — giúp bạn không \"đốt tiền\" vào những target sai và nội dung không chuyển đổi.",
    ctaPrimary: "Nhận tư vấn ngân sách quảng cáo",
    ctaSecondary: "Xem gói dịch vụ",
    painPoints: [
      "Chạy quảng cáo nhưng không biết tệp khách hàng thật sự là ai",
      "Ngân sách tăng nhưng đơn hàng không tăng tương ứng",
      "Không đọc được chỉ số CPM, CTR, CPA để biết chiến dịch đang lãi hay lỗ",
      "Quảng cáo bị từ chối duyệt hoặc tài khoản bị hạn chế liên tục",
    ],
    workItems: [
      { icon: "🔍", title: "Nghiên cứu & lên chiến lược", desc: "Phân tích sản phẩm, đối thủ, chân dung khách hàng mục tiêu trên từng nền tảng." },
      { icon: "⚙️", title: "Thiết lập chiến dịch", desc: "Facebook Ads, TikTok Ads, Shopee Ads theo mục tiêu nhận diện, inbox và chuyển đổi." },
      { icon: "🎨", title: "Sản xuất nội dung quảng cáo", desc: "Ảnh, video ngắn, copy bám insight khách hàng — đúng format từng nền tảng." },
      { icon: "📈", title: "Tối ưu trong quá trình chạy", desc: "Test nhiều tệp khách hàng, điều chỉnh ngân sách theo hiệu suất thực tế liên tục." },
      { icon: "📊", title: "Báo cáo định kỳ", desc: "Báo cáo tuần/tháng kèm đề xuất tối ưu cho giai đoạn tiếp theo." },
    ],
    process: [
      { step: "01", title: "Tiếp nhận sản phẩm, ngân sách, mục tiêu doanh số", desc: "Lắng nghe mục tiêu, sản phẩm, ngân sách và nền tảng đang dùng để xác định hướng phù hợp." },
      { step: "02", title: "Phân tích tệp khách hàng & đề xuất nền tảng", desc: "Đánh giá kênh hiện tại, xác định chân dung khách hàng và đề xuất giải pháp tối ưu." },
      { step: "03", title: "Setup chiến dịch, sản xuất nội dung, chạy thử nghiệm", desc: "Cài đặt pixel, tạo campaign, thiết kế creative — kiểm tra kỹ trước khi chạy thật." },
      { step: "04", title: "Tối ưu liên tục + báo cáo hiệu quả theo chu kỳ", desc: "Theo dõi hàng ngày, tắt nhóm kém, tăng nhóm tốt và báo cáo minh bạch theo tuần/tháng." },
    ],
    faq: [
      { q: "Ngân sách tối thiểu để chạy quảng cáo là bao nhiêu?", a: "Tùy ngành hàng và mục tiêu, HL MEDIA sẽ tư vấn mức ngân sách thử nghiệm hợp lý trước khi mở rộng quy mô. Thông thường từ 5–10 triệu/tháng để có đủ dữ liệu tối ưu." },
      { q: "Bao lâu thì thấy hiệu quả?", a: "Giai đoạn thử nghiệm thường 7–14 ngày để thu thập dữ liệu trước khi tối ưu sâu. Kết quả ổn định thường thấy rõ sau tháng đầu tiên." },
      { q: "Có cam kết doanh số không?", a: "HL MEDIA cam kết về quy trình, chỉ số đo lường minh bạch và tối ưu liên tục — không cam kết doanh số tuyệt đối do phụ thuộc nhiều yếu tố thị trường." },
    ],
    ctaHeading: "Đừng để ngân sách quảng cáo \"bay\" vô ích",
    ctaButton: "Nhận tư vấn chiến dịch miễn phí",
  },
  {
    slug: "xay-kenh-tiktok",
    icon: <img src="/tiktok.png" alt="tiktok" />,
    color: "#fe2c55",
    heroImage: "https://images.unsplash.com/photo-1640615752747-7c99b61a5c69?w=800&h=500&fit=crop&auto=format",
    tags: ["TikTok Strategy", "Content Pillar", "Trend", "Chuyển đổi"],
    results: [
      { value: "50K+", label: "Follower thật sau 3 tháng" },
      { value: "5–15%", label: "Tỷ lệ tương tác (ER)" },
      { value: "3x", label: "Tăng lượt xem organic" },
      { value: "0đ", label: "Chi phí quảng cáo ban đầu" },
    ],
    eyebrow: "DỊCH VỤ TIKTOK",
    badge: "Dịch vụ được chọn nhiều nhất",
    title: "Xây kênh TikTok có định hướng",
    subtitle: "Không chỉ đăng cho có · View thật · Khách hàng thật",
    heroDesc:
      "Từ định hướng nội dung, kịch bản, quay dựng đến tối ưu chuyển đổi — HL MEDIA giúp kênh TikTok của bạn tăng view thật, ra khách hàng thật.",
    ctaPrimary: "Tư vấn định hướng kênh",
    ctaSecondary: "Xem mẫu kịch bản",
    painPoints: [
      "Đăng video đều nhưng không có trụ cột nội dung rõ ràng",
      "View cao nhưng không ra đơn, không tăng khách hàng thật",
      "Không biết format nào phù hợp với ngành hàng của mình",
      "Sợ vi phạm chính sách, bị giảm hiển thị hoặc khóa kênh",
    ],
    workItems: [
      { icon: "🗺️", title: "Định hướng kênh", desc: "Xác định trụ cột nội dung phù hợp ngành hàng và đối tượng mục tiêu rõ ràng." },
      { icon: "✍️", title: "Lên kịch bản video", desc: "Kịch bản theo trend, theo insight khách hàng và theo mục tiêu chuyển đổi cụ thể." },
      { icon: "🎬", title: "Quay dựng / Edit theo gói", desc: "Sản xuất video ngắn chuẩn định dạng TikTok, tối ưu hook 3 giây đầu." },
      { icon: "🔧", title: "Tối ưu nhận diện & chuyển đổi", desc: "Tối ưu caption, hashtag, thời gian đăng và CTA để dẫn về inbox hoặc Shopee." },
      { icon: "📊", title: "Theo dõi hiệu suất", desc: "Đo lường view, tương tác, tỷ lệ chuyển đổi sang inbox/đơn hàng và điều chỉnh liên tục." },
    ],
    process: [
      { step: "01", title: "Phân tích ngành hàng & xác định trụ cột nội dung", desc: "Nghiên cứu sản phẩm, đối thủ và xác định content pillar phù hợp nhất với kênh." },
      { step: "02", title: "Lên lịch đăng & kịch bản theo tuần/tháng", desc: "Lập content calendar chi tiết, viết kịch bản từng video theo format bán hàng/giáo dục/giải trí." },
      { step: "03", title: "Sản xuất, quay dựng, edit theo gói đã chọn", desc: "Quay hoặc hướng dẫn quay, dựng phim, thêm caption và âm nhạc phù hợp." },
      { step: "04", title: "Theo dõi số liệu & điều chỉnh format theo hiệu suất", desc: "Phân tích Analytics, xác định video hoạt động tốt và điều chỉnh format, thời điểm đăng." },
    ],
    faq: [
      { q: "Cần quay bao nhiêu video/tháng là đủ?", a: "Tùy mục tiêu và ngành hàng, HL MEDIA sẽ đề xuất tần suất đăng phù hợp để duy trì đà tăng trưởng — thường từ 8–16 video/tháng." },
      { q: "Có cần xuất hiện trên camera không?", a: "Không bắt buộc. Có thể xây kênh theo hướng voice-over, stock footage hoặc nhân vật đại diện tùy chiến lược ngành hàng." },
      { q: "Kênh mới hoàn toàn có làm được không?", a: "Có, HL MEDIA có quy trình riêng cho kênh mới để xây nền tảng nội dung trước khi đẩy mạnh quảng cáo. Nhiều kênh mới đạt 10K+ follower trong tháng đầu." },
    ],
    ctaHeading: "Biến TikTok thành kênh bán hàng thật, không chỉ là nơi đăng cho có",
    ctaButton: "Bắt đầu định hướng kênh ngay",
  },
  {
    slug: "cham-soc-fanpage",
    icon: <img src="/verify.png" alt="Fanpage" />,
    color: "#1877f2",
    heroImage: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop&auto=format",
    tags: ["Content Marketing", "Fanpage", "Thiết kế đồng bộ", "Seeding"],
    results: [
      { value: "+180%", label: "Tương tác trung bình" },
      { value: "3x", label: "Lượt reach organic" },
      { value: "15+", label: "Bài đăng/tháng" },
      { value: "100%", label: "Đúng lịch, đúng giờ" },
    ],
    eyebrow: "DỊCH VỤ FANPAGE",
    title: "Chăm sóc Fanpage chuyên nghiệp",
    subtitle: "Duy trì hình ảnh · Giữ tương tác đều · Đúng lịch đúng giờ",
    heroDesc:
      "Lên kế hoạch nội dung, viết bài chuẩn insight, thiết kế hình ảnh đồng bộ và đăng bài đúng giờ — giúp Fanpage của bạn luôn chuyên nghiệp trong mắt khách hàng.",
    ctaPrimary: "Nhận kế hoạch nội dung mẫu",
    ctaSecondary: "Xem gói chăm sóc",
    painPoints: [
      "Fanpage đăng bài không đều, thiếu định hướng nội dung rõ ràng",
      "Hình ảnh không đồng bộ, thiếu chuyên nghiệp với thương hiệu",
      "Không có thời gian trả lời inbox/comment kịp thời",
      "Không biết nội dung nào thực sự thu hút khách hàng mục tiêu",
    ],
    workItems: [
      { icon: "📅", title: "Lập kế hoạch nội dung tuần/tháng", desc: "Chủ đề bám sát ngành hàng và mùa vụ kinh doanh — gửi duyệt trước 3–5 ngày." },
      { icon: "✍️", title: "Viết bài chuẩn insight", desc: "Nội dung đúng tâm lý và nhu cầu khách hàng mục tiêu — không dùng template chung." },
      { icon: "🎨", title: "Thiết kế hình ảnh đồng bộ", desc: "Bộ nhận diện hình ảnh nhất quán theo thương hiệu — banner, ảnh sản phẩm, infographic." },
      { icon: "⏰", title: "Đăng bài đúng giờ vàng", desc: "Lên lịch và đăng tự động vào giờ có tỷ lệ tương tác cao nhất theo từng ngành." },
      { icon: "💬", title: "Seeding & phản hồi", desc: "Tăng tương tác tự nhiên, phản hồi inbox/comment kịp thời theo gói đã chọn." },
      { icon: "📊", title: "Báo cáo định kỳ", desc: "Theo dõi reach, tương tác, follower tăng — điều chỉnh hướng nội dung theo chu kỳ." },
    ],
    process: [
      { step: "01", title: "Khảo sát Fanpage hiện tại & xác định mục tiêu", desc: "Tìm hiểu sản phẩm, khách hàng mục tiêu, tone of voice và tình trạng kênh." },
      { step: "02", title: "Lên kế hoạch nội dung & chủ đề theo tháng", desc: "Lập content calendar: chủ đề, format, ngày đăng, CTA cho từng bài." },
      { step: "03", title: "Sản xuất bài viết, hình ảnh, lên lịch đăng", desc: "Viết caption, thiết kế hình ảnh, tạo video ngắn — gửi duyệt trước khi đăng." },
      { step: "04", title: "Theo dõi tương tác, báo cáo & điều chỉnh", desc: "Báo cáo định kỳ với số liệu thực tế và đề xuất hướng nội dung cho tháng tiếp theo." },
    ],
    faq: [
      { q: "Có viết bài theo ngành hàng đặc thù không?", a: "Có, nội dung được nghiên cứu riêng theo ngành hàng và insight khách hàng cụ thể — không dùng nội dung template chung." },
      { q: "Ai sẽ duyệt nội dung trước khi đăng?", a: "Khách hàng được duyệt nội dung trước khi lên lịch đăng để đảm bảo đúng định hướng thương hiệu." },
      { q: "Có hỗ trợ chạy quảng cáo cho bài viết không?", a: "Có thể kết hợp với dịch vụ Chạy quảng cáo đa nền tảng để tăng hiệu quả tiếp cận cho từng bài đăng." },
    ],
    ctaHeading: "Để Fanpage luôn chuyên nghiệp mà không tốn thời gian vận hành",
    ctaButton: "Đăng ký chăm sóc Fanpage",
  },
  {
    slug: "quay-dung-video-thiet-ke",
    icon: "🎬",
    color: "#7c3aed",
    heroImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop&auto=format",
    tags: ["Video Production", "TVC", "Motion Graphic", "Branding"],
    results: [
      { value: "3x", label: "Tăng thời gian xem video" },
      { value: "+85%", label: "Tỷ lệ giữ chân khách hàng" },
      { value: "48h", label: "Thời gian giao nhanh nhất" },
      { value: "100%", label: "Bản quyền thuộc khách hàng" },
    ],
    eyebrow: "DỊCH VỤ SẢN XUẤT NỘI DUNG",
    title: "Quay dựng video & thiết kế hình ảnh",
    subtitle: "Giúp thương hiệu nổi bật hơn · Đúng chuẩn nền tảng · Đúng mục tiêu",
    heroDesc:
      "Từ video bán hàng, TVC đến bộ nhận diện hình ảnh — HL MEDIA sản xuất nội dung sáng tạo, đúng chuẩn nền tảng và đúng mục tiêu chuyển đổi.",
    ctaPrimary: "Gửi yêu cầu sản xuất nội dung",
    ctaSecondary: "Xem ví dụ sản phẩm",
    painPoints: [
      "Hình ảnh, video tự làm thiếu chuyên nghiệp, không đồng bộ với thương hiệu",
      "Không có kịch bản rõ ràng trước khi quay, ra nội dung không đúng ý",
      "Nội dung không tối ưu theo định dạng từng nền tảng (Facebook, TikTok, Shopee)",
      "Thiếu bộ nhận diện thương hiệu nhất quán để khách hàng nhớ đến",
    ],
    workItems: [
      { icon: "✍️", title: "Lên kịch bản & concept", desc: "Kịch bản video bán hàng, video thương hiệu, TVC — duyệt kịch bản trước khi quay." },
      { icon: "🎥", title: "Quay dựng video", desc: "Sản xuất theo định dạng tối ưu cho từng nền tảng: TikTok, Facebook, Shopee, Website." },
      { icon: "✂️", title: "Edit & hậu kỳ", desc: "Dựng phim, chỉnh màu, thêm motion graphic, phụ đề và nhạc bản quyền." },
      { icon: "🖼️", title: "Thiết kế hình ảnh", desc: "Ảnh sản phẩm, banner, bộ nhận diện thương hiệu đồng bộ và chuyên nghiệp." },
      { icon: "📦", title: "Tối ưu định dạng đa nền tảng", desc: "Xuất file MP4/AI/PSD phù hợp Facebook, TikTok, Shopee, Website — sẵn sàng dùng ngay." },
    ],
    process: [
      { step: "01", title: "Tiếp nhận sản phẩm & thông điệp cần truyền tải", desc: "Lắng nghe mục tiêu, đối tượng và tham khảo phong cách để lên hướng sáng tạo." },
      { step: "02", title: "Lên kịch bản, concept hình ảnh/video", desc: "Viết script, storyboard và moodboard — xác nhận trước khi bước vào sản xuất." },
      { step: "03", title: "Quay dựng, thiết kế theo kịch bản đã duyệt", desc: "Quay tại địa điểm hoặc studio, thiết kế hình ảnh đồng bộ theo concept." },
      { step: "04", title: "Edit hậu kỳ, bàn giao file theo định dạng từng nền tảng", desc: "Dựng phim hoàn chỉnh, bàn giao file đầy đủ — hỗ trợ chỉnh sửa theo phản hồi." },
    ],
    faq: [
      { q: "Có cần chuẩn bị sản phẩm để quay không?", a: "Cần cung cấp sản phẩm hoặc hình ảnh tham khảo để đội ngũ lên kịch bản phù hợp nhất với đặc điểm sản phẩm." },
      { q: "Thời gian hoàn thành một video là bao lâu?", a: "Tùy độ phức tạp — video ngắn (TikTok/Reels) thường 2–3 ngày, video bán hàng 5–7 ngày kể từ khi duyệt kịch bản." },
      { q: "Có chỉnh sửa lại nếu chưa hài lòng không?", a: "Có quy trình duyệt và điều chỉnh theo từng giai đoạn trước khi bàn giao file cuối — đảm bảo đúng ý trước khi kết thúc." },
    ],
    ctaHeading: "Nội dung chuyên nghiệp là nền tảng để thương hiệu được nhớ đến",
    ctaButton: "Bắt đầu sản xuất nội dung",
  },
  {
    slug: "thiet-ke-website-app-shopee",
    icon: "🌐",
    color: "#0a2463",
    heroImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&auto=format",
    tags: ["Web Design", "Landing Page", "E-commerce", "Shopee", "SEO"],
    results: [
      { value: "+240%", label: "Tỷ lệ chuyển đổi tăng" },
      { value: "<2s", label: "Tốc độ tải trang" },
      { value: "Top 10", label: "Google trong 3 tháng" },
      { value: "99.9%", label: "Uptime đảm bảo" },
    ],
    eyebrow: "DỊCH VỤ WEBSITE & APP",
    title: "Thiết kế Website, App & gian hàng Shopee",
    subtitle: "Vận hành bán hàng 24/7 · Chuẩn SEO · Tối ưu chuyển đổi",
    heroDesc:
      "Giao diện hiện đại, chuẩn SEO, tối ưu hiển thị sản phẩm và tăng chuyển đổi — giúp bạn bán hàng chuyên nghiệp ngay cả khi không trực tiếp tư vấn khách.",
    ctaPrimary: "Nhận demo giao diện miễn phí",
    ctaSecondary: "Xem mẫu website",
    painPoints: [
      "Chưa có website/app riêng, phụ thuộc hoàn toàn vào sàn hoặc mạng xã hội",
      "Website cũ, giao diện lỗi thời, không chuẩn SEO và tải chậm",
      "Gian hàng Shopee chưa tối ưu hiển thị, tỷ lệ chuyển đổi còn thấp",
      "Không có ai vận hành kỹ thuật khi website gặp lỗi",
    ],
    workItems: [
      { icon: "🎨", title: "Thiết kế giao diện UI/UX", desc: "Giao diện hiện đại, tối ưu trải nghiệm người dùng trên cả mobile và desktop." },
      { icon: "🔍", title: "Chuẩn SEO On-page", desc: "Cấu trúc URL, meta tag, schema markup, sitemap — nền tảng vững để leo thang Google." },
      { icon: "🛒", title: "Tối ưu hiển thị sản phẩm", desc: "Sắp xếp danh mục, hình ảnh, mô tả theo chuẩn CRO để tăng tỷ lệ chuyển đổi." },
      { icon: "🛍️", title: "Thiết lập gian hàng Shopee", desc: "Tối ưu trang shop, mô tả sản phẩm, hình ảnh chuẩn sàn và setup Shopee Ads." },
      { icon: "🛠️", title: "Hỗ trợ vận hành", desc: "Bảo trì, cập nhật nội dung, xử lý lỗi kỹ thuật và hướng dẫn tự quản trị cơ bản." },
    ],
    process: [
      { step: "01", title: "Tiếp nhận yêu cầu, ngành hàng, mục tiêu kinh doanh", desc: "Phân tích mục tiêu, đối tượng và các tính năng cần có để xác định hướng phát triển." },
      { step: "02", title: "Lên wireframe & thiết kế giao diện", desc: "Thiết kế bố cục, giao diện trên Figma — gửi duyệt trước khi bước vào code." },
      { step: "03", title: "Phát triển, tích hợp tính năng, tối ưu SEO", desc: "Code frontend/backend, tích hợp thanh toán, CMS, form và các tính năng theo yêu cầu." },
      { step: "04", title: "Kiểm thử, bàn giao & hỗ trợ vận hành", desc: "Test tốc độ, responsive, cross-browser, SEO — bàn giao source code và hỗ trợ sau go-live." },
    ],
    faq: [
      { q: "Thời gian hoàn thành một website là bao lâu?", a: "Tùy độ phức tạp, thường từ 2–4 tuần kể từ khi duyệt giao diện. Landing page đơn giản có thể nhanh hơn trong 5–7 ngày." },
      { q: "Có hỗ trợ bảo trì sau khi bàn giao không?", a: "Có, HL MEDIA hỗ trợ bảo trì và cập nhật nội dung theo gói — đảm bảo website luôn hoạt động ổn định." },
      { q: "Website có tự quản lý được không?", a: "Có, được tích hợp CMS và hướng dẫn quản trị để khách hàng tự cập nhật nội dung cơ bản mà không cần biết code." },
    ],
    ctaHeading: "Có một website chuyên nghiệp là bước đầu để khách hàng tin tưởng bạn",
    ctaButton: "Nhận tư vấn thiết kế website",
  },
  {
    slug: "tich-xanh-bao-ve-kenh",
    icon: "🛡️",
    color: "#10b981",
    heroImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=500&fit=crop&auto=format",
    tags: ["Tích xanh TikTok", "Tích xanh Facebook", "Bảo vệ kênh", "Chính sách LIVE"],
    results: [
      { value: "95%", label: "Tỷ lệ tích xanh thành công" },
      { value: "72h", label: "Xử lý cảnh báo khẩn" },
      { value: "0", label: "Kênh bị khóa sau tư vấn" },
      { value: "100+", label: "Kênh được bảo vệ thành công" },
    ],
    eyebrow: "DỊCH VỤ UY TÍN & AN TOÀN NỀN TẢNG",
    title: "Tích xanh, bảo vệ kênh & tư vấn chính sách LIVE",
    subtitle: "Hoạt động bền vững · Tránh hạn chế · Tránh bị khóa",
    heroDesc:
      "Tư vấn hồ sơ uy tín, kiểm tra rủi ro vi phạm, xử lý cảnh báo và hướng dẫn livestream đúng chính sách — giúp kênh của bạn hoạt động bền vững, tránh bị hạn chế hoặc khóa.",
    ctaPrimary: "Kiểm tra rủi ro kênh miễn phí",
    ctaSecondary: "Tư vấn tích xanh",
    painPoints: [
      "Kênh bị cảnh báo, giảm hiển thị mà không rõ nguyên nhân",
      "Muốn đăng ký tích xanh nhưng không biết điều kiện và hồ sơ cần chuẩn bị",
      "Livestream bán hàng dễ vi phạm chính sách (phát lại, phóng đại công dụng...)",
      "Lo lắng kênh bị khóa vĩnh viễn khi đang phát triển tốt",
    ],
    workItems: [
      { icon: "✅", title: "Tư vấn hồ sơ tích xanh", desc: "Chuẩn bị và kiểm tra điều kiện đăng ký tích xanh TikTok/Facebook đúng quy trình." },
      { icon: "🔍", title: "Kiểm tra rủi ro vi phạm", desc: "Rà soát nội dung, hành vi tài khoản có khả năng vi phạm chính sách nền tảng." },
      { icon: "⚡", title: "Xử lý cảnh báo", desc: "Hỗ trợ phân tích nguyên nhân và xử lý khi kênh nhận cảnh báo hoặc bị hạn chế." },
      { icon: "📡", title: "Tư vấn chính sách LIVE", desc: "Hướng dẫn livestream đúng quy định — tránh phát lại, phóng đại, lộ thông tin cá nhân." },
      { icon: "👁️", title: "Theo dõi định kỳ", desc: "Giám sát tình trạng kênh thường xuyên để phát hiện và xử lý rủi ro sớm nhất." },
    ],
    process: [
      { step: "01", title: "Kiểm tra tình trạng kênh hiện tại", desc: "Đánh giá điểm vi phạm, điều kiện tích xanh, lịch sử nội dung và rủi ro tiềm ẩn." },
      { step: "02", title: "Đánh giá rủi ro & đề xuất hướng xử lý", desc: "Lên kế hoạch cụ thể: xóa nội dung vi phạm, appeal, hoặc chuẩn bị hồ sơ tích xanh." },
      { step: "03", title: "Hỗ trợ đăng ký tích xanh hoặc xử lý cảnh báo", desc: "Chuẩn bị đầy đủ giấy tờ, nộp đơn và theo dõi tiến trình phản hồi từ nền tảng." },
      { step: "04", title: "Tư vấn duy trì an toàn kênh dài hạn", desc: "Sau khi giải quyết, hướng dẫn cách vận hành kênh an toàn để không tái phạm." },
    ],
    faq: [
      { q: "Tích xanh có mất phí cố định không?", a: "Phí có thể thay đổi theo nền tảng và thời điểm, HL MEDIA sẽ tư vấn chi tiết theo từng trường hợp cụ thể." },
      { q: "Kênh đang bị hạn chế có cứu được không?", a: "Tùy mức độ vi phạm, HL MEDIA sẽ đánh giá cụ thể trước khi đề xuất hướng xử lý phù hợp nhất." },
      { q: "Có đào tạo riêng cho người livestream không?", a: "Có, hướng dẫn các lỗi thường gặp và cách livestream đúng chính sách nền tảng — giúp tránh cảnh báo không đáng có." },
    ],
    ctaHeading: "Đừng để một lỗi nhỏ làm mất kênh đã xây dựng lâu dài",
    ctaButton: "Kiểm tra rủi ro kênh ngay",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
