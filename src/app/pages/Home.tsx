import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Stats } from "../components/Stats";
import { About } from "../components/About";
import { ValueProps } from "../components/ValueProps";
import { Pricing } from "../components/Pricing";
import { Courses } from "../components/Courses";
import { Blog } from "../components/Blog";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { useSEO, schemas } from "../hooks/useSEO";

const homeFaqs = [
  {
    q: "Bên mình mới bắt đầu bán online thì nên chọn dịch vụ nào?",
    a: "Nên bắt đầu bằng tư vấn chiến lược, xây nội dung nền tảng và chọn 1–2 kênh chính như Fanpage, TikTok hoặc Shopee để triển khai trước. HL MEDIA sẽ tư vấn gói phù hợp sau khi nắm được sản phẩm, mục tiêu, ngân sách và tình trạng kênh hiện tại.",
  },
  {
    q: "HL MEDIA có nhận chạy quảng cáo theo khu vực không?",
    a: "Có. HL MEDIA có thể triển khai quảng cáo theo khu vực, độ tuổi, sở thích, hành vi và mục tiêu cụ thể như inbox, nhận diện thương hiệu hoặc chuyển đổi mua hàng.",
  },
  {
    q: "Có hỗ trợ làm nội dung video không?",
    a: "Có. HL MEDIA hỗ trợ lên kịch bản, quay dựng, edit video ngắn, thiết kế hình ảnh và nội dung bán hàng theo từng ngành hàng cụ thể.",
  },
  {
    q: "Có đào tạo để tự chạy Ads không?",
    a: 'Có. Khóa học Facebook & TikTok Ads thực chiến giúp học viên hiểu cách setup, đọc chỉ số và tối ưu chiến dịch cơ bản — không còn lo "đốt tiền" vô ích.',
  },
];

export default function Home() {
  useSEO({
    title: "HL Media - Giải pháp truyền thông & tăng trưởng doanh số đa nền tảng",
    description:
      "HL MEDIA cung cấp dịch vụ chạy quảng cáo Facebook, TikTok, Shopee, xây kênh TikTok, chăm sóc Fanpage, thiết kế website và đào tạo marketing cho doanh nghiệp Việt.",
    jsonLd: [
      schemas.organization(),
      schemas.website(),
      schemas.faqPage(homeFaqs),
      schemas.breadcrumb([{ name: "Trang chủ", url: "/" }]),
    ],
  });

  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <About />
      <ValueProps />
      <Pricing />
      <Courses />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
