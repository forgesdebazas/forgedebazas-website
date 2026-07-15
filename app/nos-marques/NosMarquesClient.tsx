"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { brands } from "@/data/productsData";
import { toBrandSlug } from "@/lib/slug";
import { getLocalizedText } from "@/lib/types";
import type { Language } from "@/data/translations";
import CtaSection from "@/components/ui/CtaSection";

type BrandInfo = (typeof brands)[number];

const getFallbackDescription = (brandName: string, language: Language) => {
  if (language === "en") {
    return `Discover ${brandName} equipment tailored to demanding projects.`;
  }
  if (language === "es") {
    return `Descubra los equipos ${brandName} pensados para proyectos exigentes.`;
  }
  return `Découvrez les équipements ${brandName} conçus pour les projets exigeants.`;
};

const getBrandDescription = (brand: BrandInfo, language: Language) => {
  if (brand.description) {
    const localized = getLocalizedText(brand.description, language);
    if (localized.trim()) {
      return localized;
    }
  }
  return getFallbackDescription(brand.name, language);
};

export default function NosMarquesClient() {
  const { t, language } = useLanguage();

  return (
    <div
      className="bg-white min-h-screen mt-20"
      style={{ paddingTop: "calc(var(--site-header-height, 140px) + 0.5rem)" }}
    >
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight text-balance">
              {t.brandsPage.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.brandsPage.description}
            </p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-0 h-56 w-56 sm:h-72 sm:w-72 bg-[#dc2626]/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-64 w-64 sm:h-80 sm:w-80 bg-white/70 blur-3xl"></div>
        </div>

        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-4 shadow-sm">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full"></span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-700">
                {t.brandsPage.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
              {t.brandsPage.sectionTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.brandsPage.sectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {brands.map((brand) => (
             <Link
                key={brand.id}
                href={`/marque/${toBrandSlug(brand.name)}`}
                className="group relative rounded-3xl p-[1px] bg-linear-to-br from-[#dc2626]/40 via-transparent to-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden flex flex-col h-full">
                  <div className="relative h-60 sm:h-64 w-full bg-gray-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-linear-to-br from-white via-gray-50 to-gray-100"></div>
                    <div className="relative h-48 w-48 sm:h-56 sm:w-56 flex items-center justify-center">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    {/* <p className="text-xs font-semibold uppercase tracking-wider text-[#dc2626]">
                      {t.nav.brands}
                    </p> */}
                    <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                      {getBrandDescription(brand, language)}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors">
                      {t.brandsPage.cardAction}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.brandsPage.ctaTitle}
        description={t.brandsPage.ctaDescription}
        primaryAction={{ href: "/contact", label: t.common.contactUs }}
        secondaryAction={{ href: "/devis", label: t.common.requestQuote }}
      />
    </div>
  );
}
