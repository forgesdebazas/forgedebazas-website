import { faboScrapedProducts } from "@/data/faboScrapedProducts";
import { faboOfficialMobileProducts } from "@/data/faboOfficialMobileProducts";
import {
  faboOfficialStationaryCategoryImage,
  faboOfficialStationaryProducts,
} from "@/data/faboOfficialStationaryProducts";
import type { Product, ProductVariant } from "@/lib/types";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface FaboSubcategory {
  slug: string;
  nameFr: string;
  nameEn: string;
  nameEs: string;
  /** product.category values belonging to this subcategory */
  productCategories: string[];
  /** optional explicit product IDs (used for Powermix-only fixes) */
  productIds?: string[];
  image?: string;
}

export interface FaboCategory {
  slug: string;
  nameFr: string;
  nameEn: string;
  nameEs: string;
  descriptionFr: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  /** Visual grouping label shown on landing page */
  sectionFr?: string;
  sectionEn?: string;
  sectionEs?: string;
  subcategories: FaboSubcategory[];
}

// ─────────────────────────────────────────────
// Catalog definition
// ─────────────────────────────────────────────

export const FABO_CATALOG: FaboCategory[] = [
  // ── 1. CONCASSAGE MOBILE ──────────────────
  {
    slug: "concassage-mobile",
    nameFr: "Concasseurs Mobiles",
    nameEn: "Mobile Crushers",
    nameEs: "Trituradoras Móviles",
    sectionFr: "Équipement de Concassage",
    sectionEn: "Crushing Equipment",
    sectionEs: "Equipos de Trituración",
    descriptionFr:
      "Concasseurs mobiles sur chenilles – mobilité maximale, performance optimale sur tous les chantiers.",
    descriptionEn:
      "Mobile tracked crushers – maximum mobility, optimal performance on every job site.",
    descriptionEs:
      "Trituradoras móviles sobre orugas – máxima movilidad, rendimiento óptimo en cualquier obra.",
    image:
      "https://fabo.com.tr/wp-content/uploads/2023/10/Concasseurs-Mobiles.webp",
    subcategories: [
      {
        slug: "concasseurs-mobiles-sur-chenilles",
        nameFr: "Concasseurs Mobiles sur Chenilles",
        nameEn: "Mobile Tracked Crushers",
        nameEs: "Trituradoras Móviles sobre Orugas",
        productCategories: ["concasseurs-mobiles-chenilles"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2023/04/Concasseurs-Mobiles-sur-Chenilless.webp",
      },
      {
        slug: "cribles-vibrants-mobile-sur-chenilles",
        nameFr: "Cribles Vibrants Mobile sur Chenilles",
        nameEn: "Mobile Tracked Vibrating Screens",
        nameEs: "Cribas Vibratorias Moviles sobre Orugas",
        productCategories: ["cribles-vibrants-mobile-sur-chenilles"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2023/04/Installations-de-Concassage-Mobiles-sur-Chenilles.webp",
      },
      {
        slug: "crible-de-scalpeur-sur-chenilles",
        nameFr: "FTB 15-50 Crible De Scalpeur Sur Chenilles",
        nameEn: "FTB 15-50 Tracked Scalper Screen",
        nameEs: "FTB 15-50 Criba Scalper sobre Orugas",
        productCategories: ["crible-de-scalpeur-sur-chenilles"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2023/10/FTB-15-50-Crible-De-Scalpeur-Sur-Chenilles.webp",
      },
    ],
  },

  // ── 2. CONCASSAGE FIXE ────────────────────
  {
    slug: "concassage-semi-mobile",
    nameFr: "Concassage Semi Mobile",
    nameEn: "Semi-Mobile Crushing",
    nameEs: "Trituración Semi Móvil",
    sectionFr: "Équipement de Concassage",
    sectionEn: "Crushing Equipment",
    sectionEs: "Equipos de Trituración",
    descriptionFr:
      "Installations de concassage semi mobiles FABO - solutions compactes et performantes pour la production de granulats.",
    descriptionEn:
      "FABO semi-mobile crushing plants - compact, high-performance solutions for aggregate production.",
    descriptionEs:
      "Plantas de trituración semi móviles FABO - soluciones compactas y de alto rendimiento para producción de áridos.",
    image:
      "https://fabo.com.tr/wp-content/uploads/2022/12/Concasseur-Mobile-a-Percussion-1.jpg",
    subcategories: [
      {
        slug: "concasseur-mobile-a-percussion",
        nameFr: "Concasseur Mobile a Percussion",
        nameEn: "Mobile Impact Crusher",
        nameEs: "Trituradora Movil de Impacto",
        productCategories: ["concasseur-mobile-a-percussion"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2022/12/Concasseur-Mobile-a-Percussion-1.jpg",
      },
      {
        slug: "machines-de-fabrication-de-sable-mobile",
        nameFr: "Machines de Fabrication de Sable Mobile",
        nameEn: "Mobile Sand Making Machines",
        nameEs: "Maquinas Moviles de Fabricacion de Arena",
        productCategories: ["machines-de-fabrication-de-sable-mobile"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2024/12/Machines-de-Fabrication-de-Sable-Mobile-055457.webp",
      },
      {
        slug: "concasseurs-mobiles-et-criblage-et-lavage",
        nameFr: "Concasseurs Mobiles et Criblage et Lavage",
        nameEn: "Mobile Crushers, Screening and Washing",
        nameEs: "Trituradoras Moviles, Cribado y Lavado",
        productCategories: ["concasseurs-mobiles-et-criblage-et-lavage"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/12/Concasseurs-Mobiles-et-Criblage-et-Lavage-1.jpg",
      },
      {
        slug: "installations-mobiles-de-criblage-et-de-lavage",
        nameFr: "Installations mobiles de criblage et de lavage",
        nameEn: "Mobile Screening and Washing Plants",
        nameEs: "Instalaciones Moviles de Cribado y Lavado",
        productCategories: ["installations-mobiles-de-criblage-et-de-lavage"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/11/Installations-mobiles-de-criblage-et-de-lavage.jpg",
      },
      {
        slug: "usine-de-concassage-primaire-mobile",
        nameFr: "Usine de Concassage Primaire Mobile",
        nameEn: "Mobile Primary Crushing Plant",
        nameEs: "Planta Movil de Trituracion Primaria",
        productCategories: ["usine-de-concassage-primaire-mobile"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2023/04/Usine-de-Concassage-Primaire-Mobile.webp",
      },
      {
        slug: "usine-de-concassage-et-criblage-secondaire",
        nameFr: "Usine de Concassage et Criblage Secondaire",
        nameEn: "Mobile Secondary Crushing and Screening Plant",
        nameEs: "Planta Movil de Trituracion y Cribado Secundaria",
        productCategories: ["usine-de-concassage-et-criblage-secondaire"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2022/01/Usine-de-Concassage-et-Criblage-Secondaire.jpg",
      },
      {
        slug: "installation-de-concassage-a-percussion-mobile-a-arbre-vertical",
        nameFr: "Installation de Concassage a Percussion Mobile a-Arbre Vertical",
        nameEn: "Mobile Vertical Shaft Impact Crushing Plant",
        nameEs: "Planta Movil de Trituracion de Impacto de Eje Vertical",
        productCategories: ["installation-de-concassage-a-percussion-mobile-a-arbre-vertical"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/08/Installation-de-Concassage-a-Percussion-Mobile-a-Arbre-Vertical.jpg",
      },
      {
        slug: "concasseur-a-machoire-mobile-type-container",
        nameFr: "Concasseur a Machoire Mobile Type Container",
        nameEn: "Container Type Mobile Jaw Crusher",
        nameEs: "Trituradora Movil de Mandibulas Tipo Contenedor",
        productCategories: ["concasseur-a-machoire-mobile-type-container"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/09/Concasseur-a-Machoire-Mobile-Type-1Container-min.jpg",
      },
    ],
  },

  {
    slug: "concassage-fixe",
    nameFr: "Concassage Fixe",
    nameEn: "Stationary Crushing",
    nameEs: "Trituración Fija",
    sectionFr: "Équipement de Concassage",
    sectionEn: "Crushing Equipment",
    sectionEs: "Equipos de Trituración",
    descriptionFr:
      "Stations de concassage fixes – une gamme complète pour chaque étape du processus de concassage.",
    descriptionEn:
      "Stationary crushing plants – a full range covering every crushing stage.",
    descriptionEs:
      "Plantas de trituración fijas – gama completa para cada etapa del proceso de trituración.",
    image: faboOfficialStationaryCategoryImage,
    subcategories: [
      {
        slug: "station-de-concassage-fixes",
        nameFr: "Station de Concassage Fixes",
        nameEn: "Stationary Crushing Plants",
        nameEs: "Plantas Trituradoras Estacionarias",
        productCategories: ["station-de-concassage-fixes"],
        image: faboOfficialStationaryCategoryImage,
      },
      {
        slug: "concasseurs-a-machoires",
        nameFr: "Concasseurs à Mâchoires",
        nameEn: "Jaw Crushers",
        nameEs: "Trituradoras de Mandíbulas",
        productCategories: ["concasseurs-a-machoires"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Concasseurs-a-Machoires.jpg",
      },
      {
        slug: "concasseur-percussion-primaire",
        nameFr: "Concasseur à Percussion Primaire",
        nameEn: "Primary Impact Crusher",
        nameEs: "Trituradora de Impacto Primaria",
        productCategories: ["concasseur-percussion-primaire"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/10/Concasseur-a-Perc2ussion-Primaire-min.jpg",
      },
      {
        slug: "broyeur-percussion-secondaire-dmk",
        nameFr: "Broyeur à Percussion Secondaire DMK",
        nameEn: "Secondary Impact Crusher DMK",
        nameEs: "Trituradora de Impacto Secundaria DMK",
        productCategories: ["broyeur-percussion-secondaire-dmk"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Broyeur-a-Percussion-Secondaire-DMK-2-1.jpg",
      },
      {
        slug: "concasseurs-percussion-arbre-vertical",
        nameFr: "Concasseurs à Percussion à Arbre Vertical",
        nameEn: "Vertical Shaft Impact Crushers (VSI)",
        nameEs: "Trituradoras de Eje Vertical (VSI)",
        productCategories: ["concasseurs-percussion-arbre-vertical"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Concasseurs-a-percussion-a-arbre-vertical.jpg",
      },
      {
        slug: "concasseurs-a-cone",
        nameFr: "Concasseurs à Cône",
        nameEn: "Cone Crushers",
        nameEs: "Trituradoras de Cono",
        productCategories: ["concasseurs-a-cone"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Concasseurs-a-Cone.jpg",
      },
      {
        slug: "concasseurs-tertiaire",
        nameFr: "Concasseurs Tertiaire",
        nameEn: "Tertiary Crushers",
        nameEs: "Trituradoras Terciarias",
        productCategories: ["concasseurs-tertiaire"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Concasseurs-Tertiaire.jpg",
      },
      {
        slug: "crible-vibrant",
        nameFr: "Crible Vibrant",
        nameEn: "Vibrating Screen",
        nameEs: "Criba Vibratoria",
        productCategories: ["crible-vibrant"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Crible-Vibrant-2.jpg",
      },
      {
        slug: "tremie-alimentation-vibrante",
        nameFr: "Trémie D'alimentation Vibrante",
        nameEn: "Vibrating Feeder Hopper",
        nameEs: "Tolva de Alimentación Vibrante",
        productCategories: ["tremie-alimentation-vibrante"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Tremie-Dalimentation-Vibrante.jpg",
      },
      {
        slug: "crible-deshydratation-hydrocyclone",
        nameFr: "Crible de Déshydratation Hydrocyclone",
        nameEn: "Dewatering Hydrocyclone Screen",
        nameEs: "Criba de Deshidratación con Hidrociclón",
        productCategories: ["crible-deshydratation-hydrocyclone"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Crible-de-deshydratation-hydrocyclone-min.jpg",
      },
      {
        slug: "vis-lavage-sable",
        nameFr: "Vis de Lavage à Sable",
        nameEn: "Sand Washing Screw",
        nameEs: "Tornillo de Lavado de Arena",
        productCategories: ["vis-lavage-sable"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Vis-de-Lavage-a-Sable.jpg",
      },
      {
        slug: "rondolle-de-godet",
        nameFr: "Rondolle de Godet",
        nameEn: "Bucket Wheel Washer",
        nameEs: "Lavadora de Rueda de Cangilones",
        productCategories: ["rondolle-de-godet"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Rondolle-de-Godet.jpg",
      },
      {
        slug: "alimentateur-ondule",
        nameFr: "Alimentateur Ondulé",
        nameEn: "Wobbler Feeder",
        nameEs: "Alimentador Wobbler",
        productCategories: ["alimentateur-ondule"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Alimentateur-wobbler.jpg",
      },
      {
        slug: "laveurs-particule-grossiere",
        nameFr: "Laveurs De Particule Grossière",
        nameEn: "Coarse Material Washer",
        nameEs: "Lavador de Partículas Gruesas",
        productCategories: ["laveurs-particule-grossiere"],
        image:
          "https://fabo-59e2.kxcdn.com/wp-content/uploads/2021/08/Laveurs-De-Particule-Grossiere.jpg",
      },
    ],
  },

  // ── 3. CENTRALE À BÉTON ───────────────────
  {
    slug: "centrale-beton",
    nameFr: "Centrale à Béton",
    nameEn: "Concrete Batching Plants",
    nameEs: "Plantas de Hormigón",
    sectionFr: "Centrale à Béton",
    sectionEn: "Concrete Plants",
    sectionEs: "Plantas de Hormigón",
    descriptionFr:
      "Centrales à béton mobiles et fixes – pour chaque besoin en production de béton.",
    descriptionEn:
      "Mobile and stationary concrete batching plants – for every concrete production need.",
    descriptionEs:
      "Plantas de hormigón móviles y fijas – para cada necesidad de producción de hormigón.",
    image:
      "https://fabo.com.tr/wp-content/uploads/2021/08/mobile-concrete-batching-plant-1.jpg",
    subcategories: [
      {
        slug: "mobiles",
        nameFr: "Centrales à Béton Mobiles",
        nameEn: "Mobile Concrete Batching Plants",
        nameEs: "Plantas de Hormigón Móviles",
        productCategories: ["centrales-beton-mobiles"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/08/mobile-concrete-batching-plant-1.jpg",
      },
      {
        slug: "fixes",
        nameFr: "Centrales à Béton Fixes",
        nameEn: "Stationary Concrete Batching Plants",
        nameEs: "Plantas de Hormigón Fijas",
        productCategories: ["centrales-beton-fixes"],
        image:
          "https://fabo.com.tr/wp-content/uploads/2021/04/powermix60-concrete-batching-plant-3-1024x575.jpg",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

export function getFaboCategories(): FaboCategory[] {
  return FABO_CATALOG;
}

export function getFaboCategoryBySlug(slug: string): FaboCategory | undefined {
  return FABO_CATALOG.find((c) => c.slug === slug);
}

export function getFaboSubcategoryBySlug(
  categorySlug: string,
  subSlug: string
): FaboSubcategory | undefined {
  const cat = getFaboCategoryBySlug(categorySlug);
  return cat?.subcategories.find((s) => s.slug === subSlug);
}

export function getProductsForSubcategory(sub: FaboSubcategory): Product[] {
  const allProducts = [
    ...faboScrapedProducts,
    ...faboOfficialMobileProducts,
    ...faboOfficialStationaryProducts,
  ];
  let products = allProducts.filter((p) =>
    sub.productCategories.includes(p.category)
  );
  if (sub.productIds && sub.productIds.length > 0) {
    products = products.filter((p) => sub.productIds!.includes(p.id));
  }
  return products;
}

export function getFaboModelCountForProduct(product: Product): number {
  return product.variants && product.variants.length > 0
    ? product.variants.length
    : 1;
}

export function getFaboModelCountForSubcategory(sub: FaboSubcategory): number {
  return getProductsForSubcategory(sub).reduce(
    (acc, product) => acc + getFaboModelCountForProduct(product),
    0
  );
}

export function getProductCountForCategory(cat: FaboCategory): number {
  return cat.subcategories.reduce(
    (acc, sub) => acc + getFaboModelCountForSubcategory(sub),
    0
  );
}

export function getFaboCatalogTotals() {
  const totalProducts = FABO_CATALOG.reduce(
    (acc, cat) => acc + getProductCountForCategory(cat),
    0
  );
  const totalCategories = FABO_CATALOG.length;
  const totalSubcategories = FABO_CATALOG.reduce(
    (acc, cat) => acc + cat.subcategories.length,
    0
  );
  return { totalProducts, totalCategories, totalSubcategories };
}

/** Strip "fabo-" prefix to get a clean URL slug */
export function getProductSlug(productId: string): string {
  return productId.replace(/^fabo-/, "");
}

/** Re-attach "fabo-" prefix to reconstruct the product ID from a URL slug */
export function getProductIdFromSlug(slug: string): string {
  return slug.startsWith("fabo-") ? slug : `fabo-${slug}`;
}

/** Find a product within a subcategory by its URL slug */
export function findProductInSubcategory(
  sub: FaboSubcategory,
  productSlug: string
): Product | undefined {
  const products = getProductsForSubcategory(sub);
  const targetId = getProductIdFromSlug(productSlug);
  return products.find((p) => p.id === targetId);
}

/** Find a variant on a product by its slug */
export function findVariantOnProduct(
  product: Product,
  variantSlug: string
): ProductVariant | undefined {
  return product.variants?.find((v) => v.slug === variantSlug);
}
