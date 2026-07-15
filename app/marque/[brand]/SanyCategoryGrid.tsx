"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateSanyName, SANY_CATEGORY_NAMES } from "@/data/sanyTranslations";

export interface CategoryCardData {
  categorySlug: string;
  categoryName: string;
  totalProducts: number;
  subCategoryCount: number;
  previewImage: string | null;
  isRemoteImage: boolean;
  href?: string;
}

interface Props {
  categories: CategoryCardData[];
  brandSlug: string;
  totalProducts: number;
}

export default function SanyCategoryGrid({ categories, brandSlug, totalProducts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const { t, language } = useLanguage();
  const s = t.sany;
  const catName = useCallback(
    (name: string) => translateSanyName(name, language, SANY_CATEGORY_NAMES),
    [language],
  );
  const allProductsLabel =
    language === "fr"
      ? "Tous les produits"
      : language === "es"
        ? "Todos los productos"
        : "All products";

  const filtered = useMemo(
    () =>
      query.trim()
        ? categories.filter((c) =>
            catName(c.categoryName).toLowerCase().includes(query.toLowerCase())
          )
        : categories,
    [categories, query, catName]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query.trim()) params.set("q", query);
    else params.delete("q");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [pathname, query, router]);

  return (
    <section className="bg-gray-50 px-6 py-20 pb-28" id="catalogue">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            {allProductsLabel}
          </h2>
          <div className="flex gap-3 items-center flex-wrap">
            <span className="text-sm text-gray-500 px-3.5 py-1.5 border border-gray-200 rounded-full bg-white whitespace-nowrap">
              {totalProducts} {s.products}
            </span>
            <span className="text-sm text-gray-500 px-3.5 py-1.5 border border-gray-200 rounded-full bg-white whitespace-nowrap">
              {categories.length} {s.categories}
            </span>
          </div>
        </div>

        {/* ── Search bar ── */}
        <div className="mb-14">
          <div className="relative flex items-center max-w-[520px] bg-white border border-gray-200 rounded-xl px-4 gap-3 focus-within:border-red-500 focus-within:shadow-[0_0_0_3px_rgba(220,38,38,0.08)] transition-all duration-200">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              className="flex-1 border-none outline-none py-3 text-sm text-gray-900 bg-transparent placeholder:text-gray-400"
              placeholder={s.searchCategoryPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={s.searchCategoryAriaLabel}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 hover:text-gray-900 border-none rounded-md w-6 h-6 cursor-pointer text-gray-500 shrink-0 transition-colors"
                aria-label={s.clearSearch}
              >
                <X size={14} />
              </button>
            )}
          </div>
          {query && (
            <p className="text-sm text-gray-400 mt-2">
              {filtered.length} {filtered.length !== 1 ? s.categoriesFound : s.categoryFound}
            </p>
          )}
        </div>

        {/* ── Grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((category, index) => (
              <Link
                key={category.categorySlug}
                href={category.href ?? `/marque/${brandSlug}/${category.categorySlug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col no-underline transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 hover:border-red-200"
              >
                {/* Image zone */}
                <div className="relative h-52 bg-white overflow-hidden shrink-0">
                  {category.previewImage ? (
                    <Image
                      src={category.previewImage}
                      alt={catName(category.categoryName)}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                      loading={index < 8 ? "eager" : "lazy"}
                      unoptimized={category.isRemoteImage}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 opacity-40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-xs text-gray-400">{s.noImage}</span>
                    </div>
                  )}

                  {/* Product count badge */}
                  <span className="absolute top-3 right-3 text-white bg-red-600/85 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full shadow-sm">
                    {category.totalProducts} {s.products}
                  </span>

                  {/* Red bottom accent — slides in on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>

                {/* Info panel */}
                <div className="p-5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {category.subCategoryCount > 0 && (
                      <span className="text-xs text-gray-400 block mb-1">
                        {category.subCategoryCount} {category.subCategoryCount > 1 ? s.seriesPlural : s.series}
                      </span>
                    )}
                    <h3 className="text-gray-900 font-semibold text-sm leading-snug truncate uppercase">
                      {catName(category.categoryName)}
                    </h3>
                  </div>
                  <span className="shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-200">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-base mb-5">
              {s.noCategoryFor} &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setQuery("")}
              className="text-red-600 bg-red-50 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 text-sm px-6 py-2.5 rounded-lg cursor-pointer"
            >
              {s.resetSearch}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
