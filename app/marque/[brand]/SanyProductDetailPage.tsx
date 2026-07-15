"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  translateSanyName,
  SANY_CATEGORY_NAMES,
  SANY_SUBCATEGORY_NAMES,
} from "@/data/sanyTranslations";
import SanyModelSelector, {
  type ProcessedModel,
} from "./SanyModelSelector";
import BackButton from "@/components/navigation/BackButton";

export interface RelatedSeriesData {
  subCategorySlug: string;
  subCategoryName: string;
  totalProducts: number;
  previewImage: string | null;
  isRemoteImage: boolean;
}

interface SanyProductDetailPageProps {
  brand: Brand;
  brandSlug: string;
  categorySlug: string;
  categoryName: string;
  subCategorySlug: string;
  subCategoryName: string;
  processedModels: ProcessedModel[];
  relatedSeries: RelatedSeriesData[];
}

export default function SanyProductDetailPage({
  brand,
  brandSlug,
  categorySlug,
  categoryName,
  subCategorySlug,
  subCategoryName,
  processedModels,
  relatedSeries,
}: SanyProductDetailPageProps) {
  const { t, language } = useLanguage();
  const s = t.sany;
  const tCat = (name: string) => translateSanyName(name, language, SANY_CATEGORY_NAMES);
  const tSub = (name: string) => translateSanyName(name, language, SANY_SUBCATEGORY_NAMES);
  const hideCategoryCrumb = subCategoryName === "Truck-mounted Concrete Pump";

  return (
    <div
      className="min-h-screen bg-white mt-20 lg:mt-14"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      {/* ── Breadcrumb ── */}
      <nav className="border-b border-gray-100 px-6 py-3" aria-label="Breadcrumb">
        <div className="max-w-[1400px] mx-auto flex items-center gap-1.5 flex-wrap text-sm text-gray-500">
          <Link href="/" className="hover:text-red-600 transition-colors no-underline">
            {t.productsDetails.home}
          </Link>
          <ChevronRight size={13} className="text-gray-300" />
          <Link href="/nos-marques" className="hover:text-red-600 transition-colors no-underline">
            {s.brands}
          </Link>
          <ChevronRight size={13} className="text-gray-300" />
          <Link href={`/marque/${brandSlug}`} className="hover:text-red-600 transition-colors no-underline">
            {brand.name.toUpperCase()}
          </Link>
          {!hideCategoryCrumb && (
            <>
              <ChevronRight size={13} className="text-gray-300" />
              <Link href={`/marque/${brandSlug}/${categorySlug}`} className="hover:text-red-600 transition-colors no-underline">
                {tCat(categoryName)}
              </Link>
            </>
          )}
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-gray-900 font-medium">{tSub(subCategoryName)}</span>
        </div>
      </nav>

      <div className="bg-gray-50">
        {/* ── Model selector card ── */}
        <div className="max-w-[1400px] mx-auto rounded-b-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] bg-white">
          <Suspense>
            <SanyModelSelector
              seriesName={tSub(subCategoryName)}
              models={processedModels}
            />
          </Suspense>
        </div>

        {/* ── Related series ── */}
        {relatedSeries.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 py-14">
            <p className="text-xs tracking-widest uppercase text-red-600 mb-2">
              {s.inSameCategory}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {s.similarSeries}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {relatedSeries.map((ser) => (
                <Link
                  key={ser.subCategorySlug}
                  href={`/marque/${brandSlug}/${categorySlug}/${ser.subCategorySlug}`}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col no-underline transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-red-200"
                >
                  <div className="relative h-40 bg-gray-50 overflow-hidden">
                    {ser.previewImage ? (
                      <Image
                        src={ser.previewImage}
                        alt={tSub(ser.subCategoryName)}
                        fill
                        unoptimized={ser.isRemoteImage}
                        sizes="(min-width:1280px) 25vw,(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                        className="object-contain p-2 transition-transform duration-400 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between gap-2 flex-1">
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        {tSub(ser.subCategoryName)}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wide">
                        {ser.totalProducts} {ser.totalProducts > 1 ? s.models : s.model}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-red-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Back link ── */}
        <div className="max-w-[1400px] mx-auto px-6 pb-8">
          <BackButton
            fallbackHref={
              hideCategoryCrumb
                ? `/marque/${brandSlug}/${categorySlug}/${subCategorySlug}`
                : `/marque/${brandSlug}/${categorySlug}`
            }
            className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-gray-400 hover:text-red-600 transition-colors no-underline"
          >
            <ArrowLeft size={12} />
            {s.backTo} {hideCategoryCrumb ? tSub(subCategoryName) : tCat(categoryName)}
          </BackButton>
        </div>
      </div>
    </div>
  );
}
