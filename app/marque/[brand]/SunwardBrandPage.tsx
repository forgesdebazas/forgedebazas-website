"use client";

import { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  ArrowRight,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Button } from "@/components/ui/button";
import CtaSection from "@/components/ui/CtaSection";
import BrandHeroSection from "./BrandHeroSection";
import catalogData from "@/data/sunward_mining_products.json";
import type { SunwardCatalogData, SunwardProductNode } from "@/lib/sunwardCatalog";
import {
  getSunwardCategoryName,
  getSunwardProductName,
} from "@/data/sunwardTranslations";

interface SunwardBrandPageProps {
  brand: Brand;
  brandSlug: string;
}

const catalog = catalogData as unknown as SunwardCatalogData;

export default function SunwardBrandPage({ brand, brandSlug }: SunwardBrandPageProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(() => {
    const value = Number(searchParams.get("limit"));
    return Number.isFinite(value) && value >= 12 ? value : 12;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") ?? "all"
  );

  const allProducts = useMemo(() => {
    const products: (SunwardProductNode & { _categorySlug: string })[] = [];
    for (const cat of catalog.categories) {
      for (const p of cat.products) {
        products.push({ ...p, _categorySlug: cat.categorySlug });
      }
    }
    return products;
  }, []);

  type CategoryFilter = {
    id: string;
    label: string;
  };

  const categoryFilters = useMemo((): CategoryFilter[] => {
    const baseLabel =
      language === "fr"
        ? "Toutes les catégories"
        : language === "es"
          ? "Todas las categorías"
          : "All categories";

    const base: CategoryFilter[] = [{ id: "all", label: baseLabel }];

    const catFilters = catalog.categories.map((cat) => ({
      id: cat.categorySlug,
      label: getSunwardCategoryName(cat.categorySlug, language),
    }));

    return [...base, ...catFilters];
  }, [language]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter((p) => p._categorySlug === selectedCategory);
  }, [allProducts, selectedCategory]);

  const categoryCount = catalog.categories.length;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedCategory === "all") params.delete("category");
    else params.set("category", selectedCategory);
    if (visibleCount === 12) params.delete("limit");
    else params.set("limit", String(visibleCount));
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [pathname, router, selectedCategory, visibleCount]);

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      <BrandHeroSection
        brand={brand}
        productCount={filteredProducts.length}
        categoryCount={categoryCount}
      />

      {/* Products Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "fr"
                ? `Équipements ${brand.name}`
                : language === "es"
                  ? `Equipos ${brand.name}`
                  : `${brand.name} Equipment`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "fr"
                ? `Parcourez notre sélection de ${filteredProducts.length} produits ${brand.name} disponibles.`
                : language === "es"
                  ? `Explore nuestra selección de ${filteredProducts.length} productos ${brand.name} disponibles.`
                  : `Browse our selection of ${filteredProducts.length} ${brand.name} products available.`}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              {categoryFilters.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(filter.id);
                        setVisibleCount(12);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                        selectedCategory === filter.id
                          ? "bg-[#dc2626] text-white border-[#dc2626] shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.slice(0, visibleCount).map((product) => {
                  const image = product.primaryImage || product.imageSourceUrls[0] || null;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative h-56 sm:h-64 overflow-hidden bg-white flex-shrink-0">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                            <Package className="w-16 h-16 text-gray-300" />
                          </div>
                        )}
                        {/* Brand badge */}
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                          <span className="text-[11px] font-bold text-gray-900 tracking-wide">
                            SUNWARD
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-2 mb-1.5 text-base leading-snug uppercase">
                          {product.reference}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {getSunwardProductName(product.reference, product._categorySlug, language)}
                        </p>

                        {/* Specs pills — max 2 */}
                        <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
                          {product.technicalSpecifications.slice(0, 2).map((spec) => (
                            <span
                              key={spec.name}
                              className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full"
                            >
                              {spec.value}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto flex gap-2">
                          <Link
                            href={`/marque/${brandSlug}/${product._categorySlug}/${product.reference.toLowerCase()}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white font-bold text-xs px-3 py-2.5 rounded-lg transition-all duration-200"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                            {language === "fr" ? "Voir détails" : language === "es" ? "Ver detalles" : "View details"}
                          </Link>
                          <Link
                            href="/devis"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs px-3 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            {t.productsDetails.request_quote}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {filteredProducts.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setVisibleCount(visibleCount + 9)}
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-3 rounded-lg font-semibold text-lg"
                  >
                    {t.products.loadMore}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-md">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.products.noProducts}
              </h3>
              <p className="text-gray-600 mb-8">
                {t.products.tryModifyFilters}
              </p>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-8 py-4 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.products.pageTitle}
              </Link>
            </div>
          )}
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.productsDetails.interested}
        description={t.productsDetails.interested_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />

      {/* Back to Products */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#dc2626] font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t.solutions.viewAllProducts}
          </Link>
        </div>
      </section>
    </main>
  );
}
