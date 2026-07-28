export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  content: { heading?: string; body: string }[];
  readTime: string;
  date: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "8-tieu-chi-chien-dich-quang-cao-hieu-qua",
    category: "Facebook / TikTok Ads",
    categoryColor: "#1877f2",
    title: "8 tiêu chí giúp chiến dịch quảng cáo hiệu quả hơn",
    excerpt: "Hiểu đúng mục tiêu, tệp khách hàng, nội dung, ngân sách và chỉ số đo lường trước khi tăng tiền quảng cáo.",
    readTime: "7 phút đọc",
    date: "10 tháng 6, 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop&auto=format",
    tags: ["Facebook Ads", "TikTok Ads", "Tối ưu", "ROAS"],
    content: [
      { body: "Nhiều nhà bán hàng mắc phải một sai lầm phổ biến: tăng ngân sách quảng cáo mà không biết tại sao chiến dịch hiện tại chưa hiệu quả. Kết quả là tiêu thêm tiền nhưng kết quả không khá hơn. Bài viết này tổng hợp 8 tiêu chí cốt lõi giúp bạn đánh giá và cải thiện chiến dịch trước khi scale ngân sách." },
      { heading: "1. Mục tiêu chiến dịch phải rõ ràng", body: "Mỗi chiến dịch cần có 1 mục tiêu duy nhất: nhận diện thương hiệu, thu thập lead, tăng traffic website hay tăng đơn hàng trực tiếp. Chạy 1 chiến dịch phục vụ nhiều mục tiêu cùng lúc khiến thuật toán không biết tối ưu cho ai." },
      { heading: "2. Tệp đối tượng đúng và đủ lớn", body: "Tệp quá nhỏ (dưới 50.000 người) khiến quảng cáo dễ bão hòa và CPM tăng cao. Tệp quá rộng làm lãng phí ngân sách vào người không quan tâm. Điểm ngọt ngào thường là 200.000 – 2.000.000 người, tùy ngành." },
      { heading: "3. Creative (nội dung quảng cáo) đủ hấp dẫn", body: "70% thành công của quảng cáo phụ thuộc vào creative. Hook 3 giây đầu của video phải đủ mạnh để giữ người xem. Ảnh cần nổi bật trong newsfeed. Caption cần rõ lợi ích và có CTA rõ ràng." },
      { heading: "4. Landing page / điểm đến phù hợp", body: "Click vào quảng cáo nhưng landing page chậm, xấu, thiếu thông tin — tỷ lệ chuyển đổi sẽ rất thấp dù chi phí click rẻ. Đảm bảo tốc độ tải dưới 3 giây và nội dung khớp với quảng cáo." },
      { heading: "5. Chỉ số đo lường đúng (KPI)", body: "Đừng nhìn vào lượt reach hay like. Chỉ số quan trọng là: CPL (chi phí/lead), CPA (chi phí/hành động), ROAS (doanh thu/chi phí quảng cáo), CTR (tỷ lệ click) và tỷ lệ chuyển đổi." },
      { heading: "6. Thời gian chạy đủ để thuật toán học", body: "Facebook và TikTok cần ít nhất 50 sự kiện chuyển đổi để thoát khỏi giai đoạn học. Đừng chỉnh sửa chiến dịch trong 3–5 ngày đầu vì sẽ reset quá trình học." },
      { heading: "7. A/B test có hệ thống", body: "Test từng yếu tố riêng lẻ: audience vs audience, creative A vs creative B, text dài vs text ngắn. Mỗi lần chỉ thay đổi 1 biến để biết chính xác điều gì tạo ra sự khác biệt." },
      { heading: "8. Tần suất hiển thị (Frequency)", body: "Frequency > 3 trong 7 ngày là dấu hiệu bão hòa. Người dùng đã thấy quảng cáo quá nhiều lần và bắt đầu bỏ qua. Cần refresh creative hoặc mở rộng tệp." },
      { body: "Khi đã đánh giá đủ 8 tiêu chí trên, bạn sẽ biết chính xác nút thắt ở đâu — thay vì chỉ đoán mò và đổ thêm tiền. HL MEDIA luôn sẵn sàng audit chiến dịch miễn phí cho bạn." },
    ],
  },
  {
    id: 2,
    slug: "xay-kenh-tiktok-khong-bi-dang-cho-co",
    category: "TikTok Marketing",
    categoryColor: "#333",
    title: "Làm thế nào để xây kênh TikTok không bị \"đăng cho có\"?",
    excerpt: "Cần có trụ cột nội dung, lịch đăng, format video và mục tiêu chuyển đổi rõ ràng ngay từ đầu.",
    readTime: "9 phút đọc",
    date: "5 tháng 6, 2026",
    image: "https://images.unsplash.com/photo-1640615752747-7c99b61a5c69?w=1200&h=600&fit=crop&auto=format",
    tags: ["TikTok", "Content Strategy", "Xây kênh", "Viral"],
    content: [
      { body: "\"Đăng cho có\" là căn bệnh phổ biến của các kênh TikTok không tăng trưởng. Video đăng nhưng không có chiến lược, không có định hướng nội dung, không biết mình đang nói chuyện với ai — và kết quả là view thấp, follower không tăng, kênh dần chết yểu." },
      { heading: "Bước 1: Xác định Niche và đối tượng", body: "Kênh của bạn phục vụ ai? Người bán hàng thời trang? Chủ spa? Mẹ bầu? Càng hẹp niche, TikTok càng dễ phân phối đúng người. Một kênh bán thực phẩm chức năng không nên làm video về ẩm thực tổng hợp." },
      { heading: "Bước 2: Xây dựng Content Pillar (trụ cột nội dung)", body: "Mỗi kênh nên có 3–4 trụ cột nội dung. Ví dụ kênh spa: (1) Kiến thức làm đẹp, (2) Behind-the-scenes, (3) Review dịch vụ, (4) Khuyến mãi. Mỗi tuần phân bổ đủ các trụ cột để kênh đa dạng nhưng vẫn nhất quán." },
      { heading: "Bước 3: Tối ưu hook 3 giây đầu", body: "TikTok đo lường thời gian xem rất kỹ. 3 giây đầu quyết định người dùng có xem tiếp không. Hook hiệu quả thường bắt đầu bằng câu hỏi, tình huống gây tò mò, hoặc thông tin gây sốc nhẹ." },
      { heading: "Bước 4: Lịch đăng đều đặn", body: "TikTok không ưu tiên kênh đăng lúc này lúc kia. Đăng đều 1–2 video/ngày trong ít nhất 30 ngày đầu. Thống nhất giờ đăng và phân tích Analytics để biết giờ nào followers của bạn online nhiều nhất." },
      { heading: "Bước 5: Gắn mục tiêu chuyển đổi vào mọi video", body: "Mỗi video cần có 1 hành động mong muốn: follow kênh, click link bio, nhắn tin, vào TikTok Shop. Đừng làm video hay nhưng quên đặt CTA ở cuối — đó là tiền bạn bỏ lên bàn mà không nhặt." },
      { heading: "Bước 6: Phân tích và điều chỉnh", body: "Sau mỗi tuần xem TikTok Analytics: video nào có watch time cao? Nguồn traffic từ đâu? Demographic của người xem có đúng target không? Dựa vào đó để nhân rộng format đang hoạt động tốt." },
      { body: "Xây kênh TikTok đúng cách không cần may mắn hay viral — cần hệ thống. HL MEDIA đã giúp hàng chục kênh đi từ 0 lên 10K–100K follower thật với lộ trình có kiểm soát." },
    ],
  },
  {
    id: 3,
    slug: "loi-livestream-ban-hang-de-khien-kenh-bi-han-che",
    category: "Livestream",
    categoryColor: "#ff6b35",
    title: "Những lỗi livestream bán hàng dễ khiến kênh bị hạn chế",
    excerpt: "Tránh phát lại nội dung, phóng đại công dụng, lộ thông tin cá nhân và chuyển hướng người dùng sai chính sách.",
    readTime: "6 phút đọc",
    date: "29 tháng 5, 2026",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop&auto=format",
    tags: ["Livestream", "Chính sách TikTok", "Bán hàng", "Bảo vệ kênh"],
    content: [
      { body: "Livestream bán hàng trên TikTok và Facebook đang là xu hướng mạnh — nhưng đây cũng là nơi nhiều nhà bán hàng vô tình vi phạm chính sách và bị hạn chế live, thậm chí khóa kênh. Dưới đây là những lỗi phổ biến nhất cần tránh." },
      { heading: "Lỗi 1: Phát lại video đã quay (replaying pre-recorded content)", body: "Đây là vi phạm nghiêm trọng nhất. TikTok yêu cầu livestream phải là nội dung trực tiếp, không được phát video quay sẵn rồi giả vờ đang live. Hệ thống phát hiện tự động và sẽ cảnh báo hoặc khóa ngay." },
      { heading: "Lỗi 2: Phóng đại công dụng sản phẩm", body: "\"Chữa khỏi 100%\", \"đảm bảo hiệu quả\", \"không dùng sẽ hối hận\" — những câu như thế này vi phạm chính sách về quảng cáo sản phẩm sức khỏe và làm đẹp. Chỉ nên nói những gì sản phẩm thực sự làm được." },
      { heading: "Lỗi 3: Chuyển hướng người dùng ra ngoài nền tảng", body: "Trong live TikTok, không được nói \"Nhắn tin Zalo cho mình\" hay đọc số điện thoại để chuyển giao dịch ra ngoài. TikTok muốn giao dịch xảy ra trong TikTok Shop. Vi phạm điều này sẽ bị hạn chế live." },
      { heading: "Lỗi 4: Sử dụng nhạc có bản quyền", body: "Nhiều nhà bán hàng bật nhạc nền trong khi live mà không biết rằng TikTok có hệ thống nhận diện bản quyền âm nhạc. Dùng nhạc trong thư viện TikTok (TikTok Commercial Music Library) để an toàn tuyệt đối." },
      { heading: "Lỗi 5: Nội dung live quá nhàm, tỷ lệ rời bỏ cao", body: "TikTok đo lường chất lượng livestream qua tỷ lệ giữ chân người xem, tương tác và số người đồng thời. Live buồn tẻ, không tương tác sẽ bị giảm phân phối và có thể bị hạn chế thời gian live." },
      { heading: "Lỗi 6: Lộ thông tin cá nhân / thông tin nhạy cảm", body: "Đọc số CCCD, địa chỉ nhà, thông tin ngân hàng trong live — dù vô tình — cũng vi phạm chính sách bảo vệ thông tin cá nhân." },
      { heading: "Cách phòng tránh", body: "Trước mỗi phiên live: đọc lại checklist chính sách, kiểm tra kết nối internet ổn định, chuẩn bị script để không bị ngẫu hứng nói sai. HL MEDIA cung cấp dịch vụ tư vấn chính sách live và bảo vệ kênh — liên hệ để được hỗ trợ." },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
