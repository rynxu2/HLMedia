import { useParams, Navigate } from "react-router";
import { getServiceBySlug } from "../../data/services";
import { AdsPage } from "./layouts/AdsPage";
import { TikTokPage } from "./layouts/TikTokPage";
import { FanpagePage } from "./layouts/FanpagePage";
import { VideoPage } from "./layouts/VideoPage";
import { WebsitePage } from "./layouts/WebsitePage";
import { ShieldPage } from "./layouts/ShieldPage";
import { useSEO, schemas } from "../../hooks/useSEO";

const PAGE_MAP: Record<string, React.ComponentType<{ service: NonNullable<ReturnType<typeof getServiceBySlug>> }>> = {
  "quang-cao-da-nen-tang": AdsPage,
  "xay-kenh-tiktok": TikTokPage,
  "cham-soc-fanpage": FanpagePage,
  "quay-dung-video-thiet-ke": VideoPage,
  "thiet-ke-website-app-shopee": WebsitePage,
  "tich-xanh-bao-ve-kenh": ShieldPage,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug ?? "");

  if (!service) return <Navigate to="/" replace />;

  const Page = PAGE_MAP[slug ?? ""] ?? AdsPage;

  useSEO({
    title: service.title,
    description: service.heroDesc,
    jsonLd: [
      schemas.service({ title: service.title, heroDesc: service.heroDesc, slug: service.slug }),
      schemas.faqPage(service.faq),
      schemas.breadcrumb([
        { name: "Trang chủ", url: "/" },
        { name: "Dịch vụ", url: "/#services" },
        { name: service.title, url: `/dich-vu/${service.slug}` },
      ]),
    ],
  });

  return <Page service={service} />;
}
