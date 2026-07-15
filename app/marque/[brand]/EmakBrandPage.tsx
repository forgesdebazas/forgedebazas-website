"use client";

import { products } from "@/data/productsData";
import { Brand } from "@/data/brands";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ChevronRight, FileText, ArrowRight, Phone } from "lucide-react";
import CtaSection from "@/components/ui/CtaSection";
import BrandHeroSection from "./BrandHeroSection";

interface Props {
  brand: Brand;
}

export default function EmakBrandPage({ brand }: Props) {
  const { language, t } = useLanguage();

  const emakProducts = useMemo(
    () => products.filter((p) => p.brand === "E-MAK"),
    []
  );

  const moreInfoLabel =
    language === "fr"
      ? "Plus d'information"
      : language === "es"
        ? "Más información"
        : "More information";

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      <BrandHeroSection
        brand={brand}
        productCount={emakProducts.length}
        categoryCount={1}
        hideLogoCard={false}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Section title */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-10 bg-[#dc2626] rounded-full" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Centrale d&apos;enrobage
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {emakProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produits/${product.id}`}
                className="group block rounded-none overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                {/* Product Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-200">
                  <Image
                    src={product.image}
                    alt={getLocalizedText(product.title, language)}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Info bar */}
                <div className="flex items-center justify-between px-4 py-4 bg-gray-100 border-t border-gray-200">
                  <div className="min-w-0 pr-3">
                    <p className="font-bold text-gray-900 text-base leading-tight truncate">
                      {getLocalizedText(
                        product.shortTitle || product.title,
                        language
                      ).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{moreInfoLabel}</p>
                  </div>
                  <div className="w-10 h-10 border-2 border-gray-900 group-hover:bg-[#dc2626] group-hover:border-[#dc2626] flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={t.productsDetails.interested}
        description={t.productsDetails.interested_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />
    </main>
  );
}
