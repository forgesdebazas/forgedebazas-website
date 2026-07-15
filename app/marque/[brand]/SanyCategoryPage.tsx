"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, FileText, Sparkles } from "lucide-react";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  translateSanyName,
  translateSanySpecValue,
  SANY_CATEGORY_NAMES,
  SANY_SUBCATEGORY_NAMES,
  SANY_RANGE_LABELS,
  SANY_SPEC_NAMES,
} from "@/data/sanyTranslations";
import { SANY_BEST_SELLER_REFS } from "@/data/sanyBestSellers";

export interface SeriesCardData {
  subCategorySlug: string;
  subCategoryName: string;
  /** Optional range label appended to the title, e.g. "5.5 - 7.5T" */
  seriesRangeLabel?: string;
  totalProducts: number;
  previewImage: string | null;
  isRemoteImage: boolean;
  previewSpecs: { name: string; valueWithUnit: string }[];
  /** Optional PDF brochure URL surfaced on the series row */
  brochureUrl?: string;
  /** Show the series as a single aggregate model row (no variant listing) */
  displayAsAggregate?: boolean;
  /** Show as a product-family category row, linking through to its model page. */
  displayAsCategory?: boolean;
  /**
   * Per-series category slug override used when a series belongs to a
   * different parent category than the page being viewed (e.g. Truck Mixer
   * surfaced under Concrete Machinery).
   */
  categorySlugOverride?: string;
  products: Array<{ modelId: number; name: string | null; reference: string }>;
}

export interface FlatProductData {
  modelId: number;
  fullName: string;
  name: string | null;
  reference: string;
  image: string | null;
}

interface SanyCategoryPageProps {
  brand: Brand;
  brandSlug: string;
  categorySlug: string;
  categoryName: string;
  totalProducts: number;
  series: SeriesCardData[];
  flatProducts: FlatProductData[];
  /**
   * Optional override for the category segment used when linking to subcategories.
   * Defaults to `categorySlug`. Used for virtual (promoted) categories whose
   * subcategory pages still live under the real parent category route.
   */
  subRouteCategorySlug?: string;
}

export default function SanyCategoryPage({
  brand,
  brandSlug,
  categorySlug,
  categoryName,
  totalProducts,
  series,
  flatProducts,
  subRouteCategorySlug,
}: SanyCategoryPageProps) {
  const linkCategorySlug = subRouteCategorySlug ?? categorySlug;
  const { t, language } = useLanguage();
  const s = t.sany;
  const tCat = (name: string) => translateSanyName(name, language, SANY_CATEGORY_NAMES);
  const tSub = (name: string) => translateSanyName(name, language, SANY_SUBCATEGORY_NAMES);
  const tSpec = (name: string) => translateSanyName(name, language, SANY_SPEC_NAMES);
  const tValue = (value: string) => translateSanySpecValue(value, language);
  const getSeriesTitle = (ser: SeriesCardData) => {
    if (ser.subCategorySlug === "off-highway-mining-truck" && ser.seriesRangeLabel) {
      return translateSanyName(ser.seriesRangeLabel, language, SANY_RANGE_LABELS);
    }

    const base = tSub(ser.subCategoryName);
    if (!ser.seriesRangeLabel || ser.displayAsAggregate) return base;

    const range = translateSanyName(ser.seriesRangeLabel, language, SANY_RANGE_LABELS);
    return language === "fr" ? `${base} de ${range}` : `${base} ${range}`;
  };

  return (
    <div
      className="min-h-screen mt-14"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Breadcrumb — pins below the fixed site header on scroll */}
      <nav
        className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-2.5"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-1 sm:gap-1.5 flex-wrap text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600 transition-colors no-underline">
            {t.productsDetails.home}
          </Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          <Link href="/nos-marques" className="hover:text-red-600 transition-colors no-underline">
            {s.brands}
          </Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          <Link
            href={`/marque/${brandSlug}`}
            className="hover:text-red-600 transition-colors no-underline font-medium text-red-600 sm:text-gray-500 sm:font-normal sm:hover:text-red-600"
          >
            {brand.name.toUpperCase()}
          </Link>
          <ChevronRight size={12} className="text-gray-300 shrink-0" />
          <span className="text-gray-900 font-medium">{tCat(categoryName)}</span>
        </div>
      </nav>

      {/* Category heading */}
      <div className="border-b border-gray-100 px-4 sm:px-6 py-5 sm:py-8">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {tCat(categoryName)}
          </h1>
          <p className="text-sm text-gray-500">
            {totalProducts} {totalProducts > 1 ? s.models : s.model}
            {series.length > 0 && ` · ${series.length} ${series.length > 1 ? s.seriesPlural : s.series}`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        {series.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {series.map((ser) => {
              const seriesIsBestSeller = ser.products.some((p) =>
                SANY_BEST_SELLER_REFS.has(p.reference),
              );
              const seriesLinkCat = ser.categorySlugOverride ?? linkCategorySlug;
              const seriesBaseHref = `/marque/${brandSlug}/${seriesLinkCat}/${ser.subCategorySlug}`;
              const seriesHref = ser.seriesRangeLabel
                ? `${seriesBaseHref}?series=${encodeURIComponent(ser.seriesRangeLabel)}`
                : seriesBaseHref;
              const modelHref = (model: string) => {
                const params = new URLSearchParams();
                if (ser.seriesRangeLabel) params.set("series", ser.seriesRangeLabel);
                params.set("model", model);
                return `${seriesBaseHref}?${params.toString()}`;
              };
              return (
              <div key={`${ser.subCategorySlug}-${ser.seriesRangeLabel ?? ""}`} className="py-6 sm:py-8">
                {/* Series title — clickable */}
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                  <Link
                    href={seriesHref}
                    className="group inline-flex items-center gap-1.5 no-underline"
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {getSeriesTitle(ser)}
                    </h2>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 group-hover:text-red-600 transition-colors shrink-0"
                    />
                  </Link>
                  {/* {seriesIsBestSeller && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 leading-none">
                      <Sparkles size={11} />
                      {s.bestSeller}
                    </span>
                  )}
                  {ser.brochureUrl && (
                    <a
                      href={ser.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-red-600 text-xs font-semibold rounded-full transition-all no-underline"
                    >
                      <FileText size={12} />
                      {s.brochurePdf}
                    </a>
                  )} */}
                </div>

                {/* Row: image left | specs + models right */}
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 items-start">
                  {/* Thumbnail */}
                  <Link
                    href={seriesHref}
                    className="no-underline w-full sm:w-auto sm:shrink-0"
                  >
                    <div className="relative w-full sm:w-[360px] lg:w-[400px] h-[240px] sm:h-[250px] bg-gray-50 rounded-xl overflow-hidden">
                      {ser.previewImage ? (
                        <Image
                          src={ser.previewImage}
                          alt={tSub(ser.subCategoryName)}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 360px, 400px"
                          unoptimized={ser.isRemoteImage}
                          className="object-contain p-1 hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                          {s.noImage}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Right column: specs then model names */}
                  <div className="flex-1 min-w-0">
                    {/* Specs — hidden when the series is rendered as a single aggregate */}
                    {!ser.displayAsAggregate && ser.previewSpecs.length > 0 && (
                      <div className="space-y-2 mb-4 sm:mb-5">
                        {ser.previewSpecs.map((spec) => (
                          <p key={spec.name} className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{tSpec(spec.name)}:</span>{" "}
                            {tValue(spec.valueWithUnit)}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Model reference names */}
                    <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                      {ser.displayAsCategory ? (
                        <Link
                          href={`/marque/${brandSlug}/${seriesLinkCat}/${ser.subCategorySlug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 no-underline transition-colors"
                        >
                          {s.seeAllModels}
                          <ChevronRight size={14} />
                        </Link>
                      ) : ser.displayAsAggregate ? (
                        <Link
                          href={modelHref(ser.seriesRangeLabel ?? ser.products[0]?.reference ?? "")}
                          className="inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-red-600"
                        >
                          <span className="text-gray-800 font-semibold">
                            {ser.seriesRangeLabel ?? tSub(ser.subCategoryName)}
                          </span>
                          {seriesIsBestSeller && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 leading-none">
                              {s.bestSeller}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <>
                          {ser.products.slice(0, 16).map((product) => {
                            const ref = product.reference;
                            const label = product.name || ref;
                            const bs = SANY_BEST_SELLER_REFS.has(ref);
                            return (
                              <Link
                                key={product.modelId}
                                href={modelHref(ref)}
                                className="inline-flex items-center gap-1 text-sm no-underline transition-colors hover:text-red-600"
                              >
                                <span className={bs ? "text-gray-800 font-semibold" : "text-gray-400"}>
                                  {label}
                                </span>
                                {bs && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 leading-none">
                                    {s.bestSeller}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                          {ser.products.length > 16 && (
                            <span className="text-sm text-gray-400">
                              +{ser.products.length - 16} {s.others}
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    {/* Mobile CTA */}
                    {!ser.displayAsCategory && (
                      <Link
                        href={seriesHref}
                        className="sm:hidden mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 no-underline"
                      >
                        {s.seeAllModels}
                        <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : flatProducts.length > 0 ? (
          /* No subcategories — flat product grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 py-6">
            {flatProducts.map((product) => (
              <article
                key={product.modelId}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-36 sm:h-44 bg-white">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.fullName}
                      fill
                      className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-3 sm:p-4 border-t border-gray-100">
                  <p className="font-semibold text-xs sm:text-sm text-gray-900 leading-snug">
                    {product.name}
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{product.reference}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-16">
            {s.noProductsInCategory}
          </p>
        )}

        {/* Back to SANY categories */}
        <div className="mt-2 mb-10">
          <Link
            href={`/marque/${brandSlug}`}
            className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-gray-400 hover:text-red-600 transition-colors no-underline"
          >
            <ArrowLeft size={12} />
            {s.backTo} {s.allCategories}
          </Link>
        </div>
      </div>
    </div>
  );
}
