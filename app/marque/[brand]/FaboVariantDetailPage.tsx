"use client";

import { Brand } from "@/data/brands";
import { FaboCategory, FaboSubcategory, getProductSlug } from "@/lib/faboCatalog";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  Phone,
  ArrowRight,
  FileText,
} from "lucide-react";
import { toBrandSlug } from "@/lib/slug";
import { translateFaboSpecText } from "@/lib/faboText";
import type { Product, ProductVariant } from "@/lib/types";

interface Props {
  brand: Brand;
  category: FaboCategory;
  subcategory: FaboSubcategory;
  series: Product;
  variant: ProductVariant;
}

export default function FaboVariantDetailPage({
  brand,
  category,
  subcategory,
  series,
  variant,
}: Props) {
  const { language, t } = useLanguage();
  const brandSlug = toBrandSlug(brand.name);
  const seriesSlug = getProductSlug(series.id);

  const n = (item: { nameFr: string; nameEn: string; nameEs: string }) =>
    language === "fr" ? item.nameFr : language === "es" ? item.nameEs : item.nameEn;

  const seriesTitle = getLocalizedText(series.title, language);
  const title = getLocalizedText(variant.title, language);
  const description = getLocalizedText(variant.description, language);

  const specRows = (variant.specs ?? [])
    .map((m) => {
      const idx = m.indexOf(":");
      if (idx < 0) return { key: m, val: "" };
      return {
        key: translateFaboSpecText(m.slice(0, idx).trim(), language),
        val: translateFaboSpecText(m.slice(idx + 1).trim(), language),
      };
    })
    .filter((r) => r.key && r.val);

  return (
    <main
      className="min-h-screen"
      style={{
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "var(--site-header-height, 140px)",
      }}
    >
      {/* ═══ BREADCRUMB + HERO ══════════════════════════════════════════ */}
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
              <Link href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}`} className="hover:text-red-600 transition-colors">
                {n(subcategory)}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link
                href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}/${seriesSlug}`}
                className="hover:text-red-600 transition-colors truncate max-w-32"
              >
                {seriesTitle}
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="text-red-600 font-semibold truncate max-w-40">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gray-900 border-b-4 border-red-600">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-red-500 mb-2">
                  {seriesTitle}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">{title}</h1>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {t.productsDetails.request_quote}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}/${seriesSlug}`}
                  className="inline-flex items-center justify-center gap-2 font-semibold text-xs px-6 py-2.5 rounded-lg border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  ← {seriesTitle}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Image */}
            <div>
              <div
                className="rounded-2xl overflow-hidden mb-3 relative border border-gray-100 shadow-sm"
                style={{ background: "#f8f8f8", aspectRatio: "4/3" }}
              >
                <Image
                  src={variant.image}
                  alt={title}
                  fill
                  unoptimized
                  className="object-contain p-6"
                />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 rounded-br-2xl pointer-events-none" />
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight">{title}</h1>

              {description && !description.includes("Équipement FABO") && !description.includes("FABO Equipment") && (
                <p className="text-sm text-gray-500 mb-6 leading-relaxed border-l-2 border-red-600 pl-4">
                  {description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/devis"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {t.productsDetails.request_quote}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-7 py-3 rounded-lg border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {t.productsDetails.contact_us}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNICAL SPECS ═══════════════════════════════════════════ */}
      {specRows.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 rounded-full bg-red-600" />
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  {language === "fr"
                    ? "Caractéristiques Techniques"
                    : language === "es"
                      ? "Características Técnicas"
                      : "Technical Specifications"}
                </h2>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-red-400 w-[50%]">
                      {language === "fr" ? "Paramètre" : language === "es" ? "Parámetro" : "Parameter"}
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-white/50 w-[50%]">
                      {language === "fr" ? "Valeur" : language === "es" ? "Valor" : "Value"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 font-semibold text-xs text-gray-700 border-b border-gray-100">
                        {row.key}
                      </td>
                      <td className="px-5 py-3 text-xs font-bold text-gray-900 border-b border-gray-100">
                        {row.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

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
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-600/20"
              >
                {t.productsDetails.request_quote}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/marque/${brandSlug}/${category.slug}/${subcategory.slug}/${seriesSlug}`}
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors"
              >
                ← {seriesTitle}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
