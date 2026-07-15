"use client";

import { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  FABO_CATALOG,
  getFaboCatalogTotals,
  getProductCountForCategory,
} from "@/lib/faboCatalog";
import { toBrandSlug } from "@/lib/slug";
import BrandHeroSection from "./BrandHeroSection";

interface Props { brand: Brand }

export default function FaboBrandPage({ brand }: Props) {
  const { language, t } = useLanguage();
  const { totalProducts } = getFaboCatalogTotals();
  const brandSlug = toBrandSlug(brand.name);

  const n = (item: { nameFr: string; nameEn: string; nameEs: string }) =>
    language === "fr" ? item.nameFr : language === "es" ? item.nameEs : item.nameEn;

  const crushingCats = FABO_CATALOG.filter((c) => c.sectionFr === "Équipement de Concassage");
  const concreteCats = FABO_CATALOG.filter((c) => c.sectionFr === "Centrale à Béton");

  return (
    <main
      style={{
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "var(--site-header-height, 140px)",
      }}
    >

      {/* ═══ HERO ════════════════════════════════════════════════════════ */}
      <BrandHeroSection
        brand={brand}
        productCount={totalProducts}
        categoryCount={FABO_CATALOG.length}
      />

      {/* ═══ SECTION 1 — CONCASSAGE ══════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 rounded-full bg-red-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-1">
                {language === "fr" ? "Équipement de Concassage" : language === "es" ? "Equipos de Trituración" : "Crushing Equipment"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                {/* <Layers className="w-6 h-6 text-red-600" /> */}
                {language === "fr" ? "Concassage" : language === "es" ? "Trituración" : "Crushing"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {crushingCats.map((cat) => {
              const count = getProductCountForCategory(cat);
              return (
                <Link
                  key={cat.slug}
                  href={`/marque/${brandSlug}/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md block"
                  style={{ minHeight: 300 }}
                >
                  <Image
                    src={cat.image}
                    alt={n(cat)}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  {/* Red top accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="absolute bottom-0 left-0 right-0 px-6 py-6 flex items-end justify-between">
                    <div>
                      <h3 className="text-white text-xl font-bold leading-tight mb-2 uppercase">{n(cat)}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
                          {count} {language === "fr" ? "produits" : language === "es" ? "productos" : "products"}
                        </span>
                        <span className="text-white/60 text-xs">
                          {cat.subcategories.length}{" "}
                          {language === "fr" ? "sous-catégories" : language === "es" ? "subcategorías" : "subcategories"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — CENTRALE À BÉTON ═══════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 rounded-full bg-red-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 mb-1">
                {language === "fr" ? "Centrale à Béton" : language === "es" ? "Plantas de Hormigón" : "Concrete Plants"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                {/* <Factory className="w-6 h-6 text-red-600" /> */}
                {language === "fr" ? "Centrale à Béton" : language === "es" ? "Plantas de Hormigón" : "Concrete Batching Plants"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {concreteCats.map((cat) => {
              const count = getProductCountForCategory(cat);
              return (
                <Link
                  key={cat.slug}
                  href={`/marque/${brandSlug}/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md block"
                  style={{ minHeight: 300 }}
                >
                  <Image
                    src={cat.image}
                    alt={n(cat)}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="absolute bottom-0 left-0 right-0 px-6 py-6 flex items-end justify-between">
                    <div>
                      <h3 className="text-white text-xl font-bold leading-tight mb-2 uppercase">{n(cat)}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
                          {count} {language === "fr" ? "produits" : language === "es" ? "productos" : "products"}
                        </span>
                        <span className="text-white/60 text-xs">
                          {cat.subcategories.length}{" "}
                          {language === "fr" ? "sous-catégories" : language === "es" ? "subcategorías" : "subcategories"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══════════════════════════════════════════════════ */}
      <section className="relative bg-gray-900 overflow-hidden">
        {/* Red left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        {/* Subtle red glow */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-red-600/10 to-transparent pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Left — text */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-1.5">FABO</p>
              <h2 className="text-xl font-bold text-white mb-1">{t.productsDetails.interested}</h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">{t.productsDetails.interested_desc}</p>
            </div>
            {/* Right — buttons */}
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-600/20"
              >
                {t.productsDetails.request_quote}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                {t.productsDetails.contact_us}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
