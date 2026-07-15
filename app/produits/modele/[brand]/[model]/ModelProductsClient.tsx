"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { products } from "@/data/productsData";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface ModelProductsClientProps {
  brand: string;
  model: string;
}

export default function ModelProductsClient({
  brand,
  model,
}: ModelProductsClientProps) {
  const { language, t } = useLanguage();

  const decodedBrand = useMemo(() => decodeURIComponent(brand), [brand]);
  const decodedModel = useMemo(() => decodeURIComponent(model), [model]);

  const visibleKey = `forges.ui.model.${brand}.${model}.v1.visibleCount`;
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === "undefined") return 9;
    try {
      const raw = window.localStorage.getItem(visibleKey);
      const parsed = raw ? Number(raw) : NaN;
      return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 9;
    } catch {
      return 9;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(visibleKey, String(visibleCount));
    } catch {
      // ignore
    }
  }, [visibleCount, visibleKey]);

  const matches = products.filter((p) => {
    const brandMatches =
      p.brand.toLowerCase() === decodedBrand.toLowerCase() ||
      p.brand.toLowerCase() === decodedBrand.replaceAll("-", " ").toLowerCase();
    const modelMatches = (p.models || []).some((m) => m === decodedModel);
    return brandMatches && modelMatches;
  });

  const visibleProducts = matches.slice(0, visibleCount);
  const hasMore = matches.length > visibleCount;

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Breadcrumb — pins below the fixed site header on scroll */}
      <div
        className="sticky z-30 bg-gray-900/95 backdrop-blur-sm border-b border-white/10"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2.5">
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              {t.productsDetails.home}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link href="/produits" className="hover:text-white transition-colors">
              {t.productsDetails.products}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-[#dc2626] font-semibold line-clamp-1">
              {decodedBrand.toUpperCase()}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-gray-950 via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#dc2626] rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] bg-white rounded-full blur-3xl" />
        </div>

        <ScrollAnimation className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#dc2626]/15 border border-[#dc2626]/30 px-3 sm:px-4 py-1.5 rounded-full mb-4">
              {/* <Sparkles className="w-4 h-4 text-[#dc2626]" /> */}
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white">
                {t.productsDetails.available_models}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {decodedModel}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-3">
              {language === "fr"
                ? `Produits correspondant au modèle ${decodedModel} — marque ${decodedBrand.toUpperCase()}.`
                : language === "es"
                ? `Productos que coinciden con el modelo ${decodedModel} — marca ${decodedBrand.toUpperCase()}.`
                : `Products matching model ${decodedModel} — brand ${decodedBrand.toUpperCase()}.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white rounded-full px-4 py-2 text-sm font-bold">
                {matches.length}{" "}
                {matches.length === 1
                  ? t.products.foundResults
                  : t.products.foundResultsPlural}
              </span>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-bold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "fr"
                  ? "Retour au catalogue"
                  : language === "es"
                  ? "Volver al catálogo"
                  : "Back to catalog"}
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Grid */}
      <section className="py-10 sm:py-14">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {matches.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 text-center">
              <p className="text-gray-700 text-base sm:text-lg font-semibold">
                {language === "fr"
                  ? "Aucun produit trouvé pour ce modèle."
                  : language === "es"
                  ? "No se encontraron productos para este modelo."
                  : "No products found for this model."}
              </p>
              <p className="text-gray-600 mt-2">
                {language === "fr"
                  ? "Essayez via le catalogue complet."
                  : language === "es"
                  ? "Pruebe con el catálogo completo."
                  : "Try browsing the full catalog."}
              </p>
              <div className="mt-6">
                <Link
                  href="/produits"
                  className="inline-flex items-center gap-2 font-bold text-[#dc2626] hover:underline"
                >
                  {language === "fr"
                    ? "Voir le catalogue"
                    : language === "es"
                    ? "Ver el catálogo"
                    : "View catalog"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produits/${product.id}`}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-[#dc2626] hover:shadow-2xl transition-all overflow-hidden"
                  >
                    <div className="relative h-72 sm:h-80 bg-white overflow-hidden">
                      <Image
                        src={product.image}
                        alt={getLocalizedText(
                          product.shortTitle || product.title,
                          language
                        )}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                        unoptimized={product.brand === "SUNWARD"}
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-gray-900 border border-gray-100">
                        {product.brand}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-base font-extrabold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2">
                        {getLocalizedText(
                          product.shortTitle || product.title,
                          language
                        )}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                        {getLocalizedText(product.description, language)}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gray-800 group-hover:text-[#dc2626] transition-colors">
                        {t.actions.viewDetails}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    onClick={() => setVisibleCount((c) => c + 9)}
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-10 py-6 rounded-xl font-bold"
                  >
                    {t.products.loadMore}
                  </Button>
                </div>
              )}
            </>
          )}
        </ScrollAnimation>
      </section>
    </main>
  );
}

