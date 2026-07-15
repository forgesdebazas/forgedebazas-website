"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { products } from "@/data/productsData";
import { sanyBestSellerSeriesProducts } from "@/data/sanySeriesProducts";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

const HOME_PRODUCTS_TOTAL = 20;
const HOME_PRODUCTS_PAGE_SIZE = 9;

export function ProductsSection() {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(HOME_PRODUCTS_PAGE_SIZE);

  // SANY best-sellers (series cards whose models include any best-seller reference)
  // alternated with Toyota forklifts, then padded with other brands if needed.
  const sanyBestSellers = sanyBestSellerSeriesProducts;
  const toyotaForklifts = products.filter(
    (product) =>
      product.brand === "TOYOTA" && product.category === "chariots-elevateurs",
  );
  const otherProducts = products.filter(
    (product) => product.brand !== "SANY" && product.brand !== "TOYOTA",
  );

  const featuredProducts: typeof products = [];
  for (
    let index = 0;
    featuredProducts.length < HOME_PRODUCTS_TOTAL &&
    (sanyBestSellers[index] || toyotaForklifts[index]);
    index += 1
  ) {
    const sany = sanyBestSellers[index];
    const toyota = toyotaForklifts[index];
    if (sany && featuredProducts.length < HOME_PRODUCTS_TOTAL) {
      featuredProducts.push(sany);
    }
    if (toyota && featuredProducts.length < HOME_PRODUCTS_TOTAL) {
      featuredProducts.push(toyota);
    }
  }
  for (const p of otherProducts) {
    if (featuredProducts.length >= HOME_PRODUCTS_TOTAL) break;
    featuredProducts.push(p);
  }

  const visibleProducts = featuredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < featuredProducts.length;

  return (
    <section className=" relative overflow-hidden ">
      <ScrollAnimation className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-20 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-2 ">
          <div className="max-w-3xl">
            {/* <h4 className="text-[#dc2626] font-bold tracking-wider uppercase mb-4 text-sm md:text-base">
              Nos Équipements
            </h4> */}
            <h3 className="font-black uppercase text-3xl text-gray-900 mb-4">
              {t.products.discoverTitle}
            </h3>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dc2626] to-[#dc2626]"></div>
              <div className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse"></div>
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent via-[#dc2626] to-[#dc2626]"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl ">
              {t.products.description}
            </p>
          </div>

          <Link href="/produits" className="hidden md:block">
            <Button
              variant="outline"
              className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 py-6 rounded-none text-base font-bold uppercase tracking-wide transition-all"
            >
              {t.products.viewCatalog}
            </Button>
          </Link>
        </div>

        {/* Products Grid / Swiper */}
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {visibleProducts.map((product, index) => {
            const title = getLocalizedText(product.title, language);
            const shortTitle = getLocalizedText(product.shortTitle, language);

            const specEntries = [
              product.specs.portee,
              product.specs.pression,
              product.specs.sortie,
            ]
              .map((s) => getLocalizedText(s, language))
              .filter((v) => v.trim() !== "");

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center"
              >
                {/* Image Container */}
                <div className="relative h-72 md:h-96 p-4 bg-white group-hover:bg-gray-50/50 transition-colors overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {product.category}
                  </div>
                  <Image
                    src={product.image}
                    alt={title}
                    fill
                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Brand Logo */}
                  <div className="mb-4 h-6 relative w-24">
                    <Image
                      src={
                        product.brand === "SANY"
                          ? "/images/logos/sany.png"
                          : product.brand === "TOYOTA"
                            ? "/images/logos/toyota.png"
                            : product.brand === "FABO"
                              ? "/images/logos/fabo.png"
                              : "/images/logos/ajax.png"
                      }
                      alt={product.brand}
                      fill
                      className="object-contain object-left"
                    />
                  </div>

                  <h3 className="text-md font-bold text-gray-900 mb-2 line-clamp-2 min-h-16">
                    {shortTitle}
                  </h3>

                  {/* Key Specs */}
                  <div className="space-y-3 mb-8 flex-1">
                    {specEntries.map((spec, specIdx) => (
                      <div
                        key={specIdx}
                        className="flex items-center border-b border-gray-100 pb-2"
                      >
                        <span className="font-semibold text-gray-900 text-sm">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Link href="/devis" className="flex-1">
                      <Button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-6 rounded-xl font-bold uppercase text-sm shadow-md hover:shadow-lg transition-all">
                        {t.products.quote}
                      </Button>
                    </Link>
                    <Link
                      href={product.sanySeriesLink ?? `/produits/${product.id}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-gray-200 hover:border-[#dc2626] hover:text-[#dc2626] py-6 rounded-xl font-bold uppercase text-sm transition-all group/btn"
                      >
                        {t.products.details}{" "}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voir plus / Load more */}
        {hasMore && (
          <div className="text-center mt-4 md:mt-8">
            <Button
              type="button"
              onClick={() =>
                setVisibleCount((current) =>
                  Math.min(current + HOME_PRODUCTS_PAGE_SIZE, featuredProducts.length)
                )
              }
              variant="outline"
              className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 py-6 rounded-none text-base font-bold uppercase tracking-wide transition-all"
            >
              {t.products.loadMore}
            </Button>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="text-center md:hidden mt-4">
          <Link href="/produits">
            <Button
              variant="outline"
              className="w-full border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 py-4 rounded-none text-base font-bold uppercase tracking-wide transition-all"
            >
              {t.products.viewCatalog}
            </Button>
          </Link>
        </div>
      </ScrollAnimation>
    </section>
  );
}

export default ProductsSection;
