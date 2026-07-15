"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  Truck,
  Wrench,
  Star,
  Shield,
  Phone,
  FileText,
  ChevronRight,
  Zap,
  Award,
  Clock,
} from "lucide-react";
import { notFound } from "next/navigation";
import { products } from "@/data/productsData";
import { getLocalizedText } from "@/lib/types";
import { toBrandSlug } from "@/lib/slug";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";

interface ProductDetailClientProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailClient({
  params,
}: ProductDetailClientProps) {
  const { t, language } = useLanguage();
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div
      className="bg-white min-h-screen"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Breadcrumb — pins below the fixed site header on scroll */}
      <div
        className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ top: "var(--site-header-height, 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-2.5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              {t.productsDetails.home}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0 text-gray-300" />
            <Link href="/produits" className="hover:text-gray-700 transition-colors">
              {t.productsDetails.products}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0 text-gray-300" />
            <Link
              href={`/marque/${toBrandSlug(product.brand)}`}
              className="hover:text-gray-700 transition-colors uppercase font-medium"
            >
              {product.brand}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0 text-gray-300" />
            <span className="text-[#dc2626] font-semibold line-clamp-1">
              {getLocalizedText(product.shortTitle || product.title, language)}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 lg:py-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">

            {/* Left: Product Info */}
            <div className="space-y-4 text-center lg:text-left">
              {/* Brand tag */}
              {/* <div>
                <span className="text-xs font-bold text-[#dc2626] uppercase tracking-widest">
                  {product.brand}
                </span>
              </div> */}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {getLocalizedText(product.shortTitle || product.title, language)}
              </h1>

              {/* Description */}
              <p className="text-sm text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {getLocalizedText(product.description, language)}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1 justify-center lg:justify-start">
                <Link
                  href="/devis"
                  className="group inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.productsDetails.request_quote}</span>
                  <ArrowRight className="w-3 h-3 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl border border-gray-200 transition-all duration-200 text-xs sm:text-sm w-full sm:w-auto"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.productsDetails.contact_us}</span>
                </Link>
              </div>
            </div>

            {/* Right: Product Image — hidden on mobile, shown from lg up */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-[400px] h-[300px]">
                <Image
                  src={product.image}
                  alt={getLocalizedText(product.title, language)}
                  fill
                  className="object-contain"
                  priority
                  unoptimized={product.brand === "SUNWARD"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-20">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
              {/* Gallery - Moved to the top for mobile */}
              <div className="lg:order-3 order-1">
                <div className="relative h-[450px] xs:h-[500px] sm:h-[600px] lg:h-[700px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl group bg-white">
                  <Image
                    src={product.image}
                    alt={getLocalizedText(product.title, language)}
                    unoptimized={product.brand === "SUNWARD"}
                    fill
                    className="object-contain p-4 sm:p-6 lg:p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base">
                      {product.brand}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              {product.specs && Object.entries(product.specs).some(([_, value]) => getLocalizedText(value, language).trim() !== "") && (
                <div className="lg:order-1 order-2">
                  <h3 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                    {t.productsDetails.technical_specs}
                  </h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {Object.entries(product.specs)
                      .filter(([_, value]) => getLocalizedText(value, language).trim() !== "")
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                          <p className="font-bold text-gray-900 text-sm sm:text-base wrap-break-word">
                            {typeof value === "object"
                              ? getLocalizedText(value, language)
                              : value}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="bg-linear-to-br lg:order-4 from-[#dc2626]/5 to-[#dc2626]/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-10 border border-[#dc2626]/20 order-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  {t.productsDetails.features}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {(product.brand.toUpperCase() === "TOYOTA"
                    ? [
                        language === "fr"
                          ? "Leader mondial en manutention"
                          : language === "es"
                            ? "Líder mundial en manipulación"
                            : "World leader in material handling",
                        language === "fr"
                          ? "Garantie constructeur et pièces d'origine"
                          : language === "es"
                            ? "Garantía del fabricante y piezas originales"
                            : "Manufacturer warranty and original parts",
                        language === "fr"
                          ? "Sécurité avancée des opérateurs"
                          : language === "es"
                            ? "Seguridad avanzada del operador"
                            : "Advanced operator safety",
                        language === "fr"
                          ? "Coût total de possession optimisé (TCO)"
                          : language === "es"
                            ? "Coste total de propiedad optimizado (TCO)"
                            : "Optimized total cost of ownership (TCO)",
                      ]
                    : [
                        `${t.productsDetails.brand_equipment} ${product.brand}`,
                        t.productsDetails.guarantee,
                        t.productsDetails.after_sales_service,
                        t.productsDetails.operator_training,
                      ]
                  ).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl"
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700 font-medium leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Better mobile spacing */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-4 sm:space-y-6">
                {/* CTA Card */}
                <div className="bg-linear-to-br from-[#dc2626] to-[#991b1b] text-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-red-500/20">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 leading-tight">
                    {t.productsDetails.interested}
                  </h3>
                  <p className="text-white/90 mb-5 sm:mb-6 lg:mb-8 leading-relaxed text-sm sm:text-base">
                    {t.productsDetails.interested_desc}
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <Link
                      href="/devis"
                      className="group flex items-center justify-center gap-2 sm:gap-3 bg-white text-[#dc2626] hover:bg-gray-100 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 w-full text-sm sm:text-base"
                    >
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="truncate">
                        {t.productsDetails.request_quote}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 sm:gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#dc2626] font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 w-full text-sm sm:text-base"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="truncate">
                        {t.productsDetails.contact_us}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Services Card */}
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {t.productsDetails.our_services}
                  </h3>
                  <div className="space-y-4 sm:space-y-5">
                    {[
                      {
                        icon: Package,
                        title: t.productsDetails.sales,
                        desc: t.productsDetails.sales_desc,
                      },
                      {
                        icon: Truck,
                        title: t.productsDetails.rental,
                        desc: t.productsDetails.rental_desc,
                      },
                      {
                        icon: Wrench,
                        title: t.productsDetails.support,
                        desc: t.productsDetails.support_desc,
                      },
                    ].map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#dc2626]/10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                          <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">
                            {service.title}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {t.productsDetails.similar_products}
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {relatedProducts.map((relatedProduct) => (
                        <Link
                          key={relatedProduct.id}
                          href={`/produits/${relatedProduct.id}`}
                          className="group block p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#dc2626]"
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-white border border-gray-100">
                              <Image
                                unoptimized={relatedProduct.brand === "SUNWARD"}
                                src={relatedProduct.image}
                                alt={getLocalizedText(
                                  relatedProduct.shortTitle ||
                                  relatedProduct.title,
                                  language
                                )}
                                fill
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#dc2626] font-bold uppercase mb-0.5">
                                {relatedProduct.brand}
                              </p>
                              <p className="font-bold text-gray-900 text-sm sm:text-base truncate group-hover:text-[#dc2626] transition-colors">
                                {getLocalizedText(
                                  relatedProduct.shortTitle ||
                                  relatedProduct.title,
                                  language
                                )}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/produits"
                      className="flex items-center justify-center gap-2 mt-4 sm:mt-6 w-full py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base font-semibold hover:border-[#dc2626] hover:text-[#dc2626] transition-all"
                    >
                      {t.productsDetails.view_all}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Final CTA Section */}
      <CtaSection
        title={t.productsDetails.ready_to_equip}
        description={t.productsDetails.ready_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />
    </div>
  );
}
