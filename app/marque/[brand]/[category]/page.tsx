import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { toBrandSlug } from "@/lib/slug";
import { buildMetadata } from "@/lib/seo";
import {
  getSanyCategoryBySlug,
  getSanyOrderedCategories,
  getSanyOrderedSubCategories,
  getSanySeriesPreviewImage,
  getSanyPrimaryProductImage,
  getSanyPromotedConfigBySlug,
  getSanyPromotedSubcategory,
  getSanyPromotedSeriesBySlug,
  getSanyDisplayProductCountForSubCategory,
  getSanyDisplayProductsForSubCategory,
  isSanyPromotedSubcategoryId,
  isSanyExcludedSubcategoryId,
  parseSanyNumber,
  SANY_PROMOTED_SUBCATEGORIES,
  SANY_PROMOTED_SERIES,
  type SanySubCategoryNode,
} from "@/lib/sanyCatalog";

function computeSpecRanges(
  sub: SanySubCategoryNode,
): { name: string; valueWithUnit: string }[] {
  const attrMap = new Map<
    string,
    { numericValues: number[]; unit: string; fallback: string }
  >();
  const attrOrder: string[] = [];
  for (const product of sub.products) {
    for (const attr of product.keyAttributes) {
      if (!attrMap.has(attr.name)) {
        attrMap.set(attr.name, {
          numericValues: [],
          unit: attr.unit,
          fallback: attr.valueWithUnit,
        });
        attrOrder.push(attr.name);
      }
      const num = parseSanyNumber(attr.value);
      if (!isNaN(num)) attrMap.get(attr.name)!.numericValues.push(num);
    }
  }
  return attrOrder.slice(0, 3).map((name) => {
    const { numericValues, unit, fallback } = attrMap.get(name)!;
    if (numericValues.length === 0) return { name, valueWithUnit: fallback };
    const min = Math.min(...numericValues);
    const max = Math.max(...numericValues);
    const valueWithUnit =
      min === max
        ? `${min}${unit ? " " + unit : ""}`
        : `${min} - ${max}${unit ? " " + unit : ""}`;
    return { name, valueWithUnit };
  });
}
import {
  getFaboCategories,
  getFaboCategoryBySlug,
  getProductCountForCategory,
} from "@/lib/faboCatalog";
import {
  SANY_SERIES_CONFIG,
  SANY_SUBCATEGORY_SPEC_OVERRIDES,
} from "@/data/sanySeriesConfig";
import SanyCategoryPage, { type SeriesCardData } from "../SanyCategoryPage";
import FaboCategoryPage from "../FaboCategoryPage";

interface Props {
  params: Promise<{ brand: string; category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, category: categorySlug } = await params;
  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());

  if (!brand) {
    return buildMetadata({
      title: "Catégorie introuvable",
      description: "",
      path: `/marque/${brandSlug}/${categorySlug}`,
      noIndex: true,
    });
  }

  if (brand.name.toUpperCase() === "SANY") {
    const promotedSeriesMeta = getSanyPromotedSeriesBySlug(categorySlug);
    if (promotedSeriesMeta) {
      return buildMetadata({
        title: `SANY – ${promotedSeriesMeta.displayName}`,
        description: `Découvrez la gamme SANY ${promotedSeriesMeta.displayName}.`,
        path: `/marque/${brandSlug}/${categorySlug}`,
      });
    }
    const promoted = getSanyPromotedConfigBySlug(categorySlug);
    if (promoted) {
      const found = getSanyPromotedSubcategory(promoted);
      if (!found) {
        return buildMetadata({
          title: "Catégorie introuvable",
          description: "",
          path: `/marque/${brandSlug}/${categorySlug}`,
          noIndex: true,
        });
      }
      return buildMetadata({
        title: `SANY – ${promoted.displayName}`,
        description: `Découvrez les ${getSanyDisplayProductCountForSubCategory(found.sub)} produits SANY ${promoted.displayName}.`,
        path: `/marque/${brandSlug}/${categorySlug}`,
      });
    }
    const category = getSanyCategoryBySlug(categorySlug);
    if (!category) {
      return buildMetadata({
        title: "Catégorie introuvable",
        description: "",
        path: `/marque/${brandSlug}/${categorySlug}`,
        noIndex: true,
      });
    }
    const visibleSubs = category.subCategories.filter(
      (s) =>
        !isSanyPromotedSubcategoryId(s.subCategoryId) &&
        getSanyDisplayProductCountForSubCategory(s) > 0,
    );
    const visibleProducts = visibleSubs.reduce(
      (s, sub) => s + getSanyDisplayProductCountForSubCategory(sub),
      0,
    );
    return buildMetadata({
      title: `SANY – ${category.categoryName}`,
      description: `Découvrez les ${visibleProducts} produits SANY de la gamme ${category.categoryName}. ${visibleSubs.length} séries disponibles.`,
      path: `/marque/${brandSlug}/${categorySlug}`,
    });
  }

  if (brand.name.toUpperCase() === "FABO") {
    const category = getFaboCategoryBySlug(categorySlug);
    if (!category) {
      return buildMetadata({
        title: "Catégorie introuvable",
        description: "",
        path: `/marque/${brandSlug}/${categorySlug}`,
        noIndex: true,
      });
    }
    const count = getProductCountForCategory(category);
    return buildMetadata({
      title: `FABO – ${category.nameFr}`,
      description: `${category.descriptionFr} ${count} produits disponibles.`,
      path: `/marque/${brandSlug}/${categorySlug}`,
    });
  }

  return buildMetadata({
    title: "Catégorie introuvable",
    description: "",
    path: `/marque/${brandSlug}/${categorySlug}`,
    noIndex: true,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { brand: brandSlug, category: categorySlug } = await params;

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  if (!brand) notFound();

  if (brand.name.toUpperCase() === "SANY") {
    // Promoted series — virtual category surfacing a single rangeLabel within
    // a subcategory (e.g. Tombereaux articulés = subcat 87, range "40 - 70T").
    const promotedSeries = getSanyPromotedSeriesBySlug(categorySlug);
    if (promotedSeries) {
      const parent = getSanyOrderedCategories().find(
        (c) => c.categoryId === promotedSeries.parentCategoryId,
      );
      const sub = parent?.subCategories.find(
        (s) => s.subCategoryId === promotedSeries.subCategoryId,
      );
      if (!parent || !sub) notFound();

      const def = (SANY_SERIES_CONFIG[sub.subCategoryId] || []).find(
        (d) => d.rangeLabel === promotedSeries.rangeLabel,
      );
      if (!def) notFound();

      const refSet = new Set(def.productRefs);
      const seriesProducts = sub.products.filter((p) => refSet.has(p.reference));
      const img =
        seriesProducts.length > 0
          ? getSanyPrimaryProductImage(seriesProducts[0])
          : null;

      const fakeSub: SanySubCategoryNode = {
        ...sub,
        products: seriesProducts,
        totalProducts: seriesProducts.length,
      };

      const seriesPageEntry = {
        subCategorySlug: sub.subCategorySlug,
        subCategoryName: promotedSeries.displayName,
        seriesRangeLabel: undefined as string | undefined,
        totalProducts: seriesProducts.length,
        previewImage: img,
        isRemoteImage: img ? img.startsWith("http") : false,
        previewSpecs: def.previewSpecsOverride ?? computeSpecRanges(fakeSub),
        brochureUrl: def.brochureUrl,
        displayAsAggregate: def.displayAsAggregate ?? false,
        categorySlugOverride: parent.categorySlug,
        products: seriesProducts.map((p) => ({
          modelId: p.modelId,
          name: p.name,
          reference: p.reference,
        })),
      };

      return (
        <SanyCategoryPage
          brand={brand}
          brandSlug={brandSlug}
          categorySlug={categorySlug}
          categoryName={promotedSeries.displayName}
          totalProducts={seriesProducts.length}
          series={[seriesPageEntry]}
          flatProducts={[]}
          subRouteCategorySlug={parent.categorySlug}
        />
      );
    }

    const promoted = getSanyPromotedConfigBySlug(categorySlug);

    let displaySubs: SanySubCategoryNode[];
    let displayCategoryName: string;
    let displayTotalProducts: number;
    let subRouteCategorySlug: string | undefined;

    if (promoted) {
      const found = getSanyPromotedSubcategory(promoted);
      if (!found) notFound();
      if (getSanyDisplayProductCountForSubCategory(found.sub) === 0) notFound();
      displaySubs = [found.sub];
      displayCategoryName = promoted.displayName;
      displayTotalProducts = getSanyDisplayProductCountForSubCategory(found.sub);
      subRouteCategorySlug = found.parent.categorySlug;
    } else {
      const orderedCategories = getSanyOrderedCategories();
      const category = orderedCategories.find((c) => c.categorySlug === categorySlug);
      if (!category) notFound();

      const orderedSubs = getSanyOrderedSubCategories(category).filter(
        (s) =>
          !isSanyPromotedSubcategoryId(s.subCategoryId) &&
          !isSanyExcludedSubcategoryId(s.subCategoryId) &&
          getSanyDisplayProductCountForSubCategory(s) > 0,
      );
      // If filtering removed every subcategory, treat the route as missing
      if (orderedSubs.length === 0) notFound();

      displaySubs = orderedSubs;
      displayCategoryName = category.categoryName;
      displayTotalProducts = orderedSubs.reduce(
        (s, sub) => s + getSanyDisplayProductCountForSubCategory(sub),
        0,
      );
    }

    // Merge Camion Malaxeur (cat 42) subcategories under Concrete Machinery
    // (cat 41 / "concrete-machinery") so that "Équipement Béton" surfaces them
    // alongside its native pumps. Each merged sub keeps its own parent
    // categorySlug so links resolve to the existing static routes.
    // For promoted virtual categories (e.g. wheel-excavator) we must link
    // through the real parent route slug since the static params only exist
    // under the parent (e.g. /marque/sany/excavator/wheel-excavator).
    const linkSlugForDisplay = subRouteCategorySlug ?? categorySlug;
    const subsWithCategory: Array<{
      sub: SanySubCategoryNode;
      categorySlug: string;
    }> = displaySubs.map((sub) => ({ sub, categorySlug: linkSlugForDisplay }));

    if (categorySlug === "concrete-machinery") {
      const truckMixerCat = getSanyCategoryBySlug("camion-malaxeur");
      if (truckMixerCat) {
        const truckMixerSubs = getSanyOrderedSubCategories(truckMixerCat).filter(
          (s) =>
            !isSanyPromotedSubcategoryId(s.subCategoryId) &&
            !isSanyExcludedSubcategoryId(s.subCategoryId) &&
            getSanyDisplayProductCountForSubCategory(s) > 0,
        );
        for (const sub of truckMixerSubs) {
          subsWithCategory.push({ sub, categorySlug: "camion-malaxeur" });
          displayTotalProducts += getSanyDisplayProductCountForSubCategory(sub);
        }
      }
    }

    const concreteProductSubPageIds = new Set([59, 43, 60]);
    const series: SeriesCardData[] = subsWithCategory.flatMap<SeriesCardData>(({ sub, categorySlug: subCatSlug }) => {
      const seriesDefs = SANY_SERIES_CONFIG[sub.subCategoryId];

      if (
        !seriesDefs ||
        seriesDefs.length === 0 ||
        (categorySlug === "concrete-machinery" &&
          concreteProductSubPageIds.has(sub.subCategoryId))
      ) {
        // No series split, or concrete landing page: render the whole
        // product family as one card that links to its model subpage.
        const img = getSanySeriesPreviewImage(sub);
        const specOverride = SANY_SUBCATEGORY_SPEC_OVERRIDES[sub.subCategoryId];
        const displayProducts = getSanyDisplayProductsForSubCategory(sub);
        return [
          {
            subCategorySlug: sub.subCategorySlug,
            subCategoryName: sub.subCategoryName,
            seriesRangeLabel: undefined as string | undefined,
            totalProducts: getSanyDisplayProductCountForSubCategory(sub),
            previewImage: img,
            isRemoteImage: img ? img.startsWith("http") : false,
            previewSpecs: specOverride ?? computeSpecRanges(sub),
            categorySlugOverride: subCatSlug,
            displayAsCategory:
              categorySlug === "concrete-machinery" &&
              concreteProductSubPageIds.has(sub.subCategoryId),
            products: displayProducts.map((p) => ({
              modelId: p.modelId,
              name: p.name,
              reference: p.reference,
            })),
          },
        ];
      }

      // Expand subcategory into weight/capacity-range series
      return seriesDefs.map((def) => {
        const refSet = new Set(def.productRefs);
        const seriesProducts = getSanyDisplayProductsForSubCategory(sub).filter((p) =>
          refSet.has(p.reference),
        );
        const productImg =
          seriesProducts.length > 0
            ? getSanyPrimaryProductImage(seriesProducts[0])
            : null;
        const img = def.previewImageOverride ?? productImg ?? null;
        // Reuse computeSpecRanges by passing a fake sub-node with only this series' products
        const specsInput = { ...sub, products: seriesProducts };
        return {
          subCategorySlug: sub.subCategorySlug,
          subCategoryName: def.subCategoryNameOverride ?? sub.subCategoryName,
          seriesRangeLabel: def.rangeLabel,
          totalProducts: seriesProducts.length,
          previewImage: img,
          isRemoteImage: img ? img.startsWith("http") : false,
          previewSpecs: def.previewSpecsOverride ?? computeSpecRanges(specsInput),
          brochureUrl: def.brochureUrl,
          displayAsAggregate: def.displayAsAggregate ?? false,
          categorySlugOverride: subCatSlug,
          products: seriesProducts.map((p) => ({
            modelId: p.modelId,
            name: p.name,
            reference: p.reference,
          })),
        };
      });
    });
    const flatProducts =
      series.length === 0
        ? displaySubs.flatMap((s) =>
            s.products.map((p) => {
              const img = getSanyPrimaryProductImage(p);
              return {
                modelId: p.modelId,
                fullName: p.fullName,
                name: p.name,
                reference: p.reference,
                image: img,
              };
            }),
          )
        : [];

    return (
      <SanyCategoryPage
        brand={brand}
        brandSlug={brandSlug}
        categorySlug={categorySlug}
        categoryName={displayCategoryName}
        totalProducts={displayTotalProducts}
        series={series}
        flatProducts={flatProducts}
        subRouteCategorySlug={subRouteCategorySlug}
      />
    );
  }

  if (brand.name.toUpperCase() === "FABO") {
    const category = getFaboCategoryBySlug(categorySlug);
    if (!category) notFound();

    return <FaboCategoryPage brand={brand} category={category} />;
  }

  notFound();
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // SANY — real categories + virtual (promoted) categories
  const sanyBrand = brands.find((b) => b.name.toUpperCase() === "SANY");
  const sanyParams = sanyBrand
    ? [
        ...getSanyOrderedCategories().map((c) => ({
          brand: toBrandSlug(sanyBrand.name),
          category: c.categorySlug,
        })),
        ...SANY_PROMOTED_SUBCATEGORIES.map((p) => ({
          brand: toBrandSlug(sanyBrand.name),
          category: p.slug,
        })),
        ...SANY_PROMOTED_SERIES.map((p) => ({
          brand: toBrandSlug(sanyBrand.name),
          category: p.slug,
        })),
      ]
    : [];

  // FABO
  const faboBrand = brands.find((b) => b.name.toUpperCase() === "FABO");
  const faboParams = faboBrand
    ? getFaboCategories().map((c) => ({
        brand: toBrandSlug(faboBrand.name),
        category: c.slug,
      }))
    : [];

  return [...sanyParams, ...faboParams];
}
