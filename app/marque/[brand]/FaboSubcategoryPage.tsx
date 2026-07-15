"use client";

import { Brand } from "@/data/brands";
import {
  FaboCategory,
  FaboSubcategory,
  getFaboModelCountForProduct,
  getFaboModelCountForSubcategory,
  getProductsForSubcategory,
  getProductSlug,
} from "@/lib/faboCatalog";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { toBrandSlug } from "@/lib/slug";

interface Props {
  brand: Brand;
  category: FaboCategory;
  subcategory: FaboSubcategory;
}

export default function FaboSubcategoryPage({ brand, category, subcategory }: Props) {
  const { language, t } = useLanguage();
  const brandSlug = toBrandSlug(brand.name);
  const products = getProductsForSubcategory(subcategory);
  const modelCount = getFaboModelCountForSubcategory(subcategory);

  const n = (item: { nameFr: string; nameEn: string; nameEs: string }) =>
    language === "fr" ? item.nameFr : language === "es" ? item.nameEs : item.nameEn;

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "var(--site-header-height, 140px)",
      }}
    >

      {/* ═══ BREADCRUMB + HEADER ════════════════════════════════════════ */}
      <div>

        {/* Breadcrumb — pins below the fixed site header on scroll */}
        <div
          className="sticky z-30 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200"
          style={{ top: "var(--site-header-height, 140px)" }}
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
              <Link href="/" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                <Home className="w-3.5 h-3.5" />
                {t.productsDetails.home}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href="/produits" className="hover:text-red-600 transition-colors">
                {t.productsDetails.products}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href={`/marque/${brandSlug}`} className="hover:text-red-600 transition-colors">
                FABO
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href={`/marque/${brandSlug}/${category.slug}`} className="hover:text-red-600 transition-colors">
                {n(category)}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="text-red-600 font-semibold">{n(subcategory)}</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero ─── */}
        <div className="bg-gray-900 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              {/* Left */}
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-red-500 mb-2">
                  {n(category)}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">{n(subcategory)}</h1>
              </div>

              {/* Right — count chip */}
              <div className="shrink-0 text-center px-8 py-5 rounded-2xl bg-white/5 border border-white/10 min-w-[110px]">
                <div className="text-4xl font-bold text-white">{modelCount}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">
                  {language === "fr" ? "Modèles" : language === "es" ? "Modelos" : "Models"}
                </div>
              </div>

            </div>
          </div>

          {/* Sibling tabs */}
          {category.subcategories.length > 1 && (
            <div className="border-t border-white/10 overflow-x-auto">
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex">
                  {category.subcategories.map((sib) => {
                    const isActive = sib.slug === subcategory.slug;
                    return (
                      <Link
                        key={sib.slug}
                        href={`/marque/${brandSlug}/${category.slug}/${sib.slug}`}
                        className="shrink-0 px-5 py-3.5 text-xs font-bold border-b-2 transition-all duration-200 whitespace-nowrap"
                        style={{
                          borderBottomColor: isActive ? "#dc2626" : "transparent",
                          color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {n(sib)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ PRODUCT GRID ═══════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => {
                const title = getLocalizedText(product.title, language);
                const productSlug = getProductSlug(product.id);
                const href = `/marque/${brandSlug}/${category.slug}/${subcategory.slug}/${productSlug}`;
                const productModelCount = getFaboModelCountForProduct(product);

                return (
                  <Link
                    key={product.id}
                    href={href}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 hover:border-red-200"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-50" style={{ height: 220 }}>
                      <Image
                        src={product.image}
                        alt={title}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      {productModelCount > 1 && (
                        <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow">
                          {productModelCount}
                        </div>
                      )}
                      {/* Red line on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-4 border-t border-gray-100">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                          {title}
                        </h3>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 group-hover:bg-red-600 flex items-center justify-center transition-colors duration-200">
                          <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors duration-200" />
                        </div>
                      </div>
                      {product.variants && product.variants.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {product.variants.slice(0, 6).map((variant) => (
                            <span
                              key={variant.slug}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600"
                            >
                              {getLocalizedText(variant.title, language).split(" ")[0]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              {language === "fr" ? "Aucun produit disponible." : language === "es" ? "No hay productos." : "No products available."}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA STRIP ════════════════════════════════════════════════════ */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-red-600/10 to-transparent pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">FABO</p>
              <h2 className="text-xl font-bold text-white mb-1">{t.productsDetails.interested}</h2>
              <p className="text-white/50 text-sm">
                {products.length}{" "}
                {language === "fr" ? "produits disponibles dans cette série" : language === "es" ? "productos disponibles en esta serie" : "products available in this series"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-600/20"
              >
                {t.productsDetails.request_quote}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/marque/${brandSlug}/${category.slug}`}
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                ← {n(category)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
