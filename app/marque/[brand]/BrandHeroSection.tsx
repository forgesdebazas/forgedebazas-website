"use client";

import { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, FileText, ArrowRight, Eye } from "lucide-react";

const BRAND_BROCHURES: Record<string, string> = {
  AJAX: "https://drive.google.com/file/d/11AW7xekkNz3OA5D2YLAhYrd2rej2YUEF/view?usp=sharing",
  SUNWARD: "https://drive.google.com/file/d/1JCGIG4SrYJ4Tt2Fxnww-5de-nLvIhdKF/view?usp=sharing",
};

interface BrandHeroSectionProps {
  brand: Brand;
  productCount: number;
  categoryCount: number;
  hideLogoCard?: boolean;
}

export default function BrandHeroSection({
  brand,
  productCount,
  categoryCount,
  hideLogoCard = false,
}: BrandHeroSectionProps) {
  const { language, t } = useLanguage();
  const brochureUrl = BRAND_BROCHURES[brand.name.toUpperCase()];
  const brochureViewLabel =
    language === "fr"
      ? "Voir la brochure"
      : language === "es"
        ? "Ver el folleto"
        : "View brochure";

  return (
    <section className="relative bg-white border-b border-gray-100">
      {/* Sticky breadcrumb bar — pins beneath the fixed site header on scroll */}
      <div
        className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2.5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              {t.productsDetails.home}
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-300" />
            <Link href="/produits" className="hover:text-gray-700 transition-colors">
              {t.productsDetails.products}
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-300" />
            <span className="text-[#dc2626] font-semibold">{brand.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4 sm:pt-5 lg:pt-5 pb-6 sm:pb-8 lg:pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

          {/* Left: Brand Info */}
          <div className="space-y-4 text-center lg:text-left">

            {brand.name.toUpperCase() === "TOYOTA" && (
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-[#dc2626]">
                {language === "fr"
                  ? "Distributeur exclusif depuis 1985."
                  : language === "es"
                    ? "Distribuidor exclusivo desde 1985."
                    : "Exclusive distributor since 1985."}
              </p>
            )}

            <p className="text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {language === "fr"
                ? `Découvrez notre gamme complète d'équipements ${brand.name}. Des solutions fiables et performantes pour tous vos projets.`
                : language === "es"
                  ? `Descubra nuestra gama completa de equipos ${brand.name}. Soluciones fiables y de alto rendimiento para todos sus proyectos.`
                  : `Discover our complete range of ${brand.name} equipment. Reliable and high-performance solutions for all your projects.`}
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div>
                <div className="text-xl font-bold text-gray-900">{productCount}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                  {productCount === 1
                    ? t.products.foundResults
                    : t.products.foundResultsPlural}
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-xl font-bold text-gray-900">{categoryCount}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                  {t.products.ourCategories.replace("Nos ", "")}
                </div>
              </div>
            </div>

            {/* CTA Buttons — responsive grid: 1 col mobile, 2 cols tablet, row on desktop */}
            <div
              className={`grid gap-2 pt-1 grid-cols-1 sm:grid-cols-2 ${
                brochureUrl ? "lg:grid-cols-3" : "lg:grid-cols-2"
              }`}
            >
              <Link
                href="/devis"
                className="group inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-sm w-full shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{t.productsDetails.request_quote}</span>
                <ArrowRight className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2.5 rounded-xl border border-gray-200 transition-all duration-200 text-xs sm:text-sm w-full"
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{t.productsDetails.contact_us}</span>
              </Link>
              {brochureUrl && (
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-sm w-full shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{brochureViewLabel}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right: Logo card */}
          {!hideLogoCard && (
            <div className="flex justify-center items-center">
              <div
                className={`relative w-full ${
                  brand.name === "SUNWARD"
                    ? "max-w-[520px] h-[180px] sm:h-[230px] md:h-[280px] lg:h-80"
                    : "max-w-[300px] h-[100px] sm:h-[130px] md:h-[150px]"
                }`}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain"
                  unoptimized={brand.name === "SUNWARD"}
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
