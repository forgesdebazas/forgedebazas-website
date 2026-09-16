"use client";

import { products } from "@/data/productsData";
import { Brand } from "@/data/brands";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Package,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { Button } from "@/components/ui/button";
import CtaSection from "@/components/ui/CtaSection";
import BrandHeroSection from "./BrandHeroSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BrandClientProps {
  brand: Brand;
}

const TOYOTA_AUTOMATED_ACCENTS = [
  { bg: "#dc2626", light: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  { bg: "#1f2937", light: "#f3f4f6", border: "#d1d5db", text: "#1f2937" },
  { bg: "#ea580c", light: "#fff7ed", border: "#fed7aa", text: "#ea580c" },
  { bg: "#2563eb", light: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
];

function ToyotaAutomatedCard({
  product,
  index,
  language,
  viewDetailsLabel,
  requestQuoteLabel,
}: {
  product: (typeof products)[number];
  index: number;
  language: "fr" | "en" | "es";
  viewDetailsLabel: string;
  requestQuoteLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 === 1;
  const color =
    TOYOTA_AUTOMATED_ACCENTS[index % TOYOTA_AUTOMATED_ACCENTS.length];

  const specBullets = product.specs
    ? [product.specs.portee, product.specs.pression, product.specs.sortie]
        .map((s) => getLocalizedText(s, language))
        .filter((v) => v.trim() !== "")
    : [];

  const expandLabel =
    language === "fr"
      ? expanded
        ? "Masquer les caractéristiques"
        : "Voir les caractéristiques"
      : language === "es"
        ? expanded
          ? "Ocultar características"
          : "Ver características"
        : expanded
          ? "Hide features"
          : "View features";

  return (
    <ScrollAnimation delay={0.1}>
      <div
        id={product.id}
        className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100"
      >
        <div
          className={`flex flex-col ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* IMAGE PANEL */}
          <div
            className="relative lg:w-[58%] overflow-hidden bg-gray-900"
            style={{ minHeight: "420px" }}
          >
            <Image
              src={product.image}
              alt={getLocalizedText(product.title, language)}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">
                {product.brand}
              </span>
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div
            className="lg:w-[42%] flex flex-col justify-between p-8 sm:p-10"
            style={{
              borderLeft: isReversed ? "none" : `4px solid ${color.bg}`,
              borderRight: isReversed ? `4px solid ${color.bg}` : "none",
            }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight text-gray-900 uppercase">
                {getLocalizedText(product.shortTitle || product.title, language)}
              </h3>
              <div
                className="w-12 h-1 rounded-full mb-5"
                style={{ backgroundColor: color.bg }}
              />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {getLocalizedText(product.description, language)}
              </p>

              {specBullets.length > 0 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                  style={{
                    backgroundColor: expanded ? color.bg : color.light,
                    color: expanded ? "#fff" : color.text,
                    border: `1.5px solid ${color.border}`,
                  }}
                >
                  {expandLabel}
                  {expanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}

              {expanded && specBullets.length > 0 && (
                <ul className="mt-5 space-y-3 pt-5 border-t border-gray-100">
                  {specBullets.map((spec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: color.bg }}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
              <Link
                href={`/produits/${product.id}`}
                className="inline-flex items-center gap-1.5 text-gray-700 hover:text-[#dc2626] text-xs font-bold transition-colors"
              >
                {viewDetailsLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/devis"
                className="inline-flex items-center gap-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
              >
                {requestQuoteLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default function BrandClient({ brand }: BrandClientProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultCategory =
    brand.name.toUpperCase() === "TOYOTA" ? "chariots-elevateurs" : "all";
  const [visibleCount, setVisibleCount] = useState(() => {
    const parsed = Number(searchParams.get("limit"));
    return Number.isFinite(parsed) && parsed >= 12 ? Math.floor(parsed) : 12;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") ?? defaultCategory
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedCategory === defaultCategory) params.delete("category");
    else params.set("category", selectedCategory);
    if (visibleCount === 12) params.delete("limit");
    else params.set("limit", String(visibleCount));
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [defaultCategory, pathname, router, selectedCategory, visibleCount]);

  // Filter products by brand name
  const brandProducts = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        p.available !== false &&
        p.brand.toLowerCase() === brand.name.toLowerCase() &&
        !(brand.name.toUpperCase() === "SANY" && p.id === "sany-grue-tour")
    );

    if (brand.name.toUpperCase() === "AJAX") {
      return [...filtered].sort((a, b) => {
        const numA = parseInt(a.id.match(/\d+/)?.[0] ?? "0", 10);
        const numB = parseInt(b.id.match(/\d+/)?.[0] ?? "0", 10);
        return numA - numB;
      });
    }

    return filtered;
  }, [brand.name]);

  type BrandCategoryFilter = {
    id: string;
    label: string;
    matches: (product: (typeof products)[number]) => boolean;
  };

  const categoryFilters = useMemo(() => {
    const normalizedBrandName = brand.name.toUpperCase();

    const baseLabel =
      language === "fr"
        ? "Toutes les catégories"
        : language === "es"
          ? "Todas las categorías"
          : "All categories";

    const base: BrandCategoryFilter[] = [
      {
        id: "all",
        label: baseLabel,
        matches: () => true,
      },
    ];

    // Brand-specific logical groupings
    if (normalizedBrandName === "SANY") {
      const grueChenillesLabel =
        language === "fr"
          ? "Grue sur Chenilles"
          : language === "es"
            ? "Grúa sobre Orugas"
            : "Crawler Crane";
      const grueToutTerrainLabel =
        language === "fr"
          ? "Grue Tout-Terrain"
          : language === "es"
            ? "Grúa Todo Terreno"
            : "All-Terrain Crane";
      const grueCamionLabel =
        language === "fr"
          ? "Grue sur Camion"
          : language === "es"
            ? "Grúa sobre Camión"
            : "Truck-Mounted Crane";
      const grueRoughLabel =
        language === "fr"
          ? "Grue Terrain Accidenté"
          : language === "es"
            ? "Grúa Terreno Accidentado"
            : "Rough Terrain Crane";
      const chariotsTelescopiquesLabel =
        language === "fr"
          ? "Chariots Télescopiques"
          : language === "es"
            ? "Manipuladores Telescópicos"
            : "Telehandlers";

      const grueChenillesIds = ["sany-grue-chenilles-lattice"];
      const grueToutTerrainIds = [
        "sany-grue-tout-terrain-100-200t",
        "sany-grue-tout-terrain-200-300t",
      ];
      const grueCamionIds = [
        "sany-grue-camion-100t",
        "sany-grue-camion-50-100t",
        "sany-grue-montee-camion-2t",
      ];
      const grueRoughIds = [
        "sany-grue-terrain-accidente-30-50t",
        "sany-grue-terrain-accidente-50-80t",
        "sany-grue-terrain-accidente-80t",
      ];

      return [
        ...base,
        {
          id: "pompes",
          label: "Pompes",
          matches: (p) => p.category === "pompes-beton" || p.category === "beton",
        },
        {
          id: "grue-chenilles",
          label: grueChenillesLabel,
          matches: (p) => grueChenillesIds.includes(p.id),
        },
        {
          id: "grue-tout-terrain",
          label: grueToutTerrainLabel,
          matches: (p) => grueToutTerrainIds.includes(p.id),
        },
        {
          id: "grue-camion",
          label: grueCamionLabel,
          matches: (p) => grueCamionIds.includes(p.id),
        },
        {
          id: "grue-terrain-accidente",
          label: grueRoughLabel,
          matches: (p) => grueRoughIds.includes(p.id),
        },
        {
          id: "pelles",
          label: "Pelles",
          matches: (p) => p.category === "excavation",
        },
        {
          id: "compacteurs",
          label: "Compacteurs",
          matches: (p) => p.category === "terrassement",
        },
        {
          id: "chariots-telescopiques",
          label: chariotsTelescopiquesLabel,
          matches: (p) => p.category === "chariots-telescopiques",
        },
      ];
    }

    if (normalizedBrandName === "FABO") {
      const concassageMobileLabel =
        language === "fr" ? "Concassage Mobile" : language === "es" ? "Trituración Móvil" : "Mobile Crushing";
      const concassageFixeLabel =
        language === "fr" ? "Concassage Fixe" : language === "es" ? "Trituración Fija" : "Stationary Crushing";
      const betonMobilesLabel =
        language === "fr" ? "Centrales à Béton Mobiles" : language === "es" ? "Plantas Hormigón Móviles" : "Mobile Concrete Plants";
      const betonFixesLabel =
        language === "fr" ? "Centrales à Béton Fixes" : language === "es" ? "Plantas Hormigón Fijas" : "Stationary Concrete Plants";

      const concassageMobileCats = ["concassage-mobile", "concasseurs-mobiles-chenilles"];
      const concassageFixeCats = [
        "concassage-fixe", "concasseurs-a-machoires", "concasseur-percussion-primaire",
        "broyeur-percussion-secondaire-dmk", "concasseurs-percussion-arbre-vertical",
        "concasseurs-a-cone", "concasseurs-tertiaire", "crible-vibrant",
        "tremie-alimentation-vibrante", "crible-deshydratation-hydrocyclone", "vis-lavage-sable",
      ];
      const betonMobilesCats = ["centrales-beton-mobiles"];
      const betonFixesCats = ["centrales-beton-fixes"];

      return [
        ...base,
        {
          id: "concassage-mobile",
          label: concassageMobileLabel,
          matches: (p) => concassageMobileCats.includes(p.category),
        },
        {
          id: "concassage-fixe",
          label: concassageFixeLabel,
          matches: (p) => concassageFixeCats.includes(p.category),
        },
        {
          id: "centrales-beton-mobiles",
          label: betonMobilesLabel,
          matches: (p) => betonMobilesCats.includes(p.category),
        },
        {
          id: "centrales-beton-fixes",
          label: betonFixesLabel,
          matches: (p) => betonFixesCats.includes(p.category),
        },
      ];
    }

    if (normalizedBrandName === "TOYOTA") {
      const chariotsLabel =
        language === "fr"
          ? "Chariots Frontaux"
          : language === "es"
            ? "Carretillas Frontales"
            : "Counterbalance Forklifts";
      const magazinageLabel =
        language === "fr"
          ? "Magasinage"
          : language === "es"
            ? "Almacenamiento"
            : "Warehousing";
      const automatiseesLabel =
        language === "fr"
          ? "Solutions Automatisées"
          : language === "es"
            ? "Soluciones Automatizadas"
            : "Automated Solutions";

      return [
        {
          id: "chariots-elevateurs",
          label: chariotsLabel,
          matches: (p) => p.category === "chariots-elevateurs",
        },
        {
          id: "manutention",
          label: magazinageLabel,
          matches: (p) => p.category === "manutention",
        },
        {
          id: "solutions-automatisees",
          label: automatiseesLabel,
          matches: (p) => p.category === "solutions-automatisees",
        },
      ];
    }

    if (normalizedBrandName === "E-MAK") {
      return [
        ...base,
        {
          id: "megaton",
          label: "MEGATON",
          matches: (p) => p.id === "e-mak-megaton",
        },
        {
          id: "expert",
          label: "EXPERT",
          matches: (p) => p.id === "e-mak-expert",
        },
        {
          id: "super-gt",
          label: "SUPER GT",
          matches: (p) => p.id === "e-mak-super-gt",
        },
        {
          id: "express",
          label: "EXPRESS",
          matches: (p) => p.id === "e-mak-express",
        },
        {
          id: "e-series",
          label: "E SERIES",
          matches: (p) => p.id === "e-mak-asphalt-plant",
        },
        {
          id: "green-type",
          label: "GREEN TYPE",
          matches: (p) => p.id === "e-mak-green-type",
        },
      ];
    }

    // Brands without filters — show a single "all" entry so the filter bar is hidden
    if (["SINOBOOM", "AJAX", "COMBILIFT"].includes(normalizedBrandName)) {
      return base;
    }

    // Default: one filter per underlying category
    const uniqueCategories = [
      ...new Set(brandProducts.map((p) => p.category)),
    ].filter(Boolean);

    return [
      ...base,
      ...uniqueCategories.map<BrandCategoryFilter>((cat) => ({
        id: cat,
        label: cat,
        matches: (p) => p.category === cat,
      })),
    ];
  }, [brand.name, brandProducts, language]);

  const filteredProducts = useMemo(() => {
    const active =
      categoryFilters.find((f) => f.id === selectedCategory) ||
      categoryFilters[0];

    return brandProducts.filter((p) => active.matches(p));
  }, [brandProducts, categoryFilters, selectedCategory]);

  const categoryCount =
    categoryFilters.length > 0 ? categoryFilters.length - 1 : 0;

  const isToyotaAutomated =
    brand.name.toUpperCase() === "TOYOTA" &&
    selectedCategory === "solutions-automatisees";

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      <BrandHeroSection
        brand={brand}
        productCount={filteredProducts.length}
        categoryCount={categoryCount}
        hideLogoCard={false}
      />

      {/* Products Grid */}
      <section id="catalogue" className="py-16 sm:py-20 lg:py-24 scroll-mt-32">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {language === "fr"
                ? `Équipements ${brand.name}`
                : language === "es"
                  ? `Equipos ${brand.name}`
                  : `${brand.name} Equipment`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "fr"
                ? `Parcourez notre sélection de ${filteredProducts.length} produits ${brand.name} disponibles.`
                : language === "es"
                  ? `Explore nuestra selección de ${filteredProducts.length} productos ${brand.name} disponibles.`
                  : `Browse our selection of ${filteredProducts.length} ${brand.name} products available.`}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              {categoryFilters.length > 1 && (
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(filter.id);
                        setVisibleCount(12);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide border transition-all duration-200 ${selectedCategory === filter.id
                        ? "bg-[#dc2626] text-white border-[#dc2626] shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      {filter.label.replace(/-/g, " ")}
                    </button>
                  ))}
                </div>
              )}

              {isToyotaAutomated && (
                <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-[#7a1414] text-white shadow-2xl">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.6) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15) 0%, transparent 40%)",
                    }}
                  />
                  <div className="relative px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16 text-center">
                    <span className="inline-block bg-[#dc2626] text-white text-[11px] font-black uppercase tracking-[0.25em] px-4 py-1.5 rounded-full mb-5 shadow-lg">
                      {language === "fr"
                        ? "Toyota Automation"
                        : language === "es"
                          ? "Toyota Automatización"
                          : "Toyota Automation"}
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4 leading-tight">
                      {language === "fr"
                        ? "Solutions Automatisées"
                        : language === "es"
                          ? "Soluciones Automatizadas"
                          : "Automated Solutions"}
                    </h3>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-200 leading-relaxed mb-6">
                      {language === "fr"
                        ? "Découvrez la gamme complète Toyota dédiée à l'automatisation des flux logistiques : AGV, navettes, transpalettes et chariots autonomes pour des entrepôts plus performants."
                        : language === "es"
                          ? "Descubra la gama Toyota dedicada a la automatización logística: AGV, lanzaderas, transpaletas y carretillas autónomas."
                          : "Explore Toyota's full range of automated logistics: AGVs, shuttles, pallet trucks and autonomous forklifts for high-performance warehouses."}
                    </p>
                    <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3">
                      {["AGV", "AUTOPILOT", "AUTONOMIE", "INTÉGRATION"].map((chip) => (
                        <span
                          key={chip}
                          className="px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-[10px] sm:text-xs font-bold tracking-widest"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isToyotaAutomated ? (
                <div className="space-y-8 sm:space-y-10">
                  {filteredProducts.slice(0, visibleCount).map((product, idx) => (
                    <ToyotaAutomatedCard
                      key={product.id}
                      product={product}
                      index={idx}
                      language={language}
                      viewDetailsLabel={t.actions.viewDetails}
                      requestQuoteLabel={t.productsDetails.request_quote}
                    />
                  ))}
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">

                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col ${
                      product.featured && brand.name.toUpperCase() === "SANY"
                        ? "sm:col-span-2 lg:col-span-2 ring-1 ring-[#dc2626]/20"
                        : ""
                    }`}
                  >
                    {/* Product Image */}
                    <Link
                      href={`/produits/${product.id}`}
                      className={`relative block overflow-hidden bg-white flex-shrink-0 ${
                        product.featured && brand.name.toUpperCase() === "SANY"
                          ? "h-72 sm:h-96 lg:h-[28rem]"
                          : "h-56 sm:h-64"
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={getLocalizedText(product.title, language)}
                        fill
                        unoptimized={product.brand === "SUNWARD"}
                        sizes={
                          product.featured && brand.name.toUpperCase() === "SANY"
                            ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw"
                            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out "
                      />
                      {/* Brand badge */}
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                        <span className="text-[11px] font-bold text-gray-900 tracking-wide">
                          {product.brand}
                        </span>
                      </div>
                      {/* View details CTA on hover */}
                      {/* <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <span className="bg-[#dc2626] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                          {t.actions.viewDetails}
                        </span>
                      </div> */}
                    </Link>

                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 mb-1.5 text-base leading-snug uppercase">
                        {getLocalizedText(
                          product.shortTitle || product.title,
                          language
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {getLocalizedText(product.description, language)}
                      </p>

                      {/* Specs pills — max 2 to keep cards aligned */}
                      {product.specs && (
                        <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
                          {[product.specs.portee, product.specs.pression, product.specs.sortie]
                            .map((s) => getLocalizedText(s, language))
                            .filter((v) => v.trim() !== "")
                            .slice(0, 2)
                            .map((spec, specIdx) => (
                              <span key={specIdx} className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                                {spec}
                              </span>
                            ))}
                        </div>
                      )}

                      {/* View details link */}
                      <Link
                        href={`/produits/${product.id}`}
                        className="flex items-center gap-1.5 text-[#dc2626] font-semibold text-xs hover:gap-2.5 transition-all mb-3"
                      >
                        {t.actions.viewDetails}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* Demande Devis button */}
                      <div className="mt-auto">
                        <Link
                          href="/devis"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          {t.productsDetails.request_quote}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Load More Button */}
              {filteredProducts.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setVisibleCount(visibleCount + 9)}
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-3 rounded-lg font-semibold text-lg"
                  >
                    {t.products.loadMore}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-md">
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.products.noProducts}
              </h3>
              <p className="text-gray-600 mb-8">
                {t.products.tryModifyFilters}
              </p>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 bg-[#dc2626] text-white px-8 py-4 rounded-lg hover:bg-[#b91c1c] transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.products.pageTitle}
              </Link>
            </div>
          )}
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.productsDetails.interested}
        description={t.productsDetails.interested_desc}
        primaryAction={{ href: "/devis", label: t.productsDetails.request_quote }}
        secondaryAction={{ href: "/contact", label: t.productsDetails.contact_us }}
      />

      {/* Back to Products */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#dc2626] font-semibold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t.solutions.viewAllProducts}
          </Link>
        </div>
      </section>
    </main>
  );
}
