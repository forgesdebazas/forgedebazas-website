import HeroSection from "@/components/home/HeroSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import ProductsSection from "@/components/home/ProductsSection";
import AboutSection from "@/components/home/AboutSection";
import dynamic from "next/dynamic";

const PartnerLogos = dynamic(() => import("@/components/home/PartnerLogos"));
const KeyFiguresSection = dynamic(
  () => import("@/components/home/KeyFiguresSection")
);
const RentalSection = dynamic(() => import("@/components/home/RentalSection"));
const ProjectsGrid = dynamic(() => import("@/components/home/ProjectsGrid"));
const CommitmentSection = dynamic(
  () => import("@/components/home/CommitmentSection")
);
const NewsSection = dynamic(() => import("@/components/home/NewsSection"));

import Image from "next/image";
import { brands } from "@/data/brands";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { toBrandSlug } from "@/lib/slug";
import { client } from "@/sanity/lib/client";
import { GET_LATEST_ACTUALITES_QUERY } from "@/sanity/lib/queries";
import type { NewsSectionArticle } from "@/components/home/NewsSection";

// Re-fetch on every request so newly published articles appear immediately.
export const revalidate = 0;

export const metadata = buildMetadata({
  title: "Accueil",
  description:
    "Bienvenue chez Forges de Bazas, votre partenaire de confiance pour les équipements industriels, BTP, manutention et levage au Maroc. Distributeur SANY et TOYOTA.",
  path: "/",
});

export default async function Home() {
  let latestArticles: NewsSectionArticle[] = [];
  try {
    latestArticles = await client.fetch<NewsSectionArticle[]>(
      GET_LATEST_ACTUALITES_QUERY,
    );
  } catch {
    // Sanity unavailable / unconfigured — render the section empty rather than failing the page
  }
  return (
    <div className="w-full">
      <HeroSection />
      <div
        style={{
          background:
            "linear-gradient(135deg, #f5f5f5 25%, transparent 25%, transparent 50%, #f5f5f5 50%, #f5f5f5 75%, transparent 75%, transparent)",
          backgroundSize: "40px 40px",
          backgroundColor: "#fafafa",
        }}
      >
        <SolutionsSection />
        <ProductsSection />
        <PartnerLogos isPrincipaleBrands={false} />
      </div>
      <AboutSection />
      <KeyFiguresSection />
      <div
        style={{
          background:
            "linear-gradient(135deg, #f5f5f5 25%, transparent 25%, transparent 50%, #f5f5f5 50%, #f5f5f5 75%, transparent 75%, transparent)",
          backgroundSize: "40px 40px",
          backgroundColor: "#fafafa",
        }}
      >
        <RentalSection />
        <ProjectsGrid />
        <CommitmentSection />
        <NewsSection articles={latestArticles} />
        <div className="bg-gray-100/30">
          <div className="flex items-center justify-center gap-4">
            {brands.slice(0, 2).map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={`/marque/${toBrandSlug(brand.name)}`}
                className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image
                  key={brand.name}
                  src={brand.image}
                  alt={brand.name}
                  width={160}
                  height={160}
                  className="object-contain sm:w-[200px] md:w-[250px] lg:w-[300px]"
                  loading="lazy"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                />
              </Link>
            ))}
          </div>
          <PartnerLogos isPrincipaleBrands={true} />
        </div>
      </div>
    </div>
  );
}
