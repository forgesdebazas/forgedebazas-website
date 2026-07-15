import type { Metadata } from "next";
import { brands } from "@/data/brands";
import BrandClient from "./BrandClient";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { toBrandSlug } from "@/lib/slug";
import {
  getSanyCatalog,
  getSanyCategories,
  getSanyCategoryPreviewImage,
  getSanyCategoryImageOverride,
  getSanySeriesPreviewImage,
  getSanyPrimaryProductImage,
  isSanyPromotedSubcategoryId,
  isSanyExcludedSubcategoryId,
  SANY_PROMOTED_SUBCATEGORIES,
  SANY_PROMOTED_SERIES,
  getSanyPromotedSubcategory,
  getSanyDisplayProductCountForSubCategory,
} from "@/lib/sanyCatalog";
import { SANY_SERIES_CONFIG } from "@/data/sanySeriesConfig";
import { getSunwardCatalog } from "@/lib/sunwardCatalog";
import SanyBrandOfficialPage from "./SanyBrandOfficialPage";
import SunwardBrandPage from "./SunwardBrandPage";
import AtoxBrandPage from "./AtoxBrandPage";
import EmakBrandPage from "./EmakBrandPage";
import FaboBrandPage from "./FaboBrandPage";
import { Suspense } from "react";

const SANY_EXCLUDED_CATEGORY_IDS = new Set([123, 56, 93, 58]);
/**
 * Display order on the SANY brand page (mix of real categories and
 * promoted subcategories shown as standalone categories). Identified by slug.
 */
const SANY_BRAND_PAGE_SLUG_ORDER = [
  "pompe-mobile",
  "pompe-stationnaire",
  "camion-malaxeur",
  "excavator",
  "wheel-excavator",
  "wheel-loader",
  "chargeuse-pelleteuse",
  "chargeuse-compacte-skid-steer",
  "crane",
  "crawler-crane",
  "port-machinery",
  "telehandler",
  "road-machinery",
  "motor-grader",
  "paver",
  "milling-machine",
  "mining-tunneling",
  "tombereaux-articules",
  "tombereaux-rigide",
  "truck",
  "off-highway-mining-truck",
  "semi-trailer-tractor",
  "piling-machinery",
  "fire-fighting-rescue",
  "petroleum-equipment",
  "wind-turbine",
  "photovoltaics",
];
function sanySlugOrderIndex(slug: string) {
  const i = SANY_BRAND_PAGE_SLUG_ORDER.indexOf(slug);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

interface Props {
  params: Promise<{ brand: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const normalized = brandSlug.toLowerCase();
  const brand = brands.find((b) => toBrandSlug(b.name) === normalized);

  if (!brand) {
    return buildMetadata({
      title: "Marque non trouvée",
      description: "La marque demandée est introuvable.",
      path: `/marque/${brandSlug}`,
      noIndex: true,
    });
  }

  if (brand.name.toUpperCase() === "SANY") {
    const totalProducts = getSanyCatalog().totals.totalProducts;
    return buildMetadata({
      title: "SANY",
      description: `Découvrez ${totalProducts} produits SANY`,
      path: `/marque/${brandSlug}`,
    });
  }

  if (brand.name.toUpperCase() === "SUNWARD") {
    const catalog = getSunwardCatalog();
    return buildMetadata({
      title: "SUNWARD Mining",
      description: `Découvrez ${catalog.totals.totalProducts} foreuses de surface SUNWARD Mining réparties en ${catalog.totals.totalCategories} catégories. Foreuses hors du trou, fond du trou et rotatives.`,
      path: `/marque/${brandSlug}`,
    });
  }

  return buildMetadata({
    title: brand.name,
    description: `Découvrez la gamme complète d'équipements ${brand.name} chez Forges de Bazas au Maroc. Solutions de haute performance pour la manutention, le levage et le BTP.`,
    path: `/marque/${brandSlug}`,
  });
}

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;
  const brand = brands.find(
    (b) => toBrandSlug(b.name) === brandSlug.toLowerCase()
  );

  if (!brand) {
    notFound();
  }

  if (brand.name.toUpperCase() === "SANY") {
    const sanyCategories = getSanyCategories().filter(
      (c) => !SANY_EXCLUDED_CATEGORY_IDS.has(c.categoryId),
    );

    // Real category cards — strip promoted and excluded subcategories so they
    // don't appear (twice or at all)
    const realCards = sanyCategories.flatMap((c) => {
      if (c.categorySlug === "concrete-machinery") return [];

      const visibleSubs = c.subCategories.filter(
        (s) =>
          !isSanyExcludedSubcategoryId(s.subCategoryId) &&
          getSanyDisplayProductCountForSubCategory(s) > 0,
      );
      const promotedHere = visibleSubs.some((s) =>
        isSanyPromotedSubcategoryId(s.subCategoryId),
      );
      const remainingSubs = visibleSubs.filter(
        (s) => !isSanyPromotedSubcategoryId(s.subCategoryId),
      );
      // If filtering removed every subcategory, hide the parent card entirely
      if ((promotedHere || visibleSubs.length !== c.subCategories.length) && remainingSubs.length === 0) return [];
      if (visibleSubs.length === 0) return [];

      const totalProducts = remainingSubs.reduce(
        (sum, sub) => sum + getSanyDisplayProductCountForSubCategory(sub),
        0,
      );
      const img = getSanyCategoryPreviewImage({ ...c, subCategories: remainingSubs });
      return [
        {
          categorySlug: c.categorySlug,
          categoryName: c.categoryName,
          totalProducts,
          subCategoryCount: remainingSubs.length,
          previewImage: img,
          isRemoteImage: img ? img.startsWith("http") : false,
        },
      ];
    });

    // Virtual cards — one per promoted subcategory
    const virtualCards = SANY_PROMOTED_SUBCATEGORIES.flatMap((cfg) => {
      if (cfg.slug === "tower-crane") return [];
      const found = getSanyPromotedSubcategory(cfg);
      if (!found) return [];
      const totalProducts = getSanyDisplayProductCountForSubCategory(found.sub);
      if (totalProducts === 0) return [];
      const img =
        getSanyCategoryImageOverride(cfg.slug) ??
        getSanySeriesPreviewImage(found.sub);
      return [
        {
          categorySlug: cfg.slug,
          categoryName: cfg.displayName,
          totalProducts,
          subCategoryCount: 1,
          previewImage: img,
          isRemoteImage: img ? img.startsWith("http") : false,
        },
      ];
    });

    // Virtual cards — one per promoted series (a specific rangeLabel inside
    // a subcategory shown as a top-level category, e.g. Tombereaux articulés).
    const seriesCards = SANY_PROMOTED_SERIES.flatMap((cfg) => {
      const parent = sanyCategories.find((c) => c.categoryId === cfg.parentCategoryId);
      const sub = parent?.subCategories.find((s) => s.subCategoryId === cfg.subCategoryId);
      if (!sub) return [];
      const def = (SANY_SERIES_CONFIG[cfg.subCategoryId] || []).find(
        (d) => d.rangeLabel === cfg.rangeLabel,
      );
      if (!def) return [];
      const refSet = new Set(def.productRefs);
      const seriesProducts = sub.products.filter((p) => refSet.has(p.reference));
      const img = seriesProducts.length > 0
        ? getSanyPrimaryProductImage(seriesProducts[0])
        : getSanySeriesPreviewImage(sub);
      return [
        {
          categorySlug: cfg.slug,
          categoryName: cfg.displayName,
          totalProducts: seriesProducts.length,
          subCategoryCount: 1,
          previewImage: img,
          isRemoteImage: img ? img.startsWith("http") : false,
        },
      ];
    });

    const categoryCards = [...realCards, ...virtualCards, ...seriesCards].sort((a, b) => {
      const ai = sanySlugOrderIndex(a.categorySlug);
      const bi = sanySlugOrderIndex(b.categorySlug);
      return ai !== bi ? ai - bi : a.categoryName.localeCompare(b.categoryName);
    });

    const totalProducts = categoryCards.reduce((s, c) => s + c.totalProducts, 0);
    return <SanyBrandOfficialPage brand={brand} categoryCards={categoryCards} totalProducts={totalProducts} />;
  }

  if (brand.name.toUpperCase() === "SUNWARD") {
    return <Suspense fallback={null}><SunwardBrandPage brand={brand} brandSlug={brandSlug} /></Suspense>;
  }

  if (brand.name.toUpperCase() === "ATOX") {
    return <AtoxBrandPage brand={brand} />;
  }

  if (brand.name.toUpperCase() === "E-MAK") {
    return <EmakBrandPage brand={brand} />;
  }

  if (brand.name.toUpperCase() === "FABO") {
    return <FaboBrandPage brand={brand} />;
  }

  return <Suspense fallback={null}><BrandClient brand={brand} /></Suspense>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return brands.map((brand) => ({
    brand: toBrandSlug(brand.name),
  }));
}
