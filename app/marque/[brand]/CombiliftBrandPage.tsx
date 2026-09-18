"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/contexts/LanguageContext";
import CtaSection from "@/components/ui/CtaSection";
import BrandHeroSection from "./BrandHeroSection";

const COMBILIFT_WEBSITE = "https://combilift.com/my-combilift-public/";

interface CombiliftProduct {
  id: string;
  title: { fr: string; en: string; es: string };
  description: { fr: string; en: string; es: string };
  type: string;
  capacity: string;
  height: string;
  image: string;
}

const COMBILIFT_PRODUCTS: CombiliftProduct[] = [
  {
    id: "combilift-aisle-master",
    title: {
      fr: "AISLE MASTER",
      en: "AISLE MASTER",
      es: "AISLE MASTER",
    },
    description: {
      fr: "Chariot multidirectionnel pour allées étroites, capacité 1.5T à 3T, hauteur de levée jusqu'à 15 000 mm.",
      en: "Multidirectional forklift for narrow aisles, capacity 1.5T to 3T, lift height up to 15,000 mm.",
      es: "Carretilla multidireccional para pasillos estrechos, capacidad 1.5T a 3T, altura de elevación hasta 15 000 mm.",
    },
    type: "AM",
    capacity: "1.5T – 3T",
    height: "4 300 mm – 15 000 mm",
    image: "/images/combo/Chariot_Multidirectionnel.jpg",
  },
  {
    id: "combilift-combi-cs",
    title: {
      fr: "GERBEUR À CONTRE POIDS",
      en: "COUNTERBALANCE STACKER",
      es: "APILADOR CONTRAPESADO",
    },
    description: {
      fr: "Gerbeur à contre poids Combi-CS, compact et maniable, capacité 1T à 2T, hauteur standard 2 500 mm.",
      en: "Combi-CS counterbalance stacker, compact and manoeuvrable, capacity 1T to 2T, standard height 2,500 mm.",
      es: "Apilador contrapesado Combi-CS, compacto y maniobrable, capacidad 1T a 2T, altura estándar 2 500 mm.",
    },
    type: "Combi-CS",
    capacity: "1T – 2T",
    height: "Standard 2 500 mm",
    image:
      "https://aisle-master.com/wp-content/uploads/2021/06/combi-cs-gallery-image.png",
  },
  {
    id: "combilift-combi-cb",
    title: {
      fr: "CHARIOT À CONTRE POIDS MULTIDIRECTIONNEL",
      en: "MULTIDIRECTIONAL COUNTERBALANCE FORKLIFT",
      es: "CARRETILLA CONTRAPESADA MULTIDIRECCIONAL",
    },
    description: {
      fr: "Chariot à contre poids multidirectionnel Combi-CB, capacité 2.5T à 3T, hauteur 4 000 mm à 6 000 mm.",
      en: "Combi-CB multidirectional counterbalance forklift, capacity 2.5T to 3T, height 4,000 mm to 6,000 mm.",
      es: "Carretilla contrapesada multidireccional Combi-CB, capacidad 2.5T a 3T, altura 4 000 mm a 6 000 mm.",
    },
    type: "Combi-CB",
    capacity: "2.5T – 3T",
    height: "4 000 mm – 6 000 mm",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8au0NIHDX5YeDtxeXZoBX4N71yto0ulKNR4o8FeKMjbznalCWGmujQgI&s=10",
  },
  {
    id: "combilift-c-series",
    title: {
      fr: "CHARIOT MULTIDIRECTIONNEL C-SERIES",
      en: "C-SERIES MULTIDIRECTIONAL FORKLIFT",
      es: "CARRETILLA MULTIDIRECCIONAL C-SERIES",
    },
    description: {
      fr: "Chariot multidirectionnel C-Series, gamme polyvalente pour charges longues, capacité 2.5T à 25T.",
      en: "C-Series multidirectional forklift, versatile range for long loads, capacity 2.5T to 25T.",
      es: "Carretilla multidireccional C-Series, gama versátil para cargas largas, capacidad 2.5T a 25T.",
    },
    type: "C-Series",
    capacity: "2.5T – 25T",
    height: "Standard 4 040 mm",
    image: "https://combilift.com/wp-content/uploads/2024/07/C2500.jpg",
  },
  {
    id: "combilift-combi-css",
    title: {
      fr: "CHARGEMENT ET DÉCHARGEMENT DE CONTENEUR",
      en: "CONTAINER LOADING & UNLOADING",
      es: "CARGA Y DESCARGA DE CONTENEDORES",
    },
    description: {
      fr: "Combi-CSS spécialisé pour le chargement et déchargement de conteneurs, capacité 30T.",
      en: "Combi-CSS specialised for container loading and unloading, 30T capacity.",
      es: "Combi-CSS especializado en carga y descarga de contenedores, capacidad 30T.",
    },
    type: "Combi-CSS",
    capacity: "30T",
    height: "–",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPqAapiQz2a3aVaIKrzam4rkQUqQRv2QidWvjorG_T_uMaLmc_wUlhZ3_&s=10",
  },
  {
    id: "combilift-combi-sc",
    title: {
      fr: "PORTE CONTENEUR ET CHARGE LOURDE (STRADDLE CARRIER)",
      en: "CONTAINER & HEAVY LOAD CARRIER (STRADDLE CARRIER)",
      es: "PORTACONTENEDORES Y CARGA PESADA (STRADDLE CARRIER)",
    },
    description: {
      fr: "Combi-SC Straddle Carrier pour conteneurs et charges lourdes, capacité 20T à 100T, hauteur 5 000 à 7 000 mm.",
      en: "Combi-SC Straddle Carrier for containers and heavy loads, capacity 20T to 100T, height 5,000 to 7,000 mm.",
      es: "Combi-SC Straddle Carrier para contenedores y cargas pesadas, capacidad 20T a 100T, altura 5 000 a 7 000 mm.",
    },
    type: "Combi-SC",
    capacity: "20T – 100T",
    height: "5 000 mm – 7 000 mm",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd2iufPaKRaRIxuI93FFE2XVMfflVbBxdXqZvZaoPuLM-hXF2Vs7Cv93w&s=10",
  },
];

interface CombiliftBrandPageProps {
  brand: Brand;
}

export default function CombiliftBrandPage({ brand }: CombiliftBrandPageProps) {
  const { language, t } = useLanguage();

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{ paddingTop: "var(--site-header-height, 140px)" }}
    >
      <BrandHeroSection
        brand={brand}
        productCount={COMBILIFT_PRODUCTS.length}
        categoryCount={1}
        hideLogoCard={false}
      />

      {/* Products Grid — identical to Toyota/BrandClient standard grid */}
      <section id="catalogue" className="py-16 sm:py-20 lg:py-24 scroll-mt-32">
        <ScrollAnimation className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
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
                ? `Parcourez notre sélection de ${COMBILIFT_PRODUCTS.length} produits ${brand.name} disponibles.`
                : language === "es"
                  ? `Explore nuestra selección de ${COMBILIFT_PRODUCTS.length} productos ${brand.name} disponibles.`
                  : `Browse our selection of ${COMBILIFT_PRODUCTS.length} ${brand.name} products available.`}
            </p>
          </div>

          {/* 3-column card grid — same as BrandClient Toyota grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {COMBILIFT_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                {/* Product Image */}
                <Link
                  href="/devis"
                  className="relative block overflow-hidden bg-white flex-shrink-0 h-56 sm:h-64"
                >
                  <Image
                    src={product.image}
                    alt={product.title[language]}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                    unoptimized
                  />
                  {/* Brand badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <span className="text-[11px] font-bold text-gray-900 tracking-wide">
                      COMBILIFT
                    </span>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#dc2626] transition-colors line-clamp-2 mb-1.5 text-base leading-snug uppercase">
                    {product.title[language]}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                    {product.description[language]}
                  </p>

                  {/* Specs pills — max 2, same as Toyota */}
                  <div className="flex flex-wrap gap-1.5 mb-3 min-h-[28px]">
                    <span className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                      {product.capacity}
                    </span>
                    {product.height !== "–" && (
                      <span className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-full">
                        {product.height}
                      </span>
                    )}
                  </div>

                  {/* View details link */}
                  <a
                    href={COMBILIFT_WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#dc2626] font-semibold text-xs hover:gap-2.5 transition-all mb-3"
                  >
                    {t.actions.viewDetails}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

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
