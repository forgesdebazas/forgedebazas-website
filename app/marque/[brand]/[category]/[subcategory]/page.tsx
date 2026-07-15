import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands } from "@/data/brands";
import { toBrandSlug } from "@/lib/slug";
import { buildMetadata } from "@/lib/seo";
import {
  getSanyCategoryBySlug,
  getSanySubCategoryBySlug,
  getSanyOrderedCategories,
  getSanyOrderedSubCategories,
  getSanySeriesPreviewImage,
  getSanyPrimaryProductImage,
  getSanyDisplayProductCountForSubCategory,
  getSanyDisplayProductsForSubCategory,
} from "@/lib/sanyCatalog";
import { SANY_SERIES_CONFIG } from "@/data/sanySeriesConfig";
import {
  getSunwardCategoryBySlug,
  getSunwardProductBySlug,
  getSunwardCategories,
} from "@/lib/sunwardCatalog";
import {
  getFaboCategories,
  getFaboCategoryBySlug,
  getFaboSubcategoryBySlug,
  getProductsForSubcategory,
} from "@/lib/faboCatalog";
import SanyProductDetailPage from "../../SanyProductDetailPage";
import SunwardProductDetailPage from "../../SunwardProductDetailPage";
import FaboSubcategoryPage from "../../FaboSubcategoryPage";

interface Props {
  params: Promise<{ brand: string; category: string; subcategory: string }>;
  searchParams?: Promise<{ model?: string; series?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug } =
    await params;
  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());

  if (!brand) {
    return buildMetadata({
      title: "Produit introuvable",
      description: "",
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
      noIndex: true,
    });
  }

  if (brand.name.toUpperCase() === "SANY") {
    const category = getSanyCategoryBySlug(categorySlug);
    const subCategory = getSanySubCategoryBySlug(categorySlug, subSlug);

    if (!category || !subCategory) {
      return buildMetadata({
        title: "Produit introuvable",
        description: "",
        path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
        noIndex: true,
      });
    }

    return buildMetadata({
      title: `SANY – ${subCategory.subCategoryName}`,
      description: `Découvrez les ${getSanyDisplayProductCountForSubCategory(subCategory)} modèles SANY ${subCategory.subCategoryName} de la gamme ${category.categoryName}. Spécifications techniques et documentation.`,
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
    });
  }

  if (brand.name.toUpperCase() === "SUNWARD") {
    const category = getSunwardCategoryBySlug(categorySlug);
    const product = category
      ? getSunwardProductBySlug(categorySlug, subSlug)
      : null;

    if (!category || !product) {
      return buildMetadata({
        title: "Produit introuvable",
        description: "",
        path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
        noIndex: true,
      });
    }

    return buildMetadata({
      title: `SUNWARD – ${product.reference}`,
      description: `${product.name}. Foreuse de surface SUNWARD Mining – spécifications techniques et informations produit.`,
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
    });
  }

  if (brand.name.toUpperCase() === "FABO") {
    const category = getFaboCategoryBySlug(categorySlug);
    const sub = category ? getFaboSubcategoryBySlug(categorySlug, subSlug) : null;

    if (!category || !sub) {
      return buildMetadata({
        title: "Sous-catégorie introuvable",
        description: "",
        path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
        noIndex: true,
      });
    }

    const count = getProductsForSubcategory(sub).length;
    return buildMetadata({
      title: `FABO – ${sub.nameFr}`,
      description: `${sub.nameFr} – ${count} produit${count > 1 ? "s" : ""} FABO disponible${count > 1 ? "s" : ""}. ${category.descriptionFr}`,
      path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
    });
  }

  return buildMetadata({
    title: "Produit introuvable",
    description: "",
    path: `/marque/${brandSlug}/${categorySlug}/${subSlug}`,
    noIndex: true,
  });
}

export default async function SubcategoryPage({ params, searchParams }: Props) {
  const { brand: brandSlug, category: categorySlug, subcategory: subSlug } =
    await params;
  const requested = (await searchParams) ?? {};

  const brand = brands.find((b) => toBrandSlug(b.name) === brandSlug.toLowerCase());
  if (!brand) notFound();

  if (brand.name.toUpperCase() === "SANY") {
    const category = getSanyCategoryBySlug(categorySlug);
    if (!category) notFound();

    const subCategory = getSanySubCategoryBySlug(categorySlug, subSlug);
    if (!subCategory) notFound();

    // Build per-reference overrides from the series config:
    //   • brochureUrl  → series-level PDF surfaces on the model detail page
    //   • aggregate    → first variant becomes the canonical model and is
    //                    relabelled to the series rangeLabel; siblings hidden.
    const seriesDefs = SANY_SERIES_CONFIG[subCategory.subCategoryId];
    const activeSeriesDef = seriesDefs?.find(
      (def) =>
        def.rangeLabel === requested.series ||
        (!!requested.model && def.productRefs.includes(requested.model)),
    );
    const seriesBrochureByRef = new Map<string, string>();
    const aggregateInfoByRef = new Map<
      string,
      { rangeLabel: string; firstRef: string }
    >();
    const allowedRefsByConfig = new Set<string>();
    let hasAggregateSeries = false;
    for (const def of seriesDefs ?? []) {
      for (const ref of def.productRefs) allowedRefsByConfig.add(ref);
      if (def.brochureUrl) {
        for (const ref of def.productRefs) {
          seriesBrochureByRef.set(ref, def.brochureUrl);
        }
      }
      if (def.displayAsAggregate && def.productRefs.length > 0) {
        hasAggregateSeries = true;
        const firstRef = def.productRefs[0];
        for (const ref of def.productRefs) {
          aggregateInfoByRef.set(ref, { rangeLabel: def.rangeLabel, firstRef });
        }
      }
    }

    const productsForDisplay = getSanyDisplayProductsForSubCategory(subCategory).filter((p) => {
      if (activeSeriesDef && !activeSeriesDef.productRefs.includes(p.reference)) {
        return false;
      }
      const agg = aggregateInfoByRef.get(p.reference);
      // Hide aggregate siblings — keep only the canonical first variant.
      if (agg && p.reference !== agg.firstRef) return false;
      // When the subcategory uses an aggregate series, restrict the detail
      // page to refs that appear in the curated series config.
      if (hasAggregateSeries && !allowedRefsByConfig.has(p.reference)) {
        return false;
      }
      return true;
    });
    if (productsForDisplay.length === 0) notFound();

    const processedModels = productsForDisplay.map((p) => {
      const rawImage = getSanyPrimaryProductImage(p);
      const agg = aggregateInfoByRef.get(p.reference);
      return {
        reference: agg ? agg.rangeLabel : p.reference,
        name: agg ? agg.rangeLabel : p.name,
        image: rawImage,
        isRemoteImage: rawImage ? rawImage.startsWith("http") : false,
        keyAttributes: p.keyAttributes.map((a) => ({
          name: a.name,
          valueWithUnit: a.valueWithUnit,
        })),
        technicalSpecifications: p.technicalSpecifications.map((g) => ({
          groupName: g.groupName,
          specifications: g.specifications.map((sp) => ({
            name: sp.name,
            valueWithUnit: sp.valueWithUnit,
          })),
        })),
        featureList: p.description.featureList.map((f) => ({
          title: f.title,
          description: f.description,
        })),
        summary: p.description.summary,
        brochureUrl:
          seriesBrochureByRef.get(p.reference) ?? p.documents.brochureUrl ?? "",
        sourceUrl: p.sourceUrl ?? "",
      };
    });

    const relatedSeries = getSanyOrderedSubCategories(category)
      .filter(
        (s) =>
          s.subCategorySlug !== subCategory.subCategorySlug &&
          getSanyDisplayProductCountForSubCategory(s) > 0,
      )
      .slice(0, 4)
      .map((s) => {
        const img = getSanySeriesPreviewImage(s);
        return {
          subCategorySlug: s.subCategorySlug,
          subCategoryName: s.subCategoryName,
          totalProducts: s.totalProducts,
          previewImage: img,
          isRemoteImage: img ? img.startsWith("http") : false,
        };
      });

    return (
      <SanyProductDetailPage
        brand={brand}
        brandSlug={brandSlug}
        categorySlug={categorySlug}
        categoryName={category.categoryName}
        subCategorySlug={subCategory.subCategorySlug}
        subCategoryName={subCategory.subCategoryName}
        processedModels={processedModels}
        relatedSeries={relatedSeries}
      />
    );
  }

  if (brand.name.toUpperCase() === "SUNWARD") {
    const category = getSunwardCategoryBySlug(categorySlug);
    if (!category) notFound();

    const product = getSunwardProductBySlug(categorySlug, subSlug);
    if (!product) notFound();

    return (
      <SunwardProductDetailPage
        brand={brand}
        category={category}
        product={product}
        brandSlug={brandSlug}
      />
    );
  }

  if (brand.name.toUpperCase() === "FABO") {
    const category = getFaboCategoryBySlug(categorySlug);
    if (!category) notFound();

    const sub = getFaboSubcategoryBySlug(categorySlug, subSlug);
    if (!sub) notFound();

    return (
      <FaboSubcategoryPage brand={brand} category={category} subcategory={sub} />
    );
  }

  notFound();
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // SANY
  const sanyBrand = brands.find((b) => b.name.toUpperCase() === "SANY");
  const sanyParams = sanyBrand
    ? getSanyOrderedCategories().flatMap((cat) =>
        cat.subCategories.map((sub) => ({
          brand: toBrandSlug(sanyBrand.name),
          category: cat.categorySlug,
          subcategory: sub.subCategorySlug,
        }))
      )
    : [];

  // SUNWARD
  const sunwardBrand = brands.find((b) => b.name.toUpperCase() === "SUNWARD");
  const sunwardParams = sunwardBrand
    ? getSunwardCategories().flatMap((cat) =>
        cat.products.map((p) => ({
          brand: toBrandSlug(sunwardBrand.name),
          category: cat.categorySlug,
          subcategory: p.reference.toLowerCase(),
        }))
      )
    : [];

  // FABO
  const faboBrand = brands.find((b) => b.name.toUpperCase() === "FABO");
  const faboParams = faboBrand
    ? getFaboCategories().flatMap((cat) =>
        cat.subcategories.map((sub) => ({
          brand: toBrandSlug(faboBrand.name),
          category: cat.slug,
          subcategory: sub.slug,
        }))
      )
    : [];

  return [...sanyParams, ...sunwardParams, ...faboParams];
}
