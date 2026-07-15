"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { solutions } from "@/data/solutionsData";
import { brands } from "@/data/brands";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import CtaSection from "@/components/ui/CtaSection";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/productsData";
import { getLocalizedText } from "@/lib/types";
import { toBrandSlug } from "@/lib/slug";
import { rayonnageElements } from "@/data/rayonnageElements";

export default function SolutionsClient() {
  const { t, language } = useLanguage();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, []);

  const isExcludedForSolution = (
    solutionId: string,
    product: (typeof products)[number]
  ) => {
    if (!["transport", "terrassement"].includes(solutionId)) return false;

    const frName = getLocalizedText(product.shortTitle || product.title, "fr");
    const searchable = `${product.id} ${frName}`.toLowerCase();
    return (
      searchable.includes("off-highway-mining-truck") ||
      searchable.includes("camion minier") ||
      searchable.includes("tombereau")
    );
  };

  const getProductsForSolution = (solutionId: string) => {
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
      mines: ["mines", "concasseurs", "forage", "foreuses", "transport", "excavation"],
      transport: ["transport"],
      levage: ["grues"],
      rayonnage: ["chariots-elevateurs", "manutention"],
      portuaire: ["manutention-portuaire"],
      energie: ["groupes-electrogenes", "eclairage"],
    };

    const categoryIds = solutionToProductCategories[solutionId] || [];
    const fromCategories = products
      .filter((p) => p.available !== false)
      .filter((p) => categoryIds.length ? categoryIds.includes(p.category) : false)
      .filter((p) => !isExcludedForSolution(solutionId, p));

    if (fromCategories.length > 0) return fromCategories;

    // fallback: produits scrapés (toujours cliquables)
    return products.filter(
      (p) => p.id.startsWith("sany-") || p.id.startsWith("fabo-")
    ).filter((p) => !isExcludedForSolution(solutionId, p));
  };

  const preferredSuggestedProductIds: Record<string, string[]> = {
    manutention: [
      "toyota-traigo80-4roues-15-35t",
      "toyota-traigo80-4roues-4-8t",
      "toyota-vna-cabine-sol",
      "toyota-transpalettes-gerbeurs-mat-retractable-automatises",
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
    ],
    rayonnage: [
      "toyota-reflex-standard",
      "toyota-vna-cabine-sol",
      "toyota-gerbeur-swe",
    ],
    mines: [
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-0",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-1",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-2",
      "sany-series-off-highway-mining-truck-off-highway-mining-truck-3",
      "sany-series-mining-tunneling-off-highway-mining-truck-0",
      "sany-series-mining-tunneling-off-highway-mining-truck-1",
      "sany-series-mining-tunneling-roadheader-0",
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

  type LocalizedLabel = { fr: string; en: string; es: string };
  const solutionToSanySeriesLinks: Record<
    string,
    Array<{ label: LocalizedLabel; subtitle: LocalizedLabel; href: string }>
  > = {
    mines: [
      {
        label: {
          fr: "Camion Minier Tout-terrain 40 - 70T",
          en: "Off-Highway Mining Truck 40 - 70T",
          es: "Camión Minero Todo Terreno 40 - 70T",
        },
        subtitle: { fr: "Séries SKT, SAT, SRT", en: "SKT, SAT, SRT series", es: "Series SKT, SAT, SRT" },
        href: "/marque/sany/mining-tunneling/off-highway-mining-truck",
      },
      {
        label: {
          fr: "Camion Minier Tout-terrain 90 - 220T",
          en: "Off-Highway Mining Truck 90 - 220T",
          es: "Camión Minero Todo Terreno 90 - 220T",
        },
        subtitle: { fr: "Séries SET, SKT large", en: "SET, SKT large series", es: "Series SET, SKT large" },
        href: "/marque/sany/mining-tunneling/off-highway-mining-truck",
      },
      {
        label: {
          fr: "Tunnelier à Bras (Roadheader)",
          en: "Roadheader",
          es: "Rozadora de Brazo (Roadheader)",
        },
        subtitle: { fr: "Séries EBZ, STR, SCR", en: "EBZ, STR, SCR series", es: "Series EBZ, STR, SCR" },
        href: "/marque/sany/mining-tunneling/roadheader",
      },
    ],
    terrassement: [
      {
        label: {
          fr: "Pompe mobile",
          en: "Mobile pump",
          es: "Bomba móvil",
        },
        subtitle: {
          fr: "SANY Concrete Machinery",
          en: "SANY Concrete Machinery",
          es: "SANY Concrete Machinery",
        },
        href: "/marque/sany/pompe-mobile",
      },
      {
        label: {
          fr: "Camion malaxeur",
          en: "Truck mixer",
          es: "Camión hormigonera",
        },
        subtitle: {
          fr: "SANY Truck Mixer",
          en: "SANY Truck Mixer",
          es: "SANY Truck Mixer",
        },
        href: "/marque/sany/camion-malaxeur",
      },
      {
        label: {
          fr: "Pompe stationnaire",
          en: "Stationary pump",
          es: "Bomba estacionaria",
        },
        subtitle: {
          fr: "SANY Stationary Concrete Pump",
          en: "SANY Stationary Concrete Pump",
          es: "SANY Stationary Concrete Pump",
        },
        href: "/marque/sany/pompe-stationnaire",
      },
      {
        label: {
          fr: "Pelles hydrauliques — Toute la gamme",
          en: "Hydraulic Excavators — Full range",
          es: "Excavadoras hidráulicas — Toda la gama",
        },
        subtitle: {
          fr: "Mini, Moyenne, Grande Excavatrice",
          en: "Mini, Medium, Large Excavator",
          es: "Mini, Mediana, Gran Excavadora",
        },
        href: "/marque/sany/excavator",
      },
      {
        label: {
          fr: "Pelles sur Pneus",
          en: "Wheel Excavator",
          es: "Excavadora sobre Ruedas",
        },
        subtitle: { fr: "SY155W, SY165W", en: "SY155W, SY165W", es: "SY155W, SY165W" },
        href: "/marque/sany/excavator/wheel-excavator",
      },
      {
        label: {
          fr: "Chargeuses sur Pneus",
          en: "Wheel Loaders",
          es: "Cargadoras sobre Ruedas",
        },
        subtitle: {
          fr: "Chargeuses SANY pour chargement et manutention",
          en: "SANY loaders for loading and material handling",
          es: "Cargadoras SANY para carga y manipulación",
        },
        href: "/marque/sany/wheel-loader/chargeuse-sur-pneus",
      },
      {
        label: {
          fr: "Tractopelle",
          en: "Backhoe Loader",
          es: "Retroexcavadora",
        },
        subtitle: { fr: "BHL95", en: "BHL95", es: "BHL95" },
        href: "/marque/sany/wheel-loader/chargeuse-pelleteuse",
      },
      {
        label: {
          fr: "Mini pelle",
          en: "Mini Excavator",
          es: "Mini excavadora",
        },
        subtitle: { fr: "SANY Mini Excavator", en: "SANY Mini Excavator", es: "SANY Mini Excavator" },
        href: "/marque/sany/excavator/mini-excavator",
      },
      {
        label: {
          fr: "Moyenne pelle",
          en: "Medium Excavator",
          es: "Excavadora mediana",
        },
        subtitle: { fr: "SANY Medium Excavator", en: "SANY Medium Excavator", es: "SANY Medium Excavator" },
        href: "/marque/sany/excavator/medium-excavator",
      },
      {
        label: {
          fr: "Centrales à béton",
          en: "Concrete batching plants",
          es: "Plantas de hormigón",
        },
        subtitle: { fr: "FABO mobiles et fixes", en: "FABO mobile and stationary", es: "FABO móviles y fijas" },
        href: "/marque/fabo/centrale-beton",
      },
      {
        label: {
          fr: "Malaxeurs autochargeants AJAX",
          en: "AJAX self-loading mixers",
          es: "Mezcladoras autocargables AJAX",
        },
        subtitle: { fr: "ARGO 2000 à 4000", en: "ARGO 2000 to 4000", es: "ARGO 2000 a 4000" },
        href: "/marque/ajax",
      },
    ],
    transport: [
      {
        label: {
          fr: "Camions SANY — Toute la gamme",
          en: "SANY Trucks — Full range",
          es: "Camiones SANY — Toda la gama",
        },
        subtitle: {
          fr: "Camions bennes et tracteurs",
          en: "Dump trucks and tractors",
          es: "Volquetes y tractores",
        },
        href: "/marque/sany/truck",
      },
      {
        label: {
          fr: "Camion Benne 8x4",
          en: "Dump Truck 8x4",
          es: "Camión Volquete 8x4",
        },
        subtitle: { fr: "SYZ420C-8S(V)", en: "SYZ420C-8S(V)", es: "SYZ420C-8S(V)" },
        href: "/marque/sany/truck/dump-truck",
      },
      {
        label: {
          fr: "Tracteur Semi-Remorque",
          en: "Semi-Trailer Tractor",
          es: "Tractor Semi-Remolque",
        },
        subtitle: {
          fr: "Électrique & Diesel",
          en: "Electric & Diesel",
          es: "Eléctrico y Diésel",
        },
        href: "/marque/sany/truck/semi-trailer-tractor",
      },
    ],
    portuaire: [
      {
        label: {
          fr: "Portuaire SANY — Toute la gamme",
          en: "SANY Port Machinery — Full range",
          es: "Maquinaria Portuaria SANY — Toda la gama",
        },
        subtitle: {
          fr: "Reach stackers, portiques, tracteurs, chariots télescopiques",
          en: "Reach stackers, cranes, tractors, telehandlers",
          es: "Reach stackers, grúas, tractores, manipuladores telescópicos",
        },
        href: "/marque/sany/port-machinery",
      },
      {
        label: {
          fr: "Reach Stacker",
          en: "Reach Stacker",
          es: "Reach Stacker",
        },
        subtitle: {
          fr: "Manutention de conteneurs pleins",
          en: "Loaded container handling",
          es: "Manipulación de contenedores cargados",
        },
        href: "/marque/sany/port-machinery/reach-stacker",
      },
      {
        label: {
          fr: "Chariots Télescopiques",
          en: "Telehandlers",
          es: "Manipuladores Telescópicos",
        },
        subtitle: { fr: "STH1440, STH1840", en: "STH1440, STH1840", es: "STH1440, STH1840" },
        href: "/marque/sany/port-machinery/telehandler",
      },
    ],
    levage: [
      {
        label: {
          fr: "Grues — Toute la gamme",
          en: "Cranes — Full range",
          es: "Grúas — Toda la gama",
        },
        subtitle: {
          fr: "Truck, Crawler, All-terrain, Tower",
          en: "Truck, Crawler, All-terrain, Tower",
          es: "Truck, Crawler, All-terrain, Tower",
        },
        href: "/marque/sany/crane",
      },
      {
        label: {
          fr: "Grue Tout-terrain",
          en: "All-Terrain Crane",
          es: "Grúa Todo Terreno",
        },
        subtitle: {
          fr: "Séries SAC 60T → 1000T+",
          en: "SAC series 60T → 1000T+",
          es: "Series SAC 60T → 1000T+",
        },
        href: "/marque/sany/crane/all-terrain-crane",
      },
      {
        label: {
          fr: "Grue sur Chenilles",
          en: "Crawler Crane",
          es: "Grúa sobre Orugas",
        },
        subtitle: {
          fr: "Séries SCC, SCE 25T → 22000T",
          en: "SCC, SCE series 25T → 22000T",
          es: "Series SCC, SCE 25T → 22000T",
        },
        href: "/marque/sany/crane/crawler-crane",
      },
      {
        label: {
          fr: "Grue Automotrice (Truck Crane)",
          en: "Truck Crane",
          es: "Grúa Automotriz (Truck Crane)",
        },
        subtitle: {
          fr: "Séries STC 12 - 160T",
          en: "STC series 12 - 160T",
          es: "Series STC 12 - 160T",
        },
        href: "/marque/sany/crane/truck-crane",
      },
    ],
  };

  const getSuggestedProducts = (solutionId: string) => {
    const candidates = getProductsForSolution(solutionId);

    const preferredIds = preferredSuggestedProductIds[solutionId] || [];
    if (preferredIds.length > 0) {
      const preferred = preferredIds
        .map((id) => products.find((p) => p.available !== false && p.id === id))
        .filter((p) => p ? !isExcludedForSolution(solutionId, p) : false)
        .filter((p): p is (typeof products)[number] => Boolean(p));
      if (preferred.length > 0) {
        return preferred.slice(0, ["mines", "terrassement"].includes(solutionId) ? 8 : 3);
      }
    }

    return [...candidates]
      .sort((a, b) => {
        const aScraped = a.id.startsWith("sany-") || a.id.startsWith("fabo-");
        const bScraped = b.id.startsWith("sany-") || b.id.startsWith("fabo-");
        if (aScraped !== bScraped) return aScraped ? -1 : 1;
        if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
        return 0;
      })
      .slice(0, 3);
  };

  const getFeatureLinkHref = (feature: string, candidates: typeof products) => {
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
        ? candidates.find((p) => p.category === matchedCategory)
        : undefined) ?? candidates[0];

    return candidate ? `/produits/${candidate.id}` : "/produits";
  };

  void getFeatureLinkHref;

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
              {t.solutions.title}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 w-12 bg-red-600"></div>
              <div className="w-2 h-2 rounded-full bg-red-600"></div>
              <div className="h-0.5 w-12 bg-red-600"></div>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t.solutions.description}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-12 sm:py-16 md:py-20">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                id={solution.id}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-8 lg:gap-16 items-center`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <Link href={`/solutions/${solution.id}`}>
                    <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                      <Image
                        src={solution.image}
                        alt={getLocalizedText(solution.title, language)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                    </div>
                  </Link>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#dc2626] font-bold uppercase tracking-wider text-sm sm:text-base">
                      {getLocalizedText(solution.title, language)}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                    {getLocalizedText(solution.subtitle, language)}
                  </h2>

                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                    {getLocalizedText(solution.description, language)}
                  </p>

                  <div>
                    {/* <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#dc2626]" />
                      {t.solutions.weOffer}
                    </h3> */}
                    {solution.id === "rayonnage" ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {rayonnageElements.slice(0, 4).map((el) => (
                          <Link
                            key={el.id}
                            href={`/marque/atox#${el.id}`}
                            className="group flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 hover:border-[#dc2626] hover:shadow-md transition-all overflow-hidden"
                          >
                            <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                              <Image
                                src={el.images[0]}
                                alt={el.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                            <span className="flex-1 text-sm text-gray-700 group-hover:text-[#dc2626] transition-colors font-medium line-clamp-2">
                              {el.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    ) : (

                      null
                      // <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      //   {solution.features.slice(0, 4).map((feature, idx) => {
                      //     const candidates = getProductsForSolution(solution.id);
                      //     const href = getFeatureLinkHref(feature, candidates);
                      //     return (
                      //       <li key={idx}>
                      //         <Link
                      //           href={href}
                      //           className="group flex items-start gap-2 text-sm sm:text-base text-gray-700 hover:text-[#dc2626] transition-colors"
                      //         >
                      //           <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mt-2 shrink-0"></span>
                      //           <span className="flex-1">{feature}</span>
                      //           <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                      //         </Link>
                      //       </li>
                      //     );
                      //   })}
                      // </ul>
                    )}
                  </div> 

                  {solution.id !== "rayonnage" && (
                    <div className="mb-8">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#dc2626]" />
                        {t.solutions.suggestedProductsTitle}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {getSuggestedProducts(solution.id).map((product) => (
                          <Link
                            key={product.id}
                            href={`/produits/${product.id}`}
                            className="group bg-white rounded-xl border border-gray-200 hover:border-[#dc2626] hover:shadow-lg transition-all overflow-hidden"
                          >
                            <div className="relative h-48 bg-white">
                              <Image
                                src={product.image}
                                alt={getLocalizedText(
                                  product.shortTitle || product.title,
                                  language
                                )}
                                fill
                                className={`object-contain p-3 group-hover:scale-105 transition-transform duration-300 ${product.id === "teksan-tours-eclairage"
                                  ? "object-left"
                                  : product.id === "teksan-tour-eclairage-solaire"
                                    ? "object-right"
                                    : ""
                                  }`}
                                unoptimized={product.brand === "SUNWARD"}
                              />
                            </div>
                            <div className="p-4">
                              <p className="text-xs font-bold text-[#dc2626] uppercase tracking-wide">
                                {product.brand}
                              </p>
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 mt-1">
                                {getLocalizedText(
                                  product.shortTitle || product.title,
                                  language
                                )}
                              </p>
                              <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 group-hover:text-[#dc2626] transition-colors mt-3">
                                {t.solutions.viewProduct}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {(solutionToSanySeriesLinks[solution.id] || []).length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#dc2626] bg-red-50 px-2 py-0.5 rounded-full">
                              SANY
                            </span>
                            {t.solutions.directSeries}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {(solutionToSanySeriesLinks[solution.id] || []).map((link) => {
                              const linkLabel = getLocalizedText(link.label, language);
                              const linkSubtitle = getLocalizedText(link.subtitle, language);
                              return (
                              <Link
                                key={`${link.label.fr}-${link.href}`}
                                href={link.href}
                                className="group flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-[#dc2626] hover:shadow-md transition-all"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-1">
                                    {linkLabel}
                                  </p>
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {linkSubtitle}
                                  </p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
                              </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {solution.id === "rayonnage" && (
                    <div className="mb-6">
                      <Link
                        href="/marque/atox"
                        className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold px-5 py-3 rounded-lg transition-colors"
                      >
                        {t.solutions.discoverAtoxBrand}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={`/solutions/${solution.id}`} className="flex-1">
                      <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 sm:px-8 py-3 sm:py-6 text-base font-bold uppercase group w-full">
                        {t.solutions.learnMore}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/devis" className="flex-1">
                      <Button
                        variant="outline"
                        className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 sm:px-8 py-3 sm:py-6 text-base font-bold uppercase w-full"
                      >
                        {t.solutions.getQuote}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </section>

      {/* Solutions par Marques */}
      <section
        id="solutions-par-marques"
        className="py-16 sm:py-24 "
        style={{ scrollMarginTop: "var(--site-header-height, 80px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t.solutions.brandSolutions}
            </h2>
            <p className="text-base sm:text-lg  max-w-2xl mx-auto leading-relaxed">
              {t.solutions.brandSolutionsShortDesc}
            </p>
          </div>

          {/* "Comparateurs et fiches techniques" badge */}
          {/* <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 bg-red-700/20 border border-red-600/40 text-red-400 text-sm font-semibold px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Comparateurs et fiches techniques détaillées disponibles sur chaque page marque
            </span>
          </div> */}

          {/* Brand grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/marque/${toBrandSlug(brand.name)}`}
                className="group bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-4 shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border-2 border-transparent hover:border-red-600"
              >
                <div className="relative w-full h-20 sm:h-24 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={160}
                    height={80}
                    className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {/* <div className="flex items-center gap-1 text-sm font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors">
                  {brand.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                </div> */}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/nos-marques"
              className="bg-red-600 hover:bg-red-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold uppercase rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
            >
              {t.solutions.viewAllBrands}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection
        title={t.solutions.specificProject}
        description={t.solutions.specificProjectDesc}
        primaryAction={{ href: "/contact", label: t.solutions.speakWithExpert }}
        secondaryAction={{ href: "/devis", label: t.solutions.getQuoteBtn }}
      />
    </div>
  );
}
