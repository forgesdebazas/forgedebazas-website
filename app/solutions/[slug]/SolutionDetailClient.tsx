"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Solution } from "@/data/solutionsData";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { products } from "@/data/productsData";
import { getLocalizedText } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";
import RayonnageElementsSection from "@/components/solutions/RayonnageElementsSection";
import { rayonnageElements } from "@/data/rayonnageElements";

interface SolutionDetailClientProps {
  solution: Solution;
  previousSolution: Solution | null;
  nextSolution: Solution | null;
}

export default function SolutionDetailClient({
  solution,
  previousSolution,
  nextSolution,
}: SolutionDetailClientProps) {
  const { language, t } = useLanguage();
  const solutionTitle = getLocalizedText(solution.title, language);
  const solutionSubtitle = getLocalizedText(solution.subtitle, language);
  const solutionDescription = getLocalizedText(solution.description, language);
  const solutionFullDescription = solution.fullDescription
    ? getLocalizedText(solution.fullDescription, language)
    : "";

  const solutionToProductCategories: Record<string, string[]> = {
    manutention: ["chariots-elevateurs", "manutention", "solutions-automatisees"],
    "solutions-automatisees": ["solutions-automatisees", "rayonnage-stockage"],
    terrassement: [
      "terrassement",
      "excavation",
      "manutention",
      "beton",
      "pompes-beton",
      "centrales-beton",
      "malaxeurs",
    ],
    mines: [
      "mines",
      "concasseurs",
      "concassage",
      "concasseurs-mobiles-chenilles",
      "cribles-vibrants-mobile-sur-chenilles",
      "crible-de-scalpeur-sur-chenilles",
      "concasseur-mobile-a-percussion",
      "concasseurs-mobiles-et-criblage-et-lavage",
      "installations-mobiles-de-criblage-et-de-lavage",
      "usine-de-concassage-primaire-mobile",
      "usine-de-concassage-et-criblage-secondaire",
      "installation-de-concassage-a-percussion-mobile-a-arbre-vertical",
      "concasseur-a-machoire-mobile-type-container",
      "forage",
      "foreuses",
      "transport",
      "excavation",
    ],
    transport: ["transport"],
    levage: ["grues"],
    rayonnage: ["chariots-elevateurs", "manutention"],
    portuaire: ["manutention-portuaire"],
    energie: ["groupes-electrogenes", "eclairage"],
  };

  const categoryIds = solutionToProductCategories[solution.id] || [];

  const preferredSuggestedProductIds: Record<string, string[]> = {
    manutention: [
      "toyota-traigo80-4roues-15-35t",
      "toyota-traigo80-4roues-4-8t",
      "toyota-vna-cabine-sol",
      "toyota-transpalettes-gerbeurs-mat-retractable-automatises",
      "toyota-navettes-semi-automatisees",
      "toyota-tracteur-remorquage-automatise",
    ],
    "solutions-automatisees": [
      "toyota-transpalettes-gerbeurs-mat-retractable-automatises",
      "toyota-tracteur-remorquage-automatise",
      "atox-systemes-pick-to-light",
      "atox-convoyeurs-a-rouleaux",
    ],
    energie: [
      "teksan-diesel-generator",
      "teksan-tours-eclairage",
      "teksan-tour-eclairage-solaire",
    ],
    portuaire: [
      "sany-port-reach-stacker",
      "sany-port-grue-sts",
      "sany-port-portique-rtg-rmg",
      "sany-port-tracteur-terminal",
      "sany-port-empty-container-handler",
    ],
    rayonnage: [
      "toyota-reflex-standard",
      "toyota-reflex-in-out",
      "toyota-vna-cabine-sol",
      "toyota-vna-cabine-montante",
      "toyota-gerbeur-swe",
      "toyota-preparateur-ose120",
    ],
    mines: [
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-0",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-1",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-2",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-3",
      "sany-series-mining-tunneling-off-highway-mining-truck-0",
      "sany-series-mining-tunneling-off-highway-mining-truck-1",
      "fabo-fts-15-45-2-installation-mobile-de-criblage",
      "fabo-fts-15-60-3-crible-vibrant-mobile-sur-chenilles",
      "fabo-pro-130-concasseur-mobile-a-percussion",
      "fabo-fullstar-90-installation-mobile-de-concassage-criblage-et-lavage",
      "sany-series-mining-tunneling-roadheader-0",
      "sany-series-mining-tunneling-roadheader-1",
      "sany-series-mining-tunneling-roadheader-2",
    ],
    terrassement: [
      "sany-series-excavator-mini-excavator-0",
      "sany-series-excavator-medium-excavator-0",
      "sany-series-wheel-loader-chargeuse-sur-pneus-0",
      "sany-series-wheel-loader-chargeuse-pelleteuse-0",
      "fabo-centrale-beton-mobile",
      "fabo-centrale-beton-fixe-powermix60",
      "ajax-argo-4000",
      "ajax-argo-3000",
      "ajax-argo-2500",
    ],
    transport: [
      "sany-truck-dump_truck-100",
    ],
  };

  const solutionToSanySeriesLinks: Record<
    string,
    Array<{ label: string; subtitle: string; href: string; brand?: string }>
  > = {
    mines: [
      {
        label: "Camion Minier",
        subtitle: "SANY Off-highway Mining Truck",
        href: "/marque/sany/truck/off-highway-mining-truck",
        brand: "SANY",
      },
      {
        label: "Grande pelle de Plus de 36T",
        subtitle: "SANY Large Excavator — Over 36T",
        href: "/marque/sany/excavator/large-excavator?series=Over%2036T",
        brand: "SANY",
      },
      {
        label: "Tunnelier à Bras (Roadheader)",
        subtitle: "Séries EBZ, STR, SCR",
        href: "/marque/sany/mining-tunneling/roadheader",
        brand: "SANY",
      },
      {
        label: "Pelles minières",
        subtitle: "SANY Mining Excavators",
        href: "/marque/sany/excavator/mining-excavators",
        brand: "SANY",
      },
      {
        label: "Concasseurs mobiles sur chenilles",
        subtitle: "FABO — Concassage mobile",
        href: "/marque/fabo/concassage-mobile/concasseurs-mobiles-sur-chenilles",
        brand: "FABO",
      },
      {
        label: "Cribles vibrants mobiles",
        subtitle: "FABO — Criblage mobile sur chenilles",
        href: "/marque/fabo/concassage-mobile/cribles-vibrants-mobile-sur-chenilles",
        brand: "FABO",
      },
      {
        label: "Concasseurs mobiles à percussion",
        subtitle: "FABO — Concassage semi mobile",
        href: "/marque/fabo/concassage-semi-mobile/concasseur-mobile-a-percussion",
        brand: "FABO",
      },
      {
        label: "Concasseurs et cribles fixes",
        subtitle: "FABO — Concassage fixe",
        href: "/marque/fabo/concassage-fixe",
        brand: "FABO",
      },
    ],
    terrassement: [
      {
        label: "Pompe mobile",
        subtitle: "SANY Concrete Machinery",
        href: "/marque/sany/pompe-mobile",
        brand: "SANY",
      },
      {
        label: "Camion malaxeur",
        subtitle: "SANY Truck Mixer",
        href: "/marque/sany/camion-malaxeur",
        brand: "SANY",
      },
      {
        label: "Pompe stationnaire",
        subtitle: "SANY Stationary Concrete Pump",
        href: "/marque/sany/pompe-stationnaire",
        brand: "SANY",
      },
      {
        label: "Pelles hydrauliques — Toute la gamme",
        subtitle: "Mini, Moyenne, Grande Excavatrice",
        href: "/marque/sany/excavator",
      },
      {
        label: "Excavatrice sur Pneus",
        subtitle: "SY155W, SY165W",
        href: "/marque/sany/excavator/wheel-excavator",
      },
      {
        label: "Chargeuses sur Pneus",
        subtitle: "Chargeuses SANY pour chargement et manutention",
        href: "/marque/sany/wheel-loader/chargeuse-sur-pneus",
      },
      {
        label: "Tractopelle",
        subtitle: "BHL95",
        href: "/marque/sany/wheel-loader/chargeuse-pelleteuse",
      },
      {
        label: "Mini pelle",
        subtitle: "SANY Mini Excavator",
        href: "/marque/sany/excavator/mini-excavator",
        brand: "SANY",
      },
      {
        label: "Moyenne pelle",
        subtitle: "SANY Medium Excavator",
        href: "/marque/sany/excavator/medium-excavator",
        brand: "SANY",
      },
      {
        label: "Centrales à béton",
        subtitle: "FABO centrales mobiles et fixes",
        href: "/marque/fabo/centrale-beton",
        brand: "FABO",
      },
      {
        label: "Malaxeurs autochargeants AJAX",
        subtitle: "ARGO 2000, 2300, 2500, 3000, 4000",
        href: "/marque/ajax",
        brand: "AJAX",
      },
    ],
    transport: [
      {
        label: "Camions SANY — Toute la gamme",
        subtitle: "Camions bennes et tracteurs",
        href: "/marque/sany/truck",
      },
      {
        label: "Camion Benne 8x4",
        subtitle: "SYZ420C-8S(V)",
        href: "/marque/sany/truck/dump-truck",
      },
      {
        label: "Tracteur Semi-Remorque",
        subtitle: "Électrique & Diesel",
        href: "/marque/sany/truck/semi-trailer-tractor",
      },
    ],
    portuaire: [
      {
        label: "Portuaire SANY — Toute la gamme",
        subtitle: "Reach stackers, portiques, tracteurs, chariots télescopiques",
        href: "/marque/sany/port-machinery",
      },
      {
        label: "Reach Stacker",
        subtitle: "Manutention de conteneurs pleins",
        href: "/marque/sany/port-machinery/reach-stacker",
      },
      {
        label: "Chariots Télescopiques",
        subtitle: "STH1440, STH1840",
        href: "/marque/sany/port-machinery/telehandler",
      },
      {
        label: "Tracteur Terminal Électrique",
        subtitle: "Transport portuaire électrique",
        href: "/marque/sany/port-machinery/electric-terminal-tractor",
      },
    ],
    levage: [
      {
        label: "Grues — Toute la gamme",
        subtitle: "Truck, Crawler, All-terrain, Tower",
        href: "/marque/sany/crane",
      },
      {
        label: "Grue Tout-terrain",
        subtitle: "Séries SAC 60T → 1000T+",
        href: "/marque/sany/crane/all-terrain-crane",
      },
      {
        label: "Grue sur Chenilles",
        subtitle: "Séries SCC, SCE 25T → 22000T",
        href: "/marque/sany/crane/crawler-crane",
      },
      {
        label: "Grue Automotrice (Truck Crane)",
        subtitle: "Séries STC 12 - 160T",
        href: "/marque/sany/crane/truck-crane",
      },
    ],
  };

  const sanySeriesLinks = solutionToSanySeriesLinks[solution.id] || [];
  const quickLinks =
    solution.id === "manutention"
      ? [
          {
            label:
              language === "fr"
                ? "Chariots frontaux"
                : language === "es"
                  ? "Carretillas frontales"
                  : "Counterbalance forklifts",
            href: "/marque/toyota?category=chariots-elevateurs#catalogue",
          },
          {
            label:
              language === "fr"
                ? "Magasinage"
                : language === "es"
                  ? "Almacenamiento"
                  : "Warehousing",
            href: "/marque/toyota?category=manutention#catalogue",
          },
        ]
      : solution.id === "solutions-automatisees"
        ? [
            {
              label:
                language === "fr"
                  ? "Solutions Automatisées Toyota"
                  : language === "es"
                    ? "Soluciones automatizadas Toyota"
                    : "Toyota automated solutions",
              href: "/marque/toyota?category=solutions-automatisees#catalogue",
            },
          ]
      : solution.id === "energie"
        ? [
            {
              label:
                language === "fr"
                  ? "Groupes électrogènes diesel"
                  : language === "es"
                    ? "Grupos electrógenos diésel"
                    : "Diesel generators",
              href: "/produits/teksan-diesel-generator",
            },
            {
              label:
                language === "fr"
                  ? "Tours d'éclairage"
                  : language === "es"
                    ? "Torres de iluminación"
                    : "Lighting towers",
              href: "/produits/teksan-tours-eclairage",
            },
            {
              label:
                language === "fr"
                  ? "Tour d'éclairage solaire"
                  : language === "es"
                    ? "Torre de iluminación solar"
                    : "Solar lighting tower",
              href: "/produits/teksan-tour-eclairage-solaire",
            },
          ]
      : [];

  const isExcludedForSuggestedProducts = (product: (typeof products)[number]) => {
    if (solution.id === "transport" || solution.id === "terrassement") {
      const frName = getLocalizedText(product.shortTitle || product.title, "fr");
      const searchable = `${product.id} ${frName}`.toLowerCase();
      return (
        searchable.includes("off-highway-mining-truck") ||
        searchable.includes("camion minier") ||
        searchable.includes("tombereau")
      );
    }

    if (solution.id !== "portuaire") return false;

    const frName = getLocalizedText(product.shortTitle || product.title, "fr");
    const searchable = `${product.id} ${frName}`.toLowerCase();
    return searchable.includes("chargeuse") || searchable.includes("loader");
  };

  const categoryMatchedProducts = products
    .filter((p) => p.available !== false)
    .filter((p) => categoryIds.length ? categoryIds.includes(p.category) : false);

  const filteredCategoryMatchedProducts = categoryMatchedProducts.filter(
    (p) => !isExcludedForSuggestedProducts(p)
  );

  const preferredSuggestedProducts = (preferredSuggestedProductIds[solution.id] || [])
    .map((id) => products.find((p) => p.available !== false && p.id === id))
    .filter((p) => p ? !isExcludedForSuggestedProducts(p) : false)
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const suggestedProducts =
    preferredSuggestedProducts.length > 0
      ? preferredSuggestedProducts
      : filteredCategoryMatchedProducts
          .sort((a, b) => {
            // Mettre en avant les produits scrapés (SANY/FABO) puis les "featured"
            const aScraped = a.id.startsWith("sany-") || a.id.startsWith("fabo-");
            const bScraped = b.id.startsWith("sany-") || b.id.startsWith("fabo-");
            if (aScraped !== bScraped) return aScraped ? -1 : 1;
            if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
            return 0;
          })
          .slice(0, 6);

  const suggestedProductsWithFallback =
    suggestedProducts.length > 0
      ? suggestedProducts
      : products
        .filter((p) => p.available !== false)
        .filter((p) => p.id.startsWith("sany-") || p.id.startsWith("fabo-"))
        .filter((p) => !isExcludedForSuggestedProducts(p))
        .slice(0, 6);

  const getFeatureLinkHref = (feature: string) => {
    // Essaie de relier une "proposition" à un produit pertinent (si possible).
    // Fallback: catalogue produits.
    const keywordToCategory: Array<[RegExp, string]> = [
      [/chariot|gerbeur|transpalette|préparateur|commande|m[âa]t/i, "chariots-elevateurs"],
      [/grue|palan|pont|portique|potence|levage/i, "grues"],
      [/pompe.*b[ée]ton/i, "pompes-beton"],
      [/b[ée]tonni|camion[-\s]?toupie|malax/i, "beton"],
      [/pelle|excav/i, "excavation"],
      [/compact|niveleuse|finisseur|fraiseuse|bulldo/i, "terrassement"],
      [/camion|benne|dumper|semi|remorque|tracteur/i, "transport"],
      [/concasseur|cribl|lavage/i, "concasseurs"],
      [/forage|foreus/i, "foreuses"],
      [/groupe|[ée]lectrog|kva|g[ée]n[ée]rateur/i, "groupes-electrogenes"],
      [/m[âa]t d['’]?[ée]clairage|[ée]clairage/i, "eclairage"],
      [/portuaire|conteneur|terminal/i, "manutention-portuaire"],
      [/rayonnage|rack|palette|drive.in|accumulation|cantilever|picking|mezzanine|stockage/i, "chariots-elevateurs"],
    ];

    const matchedCategory =
      keywordToCategory.find(([re]) => re.test(feature))?.[1] ?? null;

    const candidate =
      (matchedCategory
        ? suggestedProductsWithFallback.find((p) => p.category === matchedCategory)
        : undefined) ?? suggestedProductsWithFallback[0];

    return candidate ? `/produits/${candidate.id}` : "/produits";
  };

  void getFeatureLinkHref;

  return (
    <div
      className="bg-white min-h-screen"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      {/* Breadcrumb — pins below the fixed site header on scroll */}
      <section
        className="mt-6"
      >
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="flex h-6 items-center gap-1 text-[10px] leading-none text-gray-500 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-[#dc2626] transition-colors whitespace-nowrap"
            >
              {t.solutions.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/solutions"
              className="hover:text-[#dc2626] transition-colors whitespace-nowrap"
            >
              {t.solutions.solutionBreadcrumb}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate">
              {solutionTitle}
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight text-balance">
              {solutionTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {solutionSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="lg:hidden">
                <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={solution.image}
                    alt={solutionTitle}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={solution.image}
                    alt={solutionTitle}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t.solutions.aboutSolution}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  {solutionDescription}
                </p>
                {solutionFullDescription && (
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    {solutionFullDescription}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200">
                {/* <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-2 flex-wrap">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626] shrink-0" />
                  Ce que nous proposons
                </h3> */}
                {solution.id === "rayonnage" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {rayonnageElements.slice(0, 6).map((el) => (
                      <Link
                        key={el.id}
                        href={`/marque/atox#${el.id}`}
                        className="group flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-[#dc2626] overflow-hidden"
                      >
                        <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={el.images[0]}
                            alt={el.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 group-hover:text-[#dc2626] transition-colors font-medium line-clamp-2 flex-1">
                          {el.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                ) : (

                  null
                  // <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                  //   {solution.features.map((feature, idx) => (
                  //     <Link
                  //       key={idx}
                  //       href={getFeatureLinkHref(feature)}
                  //       className="group flex items-start gap-3 bg-white p-4 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-[#dc2626]"
                  //     >
                  //       <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2.5 shrink-0"></div>
                  //       <span className="text-xs sm:text-sm md:text-base text-gray-700 group-hover:text-[#dc2626] transition-colors">
                  //         {feature}
                  //       </span>
                  //       <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all ml-auto shrink-0 mt-0.5" />
                  //     </Link>
                  //   ))}
                  // </div>
                )} 

                {quickLinks.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm sm:text-base font-bold text-gray-900 hover:border-[#dc2626] hover:text-[#dc2626] hover:shadow-md transition-all"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}

                {suggestedProductsWithFallback.length > 0 && solution.id !== "rayonnage" ? (
                  <>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                      {t.solutions.suggestedProductsTitle}
                    </h4>
                    <div
                      id="produits-proposes"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                    >
                      {suggestedProductsWithFallback.map((product) => {
                        const isLeftLightingTower =
                          product.id === "teksan-tours-eclairage";
                        const isRightLightingTower =
                          product.id === "teksan-tour-eclairage-solaire";
                        const isSplitLightingTowerImage =
                          isLeftLightingTower || isRightLightingTower;

                        return (
                          <Link
                            key={product.id}
                            href={`/produits/${product.id}`}
                            className="group bg-white rounded-xl border border-gray-200 hover:border-[#dc2626] hover:shadow-lg transition-all overflow-hidden"
                          >
                            <div className="flex gap-4 p-4">
                              <div className="relative w-28 h-28 shrink-0 rounded-lg bg-white border border-gray-100 overflow-hidden">
                                <Image
                                  src={product.image}
                                  alt={getLocalizedText(
                                    product.shortTitle || product.title,
                                    language
                                  )}
                                  fill
                                  className={`${isSplitLightingTowerImage
                                      ? "object-cover p-0"
                                      : "object-contain p-2"
                                    } group-hover:scale-110 transition-transform duration-300`}
                                  style={
                                    isSplitLightingTowerImage
                                      ? {
                                          objectPosition: isLeftLightingTower
                                            ? "left center"
                                            : "right center",
                                        }
                                      : undefined
                                  }
                                  unoptimized={product.brand === "SUNWARD"}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] sm:text-xs font-bold text-[#dc2626] uppercase tracking-wide">
                                  {product.brand}
                                </p>
                                <p className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2">
                                  {getLocalizedText(
                                    product.shortTitle || product.title,
                                    language
                                  )}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
                                  {getLocalizedText(product.description, language)}
                                </p>
                              </div>
                            </div>
                            <div className="px-4 pb-4">
                              <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 group-hover:text-[#dc2626] transition-colors">
                                Voir le produit
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {sanySeriesLinks.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#dc2626] bg-red-50 px-2 py-0.5 rounded-full">
                            {solution.id === "terrassement" ? "SANY / FABO / AJAX" : "SANY / FABO"}
                          </span>
                          {t.solutions.directSeries}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {sanySeriesLinks.map((link) => (
                            <Link
                              key={`${link.label}-${link.href}`}
                              href={link.href}
                              className="group flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#dc2626] hover:shadow-md transition-all"
                            >
                              <div className="flex-1 min-w-0">
                                {link.brand && (
                                  <span className="inline-flex mb-1 text-[10px] font-black uppercase tracking-widest text-[#dc2626] bg-red-50 px-2 py-0.5 rounded-full">
                                    {link.brand}
                                  </span>
                                )}
                                <p className="text-sm font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-1">
                                  {link.label}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                  {link.subtitle}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  </>
                ) : solution.id === "rayonnage" ? (
                  <Link
                    href="/marque/atox"
                    className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-5 py-3 rounded-lg transition-colors"
                  >
                    {t.solutions.discoverAtoxBrand}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 mb-3">
                      {t.solutions.catalogComplete}
                    </p>
                    <Link href="/produits">
                      <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                        {t.solutions.viewAllProducts}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-6">
                <div className="bg-[#dc2626] text-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                    {t.solutions.interested}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 mb-5 sm:mb-6 leading-relaxed">
                    {t.solutions.expertHelp}
                  </p>
                  <div className="space-y-3">
                    <Link href="/devis" className="block">
                      <Button className="bg-white text-[#dc2626] hover:bg-gray-100 w-full py-5 sm:py-6 text-sm sm:text-base font-bold uppercase transition-all">
                        {t.solutions.requestQuote}
                      </Button>
                    </Link>
                    <Link href="/contact" className="block">
                      <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#dc2626] w-full py-5 sm:py-6 text-sm sm:text-base font-bold uppercase transition-all">
                        {t.solutions.contactUs}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                    {t.solutions.needHelp}
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                    <p>
                      <strong>{t.solutions.phone}</strong>
                      <br />
                      <a
                        href="tel:+212522669850"
                        className="text-[#dc2626] hover:underline"
                      >
                        +212 522 669 850
                      </a>
                    </p>
                    <p>
                      <strong>{t.solutions.email}</strong>
                      <br />
                      <a
                        href="mailto:contact@forgesdebazas.com"
                        className="text-[#dc2626] hover:underline"
                      >
                        contact@forgesdebazas.com
                      </a>
                    </p>
                    <p>
                      <strong>{t.solutions.hours}</strong>
                      <br />
                      {t.solutions.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* Rayonnage Elements (only for rayonnage solution) */}
      {solution.id === "rayonnage" && <RayonnageElementsSection />}

      {/* Navigation */}
      <section className="py-8 sm:py-12 bg-gray-50 border-y border-gray-200">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
            {previousSolution ? (
              <Link
                href={`/solutions/${previousSolution.id}`}
                className="flex items-center gap-3 bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex-1"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">
                    {t.solutions.previous}
                  </p>
                  <p className="font-bold text-gray-900 truncate text-sm sm:text-base">
                    {getLocalizedText(previousSolution.title, language)}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            {nextSolution ? (
              <Link
                href={`/solutions/${nextSolution.id}`}
                className="flex items-center gap-3 bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex-1 justify-end text-right"
              >
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">
                    {t.solutions.next}
                  </p>
                  <p className="font-bold text-gray-900 truncate text-sm sm:text-base">
                    {getLocalizedText(nextSolution.title, language)}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626] shrink-0" />
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </ScrollAnimation>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.solutions.readyProject}
        description={t.solutions.contactDesc}
        primaryAction={{ href: "/devis", label: t.solutions.requestQuote }}
        secondaryAction={{ href: "/contact", label: t.solutions.contactUs }}
      />
    </div>
  );
}
