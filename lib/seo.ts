import type { Metadata } from "next";

export const siteConfig = {
  name: "Forges de Bazas",
  shortName: "FORGES",
  url: "https://forgesdebazas.com",
  description:
    "Spécialiste des équipements industriels et BTP au Maroc. Solutions de manutention, levage, terrassement et construction.",
  locale: "fr_FR",
  ogImage: "/images/home/home1.jpg",
  logo: "/images/logo-black.png",
  themeColor: "#dc2626",
};

export const defaultKeywords = [
  "BTP Maroc",
  "Équipements industriels",
  "Manutention",
  "Levage",
  "SANY Maroc",
  "TOYOTA Forklift Maroc",
  "Forges de Bazas",
];

export const absoluteUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
};

const resolveUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return siteConfig.url;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return absoluteUrl(pathOrUrl);
};

export const withSiteTitle = (title: string) => {
  if (!title) return siteConfig.shortName;
  const normalized = title.toLowerCase();
  if (normalized.includes("forges")) {
    return title;
  }
  return `${title} | ${siteConfig.shortName}`;
};

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  openGraphType?: "website" | "article" | "product";
  noIndex?: boolean;
}

export const buildMetadata = ({
  title,
  description,
  path,
  image,
  keywords,
  openGraphType = "website",
  noIndex,
}: BuildMetadataOptions): Metadata => {
  const canonical = path ? (path.startsWith("/") ? path : `/${path}`) : undefined;
  const url = canonical ? absoluteUrl(canonical) : siteConfig.url;
  const ogImage = resolveUrl(image ?? siteConfig.ogImage);
  const resolvedOpenGraphType =
    openGraphType === "product" ? "website" : openGraphType;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: withSiteTitle(title),
      description,
      url,
      siteName: siteConfig.name,
      type: resolvedOpenGraphType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: withSiteTitle(title),
      description,
      images: [ogImage],
    },
  };

  if (noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
};

export const getBaseMetadata = (): Metadata => {
  const base: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.shortName} - Équipements Industriels et BTP au Maroc`,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    keywords: defaultKeywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.shortName} - Équipements Industriels et BTP au Maroc`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.shortName} - Équipements Industriels et BTP au Maroc`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/icon512_rounded.png",
    },
    manifest: "/manifest.webmanifest",
    themeColor: siteConfig.themeColor,
  };

  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  if (googleVerification) {
    base.verification = { google: googleVerification };
  }

  return base;
};

const monthMap: Record<string, number> = {
  janvier: 0,
  fevrier: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  aout: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  decembre: 11,
};

const normalizeMonth = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const parseFrenchDate = (value: string) => {
  if (!value) return null;
  const parts = value.trim().split(/\s+/);
  if (parts.length < 3) return null;
  const day = Number(parts[0]);
  const month = monthMap[normalizeMonth(parts[1])];
  const year = Number(parts[2]);
  if (!day || month === undefined || !year) return null;
  return new Date(Date.UTC(year, month, day));
};

export const getOrganizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl(siteConfig.logo),
});

export const getWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo),
    },
  },
});

export interface ArticleJsonLdInput {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author?: string;
  date: string;
}

export const getArticleJsonLd = (article: ArticleJsonLdInput) => {
  const published = parseFrenchDate(article.date);
  const image = resolveUrl(article.image);
  const authorName = article.author || siteConfig.name;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [image],
    datePublished: published ? published.toISOString() : undefined,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/actualites/${article.id}`),
    },
  };
};

export interface ProductJsonLdInput {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
}

export const getProductJsonLd = (product: ProductJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: [resolveUrl(product.image)],
  sku: product.id,
  brand: {
    "@type": "Brand",
    name: product.brand,
  },
  url: absoluteUrl(`/produits/${product.id}`),
});
