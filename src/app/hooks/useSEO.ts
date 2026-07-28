import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  ogLocale?: string;
  twitterCard?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SITE_NAME = "HL MEDIA";
const SITE_URL = "https://hlmedia.vn";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Custom SEO hook for managing document head meta tags.
 * Handles title, meta description, Open Graph, Twitter Cards,
 * canonical URL, and JSON-LD structured data.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  ogLocale = "vi_VN",
  twitterCard = "summary_large_image",
  jsonLd,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = `${title} | ${SITE_NAME}`;

    // Helper to create or update a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Meta description
    setMeta("name", "description", description);

    // Robots
    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.setAttribute("content", "index, follow");
    }

    // Canonical
    const canonicalUrl = canonical || `${SITE_URL}${window.location.pathname}`;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:locale", ogLocale);
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter Card
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // JSON-LD Structured Data
    // Remove previous JSON-LD injected by this hook
    document.querySelectorAll('script[data-seo-hook="true"]').forEach((el) => el.remove());

    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-hook", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup
    return () => {
      document.querySelectorAll('script[data-seo-hook="true"]').forEach((el) => el.remove());
    };
  }, [title, description, canonical, ogType, ogImage, ogLocale, twitterCard, jsonLd, noindex]);
}

/** Pre-built JSON-LD schemas */
export const schemas = {
  organization: (): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HL MEDIA",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Giải pháp truyền thông & tăng trưởng doanh số đa nền tảng dành cho cá nhân, nhà bán hàng và doanh nghiệp.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-868-367-567",
      contactType: "customer service",
      availableLanguage: "Vietnamese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Số 44, khu đất mới, xã Tây Phương",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    sameAs: [],
  }),

  website: (): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }),

  localBusiness: (): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HL MEDIA",
    url: SITE_URL,
    telephone: "+84-868-367-567",
    email: "hlmedia1804@gmail.com",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Số 44, khu đất mới, xã Tây Phương",
        addressLocality: "Hà Nội",
        addressCountry: "VN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "KĐT Lacasta, Văn Phú, Hà Đông",
        addressLocality: "Hà Nội",
        addressCountry: "VN",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    priceRange: "$$",
  }),

  faqPage: (faqs: { q: string; a: string }[]): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  }),

  article: (post: {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    slug: string;
  }): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }),

  breadcrumb: (
    items: { name: string; url: string }[]
  ): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }),

  course: (course: {
    title: string;
    desc: string;
    img: string;
  }): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.desc,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: course.img,
  }),

  service: (service: {
    title: string;
    heroDesc: string;
    slug: string;
  }): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDesc,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/dich-vu/${service.slug}`,
  }),
};
