import { MetadataRoute } from "next";
import { products } from "@/data/productsData";
import { brands } from "@/data/brands";
import { parseFrenchDate, siteConfig } from "@/lib/seo";
import { toBrandSlug } from "@/lib/slug";
import { client } from "@/sanity/lib/client";
import { GET_ALL_ACTUALITES_QUERY } from "@/sanity/lib/queries";
import { NewsArticle } from "./actualites/ActualitesClient";

const solutions = [
  { id: "manutention" },
  { id: "rayonnage" },
  { id: "solutions-automatisees" },
  { id: "levage" },
  { id: "terrassement" },
  { id: "mines" },
  { id: "transport" },
  { id: "energie" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  
  // Fetch Sanity news articles
  const newsArticles: NewsArticle[] = await client.fetch(GET_ALL_ACTUALITES_QUERY);

  // Static routes
  const staticRoutes = [
    "",
    "/apropos",
    "/contact",
    "/devis",
    "/produits",
    "/nos-marques",
    "/sav",
    "/solutions",
    "/actualites",
    "/location",
    "/politique-confidentialite",
    "/mentions-legales",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic solution routes
  const solutionRoutes = solutions.map((s) => ({
    url: `${baseUrl}/solutions/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic product routes
  const productRoutes = products.filter((p) => p.available !== false).map((p) => ({
    url: `${baseUrl}/produits/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic brand routes
  const brandRoutes = brands.map((b) => ({
    url: `${baseUrl}/marque/${toBrandSlug(b.name)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic news routes
  const newsRoutes = newsArticles.map((n) => ({
    url: `${baseUrl}/actualites/${n.id}`,
    lastModified: parseFrenchDate(n.date) ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...solutionRoutes,
    ...productRoutes,
    ...brandRoutes,
    ...newsRoutes,
  ];
}
