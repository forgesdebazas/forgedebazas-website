"use client";

import { Brand } from "@/data/brands";
import {
  FaboCategory,
  getProductCountForCategory,
  getFaboModelCountForSubcategory,
} from "@/lib/faboCatalog";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";
import { toBrandSlug } from "@/lib/slug";

interface Props {
  brand: Brand;
  category: FaboCategory;
}

export default function FaboCategoryPage({ brand, category }: Props) {
  const { language, t } = useLanguage();
  const brandSlug = toBrandSlug(brand.name);

  const n = (item: { nameFr: string; nameEn: string; nameEs: string }) =>
    language === "fr" ? item.nameFr : language === "es" ? item.nameEs : item.nameEn;

  const totalProducts = getProductCountForCategory(category);

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "var(--site-header-height, 140px)",
      }}
    >

      {/* ═══ BREADCRUMB ══════════════════════════════════════════════════ */}
      <div>
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
              <span className="text-red-600 font-semibold">{n(category)}</span>
            </nav>
          </div>
        </div>

        {/* ─── Hero ─── */}
        <div className="bg-gray-900 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">

              {/* Left — title block */}
              <div>
                {category.sectionFr && (
                  <span className="inline-block mb-3 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-widest">
                    {language === "fr" ? category.sectionFr : language === "es" ? category.sectionEs : category.sectionEn}
                  </span>
                )}
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">{n(category)}</h1>
                <p className="text-white/60 text-base max-w-xl leading-relaxed">
                  {language === "fr" ? category.descriptionFr : language === "es" ? category.descriptionEs : category.descriptionEn}
                </p>
              </div>

              {/* Right — stat chips */}
              <div className="flex gap-4 shrink-0">
                <div className="text-center px-6 py-4 rounded-2xl bg-white/5 border border-white/10 min-w-[90px]">
                  <div className="text-3xl font-bold text-white">{totalProducts}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest mt-1">
                    {language === "fr" ? "Produits" : language === "es" ? "Productos" : "Products"}
                  </div>
                </div>
                <div className="text-center px-6 py-4 rounded-2xl bg-red-600/15 border border-red-600/40 min-w-[90px]">
                  <div className="text-3xl font-bold text-red-400">{category.subcategories.length}</div>
                  <div className="text-xs text-red-400/60 uppercase tracking-widest mt-1">
                    {language === "fr" ? "Séries" : language === "es" ? "Series" : "Series"}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ═══ SUBCATEGORY GRID ════════════════════════════════════════════ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.subcategories.map((sub) => {
              const modelCount = getFaboModelCountForSubcategory(sub);
              const href = `/marque/${brandSlug}/${category.slug}/${sub.slug}`;

              return (
                <Link
                  key={sub.slug}
                  href={href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 hover:border-red-200"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {sub.image ? (
                      <Image
                        src={sub.image}
                        alt={n(sub)}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-bold">
                        FABO
                      </div>
                    )}
                    {/* Count badge */}
                    <div className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white shadow">
                      {modelCount}
                    </div>
                    {/* Red bottom line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  {/* Card footer */}
                  <div className="px-5 py-4 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 leading-snug group-hover:text-red-600 transition-colors duration-200">
                        {n(sub)}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {modelCount}{" "}
                        {language === "fr" ? "modèles" : language === "es" ? "modelos" : "models"}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-red-50 group-hover:bg-red-600 transition-colors duration-200">
                      <ArrowRight className="w-4 h-4 text-red-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">{t.productsDetails.interested_desc}</p>
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
                href={`/marque/${brandSlug}`}
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                ← FABO
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
