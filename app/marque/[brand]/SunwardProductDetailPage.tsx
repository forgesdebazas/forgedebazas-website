"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  Package,
} from "lucide-react";
import type { SunwardProductNode, SunwardCategoryNode } from "@/lib/sunwardCatalog";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";
import type { Brand } from "@/data/brands";
import {
  getSunwardProductName,
  translateSunwardGroup,
  translateSunwardSpec,
} from "@/data/sunwardTranslations";

interface Props {
  brand: Brand;
  category: SunwardCategoryNode;
  product: SunwardProductNode;
  brandSlug: string;
}

export default function SunwardProductDetailPage({
  brand,
  category,
  product,
  brandSlug,
}: Props) {
  const { language, t } = useLanguage();

  const primaryImage = product.primaryImage ?? product.imageSourceUrls[0] ?? null;

  const relatedProducts = category.products
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const specsLabel =
    language === "fr"
      ? "Spécifications techniques"
      : language === "es"
        ? "Especificaciones técnicas"
        : "Technical Specifications";

  const featuresLabel =
    language === "fr"
      ? "Caractéristiques"
      : language === "es"
        ? "Características"
        : "Features";

  const relatedLabel =
    language === "fr"
      ? "Produits similaires"
      : language === "es"
        ? "Productos similares"
        : "Similar products";

  const backLabel =
    language === "fr"
      ? "Retour aux produits SUNWARD"
      : language === "es"
        ? "Volver a productos SUNWARD"
        : "Back to SUNWARD products";

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >

      {/* ── Breadcrumb — pins below the fixed site header on scroll ── */}
      <nav
        className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-2.5"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ol className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#dc2626] transition-colors">
                {t.productsDetails.home}
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <li>
              <Link href="/nos-marques" className="hover:text-[#dc2626] transition-colors">
                Marques
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <li>
              <Link href={`/marque/${brandSlug}`} className="hover:text-[#dc2626] transition-colors">
                {brand.name.toUpperCase()}
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <li className="font-semibold text-gray-700">{product.reference}</li>
          </ol>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[440px]">

            {/* Left — product info */}
            <div className="flex flex-col justify-center py-12 lg:py-16 lg:pr-12">

              {/* Reference */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-3">
                {product.reference}
              </h1>

              {/* Full name */}
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                {getSunwardProductName(product.reference, category.categorySlug, language)}
              </p>

              {/* Key spec pills (first 3 flat specs) */}
              {product.technicalSpecifications.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.technicalSpecifications.slice(0, 3).map((spec) => (
                    <span
                      key={spec.name}
                      className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      <span className="text-gray-400">{translateSunwardSpec(spec.name, language)} :</span>
                      <span className="font-semibold">{spec.value}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Action */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  {t.productsDetails.request_quote}
                </Link>
                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm px-6 py-3 rounded-xl border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    {language === "fr"
                      ? "Voir la brochure"
                      : language === "es"
                        ? "Ver el folleto"
                        : "View brochure"}
                  </a>
                )}
              </div>
            </div>

            {/* Right — product image */}
            <div className="relative flex items-center justify-center py-10 lg:py-0">
              <div className="relative w-full max-w-md aspect-square">
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={product.reference}
                    fill
                    unoptimized
                    className="object-contain drop-shadow-xl"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-32 h-32 text-gray-200" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ── */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">

          {/* Specs */}
          {((product.specificationGroups && product.specificationGroups.length > 0) ||
            product.technicalSpecifications.length > 0) && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                {specsLabel}
                <span className="flex-1 h-px bg-gray-200" />
              </h2>

              {product.specificationGroups && product.specificationGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {product.specificationGroups.map((group) => (
                    <div
                      key={group.groupName}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                    >
                      <div className="bg-gray-900 px-5 py-3">
                        <span className="text-[11px] font-bold text-white uppercase tracking-[0.12em]">
                          {translateSunwardGroup(group.groupName, language)}
                        </span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {group.specs.map((spec, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between px-5 py-2.5 ${
                              i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                            }`}
                          >
                            <span className="text-xs text-gray-400 pr-3 leading-tight">
                              {translateSunwardSpec(spec.name, language)}
                            </span>
                            <span className="text-xs font-semibold text-gray-900 text-right shrink-0">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 max-w-2xl">
                  <div className="divide-y divide-gray-50">
                    {product.technicalSpecifications.map((spec, i) => (
                      <div
                        key={spec.name}
                        className={`flex items-center justify-between px-5 py-3 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                        }`}
                      >
                        <span className="text-xs text-gray-400">{translateSunwardSpec(spec.name, language)}</span>
                        <span className="text-xs font-semibold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          {product.features.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                {featuresLabel}
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                {relatedLabel}
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {relatedProducts.map((p) => {
                  const img = p.primaryImage ?? p.imageSourceUrls[0] ?? null;
                  return (
                    <Link
                      key={p.id}
                      href={`/marque/${brandSlug}/${category.categorySlug}/${p.reference.toLowerCase()}`}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      {/* Image */}
                      <div className="relative h-32 bg-gray-50">
                        {img ? (
                          <Image
                            src={img}
                            alt={p.reference}
                            fill
                            unoptimized
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package className="w-10 h-10 text-gray-200" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="px-3 py-2.5">
                        <div className="font-bold text-gray-900 text-sm">{p.reference}</div>
                        <div className="text-[11px] text-gray-400 line-clamp-2 mt-0.5 leading-snug">
                          {getSunwardProductName(p.reference, category.categorySlug, language)}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="pt-2">
            <Link
              href={`/marque/${brandSlug}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#dc2626] font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              {backLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection
        title={t.productsDetails.interested}
        description={t.productsDetails.interested_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />
    </main>
  );
}
